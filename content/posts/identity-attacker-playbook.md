---
title: "The Attacker's Playbook: How Identity Programs Actually Get Broken"
date: 2026-10-13
draft: false
tags: ["Identity Security"]
image: "/thumbnails/identity3.png"
description: "Part 2 was about building it right. Part 3 is what it looks like from the other side of the call."
---

[Part 2](https://blog.lordsudo.com/posts/whatgoodlookslike/) ended on a question: what would have stopped the call M&S got. Fair question for a defender. Now sit on the other side of it for a minute, because that's where the honest answer actually lives.

If I were the one making that call, I wouldn't be looking for a firewall to get past. I'd be looking for the one moment where a system trusts a claim it shouldn't, and everything after that is just walking through doors that are already unlocked.

## The credential was never the target

Once an attacker has a foothold, even a low-privilege one, the goal stops being "find a vulnerability" and becomes "find a trust relationship to abuse." Active Directory environments are full of these, and most of them are working exactly as designed, which is precisely the problem.

Take Kerberoasting. Any authenticated user, even a low-privilege one, can request a service ticket for any account that has a Service Principal Name registered, and that ticket comes back encrypted with a hash of that service account's password. Nothing about that request looks abnormal, it's a completely legitimate part of how Kerberos authentication works. The attacker just takes that ticket offline and throws it at a cracking tool. If the service account's password is weak, and service accounts are disproportionately the ones nobody's rotated since they were created, the password falls out, often in minutes. No alert fired. No exploit ran. The system did exactly what it was built to do, and that's exactly why it worked.

Pass-the-hash is the same story from a different angle. Windows systems, for a long time, didn't strictly need your actual password to authenticate you to another machine, a hash of it was often enough. An attacker who dumps credential material from one compromised machine doesn't need to crack anything, they just replay the hash somewhere else and the target system says yes, because as far as it's concerned, the right hash is the right person. Token theft works the same way one layer up: steal a valid session token instead of a password, and you inherit whatever that session was already trusted to do, no authentication prompt required, because authentication already happened, upstream, for someone else.

Notice the pattern across all three. None of them break authentication. They all abuse the fact that once trust is granted, the system mostly stops asking hard questions about who's actually holding it.

## Living off the land, not living off exploits

The uncomfortable truth for anyone still picturing attackers as people writing custom malware: the best ones mostly don't. They use the tools already sitting on the machine. PowerShell, WMI, built-in Windows administration utilities, the exact same binaries your own IT team uses every day to do their jobs. This is called living off the land, and the reason it works so well is that none of it looks like an attack to a system watching for known-bad signatures. It looks like Tuesday.

This is the same shift Part 1 pointed at with "they don't break in anymore, they log in," just one layer deeper. An attacker who's captured a Kerberos ticket or a valid session isn't running an exploit against your infrastructure. They're using your infrastructure, with legitimate tools, under a trust relationship that already existed before they showed up. Every control built to catch something obviously malicious is, by design, blind to something that looks completely ordinary.

This is also exactly where Part 2's JML discipline earns its keep, or doesn't. A weak service account password sitting on an account nobody's revisited in three years is a Kerberoasting target waiting to happen. Standing privileged access that should've been revoked when someone changed roles is a lateral movement path nobody closed. Every gap in that lifecycle from the last post isn't theoretical risk. It's a specific technique, with a name, that someone is actively looking for the moment they're inside.

## The insider threat that never gets suspicious

Here's where it gets worse, not better. Everything above assumed a human attacker working through human-shaped trust relationships. Increasingly, the account being abused isn't a person's at all.

An AI agent with standing API credentials is, functionally, a service account. It authenticates, it calls systems, it takes actions, often with meaningfully broad permissions because nobody wanted to spend the afternoon scoping them down precisely when the project shipped. Part 1 flagged that these credentials tend to be provisioned in a hurry and rarely revisited. Part 3 is where that stops being an abstract governance gap and becomes an actual attack surface: an agent that can be manipulated, through a poisoned document it reads, a compromised tool it calls, a prompt injected somewhere in its input, into taking an action nobody intended, using credentials that were never watched closely enough to notice.

This is arguably a more attractive target than a human employee. A person might notice something's wrong and say something. An agent doesn't get suspicious, doesn't hesitate, doesn't call the helpdesk to double-check a weird request, it just executes, at whatever speed and scale its access allows. The same JML discipline that should apply to a departing employee needs to apply to an agent whose task ended, the same SoD thinking that flags a human holding two dangerous permissions together needs to flag an agent holding them too, and right now, most organizations aren't asking either question about their AI agents at all.

## What the defender's job actually is

None of this points toward "patch everything" or "buy a better detection tool," because neither of those addresses what's actually happening. The honest defensive posture starts from a harder assumption: the credential will get compromised. Not might. Will, eventually, for long enough odds across enough accounts. The real question isn't how to prevent that perfectly, nobody does. It's what happens in the fifteen seconds after it does.

Does a Kerberoastable service account even exist with a crackable password, or was that closed off before anyone got the chance to try. Does standing privileged access get flagged the moment it's used somewhere it's never been used before, or does it just work quietly. Does an AI agent doing something outside its normal pattern get noticed in the moment, or only in the postmortem. That's the actual measure of a program that survives contact, not whether the front door holds, because eventually it won't, but whether anything downstream of that door was built assuming it wouldn't.

That's the whole shape of this series, really. Why it matters, what it looks like built right, and what it looks like when someone's trying to take it apart. All three are the same question, asked from different sides of the same call.
