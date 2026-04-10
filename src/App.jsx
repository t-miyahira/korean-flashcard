import { useState, useEffect, useMemo } from "react";

const CARDS = [
  // ── かんたん ──
  // 動物 (14)
  { id:1, kr:"강아지", krRuby:"カンアジ", en:"Dog", enRuby:"ドッグ", emoji:"🐶", cat:"動物", lv:"かんたん" },
  { id:2, kr:"고양이", krRuby:"コヤンイ", en:"Cat", enRuby:"キャット", emoji:"🐱", cat:"動物", lv:"かんたん" },
  { id:3, kr:"토끼", krRuby:"トッキ", en:"Rabbit", enRuby:"ラビット", emoji:"🐰", cat:"動物", lv:"かんたん" },
  { id:4, kr:"새", krRuby:"セ", en:"Bird", enRuby:"バード", emoji:"🐦", cat:"動物", lv:"かんたん" },
  { id:5, kr:"물고기", krRuby:"ムルコギ", en:"Fish", enRuby:"フィッシュ", emoji:"🐟", cat:"動物", lv:"かんたん" },
  { id:16, kr:"돼지", krRuby:"トェジ", en:"Pig", enRuby:"ピッグ", emoji:"🐷", cat:"動物", lv:"かんたん" },
  { id:17, kr:"개구리", krRuby:"ケグリ", en:"Frog", enRuby:"フロッグ", emoji:"🐸", cat:"動物", lv:"かんたん" },
  { id:18, kr:"코끼리", krRuby:"コッキリ", en:"Elephant", enRuby:"エレファント", emoji:"🐘", cat:"動物", lv:"かんたん" },
  { id:19, kr:"원숭이", krRuby:"ウォンスンイ", en:"Monkey", enRuby:"マンキー", emoji:"🐵", cat:"動物", lv:"かんたん" },
  { id:20, kr:"곰", krRuby:"コム", en:"Bear", enRuby:"ベア", emoji:"🐻", cat:"動物", lv:"かんたん" },
  { id:21, kr:"사자", krRuby:"サジャ", en:"Lion", enRuby:"ライオン", emoji:"🦁", cat:"動物", lv:"かんたん" },
  { id:22, kr:"거북이", krRuby:"コブギ", en:"Turtle", enRuby:"タートル", emoji:"🐢", cat:"動物", lv:"かんたん" },

  // 食べ物 (14)
  { id:6, kr:"사과", krRuby:"サグァ", en:"Apple", enRuby:"アップル", emoji:"🍎", cat:"食べ物", lv:"かんたん" },
  { id:7, kr:"바나나", krRuby:"パナナ", en:"Banana", enRuby:"バナナ", emoji:"🍌", cat:"食べ物", lv:"かんたん" },
  { id:8, kr:"딸기", krRuby:"ッタルギ", en:"Strawberry", enRuby:"ストロベリー", emoji:"🍓", cat:"食べ物", lv:"かんたん" },
  { id:9, kr:"빵", krRuby:"ッパン", en:"Bread", enRuby:"ブレッド", emoji:"🍞", cat:"食べ物", lv:"かんたん" },
  { id:10, kr:"우유", krRuby:"ウユ", en:"Milk", enRuby:"ミルク", emoji:"🥛", cat:"食べ物", lv:"かんたん" },
  { id:23, kr:"밥", krRuby:"パプ", en:"Rice", enRuby:"ライス", emoji:"🍚", cat:"食べ物", lv:"かんたん" },
  { id:24, kr:"케이크", krRuby:"ケイク", en:"Cake", enRuby:"ケイク", emoji:"🍰", cat:"食べ物", lv:"かんたん" },
  { id:25, kr:"아이스크림", krRuby:"アイスクリム", en:"Ice cream", enRuby:"アイスクリーム", emoji:"🍦", cat:"食べ物", lv:"かんたん" },
  { id:26, kr:"귤", krRuby:"キュル", en:"Mandarin", enRuby:"マンダリン", emoji:"🍊", cat:"食べ物", lv:"かんたん" },
  { id:27, kr:"피자", krRuby:"ピジャ", en:"Pizza", enRuby:"ピザ", emoji:"🍕", cat:"食べ物", lv:"かんたん" },
  { id:28, kr:"도넛", krRuby:"トノッ", en:"Donut", enRuby:"ドーナツ", emoji:"🍩", cat:"食べ物", lv:"ちゅうきゅう" },
  { id:29, kr:"달걀", krRuby:"タルギャル", en:"Egg", enRuby:"エッグ", emoji:"🥚", cat:"食べ物", lv:"かんたん" },
  { id:52, kr:"복숭아", krRuby:"ポクスンア", en:"Peach", enRuby:"ピーチ", emoji:"🍑", cat:"食べ物", lv:"かんたん" },
  // 自然 (7)
  { id:11, kr:"별", krRuby:"ピョル", en:"Star", enRuby:"スター", emoji:"⭐", cat:"自然", lv:"かんたん" },
  { id:12, kr:"해", krRuby:"ヘ", en:"Sun", enRuby:"サン", emoji:"☀️", cat:"自然", lv:"かんたん" },
  { id:13, kr:"달", krRuby:"タル", en:"Moon", enRuby:"ムーン", emoji:"🌙", cat:"自然", lv:"かんたん" },
  { id:14, kr:"꽃", krRuby:"ッコッ", en:"Flower", enRuby:"フラワー", emoji:"🌸", cat:"自然", lv:"かんたん" },
  { id:15, kr:"나무", krRuby:"ナム", en:"Tree", enRuby:"トゥリー", emoji:"🌳", cat:"自然", lv:"かんたん" },
  { id:50, kr:"무지개", krRuby:"ムジゲ", en:"Rainbow", enRuby:"レインボー", emoji:"🌈", cat:"自然", lv:"かんたん" },

  // ── ちゅうきゅう ──
  // 動物 (7)
  { id:54, kr:"병아리", krRuby:"ピョンアリ", en:"Chick", enRuby:"チック", emoji:"🐤", cat:"動物", lv:"ちゅうきゅう" },
  { id:30, kr:"여우", krRuby:"ヨウ", en:"Fox", enRuby:"フォックス", emoji:"🦊", cat:"動物", lv:"ちゅうきゅう" },
  { id:31, kr:"펭귄", krRuby:"ペングィン", en:"Penguin", enRuby:"ペンギン", emoji:"🐧", cat:"動物", lv:"ちゅうきゅう" },
  { id:32, kr:"나비", krRuby:"ナビ", en:"Butterfly", enRuby:"バタフライ", emoji:"🦋", cat:"動物", lv:"ちゅうきゅう" },
  { id:33, kr:"벌", krRuby:"ポル", en:"Bee", enRuby:"ビー", emoji:"🐝", cat:"動物", lv:"ちゅうきゅう" },
  { id:34, kr:"돌고래", krRuby:"トルゴレ", en:"Dolphin", enRuby:"ドルフィン", emoji:"🐬", cat:"動物", lv:"ちゅうきゅう" },
  { id:35, kr:"게", krRuby:"ケ", en:"Crab", enRuby:"クラブ", emoji:"🦀", cat:"動物", lv:"ちゅうきゅう" },
  // 食べ物 (6)
  { id:36, kr:"라면", krRuby:"ラミョン", en:"Ramen", enRuby:"ラーメン", emoji:"🍜", cat:"食べ物", lv:"ちゅうきゅう" },
  { id:37, kr:"당근", krRuby:"タングン", en:"Carrot", enRuby:"キャロット", emoji:"🥕", cat:"食べ物", lv:"ちゅうきゅう" },
  { id:38, kr:"수박", krRuby:"スバク", en:"Watermelon", enRuby:"ウォーターメロン", emoji:"🍉", cat:"食べ物", lv:"ちゅうきゅう" },
  { id:39, kr:"치즈", krRuby:"チジュ", en:"Cheese", enRuby:"チーズ", emoji:"🧀", cat:"食べ物", lv:"ちゅうきゅう" },
  { id:40, kr:"포도", krRuby:"ポド", en:"Grape", enRuby:"グレイプ", emoji:"🍇", cat:"食べ物", lv:"ちゅうきゅう" },
  { id:41, kr:"옥수수", krRuby:"オクスス", en:"Corn", enRuby:"コーン", emoji:"🌽", cat:"食べ物", lv:"ちゅうきゅう" },
  // のりもの (6)
  { id:42, kr:"자동차", krRuby:"チャドンチャ", en:"Car", enRuby:"カー", emoji:"🚗", cat:"のりもの", lv:"ちゅうきゅう" },
  { id:43, kr:"비행기", krRuby:"ピヘンギ", en:"Airplane", enRuby:"エアプレイン", emoji:"✈️", cat:"のりもの", lv:"ちゅうきゅう" },
  { id:44, kr:"배", krRuby:"ペ", en:"Ship", enRuby:"シップ", emoji:"🚢", cat:"のりもの", lv:"ちゅうきゅう" },
  { id:45, kr:"기차", krRuby:"キチャ", en:"Train", enRuby:"トレイン", emoji:"🚂", cat:"のりもの", lv:"ちゅうきゅう" },
  { id:56, kr:"자전거", krRuby:"チャジョンゴ", en:"Bicycle", enRuby:"バイシクル", emoji:"🚲", cat:"のりもの", lv:"ちゅうきゅう" },
  { id:57, kr:"로켓", krRuby:"ロケッ", en:"Rocket", enRuby:"ロケット", emoji:"🚀", cat:"のりもの", lv:"ちゅうきゅう" },
  // みのまわり (7)
  { id:46, kr:"책", krRuby:"チェク", en:"Book", enRuby:"ブック", emoji:"📚", cat:"みのまわり", lv:"ちゅうきゅう" },
  { id:47, kr:"연필", krRuby:"ヨンピル", en:"Pencil", enRuby:"ペンシル", emoji:"✏️", cat:"みのまわり", lv:"ちゅうきゅう" },
  { id:48, kr:"시계", krRuby:"シゲ", en:"Clock", enRuby:"クロック", emoji:"⏰", cat:"みのまわり", lv:"ちゅうきゅう" },
  { id:49, kr:"가방", krRuby:"カバン", en:"Bag", enRuby:"バッグ", emoji:"🎒", cat:"みのまわり", lv:"ちゅうきゅう" },
  { id:58, kr:"피아노", krRuby:"ピアノ", en:"Piano", enRuby:"ピアノ", emoji:"🎹", cat:"みのまわり", lv:"ちゅうきゅう" },
  { id:59, kr:"크레파스", krRuby:"クレパス", en:"Crayon", enRuby:"クレヨン", emoji:"🖍️", cat:"みのまわり", lv:"ちゅうきゅう" },
  { id:60, kr:"칫솔", krRuby:"チッソル", en:"Toothbrush", enRuby:"トゥースブラシ", emoji:"🪥", cat:"みのまわり", lv:"ちゅうきゅう" },
  // 食べ物(かんたんから移動)
  { id:53, kr:"초콜릿", krRuby:"チョコルリッ", en:"Chocolate", enRuby:"チョコレート", emoji:"🍫", cat:"食べ物", lv:"ちゅうきゅう" },
  // 自然 (1)
  { id:51, kr:"구름", krRuby:"クルム", en:"Cloud", enRuby:"クラウド", emoji:"☁️", cat:"自然", lv:"ちゅうきゅう" },
];

