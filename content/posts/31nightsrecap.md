---
title: "31 Nights of r00t: A Month-Long CTF, Start to Finale"
date: 2026-11-01
draft: false
tags: ["CTF", "31 Nights of r00t"]
image: "/thumbnails/31nightsrecap.png"
description: "A look back at 31 Nights of r00t: a month-long, individual CTF run on Dojo, from a rocky first week to an in-person finale."
---

It's six in the evening in Nairobi. The room is filling up, and the scoreboard has a crowd of names packed close together, with no clear leader. Thirty days of challenges are behind us, a few hours remain, and nobody can claim first place yet.

That was the finale of **31 Nights of r00t**, and it was the last night of a month I'll remember for a while.

This is the story of how it ran, what broke, what held, and what I learned.


## What 31 Nights of r00t Was

31 Nights of r00t was a CTF that ran through the whole of **October 2026**, from **1st October until 11:59 PM on 31st October**. It was hosted by **p3rf3ctr00t** in collaboration with **AfricaHackon**, and it ran on **Dojo**, the CTF platform we built.

It was **individual-based**, with no teams, and challenges were spread across the month instead of being dropped all at once. The idea was simple: give people a reason to open a terminal every night for a month.

The board covered a wide spread of categories: **boot2root, cryptography, forensics, ICS/OT security, malware, steganography, mobile, reverse engineering, binary exploitation, web and miscellaneous**.


## By the Numbers

| | |
|---|---|
| **Registered** | 590 |
| **Actively participated** | 259 |
| **Challenges** | 54 |
| **Challenges solved** | 52 |
| **Duration** | 1 October to 31 October, 11:59 PM |
| **Countries represented** | 21 |
| **Platform uptime** | 100% |
| **In-person finale** | About 60 attended, from 70 who registered |

Registration is a promise and participation is a fact. 259 of the 590 who signed up actually played, which is a healthy number for a month-long event where life gets in the way.

### Players From Around the World

The scoreboard crossed borders. Players came from **21 countries**: Kenya, Uganda, Tanzania, South Sudan, Somalia, Chad, Ghana, Nigeria, Morocco, South Africa, Namibia, Lesotho, Spain, the UK, Belarus, the US, Pakistan, Japan, Taiwan, Indonesia and Australia.

A CTF that spans a month and runs on one platform is open to anyone with a laptop, and it was good to see how far that reached.


## My Side of the Board

I wore four hats on this one:

- **Platform and infrastructure**, together with other members of the team
- **Challenge authoring**, with challenges of my own
- **Challenge author support**, helping other authors get their work running and tested
- **General player support**, handling challenge issues, sanity checks and everything in between

On the authoring side, I built challenges across **nearly every category on the board**, and across every difficulty from easy to hard.

Writing across so many categories in one month was its own education. Each category has its own habits, its own failure modes, and its own idea of what "working" means. Then you have to run all of it on your own infrastructure.

At some point during the month, a player called me, playfully, **very evil** for the challenges I'd set. I'm taking that as the best kind of feedback. It tells me the difficulty was landing the way I'd planned.


## The First Ten Days

I won't pretend the start was smooth.

For roughly the first **seven to ten days**, we fought the usual early-event problems: **instances that wouldn't spawn** and **flags that wouldn't submit**. These are the two faults a CTF platform can least afford, and a player hits them at the worst possible moment.

Around those two came the rest of the usual list: **players unable to reset their passwords**, a **leaderboard that wasn't syncing in real time**, and the assorted bugs that turn up here and there once real people start using a platform.

None of it was a surprise. Real players on a real platform find things a test environment never will. Working with the team, we found the causes and fixed them one at a time, and each fix let us look at the next problem.


## Then It Held

By the last ten to fifteen days, the platform was **stable**. Looking back across the whole month, apart from those early bugs, we had **100% uptime**. At no point did the platform go down.

I'm proud of that. A month is a long time to keep a platform alive, and the drops were not gentle. The release schedule had **mass releases on day one** and a **final burst of drops across the last two days**, with the rest spread through the month. Those are exactly the moments when load spikes, and it held.


## How the Challenges Held Up

Of the **54 challenges**, **52 were solved**. The two that weren't were **two of my hard challenges**, both released on the **last day**. Players didn't hold back on their opinion of them: they were too hard.

First-blood times varied widely:

- **Most challenges** were blooded within the **first 30 minutes** of release, and I'll say thank you to AI for that.
- **A few challenges** took more than **24 hours** to get their first blood.

Watching those numbers come in was humbling. Solve times keep shrinking, and the slow-burn challenges are the ones that now stand out on a scoreboard.


## What Was on the Line

The top 10 earned prizes:

- **Top 3:** Altered Security **CRTP** exam vouchers
- **Top 10:** premium access to **Dojo** and **Skillbit Pro** vouchers
- **Best write-up:** there's also an award for the best write-up, which will be given out

The final top 10 split like this: **5 from Kenya, 4 from Uganda and 1 from Spain**. The podium went to **Kenya, Spain and Kenya**, in that order. East Africa filled most of the board, with a strong showing from Uganda and a player from Spain breaking into the top three.


## The Finale

The season finale was **in person**, at **Hack House Africa**, and it was my favourite part. **70 people registered** to attend, on top of the organisers and the p3rf3ctr00t team, and about **60** showed up.

We went in with a scoreboard full of different names. There were enough challenges left on the board that the CTF stayed **open-ended**: nobody could be called first until the final hours, or even the final moments, of the event. That kept the room tense and everyone playing.

The in-person finale ran from **6 PM to 6 AM (GMT+3)**, a full night. The CTF ran from 6 PM until **11:59 PM**. From **1 AM to 5 AM** we had **three sessions**:

- One on **hacking AI**
- One on **OT security**
- **Chalie**, an OG of the community, who has been around longer than almost anyone and is someone I looked up to when I was getting started. We invited him, and he brought along another OG of the community, **Binary Chunk**, who co-presented with him and shared some real gems. Together they took the room through some **Android pwning**, along with **CVEs and bugs**, including an **N-day** walkthrough.

By the end of it, people were motivated, which is what a night like that is for. From **5 AM to 6 AM**, we walked through the challenges. And people stuck around till the very end.

Watching people at laptops side by side is a different thing from watching a leaderboard. You could see who was struggling and who had just broken through. You could see people go down rabbit holes and come back out, and you could hear the complaints about **decoy flags**. It was fun to watch, partly because I know exactly how that feels. Players could touch base, talk, network, and try things together in the same room.


## What I Learned

- **Expect the first week to be the hardest.** The first ten days taught me more about the platform than months of testing. If I ran it again I'd plan for that period: more eyes, faster response, and a clear way for players to report problems.
- **Writing across every category makes you a better author.** Building boot2root, web, crypto and stego challenges in the same month, and then hosting them yourself, shows you where each one can fail.
- **Running your own infrastructure changes how you design.** When the person who builds the challenge also keeps it alive, you start thinking about spawn times, resets and failure states in the design stage.
- **A team is the whole thing.** I didn't run this alone, and the platform didn't stay up by luck.


## Thank You

31 Nights of r00t happened because of the team behind it. Thank you to everyone who built, tested, supported and fixed things through the month. Thank you to **AfricaHackon** for the collaboration, and to **everyone who played, struggled and came back the next night**.

And for the 259 who showed up: the challenges are yours now.


*The thirty-first night ended. The next one is already being planned.*
