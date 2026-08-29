import { Mail, Phone, MapPin } from 'lucide-react';

const APK_URL = 'https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789/view';
const WHATSAPP_URL = 'https://wa.me/237693338925';

const NAV = [
  { label: 'Accueil', href: '#home' },
  { label: 'À propos', href: '#about' },
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL = [
  { label: 'Politique de confidentialité', href: '#' },
  { label: "Conditions d'utilisation", href: '#' },
  { label: 'Politique des cookies', href: '#' },
];

const SOCIALS = [
  { 
    label: 'Facebook',
    href: 'https://facebook.com/ton-lien-ici', // Remplace par ton lien Facebook
    colorClass: 'text-[#1877F2] hover:bg-[#1877F2]/10 border-[#1877F2]/30',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  { 
    label: 'Instagram',
    href: 'https://instagram.com/ton-lien-ici', // Remplace par ton lien Instagram
    colorClass: 'text-[#E4405F] hover:bg-[#E4405F]/10 border-[#E4405F]/30',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  { 
    label: 'TikTok',
    href: 'https://tiktok.com/@ton-lien-ici', // Remplace par ton lien TikTok
    colorClass: 'text-slate-900 hover:bg-slate-900/10 border-slate-900/30',
    svg: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    )
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Marque */}
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-3" aria-label="Claristudent accueil">
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
              Tout ce qui compte pour l'éducation de votre enfant, au même endroit. Suivez la
              scolarité en temps réel et restez tranquille, où que vous soyez.
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Explorer</h3>
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Légal</h3>
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Adresses & Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-brand-600" />
                <a href="mailto:info@claristudent.com" className="transition-colors hover:text-brand-600">
                  info@claristudent.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-brand-600" />
                <a href="mailto:admin@claristudent.com" className="transition-colors hover:text-brand-600">
                  admin@claristudent.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-brand-600" />
                <a href="mailto:support@claristudent.com" className="transition-colors hover:text-brand-600">
                  support@claristudent.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <Phone className="h-4 w-4 flex-none text-brand-600" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-600">
                  +237 693 33 89 25
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-600" />
                <span>Yaoundé, Cameroun</span>
              </li>
            </ul>
            <a
              href={APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Télécharger l'application
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Claristudent. Tous droits réservés.
          </p>
          <p className="text-sm text-slate-500">
            Conçu avec soin pour les familles du monde entier.
          </p>
        </div>
      </div>
    </footer>
  );
}