import { useState, useEffect, useMemo } from "react";

const CARDS = [
  // 動物 (12)
  { id:1, kr:"강아지", ruby:"カンアジ", en:"dog", emoji:"🐶", cat:"動物" },
  { id:2, kr:"고양이", ruby:"コヤンイ", en:"cat", emoji:"🐱", cat:"動物" },
  { id:3, kr:"토끼", ruby:"トッキ", en:"rabbit", emoji:"🐰", cat:"動物" },
  { id:4, kr:"새", ruby:"セ", en:"bird", emoji:"🐦", cat:"動物" },
  { id:5, kr:"물고기", ruby:"ムルコギ", en:"fish", emoji:"🐟", cat:"動物" },
  { id:16, kr:"돼지", ruby:"トェジ", en:"pig", emoji:"🐷", cat:"動物" },
  { id:17, kr:"개구리", ruby:"ケグリ", en:"frog", emoji:"🐸", cat:"動物" },
  { id:18, kr:"코끼리", ruby:"コッキリ", en:"elephant", emoji:"🐘", cat:"動物" },
  { id:19, kr:"원숭이", ruby:"ウォンスンイ", en:"monkey", emoji:"🐵", cat:"動物" },
  { id:20, kr:"곰", ruby:"コム", en:"bear", emoji:"🐻", cat:"動物" },
  { id:21, kr:"사자", ruby:"サジャ", en:"lion", emoji:"🦁", cat:"動物" },
  { id:22, kr:"거북이", ruby:"コブギ", en:"turtle", emoji:"🐢", cat:"動物" },
  // 食べ物 (12)
  { id:6, kr:"사과", ruby:"サグァ", en:"apple", emoji:"🍎", cat:"食べ物" },
  { id:7, kr:"바나나", ruby:"パナナ", en:"banana", emoji:"🍌", cat:"食べ物" },
  { id:8, kr:"딸기", ruby:"ッタルギ", en:"strawberry", emoji:"🍓", cat:"食べ物" },
  { id:9, kr:"빵", ruby:"ッパン", en:"bread", emoji:"🍞", cat:"食べ物" },
  { id:10, kr:"우유", ruby:"ウユ", en:"milk", emoji:"🥛", cat:"食べ物" },
  { id:23, kr:"밥", ruby:"パプ", en:"rice", emoji:"🍚", cat:"食べ物" },
  { id:24, kr:"케이크", ruby:"ケイク", en:"cake", emoji:"🍰", cat:"食べ物" },
  { id:25, kr:"아이스크림", ruby:"アイスクリム", en:"icecream", emoji:"🍦", cat:"食べ物" },
  { id:26, kr:"귤", ruby:"キュル", en:"mandarin", emoji:"🍊", cat:"食べ物" },
  { id:27, kr:"피자", ruby:"ピジャ", en:"pizza", emoji:"🍕", cat:"食べ物" },
  { id:28, kr:"도넛", ruby:"トノッ", en:"donut", emoji:"🍩", cat:"食べ物" },
  { id:29, kr:"달걀", ruby:"タルギャル", en:"egg", emoji:"🥚", cat:"食べ物" },
  // 自然 (5)
  { id:11, kr:"별", ruby:"ピョル", en:"star", emoji:"⭐", cat:"自然" },
  { id:12, kr:"해", ruby:"ヘ", en:"sun", emoji:"☀️", cat:"自然" },
  { id:13, kr:"달", ruby:"タル", en:"moon", emoji:"🌙", cat:"自然" },
  { id:14, kr:"꽃", ruby:"ッコッ", en:"flower", emoji:"🌸", cat:"自然" },
  { id:15, kr:"나무", ruby:"ナム", en:"tree", emoji:"🌳", cat:"自然" },
];

const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// ── TTS ──
const hasKoreanVoice = () => {
  if (typeof speechSynthesis === "undefined") return false;
  return speechSynthesis.getVoices().some((v) => v.lang.startsWith("ko"));
};

const speakKorean = (text, enabled) => {
  if (!enabled || typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ko-KR";
  u.rate = 0.85;
  u.pitch = 1.1;
  const v = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("ko"));
  if (v.length > 0) u.voice = v[0];
  speechSynthesis.speak(u);
};