const LANGS = [
  { id: "kr", label: "🇰🇷 かんこくご" },
  { id: "en", label: "🇺🇸 えいご" },
];
const LEVELS = ["かんたん", "ちゅうきゅう"];
const CATS_BY_LEVEL = {
  "かんたん": ["すべて", "動物", "食べ物", "自然"],
  "ちゅうきゅう": ["すべて", "動物", "食べ物", "のりもの", "みのまわり", "自然"],
};
const ORDER_MODES = ["じゅんばん", "ランダム"];

const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// ── helpers ──
const getWord = (card, lang) => lang === "kr" ? card.kr : card.en;
const getRuby = (card, lang) => lang === "kr" ? card.krRuby : card.enRuby;

// ── TTS ──
const hasVoice = (lang) => {
  if (typeof speechSynthesis === "undefined") return false;
  const prefix = lang === "kr" ? "ko" : "en";
  return speechSynthesis.getVoices().some((v) => v.lang.startsWith(prefix));
};

const pickFemaleVoice = (lang) => {
  if (typeof speechSynthesis === "undefined") return null;
  const prefix = lang === "kr" ? "ko" : "en";
  const all = speechSynthesis.getVoices().filter((v) => v.lang.startsWith(prefix));
  if (all.length === 0) return null;
  const hints = lang === "kr"
    ? ["female", "여성", "yuna", "sunhi", "heami", "sora", "jian", "google 한국의"]
    : ["female", "samantha", "karen", "moira", "fiona", "victoria", "zira", "google us english", "google uk english female"];
  const female = all.find((v) => hints.some((h) => v.name.toLowerCase().includes(h)));
  return female || all[0];
};

