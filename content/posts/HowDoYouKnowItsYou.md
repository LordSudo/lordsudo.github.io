---
title: "How Do You Know It's You? A Field Guide to the Most Important Question in Security"
date: 2026-09-24
draft: false
tags: ["Identity Security"]
image: "/thumbnails/identity1.png"
description: "Every login, every API call, every AI agent moving money routes through one question. Here's why the answer is the whole game."
---

Your keycard stops working the day you check out of the hotel.

Not before. Not after some grace period. The exact moment your reservation ends, a door that opened for you a hundred times suddenly doesn't. Nobody explained this to you. You just accept it, the same way you accept that your work badge opens the front door but not the server room, or that your bank calls to confirm a large transfer instead of just processing it.

You've been living inside an identity system your whole life. You just never had to name it.

## The question underneath all of it

Every one of those moments is really the same question asked in a different costume: *how do you know it's you?*

The hotel answers it with a card that expires. Your badge answers it with a door that checks a list. Your bank answers it with a phone call, because a stolen card number isn't enough anymore, they want a second signal. None of these systems know *you*. They know a credential, and they've decided to trust that credential as a stand-in for you, for exactly as long as it makes sense to.

That's identity, stripped of the jargon. Not a password. Not a badge. The ongoing question of whether the thing presenting itself as you is actually still you, and how much you're willing to bet on the answer.

Most people only think about this when it breaks. A friend's Netflix login stops working because someone else is using it in another city. A parent gets a call that "sounds exactly like" their kid, panicked, asking for money. A colleague's email sends a weird link that everyone opens because, well, it's from a colleague. In every case the failure isn't technical. It's that the system trusted a signal it shouldn't have.

## What's actually answering that question inside a system

Zoom into any company and "how do you know it's you" turns into an entire stack of infrastructure most employees never think about, because it's supposed to be invisible.

Somewhere there's a source of truth deciding who you even are inside the organization, one record that every other system checks against. That's identity and access management, IAM, and it's less about locking things down than it is bookkeeping: which accounts exist, what they're allowed to touch, when that access should quietly expire. Sitting on top of it is authentication, the actual moment of proof, a password plus a code plus maybe a fingerprint, because on its own a password only proves you know a secret, not that you're the person who should. Layered above that, for the accounts that matter most, admin accounts, database credentials, the keys that can do real damage, sits privileged access management, PAM, which treats those credentials less like a badge and more like a vault: checked out for a task, recorded while in use, handed back when done, never just sitting in someone's password manager waiting to be stolen.

None of this asks the question once and moves on. The direction everything is moving, often under the banner of Zero Trust, is to keep asking. Not "did this session prove who it was 20 minutes ago," but "does this device, this location, this behavior still look like the person we authenticated." The check never really stops, because a credential proven valid at 9am tells you nothing about who's holding it at 2pm.

And here's the part that doesn't get said enough: almost none of this was originally built for people. It was built for accounts. Somewhere in every company there are service accounts, API keys, and certificates that let one system talk to another without a human anywhere in the loop, machine identity, and recent industry research puts the ratio of machine identities to human ones at somewhere north of 80 to 1, climbing fast. I've seen environments where a decommissioned service account still had standing production access, quietly, for years, because nobody's process ever asked "does this still need to exist." Most identity programs were designed with a person in mind. The population they actually have to govern is overwhelmingly not people at all, and this gap between what identity security was built for and what it now has to cover is exactly where the next section starts.

## Why attackers stopped bothering with the front gate

This is the shift that makes the whole conversation urgent instead of academic: attackers largely stopped trying to break in. They log in.

It's simpler to phish a credential, buy one off a breach dump, or trick a helpdesk into resetting a password than it is to find a zero-day in a firewall. Once an attacker has valid credentials, most of the security stack downstream, the firewalls, the intrusion detection, the endpoint monitoring, doesn't even register anything unusual, because as far as the system is concerned, the right person just showed up. Identity didn't become the new perimeter as a marketing line. It became the new perimeter because it's now the cheapest way in, and the systems answering "is this really you" are the last real checkpoint standing between a stolen credential and everything behind it. This isn't a UK problem or a Silicon Valley problem either, it plays out the same way against a bank in Nairobi or a mobile money platform in Kampala as it does against a retailer in London, because the weak point is never the geography. It's whoever picks up the phone.

