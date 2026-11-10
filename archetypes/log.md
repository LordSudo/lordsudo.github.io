{{- /* Weekly log. Run:  hugo new log/week-44.md   (the number in the file name sets everything below) */ -}}
{{- $w := replaceRE `\D` "" .File.ContentBaseName -}}
{{- $back := mod (add (int now.Weekday) 6) 7 -}}
{{- $mon := now.AddDate 0 0 (int (sub 0 $back)) -}}
---
title: "Weekly Progress Log - Week {{ $w }}"
date: {{ now.Format "2006-01-02" }}
draft: true
tags: ["Weekly Progress"]
image: "/thumbnails/week{{ $w }}.png"
description: "{{ now.Format "2006" }} Week {{ $w }} Recap"
week: {{ $w }}
---

**Week starting:** {{ humanize $mon.Day }} {{ $mon.Format "January 2006" }}

## What I worked on

**Exams and Certifications:**

**Blog:**

**Community Sessions:**

**HTB Machines:**

## Key takeaways

## Challenges and friction

## Looking ahead
