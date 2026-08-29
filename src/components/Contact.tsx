import { useState } from 'react';
import { Mail, Shield, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'info@claristudent.com',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Enregistrement dans Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            department: formData.department,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      // 2. Envoi de l'e-mail via EmailJS
      const templateParams = {
        to_email: formData.department,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        message: formData.message,
      };

      await emailjs.send(
        'service_vr79fs',
        'd2cvwkv',
        templateParams,
        'd1xr1YKcAhuN2iVIh'
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', department: 'info@claristudent.com', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error('Erreur:', err);
      setErrorMsg('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            Contactez-nous
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Une question ? Une collaboration ? <br />
            <span style={{ color: '#3053C2' }}>Écrivez-nous directement</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Choisissez le service concerné ou envoyez-nous un message grâce au formulaire ci-dessous.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Adresses e-mails par service */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Informations Générales</h3>
                <p className="text-sm text-slate-500 mb-2">Pour toutes vos questions courantes et renseignements.</p>
                <a href="mailto:info@claristudent.com" className="text-sm font-semibold text-brand-600 hover:underline">
                  info@claristudent.com
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Administration & Fondateur</h3>
                <p className="text-sm text-slate-500 mb-2">Pour les partenariats, propositions et la direction.</p>
                <a href="mailto:admin@claristudent.com" className="text-sm font-semibold text-brand-600 hover:underline">
                  admin@claristudent.com
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Support Technique</h3>
                <p className="text-sm text-slate-500 mb-2">Pour signaler un problème technique ou obtenir de l'aide.</p>
                <a href="mailto:support@claristudent.com" className="text-sm font-semibold text-brand-600 hover:underline">
                  support@claristudent.com
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de message */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-900">Message bien reçu !</h3>
                <p className="text-slate-600">
                  Merci de nous avoir contactés. Votre message a bien été envoyé et enregistré.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
                    <AlertCircle className="h-5 w-5 flex-none" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Votre nom complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Nom et Prénom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Votre adresse e-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="exemple@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service à contacter</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="info@claristudent.com">Informations Générales (info@claristudent.com)</option>
                    <option value="admin@claristudent.com">Administration / Direction (admin@claristudent.com)</option>
                    <option value="support@claristudent.com">Support Technique (support@claristudent.com)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Votre message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}