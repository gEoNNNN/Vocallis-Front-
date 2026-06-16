import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaHospital, FaScissors, FaUtensils, FaWrench, FaHotel, FaBuilding, FaLock } from 'react-icons/fa6'

/* ── Inline SVG Icons ──────────────────────────────────────────────────────── */
const IconMic = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const IconBrain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
)
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconMsg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

/* ── Scroll Reveal ─────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── Waveform ──────────────────────────────────────────────────────────────── */
function Waveform() {
  return (
    <div className="waveform">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="waveform__bar" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  )
}

/* ── Navbar ────────────────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo">
          <img src="/img/logo.png" alt="VoCALLis" className="navbar__logo-img" />
        </a>
        <ul className="navbar__links">
          <li><a href="#features">Funcționalități</a></li>
          <li><a href="#how">Cum funcționează</a></li>
          <li><a href="#industries">Industrii</a></li>
          <li><a href="#pricing">Prețuri</a></li>
        </ul>
        <div className="navbar__actions">
          <a href="#" className="btn btn--ghost">Autentificare</a>
          <a href="#pricing" className="btn btn--primary">Încearcă Gratuit <IconArrow /></a>
        </div>
      </div>
    </nav>
  )
}

/* ── Demo Card (hero right) ─────────────────────────────────────────────────── */
const AGENT_TYPES = ['General', 'Programări', 'Comenzi', 'Recepționer', 'Suport']

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const WS_URL = 'ws://localhost:3000/ws/stt'

