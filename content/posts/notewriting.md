---
title: "Why I Document Everything (Even When It Feels Like Overkill)"
date: 2026-02-21
draft: false
tags: ["Learning"]
image: "/thumbnails/documentation.png"
description: "How building a personal knowledge system became one of the most valuable habits in my security journey"
---

I started documenting seriously when I joined p3rfectr00t as a CTF player.

Before that, my "notes" were chaos. Random notepad files scattered across folders. Quick thoughts typed into my phone's notepad app. Some half-finished entries in Notion that I'd never look at again.

It worked, until it didn't.

## The Moment It Broke

I was playing a CTF and hit a challenge that felt familiar. I *knew* I'd solved something similar before. I could even picture the notes in my head; the layout, the section headers, the commands I'd documented.

But I couldn't find them.

I spent 50 minutes digging through folders, searching file names, scrolling through old Notion pages. Nothing. The notes existed somewhere, I was sure of it. But in the mess of unstructured documentation spread across three different systems, they might as well have been lost forever.

I ended up solving the challenge from scratch. It took longer than it should have. And the whole time, I was frustrated, not at the challenge, but at myself.

That was the moment I realized: **having notes doesn't matter if you can't find them when you need them**.


## The Shift to Obsidian

Shortly after that CTF, I made the switch to Obsidian.

I'd heard about it from other security folks; markdown-based, local files, flexible structure. It sounded promising, but also overwhelming. Everyone talked about intricate systems, graph views, elaborate linking strategies, plugins stacked on plugins.

I almost didn't start because I thought I needed the "perfect" system first.

Instead, I made one of the best decisions of my documentation journey: **I just started winging it**.

No elaborate folder hierarchies. No complex tagging taxonomy. No rigid templates. Just: open Obsidian, create a note, write things down.

Over time, patterns emerged. I noticed I was creating similar types of notes repeatedly - CTF writeups, challenge ideas, tool configurations, course notes. So I built a few basic templates. Nothing fancy, just enough structure to make starting a new note feel natural.

I added folders when the flat structure got messy. I added tags when I needed better filtering. I created templates for daily notes, CTF writeups, and challenge solving workflows.

The system grew with me, not ahead of me. And that made all the difference.

**Why Obsidian works for me:**

The fact that it's markdown-based means my notes are lightweight, they don't take up much space, and I'm never locked into proprietary formats. If I need to share a note, I can export it as a PDF or just zip the markdown files and send them. It's portable, future-proof, and simple.

That said, Obsidian is just my personal preference. Use whatever tool works for you. Notion, plain text files, a physical notebook. The tool matters less than the habit of actually writing things down.


## The Early Struggles: What Do I Even Write?

Starting was harder than I expected.

The big question haunted me: **What do I write, and what should I skip?**

In the beginning, I made a classic mistake: I copied everything. Study material? Dump it all into notes. Course content? Copy-paste the entire thing. I treated my notes like a backup of everything I was consuming.

The problem was obvious in hindsight: I wasn't *learning*, I was *archiving*. When I went back to those notes, they were just walls of text with no context, no insight, no *me* in them.

Eventually, I grew out of this. I realized that the value of notes isn't in capturing everything. It's in capturing *what matters to me*. My understanding. My interpretation. The "aha" moments. The things I struggled with and figured out.

That shift changed everything.


## Paper and Pen Still Wins (Sometimes)

Here's something I'll admit: **nothing beats writing things down by hand**.

I've always loved paper and pen for studying. There's something about the physical act of writing that helps me remember in a way typing never quite does. It's an old habit, and honestly, it won't die.

Even now, when I'm working through something complex, Active Directory authentication flows, cryptographic concepts, malware behavior, I still grab a notebook and work through it by hand first.

Then, later, I transfer those handwritten notes into Obsidian. It's a two-step process, but it works. The act of writing by hand forces me to think through it once. The act of typing it into Obsidian forces me to clarify and structure it a second time.

Yeah, it's extra work. But for concepts that really need to stick? Worth it.


## What I Actually Document

Now, everything goes into Obsidian:

**Lab Configurations**
- Commands that took forever to figure out
- Setup steps for complex environments
- Troubleshooting notes when things break

**CTF Solutions**
- Challenges I've solved (both my own and others')
- The approach I took
- Dead ends I hit and why

**Research Findings**
- Research and Analysis notes
- Interesting techniques I come across

**Tool Usage**
- Flags and options that aren't obvious
- Workflows that work well
- Gotchas I've hit before

**Error Fixes**
- What broke
- How I fixed it
- Why it broke in the first place

**Challenge Design Notes**
- Ideas for future challenges
- Difficulty reasoning
- Intended vs. unintended solutions

**Course and Learning Notes**
- Certification study material


The key isn't *what* I document. It's that I document *consistently*. Not perfectly. Not exhaustively. Just enough that when I need to reference something six months from now, it's there.


## The Compounding Effect

Here's what changed once I committed to this:

