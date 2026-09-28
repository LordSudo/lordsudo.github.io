---
title: "What Good Looks Like: Building an Identity Program That Survives Contact"
date: 2026-09-28
draft: false
tags: ["Identity Security"]
image: "/thumbnails/identity2.png"
description: "Part 1 asked why identity is the whole game. Part 2 is about what a program actually looks like when it's played well."
---

At the end of the [last post](https://blog.lordsudo.com/posts/howdoyouknowitsyou/), I said the M&S breach wasn't a story about a company that got unlucky, it was a description of an attack surface every organization is carrying. That raises the obvious next question: what does it actually look like to carry it well?

Not "buy this tool." Not a vendor slide. What the machinery underneath a mature identity program actually does, day to day, long before anyone's testing whether it holds up under a phone call it shouldn't answer.

## The moment nobody's watching

Every identity program lives or dies on three unglamorous events: someone joins, someone moves, someone leaves. In the industry this gets shortened to JML, joiner, mover, leaver, and it sounds like paperwork. It isn't. It's the entire lifecycle that either keeps access matched to reality or slowly drifts away from it.

Joining is the easy part, mostly. Someone starts, they get an account, access gets provisioned against a role. Moving is where things start to rot: someone changes teams, and their old access rarely gets removed, it just sits there next to the new access, because revoking things is nobody's job in the moment and everybody's problem eventually. Leaving is where it gets dangerous. A person exits, their account is supposed to die with the relationship, and in a well-run program it does, same day, no exceptions. In most programs it doesn't. It gets deactivated eventually, sometimes weeks later, sometimes never, and in the meantime the access is still live, still valid, still answering "how do you know it's you" with a yes it shouldn't be giving anymore.

I mentioned last time that I've seen a decommissioned service account with standing production access, quietly, for years. That's a leaver event that never happened, just for a machine instead of a person. Multiply that pattern across every account, human and machine, that anyone's ever moved off or shut down, and you start to see what "identity debt" actually looks like inside a real environment. It's not a hypothetical. It's every access grant nobody ever went back to close.

## Who's actually the source of truth

Here's a mental model most people get backwards without realizing it: they assume IT, or Active Directory, decides who someone is inside the company. It doesn't. AD is a downstream system, it reflects a decision that's already been made somewhere else. The actual source of truth, in any program built correctly, is HR.

When someone is hired, HR knows first, before any system does, because the offer letter exists before the account does. When someone changes role, HR's records change first. When someone leaves, HR's termination date is the one date that should trigger everything else automatically, not a ticket someone remembers to file. A mature identity program treats HR as upstream and everything else, AD, the applications, the access itself, as downstream consequences that should update automatically when the upstream fact changes. A program that treats IT as the source of truth is always one manual step behind reality, because IT finds out a person left the same way everyone else does, after the fact.

This sounds like a small distinction. It isn't. It's the difference between an identity program that's reactive, waiting to be told things are out of date, and one that's structurally incapable of drifting far from the truth, because the truth is what's actually driving it.

## Maturity isn't a purchase, it's a question of how much you actually know

Ask most security leaders if they have IAM and they'll say yes. Ask them a better question: if someone in your organization changed roles eighteen months ago, do you know, right now, whether their old access was ever removed? Most can't answer that with confidence, and that gap is what maturity actually measures.

A program with low maturity has the tools but not the discipline: an IAM platform exists, but access reviews happen once a year if at all, and mostly rubber-stamp whatever's already there because nobody has the context to say no. A program with real maturity has continuous certification, someone with actual knowledge of what a role needs is periodically asked "does this person still need this," not annually as a compliance exercise but as a living process, and the answer changes things. The difference isn't the software. Two companies can run the identical platform and land at completely different maturity levels, because maturity lives in the discipline wrapped around the tool, not in the tool itself.

This is worth sitting with, because it's the part vendors have the least incentive to tell you. A license doesn't buy discipline. It buys the capability to build discipline, if someone actually does the unglamorous, ongoing work of using it that way.

## The expensive line item nobody explains

Here's a pattern I've seen play out almost identically more than once: a company gets a quote for an identity governance platform, looks at the number, and calls it expensive. Usually they're not wrong that it's a big number. They're usually wrong about what's actually driving it.

A large chunk of that cost, more often than not, is separation of duties enforcement, SoD, the part of the platform that checks whether any single person has been quietly handed a combination of access that lets them do something they shouldn't be able to do alone. The classic example: someone who can both create a vendor in the finance system and approve payments to that vendor. Individually, both are reasonable access grants. Together, they're a fraud pathway that isn't hypothetical, it's exactly how a lot of internal fraud actually happens, and most companies have dozens of these combinations sitting live in their access model without anyone having ever mapped them.

SoD checking is expensive because it's genuinely hard: it means modeling every meaningful combination of access across every system, and flagging it continuously as people move roles and pick up new permissions. It's also, not coincidentally, one of the first things that gets scoped out as a separate add-on when a company tries to bring a quote down, which is exactly backwards, because it's often the single highest-value thing the platform does. I've watched the conversation shift, more than once, from "why is this so expensive" to "oh, this is the part that actually catches the thing we're worried about" the moment someone walks through what SoD is actually checking for. That reframe, from cost to control, is usually the whole sale, and it's a conversation almost nobody has out loud before the invoice arrives.

## Discipline, not tools

None of this is really about products. A JML process that fires reliably, an org that treats HR as the actual source of truth, a maturity model built on continuous review instead of annual box-ticking, an SoD model that's actually been mapped instead of assumed, none of it requires a specific vendor. It requires someone deciding that identity is worth maintaining continuously, the same argument the last post ended on, just made concrete here instead of abstract.

The organizations that survive a call like the one M&S got aren't the ones with the biggest platform. They're the ones where a helpdesk agent resetting MFA on a privileged account would have triggered something, a second approval, a step-up check, an alert that didn't exist for M&S but should have. That's not a tool you buy off a shelf. It's a program somebody built, on purpose, and kept maintaining long after the initial rollout stopped being exciting.

That's what good actually looks like. Not the absence of risk. The presence of a system that's still watching, continuously, long after everyone else in the building has stopped thinking about it.
