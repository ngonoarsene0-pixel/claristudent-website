import { useReveal } from '../hooks/useReveal';
import {
  LineChart,
  MessagesSquare,
  ShieldCheck,
  Bell,
  CalendarCheck,
  Smartphone,
} from 'lucide-react';

const ABOUT_IMG =
  'https://images.pexels.com/photos/8197535/pexels-photo-8197535.jpeg?auto=compress&cs=tinysrgb&w=1000';
const ABOUT_IMG_2 =
  'https://images.pexels.com/photos/5211472/pexels-photo-5211472.jpeg?auto=compress&cs=tinysrgb&w=600';

const FEATURES = [
  {
    icon: LineChart,
    title: 'Notes et présence en temps réel',
    description:
      "Consultez les notes et la présence de votre enfant dès leur enregistrement. Fini l'attente des bulletins.",
  },
  {
    icon: MessagesSquare,
    title: 'Discussion fluide parent-enseignant',
    description:
      "Échangez directement avec les enseignants dans l'application. Posez vos questions, partagez des nouvelles et suivez les progrès ensemble.",
  },
  {
    icon: ShieldCheck,
    title: '100% sécurité des données',
    description:
      "Les informations de votre famille sont chiffrées de bout en bout et jamais partagées. La confidentialité est intégrée dès la conception.",
  },
  {
    icon: Bell,
    title: 'Alertes instantanées',
    description:
      "Recevez des notifications pour les absences, les notes, les annonces et les événements scolaires — au moment où ils se produisent.",
  },
  {
    icon: CalendarCheck,
    title: 'Calendrier et emploi du temps',
    description:
      "Visualisez les contrôles, les devoirs et les vacances dans un calendrier clair pour ne jamais manquer une échéance.",
  },
  {
    icon: Smartphone,
    title: 'Conçu pour les parents occupés',
    description:
      "Une interface simple et conviviale, pensée pour les parents — pas pour les administrateurs. Prêt en moins de deux minutes.",
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
                  className="h-[360px] w-full object-cover sm:h-[440px]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-card sm:block lg:-right-8 lg:w-52">
                <img
                  src={ABOUT_IMG_2}
                  alt="Une élève souriante dans une salle de classe lumineuse"
                  className="h-32 w-full object-cover lg:h-40"
                  loading="lazy"
                />
              </div>
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-2xl bg-gold-400/20 blur-2xl" aria-hidden="true" />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                À propos de Claristudent
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Créé par des parents, pour des parents qui veulent l'esprit tranquille.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Claristudent rapproche la maison et l'école. Nous vous offrons une fenêtre claire et
                en temps réel sur la journée de votre enfant — notes, présence, messages des
                enseignants et annonces de l'école — le tout dans un espace calme et sécurisé.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Plus de surprises en fin de trimestre — suivez les progrès semaine par semaine.",
                  "Messagerie directe et privée avec les enseignants et le personnel scolaire.",
                  "Un chiffrement de niveau bancaire protège les données de votre enfant.",
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
              Tout ce qu'il faut pour rester connecté.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Des outils réfléchis qui vous informent et vous impliquent — sans le bruit.
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
