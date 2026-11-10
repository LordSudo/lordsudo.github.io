/* The home-page labyrinth: generated with a recursive backtracker, explored breadth-first, then the route is traced.
   "Play it" hands the same kind of labyrinth to the visitor: arrow keys / WASD, or drag on the canvas.
   On the 404 page (data-mode="deadend") the exit is sealed and the search finds no way out.
   Respects prefers-reduced-motion (draws the solved maze immediately). */
(function () {
  "use strict";
  var canvas = document.getElementById("maze");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var status = document.getElementById("maze-status");
  var playBtn = document.getElementById("maze-play"), newBtn = document.getElementById("maze-new");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dead = canvas.getAttribute("data-mode") === "deadend";
  var FLAG = "sudo{welcome_to_the_ledger}";
  var M = null, P = null, raf = 0, seedNo = 0, lastW = 0;
  var DIRS = [[0, -1, 0, 2], [1, 0, 1, 3], [0, 1, 2, 0], [-1, 0, 3, 1]]; // dx, dy, wall here, wall in neighbour (top right bottom left)
  var css = function (n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); };

  function build() {
    var w = canvas.clientWidth || 560, h = canvas.clientHeight || 420, dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var cell = w < 420 ? 18 : 22;
    if (P) cell = w < 420 ? 24 : 28; // bigger cells when a person is playing
    var cols = Math.max(8, Math.floor((w - 24) / cell)), rows = Math.max(6, Math.floor((h - 24) / cell));
    var ox = (w - cols * cell) / 2, oy = (h - rows * cell) / 2;
    var walls = [], i;
    for (i = 0; i < rows * cols; i++) walls.push([1, 1, 1, 1]);
    var seen = new Uint8Array(rows * cols), stack = [0]; seen[0] = 1;
    while (stack.length) {
      var c = stack[stack.length - 1], x = c % cols, y = (c / cols) | 0;
      var opts = DIRS.filter(function (d) { var nx = x + d[0], ny = y + d[1]; return nx >= 0 && ny >= 0 && nx < cols && ny < rows && !seen[ny * cols + nx]; });
      if (!opts.length) { stack.pop(); continue; }
      var d = opts[(Math.random() * opts.length) | 0], n = (y + d[1]) * cols + x + d[0];
      walls[c][d[2]] = 0; walls[n][d[3]] = 0; seen[n] = 1; stack.push(n);
    }
    var start = ((Math.random() * rows) | 0) * cols, end = ((Math.random() * rows) | 0) * cols + cols - 1;
    walls[start][3] = 0; if (!dead) walls[end][1] = 0;
    var prev = new Int32Array(rows * cols).fill(-1), q = [start], explored = [], head = 0;
    prev[start] = start;
    while (head < q.length) {
      var cc = q[head++]; explored.push(cc); if (cc === end && !dead) break;
      var cx = cc % cols, cy = (cc / cols) | 0;
      DIRS.forEach(function (dd) {
        if (walls[cc][dd[2]]) return;
        var nx = cx + dd[0], ny = cy + dd[1];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
        var nn = ny * cols + nx;
        if (prev[nn] < 0) { prev[nn] = cc; q.push(nn); }
      });
    }
    var path = [];
    if (!dead) { for (var p = end; p !== start; p = prev[p]) path.push(p); path.push(start); path.reverse(); }
    seedNo = 1000 + ((Math.random() * 9000) | 0);
    M = { w: w, h: h, cell: cell, cols: cols, rows: rows, ox: ox, oy: oy, walls: walls, path: path, explored: explored, start: start, end: end, t0: performance.now() };
  }
  function centre(c) { return [M.ox + (c % M.cols + 0.5) * M.cell, M.oy + (((c / M.cols) | 0) + 0.5) * M.cell]; }

  function drawCells(list, n, colour) {
    ctx.fillStyle = colour;
    for (var i = 0; i < n; i++) { var c = list[i]; ctx.fillRect(M.ox + (c % M.cols) * M.cell + 1, M.oy + ((c / M.cols) | 0) * M.cell + 1, M.cell - 2, M.cell - 2); }
  }
  function drawWalls() {
    var cell = M.cell, cols = M.cols, ox = M.ox, oy = M.oy;
    ctx.strokeStyle = css("--maze"); ctx.lineWidth = 1.5; ctx.lineCap = "square"; ctx.beginPath();
    M.walls.forEach(function (wl, c) {
      var x = ox + (c % cols) * cell, y = oy + ((c / cols) | 0) * cell;
      if (wl[0]) { ctx.moveTo(x, y); ctx.lineTo(x + cell, y); }
      if (wl[1]) { ctx.moveTo(x + cell, y); ctx.lineTo(x + cell, y + cell); }
      if (wl[2]) { ctx.moveTo(x, y + cell); ctx.lineTo(x + cell, y + cell); }
      if (wl[3]) { ctx.moveTo(x, y); ctx.lineTo(x, y + cell); }
    });
    ctx.stroke();
  }
  function drawRoute(cells, n, lead, tail) {
    var cell = M.cell;
    ctx.strokeStyle = css("--accent"); ctx.lineWidth = Math.max(3, cell * 0.22); ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.beginPath();
    var s = centre(cells[0]); ctx.moveTo(s[0] - (lead ? cell / 2 : 0), s[1]); ctx.lineTo(s[0], s[1]);
    for (var i = 1; i < n; i++) { var pt = centre(cells[i]); ctx.lineTo(pt[0], pt[1]); }
    if (tail) { var e = centre(cells[n - 1]); ctx.lineTo(e[0] + cell / 2, e[1]); }
    ctx.stroke();
  }
  function dot(c, colour) {
    var p = centre(c); ctx.fillStyle = colour; ctx.beginPath(); ctx.arc(p[0], p[1], Math.max(3, M.cell * 0.22), 0, Math.PI * 2); ctx.fill();
  }
  function exitMark() {
    var b = centre(M.end), cell = M.cell;
    ctx.fillStyle = css("--flag"); ctx.beginPath();
    ctx.moveTo(b[0] + cell / 2 + 2, b[1] - 6); ctx.lineTo(b[0] + cell / 2 + 10, b[1] - 2); ctx.lineTo(b[0] + cell / 2 + 2, b[1] + 2); ctx.fill();
  }

  /* ---------- Watch mode: explore, then trace the route ---------- */
  function draw(now) {
    var el = reduce ? 1e9 : now - M.t0, exploreMs = dead ? 2600 : 1400, solveMs = 1600;
    var pe = Math.min(1, el / exploreMs), ps = Math.max(0, Math.min(1, (el - exploreMs) / solveMs));
    ctx.clearRect(0, 0, M.w, M.h);
    var nExp = Math.floor(M.explored.length * pe);
    drawCells(M.explored, nExp, css("--accent-wash"));
    drawWalls();
    if (dead) {
      if (nExp > 0) dot(M.explored[nExp - 1], css("--fg"));
      if (status) status.innerHTML = pe >= 1
        ? "labyrinth <b>#" + seedNo + "</b> · <b>" + M.explored.length + '</b> cells searched · no route out · <span class="flag">404</span>'
        : "labyrinth <b>#" + seedNo + "</b> · searching… <b>" + nExp + "</b> cells";
      if (pe < 1) raf = requestAnimationFrame(draw);
      return;
    }
    var n = Math.max(1, Math.floor(M.path.length * ps));
    if (ps > 0) { drawRoute(M.path, n, true, ps >= 1); dot(M.path[n - 1], css("--fg")); }
    exitMark();
    if (status) {
      if (ps >= 1) status.innerHTML = "labyrinth <b>#" + seedNo + "</b> · solved in <b>" + (M.path.length - 1) + '</b> moves · <span class="flag">' + FLAG + "</span>";
      else if (ps > 0) status.innerHTML = "labyrinth <b>#" + seedNo + "</b> · tracing route… <b>" + n + "</b>/" + M.path.length;
      else status.innerHTML = "labyrinth <b>#" + seedNo + "</b> · enumerating… <b>" + nExp + "</b> cells";
    }
    if (ps < 1) raf = requestAnimationFrame(draw);
  }

  /* ---------- Play mode ---------- */
  function drawPlay() {
    ctx.clearRect(0, 0, M.w, M.h);
    drawCells(P.visited, P.visited.length, css("--accent-wash"));
    drawWalls();
    drawRoute(P.trail, P.trail.length, true, P.done);
    exitMark();
    if (!P.done) dot(P.trail[P.trail.length - 1], css("--fg"));
    if (!status) return;
    var best = M.path.length - 1;
    if (P.done) {
      status.innerHTML = "escaped in <b>" + P.moves + "</b> moves" + (P.moves === best ? " · the shortest route" : " · shortest is <b>" + best + "</b>") + ' · <span class="flag">' + FLAG + "</span>";
    } else if (!P.moves) {
      status.innerHTML = "labyrinth <b>#" + seedNo + "</b> · " + (window.matchMedia("(pointer: coarse)").matches ? "drag inside to move" : "arrow keys or WASD to move") + " · reach the ▸";
    } else {
      status.innerHTML = "labyrinth <b>#" + seedNo + "</b> · <b>" + P.moves + "</b> moves";
    }
  }
  function step(k) {
    if (!P || P.done) return;
    var at = P.trail[P.trail.length - 1], d = DIRS[k];
    if (M.walls[at][d[2]]) return;
    var x = at % M.cols + d[0], y = ((at / M.cols) | 0) + d[1];
    if (x < 0 || y < 0 || x >= M.cols || y >= M.rows) return;
    var n = y * M.cols + x;
    P.moves++;
    if (P.trail.length > 1 && P.trail[P.trail.length - 2] === n) P.trail.pop(); // stepping back retracts the line
    else P.trail.push(n);
    if (P.visited.indexOf(n) < 0) P.visited.push(n);
    if (n === M.end) { P.done = true; if (playBtn) playBtn.textContent = "Play again"; }
    drawPlay();
  }
  function startPlay() {
    cancelAnimationFrame(raf);
    P = { trail: [], visited: [], moves: 0, done: false };
    build();
    P.trail = [M.start]; P.visited = [M.start];
    canvas.classList.add("playing");
    canvas.setAttribute("role", "application");
    canvas.setAttribute("tabindex", "0");
    canvas.setAttribute("aria-label", "Labyrinth game. Use the arrow keys to move from the entrance on the left to the exit on the right.");
    if (playBtn) { playBtn.textContent = "Show me the way"; playBtn.setAttribute("aria-pressed", "true"); }
    drawPlay();
    canvas.focus({ preventScroll: true });
  }
  function stopPlay() {
    P = null;
    canvas.classList.remove("playing");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("tabindex", "-1");
    canvas.setAttribute("aria-label", "A labyrinth that draws itself and is then solved from entrance to exit");
    if (playBtn) { playBtn.textContent = "Play it"; playBtn.setAttribute("aria-pressed", "false"); }
  }

  var KEYS = { ArrowUp: 0, w: 0, W: 0, ArrowRight: 1, d: 1, D: 1, ArrowDown: 2, s: 2, S: 2, ArrowLeft: 3, a: 3, A: 3 };
  canvas.addEventListener("keydown", function (e) {
    if (!P || !(e.key in KEYS) || e.ctrlKey || e.metaKey || e.altKey) return;
    e.preventDefault();
    step(KEYS[e.key]);
  });
  /* Touch and mouse: drag; every cell's worth of movement is one step in the main direction. */
  var drag = null;
  canvas.addEventListener("pointerdown", function (e) {
    if (!P) return;
    canvas.focus({ preventScroll: true });
    drag = { x: e.clientX, y: e.clientY };
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!P || !drag) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y, unit = M.cell * 0.8;
    while (Math.abs(dx) >= unit || Math.abs(dy) >= unit) {
      if (Math.abs(dx) >= Math.abs(dy)) { step(dx > 0 ? 1 : 3); drag.x += dx > 0 ? unit : -unit; }
      else { step(dy > 0 ? 2 : 0); drag.y += dy > 0 ? unit : -unit; }
      dx = e.clientX - drag.x; dy = e.clientY - drag.y;
    }
  });
  ["pointerup", "pointercancel"].forEach(function (t) { canvas.addEventListener(t, function () { drag = null; }); });

  function run() { stopPlay(); cancelAnimationFrame(raf); build(); raf = requestAnimationFrame(draw); }
  function redraw() {
    if (!M) return;
    if (P) { drawPlay(); return; }
    cancelAnimationFrame(raf); M.t0 = -1e9; draw(performance.now());
  }

  if (playBtn) playBtn.addEventListener("click", function () {
    if (!P || P.done) { startPlay(); return; }
    /* Give up: show the shortest route on this same labyrinth. */
    stopPlay(); M.t0 = performance.now() - 1400; raf = requestAnimationFrame(draw);
  });
  if (newBtn) newBtn.addEventListener("click", function () { if (P) startPlay(); else run(); });
  document.addEventListener("ledger:theme", redraw);
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      if (Math.abs(canvas.clientWidth - lastW) > 24) { lastW = canvas.clientWidth; if (P) startPlay(); else run(); }
    }).observe(canvas);
  } else { lastW = canvas.clientWidth; run(); }
})();
