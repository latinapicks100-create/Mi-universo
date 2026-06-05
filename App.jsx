import { useState, useEffect, useRef } from "react";

const AFFIRMATIONS = [
  "Todo en mi vida llega a mí con facilidad, gozo y gloria ✨",
  "Soy una mujer poderosa, libre y abundante 💛",
  "El dinero fluye hacia mí de formas que ni imagino 💰",
  "Elijo mi paz. Nadie puede robarme la alegría 🌸",
  "Estoy alineada con todo lo que deseo 🌙",
  "Merezco amor, lujo, libertad y felicidad 💎",
  "Mi trading genera abundancia con facilidad 📈",
  "Soy agradecida y el universo me responde siempre 🙏",
  "Irradio positividad y atraigo situaciones hermosas 🌺",
  "Vivo con ilusión, siempre hay algo que me emociona 🌟",
];

const REFRAME = [
  { neg: "irritada", pos: "Elijo ver lo bueno. Mi paz es mía y nadie puede quitármela." },
  { neg: "novio", pos: "Elijo ver lo bueno en él. Llevamos 7 años y hay mucho amor. Esa magia puede renacer." },
  { neg: "trading", pos: "Llevo casi un año aprendiendo. Estoy a punto de cruzar la línea. Ya lo logré antes." },
  { neg: "dinero", pos: "El dinero fluye hacia mí. Mi abundancia está en camino con facilidad, gozo y gloria." },
  { neg: "mal humor", pos: "Respiro. Elijo mi humor. Este momento es temporal y yo soy más fuerte que él." },
  { neg: "no avanzo", pos: "Cada pequeño paso es progreso real. Creé un negocio de cero. Puedo crear lo que quiera." },
  { neg: "sola", pos: "Estoy conectada con el universo. Atraigo personas que me elevan y me hacen feliz." },
  { neg: "cansada", pos: "Mi cuerpo pide descanso y eso está bien. Me cuido porque me lo merezco." },
];

const TRAINING = [
  "💪 30 minutos de entrenamiento hoy — ¡tu cuerpo te lo agradece!",
  "🥤 ¿Ya tomaste tu batido? El cuerpo fuerte atrae vida fuerte.",
  "🧘 5 minutos de respiración antes de entrenar. Conecta mente y cuerpo.",
  "🏃 Una caminata también cuenta. Mueve tu energía y mueves tu vida.",
  "💃 Pon tu canción favorita y entrena bailando. La alegría también es ejercicio.",
  "🌅 Entrena por la mañana y domina el día desde el principio.",
  "🔥 Cada repetición te acerca más a la versión de ti que sueñas ser.",
];

const UNIVERSE_QUESTIONS = [
  "¿Qué más es posible para mí hoy?",
  "¿Cómo puede esto ser mejor de lo que imagino?",
  "¿Qué se requiere para que mi vida de sueños llegue hoy?",
  "Si no tuviera miedo, ¿qué elegiría ahora mismo?",
  "¿Qué tomaría para que esto fluya con facilidad?",
  "¿Y si ya tengo todo lo que necesito para lograrlo?",
  "¿Qué elegiría si supiera que el universo me respalda?",
];

const BOOK_WISDOM = [
  { libro: "El Secreto", autor: "Rhonda Byrne", frase: "Lo que piensas y sientes es lo que atraes. Siente ya que lo tienes." },
  { libro: "Access Consciousness", autor: "Gary Douglas", frase: "La consciencia puede cambiar cualquier cosa. Tú eres un ser infinito con capacidad ilimitada." },
  { libro: "El Universo Te Respalda", autor: "Gabrielle Bernstein", frase: "Cuando te alineas con el amor y la gratitud, el universo conspira a tu favor." },
  { libro: "Pide y Se Te Dará", autor: "Esther Hicks", frase: "Tu único trabajo es alinearte con lo que deseas. El universo hace el resto." },
  { libro: "Usted Puede Sanar Su Vida", autor: "Louise Hay", frase: "Tus pensamientos crean tu realidad. Cambia el pensamiento, cambia tu vida." },
  { libro: "La Riqueza Correcta para Ti", autor: "Alan Cohen", frase: "La abundancia no es algo que perseguimos. Es algo que permitimos." },
];