function DemoCard() {
  const [active, setActive]       = useState('Recepționer')
  const [calling, setCalling]     = useState(false)
  const [finalText, setFinalText] = useState('')
  const [interim, setInterim]     = useState('')
  const [error, setError]         = useState('')

  const wsRef       = useRef(null)
  const recorderRef = useRef(null)
  const streamRef   = useRef(null)

  const startCall = async () => {
    setError('')
    setFinalText('')
    setInterim('')

    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setError('Microfon inaccesibil. Permite accesul în browser.')
      return
    }
    streamRef.current = stream

    const ws = new WebSocket(WS_URL)
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws

    ws.onopen = () => {
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm'
      const recorder = new MediaRecorder(stream, { mimeType })
      recorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
          ws.send(e.data)
        }
      }
      recorder.start(250)
      setCalling(true)
    }

    ws.onmessage = (e) => {
      const { transcript, is_final } = JSON.parse(e.data)
      if (!transcript) return
      if (is_final) {
        setFinalText(prev => prev ? prev + ' ' + transcript : transcript)
        setInterim('')
      } else {
        setInterim(transcript)
      }
    }

    ws.onerror = () => setError('Eroare conexiune. Verifică dacă serverul rulează.')
    ws.onclose = () => { if (calling) stopCall() }
  }

  const stopCall = () => {
    recorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.close()
    recorderRef.current = null
    streamRef.current   = null
    wsRef.current       = null
    setCalling(false)
    setInterim('')
  }

  return (
    <div className={`demo-card${calling ? ' demo-card--calling' : ''}`}>
      <div className="demo-card__blob demo-card__blob--1" />
      <div className="demo-card__blob demo-card__blob--2" />
      <div className="demo-card__blob demo-card__blob--3" />

      <div className="demo-card__inner">

        {/* Top — fixed height */}
        <div className="demo-card__top">
          {calling ? (
            <div className="demo-orb-wrap">
              <div className="demo-orb" />
              <p className="demo-orb__status">Apel activ</p>
            </div>
          ) : (
            <div className="demo-card__idle">
              <h3 className="demo-card__title">Vorbește cu Agentul AI</h3>
              <p className="demo-card__sub">Selectează tipul de agent și apasă butonul pentru a începe.</p>
            </div>
          )}
        </div>

        {/* Pills */}
        <div className="demo-card__pills">
          {AGENT_TYPES.map(t => (
            <button key={t} className={`demo-pill${active === t ? ' demo-pill--active' : ''}`} onClick={() => setActive(t)}>{t}</button>
          ))}
        </div>

        {/* Call button */}
        <button
          className={`demo-call-btn${calling ? ' demo-call-btn--calling' : ''}`}
          onClick={calling ? stopCall : startCall}
        >
          <PhoneIcon />
          {calling ? 'Oprește Apelul' : 'Pornește Apelul'}
        </button>

        {/* Transcript */}
        <div className="demo-transcript">
          {error ? (
            <span className="demo-transcript__error">{error}</span>
          ) : finalText || interim ? (
            <p className="demo-transcript__text">
              {finalText && <span className="demo-transcript__final">{finalText} </span>}
              {interim  && <span className="demo-transcript__interim">{interim}</span>}
            </p>
          ) : (
            <span className="demo-transcript__hint">
              {calling ? <>Ascultă<span className="demo-transcript__dots" /></> : 'Textul conversației va apărea aici...'}
            </span>
          )}
        </div>

      </div>
    </div>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__top">
          <h1 className="hero__title">
            Recepționistul tău AI<br />
            <span className="hero__title--accent">care nu doarme niciodată</span>
          </h1>
          <p className="hero__sub">
            VoCALLis răspunde automat la telefon, înțelege clienții în română, rusă și
            accent moldovenesc — și gestionează comenzi, programări și întrebări în
            timp real, fără niciun operator uman.
          </p>
        </div>
        <DemoCard />
        <div className="hero__bottom">
          <div className="hero__ctas">
            <a href="#pricing" className="btn btn--primary btn--lg">Solicită Demo Gratuit <IconArrow /></a>
            <a href="#how" className="btn btn--outline btn--lg">Cum funcționează</a>
          </div>
          <div className="hero__trust">
            <div className="hero__trust-item"><IconCheck /> Fără costuri inițiale</div>
            <div className="hero__trust-item"><IconCheck /> Setup în 48 ore</div>
            <div className="hero__trust-item"><IconCheck /> Suport MD &amp; RO</div>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ── Features ──────────────────────────────────────────────────────────────── */
function Features() {
  const cards = [
    { icon: <IconMic />,      title: 'Recunoaștere vocală avansată',   desc: 'Înțelege română, rusă și mixul moldovenesc specific, chiar și cu zgomot de fundal sau accent pronunțat.' },
    { icon: <IconBrain />,    title: 'Înțelegerea intenției (NLU)',     desc: 'Identifică automat ce dorește clientul — comandă, programare, întrebare — și răspunde conform.' },
    { icon: <IconMsg />,      title: 'Conversație naturală',            desc: 'Dialoghează fluid ca un operator real. Nu robotizat, nu scriptat — răspunsuri adaptate contextului.' },
    { icon: <IconCalendar />, title: 'Programări automate',             desc: 'Preia, modifică și confirmă programări direct în calendar, fără intervenție umană.' },
    { icon: <IconGlobe />,    title: 'Multilingv — RO + RU',            desc: 'Trece automat între română și rusă în aceeași conversație, fără configurare suplimentară.' },
    { icon: <IconShield />,   title: 'Securitate și conformitate GDPR', desc: 'Date stocate în UE, consimțământ înregistrare, politici clare de retenție și ștergere.' },
  ]
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Funcționalități</div>
          <h2 className="section-title">Tot ce ai nevoie pentru<br /><span className="grad-text">automatizarea apelurilor</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Tehnologie AI de ultimă generație, adaptată specific pentru piața din Moldova și România.
          </p>
        </div>
        <div className="features__grid">
          {cards.map((c, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card__icon">{c.icon}</div>
              <div className="feature-card__title">{c.title}</div>
              <div className="feature-card__desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── How it works ──────────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: '01', icon: <IconPhone />, title: 'Clientul sună',       desc: 'Apelul intră pe numărul afacerii tale. VoCALLis preia instantaneu, fără niciun ton de așteptare.' },
    { n: '02', icon: <IconMic />,   title: 'Ascultă și transcrie', desc: 'Vocea e transcrisă în timp real cu Deepgram Nova-3, optimizat pentru română și rusă.' },
    { n: '03', icon: <IconBrain />, title: 'Procesează intenția',  desc: 'LLM-ul înțelege contextul, verifică baza de date a companiei și decide acțiunea corectă.' },
    { n: '04', icon: <IconZap />,   title: 'Răspunde natural',     desc: 'Generează un răspuns vocal uman în sub 500ms și continuă conversația până la rezolvare.' },
  ]
  return (
    <section id="how" className="how">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Proces</div>
          <h2 className="section-title">De la apel la răspuns<br /><span className="grad-text">în mai puțin de 500ms</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Un pipeline AI complet, optimizat pentru latență minimă și acuratețe maximă.</p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className="step">
              <div className="step__num-wrap">
                <span className="step__num">{s.n}</span>
              </div>
              <div className="step__title">{s.title}</div>
              <div className="step__desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Industries ────────────────────────────────────────────────────────────── */
function Industries() {
  const list = [
    { icon: <FaHospital />, title: 'Clinici Medicale',      desc: 'Programări, orarul medicilor, indicații preliminare — fără secretară ocupată.' },
    { icon: <FaScissors />, title: 'Saloane & Beauty',       desc: 'Rezervări, servicii disponibile, confirmare și reamintire automată.' },
    { icon: <FaUtensils />, title: 'Restaurante & Livrări',  desc: 'Preluare comenzi, timp estimat, status livrare — 100% automat.' },
    { icon: <FaWrench />,   title: 'Service-uri Auto',        desc: 'Programări revizie, prețuri estimative, status reparație în timp real.' },
    { icon: <FaHotel />,    title: 'Hoteluri & Turism',      desc: 'Disponibilitate camere, rezervări, informații facilități și tarife.' },
    { icon: <FaBuilding />, title: 'Companii & Corporații',  desc: 'Direcționare apeluri, preluare mesaje, FAQ general despre companie.' },
  ]
  return (
    <section id="industries" className="industries">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Industrii</div>
          <h2 className="section-title">Funcționează în orice<br /><span className="grad-text">tip de afacere</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>VoCALLis se adaptează la specificul fiecărei industrii, cu răspunsuri personalizate.</p>
        </div>
        <div className="industries__grid">
          {list.map((item, i) => (
            <div key={i} className="industry-card">
              <div className="industry-card__icon">{item.icon}</div>
              <div>
                <div className="industry-card__title">{item.title}</div>
                <div className="industry-card__desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pricing ───────────────────────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect pentru afaceri mici care vor să înceapă automatizarea apelurilor.',
      features: ['Minute incluse lunar', '1 număr de telefon', 'Română + Rusă', 'Programări simple', 'Suport email'],
    },
    {
      name: 'Pro',
      desc: 'Soluția completă pentru afaceri care primesc volume mari de apeluri zilnic.',
      features: ['Minute extinse lunar', '3 numere de telefon', 'RAG avansat (meniu, produse, prețuri)', 'Programări + CRM sync', 'Analitics & rapoarte', 'Suport prioritar'],
      popular: true,
    },
    {
      name: 'Enterprise',
      desc: 'Soluție custom pentru companii cu nevoi complexe și volume mari.',
      features: ['Minute nelimitate', 'Numere nelimitate', 'Integrări custom (API)', 'Multi-locație', 'Manager de cont dedicat', 'SLA 99.9% garantat'],
    },
  ]
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Prețuri</div>
          <h2 className="section-title">Simplu și transparent<br /><span className="grad-text">fără surprize</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Plătești lunar, anulezi oricând. Toate planurile includ setup și onboarding.</p>
        </div>
        <div className="pricing__coming-banner" data-reveal>
          <FaLock />
          <span>Prețurile oficiale vor fi anunțate la lansare — <strong>Septembrie 2026</strong></span>
        </div>
        <div className="pricing__grid">
          {plans.map((p, i) => (
            <div key={i} className={`price-card price-card--mystery${p.popular ? ' price-card--popular' : ''}`} data-reveal data-delay={i + 1}>
              {p.popular && <div className="price-popular-badge">Cel mai popular</div>}
              <div className="price-card__name">{p.name}</div>
              <div className="price-card__price">
                <span className="price-card__amount price-card__amount--hidden">??$</span>
                <span className="price-card__period">/lună</span>
              </div>
              <p className="price-card__desc">{p.desc}</p>
              <ul className="price-card__features">
                {p.features.map((f, j) => (
                  <li key={j}><IconCheck />{f}</li>
                ))}
              </ul>
              <button className="price-card__cta price-card__cta--notify">Notifică-mă la lansare</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ───────────────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-tag">Hai să începem</div>
        <h2 className="cta-section__title">Gata să automatizezi<br />comunicarea cu clienții?</h2>
        <p className="cta-section__sub">
          Solicită un demo gratuit și vezi cum VoCALLis poate transforma afacerea ta
          — fără operatori, fără pauze, fără apeluri pierdute.
        </p>
        <div className="cta-section__actions">
          <a href="mailto:contact@vocallis.ai" className="btn btn--primary btn--lg">
            Solicită Demo Gratuit <IconArrow />
          </a>
          <a href="tel:+37360000000" className="btn btn--outline btn--lg">
            <IconPhone /> Sună-ne acum
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="navbar__logo-icon"><IconMic /></div>
              VoCALLis
            </div>
            <p>Operatorul tău virtual cu AI — disponibil 24/7, în română și rusă, pentru orice afacere din Moldova și România.</p>
          </div>
          <div className="footer__col">
            <h4>Produs</h4>
            <a href="#features">Funcționalități</a>
            <a href="#how">Cum funcționează</a>
            <a href="#industries">Industrii</a>
            <a href="#pricing">Prețuri</a>
          </div>
          <div className="footer__col">
            <h4>Companie</h4>
            <a href="#">Despre noi</a>
            <a href="#">Blog</a>
            <a href="#">Parteneri</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <a href="#">Termeni și condiții</a>
            <a href="#">Confidențialitate</a>
            <a href="#">GDPR</a>
            <a href="#">Cookie-uri</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 VoCALLis. Toate drepturile rezervate.</span>
          <span>Construit în Moldova 🇲🇩</span>
        </div>
      </div>
    </footer>
  )
}

/* ── App ───────────────────────────────────────────────────────────────────── */
export default function App() {
  useReveal()
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Industries />
      <Pricing />
      <CTASection />
      <Footer />
    </>
  )
}
