---
title: "What the Blue Side Taught Me (And I Wasn't Even Looking)"
date: 2026-04-24
draft: false
tags: ["Learning" , "HTB Sherlocks"]
image: "/thumbnails/blueteamreflection.png"
description: "Notes from an accidental blue team journey, covering artifacts, methodology, and why the two sides of this craft are closer than most people think."
---

Blue team was never the plan.

My day-to-day is security engineering: building systems, designing controls, finding weaknesses before someone else does. The work sits at the intersection of architecture and offense. Blue team, in the traditional sense, felt like a different discipline. Interesting, necessary, but not the primary thread.

Then HackTheBox launched Sherlocks, and I started poking at them out of curiosity.

That was a while ago now. What started as occasional exploration has become a consistent part of how I develop as a practitioner. Not because it replaced anything, but because it added a dimension that engineering and offensive work alone could not give me. Blue team is not the opposite of red team. It is the same craft read from a different direction, and understanding both makes you sharper at each.

This is what I learned from sitting on the other side of the terminal.


## It Is Not Just Logs

One of the first things worth saying out loud: the blue side of security is as wide as the offensive side, just pointed in a different direction.

It covers DFIR: reconstructing what happened after a compromise from the artifacts a system leaves behind. It covers SOC work: monitoring, triaging alerts, and separating genuine incidents from noise at scale. It covers threat hunting: proactively searching through telemetry for signs of compromise before an alert fires. It covers malware analysis: reverse engineering suspicious samples, understanding capabilities and infrastructure before a binary runs in production. It covers incident response: scoping a breach, containing it, eradicating the attacker's presence, and recovering without reintroducing the same weaknesses.

HTB Sherlocks spans all of these. A lab might hand you a packet capture and ask you to reconstruct a network intrusion. The next might give you PowerShell event logs and ask you to identify sandbox evasion techniques. Another might be pure threat intelligence, mapping an adversary campaign to a framework. The surface area is broad, and that breadth is part of what makes the platform useful for building out skills across the blue team discipline rather than just one corner of it.

Logs are one input into all of these, not the whole picture.


## Going in Blind (and What That Taught Me)

When I first started working through Sherlocks, I went in blind. No structured preparation, no framework, just picking up artifacts and finding my way through them. That approach was genuinely fun. There is something valuable about being forced to figure out what a tool does, what a log entry means, or why a timestamp looks wrong, without anyone having told you what to look for first. You develop a feel for the material through friction.

But there comes a point where blind exploration has diminishing returns. I started hitting walls that were not about the specific lab in front of me but about gaps in my foundational understanding. Why does this Event ID fire here and not there? What is the difference between these two timestamp attributes and why does it matter? What does a normal authentication flow look like versus an anomalous one?

At that point I started working through HTB Academy modules alongside the Sherlocks, filling in the conceptual gaps that the labs had surfaced. That combination, doing first and then understanding the underlying mechanics more deeply, turned out to be more effective than either approach alone. The labs gave me context for why the theory mattered. The theory gave me language and structure for what I was already observing in the labs. Each fed the other.

If you are starting out, both paths have merit. Going in blind builds instinct. Structured learning builds fluency. The ideal is probably some of both, and not necessarily in a fixed order.


## The Artifacts Are the Story

Within DFIR specifically, investigations live and die by artifact literacy. And it is worth saying early: this is not a Windows-only discipline. The same investigative principles apply across Linux, macOS, network devices, web applications, custom application logs, and IoT devices. Each platform has its own artifact landscape and its own forensic language. The fundamentals transfer; the specifics require dedicated study.

Some common artifacts worth knowing: EVTX for Windows event logs, Sysmon for granular host telemetry, the MFT for filesystem activity including deleted files, and PCAP for full network conversation capture at the frame level. Each has a defined structure, and understanding that structure is what makes analysis possible.

Beyond these, Linux audit logs, web server access logs, network device syslogs, application-specific logs, and cloud platform logs each add their own layer depending on the environment. The common thread across all of them is structure. Every artifact type has a defined format and a set of conditions under which it produces records. Understanding that structure is the foundation that makes analysis possible.


## Tools Are Means, Not Methods

