---
title: "HTB Kenya's First IRL Meetup: 150 Hackers, One Room, Pure Energy"
date: 2026-05-10
draft: false
tags: ["HTB"]
image: "/thumbnails/htbkemeetup.png"
description: "From observer to speaker: Reflections on HTB Kenya's first physical meetup"
---

There's something about being in a room with 150+ hackers that hits different.

The energy. The noise. The spontaneous technical debates that break out during breaks. The moment you put a face to a username you've known for months. The realization that the community you've been part of online actually exists in three dimensions.

On May 9th, 2026, HTB Kenya held its first-ever physical meetup in Nairobi. Full day event. Organized by the HTB Kenya team in partnership with Safaricom, with P3rf3ctr00t and Uguntu as sponsors (I'm part of both, so this felt extra meaningful). And it was everything I hoped it would be.

## The Setup

150+ hackers in one space. Full-day format. Multiple sessions covering everything from offensive techniques to AI-augmented hacking to defensive tradecraft.

The vibe from the start was electric. People who'd only interacted through Discord channels, Twitter threads, and virtual meetups were finally meeting face-to-face. Conversations flowed easily. The technical level was high. The curiosity was genuine.

This wasn't just another event. This was the community materializing.


## My Session: Building Attack Timelines from Scratch

I had a 2-hour slot to cover **CrownJewel**, an HTB Sherlock focused on NTDS.dit dumping and triage. [Link to Sherlock](https://app.hackthebox.com/sherlocks/CrownJewel-1).

But I didn't want to do the usual artifact parsing → answer questions workflow. That's functional, but it doesn't teach the methodology. It doesn't show how you actually think through an investigation.

So I flipped it.

**We started from zero and built the entire attack timeline together.**

Here's how it went:

1. **Broke down the scenario** - What are we actually investigating? What's the context?
2. **Identified keywords** - What terms matter? What signals should we watch for?
3. **Built a hypothesis** - Before touching artifacts, what do we think happened?
4. **Analyzed the artifacts** - What do we have? What does each piece tell us?
5. **Connected everything** - How do the pieces fit together?
6. **Answered the questions** - Now that we understand the attack, the answers are obvious

The audience was incredibly engaged. Active questions. Thoughtful observations. People connecting dots in real-time. By the end, we had a complete attack timeline - not just answers to lab questions, but a full understanding of how the attack unfolded and why each step mattered.

That's what I wanted. Not just solutions, but the thinking process that gets you there.


## Hacking with AI: The Chasing Flags Magic Show

My favorite session of the day came from the team at **Chasing Flags**. Absolute legends, those guys.

Their topic: **Hacking with AI**.

But this wasn't a surface-level "ChatGPT can help you write exploits" talk. This was a proper technical deep-dive into building an AI agent that hacks autonomously and learns in real-time.

They walked through:
- The architecture of the agent
- The methodology behind its decision-making
- The technologies powering it
- How it learns from successes and failures
- The challenges of building something that can adapt on the fly

And then they ended with a moment of pure magic: **a live demo**.

The agent, running live, attacking an HTB machine. We watched as it enumerated, pivoted, exploited, and escalated privileges - all while learning and adjusting its approach in real-time.

The room went silent. Then erupted. Watching an AI agent pwn a machine autonomously while you're sitting there with 150+ other hackers? That's the kind of experience you can't get from a recording or a blog post.

It wasn't just impressive. It was a glimpse into where offensive security is heading.


## The IRL Difference

I've run plenty of virtual HTB sessions. I know how to present over Discord. I'm comfortable with screen shares and chat Q&A.

But this was different.

**You can't replicate the energy of a room full of people who are genuinely excited to be there.** The side conversations during breaks. The questions that turn into 10-minute technical debates. The spontaneous "wait, show me that again" moments. The handshakes and introductions that turn into collaborations.

I met people I've only known online. Names I'd seen in Discord channels for months finally had faces. Usernames became humans. And more than a few people came up to tell me they'd been following my work and were excited to finally meet me.

I didn't know I had fans out there. That was humbling.

But the real highlight for me was meeting some of the people who've been legends in the Kenyan security space since I started. The ones whose sessions I used to join quietly, just to learn. The ones whose writeups I studied when I was figuring out how CyberSec even worked. Getting to talk to them as peers - not just as an observer anymore - felt surreal.


## A Full Circle Moment

Here's the part that hit me harder than I expected:

I remember the early days of HTB Kenya. When it was just a handful of people running virtual sessions. When I was sitting in the back of those Discord calls, quietly absorbing everything, not saying much, just trying to learn.

I wasn't a speaker. I wasn't a contributor. I was just there.

Fast forward to now. I've been an active speaker for HTB Kenya for over a year. I've run sessions for HTB Uganda. I've spoken at HTB Zimbabwe. I've built challenges, written blogs, organized meetups.

And now I was standing in front of real people at HTB Kenya's first physical event, walking them through an investigation methodology I'd spent months refining.

That's not a flex. That's just the reality of what consistent participation in a community can do.

The community I used to watch from the sidelines is now one I actively help build. The sessions I used to passively consume are now sessions I deliver. The writeups I used to read are now writeups I write.

That transformation didn't happen overnight. It happened through showing up. Repeatedly. Over months and years. Learning in public. Contributing when I could. Asking questions when I couldn't. Staying engaged even when I felt like I had nothing valuable to add.

HTB Kenya gave me a space to grow. This event was a reminder of how far that growth has taken me - and how much further it can still go.


## Gratitude

Massive kudos to the HTB Kenya team for pulling off a flawless event from start to finish. Organizing a physical meetup for 150+ people is no small feat. The logistics alone - venue, scheduling, speakers, sponsors, food, tech setup - could easily go sideways. Nothing did.

Everything ran smoothly. Every session delivered value. Every attendee left energized.

That doesn't happen by accident. That happens because the organizers care deeply about the community they're building.

Thank you to Safaricom for partnering on this. Thank you to P3rf3ctr00t and Uguntu for sponsoring. And thank you to every single person who showed up, engaged, asked questions, and contributed to the energy in that room.


## Looking Forward

This was HTB Kenya's first physical meetup. It won't be the last.

The response was overwhelming. The demand is there. The community is growing. And now that we've proven we can do this once, doing it again - and doing it better - is inevitable.

I'm already looking forward to the next one.

Not just as a speaker. As a community member who gets to watch this thing keep growing.

Because that's what this is really about. Not the sessions. Not the demos. Not the technical content (though that's all great).

It's about the people. The connections. The realization that you're not alone in this space. That there are others who care about the same things you care about. Who get excited about the same weird technical details. Who are willing to spend a full Saturday learning, teaching, and building together.

That's what makes events like this matter.


## Final Thought

If you've been participating in your local security community only online, find a way to show up in person when the opportunity comes.

It hits different.

The energy is different. The learning is different. The connections are different.

And if you've been sitting quietly in the back of virtual sessions, just learning - like I used to - know this: you belong there. Your questions matter. Your growth matters. And eventually, if you keep showing up, you'll find yourself not just learning from the community but contributing to it.

HTB Kenya's first IRL meetup reminded me why I care about this work. Why I keep writing blogs, running sessions, creating challenges, and showing up for the community.

Because when you invest in a community, it invests back in you.

And that's worth every minute.
