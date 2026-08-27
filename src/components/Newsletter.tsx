import { useState, type FormEvent } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const NEWSLETTER_IMG =
  'https://images.pexels.com/photos/5212683/pexels-photo-5212683.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function Newsletter() {
  const { ref, visible } = useReveal();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase.from('subscribers').insert([{ email: trimmed }]);

      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setMessage("Vous êtes déjà inscrit — merci de faire partie de Claristudent !");
        } else {
          setStatus('error');
          setMessage('Une erreur est survenue. Veuillez réessayer dans un instant.');
        }
        return;
      }

      setStatus('success');
      setMessage('Vous êtes inscrit ! Surveillez votre boîte de réception pour les actualités de Claristudent.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Erreur réseau. Vérifiez votre connexion et réessayez.');
    }
  };

  return (
    <section id="newsletter" className="section-py bg-white">
      <div className="container-px">
        <div
          ref={ref}
          className={`reveal overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-glow ${visible ? 'is-visible' : ''}`}
        >
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Mail className="h-3.5 w-3.5" />
                Newsletter
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Restez informé avec Claristudent.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                Recevez les mises à jour du produit, des conseils parentaux et des ressources
                éducatives directement dans votre boîte de réception. Pas de spam — juste du
                contenu utile et pertinent.
              </p>

              <form onSubmit={handleSubmit} className="mt-8" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== 'idle') setStatus('idle');
                      }}
                      placeholder="vous@exemple.com"
                      aria-label="Adresse e-mail"
                      required
                      className="w-full rounded-full border-0 bg-white py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 shadow-soft outline-none ring-2 ring-transparent transition focus:ring-gold-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-all duration-300 hover:bg-gold-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    {status === 'loading' ? 'Inscription...' : "S'inscrire"}
                  </button>
                </div>

                {status === 'success' && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-medium text-gold-200">
                    <CheckCircle2 className="h-5 w-5 flex-none" />
                    {message}
                  </p>
                )}
                {status === 'error' && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-medium text-red-200">
                    <AlertCircle className="h-5 w-5 flex-none" />
                    {message}
                  </p>
                )}
                {status === 'idle' && message && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-100">
                    {message}
                  </p>
                )}
              </form>

              <p className="mt-4 text-xs text-brand-200">
                En vous inscrivant, vous acceptez de recevoir des e-mails de Claristudent. Désabonnement à tout moment.
              </p>
            </div>

            <div className="relative hidden h-full min-h-[320px] lg:block">
              <img
                src={NEWSLETTER_IMG}
                alt="Une élève joyeuse qui écrit dans une salle de classe"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-800/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}