**I stopped solving the same problem twice.**

When I hit an error configuring a tool, I document the fix. Six months later, when the same issue comes up in a different context, I search my notes, find the solution in 30 seconds, and move on. What used to take an hour now takes less than a minute.

**I built challenges faster.**

When I'm authoring a CTF challenge, I pull from research notes I wrote months ago. Ideas I documented casually while learning something new become the foundation for a full challenge later. My notes became a repository of reusable knowledge.

But it's not just research notes. Sometimes I capture random thoughts, ideas that hit me at weird times, half-formed concepts, "what if someone had to solve X by doing Y?" Those go into notes too.

Months later, when I'm designing a challenge, I search my notes and find those random ideas waiting. What felt like a throwaway thought becomes the seed of a full challenge.

Even player feedback gets documented. When someone gets stuck on one of my challenges and mentions it, I write it down. That friction point they hit? It might be an interesting mechanic for a future challenge. My notes turned into a feedback loop that makes my challenge design better over time.

**I learned more deeply.**

Writing things down forces me to understand them. When I document a concept, I have to articulate it clearly enough that future-me can follow it. That process alone solidifies the learning in a way passive reading never does.

**I stopped losing the gems.**

When I'm watching a video walkthrough or someone's stream, sometimes they drop a small detail, something trivial, almost a throwaway but it makes a world of difference. A specific flag on a tool. A shortcut I didn't know existed. A quirk in how a protocol behaves.

If I don't write it down immediately, it becomes a vague memory. "I remember someone mentioned something about that..." but I can't recall what or where.

Now, I capture those moments. Quick notes, even just a sentence. Later, when I need exactly that detail, it's there! Not buried in a 2-hour video I'd have to rewatch, but searchable in seconds.

**I onboarded myself faster.**

When I pick up a new topic, I create a note and start building context. Over time, those scattered notes link together into a knowledge base. When I revisit the topic later, I'm not starting from zero. I'm building on what I already captured.

## What's Not Worth Documenting

I don't document everything. Some things aren't worth the time:

**Trivial syntax I can Google in 5 seconds** – If it's faster to search than to write down, I skip it.

**Things that change too fast** – API documentation that updates constantly isn't worth maintaining in my notes. I link to the official docs instead.

The line I draw: **If I'll need to think through this problem again, I document it. If it's a one-time lookup, I don't.**


## How I Actually Use My Notes

**Search is my best friend.**

Obsidian's search is fast. I hit search, type a keyword, and I'm looking at the relevant note in seconds. No digging through folders. No trying to remember where I filed something.

**Templates keep me consistent.**

When I start a new CTF writeup or challenge design note, I use a template. It's not rigid. I skip sections I don't need but it gives me a starting structure so I'm not staring at a blank page.

**Folders and tags provide just enough organization.**

I use folders for broad categories (CTFs, Research, Labs, Courses). I use tags for finer filtering (osint, crypto, malware, AD). It's simple, but it works.

**I haven't mastered linking yet.**

I know Obsidian's linking and graph features are powerful. I use them occasionally, but honestly, search works so well for me that I haven't felt the need to go all-in on linking yet. Maybe that changes as my vault grows.


## The Backup Strategy

One day, I looked up how to back up Obsidian notes and realized I'd been playing a dangerous game, storing everything locally with no backup plan.

Now, my Obsidian vault automatically pushes to a private GitHub repo. If my laptop dies tomorrow, my notes are safe. It was a 20-minute setup that gave me permanent peace of mind.


## If You're Starting from Scratch

Here's what I'd tell someone just starting:

**1. Don't wait for the perfect system.**

Just start. Pick a tool (Obsidian, Notion, even a folder of markdown files) and begin writing things down. The structure will emerge as you go.

**2. Focus on searchability over organization.**

You don't need elaborate folder hierarchies. You need to be able to *find* things. Good search beats perfect organization every time.

**3. Document problems you've solved, not just facts.**

The most valuable notes aren't summaries of articles, they're your troubleshooting steps, your thought process, your "here's what worked when X broke."

**4. Consistency beats perfection.**

A mediocre note today is better than a perfect note you never write. Capture it now, refine it later if needed.

**5. Start simple, add complexity only when needed.**

Templates, plugins, tags, links, add them when you feel friction, not because they sound cool. Let the system grow with you.

## Looking Back

The version of me searching desperately for notes during that CTF had the right instinct: document things. But without structure or searchability, those notes were functionally useless.

The version of me now has a system. Not a perfect one. Not an elaborate one. But one that works.

I can find what I need in seconds. I build on past knowledge instead of relearning from scratch. I solve problems faster because I've already solved them once and wrote it down.

That's the real value of documentation: it compounds. Every note you write is an investment in future-you. Six months from now, a year from now, you'll thank yourself for writing it down.

So start writing. Don't wait for the perfect system. Don't overthink the structure.

Just open a note and capture what you're learning. Future-you will appreciate it.
