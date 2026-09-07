import { Mail, Phone, MapPin } from 'lucide-react';
import { Language } from '../translations';
import { handleAppDownload } from '../util/download';

interface FooterProps {
  lang: Language;
}

const WHATSAPP_URL = 'https://wa.me/237697591412';

const SOCIALS = [
  { 
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1JzhU1fjDY/',
    colorClass: 'text-[#1877F2] hover:bg-[#1877F2]/10 border-[#1877F2]/30',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  { 
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    colorClass: 'text-[#25D366] hover:bg-[#25D366]/10 border-[#25D366]/30',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    )
  },
  { 
    label: 'TikTok',
    href: 'https://www.tiktok.com/@claristudent?_r=1&_t=ZS-99KHe5jtJeW',
    colorClass: 'text-slate-900 hover:bg-slate-900/10 border-slate-900/30',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    )
  },
];

export default function Footer({ lang }: FooterProps) {
  const NAV = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', href: '#home' },
    { label: lang === 'fr' ? 'À propos' : 'About', href: '#about' },
    { label: lang === 'fr' ? 'Fonctionnalités' : 'Features', href: '#features' },
    { label: lang === 'fr' ? 'Newsletter' : 'Newsletter', href: '#newsletter' },
    { label: lang === 'fr' ? 'Contact' : 'Contact', href: '#contact' },
  ];

  const LEGAL = [
    { label: lang === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy', href: '#' },
    { label: lang === 'fr' ? "Conditions d'utilisation" : 'Terms of Use', href: '#' },
    { label: lang === 'fr' ? 'Politique des cookies' : 'Cookie Policy', href: '#' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Marque */}
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-3" aria-label={lang === 'fr' ? "Claristudent accueil" : "Claristudent home"}>
              <img 
                src="/logo.jpeg" 
                alt="Logo Claristudent" 
                className="h-10 w-auto object-contain lg:h-12" 
              />
              <span className="font-display text-xl font-extrabold tracking-tight">
                <span style={{ color: '#3053C2' }}>Clari</span>
                <span style={{ color: '#1A2238' }}>student</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {lang === 'fr'
                ? "Tout ce qui compte pour l'éducation de votre enfant, au même endroit. Suivez la scolarité en temps réel et restez tranquille, où que vous soyez."
                : "Everything that matters for your child's education, in one place. Track schooling in real time and stay at ease, wherever you are."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map((s) => {
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-200 hover:scale-105 shadow-sm ${s.colorClass}`}
                  >
                    {s.svg}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {lang === 'fr' ? 'Explorer' : 'Explore'}
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {lang === 'fr' ? 'Légal' : 'Legal'}
            </h3>
            <ul className="mt-4 space-y-3">
              {LEGAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {lang === 'fr' ? 'Adresses & Contact' : 'Address & Contact'}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-brand-600" />
                <a 
                  href="mailto:info@claristudent.com" 
                  className="transition-colors hover:text-brand-600"
                >
                  info@claristudent.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <Phone className="h-4 w-4 flex-none text-brand-600" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-600">
                  +237 697 59 14 12
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-600" />
                <span>{lang === 'fr' ? 'Yaoundé, Cameroun' : 'Yaounde, Cameroon'}</span>
              </li>
            </ul>
            <button
              onClick={handleAppDownload}
              className="btn-primary mt-6 cursor-pointer"
            >
              {lang === 'fr' ? "Télécharger l'application" : 'Download application'}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Claristudent. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <p className="text-sm text-slate-500">
            {lang === 'fr' ? 'Conçu avec soin pour les familles du monde entier.' : 'Crafted with care for families worldwide.'}
          </p>
        </div>
      </div>
    </footer>
  );
}