const CHECKLIST_ITEMS = [
  "Entrené hoy 💪",
  "Tomé mi batido 🥤",
  "Tomé agua suficiente 💧",
  "Me moví al menos 30 min 🚶‍♀️",
  "Me cuidé y me mimé 🌸",
  "Hice mi journaling 📓",
  "Leí mi carta de manifestación 💌",
];

function StarField() {
  const stars = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.current.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: s.left, top: s.top,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "white", opacity: s.opacity,
          animation: `twinkle 3s ${s.delay} ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)",
      background: "rgba(240,201,106,0.97)", color: "#1a0a2e",
      padding: "12px 24px", borderRadius: 50,
      fontSize: 13, fontWeight: 600, zIndex: 999, whiteSpace: "nowrap",
      animation: "toastIn 0.3s ease", boxShadow: "0 4px 20px rgba(240,201,106,0.4)",
    }}>{msg}</div>
  );
}

function CheckItem({ label }) {
  const [checked, setChecked] = useState(false);
  return (
    <div onClick={() => setChecked(c => !c)} style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "11px 0", borderBottom: "1px solid rgba(240,201,106,0.1)",
      cursor: "pointer", fontSize: 14,
      color: checked ? "#f0c96a" : "rgba(250,246,255,0.75)",
      textDecoration: checked ? "line-through" : "none",
      transition: "all 0.2s",
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 7, flexShrink: 0,
        border: `1.5px solid ${checked ? "#f0c96a" : "rgba(240,201,106,0.3)"}`,
        background: checked ? "#f0c96a" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: "#1a0a2e", fontWeight: 700,
        transition: "all 0.2s",
      }}>{checked ? "✓" : ""}</div>
      {label}
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState("inicio");
  const [affIdx, setAffIdx] = useState(0);
  const [gratitudes, setGratitudes] = useState(["", "", ""]);
  const [savedGratitudes, setSavedGratitudes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gratitudes") || "[]"); } catch { return []; }
  });
  const [negThought, setNegThought] = useState("");
  const [reframed, setReframed] = useState(null);
  const [wish, setWish] = useState("");
  const [sentWish, setSentWish] = useState(false);
  const [bookIdx, setBookIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [trainIdx, setTrainIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const [particles, setParticles] = useState([]);
  const pid = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setAffIdx(i => (i + 1) % AFFIRMATIONS.length), 5000);
    return () => clearInterval(t);
  }, []);

  function showToast(msg) { setToast(msg); }

  function saveGratitudes() {
    const filled = gratitudes.filter(g => g.trim());
    if (!filled.length) return;
    const entry = { date: new Date().toLocaleDateString("es-ES"), items: filled };
    const next = [entry, ...savedGratitudes.slice(0, 9)];
    setSavedGratitudes(next);
    try { localStorage.setItem("gratitudes", JSON.stringify(next)); } catch {}
    setGratitudes(["", "", ""]);
    showToast("💛 Gratitud guardada. El universo escucha.");
  }

  function handleReframe() {
    if (!negThought.trim()) return;
    const lower = negThought.toLowerCase();
    const match = REFRAME.find(r => lower.includes(r.neg));
    setReframed(match
      ? match.pos
      : "Este pensamiento ya no me sirve. Lo suelto con amor y elijo pensamientos que me elevan. ¡Soy capaz de todo! 🌸"
    );
  }

  function handleSendWish() {
    if (!wish.trim()) return;
    setSentWish(true);
    const newP = Array.from({ length: 20 }, (_, i) => ({
      id: pid.current++,
      angle: (360 / 20) * i,
      color: ["#f0c96a", "#f7a8c4", "#a8d8f7", "#c8f7a8", "#c4b5f7"][i % 5],
    }));
    setParticles(newP);
    setTimeout(() => setParticles([]), 1500);
    showToast("✨ Tu deseo viaja al universo ahora mismo");
    setTimeout(() => { setSentWish(false); setWish(""); }, 3500);
  }

  const nav = [
    { id: "inicio", icon: "🌟", label: "Inicio" },
    { id: "pedir", icon: "🙏", label: "Pedir" },
    { id: "gratitud", icon: "💛", label: "Gratitud" },
    { id: "pensamientos", icon: "💭", label: "Mente" },
    { id: "afirmaciones", icon: "✨", label: "Afirmar" },
    { id: "entrena", icon: "💪", label: "Entrena" },
  ];

  const S = styles;

  return (
    <>
      <style>{CSS}</style>
      <div style={S.app}>
        <StarField />
        <div style={S.content}>

          {section === "inicio" && <>
            <div style={S.header}>
              <h1 style={S.h1}>Mi Universo</h1>
              <p style={S.subtitle}>Alineada · Agradecida · Abundante</p>
            </div>

            <div style={S.affCard}>
              <p style={S.affText} key={affIdx}>{AFFIRMATIONS[affIdx]}</p>
              <p style={S.affHint}>Toca para la siguiente ✨</p>
            </div>

            <div style={S.bookCard}>
              <p style={S.bookLabel}>📖 {BOOK_WISDOM[bookIdx].libro} — {BOOK_WISDOM[bookIdx].autor}</p>
              <p style={S.bookQuote}>"{BOOK_WISDOM[bookIdx].frase}"</p>
              <div style={S.btnRow}>
                <button style={{...S.btn, ...S.btnOutline}} onClick={() => setBookIdx(i => (i - 1 + BOOK_WISDOM.length) % BOOK_WISDOM.length)}>← Anterior</button>
                <button style={{...S.btn, ...S.btnOutline}} onClick={() => setBookIdx(i => (i + 1) % BOOK_WISDOM.length)}>Siguiente →</button>
              </div>
            </div>

            <div style={S.questionBox}>
              <p style={S.questionLabel}>Pregunta de Access Consciousness</p>
              <p style={S.questionText} key={questionIdx}>"{UNIVERSE_QUESTIONS[questionIdx]}"</p>
              <button style={{...S.btn, ...S.btnOutline, marginTop: 14}} onClick={() => setQuestionIdx(i => (i + 1) % UNIVERSE_QUESTIONS.length)}>
                Nueva pregunta ✨
              </button>
            </div>

            <p style={S.mantra}>Todo en mi vida llega a mí con facilidad, gozo y gloria</p>
          </>}

          {section === "pedir" && <>
            <div style={S.sectionHeader}>
              <h2 style={S.h2}>Pedir al Universo</h2>
              <p style={S.subtitle}>Pide · Cree · Recibe</p>
            </div>

            <div style={S.card}>
              <p style={S.cardTitle}>🌙 El Ritual</p>
              {["1. Respira 3 veces profundo", "2. Escribe tu deseo en presente", "3. Siéntelo como si ya es tuyo", "4. Envíalo y suéltalo con gratitud"].map((s, i) => (
                <p key={i} style={{...S.cardBody, marginBottom: 6}}>{s}</p>
              ))}
            </div>

            <div style={S.card}>
              <p style={S.cardTitle}>✍️ Mi deseo de hoy</p>
              <textarea
                rows={4}
                placeholder="Escribe en presente: 'Gracias universo porque ya tengo...' ✨"
                value={wish}
                onChange={e => setWish(e.target.value)}
                style={S.input}
              />
              <div style={{marginTop: 16, textAlign: "center", position: "relative"}}>
                <div style={S.portalCircle}>🌟</div>
                {particles.map(p => {
                  const rad = (p.angle * Math.PI) / 180;
                  const dist = 80;
                  return <div key={p.id} style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 8, height: 8, borderRadius: "50%",
                    background: p.color, pointerEvents: "none",
                    animation: "burst 1.2s ease-out forwards",
                    "--tx": `${Math.cos(rad) * dist}px`,
                    "--ty": `${Math.sin(rad) * dist}px`,
                  }} />;
                })}
                <button style={{...S.btn, ...S.btnGold}} onClick={handleSendWish} disabled={sentWish}>
                  {sentWish ? "✨ Enviado al universo..." : "🙏 Enviar mi deseo"}
                </button>
              </div>
            </div>

            <div style={S.bookCard}>
              <p style={S.bookLabel}>Pide y Se Te Dará — Esther Hicks</p>
              <p style={S.bookQuote}>"Tu único trabajo es alinearte con lo que deseas. El universo hace el resto."</p>
            </div>
          </>}

          {section === "gratitud" && <>
            <div style={S.sectionHeader}>
              <h2 style={S.h2}>Gratitud Diaria</h2>
              <p style={S.subtitle}>Lo que agradeces, crece</p>
            </div>

            <div style={S.card}>
              <p style={S.cardTitle}>💛 Hoy agradezco...</p>
              <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 14}}>
                {gratitudes.map((g, i) => (
                  <input key={i} style={S.input}
                    placeholder={`${i + 1}. Algo por lo que estoy agradecida...`}
                    value={g}
                    onChange={e => { const c = [...gratitudes]; c[i] = e.target.value; setGratitudes(c); }}
                  />
                ))}
              </div>
              <button style={{...S.btn, ...S.btnGold}} onClick={saveGratitudes}>💛 Guardar gratitud</button>
            </div>

            {savedGratitudes.length > 0 && (
              <div style={S.card}>
                <p style={S.cardTitle}>📖 Mi historial</p>
                {savedGratitudes.map((entry, i) => (
                  <div key={i} style={{borderBottom: "1px solid rgba(240,201,106,0.1)", padding: "10px 0"}}>
                    <p style={{fontSize: 10, color: "#9990bb", marginBottom: 4, letterSpacing: "0.05em"}}>{entry.date}</p>
                    {entry.items.map((item, j) => (
                      <p key={j} style={{fontSize: 13, color: "rgba(250,246,255,0.75)", display: "flex", gap: 8, marginBottom: 2}}>
                        <span style={{color: "#f0c96a"}}>✦</span>{item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div style={S.bookCard}>
              <p style={S.bookLabel}>El Secreto — Rhonda Byrne</p>
              <p style={S.bookQuote}>"La gratitud es el puente entre donde estás y donde quieres estar."</p>
            </div>
          </>}

          {section === "pensamientos" && <>
            <div style={S.sectionHeader}>
              <h2 style={S.h2}>Transforma tu mente</h2>
              <p style={S.subtitle}>Cambia el pensamiento, cambia la vida</p>
            </div>

            <div style={S.card}>
              <p style={S.cardTitle}>💭 ¿Qué pensamiento negativo tienes?</p>
              <textarea rows={3} style={S.input}
                placeholder="Escribe lo que estás pensando o sintiendo..."
                value={negThought}
                onChange={e => { setNegThought(e.target.value); setReframed(null); }}
              />
              <button style={{...S.btn, ...S.btnGold, marginTop: 12}} onClick={handleReframe}>
                🌸 Transformar este pensamiento
              </button>
              {reframed && (
                <div style={{
                  background: "linear-gradient(135deg, rgba(200,247,168,0.08), rgba(126,240,224,0.06))",
                  border: "1px solid rgba(200,247,168,0.25)",
                  borderRadius: 14, padding: 16, marginTop: 14,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem", color: "#c8f7a8", fontStyle: "italic", lineHeight: 1.7,
                  animation: "fadeIn 0.5s ease",
                }}>✦ {reframed}</div>
              )}
            </div>

            <div style={S.card}>
              <p style={S.cardTitle}>🛑 Cuando te irrite algo...</p>
              {[
                "1. Pausa. Respira 3 veces.",
                "2. ¿Esto importará en una semana?",
                "3. Su actitud es de él. Tu paz es tuya.",
                "4. Di: \"Elijo mi paz ahora mismo.\"",
              ].map((s, i) => <p key={i} style={{...S.cardBody, marginBottom: 8}}>{s}</p>)}
            </div>

            <div style={S.bookCard}>
              <p style={S.bookLabel}>Louise Hay — Usted Puede Sanar Su Vida</p>
              <p style={S.bookQuote}>"Estoy dispuesta a soltar el patrón que crea esta situación."</p>
            </div>
          </>}

          {section === "afirmaciones" && <>
            <div style={S.sectionHeader}>
              <h2 style={S.h2}>Mis Afirmaciones</h2>
              <p style={S.subtitle}>Repite · Siente · Cree</p>
            </div>

            {AFFIRMATIONS.map((aff, i) => (
              <div key={i} onClick={() => { setAffIdx(i); showToast("✨ Afirmación activada"); }} style={{
                ...S.card, cursor: "pointer",
                borderColor: i === affIdx ? "rgba(240,201,106,0.5)" : "rgba(240,201,106,0.12)",
                background: i === affIdx ? "rgba(240,201,106,0.08)" : "rgba(255,255,255,0.03)",
                transition: "all 0.3s",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.6,
                  color: i === affIdx ? "#f0c96a" : "rgba(250,246,255,0.85)",
                }}>{aff}</p>
              </div>
            ))}
            <p style={S.mantra}>Todo en mi vida llega a mí con facilidad, gozo y gloria ✨</p>
          </>}

          {section === "entrena" && <>
            <div style={S.sectionHeader}>
              <h2 style={S.h2}>Cuerpo & Energía</h2>
              <p style={S.subtitle}>Tu cuerpo fuerte atrae vida fuerte</p>
            </div>

            <div style={{...S.card, textAlign: "center"}}>
              <p style={S.cardTitle}>💪 Tu motivación de hoy</p>
              <p key={trainIdx} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem", fontStyle: "italic",
                color: "rgba(250,246,255,0.9)", lineHeight: 1.6,
                padding: "10px 0", animation: "fadeIn 0.5s ease",
              }}>{TRAINING[trainIdx]}</p>
              <button style={{...S.btn, ...S.btnGold, marginTop: 14}} onClick={() => setTrainIdx(i => (i + 1) % TRAINING.length)}>
                Nueva motivación 🔥
              </button>
            </div>

            <div style={S.card}>
              <p style={S.cardTitle}>✅ Mi checklist de hoy</p>
              {CHECKLIST_ITEMS.map((item, i) => <CheckItem key={i} label={item} />)}
            </div>

            <div style={S.bookCard}>
              <p style={S.bookLabel}>Access Consciousness — Gary Douglas</p>
              <p style={S.bookQuote}>"Tu cuerpo es un aliado, no un enemigo. Escúchalo, muévelo, celébralo."</p>
            </div>
          </>}

        </div>

        <nav style={S.nav}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)} style={{
              ...S.navBtn,
              color: section === n.id ? "#f0c96a" : "#9990bb",
            }}>
              <span style={{fontSize: 22, display: "block", transform: section === n.id ? "scale(1.2)" : "scale(1)", transition: "transform 0.2s"}}>{n.icon}</span>
              <span style={{fontSize: 10}}>{n.label}</span>
            </button>
          ))}
        </nav>

        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; background: #0a0812; }
  @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.8; } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 20px rgba(240,201,106,0.2); transform: scale(1); } 50% { box-shadow: 0 0 40px rgba(240,201,106,0.4); transform: scale(1.04); } }
  @keyframes burst { 0% { transform: translate(-50%,-50%) scale(1); opacity: 1; } 100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; } }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  textarea, input { outline: none; }
  textarea:focus, input:focus { border-color: rgba(240,201,106,0.5) !important; }
  button:active { opacity: 0.85; }
`;

const styles = {
  app: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 20% 0%, #1a0a2e 0%, #0a0812 60%), radial-gradient(ellipse at 80% 100%, #0d1a2e 0%, transparent 60%)",
    fontFamily: "'DM Sans', sans-serif",
    color: "#faf6ff",
    position: "relative",
    overflowX: "hidden",
    paddingBottom: 90,
  },
  content: { position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", padding: "0 18px" },
  header: { padding: "50px 0 20px", textAlign: "center" },
  sectionHeader: { padding: "44px 0 8px", textAlign: "center" },
  h1: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 300, fontStyle: "italic",
    background: "linear-gradient(135deg, #f0c96a 0%, #f7a8c4 50%, #c4b5f7 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, marginBottom: 6,
  },
  h2: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, fontStyle: "italic",
    background: "linear-gradient(135deg, #f0c96a, #f7a8c4)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  subtitle: { fontSize: 12, color: "#9990bb", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 },
  card: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(240,201,106,0.15)",
    borderRadius: 20, padding: 22, marginBottom: 16, backdropFilter: "blur(10px)",
  },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#f0c96a", marginBottom: 12 },
  cardBody: { fontSize: 14, color: "rgba(250,246,255,0.8)", lineHeight: 1.7 },
  affCard: {
    background: "linear-gradient(135deg, rgba(240,201,106,0.12), rgba(247,168,196,0.08))",
    border: "1px solid rgba(240,201,106,0.3)", borderRadius: 20, padding: "28px 22px",
    textAlign: "center", marginBottom: 16, cursor: "pointer",
  },
  affText: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontStyle: "italic",
    color: "#faf6ff", lineHeight: 1.5, animation: "fadeIn 0.8s ease",
  },
  affHint: { fontSize: 10, color: "#9990bb", marginTop: 10, letterSpacing: "0.1em" },
  bookCard: {
    background: "linear-gradient(135deg, rgba(196,181,247,0.08), rgba(126,240,224,0.05))",
    border: "1px solid rgba(196,181,247,0.2)", borderRadius: 20, padding: 22, marginBottom: 16,
  },
  bookLabel: { fontSize: 10, color: "#c4b5f7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 },
  bookQuote: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#faf6ff", lineHeight: 1.6 },
  questionBox: {
    background: "linear-gradient(135deg, rgba(126,240,224,0.06), rgba(196,181,247,0.06))",
    border: "1px solid rgba(126,240,224,0.2)", borderRadius: 20, padding: 22,
    textAlign: "center", marginBottom: 16,
  },
  questionLabel: { fontSize: 10, color: "#9990bb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 },
  questionText: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#7ef0e0", fontStyle: "italic", lineHeight: 1.5 },
  input: {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(240,201,106,0.2)", borderRadius: 12,
    color: "#faf6ff", fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, padding: "12px 16px", resize: "none",
    transition: "border 0.2s",
  },
  btn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "13px 24px", borderRadius: 50,
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
    cursor: "pointer", border: "none", width: "100%", transition: "all 0.25s",
  },
  btnGold: { background: "linear-gradient(135deg, #f0c96a, #e8a84a)", color: "#1a0a2e" },
  btnOutline: { background: "transparent", border: "1px solid rgba(240,201,106,0.25)", color: "#f0c96a" },
  btnRow: { display: "flex", gap: 10, marginTop: 14 },
  portalCircle: {
    width: 110, height: 110, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(240,201,106,0.25) 0%, rgba(196,181,247,0.1) 60%, transparent 100%)",
    border: "2px solid rgba(240,201,106,0.35)",
    margin: "0 auto 16px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "2.5rem", animation: "pulse 3s ease-in-out infinite",
  },
  mantra: {
    textAlign: "center", padding: 16,
    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic",
    color: "rgba(240,201,106,0.55)", letterSpacing: "0.05em",
  },
  nav: {
    position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
    background: "rgba(10,8,18,0.97)", backdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(240,201,106,0.12)",
    display: "flex", justifyContent: "space-around",
    padding: "8px 0 14px",
  },
  navBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", padding: "4px 8px", borderRadius: 10,
    transition: "all 0.2s",
  },
};
