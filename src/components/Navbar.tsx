import { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Accueil', href: '#home' },
  { label: 'À propos', href: '#about' },
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Contact', href: '#contact' },
];

const APK_URL = 'https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789/view';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm py-2'
          : 'border-b border-transparent bg-transparent py-4'
      }`}
    >
      <nav className="container-px flex h-14 items-center justify-between lg:h-16">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group" aria-label="Claristudent accueil">
          <img 
            src="/logo.jpeg" 
            alt="Logo Claristudent" 
            className="h-10 w-auto object-contain lg:h-11 transition-transform duration-200 group-hover:scale-105" 
          />
          <span className="font-display text-2xl font-bold tracking-tight">
            <span style={{ color: '#3053C2' }}>Clari</span>
            <span style={{ color: '#1A2238' }}>student</span>
          </span>
        </a>

        {/* Liens de navigation redessinés */}
        <ul className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 rounded-full hover:text-[#3053C2] hover:bg-blue-50/70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bouton de téléchargement desktop */}
        <div className="hidden lg:block">
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: '#3053C2' }}
          >
            <Download className="h-4 w-4" />
            Télécharger l'application
          </a>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 bg-slate-100/80 transition-colors hover:bg-slate-200 lg:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6 text-[#1A2238]" /> : <Menu className="h-6 w-6 text-[#1A2238]" />}
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 lg:hidden shadow-xl ${
          open ? 'max-h-[480px] border-b border-slate-200 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-px flex flex-col gap-2 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-blue-50 hover:text-[#3053C2]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 mt-4 w-full py-3 text-sm font-semibold text-white rounded-xl shadow-md"
            style={{ backgroundColor: '#3053C2' }}
          >
            <Download className="h-4 w-4" />
            Télécharger l'application
          </a>
        </div>
      </div>
    </header>
  );
}