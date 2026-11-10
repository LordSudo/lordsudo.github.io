# Builds the three 1200x630 base images for generated social cards (one per tag colour).
import random
from collections import deque
from PIL import Image, ImageDraw, ImageFont
W, H = 1200, 630
BG = (14, 12, 21)
FG = (239, 234, 245)
MUTED = (149, 140, 165)
COLS = {"t0": (180, 140, 255), "t1": (255, 181, 71), "t2": (61, 220, 151)}
CELL, GC, GR, OX, OY = 30, 16, 13, 668, 64

def maze(seed):
    rnd = random.Random(seed)
    walls = {(c, r): {"n", "s", "e", "w"} for c in range(GC) for r in range(GR)}
    d = {"n": (0, -1, "s"), "s": (0, 1, "n"), "e": (1, 0, "w"), "w": (-1, 0, "e")}
    stack, seen = [(0, 0)], {(0, 0)}
    while stack:
        c, r = stack[-1]
        opts = [(k, c + dx, r + dy, o) for k, (dx, dy, o) in d.items() if (c + dx, r + dy) in walls and (c + dx, r + dy) not in seen]
        if not opts: stack.pop(); continue
        k, nc, nr, o = rnd.choice(opts)
        walls[(c, r)].discard(k); walls[(nc, nr)].discard(o)
        seen.add((nc, nr)); stack.append((nc, nr))
    # solve top-left -> bottom-right
    prev, q = {(0, 0): None}, deque([(0, 0)])
    while q:
        c, r = q.popleft()
        for k, (dx, dy, o) in d.items():
            n = (c + dx, r + dy)
            if k not in walls[(c, r)] and n not in prev: prev[n] = (c, r); q.append(n)
    path, p = [], (GC - 1, GR - 1)
    while p: path.append(p); p = prev[p]
    return walls, path[::-1]

walls, path = maze(4217)
for name, col in COLS.items():
    img = Image.new("RGB", (W, H), BG)
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dr = ImageDraw.Draw(lay)
    wall = col + (52,)
    for (c, r), ws in walls.items():
        x, y = OX + c * CELL, OY + r * CELL
        if "n" in ws: dr.line([(x, y), (x + CELL, y)], fill=wall, width=2)
        if "w" in ws: dr.line([(x, y), (x, y + CELL)], fill=wall, width=2)
        if "s" in ws and r == GR - 1: dr.line([(x, y + CELL), (x + CELL, y + CELL)], fill=wall, width=2)
        if "e" in ws and c == GC - 1 and r != GR - 1: dr.line([(x + CELL, y), (x + CELL, y + CELL)], fill=wall, width=2)
    pts = [(OX + c * CELL + CELL // 2, OY + r * CELL + CELL // 2) for c, r in path]
    dr.line(pts, fill=col + (125,), width=4, joint="curve")
    ex, ey = pts[-1]
    dr.rectangle([ex - 7, ey - 7, ex + 7, ey + 7], fill=(255, 181, 71, 255))
    # fade the maze out toward the text side
    mask = Image.new("L", (W, H), 255)
    md = ImageDraw.Draw(mask)
    for x in range(OX - 10, OX + 260):
        md.line([(x, 0), (x, H)], fill=int(255 * min(1, max(0, (x - OX + 10) / 270)) ** 1.4))
    md.rectangle([0, 0, OX - 10, H], fill=0)
    lay.putalpha(Image.composite(lay.getchannel("A"), Image.new("L", (W, H), 0), mask))
    img.paste(lay, (0, 0), lay)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=col)                       # top rule in the tag colour
    wm = ImageFont.truetype("BigShouldersDisplay-Black.ttf", 46)
    mono = ImageFont.truetype("IBMPlexMono-Medium.ttf", 22)
    d.text((80, 540), "LORDSUDO", font=wm, fill=FG, anchor="ls")
    wl = d.textlength("LORDSUDO", font=wm)
    d.text((80 + wl + 12, 540), "/ledger", font=mono, fill=(180, 140, 255), anchor="ls")
    d.text((W - 80, 540), "blog.lordsudo.com", font=mono, fill=MUTED, anchor="rs")
    d.line([(80, 488), (W - 80, 488)], fill=(42, 37, 54), width=2)
    img.save(f"card-{name}.png", optimize=True)
print("done")
