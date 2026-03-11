---
title: "CTF Points Don't Matter (But CTF Skills Do)"
date: 2026-03-10
draft: false
tags: ["CTF", "Learning", "AI"]
image: "/thumbnails/ctf-vs-ai.png"
description: "Why chasing scoreboard positions misses the point and how AI is forcing us to confront what CTFs actually measure"
---

You spend hours designing a crypto challenge. Not trivial, but not impossible some mathematical reasoning, scripting required, maybe five minutes for a competent solver who knows what they're doing.

The CTF goes live.

First blood: 90 seconds.

You stare at the timestamp. Did they even understand what they solved? Or did they paste it into an LLM, upload the challenge files, and wait for a flag?

You'll never know.

Welcome to CTFs in 2026.


## The Journey: From Noob to Creator

When I first joined p3rfectr00t, I couldn't solve anything.

The more advanced players would tear through challenges while I was still stuck on reconnaissance. Medium and hard challenges? Forget it. I was a complete noob (still am, honestly). As a team competing for prizes, I felt useless. What's the point of being on a team if you can't contribute to the scoreboard?

It was demotivating.

But then something clicked. I didn't join p3rfectr00t to only win CTFs (we still do that....) I joined to learn from people who were better than me. Even if I couldn't solve a single challenge during the competition, I could reach out afterward. Ask for writeups. Pick their brains. Understand how they approached problems I couldn't crack.

That's when the real learning started.

And once I got in the groove, I got hooked. The dopamine loop was real: 

CTF goes live → find challenges → solve them → fight for first bloods → submit flag → feel the rush. 

That feeling is incredible. For years, that was the game.

But after enough CTFs, the dopamine starts to fade. Not completely. It's still there but it dulls. The rush of first blood stops being the point.

The mindset shifted.

Now, I play CTFs primarily to learn. Yes, I still want to win. I still love the bragging rights. But the real objective is simpler: when the CTF ends, did I learn something new?

I've played CTFs where I was nowhere near the top of the scoreboard but walked away thinking, "Wow, that was worth it." I've also played CTFs where I scored well but learned nothing. One of those feels meaningful. The other feels empty.

Starting to create challenges pushed this shift even further. Now I play CTFs not just to solve, but to absorb ideas, explore new techniques, and figure out how to turn those concepts into challenges of my own. That wouldn't be possible if I only cared about the scoreboard.

I also revisit writeups for challenges I've already solved, not to pad my stats, but to learn different approaches, understand other solvers' thought processes, and refine my own methodology.

The scoreboard became less important. The learning became everything.


## Then AI Arrived

And suddenly, creating challenges got harder.

You pour hours into crafting something, researching techniques, balancing difficulty, testing edge cases. Then someone solves it in minutes. Not because they're brilliant. Because they pasted the entire challenge into ChatGPT and let the model do the work.

AI SLOP.

It's demoralizing in a way that's hard to articulate. As a creator, you can't always tell for sure. But you can suspect. The timing gives it away. A crypto challenge that should take at least five minutes gets first blooded in under two. A web challenge that requires chaining multiple steps gets solved before you'd expect someone to finish reconnaissance.

You know what happened. You just can't prove it.

And it's not just base-model LLMs anymore. Some players are running custom-trained models specifically optimized for CTF categories. Others have max-tier subscriptions where they can upload files, paste entire challenges, and wait for a working exploit.

Common categories like crypto, web, reverse engineering are getting demolished faster than ever. Creating challenges that resist AI is nearly impossible because the models improve every month. What's hard for an LLM today might be trivial for the next version.

The question becomes: do you design challenges assuming AI will be used, or do you try to resist it? Either way feels like losing.


## The Data Backs This Up

