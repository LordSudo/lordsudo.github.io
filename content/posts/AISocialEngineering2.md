---
title: "Human Psychology Is the Exploit (Part 2): The Psychology of Almost Catching It"
date: 2026-05-18
draft: false
tags: ["Social Engineering", "AI"]
image: "/thumbnails/aisocialengineering1.png"
description: "Why people feel suspicious but comply anyway - cognitive dissonance, rationalization, and the mechanisms that override intuition"
series: "Human Psychology Is the Exploit"
---

> *This is Part 2 of a three-part series on the psychology of social engineering. [Part 1](https://blog.lordsudo.com/posts/aisocialengineering1/) explored the six psychological triggers that make manipulation work at a neurological level. This part examines what happens when people feel suspicious but comply anyway.*



One of the most frustrating scenarios in social engineering incidents is when the victim says afterward: **"I felt like something was off, but I did it anyway."**

This isn't stupidity. This isn't carelessness. This is a specific psychological phenomenon that deserves its own analysis.

In Part 1, we covered why the six triggers (authority, urgency, trust, fear, reciprocity, social proof) work at a fundamental level. We explored the neuroscience and evolutionary biology that make humans predictable targets.

But there's a gap between understanding those triggers and explaining this specific scenario: **the person knows something feels wrong, and they act anyway.**

This is the gray area that security training rarely addresses. Most training assumes that if people can detect something suspicious, they'll stop. But detection doesn't guarantee prevention.

This article is about what happens in that gap. Why intuition gets overridden. Why warning signals get rationalized away. And why "I felt like something was off" is one of the most common phrases in post-incident reports.



## The "Something Feels Wrong" Moment

You're reading an email. It looks legitimate. The sender appears correct. The request seems reasonable. But something feels... off.

Maybe the tone is slightly different than usual. Maybe the timing is odd. Maybe the urgency feels manufactured. **Your intuition is sending a warning signal.**

And then you comply anyway.

**Why?**


## Cognitive Dissonance and Rationalization

When your intuition conflicts with contextual evidence, your brain experiences cognitive dissonance - the psychological discomfort of holding two contradicting beliefs simultaneously.

**Belief 1:** "This email looks legitimate" (visual evidence)  
**Belief 2:** "Something feels wrong" (intuitive warning)

Your brain *hates* dissonance. It's metabolically expensive and emotionally uncomfortable. So it resolves the conflict through rationalization.

**Common rationalizations:**
- "I'm probably just being paranoid"
- "They're probably just busy and typing quickly"
- "I'm overthinking this"
- "Everyone else seems fine with it"
- "I'll verify after I act"

Notice what just happened: **Your brain chose to dismiss the warning rather than act on it.** Not because the warning was wrong, but because dismissing it resolves the discomfort faster.

### **The Mechanism**

Cognitive dissonance was first studied by psychologist Leon Festinger in the 1950s. He discovered that when people hold conflicting beliefs, they experience psychological tension that motivates them to reduce the contradiction.

The brain can resolve dissonance in three ways:
1. Change the belief ("Maybe the email is fake after all")
2. Change the behavior ("I should verify before acting")
3. Add new cognitions that justify the behavior ("Everyone gets these emails, it's probably fine")

Option 3 is the easiest because it doesn't require changing anything. You just add a rationalization that makes the dissonance disappear.

**In social engineering contexts:**

Your intuition says "suspicious." The email looks legitimate. Dissonance occurs.

Instead of investigating (hard, time-consuming) or rejecting the email (socially risky if it's real), your brain generates rationalizations that make compliance feel safe.

"The CFO is probably just stressed and typing quickly. That's why the tone feels off. It's fine."

The dissonance is resolved. You comply. And if it turns out to be fraud, you'll look back and wonder why you ignored your own warning signal.

The answer: **Your brain chose comfort over caution.**



## The Cost-Benefit Calculation (That Happens Unconsciously)

Your brain is constantly doing risk-benefit math, usually without your conscious awareness.

**Cost of verification:**
- Time (interrupting workflow)
- Social cost (might look paranoid or distrustful)
- Relationship cost (might offend the requester if they're legitimate)
- Career risk (might delay something important)

**Cost of being wrong:**
- Seems abstract and distant
- "Probably won't happen"
- "Security will catch it"
- "I'll fix it if I'm wrong"

The math is biased because **verification costs are immediate and concrete, while fraud costs are hypothetical and abstract.** Your brain weighs immediate discomfort more heavily than potential future harm.

This is called "temporal discounting" in behavioral economics. Immediate costs feel larger than delayed costs, even when the delayed costs are objectively worse.

### **Example:**

You receive an email from "the CFO" requesting an urgent wire transfer. Something feels slightly off about the tone.

**If you verify:**
- You have to stop what you're doing (immediate time cost)
- You have to call the CFO's office (immediate social cost - "are you questioning me?")
- If it's legitimate, you've delayed an important transaction (immediate career risk)
- You have to explain why you were suspicious (immediate embarrassment if wrong)

**If you don't verify and it's fraud:**
- Loss occurs later (not now)
- Someone else might catch it (diffused responsibility)
- "It probably won't happen to me" (optimism bias)
- "I'll fix it if something goes wrong" (false sense of control)

Your brain is running this calculation unconsciously. And the immediate costs loom larger than the distant ones.

So you comply. Because in that moment, compliance feels less risky than verification.

The fraud costs don't feel real until they become real. And by then it's too late.



## "I'll Verify After I Act"

This is one of the most common rationalizations, and it's psychologically fascinating because it feels reasonable.

"Let me just send this wire transfer, and then I'll call to confirm afterward. That way I'm not delaying anything important."

**What's happening psychologically:**

You're trying to have it both ways. You're resolving the cognitive dissonance by promising yourself you'll verify later, which makes compliance feel safer. Your brain gets to avoid immediate conflict (questioning authority, delaying an urgent request) while still feeling responsible (you'll verify afterward).

**But here's the problem:**

Once you've acted, multiple psychological mechanisms make verification less likely:

**1. Action bias resolution:** The urgency to act is gone. You acted. The pressure is released.

**2. Commitment and consistency:** You've already committed to the action. Discovering it was fraud now means admitting you made a mistake. Your brain resists this.

**3. Sunk cost thinking:** "I already did it. Verifying now won't change anything. Why bother?"

**4. Cognitive load reduction:** Your brain has moved on to the next task. Circling back requires mental effort.

"Verify after" almost never happens. And attackers know this.

### **Why this rationalization is so effective:**

It feels like a compromise. You're not ignoring your suspicion - you're delaying verification until after action. That feels responsible. It feels like due diligence.

But psychologically, "later" means "never."

Once the action is complete, your brain treats the situation as resolved. The task is done. Moving on to the next thing feels natural. Circling back to verify feels like extra work.

And if verification reveals fraud, you now have to confront that you made a mistake. Your brain will resist that confrontation.

**The defense mechanism:**

Make verification a prerequisite for action, not an afterthought. The protocol should be: verify, then act. Not act, then verify.

Because "verify later" is psychologically equivalent to "don't verify."


## The Authority + Doubt Paradox

Here's a particularly nasty psychological trap:

When you feel suspicious of a request from authority, the suspicion itself creates anxiety. **You're now questioning someone senior. What if you're wrong?**

The fear of being wrong about your suspicion becomes stronger than the suspicion itself.

**Internal dialogue:**
- "This feels weird, but what if it's legitimate and I delay it?"
- "If I question this and I'm wrong, I'll look foolish"
- "They'll think I don't trust them"
- "This could hurt my reputation"

Your brain is now running two threat scenarios:
1. **Threat if you comply and it's fraud:** Financial loss, security breach
2. **Threat if you question and it's legitimate:** Social embarrassment, career impact

**Threat 2 feels more immediate and personal.** Social threats trigger the same brain regions as physical threats. Your amygdala doesn't distinguish between "I might get fired" and "I might get attacked."

So you comply to avoid the immediate social threat, accepting the abstract financial threat.

### **Why this paradox is so powerful:**

In Part 1, we covered how authority suppresses critical thinking at a neurological level. But this goes further.

Even when you recognize something feels wrong, the authority relationship makes *questioning* feel like the risky choice.

You're not just fighting your brain's default compliance with authority. You're fighting the fear of what happens if you're wrong about being suspicious.

**The psychology:**

- Questioning authority correctly = prevented fraud (good outcome, but no one notices)
- Questioning authority incorrectly = social embarrassment, damaged relationship, career risk
- Not questioning authority when you should = fraud occurs, but you can claim you didn't know
- Not questioning authority when you shouldn't = everything proceeds normally

From a career risk perspective, questioning feels more dangerous than complying.

If you don't question and fraud occurs, you can say "it looked legitimate." But if you question and you're wrong, you've publicly challenged authority and looked paranoid.

**The solution:**

Remove the individual burden. Make verification mandatory for all requests above certain thresholds, regardless of who's making them.

The protocol questions authority, not the individual. This removes the social risk of questioning.


## The "Just This Once" Trap

Another rationalization: "I know this breaks protocol, but just this once..."

**Psychological mechanism:**

Your brain categorizes this situation as an exception, not a pattern. Exceptions feel safe because they're isolated events.

"Yes, normally I'd verify through a separate channel. But the CFO is traveling. The audit is tomorrow. This is a special circumstance."

**What you don't see:** Attackers specifically engineer "special circumstances" because they know exceptions bypass protocols.

Every successful social engineering attack is framed as an exception:
- "I'm traveling and don't have access to the usual system"
- "This is urgent and can't wait for normal approval"
- "This is a one-time vendor payment"

The request *has* to be an exception, because normal procedures would catch it.

Your brain treats exceptions as rare and therefore lower-risk. Attackers treat exceptions as the entire strategy.

### **Why exceptions are dangerous:**

Protocols exist because they work consistently. But protocols are also inflexible, which creates friction.

When legitimate work needs to happen quickly, protocols feel like obstacles. So humans develop a mental category for "justified exceptions" - situations where breaking protocol is reasonable.

Attackers exploit this category.

They don't ask you to ignore protocol for no reason. They give you a reason that feels legitimate. The CFO is traveling. The deal is closing. The audit is tomorrow. Each scenario feels like a justified exception.

But the pattern is always the same: **the exception is manufactured to bypass the defense.**

**The solution:**

Protocol exceptions should trigger additional scrutiny, not reduced scrutiny.

If someone is asking you to bypass normal verification "just this once," that should activate a higher level of verification, not lower.

Because legitimate exceptions are rare. And most requests framed as exceptions are attacks.


## Social Pressure and Audience Effects

If the request happens in front of others (a video call, a meeting, a group email), compliance pressure increases dramatically.

**Why:**

Your brain is now managing two tasks:
1. Evaluating whether the request is legitimate
2. Managing how you appear to others in the group

**If you question the request publicly, you're:**
- Challenging authority in front of witnesses (higher social cost)
- Potentially embarrassing the requester if they're legitimate
- Signaling distrust to the group
- Risking looking paranoid or difficult

The social cost of questioning increases, while the request hasn't actually become more legitimate.

This is why the Arup deepfake worked so well. The victim wasn't just talking to "the CFO" - they were in a meeting with "multiple executives." The social pressure to comply was multiplied by the number of authority figures present (even though they were all fake).

### **The audience effect:**

Psychologists have long studied how the presence of others changes behavior. Some key findings:

**1. Evaluation apprehension:** When others are watching, you become more concerned with how you're perceived. This shifts focus from "is this request legitimate?" to "how do I look if I question this?"

**2. Diffusion of responsibility:** In a group setting, people assume someone else will catch problems. "If this were suspicious, one of the other executives would say something."

**3. Conformity pressure:** If no one else is questioning the request, questioning it yourself signals you're out of step with the group.

**In the Arup case:**

The victim was on a video call with multiple "executives." Each additional person increased the social pressure to comply.

If you're alone with one person making a suspicious request, questioning feels reasonable. But if you're in a room with five authority figures and you're the only one who seems concerned, questioning feels like a mistake.

The psychology: "They all seem fine with this. Maybe I'm the one who's wrong."

**The solution:**

Private verification channels. Create a protocol where verification happens outside the group context.

"I need to step away to authorize this transaction" removes the audience effect. The verification happens privately, so there's no social cost to questioning.


## The Rationalization Cascade

Here's how it typically unfolds:

1. **Initial suspicion:** "Something feels off"
2. **First rationalization:** "I'm probably overthinking it"
3. **Second rationalization:** "They're just busy"
4. **Third rationalization:** "Everyone else seems fine with this"
5. **Fourth rationalization:** "I'll verify after"
6. **Action:** Compliance
7. **Post-action rationalization:** "It's probably fine"

Each rationalization makes the next one easier. By the time you act, you've convinced yourself it's legitimate.

### **Why cascades happen:**

Each rationalization reduces cognitive dissonance slightly. But it also creates cognitive commitment.

Once you've told yourself "I'm probably overthinking it," it becomes harder to then say "actually, no, this is suspicious." That would mean admitting you were wrong to dismiss your initial concern.

So instead, you add another rationalization. And another. Each one reducing dissonance and increasing commitment to compliance.

By the time you act, you've built a mental narrative that justifies the action. You're no longer uncertain - you've convinced yourself it's fine.

**The psychology term:** "Escalation of commitment" or "commitment bias."

Once you've invested mental effort in justifying something, reversing course feels like wasted effort. Your brain resists that.

**Post-incident, victims often say:**

"I knew something felt off, but I talked myself into it."

That's the rationalization cascade. The initial suspicion was correct. But each rationalization made compliance feel more justified.


## Why This Matters for Defense

Traditional training says: "If something feels suspicious, don't do it."

**That's not enough.**

People *know* something feels suspicious. They still comply. The problem isn't awareness - it's the psychological mechanisms that override awareness.

**Better defense approach:**

**1. Acknowledge the discomfort:** "When you feel torn between 'this seems legitimate' and 'something feels wrong,' that tension is valuable data. Don't dismiss it."

**2. Name the rationalizations:** Train people to recognize their own rationalization patterns. "Am I telling myself 'just this once'? That's a red flag, not a justification."

**3. Protocol removes individual burden:** "You don't have to decide if your suspicion is valid. The protocol decides. If you feel *anything* off, the protocol activates."

**4. Reframe verification cost:** "5 minutes of verification is not delaying important work. It's preventing catastrophic loss. The cost-benefit math is clear."

**5. Post-compliance is too late:** "Verify *before*, not after. Once you've acted, psychological mechanisms make verification less likely."

### **Training scenarios that address rationalization:**

Don't just teach people to spot red flags. Teach them to recognize when they're rationalizing away red flags.

**Example exercise:**

Present a suspicious email. Ask: "What's your first instinct?"

Most people will say "something feels off."

Then ask: "What rationalizations might you use to dismiss that feeling?"

Participants will generate the exact rationalizations attackers count on:
- "I'm being paranoid"
- "They're just busy"
- "I'll verify later"
- "Everyone else seems fine with it"

**The goal:** Make people aware of their own rationalization patterns before they're in a real situation.

When someone starts thinking "I'm probably overthinking this," they should recognize that as a potential rationalization, not a valid assessment.


## What This Means

The victims who say "I felt like something was off" weren't ignoring their instincts. They were overriding them.

And understanding *why* they override them is the key to building better defenses.

In Part 1, we covered why the six psychological triggers work. In this part, we covered why detection doesn't always lead to prevention.

**In Part 3**, we'll examine an even more uncomfortable reality: knowing about these mechanisms doesn't make you immune to them. Security professionals fall for sophisticated attacks. Experts develop blind spots. Intelligence doesn't protect against manipulation.

We'll explore the paradox of security awareness - why knowledge isn't sufficient, and what actually does protect against social engineering.

Because if you think understanding these mechanisms makes you safe, you're already vulnerable.



