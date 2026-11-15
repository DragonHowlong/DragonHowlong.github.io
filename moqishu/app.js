/* 默契测试仿写练习 — original code, not derived from Cloudz/Helopal sources. */
(() => {
  "use strict";

  const STORE_KEY = "moqiTreeQuizzes.v1";
  const DEMO_ID = "demo-long";
  const NAME_MAX = 15;
  const PRACTICE_API = "https://moqi-tree-practice.wanghowlonggg.workers.dev";

  const HOOKS = [
    { x: 80.0, y: 82.7 }, // 0: sits in the gift box (cx 240, y 430)
    { x: 35.7, y: 75.6 },
    { x: 64.3, y: 70.2 },
    { x: 37.7, y: 63.7 },
    { x: 62.3, y: 57.5 },
    { x: 39.7, y: 51.3 },
    { x: 60.3, y: 45.2 },
    { x: 42.3, y: 39.0 },
    { x: 57.7, y: 32.9 },
    { x: 45.0, y: 26.7 },
    { x: 50.0, y: 19.8 },
  ];

  const LIGHT_POS = [
    [150, 80], [128, 108], [172, 112],
    [116, 148], [150, 155], [186, 152],
    [104, 188], [150, 182], [198, 192],
    [96, 224], [150, 216], [164, 218], [208, 226],
    [84, 264], [150, 252], [218, 268],
    [72, 310], [128, 298], [160, 318], [228, 316],
    [58, 354], [150, 348], [244, 358],
    [50, 400], [96, 378], [150, 404], [206, 384], [250, 404],
  ];

  const DEMO_QUIZ = {
    id: DEMO_ID,
    hostName: "小龙",
    mood: "最近想窝着，也想见一见老朋友。",
    questions: [
      { q: "周末的小龙，更想怎么过？", choices: [{ e: "🛋️", t: "窝在家里看剧" }, { e: "🚶", t: "出门随便逛逛" }], a: 0 },
      { q: "冬天第一口，小龙会选？", choices: [{ e: "🍲", t: "热乎乎的火锅" }, { e: "🍠", t: "甜甜的烤红薯" }], a: 0 },
      { q: "小龙晚上通常几点睡？", choices: [{ e: "🌙", t: "十一点前就躺下" }, { e: "💡", t: "凌晨才关灯" }], a: 1 },
      { q: "下雨的下午，小龙更想？", choices: [{ e: "🍵", t: "泡一杯茶发呆" }, { e: "☂️", t: "撑伞去走走" }], a: 0 },
      { q: "小龙点奶茶，默认是？", choices: [{ e: "🥛", t: "少糖就好" }, { e: "🧋", t: "甜才过瘾" }], a: 0 },
      { q: "旅行前一晚，小龙会？", choices: [{ e: "📝", t: "清单列得整整齐齐" }, { e: "🎒", t: "走到哪算哪" }], a: 0 },
      { q: "小龙喜欢的早餐是？", choices: [{ e: "🥖", t: "咸口的豆浆油条" }, { e: "🥐", t: "甜口的面包咖啡" }], a: 0 },
      { q: "朋友来了，小龙更想？", choices: [{ e: "🏠", t: "家里随便坐坐" }, { e: "🍜", t: "找家馆子好好吃" }], a: 0 },
      { q: "小龙看剧时，更常？", choices: [{ e: "🤫", t: "安安静静看到尾" }, { e: "💬", t: "边看边吐槽" }], a: 1 },
      { q: "天气骤冷，小龙第一反应是？", choices: [{ e: "🧣", t: "把围巾帽子翻出来" }, { e: "☕", t: "先点一杯热饮再说" }], a: 1 },
    ],
  };

  const CREATE_BANK = [
    { q: "周末你更想怎么过？", choices: [{ e: "🛋️", t: "窝在家里歇着" }, { e: "🚶", t: "出门随便走走" }] },
    { q: "冬天第一口，你会选？", choices: [{ e: "🍲", t: "热乎乎的火锅" }, { e: "🍠", t: "甜甜的烤红薯" }] },
    { q: "你晚上通常几点睡？", choices: [{ e: "🌙", t: "十一点前就躺下" }, { e: "💡", t: "凌晨才关灯" }] },
    { q: "下雨的下午，你更想？", choices: [{ e: "🍵", t: "泡一杯茶发呆" }, { e: "☂️", t: "撑伞去走走" }] },
    { q: "点奶茶时，你默认是？", choices: [{ e: "🥛", t: "少糖就好" }, { e: "🧋", t: "甜才过瘾" }] },
    { q: "旅行前一晚，你会？", choices: [{ e: "📝", t: "清单列得整整齐齐" }, { e: "🎒", t: "走到哪算哪" }] },
    { q: "你更喜欢的早餐是？", choices: [{ e: "🥖", t: "咸口的豆浆油条" }, { e: "🥐", t: "甜口的面包咖啡" }] },
    { q: "朋友来了，你更想？", choices: [{ e: "🏠", t: "家里随便坐坐" }, { e: "🍜", t: "找家馆子好好吃" }] },
    { q: "看剧时，你更常？", choices: [{ e: "🤫", t: "安安静静看到尾" }, { e: "💬", t: "边看边吐槽" }] },
    { q: "天气骤冷，你第一反应是？", choices: [{ e: "🧣", t: "把围巾帽子翻出来" }, { e: "☕", t: "先点一杯热饮再说" }] },
  ];

  const FLAVOR_RIGHT = ["对上了。", "就是这个。", "你记得。", "嗯，是这样。"];
  const FLAVOR_WRONG = ["差一点点。", "小龙选的是另一边。", "先停在这儿。", "这回没对上。"];
  const FLAVOR_STREAK = ["连着对上了。", "默契还在往上走。"];
  const INTRO_LINES = [
    "小龙在树下等你。",
    "答对一题，挂件就往上爬一层。",
    "答错也不掉下来，只是在这一层停一停。",
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.documentElement.classList.add("reduce-motion");

  const $ = (sel, root = document) => root.querySelector(sel);
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? Math.min(ms, 140) : ms));

  const els = {
    splash: $("#splash"),
    room: $("#room"),
    camera: $("#camera"),
    treeFit: $("#tree-fit"),
    treeSvg: $("#tree-svg"),
    ornament: $("#ornament"),
    ornamentName: $("#ornament-name"),
    deco: $("#deco-layer"),
    lights: $("#lights"),
    hooks: $("#hooks"),
    starField: $("#star-field"),
    snow: $("#snow"),
    playerName: $("#player-name"),
    previewName: $("#preview-name"),
    previewOrnament: $("#preview-ornament"),
    inviteHost: $("#invite-host"),
    inviteMood: $("#invite-mood"),
    social: $("#social-proof"),
    btnStart: $("#btn-start"),
    introCaption: $("#intro-caption"),
    btnSkipIntro: $("#btn-skip-intro"),
    flavor: $("#flavor"),
    quizKicker: $("#quiz-kicker"),
    quizQuestion: $("#quiz-question"),
    quizChoices: $("#quiz-choices"),
    resultKicker: $("#result-kicker"),
    resultTitle: $("#result-title"),
    resultPlayer: $("#result-player"),
    resultHost: $("#result-host"),
    resultScore: $("#result-score"),
    resultBody: $("#result-body"),
    resultComeback: $("#result-comeback"),
    btnCreate: $("#btn-create"),
    btnPeek: $("#btn-peek-tree"),
    btnRetry: $("#btn-retry"),
    creatorName: $("#creator-name"),
    creatorPreview: $("#creator-preview-name"),
    creatorOrnament: $("#creator-ornament"),
    btnCreateStart: $("#btn-create-start"),
    createKicker: $("#create-kicker"),
    createQuestion: $("#create-question"),
    createChoices: $("#create-choices"),
    shareHost: $("#share-host-line"),
    shareLink: $("#share-link"),
    btnCopy: $("#btn-copy"),
    btnOpenInvite: $("#btn-open-invite"),
  };

  const state = {
    scene: "splash",
    quiz: DEMO_QUIZ,
    playerName: "",
    qIndex: 0,
    score: 0,
    streak: 0,
    locked: false,
    creating: null,
    introTimer: 0,
  };

  /* ---------- sound: live 默契测试 BGM + toggle; no synthesized SFX ---------- */
  function unlockAudio() { /* kept as a no-op so existing call sites stay intact */ }
  const snd = { click() {}, wait() {}, right() {}, wrong() {}, climb() {}, done() {} };

  function initBgm() {
    const MUTE_KEY = "zhiji_bgm_muted";
    const audio = document.getElementById("bgm");
    const btn = document.getElementById("bgm-toggle");
    if (!audio || !btn) return;

    audio.volume = 0.2;
    let unlocked = false;
    let muted = false;
    let gestureBound = false;
    try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch (e) {}

    function syncUi() {
      btn.textContent = muted ? "🔇" : "🔊";
      btn.setAttribute("aria-pressed", muted ? "true" : "false");
      btn.title = muted ? "点击开启背景音乐" : "点击静音背景音乐";
    }

    function persist() {
      try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch (e) {}
    }

    function tryPlay() {
      if (muted) return Promise.resolve(false);
      const p = audio.play();
      if (p && typeof p.then === "function") {
        return p.then(function () {
          unlocked = true;
          return true;
        }).catch(function () {
          return false;
        });
      }
      unlocked = true;
      return Promise.resolve(true);
    }

    function onFirstGesture() {
      tryPlay().then(function (ok) {
        if (ok) unbindGesture();
      });
    }

    function unbindGesture() {
      if (!gestureBound) return;
      gestureBound = false;
      document.removeEventListener("pointerdown", onFirstGesture, true);
      document.removeEventListener("touchstart", onFirstGesture, true);
      document.removeEventListener("click", onFirstGesture, true);
    }

    function bindGesture() {
      if (gestureBound || muted) return;
      gestureBound = true;
      document.addEventListener("pointerdown", onFirstGesture, { capture: true, passive: true });
      document.addEventListener("touchstart", onFirstGesture, { capture: true, passive: true });
      document.addEventListener("click", onFirstGesture, { capture: true });
    }

    function wechatPlay() { tryPlay(); }

    function bindWeChat() {
      if (typeof window.WeixinJSBridge === "object" && typeof window.WeixinJSBridge.invoke === "function") {
        wechatPlay();
      }
      document.addEventListener("WeixinJSBridgeReady", wechatPlay, false);
      document.addEventListener("WeixinJSBridgeReady", function () {
        try { WeixinJSBridge.invoke("getNetworkType", {}, wechatPlay); } catch (e) { wechatPlay(); }
      }, false);
    }

    btn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      muted = !muted;
      persist();
      syncUi();
      if (muted) {
        audio.pause();
        unbindGesture();
      } else {
        tryPlay().then(function (ok) {
          if (!ok) bindGesture();
          else unbindGesture();
        });
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        audio.pause();
      } else if (!muted) {
        tryPlay().then(function (ok) {
          if (ok) unlocked = true;
        });
      }
    });

    window.addEventListener("pageshow", function () {
      if (!muted) tryPlay();
    });

    ["loadeddata", "canplay", "canplaythrough"].forEach(function (evName) {
      audio.addEventListener(evName, function () {
        if (!muted && audio.paused) tryPlay();
      });
    });

    syncUi();
    bindWeChat();
    if (muted) {
      audio.pause();
    } else {
      tryPlay().then(function (ok) {
        if (!ok || audio.paused) bindGesture();
        else unbindGesture();
      });
      setTimeout(function () { if (!muted && audio.paused) tryPlay(); }, 0);
      setTimeout(function () { if (!muted && audio.paused) tryPlay(); }, 300);
      setTimeout(function () { if (!muted && audio.paused) tryPlay(); }, 800);
    }
  }

  /* ---------- helpers ---------- */
  function setText(el, value) {
    el.textContent = value == null ? "" : String(value);
  }

  function fillOrnament(nameEl, ornamentRoot, name, placeholder) {
    const text = name || placeholder;
    setText(nameEl, text);
    ornamentRoot.classList.toggle("is-empty", !name);
    const n = (name || "").length;
    const preview = ornamentRoot.classList.contains("is-preview");
    let size;
    if (preview) size = n > 8 ? "10px" : n > 5 ? "12px" : n > 3 ? "13px" : "14px";
    else size = n > 8 ? "8px" : n > 5 ? "9px" : n > 3 ? "10px" : "11px";
    nameEl.style.fontSize = size;
  }

  function clipName(value) {
    const s = String(value || "").replace(/\s+/g, " ").trim();
    return s.slice(0, NAME_MAX);
  }

  function hookPercent(tier) {
    const t = Math.max(0, Math.min(Number(tier) || 0, 10));
    if (t === 0) return HOOKS[0];
    const path = els.hooks && els.hooks.querySelector('.hook[data-tier="' + t + '"]');
    const svg = els.treeSvg;
    if (!path || !svg) return HOOKS[t];
    try {
      const bbox = path.getBBox();
      const vb = svg.viewBox.baseVal;
      const w = vb && vb.width ? vb.width : 300;
      const h = vb && vb.height ? vb.height : 520;
      return {
        x: ((bbox.x + bbox.width / 2) / w) * 100,
        y: ((bbox.y + bbox.height) / h) * 100,
      };
    } catch {
      return HOOKS[t];
    }
  }

  function placeOrnament(tier, opts = {}) {
    const t = Math.max(0, Math.min(Number(tier) || 0, 10));
    const hook = hookPercent(t);
    const snap = !!opts.snap || reduceMotion;
    els.ornament.dataset.tier = String(t);
    if (snap) els.ornament.classList.add("is-snap");
    els.ornament.style.left = hook.x + "%";
    els.ornament.style.top = hook.y + "%";
    if (snap) {
      void els.ornament.offsetWidth;
      els.ornament.classList.remove("is-snap");
    }
    els.ornament.classList.toggle("is-pop", !snap && t > 0);
    if (!snap && t > 0) {
      setTimeout(() => els.ornament.classList.remove("is-pop"), 500);
    }
  }

  function lightHooks(count) {
    els.hooks.querySelectorAll(".hook").forEach((h) => {
      const t = Number(h.getAttribute("data-tier"));
      h.classList.toggle("is-lit", t <= count);
    });
    els.lights.querySelectorAll(".tree-light").forEach((n, i) => {
      const threshold = Math.ceil(((i + 1) / LIGHT_POS.length) * 10);
      n.classList.toggle("is-on", threshold <= count || count >= 10);
    });
  }

  function updateCamera() {
    let s = 1, x = 0, y = 0;
    const scene = state.scene;
    const q = state.qIndex;
    if (scene === "quiz" && q === 9) {
      s = 1.42;
      y = 118;
      els.room.classList.add("is-dim");
    } else {
      els.room.classList.remove("is-dim");
      if (scene === "quiz" && q >= 6) {
        s = 1.14 + (q - 6) * 0.07;
        y = 20 + state.score * 6;
      }
    }
    if (scene === "result") {
      if (state.score >= 9) { s = 1.32; y = 86; }
      else if (state.score >= 7) { s = 1.16; y = 40; }
      else if (state.score >= 5) { s = 1.08; y = -8; }
      else { s = 1.12; y = -28; }
    }
    if (scene === "create-quiz") {
      s = 1.08;
      y = 8 + state.creating.done * 4;
    }
    els.camera.style.setProperty("--cam-s", String(s));
    els.camera.style.setProperty("--cam-x", x + "px");
    els.camera.style.setProperty("--cam-y", y + "px");
  }

  function shakeTree() {
    if (reduceMotion) return;
    els.camera.classList.remove("is-shake");
    void els.camera.offsetWidth;
    els.camera.classList.add("is-shake");
    els.ornament.classList.add("is-wobble");
    setTimeout(() => {
      els.camera.classList.remove("is-shake");
      els.ornament.classList.remove("is-wobble");
    }, 560);
  }

  function showFlavor(text) {
    setText(els.flavor, text);
    els.flavor.hidden = !text;
  }

  function hideFlavor() {
    els.flavor.hidden = true;
    setText(els.flavor, "");
  }

  function showScene(name) {
    state.locked = false;
    state.scene = name;
    document.querySelectorAll(".scene").forEach((s) => {
      s.hidden = s.dataset.scene !== name;
    });
    els.room.dataset.mode = name;
    els.room.classList.remove("is-peek");
    const peek = $(".peek-hint");
    if (peek) peek.remove();
    const showOrnament = name === "quiz" || name === "intro" || name === "result";
    els.ornament.style.visibility = showOrnament ? "visible" : "hidden";
    updateCamera();
  }

  /* ---------- storage / routing ---------- */
  let routeToken = 0;

  function apiBase() {
    const origin = location.origin;
    if (origin === "https://moqi-tree-practice.wanghowlonggg.workers.dev") return origin;
    return PRACTICE_API;
  }

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveQuiz(quiz) {
    if (!quiz || !quiz.id || quiz.id === DEMO_ID) return;
    const all = loadStore();
    all[quiz.id] = quiz;
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  }

  function getQuiz(id) {
    if (!id || id === DEMO_ID) return DEMO_QUIZ;
    const found = loadStore()[id];
    return found || null;
  }

  async function publishQuiz(quiz) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(apiBase() + "/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: quiz.id,
          hostName: quiz.hostName,
          mood: quiz.mood || "",
          questions: quiz.questions,
        }),
        signal: ctrl.signal,
      });
      return res.ok || res.status === 409;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }

  async function fetchQuizRemote(id) {
    if (!id || id === DEMO_ID) return null;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(apiBase() + "/api/quizzes/" + encodeURIComponent(id), {
        signal: ctrl.signal,
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || data.id !== id || !Array.isArray(data.questions) || data.questions.length !== 10) {
        return null;
      }
      const quiz = {
        id: data.id,
        hostName: String(data.hostName || "").slice(0, NAME_MAX),
        mood: String(data.mood || ""),
        questions: data.questions,
      };
      if (!quiz.hostName) return null;
      saveQuiz(quiz);
      return quiz;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  async function resolveQuiz(id) {
    const local = getQuiz(id);
    if (local) return local;
    return fetchQuizRemote(id);
  }

  function parseHash() {
    const h = (location.hash || "").replace(/^#/, "");
    const parts = h.split("/").filter(Boolean);
    return parts;
  }

  function setHash(path) {
    const next = "#" + path;
    if (location.hash !== next) history.replaceState(null, "", next);
  }

  /* ---------- boot scenery ---------- */
  function placeLights() {
    const g = els.lights;
    g.textContent = "";
    const ns = "http://www.w3.org/2000/svg";
    LIGHT_POS.forEach(([x, y], i) => {
      const c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", x);
      c.setAttribute("cy", y);
      c.setAttribute("r", i % 5 === 0 ? 4.6 : 3.8);
      c.setAttribute("fill", ["#ff5b6a", "#ffd24a", "#5aa8ff", "#ff7a3a", "#4fd0a0", "#b46bff"][i % 6]);
      c.setAttribute("class", "tree-light");
      g.appendChild(c);
    });
  }

  function placeStars() {
    els.starField.textContent = "";
    for (let i = 0; i < 28; i++) {
      const s = document.createElement("span");
      s.style.left = (4 + Math.random() * 92) + "%";
      s.style.top = (3 + Math.random() * 42) + "%";
      s.style.animationDelay = (Math.random() * 3) + "s";
      s.style.opacity = String(0.3 + Math.random() * 0.6);
      els.starField.appendChild(s);
    }
  }

  function placeSnow() {
    els.snow.textContent = "";
    if (reduceMotion) return;
    const low = navigator.deviceMemory && navigator.deviceMemory <= 2;
    const n = low ? 8 : 20;
    for (let i = 0; i < n; i++) {
      const f = document.createElement("span");
      f.style.left = Math.random() * 100 + "%";
      f.style.animationDuration = 8 + Math.random() * 10 + "s";
      f.style.animationDelay = -Math.random() * 12 + "s";
      f.style.opacity = String(0.35 + Math.random() * 0.5);
      f.style.width = f.style.height = 3 + Math.random() * 4 + "px";
      els.snow.appendChild(f);
    }
  }

  /* ---------- invite ---------- */
  function openInvite(quiz, opts = {}) {
    state.quiz = quiz;
    state.qIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.locked = false;
    if (!opts.keepName) state.playerName = "";
    els.deco.textContent = "";
    lightHooks(0);
    placeOrnament(0);
    fillOrnament(els.ornamentName, els.ornament, state.playerName, "");
    setText(els.inviteHost, quiz.hostName);
    setText(els.inviteMood, quiz.mood || "");
    els.inviteMood.hidden = !quiz.mood;
    if (quiz.id === DEMO_ID) {
      setText(els.social, "演示 · 已有 3 人来过（示例，不是真实数据）");
      els.social.hidden = false;
    } else {
      els.social.hidden = true;
      setText(els.social, "");
    }
    els.playerName.value = state.playerName;
    fillOrnament(els.previewName, els.previewOrnament, state.playerName, "你的名字");
    setHash("/f/" + quiz.id);
    showScene("invite");
  }

  function onNameInput() {
    const name = clipName(els.playerName.value);
    if (els.playerName.value !== name) els.playerName.value = name;
    state.playerName = name;
    fillOrnament(els.previewName, els.previewOrnament, name, "你的名字");
    fillOrnament(els.ornamentName, els.ornament, name, "");
  }

  function shakeBtn(btn) {
    btn.classList.remove("is-shake");
    void btn.offsetWidth;
    btn.classList.add("is-shake");
    setTimeout(() => btn.classList.remove("is-shake"), 400);
  }

  async function startPlay() {
    unlockAudio();
    snd.click();
    const name = clipName(els.playerName.value);
    if (!name) {
      shakeBtn(els.btnStart);
      els.playerName.focus();
      return;
    }
    state.playerName = name;
    fillOrnament(els.ornamentName, els.ornament, name, "");
    if (reduceMotion) {
      beginQuiz();
      return;
    }
    await playIntro();
  }

  async function playIntro() {
    showScene("intro");
    placeOrnament(0);
    let skipped = false;
    let unlockSkip;
    const skipP = new Promise((r) => { unlockSkip = r; });
    const skip = () => { skipped = true; unlockSkip(); };
    els.btnSkipIntro.addEventListener("click", skip, { once: true });
    const lines = INTRO_LINES.map((line, i) =>
      i === 0 ? state.quiz.hostName + "在树下等你。" : line
    );
    for (const line of lines) {
      if (skipped) break;
      setText(els.introCaption, line);
      await Promise.race([wait(1600), skipP]);
    }
    els.btnSkipIntro.removeEventListener("click", skip);
    if (state.scene !== "intro") return;
    beginQuiz();
  }

  function beginQuiz() {
    state.qIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.locked = false;
    els.deco.textContent = "";
    lightHooks(0);
    placeOrnament(0);
    hideFlavor();
    showScene("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const i = state.qIndex;
    const item = state.quiz.questions[i];
    hideFlavor();
    setText(els.quizKicker, "第 " + (i + 1) + " 题");
    setText(els.quizQuestion, item.q);
    if (i === 9) {
      showFlavor("最后一题，看看还能不能再高一点。");
    }
    updateCamera();
    renderChoices(els.quizChoices, item.choices, onPick);
    state.locked = false;
  }

  function renderChoices(container, choices, handler) {
    container.textContent = "";
    choices.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.dataset.index = String(i);
      const art = document.createElement("span");
      art.className = "choice-art";
      setText(art, c.e);
      const label = document.createElement("span");
      label.className = "choice-label";
      setText(label, c.t);
      btn.append(art, label);
      btn.addEventListener("click", () => handler(i, btn));
      container.append(btn);
    });
  }

  async function onPick(index) {
    if (state.locked) return;
    state.locked = true;
    unlockAudio();
    const item = state.quiz.questions[state.qIndex];
    const buttons = [...els.quizChoices.querySelectorAll(".choice")];
    buttons.forEach((b) => { b.disabled = true; b.classList.add("is-wait"); });
    snd.wait();
    await wait(420);
    buttons.forEach((b) => b.classList.remove("is-wait"));

    const correct = index === item.a;
    buttons.forEach((b) => {
      const i = Number(b.dataset.index);
      if (i === item.a) b.classList.add(correct ? "is-right" : "is-missed-correct");
      else if (i === index) b.classList.add("is-wrong");
    });

    if (correct) {
      state.score += 1;
      state.streak += 1;
      snd.right();
      const line = state.streak >= 2
        ? FLAVOR_STREAK[(state.streak + state.qIndex) % FLAVOR_STREAK.length]
        : FLAVOR_RIGHT[state.qIndex % FLAVOR_RIGHT.length];
      showFlavor(line);
      await wait(180);
      snd.climb();
      lightHooks(state.score);
      placeOrnament(state.score);
      els.room.classList.add("is-celebrate");
      setTimeout(() => els.room.classList.remove("is-celebrate"), 1000);
      await wait(900);
    } else {
      state.streak = 0;
      snd.wrong();
      const host = state.quiz.hostName;
      const pool = FLAVOR_WRONG.map((s) => s.replace("小龙", host));
      showFlavor(pool[state.qIndex % pool.length]);
      shakeTree();
      await wait(1100);
    }

    if (state.scene !== "quiz") return;
    state.qIndex += 1;
    if (state.qIndex >= 10) {
      await finishQuiz();
    } else {
      renderQuestion();
    }
  }

  function resultCopy(score, player, host) {
    if (score >= 9) {
      return {
        kicker: "靠近树顶",
        title: "原来你这么懂" + host,
        body: "挂件几乎挨着树尖了。这棵树上，你的位置很亮。",
        comeback: host + "把你放在了靠近树顶的地方。要不要出一套⁠题，看⁠看能把" + host + "放哪儿？",
      };
    }
    if (score >= 7) {
      return {
        kicker: "很显眼的一层",
        title: "一眼就能看见你",
        body: "还没到最上面，但已经挂在最显眼的那一层，走过的人都会注意到。",
        comeback: "位置已经很亮了。换你出一套，看" + host + "能不能站得更高。",
      };
    }
    if (score >= 5) {
      return {
        kicker: "挂上了，还偏低",
        title: "树上有你的位置",
        body: "挂件留下来了，只是还在偏低的枝桠上。默契已经开了头。",
        comeback: "要不要也出十道关于你的题，让" + host + "来爬一次？",
      };
    }
    return {
      kicker: "还在盒子里",
      title: "这回没爬高，却仍被收下",
      body: "挂件还待在树下的盒子里。不是把你拒之门外，" + host + "还是把你留下了。默契可以再慢慢攒。",
      comeback: "要不要出一套你的⁠题，反过来问问" + host + "？",
    };
  }

  async function finishQuiz() {
    lightHooks(state.score);
    placeOrnament(state.score);
    if (state.score >= 9) snd.done();
    const copy = resultCopy(state.score, state.playerName, state.quiz.hostName);
    setText(els.resultKicker, copy.kicker);
    setText(els.resultTitle, copy.title);
    setText(els.resultPlayer, state.playerName);
    setText(els.resultHost, state.quiz.hostName);
    setText(els.resultScore, String(state.score));
    setText(els.resultBody, copy.body);
    setText(els.resultComeback, copy.comeback);
    hideFlavor();
    showScene("result");
  }

  function peekTree() {
    els.room.classList.add("is-peek");
    let hint = $(".peek-hint");
    if (!hint) {
      hint = document.createElement("p");
      hint.className = "peek-hint";
      setText(hint, "点一下屏幕，回到结算");
      els.room.appendChild(hint);
    }
    const close = () => {
      els.room.classList.remove("is-peek");
      hint.remove();
      els.room.removeEventListener("click", close);
    };
    setTimeout(() => els.room.addEventListener("click", close, { once: true }), 0);
  }

  /* ---------- create ---------- */
  function openCreate() {
    state.creating = { name: "", done: 0, questions: CREATE_BANK.map((q) => ({ ...q, a: null })) };
    els.deco.textContent = "";
    lightHooks(0);
    els.creatorName.value = "";
    fillOrnament(els.creatorPreview, els.creatorOrnament, "", "你的名字");
    setHash("/create");
    showScene("create-name");
  }

  function onCreatorInput() {
    const name = clipName(els.creatorName.value);
    if (els.creatorName.value !== name) els.creatorName.value = name;
    state.creating.name = name;
    fillOrnament(els.creatorPreview, els.creatorOrnament, name, "你的名字");
  }

  function startCreateQuiz() {
    unlockAudio();
    const name = clipName(els.creatorName.value);
    if (!name) {
      shakeBtn(els.btnCreateStart);
      els.creatorName.focus();
      return;
    }
    snd.click();
    state.creating.name = name;
    state.creating.done = 0;
    els.deco.textContent = "";
    lightHooks(0);
    showScene("create-quiz");
    renderCreateQuestion();
  }

  function renderCreateQuestion() {
    const i = state.creating.done;
    const item = state.creating.questions[i];
    setText(els.createKicker, "装饰第 " + (i + 1) + " 层");
    setText(els.createQuestion, item.q);
    updateCamera();
    renderChoices(els.createChoices, item.choices, onCreatePick);
  }

  function addDeco(tier) {
    const hook = HOOKS[tier];
    const dot = document.createElement("span");
    dot.className = "deco-dot";
    dot.style.left = hook.x + "%";
    dot.style.top = hook.y + "%";
    els.deco.appendChild(dot);
  }

  async function onCreatePick(index) {
    if (state.locked) return;
    state.locked = true;
    unlockAudio();
    const item = state.creating.questions[state.creating.done];
    item.a = index;
    const buttons = [...els.createChoices.querySelectorAll(".choice")];
    buttons.forEach((b) => {
      b.disabled = true;
      if (Number(b.dataset.index) === index) b.classList.add("is-right");
    });
    state.creating.done += 1;
    snd.right();
    lightHooks(state.creating.done);
    addDeco(state.creating.done);
    els.room.classList.add("is-celebrate");
    setTimeout(() => els.room.classList.remove("is-celebrate"), 800);
    await wait(650);
    state.locked = false;
    if (state.creating.done >= 10) {
      await finishCreate();
    } else {
      renderCreateQuestion();
    }
  }

  function newId() {
    const alphabet = "abcdefghijkmnopqrstuvwxyz23456789";
    const bytes = new Uint8Array(10);
    // Must call as a method: crypto.getRandomValues(bytes).
    // Detaching it (const fn = crypto.getRandomValues; fn(bytes)) throws Illegal invocation and stalls create on Q10.
    if (crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += alphabet[bytes[i] % alphabet.length];
    return s;
  }

  async function finishCreate() {
    const id = newId();
    const quiz = {
      id,
      hostName: state.creating.name,
      mood: "十道关于我的题，看你能爬多高。",
      questions: state.creating.questions.map((q) => ({
        q: q.q,
        choices: q.choices,
        a: q.a,
      })),
    };
    saveQuiz(quiz);
    state.quiz = quiz;
    lightHooks(10);
    els.room.classList.add("is-celebrate");
    snd.done();
    const published = publishQuiz(quiz);
    await wait(900);
    await published;
    els.room.classList.remove("is-celebrate");
    openShare(quiz);
  }

  function fullLink(id) {
    const url = new URL(location.href);
    url.hash = "#/f/" + id;
    url.pathname = url.pathname.replace(/\/index\.html$/i, "/");
    url.search = "";
    return url.toString();
  }

  function openShare(quiz) {
    state.quiz = quiz;
    setText(els.shareHost, quiz.hostName + "的默契树已经做好了。");
    const url = fullLink(quiz.id);
    setText(els.shareLink, url);
    els.shareLink.title = url;
    setText(els.btnCopy, "复制");
    els.btnCopy.classList.remove("is-done");
    setHash("/share/" + quiz.id);
    showScene("share");
  }

  async function copyLink() {
    const url = fullLink(state.quiz.id);
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        ok = true;
      }
    } catch (_) { /* fallback below */ }
    if (!ok) {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
      ta.remove();
    }
    setText(els.btnCopy, ok ? "已复制" : "复制失败");
    els.btnCopy.classList.toggle("is-done", ok);
    if (ok) snd.click();
    setTimeout(() => {
      setText(els.btnCopy, "复制");
      els.btnCopy.classList.remove("is-done");
    }, 2000);
  }

  /* ---------- route ---------- */
  async function goFromHash() {
    const token = ++routeToken;
    const parts = parseHash();
    if (parts[0] === "create") {
      openCreate();
      return;
    }
    if ((parts[0] === "share" || parts[0] === "f") && parts[1]) {
      const quiz = await resolveQuiz(parts[1]);
      if (token !== routeToken) return;
      if (quiz) {
        if (parts[0] === "share") openShare(quiz);
        else openInvite(quiz);
        return;
      }
      if (parts[0] === "f") {
        openMissing();
        return;
      }
    }
    if (token !== routeToken) return;
    openInvite(DEMO_QUIZ);
  }

  function openMissing() {
    state.quiz = DEMO_QUIZ;
    setText(els.inviteHost, "这棵树还没找到");
    setText(els.inviteMood, "也许是演示链接过期了。你可以先玩小龙的树，或自己出一套。");
    els.inviteMood.hidden = false;
    els.social.hidden = true;
    showScene("invite");
  }

  /* ---------- events ---------- */
  els.playerName.addEventListener("input", onNameInput);
  els.creatorName.addEventListener("input", onCreatorInput);
  els.btnStart.addEventListener("click", startPlay);
  els.btnSkipIntro.addEventListener("click", () => { unlockAudio(); snd.click(); });
  els.btnCreate.addEventListener("click", () => { unlockAudio(); snd.click(); openCreate(); });
  els.btnPeek.addEventListener("click", peekTree);
  els.btnRetry.addEventListener("click", () => {
    unlockAudio();
    snd.click();
    openInvite(state.quiz, { keepName: true });
  });
  els.btnCreateStart.addEventListener("click", startCreateQuiz);
  els.btnCopy.addEventListener("click", copyLink);
  els.btnOpenInvite.addEventListener("click", () => {
    unlockAudio();
    snd.click();
    state.playerName = "";
    openInvite(state.quiz);
  });

  window.addEventListener("hashchange", () => {
    if (state.scene === "splash") return;
    void goFromHash();
  });

  /* ---------- start ---------- */
  async function boot() {
    initBgm();
    placeLights();
    placeStars();
    placeSnow();
    lightHooks(0);
    placeOrnament(0);
    const shot = new URLSearchParams(location.search).get("shot");
    if (shot === "splash") {
      document.documentElement.dataset.ready = "1";
      return;
    }
    await wait(reduceMotion ? 360 : 1250);
    els.splash.classList.add("is-off");
    await wait(reduceMotion ? 120 : 520);
    els.splash.hidden = true;
    await goFromHash();
    document.documentElement.dataset.ready = "1";
    if (shot) applyShot(shot);
  }

  /* Screenshot / review helpers only — not used by the playable path. */
  function applyShot(shot) {
    const name = new URLSearchParams(location.search).get("name") || "阿树";
    if (shot === "invite") {
      els.playerName.value = name;
      onNameInput();
    } else if (shot === "intro") {
      state.playerName = name;
      fillOrnament(els.ornamentName, els.ornament, name, "");
      showScene("intro");
      setText(els.introCaption, state.quiz.hostName + "在树下等你。");
    } else if (shot === "quiz" || shot === "quiz-late" || shot === "right" || shot === "wrong" || shot === "finale") {
      state.playerName = name;
      fillOrnament(els.ornamentName, els.ornament, name, "");
      if (shot === "quiz-late" || shot === "finale") {
        state.qIndex = shot === "finale" ? 9 : 7;
        state.score = shot === "finale" ? 8 : 6;
      } else if (shot === "right") {
        state.qIndex = 2;
        state.score = 3;
      } else if (shot === "wrong") {
        state.qIndex = 2;
        state.score = 2;
      }
      beginQuizFromShot(shot);
    } else if (shot === "result-high" || shot === "result-low") {
      state.playerName = name;
      state.score = shot === "result-high" ? 9 : 3;
      fillOrnament(els.ornamentName, els.ornament, name, "");
      lightHooks(state.score);
      placeOrnament(state.score, { snap: true });
      finishQuiz();
    } else if (shot === "create") {
      openCreate();
      els.creatorName.value = name;
      onCreatorInput();
    } else if (shot === "share") {
      openCreate();
      state.creating.name = name;
      state.creating.questions.forEach((q, i) => { q.a = i % 2; });
      const quiz = {
        id: "demo-ex01",
        hostName: name,
        mood: "十道关于我的题，看你能爬多高。",
        questions: state.creating.questions,
      };
      lightHooks(10);
      openShare(quiz);
    }
  }

  function beginQuizFromShot(shot) {
    const q = state.qIndex;
    const score = state.score;
    // beginQuiz resets counters; restore after scene setup
    const keepQ = q, keepS = score;
    beginQuiz();
    if (shot === "quiz") return;
    state.qIndex = keepQ;
    state.score = keepS;
    lightHooks(state.score);
    renderQuestion();
    if (shot === "right" || shot === "wrong") {
      const item = state.quiz.questions[state.qIndex];
      const buttons = [...els.quizChoices.querySelectorAll(".choice")];
      buttons.forEach((b) => { b.disabled = true; });
      if (shot === "right") {
        buttons[item.a].classList.add("is-right");
        showFlavor("对上了。");
      } else {
        const wrong = item.a === 0 ? 1 : 0;
        buttons[wrong].classList.add("is-wrong");
        buttons[item.a].classList.add("is-missed-correct");
        showFlavor("差一点点。");
      }
    }
    placeOrnament(state.score, { snap: true });
  }

  window.__moqi = { state, showScene, openInvite, beginQuiz, finishQuiz, openCreate, openShare };

  boot();
})();
