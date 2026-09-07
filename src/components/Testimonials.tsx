import { useState, useEffect, useRef } from 'react';
import { Bell, ShieldCheck, Zap, Star, Quote, Send, CheckCircle2, MessageSquarePlus, Lightbulb } from 'lucide-react';
import { Language } from '../translations';
import { supabase } from '../lib/supabase';

interface TestimonialsProps {
  lang: Language;
}

interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  feedback_reason?: string;
  suggestions?: string;
  is_approved?: string;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const BADGES = [
    { icon: Bell, label: lang === 'fr' ? 'Alertes en temps réel' : 'Real-time alerts' },
    { icon: ShieldCheck, label: lang === 'fr' ? '100% Confidentiel et Sécurisé' : '100% Confidential & Secure' },
    { icon: Zap, label: lang === 'fr' ? 'Installation instantanée' : 'Instant installation' },
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [gender, setGender] = useState<'male' | 'female' | 'neutral'>('neutral');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    feedback_reason: '',
    suggestions: '',
  });

  // Charger les avis depuis Supabase
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erreur chargement témoignages:', error);
        } else if (data) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Erreur:', err);
      }
    }

    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;
    if (rating <= 3 && !formData.feedback_reason.trim()) return;

    // Génération de l'avatar selon le genre choisi
    const seed = encodeURIComponent(formData.name);
    const avatarStyle = gender === 'male' ? 'adventurer' : gender === 'female' ? 'avataaars' : 'micah';
    const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}`;

    const newTestimonial: Testimonial = {
      quote: formData.quote,
      name: formData.name,
      role: formData.role || (lang === 'fr' ? "Parent d'élève" : "Student parent"),
      rating: rating,
      avatar: avatarUrl,
      feedback_reason: rating <= 3 ? formData.feedback_reason : undefined,
      suggestions: rating <= 3 ? (formData.suggestions || undefined) : undefined,
      is_approved: 'approved',
    };

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([newTestimonial])
        .select();

      if (error) {
        console.error("Erreur d'insertion Supabase:", error);
      } else if (data) {
        setTestimonials([data[0], ...testimonials]);
      }
    } catch (err) {
      console.error('Erreur:', err);
    }

    setSubmitted(true);
    setFormData({ name: '', role: '', quote: '', feedback_reason: '', suggestions: '' });
    setRating(5);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3500);
  };

  return (
    <section className="bg-slate-50 relative overflow-hidden py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-6">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-slate-700">{badge.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            {lang === 'fr' ? 'Adoré par les parents' : 'Loved by parents'}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {lang === 'fr' ? 'Ce que disent les parents.' : 'What parents say.'}
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            {lang === 'fr' 
              ? "Des milliers de familles font confiance à Claristudent pour rester proches de l'éducation de leurs enfants."
              : "Thousands of families trust Claristudent to stay close to their children's education."}
          </p>

          {/* BOUTON FLOTTANT ET ÉLÉGANT */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40 active:translate-y-0"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                <MessageSquarePlus className="h-4 w-4 text-white" />
              </span>
              <span>
                {showForm 
                  ? (lang === 'fr' ? 'Fermer le formulaire' : 'Close form') 
                  : (lang === 'fr' ? 'Partager votre avis' : 'Share your review')}
              </span>
            </button>
          </div>
        </div>

        {/* Formulaire d'avis */}
        {showForm && (
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl animate-fadeIn">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-14 w-14 text-green-500 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'fr' ? 'Merci ! Votre avis est en ligne.' : 'Thank you! Your review is live.'}
                </h3>
                <p className="text-sm text-slate-600">
                  {lang === 'fr' 
                    ? 'Il est désormais visible par tous tout en haut du scroll box.'
                    : 'It is now visible to everyone at the top of the feed.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900">
                    {lang === 'fr' ? "Donnez votre avis sur l'application" : 'Rate our application'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'fr' ? 'Partagez votre expérience avec la communauté' : 'Share your experience with the community'}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 py-2">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {lang === 'fr' ? 'Votre note' : 'Your rating'}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            (hoverRating || rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Choix du genre pour l'avatar */}
                <div className="flex flex-col items-center gap-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-600">
                    {lang === 'fr' ? "Style d'avatar (Genre)" : 'Avatar Style (Gender)'}
                  </span>
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${gender === 'female' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {lang === 'fr' ? 'Féminin' : 'Female'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${gender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {lang === 'fr' ? 'Masculin' : 'Male'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('neutral')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${gender === 'neutral' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {lang === 'fr' ? 'Neutre' : 'Neutral'}
                    </button>
                  </div>
                </div>

                {/* CONDITION SI NOTE <= 3 ÉTOILES (Obligatoire) */}
                {rating <= 3 && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-4 animate-fadeIn">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-amber-900">
                        {lang === 'fr' 
                          ? "Auriez-vous la courtoisie de nous expliquer ce qui n'a pas été à la hauteur ? (Obligatoire)" 
                          : "Would you mind explaining what fell short? (Required)"}
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder={lang === 'fr' ? "Précisez ce qui a motivé cette note..." : "Please specify what motivated this rating..."}
                        value={formData.feedback_reason}
                        onChange={(e) => setFormData({ ...formData, feedback_reason: e.target.value })}
                        className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-amber-200/60">
                      <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-xs">
                        <Lightbulb className="h-4 w-4 shrink-0 text-amber-600" />
                        <span>{lang === 'fr' ? "Vos suggestions d'amélioration (Optionnel)" : "Your suggestions for improvement (Optional)"}</span>
                      </div>
                      <input
                        type="text"
                        placeholder={lang === 'fr' ? "Ex: Ajouter une option de bulletin PDF..." : "Ex: Add PDF report card option..."}
                        value={formData.suggestions}
                        onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                        className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'fr' ? 'Nom et Prénom' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Marie T."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'fr' ? 'Votre profil / Rôle' : 'Your profile / Role'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'fr' ? "Ex: Parent d'élève en 4ème" : "Ex: 8th grade parent"}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'fr' ? 'Votre commentaire' : 'Your comment'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder={lang === 'fr' ? "Qu'est-ce qui vous plaît le plus dans Claristudent ?" : "What do you like most about Claristudent?"}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  {lang === 'fr' ? 'Publier mon avis' : 'Publish review'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* SCROLL BOX FIXE */}
        <div
          ref={scrollContainerRef}
          className="mt-12 max-h-[520px] overflow-y-auto pr-3"
          style={{ scrollbarWidth: 'thin' }}
        >
          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              {lang === 'fr' ? 'Aucun avis pour le moment. Soyez le premier à partager le vôtre !' : 'No reviews yet. Be the first to share yours!'}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3 pb-4">
              {testimonials.map((t, index) => (
                <figure
                  key={t.id || index}
                  className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-md h-full"
                >
                  <Quote className="h-8 w-8 text-blue-200 shrink-0" fill="currentColor" />
                  <blockquote className="mt-3 flex-1 text-slate-600 leading-relaxed text-sm">
                    « {t.quote} »
                  </blockquote>

                  {/* Affichage de la raison si note <= 3 */}
                  {t.feedback_reason && (
                    <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                      <span className="font-bold">{lang === 'fr' ? "Retour d'expérience :" : "Feedback:"}</span> {t.feedback_reason}
                    </div>
                  )}

                  {/* Affichage de la suggestion si présente */}
                  {t.suggestions && (
                    <div className="mt-2 rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900">
                      <span className="font-bold">{lang === 'fr' ? 'Suggestion :' : "Suggestion:"}</span> {t.suggestions}
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < (t.rating || 5) ? 'fill-current' : 'text-slate-200 fill-slate-100'}`}
                      />
                    ))}
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover bg-slate-50 border border-slate-100 shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}