---
title: "The Sands of Time - 0xfun CTF 2026"
date: 2026-02-16
draft: false
tags: ["OSINT", "CTF"]
image: "/thumbnails/sandsoftime.png"
description: "OSINT Challenge Walkthrough"
---

## Challenge Description

*The City of Baths whispers in integers. Within it lies an eatery where numbers are not decoration, but identity.*

*Once identified, reverse the arrow of time to uncover a nearby neighbour; a name borrowed from a dynasty older than calendars, rooted in the age of the pharaohs.*

*Remember, Proximity matters more than relevance.*

*The answer is not hidden behind clicks or forms, but in how the past presents itself online.*

*The URL itself is the answer.*


## Behind the Design

When I built this challenge, I wanted to test something specific: **whether players could follow layered, indirect clues without explicit instructions**.

Too many OSINT challenges either hand you the answer with a thin layer of obfuscation, or bury you in noise with no clear direction. I aimed for something in between; a challenge that rewards careful reading and structured thinking, where each clue builds on the last.

The core mechanic here is **pivoting**. You start with geography, move to branding, explore history, then shift focus to proximity and imagery. Each step is intentional. Each phrase matters.

I also wanted to include a deliberate rabbit hole; the Wayback Machine. It's the obvious tool when you see "reverse the arrow of time," and it *does* provide context, but it's not where the flag lives. Players who get stuck there are missing the pivot: **proximity matters more than relevance**.

From the feedback I received (including the players who "wanted to finish me"), the challenge hit the difficulty sweet spot I was aiming for. It looked simple at first glance, but required players to slow down and think through what each clue was actually pointing to.

Now, let's walk through the solve.



## The Walkthrough

### Step 1: Decoding "The City of Baths"

*"The City of Baths whispers in integers."*

The first clue establishes a geographical anchor. "City of Baths" is a well-known nickname, and a quick Google search reveals the answer: **Budapest**.

Budapest is famous for its thermal baths—Széchenyi, Gellért, Rudas—making this reference immediately recognizable to anyone familiar with European cities.

This confirms the location. Now we move to the next layer.


### Step 2: Finding the Eatery

*"Within it lies an eatery where numbers are not decoration, but identity."*

Key terms here:
- **eatery** (a restaurant)
- **numbers** (integral to the name)
- **identity** (not just a menu item or address—this is the *brand*)

Searching for "restaurants in Budapest with numbers in name" quickly surfaces **TwentySix Budapest**—a restaurant whose entire identity is numeric.

This isn't a coincidence. The name is the concept. Numbers aren't decoration here; they *are* the identity.

We've now identified the primary target location.


### Step 3: The Time Reversal Trap

*"Once identified, reverse the arrow of time…"*

This phrase screams **Wayback Machine**.

Many solvers went straight there. The Wayback Machine is the default OSINT tool for historical web content, and "reverse the arrow of time" is a classic prompt for it.

But here's the thing: while the Wayback Machine *does* provide context about the restaurant's history, it doesn't yield the flag. This is the intentional rabbit hole.

The real lesson here is in the next line.


### Step 4: The Pivot - Proximity Over Relevance

*"Uncover a nearby neighbour…"*  
*"Proximity matters more than relevance."*

This is the critical moment in the challenge.

The clue explicitly tells you to **stop digging into the restaurant itself** and start looking at what's physically nearby.

This shifts the OSINT methodology from web searches and archives to **geospatial intelligence**.

The tool of choice? **Google Earth**.


### Step 5: Exploring the Neighborhood

Open Google Earth and navigate to TwentySix Budapest.

Now, instead of zooming in on the restaurant, explore the surrounding area. Look at neighboring businesses. Check the street view.

But here's where "reverse the arrow of time" becomes relevant again—not through the Wayback Machine, but through **Google Earth's historical imagery feature**.

By scrolling back through older dates of the same street, you can see what businesses existed in the past and how the area has changed over time.

One shop stands out.


### Step 6: The Egyptian Connection

*"…a name borrowed from a dynasty older than calendars, rooted in the age of the pharaohs."*

Nearby, you find a shop called **Tutanhamon**.

This immediately satisfies the Egyptian reference in the challenge description:
- A dynasty older than calendars? Check.
- The age of the pharaohs? Check.

The connection is direct and undeniable.

Now we're close.


### Step 7: The Flag in Plain Sight

*"The answer is not hidden behind clicks or forms…"*  
*"The URL itself is the answer."*

Zoom in on the Tutanhamon shop entrance using Google Earth imagery.

On the shop door, clearly visible in the street view, is a **URL**.

The challenge explicitly states that the answer is not behind clicks or forms—it's visible, in plain sight. The URL on the door *is* the flag, exactly as displayed. No modification, no trimming, no guessing.

Submit the URL as-is, and you're done.

0xfun{tut-kiallitas.hu}

## Key Takeaways

This challenge rewards **interpretation over brute force**.

Every clue is intentional:
- **Geography** → City of Baths = Budapest
- **Branding** → Numbers as identity = TwentySix Budapest
- **History** → Reverse time = explore past imagery
- **Proximity** → Nearby neighbor = look around, not deeper
- **Imagery** → Past presents itself online = Google Earth historical view

The flag is **visible, not hidden**—a classic OSINT misdirection. Many solvers expected layers of obfuscation, forms to fill, or hidden metadata. But the answer was always right there, on the door, waiting for someone to look in the right place.

This is OSINT at its core: **following breadcrumbs, pivoting when necessary, and recognizing when you're looking at the answer**.


## Final Thoughts

Building this challenge reminded me why I enjoy OSINT design. It's not about hiding information—it's about testing whether players can interpret clues, pivot their approach, and recognize the answer when they see it.

The 17 solves over 48 hours felt right. Not too easy, not unsolvable. The feedback ranged from "really enjoyed the layered approach" to "I wanted to finish you" (which, honestly, I'll take as a compliment).

If you solved this, I hope you learned something about structured OSINT methodology. If you got stuck, I hope this writeup clarifies where the pivot was and why proximity mattered more than depth.

Either way - good hunt.
