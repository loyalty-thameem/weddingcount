
import { useEffect, useState, useRef } from 'react';
import './App.css';

const WEDDING_DATE = new Date('2026-05-09T00:00:00');
const NAMES = ['Thameem Ansari', 'Aswiya Nusrath'];

const messages = [
  // Example for 30 days to go, ... 1 day, today, etc. Each entry is an object with all languages
  // Add more messages as needed for each day
  {
    days: 30,
    ar: '٣٠ يومًا متبقيًا... دعونا نستعد لهذا اليوم المبارك!',
    en: '30 days to go... Let us prepare for this blessed day!',
    ta: 'இன்னும் 30 நாட்கள்... இந்த பாக்கியமான நாளுக்காக தயாராகுங்கள்!',
    ur: 'ابھی 30 دن باقی ہیں... اس بابرکت دن کی تیاری کریں!'
  },
  {
    days: 3,
    ar: '٣ أيام متبقية إن شاء الله...',
    en: '3 days to go InshaAllah...',
    ta: 'இன்னும் 3 நாட்கள் இன்ஷா அல்லாஹ்...',
    ur: 'ابھی 3 دن باقی ہیں ان شاء اللہ...'
  },
  {
    days: 1,
    ar: 'غدًا هو اليوم الكبير...',
    en: 'Tomorrow is the big day...',
    ta: 'நாளை தான் பெரிய நாள்...',
    ur: 'کل ہے بڑا دن...'
  },
  {
    days: 0,
    ar: 'اليوم هو يوم زفافنا... الحمد لله 🤍',
    en: 'Today is our Wedding Day... Alhamdulillah 🤍',
    ta: 'இன்று தான் நம் திருமண நாள்... அல்ஹம்துலில்லாஹ் 🤍',
    ur: 'آج ہماری شادی کا دن ہے... الحمد للہ 🤍'
  },
  // ...add more for each day or use a default pattern
];

const defaultMessage = (days) => ({
  ar: `متبقي ${days} يومًا... نسأل الله التوفيق!`,
  en: `${days} days to go... May Allah grant us barakah!`,
  ta: `இன்னும் ${days} நாட்கள்... அல்லாஹ்வின் ஆசீர்வாதம் கிடைக்கட்டும்!`,
  ur: `ابھی ${days} دن باقی ہیں... اللہ برکت عطا فرمائے!`
});

const duas = [
  {
    ar: 'بارك الله لك وبارك عليك وجمع بينكما في خير',
    en: 'May Allah bless you, shower His blessings upon you, and unite you both in goodness.',
  },
  {
    ar: 'اللهم اجعل بيننا مودة ورحمة وبارك لنا في زواجنا',
    en: 'O Allah, place love and mercy between us and bless our marriage.',
  },
  {
    ar: 'اللهم ارزقنا السعادة والبركة في حياتنا',
    en: 'O Allah, grant us happiness and barakah in our life together.',
  },
];

const langs = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'ur', label: 'اردو' },
];

function getMessageForDay(daysLeft) {
  const found = messages.find(m => m.days === daysLeft);
  if (found) return found;
  return defaultMessage(daysLeft);
}

function getCountdownParts(targetDate) {
  const now = new Date();
  let diff = targetDate - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdownParts(WEDDING_DATE));
  const [langIdx, setLangIdx] = useState(1); // Default to English
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown(getCountdownParts(WEDDING_DATE));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Auto-rotate language every 5 seconds
  useEffect(() => {
    const langInterval = setInterval(() => {
      setLangIdx(idx => (idx + 1) % langs.length);
    }, 5000);
    return () => clearInterval(langInterval);
  }, []);

  const daysLeft = countdown.days;
  const message = getMessageForDay(daysLeft);
  const lang = langs[langIdx].code;

  return (
    <div className="wedding-app">
      <header className="wedding-header">
        <div className="calligraphy">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
        <h1 className="wedding-title">Wedding Countdown</h1>
        <div className="names-section">
          <span className="name">{NAMES[0]}</span>
          <span className="and">&amp;</span>
          <span className="name">{NAMES[1]}</span>
        </div>
        <div className="special-line">InshaAllah, our beautiful journey begins…</div>
      </header>

      <main>
        <div className="date-highlight">
          <span className="date-label">Wedding Date:</span>
          <span className="date-value">May 09, 2026 (Saturday)</span>
        </div>

        <div className="countdown-box">
          <div className="countdown-item">
            <span className="countdown-num">{countdown.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-num">{countdown.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-num">{countdown.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-num">{countdown.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <div className="message-section fade-in">
          <div className="message-lang-toggle">
            {langs.map((l, idx) => (
              <button
                key={l.code}
                className={`lang-btn${langIdx === idx ? ' active' : ''}`}
                onClick={() => setLangIdx(idx)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="message-text">
            {message[lang]}
          </div>
        </div>

        <section className="duas-section slide-in">
          <h2 className="duas-title">🤲 Marriage Duas</h2>
          <ul className="duas-list">
            {duas.map((dua, i) => (
              <li key={i} className="dua-item">
                <span className="dua-arabic">{dua.ar}</span>
                <span className="dua-translation">{dua.en}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
