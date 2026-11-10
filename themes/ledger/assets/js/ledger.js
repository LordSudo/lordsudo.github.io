/* LordSudo Ledger: theme toggle, full-text search, table of contents, code blocks, heading links, share, flags, lightbox. No dependencies. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  var toggle = $("theme-toggle");
  function mode() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function syncToggle() {
    if (toggle) toggle.setAttribute("aria-label", mode() === "light" ? "Switch to dark mode" : "Switch to light mode");
    document.dispatchEvent(new CustomEvent("ledger:theme"));
  }
  if (toggle) toggle.addEventListener("click", function () {
    var next = mode() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncToggle();
  });
  syncToggle();

  /* ---------- Phone header: reserve its height, fold the nav row while scrolling down ---------- */
  var head = document.querySelector(".site-header"), phone = window.matchMedia("(max-width: 760px)");
  if (head) {
    var lastY = window.scrollY, ticking = false;
    var measure = function () {
      if (!phone.matches) { root.style.removeProperty("--head-h"); head.classList.remove("tuck"); return; }
      if (!head.classList.contains("tuck")) root.style.setProperty("--head-h", head.offsetHeight + "px");
    };
    var onScrollHead = function () {
      ticking = false;
      if (!phone.matches) return;
      var y = window.scrollY, dy = y - lastY;
      if (y < 80) head.classList.remove("tuck");
      else if (dy > 6) head.classList.add("tuck");
      else if (dy < -6) head.classList.remove("tuck");
      if (Math.abs(dy) > 6 || y < 80) lastY = y;
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScrollHead); } }, { passive: true });
    window.addEventListener("resize", measure);
    head.addEventListener("focusin", function () { head.classList.remove("tuck"); });
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }

  /* ---------- Search palette ---------- */
  var pal = $("palette"), q = $("q"), results = $("results");
  var index = null, sel = 0;
  function load() {
    if (index) return Promise.resolve(index);
    return fetch(pal.getAttribute("data-index")).then(function (r) { return r.json(); })
      .then(function (d) {
        index = d.map(function (x, i) {
          x.c = x.c || ""; x.o = i;
          x.lt = x.t.toLowerCase(); x.lg = ((x.g || []).join(" ") + " " + x.k).toLowerCase();
          x.lx = (x.x || "").toLowerCase(); x.lc = x.c.toLowerCase();
          return x;
        });
        return index;
      })
      .catch(function () { index = []; return index; });
  }
  /* Highlight every query word in a string. */
  function hl(s, words) {
    s = String(s || "");
    if (!words.length) return esc(s);
    var low = s.toLowerCase(), marks = [];
    words.forEach(function (w) { var i = 0; while ((i = low.indexOf(w, i)) >= 0) { marks.push([i, i + w.length]); i += w.length; } });
    if (!marks.length) return esc(s);
    marks.sort(function (m, n) { return m[0] - n[0]; });
    var out = "", at = 0;
    marks.forEach(function (m) { if (m[0] < at) return; out += esc(s.slice(at, m[0])) + "<mark>" + esc(s.slice(m[0], m[1])) + "</mark>"; at = m[1]; });
    return out + esc(s.slice(at));
  }
  /* A sentence-sized window of the article around the first body match. */
  function snippet(x, words) {
    var best = -1;
    words.forEach(function (w) { var i = x.lc.indexOf(w); if (i >= 0 && (best < 0 || i < best)) best = i; });
    if (best < 0) return null;
    var start = Math.max(0, best - 60), end = Math.min(x.c.length, best + 120);
    if (start > 0) { var sp = x.c.indexOf(" ", start); if (sp > 0 && sp < best) start = sp + 1; }
    if (end < x.c.length) { var ep = x.c.lastIndexOf(" ", end); if (ep > best) end = ep; }
    return (start > 0 ? "…" : "") + hl(x.c.slice(start, end), words) + (end < x.c.length ? "…" : "");
  }
  /* Every word must appear somewhere; title matches rank above tags, the summary, then the body. */
  function score(x, words) {
    var total = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i], sc = 0;
      if (x.lt.indexOf(w) >= 0) sc += 100;
      if (x.lg.indexOf(w) >= 0) sc += 40;
      if (x.lx.indexOf(w) >= 0) sc += 20;
      if (x.lc.indexOf(w) >= 0) sc += 1 + Math.min(9, x.lc.split(w).length - 2);
      if (!sc) return 0;
      total += sc;
    }
    return total;
  }
  function run() {
    var v = q.value.trim().toLowerCase(), words = v.split(/\s+/).filter(Boolean);
    var hits;
    if (words.length) {
      hits = index.map(function (x) { return { x: x, s: score(x, words) }; })
        .filter(function (h) { return h.s > 0; })
        .sort(function (m, n) { return n.s - m.s || m.x.o - n.x.o; })
        .map(function (h) { return h.x; });
    } else hits = index.slice(0, 8);
    sel = 0;
    results.innerHTML = hits.length
      ? hits.slice(0, 30).map(function (x, i) {
          var inMeta = words.length && words.every(function (w) { return (x.lt + " " + x.lx).indexOf(w) >= 0; });
          var snip = words.length && !inMeta ? snippet(x, words) : null;
          return '<li><a href="' + esc(x.u) + '"' + (i === 0 ? ' class="sel"' : "") + '><span class="k">' + esc(x.k) + '</span><span class="t">' + hl(x.t, words) + "</span>" +
            (snip ? '<span class="s">' + snip + "</span>" : "") +
            '<span class="m">' + esc(x.d) + (x.g && x.g.length ? " · " + esc(x.g.join(", ")) : "") + "</span></a></li>";
        }).join("")
      : '<li class="none">grep: no match for “' + esc(q.value.trim()) + '”. Try ctf, kerberos or identity.</li>';
  }
  function open() {
    if (!pal) return;
    q.value = "";
    results.innerHTML = '<li class="none">Loading the index…</li>';
    if (pal.showModal) pal.showModal(); else pal.setAttribute("open", "");
    q.focus();
    load().then(run);
  }
  if (pal) {
    $("search-open").addEventListener("click", open);
    Array.prototype.forEach.call(document.querySelectorAll("[data-open-search]"), function (b) { b.addEventListener("click", open); });
    $("search-close").addEventListener("click", function () { pal.close(); });
    pal.addEventListener("click", function (e) { if (e.target === pal) pal.close(); });
    q.addEventListener("input", function () { if (index) run(); });
    q.addEventListener("keydown", function (e) {
      var links = results.querySelectorAll("a");
      if (!links.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        links[sel].classList.remove("sel");
        sel = (sel + (e.key === "ArrowDown" ? 1 : links.length - 1)) % links.length;
        links[sel].classList.add("sel");
        links[sel].scrollIntoView({ block: "nearest" });
      }
      if (e.key === "Enter") { e.preventDefault(); window.location.href = links[sel].getAttribute("href"); }
    });
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
      if (e.key === "/" && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); open(); }
    });
  }

  /* ---------- Table of contents: toggle, scroll-spy, progress ---------- */
  var tocWrap = $("toc-wrap"), tocToggle = $("toc-toggle");
  if (tocToggle) tocToggle.addEventListener("click", function () {
    var isOpen = !tocWrap.classList.contains("open");
    tocWrap.classList.toggle("open", isOpen);
    tocToggle.setAttribute("aria-expanded", String(isOpen));
  });
  var prose = document.querySelector(".prose");
  var tocLinks = tocWrap ? Array.prototype.slice.call(tocWrap.querySelectorAll("nav a[href^='#']")) : [];
  var heads = tocLinks.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1))); });
  var bar = $("progress-bar"), label = $("progress-label"), line = $("read-line"), toTop = $("to-top");
  function onScroll() {
    if (!prose) return;
    var r = prose.getBoundingClientRect(), total = Math.max(1, r.height - window.innerHeight * 0.5);
    var pct = Math.max(0, Math.min(100, Math.round(((window.innerHeight * 0.25 - r.top) / total) * 100)));
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = pct + "% read";
    if (line) line.style.transform = "scaleX(" + pct / 100 + ")";
    if (toTop) toTop.hidden = window.scrollY < window.innerHeight * 1.5;
    if (!tocWrap) return;
    var active = 0;
    heads.forEach(function (h, i) { if (h && h.getBoundingClientRect().top < 140) active = i; });
    tocLinks.forEach(function (a, i) { a.classList.toggle("active", i === active); });
  }
  if (prose && (tocWrap || line || toTop)) { window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); onScroll(); }
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    var t = document.querySelector(".post-title"); if (t) { t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
  });

  /* ---------- Clipboard helper ---------- */
  function copyText(text, onDone, fallbackEl) {
    var select = function () { if (!fallbackEl) return; var sl = window.getSelection(), rg = document.createRange(); rg.selectNodeContents(fallbackEl); sl.removeAllRanges(); sl.addRange(rg); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(onDone, select); else select();
  }
  function flash(btn, label, idle) {
    btn.classList.add("done");
    var t = btn.querySelector("span") || btn; t.textContent = label;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.classList.remove("done"); t.textContent = idle; }, 1500);
  }

  /* ---------- Code blocks: title or language, copy (without line numbers), fold long output ---------- */
  var FOLD_AT = 25, SHOW = 15;
  Array.prototype.forEach.call(document.querySelectorAll(".prose .highlight"), function (block) {
    var code = block.querySelector("code");
    if (!code) return;
    var wrap = block.closest(".codeblock");
    var d = wrap ? wrap.dataset : {};
    var lang = d.lang || code.getAttribute("data-lang") || "text";
    var barEl = document.createElement("div");
    barEl.className = "code-bar";
    barEl.innerHTML = (d.title
        ? '<span class="code-title">' + esc(d.title) + '</span><span class="code-lang">' + esc(lang) + "</span>"
        : '<span class="code-title">' + esc(lang) + "</span>") +
      '<button type="button" class="copy"><span>Copy</span></button>';
    block.insertBefore(barEl, block.firstChild);
    var btn = barEl.querySelector("button");
    btn.addEventListener("click", function () {
      var clone = code.cloneNode(true);
      Array.prototype.forEach.call(clone.querySelectorAll(".ln, .lnt"), function (n) { n.remove(); });
      copyText(clone.textContent.replace(/\n$/, ""), function () { flash(btn, "Copied", "Copy"); }, code);
    });

    var lines = +(d.lines || 0);
    if (lines > FOLD_AT && !("nofold" in d)) {
      var pre = block.querySelector("pre");
      var lh = parseFloat(getComputedStyle(pre).lineHeight) || 24;
      var pad = parseFloat(getComputedStyle(pre).paddingTop) || 0;
      block.classList.add("folded");
      pre.style.maxHeight = Math.round(lh * SHOW + pad) + "px";
      var more = document.createElement("button");
      more.type = "button";
      more.className = "code-more";
      var label = "Show " + (lines - SHOW) + " more lines";
      more.textContent = label;
      more.setAttribute("aria-expanded", "false");
      more.addEventListener("click", function () {
        var open = block.classList.toggle("folded") === false;
        pre.style.maxHeight = open ? "none" : Math.round(lh * SHOW + pad) + "px";
        more.textContent = open ? "Fold output" : label;
        more.setAttribute("aria-expanded", String(open));
        if (!open) { var top = block.getBoundingClientRect().top; if (top < 0) window.scrollBy(0, top - 90); }
      });
      block.appendChild(more);
    }
  });

  /* ---------- Heading links: click the # to copy a link to that section ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".prose .anchor"), function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var url = location.href.split("#")[0] + a.getAttribute("href");
      history.replaceState(null, "", a.getAttribute("href"));
      a.parentNode.scrollIntoView({ behavior: "smooth", block: "start" });
      copyText(url, function () { a.classList.add("done"); setTimeout(function () { a.classList.remove("done"); }, 1400); });
    });
  });

  /* ---------- Share row: copy link ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy-url]"), function (btn) {
    btn.addEventListener("click", function () { copyText(btn.getAttribute("data-copy-url"), function () { flash(btn, "Copied", "Copy link"); }); });
  });

  /* ---------- Flag reveal: blurred until clicked ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-flag]"), function (box) {
    var btn = box.querySelector(".flag-reveal");
    box.classList.add("locked");
    var toggle = function () {
      var open = box.classList.toggle("locked") === false;
      btn.textContent = open ? "Hide flag" : "Click to reveal";
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", toggle);
    box.querySelector(".flag-body").addEventListener("click", function () { if (box.classList.contains("locked")) toggle(); });
  });

  /* ---------- Images in posts open full size; the page behind is blurred ---------- */
  var imgs = document.querySelectorAll(".prose img");
  if (imgs.length) {
    var lb = document.createElement("dialog");
    lb.className = "lightbox";
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML = '<img alt=""><button type="button" class="lb-close" aria-label="Close image">✕</button>';
    document.body.appendChild(lb);
    var big = lb.querySelector("img");
    var close = function () { lb.close(); };
    lb.addEventListener("click", close);
    lb.addEventListener("close", function () { document.documentElement.classList.remove("lb-open"); });
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.closest("a")) return;
      img.classList.add("zoomable");
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Open image full size" + (img.alt ? ": " + img.alt : ""));
      var openImg = function () {
        big.src = img.currentSrc || img.src; big.alt = img.alt || "";
        document.documentElement.classList.add("lb-open");
        if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
      };
      img.addEventListener("click", openImg);
      img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openImg(); } });
    });
  }

  /* ---------- Arsenal: small network drawings from each tool's real domain/node counts ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("svg.graph"), function (svg) {
    var domains = +svg.getAttribute("data-domains"), nodes = +svg.getAttribute("data-nodes"), s = +svg.getAttribute("data-seed") || 4217;
    var rnd = function () { s = (s * 16807) % 2147483647; return s / 2147483647; };
    var cx = 160, cy = 60, out = "", hubs = [];
    for (var i = 0; i < domains; i++) { var a = (i / domains) * Math.PI * 2; hubs.push([cx + Math.cos(a) * 92, cy + Math.sin(a) * 40]); }
    hubs.forEach(function (h) { out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + h[0].toFixed(1) + '" y2="' + h[1].toFixed(1) + '" stroke="var(--line-strong)"/>'; });
    for (var n = 0; n < nodes; n++) {
      var hub = hubs[n % domains], ang = rnd() * Math.PI * 2, rad = 8 + rnd() * 14;
      var x = Math.min(314, Math.max(6, hub[0] + Math.cos(ang) * rad)), y = Math.min(114, Math.max(6, hub[1] + Math.sin(ang) * rad * 0.7));
      out += '<line x1="' + hub[0].toFixed(1) + '" y1="' + hub[1].toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="var(--line)"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2" fill="var(--muted)"/>';
    }
    hubs.forEach(function (h) { out += '<circle cx="' + h[0].toFixed(1) + '" cy="' + h[1].toFixed(1) + '" r="4" fill="var(--accent)"/>'; });
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="7" fill="var(--flag)"/>';
    svg.innerHTML = out;
  });
})();
