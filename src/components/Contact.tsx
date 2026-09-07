import { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../translations';

interface ContactProps {
  lang: Language;
}

const CONTACT_IMG = '/IMAG10.jpeg';

export default function Contact({ lang }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipient = "info@claristudent.com";
    const subject = encodeURIComponent(
      lang === 'fr' 
        ? `Message de ${formData.name} via le site Claristudent` 
        : `Message from ${formData.name} via Claristudent website`
    );
    const body = encodeURIComponent(
      lang === 'fr'
        ? `Nom complet : ${formData.name}\nAdresse e-mail : ${formData.email}\n\nMessage :\n${formData.message}`
        : `Full Name: ${formData.name}\nEmail Address: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // Détection automatique : Si c'est un appareil mobile, on utilise le lien mailto: natif (ultra fiable sur mobile)
    // Si c'est un PC, on ouvre directement le lien web Gmail de bureau
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`, '_blank');
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="section-py bg-white">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 text-white shadow-card">
          <div className="grid items-center lg:grid-cols-2">
            
            {/* Formulaire avec largeur réduite et adaptée */}
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <Mail className="h-3.5 w-3.5" /> {lang === 'fr' ? 'Contactez-nous' : 'Contact Us'}
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {lang === 'fr' ? 'Une question ? Une collaboration ?' : 'Have a question? A collaboration?'} <br />
                <span className="text-gold-300">
                  {lang === 'fr' ? 'Écrivez-nous directement' : 'Write to us directly'}
                </span>
              </h2>

              {submitted ? (
                <div className="mt-8 max-w-md flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white backdrop-blur-sm">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-gold-400" />
                  <p className="text-sm font-medium">
                    {lang === 'fr' 
                      ? 'Votre message a été préparé avec succès dans votre messagerie !' 
                      : 'Your message has been successfully prepared in your email client!'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-brand-100 mb-1">
                      {lang === 'fr' ? 'Votre nom complet' : 'Your full name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'fr' ? 'Nom et Prénom' : 'First and Last Name'}
                      className="w-full rounded-xl bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-gold-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-100 mb-1">
                      {lang === 'fr' ? 'Votre adresse e-mail' : 'Your email address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="exemple@email.com"
                      className="w-full rounded-xl bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-gold-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-100 mb-1">
                      {lang === 'fr' ? 'Destinataire' : 'Recipient'}
                    </label>
                    <a 
                      href="mailto:info@claristudent.com"
                      className="w-full rounded-xl bg-white/20 px-4 py-3 text-white text-sm font-medium border border-white/20 flex items-center justify-between hover:bg-white/30 transition block"
                    >
                      <span className="text-gold-300 font-semibold underline">info@claristudent.com</span>
                      <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white">Direct</span>
                    </a>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-100 mb-1">
                      {lang === 'fr' ? 'Votre message' : 'Your message'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'fr' ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}
                      className="w-full rounded-xl bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-gold-400 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-3.5 font-bold text-slate-900 shadow-lg transition hover:bg-gold-300 active:scale-95 text-sm"
                  >
                    <Send className="h-4 w-4" />
                    {lang === 'fr' ? 'Envoyer le message' : 'Send message'}
                  </button>
                </form>
              )}
            </div>

            {/* Image conservée */}
            <div className="relative h-64 min-h-[350px] sm:h-80 lg:h-full">
              <img
                src={CONTACT_IMG}
                alt={lang === 'fr' ? "Une élève accompagnée de sa maman" : "A student with her mother"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-600/60 via-transparent lg:bg-gradient-to-r lg:from-brand-600 lg:to-transparent" />
            </div>

          </div>

          {/* Informations générales en bas */}
          <div className="bg-brand-700/80 px-8 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-brand-100">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-400" />
              <span>{lang === 'fr' ? 'Contact direct :' : 'Direct contact:'}</span>
              <a 
                href="mailto:info@claristudent.com" 
                className="font-bold text-white underline hover:text-gold-300"
              >
                info@claristudent.com
              </a>
            </div>
            <div>
              <span>{lang === 'fr' ? 'Claristudent — Tous droits réservés' : 'Claristudent — All rights reserved'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}