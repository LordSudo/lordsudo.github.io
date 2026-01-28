---
title: "Dig Deeper - Dewald Roode Cybersecurity Hackathon 2025"
date: 2025-06-28
draft: false
tags: ["Steganography" , "CTF"]
image: "/thumbnails/digdeeper.png"
description: "Steganography Challenge Walkthrough "
---


# 🕳️ Prologue: Whispers Beneath the Noise

In the endless expanse of the cyber realm, secrets rarely scream ; they whisper. Steganography is the ancient art of these whispers: the delicate craft of hiding a truth so deeply that even when it is in plain sight, it remains unseen.

Where cryptography cloaks a message behind an unbreakable cipher, steganography conceals its very existence. A song that carries a confession in static. An image that smiles innocently while concealing a weapon beneath its pixels. A file that hums one story to the ear while hiding another for those patient enough to listen closer.

To the untrained eye, there is only noise. But for those who *dig deeper*, there is always another layer — a second heartbeat beneath the first. In the capture-the-flag arena, steganography tests not only a player’s tools, but their mindset. The solver must doubt what they see and hear, always asking: *What if this is not all?*

It is in this spirit that **Dig Deeper** was born : a test for those willing to listen, look, and question the obvious.



# 🧩 Behind the Veil: The Maker’s Intent

Every puzzle is a mirror reflecting the mind that forged it. **Dig Deeper** was not born to be solved in haste — it was crafted to remind hunters of a lesson easily forgotten: the truth is rarely on the surface.

When I conjured this challenge, I wanted to lure my prey into a false sense of victory. The audio file hums innocently, yet hidden within its rhythm lies a voice. A prize, it seems. Many would decode these dots and dashes and taste triumph too soon, certain they’d cracked the riddle. But **Dig Deeper** does not reward the hasty.

That key is no flag. It is a threshold. A test of whether the solver understands that in the realm of steganography, one secret is often just a map to the next. The real treasure lies deeper: an image buried within the audio’s very bones ; invisible to the ear but waiting for tools sharp enough to cut it free. And once freed, the image itself bears the final secret ; the flag - tucked away in yet another layer, mocking those who stop at the first whisper.

In designing this, my goal was simple: To reward those who question, probe, and persist. Because in this game we play, surface truths are for the careless - only the relentless deserve the flag.



# 🗝️ The Descent: Dig Deeper Walkthrough

The hunt begins with a simple gift: an audio file named `digdeeper.wav`. Innocent enough until the first echoes reach your ear. Play it once, and you hear the restless beeps of an old language reborn: Morse code.

## 📡 Step 1: Decoding the Whisper

Some may bravely decode it by hand, tracing dots and dashes with pen and patience. Others — the pragmatic — turn to the machine. An online decoder like [morsecode.world](https://morsecode.world/) becomes the first ally. Upload the audio, watch the noise resolve into words.

**Decoded Message:** `This-is-the-key`

<img
  src="https://gist.github.com/user-attachments/assets/c84ee8e1-666d-4d19-abf8-fc15dbcca6fc"
  alt="morsedecoded"
  style="max-width:800px; width:100%;">

A flag? Not quite. A hint? Absolutely.



## 🧬 Step 2: Seeking the Second Heartbeat

Armed with the phrase, the wise next question: *What else hides within this file?*

You poke and prod with familiar blades:  
- `strings` - silent.  
- `binwalk` - no buried treasures.  
- `exiftool` - no careless metadata left behind.

Nothing. And yet… the key demands a lock.


## 🕳️ Step 3: Unveiling the Hidden Image

A patient search reveals a tool whispered in stego circles: [DeepSound](https://github.com/Jpinsoft/DeepSound). This instrument of concealment embeds files within audio waves — perfectly suited for our riddle.

Load `digdeeper.wav` into DeepSound. Instantly, a prompt appears: *Password?*

The Morse whisper returns to haunt you: `This-is-the-key`.

<img
  src="https://gist.github.com/user-attachments/assets/5555a18a-8d25-43fd-9382-3c316633a447"
  alt="Deepsound1"
  style="max-width:800px; width:100%;">

With the key, the lock yields. A new secret emerges: `secretsodeep.jpg`.

<img
  src="https://gist.github.com/user-attachments/assets/def6934b-69c8-4f6e-b133-9924cc78d13d"
  alt="DeepSound2"
  style="max-width:800px; width:100%;">


## 🖼️ Step 4: Another Layer of Silence

Opening the image reveals… nothing obvious. A static picture, mocking your effort. The usual arsenal returns:  
- `strings` - barren.  
- `binwalk` - blind.  
- `exiftool` - empty.  
- Steghide, zsteg, stegsolve - futile.

<img
  src="https://gist.github.com/user-attachments/assets/5dcabd7f-d7dc-4978-bf36-1156f780afcd"
  alt="Secrets so deep"
  style="max-width:800px; width:100%;">


The trap is working. Many will stop here, claiming defeat ; but the lesson remains: *dig deeper.*


## 🔍 Step 5: The Hidden Masterpiece

A deeper hunt leads to a treasure trove: a blog by **Daniel Lerch**, master of subtle steganography. Among his tools lies an obscure gem: [hstego](https://github.com/daniellerch/hstego).

Unlike common stego tools, `hstego` hides secrets with **Syndrome Trellis Codes**, slipping beneath the radar of detection.

Install it, load your `secretsodeep.jpg` — and again, a prompt: *Password?*

<img
  src="https://gist.github.com/user-attachments/assets/a6762a82-9f5d-4c17-a0c6-f3d3b29bf04d"
  alt="hstegopassword"
  style="max-width:800px; width:100%;">

You already know the answer: `This-is-the-key`.

<img
  src="https://gist.github.com/user-attachments/assets/877f36ae-fe39-43e8-bd42-cdae0771895c"
  alt="hstegoflag"
  style="max-width:800px; width:100%;">


The image surrenders its final secret — the flag, waiting in the pixels all along.

> flag{st3g@n0gr@phy_15_fun}



## 🎇 Conclusion

One file. One whisper. Two hidden vaults — and a lesson worth more than any flag:

> In the realm of shadows, the truth rarely rests on the surface. The patient hunter, the relentless mind — these are the ones who deserve to claim the prize.

*Remember: always dig deeper.*