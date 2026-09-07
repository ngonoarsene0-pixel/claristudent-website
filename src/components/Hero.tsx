import { useState } from 'react';
import { Download, MessageCircle, ShieldCheck, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, Language } from '../translations';
import { handleAppDownload } from '../util/download';

const WHATSAPP_URL = 'https://wa.me/237697591412?text=Bonjour%20Claristudent%2C%20je%20souhaite%20obtenir%20plus%20d%27informations.';

// Captures d'écran disponibles dans ton dossier public
const SCREENS = [
  '/image.jpeg',
  '/image1.jpeg',
  '/image2.jpeg',
  '/image3.jpeg',
  '/image4.jpeg',
  '/image5.jpeg',
  '/image6.jpeg'
];

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  // Dictionnaire actif
  const t = translations[lang];

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % SCREENS.length);
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white pt-28 sm:pt-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-gold-200/30 blur-3xl" />
      </div>

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
              <span className="flex h-2 w-2 rounded-full bg-brand-600" />
              {lang === 'fr' ? "La confiance des familles camerounaises" : "Trusted by Cameroonian families"}
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t.hero.title}{' '}
              <span style={{ color: '#3053C2' }}>{lang === 'fr' ? 'au même endroit.' : 'in one place.'}</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={handleAppDownload} className="btn-primary cursor-pointer">
                <Download className="h-5 w-5" />
                {t.hero.download}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1ebd5d] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                {lang === 'fr' ? "Discuter avec nous sur WhatsApp" : "Chat with us on WhatsApp"}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" /> {lang === 'fr' ? '100% Sécurisé' : '100% Secure'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-brand-600" /> {lang === 'fr' ? 'Alertes en temps réel' : 'Real-time alerts'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" /> {lang === 'fr' ? 'Établissements partenaires au Cameroun' : 'Partner schools in Cameroon'}
              </span>
            </div>
          </div>

          {/* RENDU SMARTPHONE FLOTTANT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-bounce-slow">
              {/* Coque du téléphone */}
              <div className="relative mx-auto h-[580px] w-[290px] rounded-[48px] border-[10px] border-slate-900 bg-slate-900 shadow-2xl ring-1 ring-slate-900/10 sm:h-[620px] sm:w-[310px]">
                {/* Boutons latéraux */}
                <div className="absolute -left-[13px] top-24 h-10 w-[3px] rounded-l-lg bg-slate-800" />
                <div className="absolute -left-[13px] top-38 h-12 w-[3px] rounded-l-lg bg-slate-800" />
                <div className="absolute -left-[13px] top-52 h-12 w-[3px] rounded-l-lg bg-slate-800" />
                <div className="absolute -right-[13px] top-32 h-16 w-[3px] rounded-r-lg bg-slate-800" />

                {/* Encoche d'écran / Notch */}
                <div className="absolute top-0 left-1/2 z-20 h-5 w-36 -translate-x-1/2 rounded-b-2xl bg-slate-900 flex items-center justify-center">
                  <div className="h-2 w-12 rounded-full bg-slate-800" />
                  <div className="ml-2 h-2.5 w-2.5 rounded-full bg-slate-800" />
                </div>

                {/* Écran avec l'image */}
                <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-white">
                  <img
                    src={SCREENS[currentScreen]}
                    alt={`Interface application Claristudent capture ${currentScreen + 1}`}
                    className="h-full w-full object-cover object-top transition-all duration-300"
                  />
                </div>

                {/* Flèches de navigation de l'écran */}
                <button
                  type="button"
                  onClick={prevScreen}
                  className="absolute left-2 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur hover:bg-slate-900"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextScreen}
                  className="absolute right-2 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur hover:bg-slate-900"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Badge d'Alerte Flottant */}
              <div className="absolute -bottom-4 -left-6 hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:block z-30">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Bell className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">98%</p>
                    <p className="text-xs text-slate-500">{lang === 'fr' ? "Informé dès que ça se passe à l'école" : "Notified as soon as it happens at school"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-24" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            fill="#F8FAFC"
            d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}