const speakWord = (text, lang, enabled) => {
  if (!enabled || typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "kr" ? "ko-KR" : "en-US";
  u.rate = 0.85;
  u.pitch = 1.1;
  const voice = pickFemaleVoice(lang);
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
};

// ── Shared styles ──
const css = {
  wrap: { width: "100%", maxWidth: 480, margin: "0 auto", padding: "16px clamp(8px, 3vw, 20px)", fontFamily: "system-ui, -apple-system, sans-serif", boxSizing: "border-box" },
  btn: (bg) => ({ padding: "10px clamp(16px, 4vw, 24px)", fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700, color: "#FFF", background: bg, border: "none", borderRadius: 30, cursor: "pointer", boxShadow: "0 3px 10px rgba(0,0,0,0.12)", minHeight: 44 }),
  chip: (active, color) => {
    const bgMap = { "#FF6B35": "#FFF3E0", "#5C6BC0": "#E8EAF6", "#AB47BC": "#F3E5F5", "#00897B": "#E0F2F1", "#1976D2": "#E3F2FD" };
    return { padding: "6px clamp(10px, 2.5vw, 14px)", fontSize: "clamp(11px, 2.8vw, 13px)", fontWeight: 700, borderRadius: 20, border: "2px solid", borderColor: active ? color : "#DDD", background: active ? (bgMap[color] || "#FFF") : "#FFF", color: active ? color : "#888", cursor: "pointer", minHeight: 36 };
  },
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
function Flashcard({ card, flipped, onFlip, showRuby, lang }) {
  return (
    <div onClick={onFlip} style={{ perspective: 800, width: "clamp(220px, 65vw, 280px)", height: "clamp(290px, 85vw, 360px)", cursor: "pointer", margin: "0 auto" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.5s", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", borderRadius: "clamp(16px, 4vw, 24px)", background: "linear-gradient(135deg, #FFF7E6 0%, #FFE8CC 100%)", border: "3px solid #FFB347", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize: "clamp(64px, 20vw, 100px)", lineHeight: 1 }}>{card.emoji}</div>
          <div style={{ marginTop: 16, fontSize: "clamp(11px, 2.8vw, 13px)", color: "#999", fontWeight: 600 }}>タップしてめくる</div>
        </div>
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: "clamp(16px, 4vw, 24px)", background: lang === "kr" ? "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)" : "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)", border: `3px solid ${lang === "kr" ? "#66BB6A" : "#42A5F5"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize: "clamp(40px, 12vw, 56px)", lineHeight: 1 }}>{card.emoji}</div>
          <div style={{ marginTop: "clamp(12px, 3vw, 20px)", fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 800, color: lang === "kr" ? "#2E7D32" : "#1565C0", letterSpacing: 2 }}>{getWord(card, lang)}</div>
          {showRuby && <div style={{ marginTop: 8, fontSize: "clamp(16px, 4vw, 20px)", color: lang === "kr" ? "#558B2F" : "#1976D2", fontWeight: 600 }}>{getRuby(card, lang)}</div>}
          <div style={{ marginTop: 10, fontSize: "clamp(18px, 4.5vw, 22px)", opacity: 0.5 }}>🔊</div>
        </div>
      </div>
    </div>
  );
}

// ── Quiz ──
function Quiz({ onBack, soundEnabled, showRuby, level, lang }) {
  const pool = CARDS.filter((c) => c.lv === level);
  const questions = useMemo(() => shuffle(pool).map((card) => {
    const wrong = shuffle(pool.filter((c) => c.id !== card.id)).slice(0, 3);
    return { card, options: shuffle([card, ...wrong]) };
  }), [level]);

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
      speakWord(getWord(cur.card, lang), lang, soundEnabled);
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
        <div style={{ fontSize: "clamp(13px, 3.2vw, 15px)", color: "#888", fontWeight: 600, marginTop: 8 }}>
          {lang === "kr" ? "🇰🇷 かんこくご" : "🇺🇸 えいご"}　{level === "かんたん" ? "⭐ かんたん" : "⭐⭐ ちゅうきゅう"}
        </div>
        <h2 style={{ fontSize: "clamp(22px, 6vw, 28px)", color: "#333", margin: "12px 0 8px" }}>けっか</h2>
        <div style={{ fontSize: "clamp(36px, 10vw, 48px)", fontWeight: 800, color: "#FF6B35" }}>{score} / {questions.length}</div>
        <div style={{ fontSize: "clamp(18px, 5vw, 24px)", margin: "8px 0 24px", color: "#555" }}>{msg}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => { setQi(0); setScore(0); setSelected(null); setDone(false); }} style={css.btn("#FF6B35")}>もういちど</button>
          <button onClick={onBack} style={css.btn("#78909C")}>もどる</button>
        </div>
      </div>
    );
  }

  const wordColor = lang === "kr" ? "#2E7D32" : "#1565C0";
  const rubyColor = lang === "kr" ? "#558B2F" : "#1976D2";

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
      <div style={{ fontSize: "clamp(32px, 9vw, 44px)", fontWeight: 800, color: wordColor, margin: "4px 0" }}>{getWord(cur.card, lang)}</div>
      {showRuby && <div style={{ fontSize: "clamp(15px, 4vw, 18px)", color: rubyColor, marginBottom: 4, fontWeight: 600 }}>{getRuby(cur.card, lang)}</div>}
      <button onClick={() => speakWord(getWord(cur.card, lang), lang, true)} disabled={!soundEnabled}
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
export default function App() {
  const [mode, setMode] = useState("home");
  const [lang, setLang] = useState("kr");
  const [level, setLevel] = useState("かんたん");
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
    const check = () => setVoiceAvailable(hasVoice(lang));
    check();
    if (typeof speechSynthesis !== "undefined") speechSynthesis.onvoiceschanged = check;
    const t = setTimeout(check, 500);
    return () => clearTimeout(t);
  }, [lang]);

  const cats = CATS_BY_LEVEL[level];
  const lvCards = CARDS.filter((c) => c.lv === level);
  const baseFiltered = cat === "すべて" ? lvCards : lvCards.filter((c) => c.cat === cat);
  const filtered = orderMode === "ランダム" ? shuffledCards : baseFiltered;

  const doShuffle = (cards) => { const s = shuffle(cards); setShuffledCards(s); return s; };

  // 裏返し中なら先にフリップを戻してからコールバック実行
  const safeFlipThen = (fn) => {
    if (transitioning) return;
    if (flipped) {
      setFlipped(false);
      setTransitioning(true);
      setTimeout(() => { fn(); setTransitioning(false); }, 500);
    } else {
      fn();
    }
  };

  const handleLevelChange = (lv) => safeFlipThen(() => {
    setLevel(lv); setCat("すべて"); setCi(0);
    if (orderMode === "ランダム") doShuffle(CARDS.filter((c) => c.lv === lv));
  });

  const handleCatChange = (c) => safeFlipThen(() => {
    setCat(c); setCi(0);
    const base = c === "すべて" ? lvCards : lvCards.filter((x) => x.cat === c);
    if (orderMode === "ランダム") doShuffle(base);
  });

  const handleOrderChange = (o) => safeFlipThen(() => {
    setOrderMode(o); setCi(0);
    if (o === "ランダム") doShuffle(baseFiltered);
  });

  const handleLangChange = (l) => safeFlipThen(() => {
    setLang(l);
  });

  const handleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    if (next) {
      const card = filtered[ci % filtered.length];
      speakWord(getWord(card, lang), lang, soundEnabled && voiceAvailable);
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

  const previewEmojis = lvCards.slice(0, 8);

  // ── Home ──
  if (mode === "home") {
    return (
      <div style={{ ...css.wrap, textAlign: "center", padding: "clamp(24px, 8vw, 40px) clamp(8px, 3vw, 20px)" }}>
        <div style={{ fontSize: "clamp(48px, 15vw, 72px)", marginBottom: 8 }}>{lang === "kr" ? "🇰🇷" : "🇺🇸"}</div>
        <h1 style={{ fontSize: "clamp(22px, 6vw, 28px)", color: "#333", margin: "0 0 4px" }}>たんごカード</h1>
        <p style={{ fontSize: "clamp(13px, 3.2vw, 15px)", color: "#777", margin: "0 0 clamp(12px, 3vw, 16px)" }}>たのしく ことばを おぼえよう！</p>

        {/* Language select */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: "clamp(12px, 3vw, 16px)", flexWrap: "wrap" }}>
          {LANGS.map((l) => (
            <button key={l.id} onClick={() => setLang(l.id)} style={{
              padding: "8px clamp(16px, 4vw, 24px)", fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700, borderRadius: 24,
              border: "3px solid", borderColor: lang === l.id ? "#1976D2" : "#DDD",
              background: lang === l.id ? "#E3F2FD" : "#FFF", color: lang === l.id ? "#1976D2" : "#999", cursor: "pointer", minHeight: 44,
            }}>{l.label}</button>
          ))}
        </div>

        {/* Level select */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: "clamp(16px, 4vw, 24px)", flexWrap: "wrap" }}>
          {LEVELS.map((lv) => (
            <button key={lv} onClick={() => handleLevelChange(lv)} style={{
              padding: "8px clamp(16px, 4vw, 24px)", fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700, borderRadius: 24,
              border: "3px solid", borderColor: level === lv ? "#00897B" : "#DDD",
              background: level === lv ? "#E0F2F1" : "#FFF", color: level === lv ? "#00897B" : "#999", cursor: "pointer", minHeight: 44,
            }}>{lv === "かんたん" ? "⭐ " : "⭐⭐ "}{lv}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 280, margin: "0 auto" }}>
          <button onClick={() => { setMode("cards"); setCi(0); setFlipped(false); }} style={{ ...css.btn("#FF6B35"), padding: "14px 24px", fontSize: "clamp(16px, 4vw, 18px)" }}>📚 カードでまなぶ</button>
          <button onClick={() => setMode("quiz")} style={{ ...css.btn("#43A047"), padding: "14px 24px", fontSize: "clamp(16px, 4vw, 18px)" }}>🎮 クイズであそぶ</button>
        </div>

        {/* Settings */}
        <div style={{ marginTop: "clamp(20px, 5vw, 32px)", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <ToggleBtn enabled={soundEnabled} onToggle={() => setSoundEnabled((s) => !s)} available={voiceAvailable} onLabel="🔊 おとオン" offLabel="🔇 おとオフ" />
          <ToggleBtn enabled={showRuby} onToggle={() => setShowRuby((s) => !s)} onLabel="カタカナあり" offLabel="カタカナなし" />
        </div>
        {!voiceAvailable && <p style={{ marginTop: 12, fontSize: 12, color: "#999" }}>※ この端末では音声が利用できません</p>}
        <div style={{ marginTop: "clamp(20px, 5vw, 32px)", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {previewEmojis.map((c) => <span key={c.id} style={{ fontSize: "clamp(22px, 6vw, 28px)" }}>{c.emoji}</span>)}
        </div>
        <div style={{ marginTop: 8, fontSize: "clamp(12px, 3vw, 14px)", color: "#AAA" }}>{lvCards.length}たんご</div>
      </div>
    );
  }

  // ── Quiz ──
  if (mode === "quiz") {
    return (
      <div style={css.wrap}>
        <Quiz onBack={() => setMode("home")} soundEnabled={soundEnabled && voiceAvailable} showRuby={showRuby} level={level} lang={lang} />
      </div>
    );
  }

  // ── Cards ──
  const card = filtered.length > 0 ? filtered[ci % filtered.length] : lvCards[0];

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

      {/* Language / Level / Random - 1 line */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(4px, 1.5vw, 8px)", marginBottom: 10, flexWrap: "wrap" }}>
        {LANGS.map((l) => <button key={l.id} onClick={() => handleLangChange(l.id)} style={css.chip(lang === l.id, "#1976D2")}>{l.label}</button>)}
        {LEVELS.map((lv) => <button key={lv} onClick={() => handleLevelChange(lv)} style={css.chip(level === lv, "#00897B")}>{lv === "かんたん" ? "⭐" : "⭐⭐"}</button>)}
        <button onClick={() => handleOrderChange(orderMode === "ランダム" ? "じゅんばん" : "ランダム")} style={css.chip(orderMode === "ランダム", "#5C6BC0")}>🔀</button>
      </div>

      {/* Category */}
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(4px, 1.5vw, 8px)", marginBottom: 10, flexWrap: "wrap" }}>
        {cats.map((c) => <button key={c} onClick={() => handleCatChange(c)} style={css.chip(cat === c, "#FF6B35")}>{c}</button>)}
      </div>

      <Flashcard card={card} flipped={flipped} onFlip={handleFlip} showRuby={showRuby} lang={lang} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px, 5vw, 20px)", marginTop: "clamp(16px, 5vw, 24px)" }}>
        <button onClick={() => goCard(-1)} style={css.navBtn("#78909C")}>◀</button>
        <button onClick={() => goCard(1)} style={css.navBtn("#FF6B35")}>▶</button>
      </div>
    </div>
  );
}
