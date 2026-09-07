import { useEffect, useState } from 'react';
import { Menu, X, Download, Globe, Shield } from 'lucide-react';
import { translations, Language } from '../translations';
import { handleAppDownload } from '../util/download';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
}

export default function Navbar({ lang, setLang, isAdminMode, setIsAdminMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const t = translations[lang];

  // Les 4 liens du site principal + le 5ème lien Admin
  const NAV_LINKS = [
    { label: t.nav.home, href: '#home', isSpecial: false },
    { label: t.nav.about, href: '#about', isSpecial: false },
    { label: t.nav.features, href: '#features', isSpecial: false },
    { label: t.nav.contact, href: '#contact', isSpecial: false },
  ];

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

  const toggleLanguage = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

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
        <a 
          href="#home" 
          onClick={() => setIsAdminMode(false)}
          className="flex items-center gap-3 group" 
          aria-label="Claristudent accueil"
        >
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

        {/* 5 fenêtres de navigation Desktop (Accueil, À propos, Fonctionnalités, Contact, Admin) */}
        <ul className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsAdminMode(false)}
                className="relative px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 rounded-full hover:text-[#3053C2] hover:bg-blue-50/70"
              >
                {link.label}
              </a>
            </li>
          ))}
          
          {/* 5ème fenêtre : Admin */}
          <li>
            <button
              onClick={() => {
                setIsAdminMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full cursor-pointer ${
                isAdminMode 
                  ? 'bg-[#3053C2] text-white shadow-md' 
                  : 'text-slate-700 hover:text-[#3053C2] hover:bg-blue-50/70'
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin
            </button>
          </li>
        </ul>

        {/* Actions Desktop : Langue + Téléchargement */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            title="Changer de langue / Change language"
          >
            <Globe className="h-3.5 w-3.5 text-[#3053C2]" />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            onClick={handleAppDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
            style={{ backgroundColor: '#3053C2' }}
          >
            <Download className="h-4 w-4" />
            {t.common.download}
          </button>
        </div>

        {/* Boutons Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-[#3053C2]" />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 bg-slate-100/80 transition-colors hover:bg-slate-200"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6 text-[#1A2238]" /> : <Menu className="h-6 w-6 text-[#1A2238]" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile déroulant (avec les 5 fenêtres) */}
      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 lg:hidden shadow-xl ${
          open ? 'max-h-[520px] border-b border-slate-200 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-px flex flex-col gap-2 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false);
                setIsAdminMode(false);
              }}
              className="rounded-xl px-4 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-blue-50 hover:text-[#3053C2]"
            >
              {link.label}
            </a>
          ))}
          
          {/* Option Admin Mobile */}
          <button
            onClick={() => {
              setOpen(false);
              setIsAdminMode(true);
            }}
            className={`rounded-xl px-4 py-3 text-base font-semibold flex items-center gap-2 transition-colors ${
              isAdminMode ? 'bg-[#3053C2] text-white' : 'text-slate-800 hover:bg-blue-50 hover:text-[#3053C2]'
            }`}
          >
            <Shield className="h-5 w-5" />
            Administration
          </button>

          <button
            onClick={() => {
              setOpen(false);
              handleAppDownload();
            }}
            className="inline-flex items-center justify-center gap-2 mt-4 w-full py-3 text-sm font-semibold text-white rounded-xl shadow-md cursor-pointer"
            style={{ backgroundColor: '#3053C2' }}
          >
            <Download className="h-4 w-4" />
            {t.common.download}
          </button>
        </div>
      </div>
    </header>
  );
}