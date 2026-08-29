import { useReveal } from '../hooks/useReveal';
import {
  LineChart,
  MessagesSquare,
  ShieldCheck,
  Bell,
  CalendarCheck,
  Smartphone,
} from 'lucide-react';

const ABOUT_IMG = '/IMAGE7.jpeg';
const ABOUT_IMG_2 = '/IMAGE8.jpeg';

const FEATURES = [
  {
    icon: LineChart,
    title: 'Notes en temps réel',
    description:
      'Ne découvrez plus les résultats de votre enfant des semaines plus tard. Consultez-les dès leur publication.',
  },
  {
    icon: MessagesSquare,
    title: 'Suivi des absences et retards',
    description:
      "Soyez informé dès qu'une absence ou un retard est enregistré, sans attendre le bulletin.",
  },
  {
    icon: ShieldCheck,
    title: 'Suivi disciplinaire',
    description:
      'Accédez aux sanctions et informations disciplinaires concernant votre enfant, en toute transparence.',
  },
  {
    icon: Bell,
    title: 'Informations financières claires',
    description:
      'Suivez la situation financière de la scolarité de votre enfant à tout moment.',
  },
  {
    icon: CalendarCheck,
    title: 'Un seul compte, tous vos enfants',
    description:
      'Suivez la scolarité de chacun de vos enfants depuis un seul et même compte.',
  },
  {
    icon: Smartphone,
    title: 'Vos données protégées',
    description:
      "Chaque parent n'accède qu'aux informations de son propre enfant. Confidentialité garantie.",
  },
];

export default function About() {
  const { ref: imgRef, visible: imgVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <>
      {/* À propos */}
      <section id="about" className="section-py bg-slate-50">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div ref={imgRef} className={`reveal ${imgVisible ? 'is-visible' : ''} relative`}>
              <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-200/60">
                <img
                  src={ABOUT_IMG}
                  alt="Un enseignant interagit avec des élèves dans une salle de classe lumineuse"
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-6 -right-2 hidden w-52 overflow-hidden rounded-2xl border-4 border-white shadow-card sm:block lg:-bottom-8 lg:-right-6 lg:w-64">
                <img
                  src={ABOUT_IMG_2}
                  alt="Une élève souriante dans une salle de classe lumineuse"
                  className="h-40 w-full object-cover lg:h-48"
                  loading="lazy"
                />
              </div>
              <div className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl bg-gold-400/20 blur-2xl" aria-hidden="true" />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                Notre mission
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Un pont numérique entre l'école et la famille.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Un parent ne devrait jamais être le dernier à savoir comment évolue la scolarité de son enfant. Claristudent donne aux familles camerounaises un accès clair aux notes, absences, retards, sanctions et informations financières de leurs enfants, en toute simplicité.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Plus de surprises en fin de trimestre : suivez les résultats et l'assiduité au fil du trimestre.",
                  "Un accès pensé pour le secondaire camerounais, en français comme en anglais.",
                  "Chaque parent ne voit que les informations de son propre enfant : accès sécurisé et confidentiel.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-600 text-white">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="features" className="section-py bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
              Fonctionnalités
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              L'école, sans zones d'ombre.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Les informations essentielles sur la scolarité de votre enfant, claires et accessibles à tout moment.
            </p>
          </div>

          <div
            ref={gridRef}
            className={`reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
              gridVisible ? 'is-visible' : ''
            }`}
          >
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-glow"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}