---
title: "The Best Labs Are the Broken Ones"
date: 2026-02-09
draft: false
tags: ["Lab Building"]
image: "/thumbnails/labbuild.png"
description: "A reflection on how building, breaking, and rebuilding labs became one of the most important parts of my growth in cybersecurity"
---

Back in 2019, my home lab was a single Kali box running in Vmware. (Never been a virtualbox guy....)

That was it. One VM, a handful of basic tools, and a vague sense that "real learning" happened when you actually *built* things instead of just reading about them.

Fast forward to now, and I've gone from that single machine to building full Active Directory environments, enterprise-like infrastructures, and eventually scaling all the way up to CTF platforms serving 1700+ participants across 50+ countries.

This post isn't a guide on how to build labs, it's a reflection on how labbing became one of the most important parts of my growth, both professionally and in cybersecurity more broadly.


## The Perfection Trap

When I first started building labs, I had this idea that everything needed to be *perfect* before I could really use it.

I'd spend days setting up an environment, carefully configuring each piece, making sure nothing was out of place. And then I'd be terrified to actually *use* it, because what if something broke? What if I had to rebuild everything from scratch?

This mindset killed momentum. Progress was slow. Experimentation felt risky. I was so focused on building the "right" setup that I wasn't actually learning much beyond the initial configuration.

It took a while to realize that the whole point of a lab is that it *should* break. That's where the learning happens.


## The Shift: Breaking Things on Purpose

At some point, I stopped treating my labs like fragile production environments and started treating them like playgrounds.

I began rebuilding things from scratch regularly. I broke configurations intentionally just to see what would happen. I stopped fearing change and started embracing it as part of the process.

And suddenly, labbing became *fun*.

Instead of carefully preserving a perfect setup, I was tearing things down and building them back up with new ideas. I was testing theories, chasing down weird bugs, and spending hours troubleshooting things that didn't make sense at first.

Some of those troubleshooting sessions were brutal; hours deep in logs, forum threads, and trial-and-error fixes. But every single one taught me something that stuck.

This same pattern played out beyond technical infrastructure too. I started building my blog site, broke it more times than I can count, published on Medium for a while, and eventually landed on a working Hugo-based site that I've refined plenty of times over. Same process: build, break, rebuild, improve.


## What Labbing Actually Built

Looking back, the technical skills were only part of what I gained. Here's what labbing really gave me:

### 1. Confidence & Hands-On Experience
There's a huge difference between knowing how something *should* work in theory and actually making it work in practice.

Building labs forced me to bridge that gap constantly. Whether it was setting up Active Directory environments, deploying open-source tools, or designing challenge infrastructure for CTFs, I had to figure things out hands-on.

That builds a type of confidence you can't get from courses or certifications alone.

### 2. Troubleshooting Skills
Hours spent diagnosing why a service won't start, why authentication is failing, or why a deployment script breaks in production, that's where real troubleshooting skills come from.

Labs gave me a safe space to fail repeatedly and learn how to debug methodically. Those skills transfer directly to real-world work.

### 3. Idea Generation & Experimentation
The more I built, the more ideas I had for new things to try.

A lot of the challenges I've authored for CTFs came from experiments I ran in my own labs first. The infrastructure design for events like PerfectRoot? Built on years of iterating on smaller lab setups and learning what actually works at scale.

### 4. Documentation Discipline
At some point, I started documenting everything I built in Obsidian (The Best Notetaker out there, come for mee......); detailed notes on configurations, hacks, fixes, articles I referenced, and troubleshooting steps that worked.

Over time, this became a personal knowledge repository that I still reference constantly. It's one of the most valuable assets I've built, and it only exists because I committed to writing things down as I went.

### 5. Networking & Community
Labbing also opened doors to connecting with others.

When you're stuck on a weird configuration issue or trying to figure out how to implement something at scale, you reach out. You ask questions in forums, Discord servers, or directly message people who've built similar things.

Sometimes you end up building projects together. Sometimes you just share war stories about things breaking spectacularly. Either way, labbing became a bridge to a wider community of people doing the same thing; learning by building.


## Scaling Up: From One VM to CTF Infrastructure

The progression wasn't linear, but it was steady.

I went from a single Kali box to building full Active Directory labs that mimicked enterprise environments. From there, I started working with containerization, automation, and infrastructure-as-code to make deployments repeatable and scalable.

Eventually, that same approach carried over into building CTF infrastructure; automated challenge deployment, isolated per-team instances, monitoring dashboards, the whole stack.

None of that would have been possible without years of breaking and rebuilding things in smaller labs first.


## Why This Matters

Labbing isn't just about technical skills. It's about developing a mindset.

It teaches you to:
- Learn by doing, not just consuming
- Embrace failure as part of the process
- Build confidence through hands-on experience
- Document what you learn so it compounds over time
- Connect with others who are building and breaking things too

Courses and certifications have their place, but they don't replace the depth of understanding you get from building, breaking, and rebuilding things yourself.


## Looking Back

From a single Kali box in 2019 to CTF infrastructure serving thousands of players, it's been a long road, and labbing has been at the center of it.

If you're on the fence about starting your own lab, my advice is simple: start small, don't chase perfection, and give yourself permission to break things.

The learning happens in the rebuilding.