// ── Shared styles ──
const css = {
  wrap: { width: "100%", maxWidth: 480, margin: "0 auto", padding: "16px clamp(8px, 3vw, 20px)", fontFamily: "system-ui, -apple-system, sans-serif", boxSizing: "border-box" },
  btn: (bg) => ({ padding: "10px clamp(16px, 4vw, 24px)", fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700, color: "#FFF", background: bg, border: "none", borderRadius: 30, cursor: "pointer", boxShadow: "0 3px 10px rgba(0,0,0,0.12)", minHeight: 44 }),
  chip: (active, color) => ({ padding: "6px clamp(10px, 2.5vw, 14px)", fontSize: "clamp(11px, 2.8vw, 13px)", fontWeight: 700, borderRadius: 20, border: "2px solid", borderColor: active ? color : "#DDD", background: active ? (color === "#FF6B35" ? "#FFF3E0" : color === "#5C6BC0" ? "#E8EAF6" : "#F3E5F5") : "#FFF", color: active ? color : "#888", cursor: "pointer", minHeight: 36 }),
  navBtn: (bg) => ({ padding: 0, fontSize: "clamp(18px, 5vw, 24px)", fontWeight: 700, color: "#FFF", background: bg, border: "none", borderRadius: "50%", cursor: "pointer", boxShadow: "0 3px 10px rgba(0,0,0,0.12)", width: "clamp(44px, 12vw, 56px)", height: "clamp(44px, 12vw, 56px)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 44 }),
};

// ── Toggle Button ──
function ToggleBtn({ enabled, onToggle, available, onLabel, offLabel }) {
  return (
    <button onClick={onToggle} disabled={available === false}
      style={{ ...css.chip(enabled && available !== false, "#AB47BC"), opacity: available === false ? 0.5 : 1, cursor: available === false ? "not-allowed" : "pointer" }}>
      {enabled && available !== false ? onLabel : offLabel}
    </button>
  );
}

// ── Flashcard ──
function Flashcard({ card, flipped, onFlip, showRuby }) {
  return (
    <div onClick={onFlip} style={{ perspective: 800, width: "clamp(220px, 65vw, 280px)", height: "clamp(290px, 85vw, 360px)", cursor: "pointer", margin: "0 auto" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.5s", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        {/* Front */}
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", borderRadius: "clamp(16px, 4vw, 24px)", background: "linear-gradient(135deg, #FFF7E6 0%, #FFE8CC 100%)", border: "3px solid #FFB347", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize: "clamp(64px, 20vw, 100px)", lineHeight: 1 }}>{card.emoji}</div>
          <div style={{ marginTop: 16, fontSize: "clamp(11px, 2.8vw, 13px)", color: "#999", fontWeight: 600 }}>タップしてめくる</div>
        </div>
        {/* Back */}
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: "clamp(16px, 4vw, 24px)", background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)", border: "3px solid #66BB6A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize: "clamp(40px, 12vw, 56px)", lineHeight: 1 }}>{card.emoji}</div>
          <div style={{ marginTop: "clamp(12px, 3vw, 20px)", fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 800, color: "#2E7D32", letterSpacing: 2 }}>{card.kr}</div>
          {showRuby && <div style={{ marginTop: 8, fontSize: "clamp(16px, 4vw, 20px)", color: "#558B2F", fontWeight: 600 }}>{card.ruby}</div>}
          <div style={{ marginTop: 10, fontSize: "clamp(18px, 4.5vw, 22px)", opacity: 0.5 }}>🔊</div>
        </div>
      </div>
    </div>
  );
}

// ── Quiz ──
function Quiz({ onBack, soundEnabled, showRuby }) {
  const questions = useMemo(() => shuffle(CARDS).map((card) => {
    const wrong = shuffle(CARDS.filter((c) => c.id !== card.id)).slice(0, 3);
    return { card, options: shuffle([card, ...wrong]) };
  }), []);

  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const cur = questions[qi];

  const handleSelect = (opt) => {
    if (selected !== null) return;
    setSelected(opt.id);
    if (opt.id === cur.card.id) {
      setScore((s) => s + 1);
      speakKorean(cur.card.kr, soundEnabled);
    }
    setTimeout(() => {
      if (qi + 1 >= questions.length) setDone(true);
      else { setQi((q) => q + 1); setSelected(null); }
    }, 900);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? "すごい！天才！🎉" : pct >= 50 ? "いいかんじ！💪" : "がんばったね！🌱";
    return (
      <div style={{ textAlign: "center", padding: "clamp(16px, 5vw, 32px)" }}>
        <div style={{ fontSize: "clamp(48px, 14vw, 64px)" }}>🏆</div>
        <h2 style={{ fontSize: "clamp(22px, 6vw, 28px)", color: "#333", margin: "16px 0 8px" }}>けっか</h2>
        <div style={{ fontSize: "clamp(36px, 10vw, 48px)", fontWeight: 800, color: "#FF6B35" }}>{score} / {questions.length}</div>
        <div style={{ fontSize: "clamp(18px, 5vw, 24px)", margin: "8px 0 24px", color: "#555" }}>{msg}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => { setQi(0); setScore(0); setSelected(null); setDone(false); }} style={css.btn("#FF6B35")}>もういちど</button>
          <button onClick={onBack} style={css.btn("#78909C")}>もどる</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 0", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={{ ...css.btn("#78909C"), padding: "6px 14px", fontSize: "clamp(12px, 3vw, 14px)" }}>← もどる</button>
        <span style={{ fontSize: "clamp(13px, 3.2vw, 15px)", fontWeight: 700, color: "#666" }}>{qi + 1} / {questions.length}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "#eee", marginBottom: 20 }}>
        <div style={{ height: "100%", borderRadius: 4, width: `${(qi / questions.length) * 100}%`, background: "linear-gradient(90deg, #FF6B35, #FF8F65)", transition: "width 0.3s" }} />
      </div>
      <div style={{ fontSize: "clamp(15px, 4vw, 18px)", fontWeight: 700, color: "#444", marginBottom: 8 }}>このことばは どれ？</div>
      <div style={{ fontSize: "clamp(32px, 9vw, 44px)", fontWeight: 800, color: "#2E7D32", margin: "4px 0" }}>{cur.card.kr}</div>
      {showRuby && <div style={{ fontSize: "clamp(15px, 4vw, 18px)", color: "#558B2F", marginBottom: 4, fontWeight: 600 }}>{cur.card.ruby}</div>}
      <button onClick={() => speakKorean(cur.card.kr, true)} disabled={!soundEnabled}
        style={{ fontSize: "clamp(20px, 5vw, 24px)", background: "none", border: "none", cursor: "pointer", marginBottom: 12, opacity: soundEnabled ? 1 : 0.3, minHeight: 44, minWidth: 44 }}>🔊</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px, 2.5vw, 14px)", maxWidth: "min(340px, 90vw)", margin: "0 auto" }}>
        {cur.options.map((opt) => {
          const isSel = selected === opt.id, isCor = opt.id === cur.card.id;
          let bg = "#FFF", bd = "#DDD";
          if (selected !== null) {
            if (isCor) { bg = "#C8E6C9"; bd = "#43A047"; }
            else if (isSel) { bg = "#FFCDD2"; bd = "#E53935"; }
          }
          return (
            <div key={opt.id} onClick={() => handleSelect(opt)} style={{
              background: bg, border: `3px solid ${bd}`, borderRadius: "clamp(12px, 3.5vw, 18px)",
              padding: "clamp(10px, 3vw, 16px)", cursor: selected === null ? "pointer" : "default",
              transition: "all 0.2s", transform: isSel ? "scale(0.95)" : "scale(1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minHeight: 44,
            }}>
              <div style={{ fontSize: "clamp(36px, 11vw, 52px)", lineHeight: 1 }}>{opt.emoji}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main App ──
const CATS = ["すべて", "動物", "食べ物", "自然"];
const ORDER_MODES = ["じゅんばん", "ランダム"];

export default function App() {
  const [mode, setMode] = useState("home");
  const [ci, setCi] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cat, setCat] = useState("すべて");
  const [orderMode, setOrderMode] = useState("じゅんばん");
  const [shuffledCards, setShuffledCards] = useState([]);
  const [transitioning, setTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [showRuby, setShowRuby] = useState(true);

  useEffect(() => {
    const check = () => setVoiceAvailable(hasKoreanVoice());
    check();
    if (typeof speechSynthesis !== "undefined") speechSynthesis.onvoiceschanged = check;
    const t = setTimeout(check, 500);
    return () => clearTimeout(t);
  }, []);

  const baseFiltered = cat === "すべて" ? CARDS : CARDS.filter((c) => c.cat === cat);
  const filtered = orderMode === "ランダム" ? shuffledCards : baseFiltered;

  const doShuffle = (cards) => { const s = shuffle(cards); setShuffledCards(s); return s; };

  const handleCatChange = (c) => {
    setCat(c); setCi(0); setFlipped(false);
    const base = c === "すべて" ? CARDS : CARDS.filter((x) => x.cat === c);
    if (orderMode === "ランダム") doShuffle(base);
  };

  const handleOrderChange = (o) => {
    setOrderMode(o); setCi(0); setFlipped(false);
    if (o === "ランダム") doShuffle(baseFiltered);
  };

  const handleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    if (next) {
      const card = filtered[ci % filtered.length];
      speakKorean(card.kr, soundEnabled && voiceAvailable);
    }
  };

  const goCard = (dir) => {
    if (transitioning) return;
    if (flipped) {
      setFlipped(false);
      setTransitioning(true);
      setTimeout(() => {
        setCi((p) => { const n = p + dir; if (n < 0) return filtered.length - 1; if (n >= filtered.length) return 0; return n; });
        setTransitioning(false);
      }, 500);
    } else {
      setCi((p) => { const n = p + dir; if (n < 0) return filtered.length - 1; if (n >= filtered.length) return 0; return n; });
    }
  };

  // ── Home ──
  if (mode === "home") {
    return (
      <div style={{ ...css.wrap, textAlign: "center", padding: "clamp(24px, 8vw, 40px) clamp(8px, 3vw, 20px)" }}>
        <div style={{ fontSize: "clamp(48px, 15vw, 72px)", marginBottom: 8 }}>🇰🇷</div>
        <h1 style={{ fontSize: "clamp(22px, 6vw, 28px)", color: "#333", margin: "0 0 4px" }}>かんこくご たんごカード</h1>
        <p style={{ fontSize: "clamp(13px, 3.2vw, 15px)", color: "#777", margin: "0 0 clamp(24px, 6vw, 36px)" }}>たのしく かんこくごを おぼえよう！</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 280, margin: "0 auto" }}>
          <button onClick={() => { setMode("cards"); setCi(0); setFlipped(false); }} style={{ ...css.btn("#FF6B35"), padding: "14px 24px", fontSize: "clamp(16px, 4vw, 18px)" }}>📚 カードでまなぶ</button>
          <button onClick={() => setMode("quiz")} style={{ ...css.btn("#43A047"), padding: "14px 24px", fontSize: "clamp(16px, 4vw, 18px)" }}>🎮 クイズであそぶ</button>
        </div>
        {/* Settings */}
        <div style={{ marginTop: "clamp(20px, 5vw, 32px)", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <ToggleBtn enabled={soundEnabled} onToggle={() => setSoundEnabled((s) => !s)} available={voiceAvailable} onLabel="🔊 おとオン" offLabel="🔇 おとオフ" />
          <ToggleBtn enabled={showRuby} onToggle={() => setShowRuby((s) => !s)} onLabel="カタカナあり" offLabel="カタカナなし" />
        </div>
        {!voiceAvailable && <p style={{ marginTop: 12, fontSize: 12, color: "#999" }}>※ この端末では韓国語の音声が利用できません</p>}
        <div style={{ marginTop: "clamp(20px, 5vw, 32px)", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {CARDS.slice(0, 8).map((c) => <span key={c.id} style={{ fontSize: "clamp(22px, 6vw, 28px)" }}>{c.emoji}</span>)}
        </div>
      </div>
    );
  }

  // ── Quiz ──
  if (mode === "quiz") {
    return (
      <div style={css.wrap}>
        <Quiz onBack={() => setMode("home")} soundEnabled={soundEnabled && voiceAvailable} showRuby={showRuby} />
      </div>
    );
  }

  // ── Cards ──
  const card = filtered.length > 0 ? filtered[ci % filtered.length] : CARDS[0];

  return (
    <div style={css.wrap}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setMode("home")} style={{ ...css.btn("#78909C"), padding: "6px 14px", fontSize: "clamp(12px, 3vw, 14px)" }}>← ホーム</button>
        <div style={{ display: "flex", gap: 6 }}>
          <ToggleBtn enabled={soundEnabled} onToggle={() => setSoundEnabled((s) => !s)} available={voiceAvailable} onLabel="🔊" offLabel="🔇" />
          <ToggleBtn enabled={showRuby} onToggle={() => setShowRuby((s) => !s)} onLabel="カ" offLabel="カ" />
        </div>
        <span style={{ fontSize: "clamp(13px, 3.2vw, 15px)", fontWeight: 700, color: "#666" }}>{(ci % filtered.length) + 1} / {filtered.length}</span>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(4px, 1.5vw, 8px)", marginBottom: 10, flexWrap: "wrap" }}>
        {CATS.map((c) => <button key={c} onClick={() => handleCatChange(c)} style={css.chip(cat === c, "#FF6B35")}>{c}</button>)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(4px, 1.5vw, 8px)", marginBottom: 20 }}>
        {ORDER_MODES.map((o) => <button key={o} onClick={() => handleOrderChange(o)} style={css.chip(orderMode === o, "#5C6BC0")}>{o === "ランダム" ? "🔀 " : "📋 "}{o}</button>)}
      </div>

      <Flashcard card={card} flipped={flipped} onFlip={handleFlip} showRuby={showRuby} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px, 5vw, 20px)", marginTop: "clamp(16px, 5vw, 24px)" }}>
        <button onClick={() => goCard(-1)} style={css.navBtn("#78909C")}>◀</button>
        <button onClick={() => goCard(1)} style={css.navBtn("#FF6B35")}>▶</button>
      </div>
    </div>
  );
}
