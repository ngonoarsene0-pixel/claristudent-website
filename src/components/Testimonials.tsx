import { useReveal } from '@/hooks/useReveal';
import { Bell, ShieldCheck, Zap, Star, Quote } from 'lucide-react';

const BADGES = [
  { icon: Bell, label: 'Alertes en temps réel' },
  { icon: ShieldCheck, label: '100% Confidentiel et Sécurisé' },
  { icon: Zap, label: 'Installation instantanée' },
];

const TESTIMONIALS = [
  {
    quote:
      "Avant, je découvrais les notes de mon fils des semaines plus tard. Avec Claristudent, je les vois le jour même. Les alertes en temps réel me donnent une vraie tranquillité d'esprit.",
    name: 'Amara N.',
    role: "Parent d'un élève de 5ème",
    avatar: 'https://images.pexels.com/photos/7352890/pexels-photo-7352890.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote:
      "En tant que mère qui travaille, je ne peux pas toujours être à l'école. Claristudent me permet d'écrire directement à son enseignant et de savoir qu'il est en classe chaque jour. Ça a tout changé pour nous.",
    name: 'Grace M.',
    role: "Parent d'un élève de CM1",
    avatar: 'https://images.pexels.com/photos/8054844/pexels-photo-8054844.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote:
      "L'application est si simple que mon mari et moi l'utilisons tous les deux. On reçoit une notification dès qu'il y a une annonce ou un résultat de contrôle. Plus de surprises lors de la réunion parents-enseignants.",
    name: 'Daniel K.',
    role: 'Parent de jumeaux au lycée',
    avatar: 'https://images.pexels.com/photos/8055801/pexels-photo-8055801.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal();

  return (
    <section className="section-py bg-slate-50">
      <div className="container-px">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-6">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-soft"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-slate-700">{badge.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            Adoré par les parents
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ce que disent les parents.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Des milliers de familles font confiance à Claristudent pour rester proches de l'éducation de leurs enfants.
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal mt-14 grid gap-6 md:grid-cols-3 ${visible ? 'is-visible' : ''}`}
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <Quote className="h-8 w-8 text-brand-200" fill="currentColor" />
              <blockquote className="mt-3 flex-1 text-slate-600 leading-relaxed">
                « {t.quote} »
              </blockquote>
              <div className="mt-6 flex items-center gap-1 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
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
      </div>
    </section>
  );
}