## When the front gate was a phone call

In April 2025, Marks & Spencer, a retailer with over 1,400 stores and 65,000 staff, was brought to a standstill by an attack that never touched a firewall or exploited a single piece of software.

The attackers called the company's outsourced IT helpdesk, run by a third-party contractor, and impersonated an employee. They convinced a helpdesk agent to reset multi-factor authentication on a privileged account. That's it. That was the entire technical exploit. From there, the attackers had domain administrator access, and within days they'd encrypted systems and exfiltrated customer data. M&S had to revert to pen and paper to track stock. Online ordering was down for six weeks. The company later estimated the cost at roughly £300 million, and it wasn't alone, the same crew ran the identical playbook against Co-op and Harrods in the same stretch of days.

Sit with how anticlimactic that is. No malware worth analyzing. No clever bypass. A person on the other end of a phone line was asked to vouch for someone's identity, and they did, because the story was convincing and saying yes was easier than saying no.

> They lost £300 million to one identity check, at one helpdesk, done wrong, once.

Every layer of IAM, MFA, and Zero Trust discussed above exists specifically to answer "how do you know it's you" with something more reliable than a helpdesk agent's judgment under pressure, and in this case, none of it mattered, because the reset happened at the one point in the system that was still, fundamentally, a human being trusting another human being's word.

## Then AI walked in and made that same weak point worse

For most of history, humans had one advantage even where the systems were weak: you could usually tell a real voice from a fake one, a real face from a mask. That advantage is going.

In early 2024, a finance employee at the engineering firm Arup joined what looked like a routine video call with the company's CFO and several senior colleagues. Every person on that call except him was an AI-generated deepfake, voice and face both. He transferred $25.6 million before anyone realized the CFO he'd been speaking to didn't exist. Put that next to the M&S helpdesk call and the pattern is uncomfortable: both attacks worked because a human being trusted a voice that sounded right. One used a script. The other used a model. Soon, the difference between those two won't be detectable in real time at all.

Now stack the machine identity problem on top of it. AI agents are increasingly the ones logging in, calling APIs, and taking action on someone's behalf, with credentials of their own, provisioned in a hurry, rarely revisited, and rarely governed with the same discipline as a human employee's account. The systems built to answer "how do you know it's you" now have to answer it for three different kinds of actor at once: a person, a script, and an agent acting with a person's authority, often indistinguishable from the outside until something goes wrong. Most organizations, by their own admission in recent industry surveys, don't yet have controls built for that third category at all.

## Why this is the thing, not a thing

Step back from the keycards and the helpdesk calls and look at what identity actually touches inside an organization: every login is identity. Every API call between two systems is identity. Every dollar an AI agent moves, every file a contractor opens, every privileged command run at 2am, all of it routes through the same underlying question, is this who it claims to be, and is it still allowed to do this. Firewalls guard a perimeter that mostly stopped mattering. Antivirus catches malware that increasingly isn't how anyone gets in anymore. Identity is not one control sitting alongside the others. It is the thing every other control is ultimately trying to protect, because once someone is inside as a trusted identity, the rest of the security stack is just watching them work.

And M&S wasn't a one-off. The same crew ran the identical helpdesk script against Co-op and Harrods in the same week, because it worked the first time and there was no reason to change it. This isn't a story about a retailer that got unlucky. It's a description of the actual attack surface every organization is carrying right now, human and machine identities both, most of them ungoverned, growing faster than anyone's tracking them, and a methodology that is currently working, repeatedly, against companies that never saw it coming. An organization that takes identity seriously isn't buying one more tool. It's deciding to actually know, continuously, who and what is operating inside its walls, rather than finding out the hard way, on the news, six weeks into an outage.

That is the whole argument. Everything else, the acronyms, the vendors, the frameworks, is just the machinery built to answer one question well enough to bet a company on it.

A future post will get into what that machinery actually looks like up close, how organizations build and mature an identity program in practice, where most of them quietly fail, and what good actually looks like when it's working. This one was about why it's worth caring in the first place.
