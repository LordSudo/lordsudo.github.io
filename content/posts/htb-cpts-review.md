---
title: "HTB CPTS Review: Is It Worth It?"
date: 2026-10-30
draft: false
author: LordSudo
tags: ["HTB", "Exam Review", "CPTS"]
image: /thumbnails/cptsreview.png
description: "My honest take on the Hack The Box Certified Penetration Testing Specialist (CPTS) exam and the Penetration Tester path behind it."
---

The Certified Penetration Testing Specialist (CPTS) is Hack The Box's practical penetration testing certification. I sat the exam, submitted my report, and **passed**. This is my honest take on whether it's worth your time and money.

**Disclosure:** I received the Silver Annual subscription (which includes the exam vouchers) as an HTB Ambassador. Everything below is my own opinion.

I won't go into exam rules or specifics. HTB documents those well on their own site, and I don't want to give anything away. This is my experience and the practical information I'd want before starting.

## What's Included

The CPTS exam voucher was the **second voucher** that came with my **Silver Annual** subscription, the same one that gave me the CJCA voucher. If you read my [CJCA review](https://blog.lordsudo.com/posts/htb-cjca-review/), the value argument is the same: the subscription gives you a year of content across the certification paths, plus vouchers for the exams.

To be eligible to sit the exam, you have to complete the **Penetration Tester** job role path on HTB Academy first.


## The Path

I finished the path around week 36 this year, but I'd been on and off it for most of 2026. If I add it all up, I'd say it took me roughly **four months**. That's one person's number, built from fragments of time around work and other commitments, so don't treat it as a schedule.

I didn't do it in order. I started with the modules I felt mattered most for me, then fast-tracked the rest. For modules where I already knew the material, I went straight to the exercises at the end of the module. If you're newer to the field, I'd go in order, because the path builds on itself.

Highlights for me:

- **The pivoting module** was very good.
- **The Active Directory modules** were solid, and the **AEN** (Attacking Enterprise Networks) module was my favourite. It pulls everything together and firms up concepts that are easy to leave half-understood.

I didn't do the CPTS Prep machines track on HTB, but I'd recommend it to anyone who wants more hands-on practice beyond the path. Doing HTB machines in general also helps reinforce the methodology the exam expects.

## The Exam Format

The exam gives you **10 days**, report writing included, and it's flag-based. You need **12 out of 14 flags** to pass.

The 10 days are more than enough time. I'm not going to share how long I actually spent, because that number wouldn't help you.

## A Challenge Author's View

I create CTF challenges (as a hobby...), over a hundred of them now, and I model and build most of them on real-world scenarios. That shaped how I read this exam.

My advice: **Don't treat it like a CTF.** 

Treat it like an actual penetration test engagement. The flags are there to prove you got somewhere, but the path to them is the kind of thing you'd meet in real work, and approaching it with an engagement mindset (enumerate properly, document as you go, think about what an attacker would do next) beats trying to guess what the author wants.

For me it was fun and, honestly, straightforward, precisely because it felt like the scenarios I build myself. It tests everything the path teaches, and a little beyond.

And for the CTF players reading this: it gave me some interesting ideas for challenges. You're going to feast.

## Exam Experience

The environment was **very stable**. I had zero issues, which is a nice contrast to the VPN trouble I had with CJCA.

The difficulty was what I expected for an exam like this. Web is my weakest area, so **flag 1 was the hardest for me**. On the other side, I enjoyed the famous **flag 8** quite a lot, and I'll leave it there.

### Winging It

I'd planned to book the 10 days off work and focus. Then I decided to wing it. Partly I'd convinced myself I had this, and partly I wanted to see whether I could do the exam without dedicated time. So I worked my normal job and did the exam mostly after hours.

Would I recommend that to anyone? Absolutely not. Did I enjoy it? Yes. Would I do it again? Maybe, yes.

### Flow State

Once flag 1 fell, I hit flow state. That's just me in my element, where everything clicks, makes sense and comes together, and I can move with real speed. I'd planned to report as I went. The energy was too much, so I kept pwning and only stopped to take screenshots and scribble the odd note.

I did fall into a few rabbit holes. But I put rabbit holes into my own challenges for a living, so I tend to recognise them, and I stopped before I was in too deep.

### The 12/14 Decision

Once I reached 12 of 14 flags, the pass mark, I made a deliberate decision: start the report before going back for the last two. I was working and doing the exam at the same time, and I didn't want to rush the report with less time left. Technically I had a pass score, so locking in the report was the safe option.

I never went back for the remaining flags. Too lazy, honestly.

## The Report

The report was one of the better-designed parts of the experience. HTB provides **SysReptor templates**, which take care of structure and formatting so you can focus on findings.

I'll be straight about how I did it, because it's not a model to copy. I only had screenshots and a few scribbled notes, so when it came to the report I copied the command output back out of my terminal. That was a lot of extra work, and I wouldn't recommend it. If I did the exam again, I would build the report side by side as I went. Keep real notes, because you'll rely on them.

My report ended up at **118 pages**, and I was tired of writing it by the end.

> On turnaround, HTB allows up to 20 business days to review reports, but mine didn't take anywhere near that. I submitted on **26th October** and had my result on **30th October**, four days later.

## Where It Could Improve

From a content point of view, I'd rate the path and the exam **9 out of 10**. The one thing I'd add is **more Active Directory content**. That said, HTB has the CAPE certification for AD, so it's arguably covered elsewhere.

I also understand the requirement to complete the path before sitting the exam. If it weren't there, I'd have taken the exam long ago. But given how much the exam tests and the depth of knowledge it needs, I see why HTB went that route.

## How It Compares

In my PNPT review I said CPTS gave you more for the money. Having now done the path and the exam, I agree with that even more. On **Active Directory content and examination in particular, CPTS blows PNPT away**. PNPT is a decent starter, but the AD attack paths in CPTS are far more demanding and realistic.

## Who Should Take It

If you're willing to get your hands dirty learning penetration testing, this is the certification I'd recommend, all day. By the time you've finished the modules and passed the exam, you should be comfortable running an enterprise-level penetration test (scope and size will vary) and confident in your abilities.

If you're an absolute beginner who has done the CJCA path and exam and is moving on to CPTS, expect a huge step up. It's definitely worth it, but it will take a mindset adjustment and some buckling up. That's how it is in the cyber world in general, and the path is a good place to start building that habit. If you're already experienced, the path will move faster, as it did for me, but the exam is still worth sitting.

## Bottom Line

CPTS is a challenging, well-built certification with an excellent path behind it. It tests what it teaches, the environment is stable, and the report component builds a skill that matters. I enjoyed it a lot, even though I went in a bit cocky.

I passed, and I'm glad I did it, even with the report mess I made for myself. If you want to learn penetration testing properly, put CPTS on your list.