There is a version of this work where you learn a tool and call it done. You run a PCAP through a GUI analyzer, filter for a known-bad IP, and call it forensics. You load an MFT into a parser, sort by timestamp, and call it analysis. This version produces answers sometimes. It also produces rabbit holes and keeps you in them, because the tool has no idea what question you are trying to answer.

The tool is the means. The methodology is the map.

Before opening anything, the question is: what am I looking for, and why? What does this scenario tell me about where the attacker likely was, what they likely touched, and what evidence that would leave behind? That thinking, artifact-first and hypothesis-driven, is what separates an investigation that terminates from one that wanders.

A checklist is not a rigid script. It is a structure that keeps you oriented when the evidence gets complicated. Start with what you know. Form a hypothesis. Identify which artifacts would confirm or refute it. Look at those artifacts. Revise. Repeat. The checklist is what keeps you from spending forty minutes on an interesting but irrelevant finding because it felt like a lead.

Tooling flexibility follows naturally from having a solid methodology. Every artifact type has multiple tools that can read it. Event logs can be parsed with native Event Viewer, with EvtxECmd at the command line, with Hayabusa for threat hunting at scale, or scripted with a Python library. The MFT has MFTECmd, Autopsy, and purpose-built parsers. PCAPs open in Wireshark for exploration, in tshark for scripted analysis, in Scapy when you need custom logic. Sysmon telemetry feeds SIEMs, CLI parsers, or programmatic queries.

Knowing multiple tools for the same task is not redundancy, it is resilience. A GUI is useful for exploration when you do not yet know what you are looking for. A CLI tool is faster when you know exactly what you want and need to run it repeatedly. A scripting library is necessary when neither can express the logic you need. The methodology tells you what to look for; the toolbox determines how efficiently you get there.


## Patterns Across Incidents

One of the things that shifts when you work through enough of these scenarios is that you start seeing patterns across investigations, not just within them. Attacker behavior is not random; it follows logic. And once you understand the logic, the artifacts make a different kind of sense.

Credential theft, defense evasion, and persistence appear in almost every intrusion, across platforms and environments, with predictable artifact consequences. Credential theft leaves authentication telemetry. Defense evasion leaves either the absence of expected evidence or direct evidence of the evasion action itself. Persistence leaves artifacts designed to survive and blend in, which makes them worth hunting for specifically rather than stumbling across incidentally.

Recognizing these patterns does not mean assuming. It means knowing where to look first, and why, based on what you understand about how a given class of attack tends to unfold. Assumption closes inquiry. Pattern recognition focuses it.


## Where to Start If You Are Curious

If any of this is making you want to dip your feet into the blue side, the good news is that the resources are there.

HackTheBox Sherlocks is where I started and where I keep coming back. The lab quality is consistently high, the scenario design is grounded in real attack patterns, and the breadth across DFIR, SOC, threat hunting, and malware analysis means there is always something new to work on. HTB Academy is a natural complement if you want structured learning to sit alongside the practical labs. The two reinforce each other well. (I will always advocate for HTB, one of the best platform there is)

Beyond HTB, there are plenty of other platforms worth exploring: Blue Team Labs Online, CyberDefenders, LetsDefend, among others. The ecosystem is healthy and growing.

The entry point matters less than the decision to start. Pick something, open it, and find your way through it. The friction is the learning.


## What the Blue Side Gives Back

If I am being direct about what this has given me, as someone whose work spans engineering and offense: it has made me a more precise thinker about how systems record their own activity, and a more methodical one about how to reconstruct events from that record.

Neither of those things is exclusively blue team. Both make me better at everything I do.

Understanding how authentication events are logged changes how I think about what evidence an offensive operation leaves behind. Understanding filesystem artifact structures changes how I think about what artifact cleanup actually achieves versus what people assume it achieves. Understanding network protocol behavior changes how I design systems that surface anomalies.

The engineering side benefits directly too. When you understand how incidents unfold at the artifact level, you design logging systems differently. You think about retention, about signal versus noise, about what evidence your controls are supposed to produce when something goes wrong.

The two sides of this field are not separate disciplines wearing different hats. They are the same discipline approached from opposite directions. The better you understand one, the sharper you become at the other.

Blue team was not the plan. It turned out to be one of the better additions to the toolkit.

*The map matters more than the tools. The artifacts do not lie, but they only speak to those who know how to listen.*


