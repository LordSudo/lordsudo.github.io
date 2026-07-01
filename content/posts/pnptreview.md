---
title: PNPT Review 2026
date: 2026-07-01
draft: false
tags: ["Exam Review"]
image: "/thumbnails/pnptreview.png"
description: "My Review of the PNPT Cert"
---
# PNPT Review: Is It Worth It in 2026?

I picked up a voucher for the Practical Network Penetration Tester (PNPT) certification a while back through the folks at CTFROOM, and then promptly procrastinated on actually sitting the exam for months. Finally got around to it, sat the exam, and passed. 

Here's my honest take, written with the goal of actually helping you decide whether to spend your money on this.

I won't get into the exam's logistics or rules in detail, that's all on TCM Security's official website.

## What's Included

PNPT costs **$499 USD** and includes 12 months of access to the course content, plus two exam attempts that don't expire on a timer.

The voucher bundles five courses:

- Practical Ethical Hacker (PEH)
- Windows Privilege Escalation
- Linux Privilege Escalation
- External Pentest Playbook
- Open-Source Intelligence (OSINT) Fundamentals

I didn't go through them this time around, I'd already done PEH partially years back when it was first released, so I went straight for the exam. From that earlier experience, PEH in particular has a solid reputation, it requires you to build your own Active Directory lab, which is genuinely useful groundwork if you're new to this.


## What the Exam Actually Tests

Without giving away anything exam-specific, the practical covers the full pentesting lifecycle: planning and reconnaissance, scanning and enumeration, gaining initial access, maintaining access, and reporting. It's structured as an external-to-internal engagement, you start outside the network with nothing and work your way to full compromise.


## Exam Experience

You get five days for the hands-on practical, plus another two days to submit the report.

I finished the hands-on portion in about five hours, slept, woke up, and wrote the report in roughly an hour. To be clear, that's a reflection of my own prior experience going in, not a realistic benchmark, if this is your first practical exam of this kind, the five-day window is ample time to work through it properly and produce a solid report, and you should use it.

The environment was rock solid throughout, VPN-based access that never dropped, no resets needed, nothing flaky. For anyone who's dealt with unstable exam infrastructure elsewhere, that stability is worth calling out on its own.

### Where it could improve

If there's one place TCM could meaningfully strengthen the exam, it's the attack vectors, especially given this is positioned as an Active Directory-focused certification. Incorporating genuine AD privilege escalation and lateral movement techniques into the actual path to compromise would raise the exam's value considerably.

The OSINT portion could also be more realistic. As it stands, it's fairly straightforward and doesn't fully reflect the kind of effort genuine OSINT reconnaissance takes in a real engagement.

### The report bar

I submitted my report and got feedback that it wasn't detailed enough. I'd push back, as it's the same reporting template I use on real client engagements, and it's held up fine there. That said, I didn't have to resit the exam; I just went back and added more detail on the path to compromise and a lot more screenshots. The report ended up roughly double its original length by the time it was accepted.

**The practical takeaway:** document everything, every command you run, every piece of output, screenshots at each meaningful step. Rather overdo it than underdo it. It costs you time during the exam, but far less time than a resubmission cycle.

After the report was accepted, I scheduled the debrief. I got a genuinely great panelist who walked me through what to expect before starting the 15-minute timer. The whole thing took under 10 minutes, and I had my certification shortly after.


## How It Compares on Value

This is where the decision gets easier, because the numbers are pretty stark:

- **PNPT** : $499 for 12 months of content access and two exam attempts.
- **CRTP** (Altered Security) : $249 for 30 days of lab access, lifetime access to course material, and one exam attempt.
- **CPTS** (HTB, Silver Annual tier) : $490 for a year of access to content covering three different certification paths, plus one exam voucher of your choice.

CRTP gets you a dedicated, deep Active Directory certification for roughly half the price. CPTS gets you broader pentesting content covering multiple certs for about the same price as PNPT, with a voucher included. On value alone, both beat PNPT.

## Who Should Actually Buy This

**If you're completely new to pentesting:** PNPT is a decent choice, and the PEH course bundled with it is genuinely good groundwork. That said, even as a beginner, I'd point you toward **CPTS** first, you get broader, deeper content at a comparable price, and the certification carries more weight in the industry.

**If you already have some practical reps** (HTB boxes, TryHackMe, a basic home AD lab) and just want a black-box, report-graded exam experience: PNPT will feel manageable and the report-writing discipline is worth practicing. But you'll likely outgrow what it teaches you about AD quickly.

**If Active Directory specifically is what you want to get good at:** skip straight to **CRTP**. It's cheaper, and unlike PNPT, it actually requires you to chain real AD attacks together to succeed.

**If you just want broad name recognition for a resume/HR screen:** this is actually a point against PNPT, not for it. PNPT's recognition in the industry is decent but not exceptional, and both CPTS and CRTP currently carry more weight in the current landscape , CRTP especially is far better recognized as an AD-focused credential, and both still require a written report, so you're not trading away the documentation-skill benefit by choosing them instead.


## Bottom Line

PNPT is not a bad certification. The report requirement, the black-box approach, and the rock-solid exam environment are all genuinely good design decisions, and the debrief experience was well run. But the AD attack paths feel thin for a cert that markets itself on network/AD penetration testing, the OSINT component doesn't reflect real-world effort, and, dollar for dollar both CPTS and CRTP currently offer more for the same or less money.

If you already own the voucher or got it cheap, it's worth doing. If you're deciding where to put $500 from scratch in 2026, put it toward CPTS or CRTP instead.


