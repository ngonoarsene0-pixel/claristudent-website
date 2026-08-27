import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

const NEWSLETTER_IMG = '/IMAG10.jpeg';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="section-py bg-white">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 text-white shadow-card">
          <div className="grid items-center lg:grid-cols-2">
            
            {/* Formulaire / Texte */}
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <Mail className="h-3.5 w-3.5" /> Newsletter
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Restez informé avec Claristudent.
              </h2>
              <p className="mt-4 text-base text-brand-100 sm:text-lg">
                Recevez les mises à jour du produit, des conseils parentaux et des ressources éducatives directement dans votre boîte de réception. Pas de spam — juste du contenu utile et pertinent.
              </p>

              {submitted ? (
                <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white backdrop-blur-sm">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-gold-400" />
                  <p className="text-sm font-medium">Merci ! Votre inscription est bien prise en compte.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full rounded-2xl bg-white px-5 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-gold-400"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-2xl bg-gold-400 px-7 py-3.5 font-bold text-slate-900 shadow-lg transition hover:bg-gold-300 active:scale-95"
                  >
                    S'inscrire
                  </button>
                </form>
              )}

              <p className="mt-4 text-xs text-brand-200">
                En vous inscrivant, vous acceptez de recevoir des e-mails de Claristudent. Désabonnement à tout moment.
              </p>
            </div>

            {/* Image IMAG10 */}
            <div className="relative h-64 min-h-[350px] sm:h-80 lg:h-full">
              <img
                src={NEWSLETTER_IMG}
                alt="Une élève accompagnée de sa maman"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-600/60 via-transparent lg:bg-gradient-to-r lg:from-brand-600 lg:to-transparent" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}