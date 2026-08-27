import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

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
    icon: Facebook, 
    href: 'https://facebook.com', 
    label: 'Facebook',
    colorClass: 'text-[#1877F2] hover:bg-[#1877F2]/10 border-[#1877F2]/30'
  },
  { 
    icon: Instagram, 
    href: 'https://instagram.com', 
    label: 'Instagram',
    colorClass: 'text-[#E4405F] hover:bg-[#E4405F]/10 border-[#E4405F]/30'
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com', 
    label: 'Twitter',
    colorClass: 'text-[#1DA1F2] hover:bg-[#1DA1F2]/10 border-[#1DA1F2]/30'
  },
  { 
    icon: Youtube, 
    href: 'https://youtube.com', 
    label: 'YouTube',
    colorClass: 'text-[#FF0000] hover:bg-[#FF0000]/10 border-[#FF0000]/30'
  },
  { 
    icon: MessageCircle, 
    href: WHATSAPP_URL, 
    label: 'WhatsApp',
    colorClass: 'text-[#25D366] hover:bg-[#25D366]/10 border-[#25D366]/30'
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
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-200 hover:scale-105 shadow-sm ${s.colorClass}`}
                  >
                    <Icon className="h-5 w-5" />
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