I was in the middle of drafting this post when I came across a whitepaper by Mr. Jacob Krell, a highly respected member of the cybersecurity community. The study analyzes first blood data from 423 Hack The Box machines spanning March 2017 through October 2025. [You can read the full whitepaper here.](https://suzulabs.com/suzu-labs-blog/the-death-of-the-ctf-how-agentic-ai-is-reshaping-competitive-hacking)

The findings are striking:

- **Root blood times are declining 16.5% per year** (statistically significant, p < 1e-10)
- **Post-LLM era shows massive compression across all difficulty tiers:**
  - Easy machines: 47% faster
  - Medium: 32% faster
  - Hard: 27% faster
  - Insane: 67% faster (median dropped from over 15 hours to ~5 hours)
- **Privilege escalation is compressing faster than initial foothold** (27-41% reduction across tiers)
- **In HTB's AI vs. Humans competition, five of eight AI agent teams solved 19 out of 20 challenges (95% solve rate)** against 403 human teams

The study's central question hits hard: *"If autonomous agents now dominate competitions designed to identify top security talent, what are CTFs actually measuring?"*

This isn't speculation. This is measured, documented, proven. The compression in solve times aligns almost perfectly with the release of high-capability language models and agentic frameworks.

I reached out to Jacob to ask if I could reference his work in this post, and he graciously agreed. The whitepaper is worth reading in full if you want the technical breakdown, but the takeaway is clear: **AI is fundamentally reshaping what CTF performance means.**



## The Real Question: Why Are You Playing CTFs?

Here's where it gets uncomfortable.

If you're playing CTFs just for the prizes and the scoreboard, go ahead. Use all the LLMs you want. No judgment. Prizes are real. Bragging rights matter. Competition is fun.

But be honest about what you're optimizing for.

**The scoreboard resets.** Your rank is temporary. Next CTF, you start from zero again.

If you're playing to learn, to grow, to evaluate your skills, to benchmark yourself against others in the field then AI and LLMs are just tools. Same as reading a blog post. Same as Googling command syntax. Same as watching a walkthrough.

**The difference is whether you're using AI to accelerate understanding or bypass it.**

Are you using an LLM to speed up research so you can focus on the creative parts of the exploit? That's a tool.

Are you pasting the entire challenge into ChatGPT, copying the output, submitting the flag, and moving on without understanding what just happened? That's not learning. That's stat padding.

And with the advancement of AI, we have no choice but to embrace the wave. The technology isn't going away. The question is how we use it.



## How I Actually Use AI in CTFs

I'll be honest: I've used LLMs and AI tools when playing CTFs.

Not for full solves. But I'd be lying if I said I haven't used them at all.

**What I've used AI for:**
- Speeding up research (summarizing documentation, finding relevant CVEs)
- Command syntax lookups (when I know what I need but forget the exact flags)
- Debugging scripts (when something breaks and I need a second pair of eyes)
- Modifying payloads (adapting existing exploits to new targets)
- Troubleshooting errors (interpreting stack traces, understanding why something failed)

**What I don't use AI for:**
- Handing over the entire challenge and waiting for a flag
- Solving steps I don't understand
- Skipping the learning process

The line is simple: **Am I still in the loop?**

If I'm using AI to speed up parts of the workflow I already understand, that's fine. If I'm using AI to avoid understanding something, that's a problem.

AI as an assistant? Useful. AI as a replacement? You're lying to yourself about what you're learning.


## What Actually Transfers (The Skills That Matter)

Here's the thing about CTF experience: **your rank doesn't matter professionally. Your skills do.**

**What transferred from CTFs to real work:**
- **Problem-solving methodology** (reconnaissance → exploitation → pivot)
- **Research ability** (finding obscure documentation, CVEs, techniques)
- **Tool proficiency** (knowing what exists and when to use it)
- **Challenge design thinking** (understanding both sides-solver and creator)
- **Community connections** (p3rfectr00t → HTB chapters → professional opportunities)
- **Teaching ability** (if you can explain a concept clearly, you understand it deeply)

**What didn't transfer:**
- Scoreboard position (nobody asks for your HTB rank in an interview)
- Speed solving (real engagements aren't timed races)
- Grinding points (doesn't make you better, just higher ranked)

The opportunities I've had didn't come from being top 100 on a leaderboard. They came from my ability to design challenges, explain concepts, and demonstrate that I understand the underlying mechanics not just the flags.

**The scoreboard is a proxy for skill. It was never the skill itself.**


## If You're Just Starting Out

If you're new to CTFs and trying to figure out how to approach them in 2026, here's what I wish someone had told me:

**Don't compare yourself to the leaderboard.** You're not just competing against other humans anymore. You're competing against players with custom AI pipelines, max-tier LLM subscriptions, and years of experience. The scoreboard doesn't reflect your skill (to a certain extent), it reflects a mix of factors you can't control.

**Focus on understanding one technique deeply instead of solving ten challenges shallowly.** It's tempting to chase volume, to rack up solves and feel productive. But surface-level exposure to ten different vulnerabilities won't stick. Deep understanding of one concept will.

**Use AI as a learning tool, not a crutch.** If you get stuck and ask an LLM for help, don't just copy the output. Read it. Understand it. Try to explain it back in your own words. If you can't explain what the AI gave you, you didn't learn it.

**Your goal: can you explain what you did to someone else?** If you solve a challenge, with or without AI, and you can walk someone through your process from start to finish, you learned something. If you can't, you just collected a flag.



## If You're a Creator Frustrated by AI

I get it. You pour hours into a challenge, and someone AI SLOPs it in minutes. It stings.

But here's what I've learned:

**Design challenges that teach, not just test.** Your goal isn't to stump people. It's to guide them through a concept in a way that makes them better. If someone uses AI to solve it but walks away understanding the technique you were teaching, you still won.

**Accept that AI will solve some things fast-that's okay.** You can't fight this. The models will keep improving. The speed will keep increasing. That's not a reflection on your challenge design.

**The players who learn from AI-assisted solves are still getting value.** Not everyone who uses AI is mindlessly copying output. Some are using it to accelerate research, debug faster, and understand concepts they wouldn't have grasped alone. Those players are still learning.

**Focus on the 1% who message you afterward to say "that challenge taught me X."** Most players will never reach out. But the ones who do, the ones who learned something meaningful from your work, those make it worth it.



## If You're a Competitive Player

**If you're using AI to win, own it! Don't pretend you're not.** There's no shame in using the best tools available. But be honest about what you're optimizing for. If it's the prize, fine. If it's the rank, fine. Just don't tell yourself you're building deep security skills when you're really building prompt engineering skills.

**The real competition is against yourself six months ago.** Can you solve challenges now that you couldn't solve back then? Do you understand techniques more deeply? Can you explain concepts you used to struggle with? That's the scoreboard that actually matters.



## The Uncomfortable Truth About First Bloods

I used to chase first bloods religiously.

The dopamine hit when you're the first to crack a challenge? Unmatched. The adrenaline of racing against the best players in the world? Addictive.

But now I have to ask: **does first blood even mean anything anymore?**

If someone gets first blood in 90 seconds on a challenge that should take five minutes, did they outthink everyone else, or did they have a better AI pipeline?

The race is increasingly about **who has the best tooling**, not who's the best hacker.

And if you're learning from the solve. If you understand what you did and can explain it, who cares about the timestamp?

First blood is fun. But it's not the point.



## Creating Challenges in the AI Era

As a challenge creator, this shift is frustrating.

Do you design challenges to resist AI? **Impossible.** The models get better every month. What stumps GPT-4 today might be trivial for the next version.

Do you design assuming AI will be used? **Feels like giving up.**

The approach I've settled on: **create challenges that teach, regardless of how they're solved.**

If someone uses AI to blow through my challenge in two minutes, I can't stop them. But maybe, just maybe they read the AI's output and learned something. Maybe they saw a technique they hadn't encountered before. Maybe it sparked curiosity.

I'll never know. And that's the frustrating part.

But the alternative, stopping challenge creation entirely because AI exists isn't an option.



## What CTFs Actually Measure (And What They Should)

Before 2022, CTF scoreboards measured **pure human hacking skill.**

Now? It's an unclear blend of human skill + AI tooling + prompting ability.

Jacob Krell's whitepaper recommends what chess did two decades ago: **separate human and AI tracks.** Chess has pure human competition, pure engine competition, and "centaur" chess where human-AI teams compete. Each track measures something different. Each has value.

I agree with this approach. Let's try separation.

**In the meantime, we can explore:**
- **Immediate verification of solves** (live calls with solvers, asking questions the solver must have encountered if they actually solved it vs. AI SLOP'd it)
- **Author Q&A** (challenge creators asking follow-up questions that reveal depth of understanding)
- **Detailed solve walkthroughs** (requiring players to explain their process, not just submit a flag)

The challenge with these approaches: a determined player can still ask the AI to generate a detailed walkthrough. It's an arms race.

**For onsite CTFs**, limiting AI is more feasible. Proctored environments. No external tools. Pure human problem-solving.

But for online platforms? Long-term, we have to **embrace AI and figure out how to evolve CTFs to the next level** rather than fight a battle we can't win.

The question isn't whether AI will be part of CTFs. It's how we structure competition so that both human skill and AI-augmented performance can be measured meaningfully.



## Maybe This Is Just Evolution

Here's the counterargument I have to acknowledge:

**Maybe resisting AI in CTFs is like resisting calculators in math.**

Chess players said the same thing when engines arrived. They worried that chess would die, that human competition would become meaningless, that the game would lose its soul.

But chess didn't die. It evolved.

Now chess is bigger than ever. There are human-only tournaments. Pure engine competitions. And "centaur" chess, where human-AI teams compete and produce the highest quality games ever played. Each track measures something different. Each has value.

Maybe CTFs are heading down the same path.

Maybe the future of security *is* AI-augmented work. Maybe the best security professionals will be the ones who can orchestrate AI agents effectively, not the ones who can manually enumerate a network the fastest. Maybe we're not losing something, we're gaining a new dimension of competition.

**And maybe that's okay.**

Here's my response:

**That's valid if we structure it properly.**

The problem isn't that AI exists. The problem is the ambiguity. Right now, CTF scoreboards measure an unclear blend of human skill, AI capability, and prompt engineering. Nobody knows what a first blood actually signifies anymore.

Separate tracks solve this. A human-only track preserves the signal for manual exploitation skill. An AI-augmented track lets players push the boundaries of human-AI collaboration. An open track lets people use whatever they want.

Each track answers a different question. Each reveals different capabilities. And critically, **people can choose what they're optimizing for** instead of pretending we're all playing the same game when we're clearly not.

The evolution is fine. The ambiguity is the problem.


## The Way Forward

AI isn't going away.

CTFs will continue to evolve. The scoreboard will keep resetting. And people will keep chasing points.

But here's what I know for sure:

**Points were always a means to an end: learning. They were never the end itself.**

If you're using AI to get flags without understanding what you're doing, you're optimizing for a metric that doesn't matter. You're collecting points that will disappear the moment the next CTF starts.

**The scoreboard resets. The skills compound.**

Ask yourself: **Six months from now, what do I want to have gained? A higher rank, or deeper knowledge?**

One of those will still be valuable when the leaderboard clears. The other won't.


## What I'd Tell My Past Self

If I could go back to when I first joined p3rfectr00t, when I was sitting there feeling useless because I couldn't solve anything, here's what I'd say:

**Stop caring about the scoreboard sooner.** The players you admire, the ones crushing challenges while you're still stuck on reconthey're not grinding for points. They're building understanding. They've been where you are. They just spent more time learning deeply instead of chasing volume.

**Learn one thing deeply per CTF, not many things shallowly.** You'll forget the ten challenges you rushed through. You'll remember the one concept you truly mastered.

**Your rank will be forgotten, but the techniques you master will compound.** Nobody remembers who placed 47th in some random CTF three years ago. But the problem-solving methodology you develop? The research skills? The ability to break down complex systems? Those stay with you.

**The scoreboard is just feedback. It's not the goal.**


## What Compounds

I still play CTFs.

I still create challenges.

I still care about the craft.

But I stopped measuring success by the scoreboard a long time ago.

**The real metric:**
- Did I learn something new?
- Can I teach it to someone else?
- Can I build a challenge around it?

That's what compounds.

The points? Those are just noise.

As a parting shot......

**If AI can solve it for you, did you really solve it at all?**