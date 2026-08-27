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
          ? 'border-b border-slate-200/80 bg-white/85 backdrop-blur-lg shadow-soft'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between lg:h-20">
        <a href="#home" className="flex items-center gap-3" aria-label="Claristudent accueil">
          <img 
            src="/logo.jpeg" 
            alt="Logo Claristudent" 
            className="h-10 w-auto object-contain lg:h-12" 
          />
          <span className="font-display text-2xl font-bold tracking-tight">
            <span style={{ color: '#3053C2' }}>Clari</span>
            <span style={{ color: '#1A2238' }}>student</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Download className="h-4 w-4" />
            Télécharger l'application
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[480px] border-b border-slate-200 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-px flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            <Download className="h-4 w-4" />
            Télécharger l'application
          </a>
        </div>
      </div>
    </header>
  );
}