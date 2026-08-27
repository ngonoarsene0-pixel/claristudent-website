import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/237693338925?text=Bonjour%20Claristudent%2C%20je%20souhaite%20obtenir%20plus%20d%27informations%20sur%20l%27application.';

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {bubbleOpen && (
        <div className="animate-fade-up w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Support Claristudent</p>
                <p className="text-xs text-[#25D366]">En ligne maintenant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setBubbleOpen(false)}
              className="text-slate-400 transition-colors hover:text-slate-600"
              aria-label="Fermer la bulle de discussion"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Bonjour ! Vous avez une question sur Claristudent ? Nous sommes là pour vous aider —
            cliquez ci-dessous pour discuter avec nous sur WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebd5d]"
          >
            <MessageCircle className="h-4 w-4" />
            Discuter sur WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setBubbleOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1ebd5d] active:scale-95"
        aria-label="Contactez-nous sur WhatsApp"
      >
        {!bubbleOpen && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" aria-hidden="true" />
        )}
        {bubbleOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
