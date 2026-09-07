import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { ChevronDown, HelpCircle, Play, X, Sparkles } from 'lucide-react';
import { Language } from '../translations';

interface FaqProps {
  lang: Language;
}

export default function FAQ({ lang }: FaqProps) {
  const { ref, visible } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const FAQ_ITEMS = [
    {
      question: lang === 'fr'
        ? "Comment puis-je connecter le compte de mon enfant à l'application ?"
        : "How can I connect my child's account to the application?",
      answer: lang === 'fr'
        ? "L'accès à Claristudent se fait via les identifiants fournis directement par l'établissement scolaire partenaire. Une fois l'application téléchargée, il vous suffit de vous connecter avec ces accès pour retrouver instantanément le profil de votre enfant."
        : "Access to Claristudent is provided via credentials issued directly by the partner school. Once the app is downloaded, simply log in with these credentials to instantly access your child's profile."
    },
    {
      question: lang === 'fr'
        ? "L'application Claristudent est-elle payante pour les parents ?"
        : "Is the Claristudent application paid for parents?",
      answer: lang === 'fr'
        ? "Les modalités d'accès dépendent des conventions établies avec l'établissement scolaire de votre enfant. Rapprochez-vous de la direction de l'école pour obtenir tous les détails sur votre formule d'abonnement."
        : "Access terms depend on agreements established with your child's school. Contact the school administration for full details regarding your subscription plan."
    },
    {
      question: lang === 'fr'
        ? "Que faire si je rencontre un problème de connexion ou de mot de passe oublié ?"
        : "What should I do if I encounter a login problem or forgot my password?",
      answer: lang === 'fr'
        ? "Vous pouvez facilement réinitialiser vos accès depuis l'écran de connexion de l'application, ou contacter directement notre support technique via l'adresse support@claristudent.com pour un accompagnement rapide."
        : "You can easily reset your credentials from the app's login screen, or contact our technical support directly at support@claristudent.com for quick assistance."
    },
    {
      question: lang === 'fr'
        ? "Les données scolaires de mon enfant sont-elles sécurisées et confidentielles ?"
        : "Are my child's school data secure and confidential?",
      answer: lang === 'fr'
        ? "Absolument. La sécurité et la confidentialité des informations des élèves sont notre priorité absolue. Toutes les données transmises sont protégées et accessibles uniquement aux parents autorisés et à l'administration de l'école."
        : "Absolutely. Student data security and confidentiality are our absolute priority. All transmitted data is protected and accessible only to authorized parents and the school administration."
    },
    {
      question: lang === 'fr'
        ? "Comment recevoir les alertes de notes et d'absences en temps réel ?"
        : "How can I receive grade and absence alerts in real time?",
      answer: lang === 'fr'
        ? "Il vous suffit d'autoriser les notifications sur votre téléphone lors de la première installation de l'application. Vous recevrez ainsi une alerte instantanée dès qu'une note est saisie ou qu'une absence est signalée."
        : "Simply allow notifications on your phone during the initial app installation. You will then receive an instant alert as soon as a grade is entered or an absence is reported."
    }
  ];

  return (
    <section className="section-py bg-white relative overflow-hidden">
      <div className="container-px max-w-7xl mx-auto">
        
        {/* En-tête de section percutant et professionnel */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <HelpCircle className="h-4 w-4" />
            {lang === 'fr' ? "Centre d'Aide & Accompagnement" : "Help Center & Support"}
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {lang === 'fr' 
              ? "Restez connecté à la réussite de votre enfant, à chaque instant." 
              : "Stay connected to your child's success, every step of the way."}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {lang === 'fr'
              ? "Parce que le suivi de la scolarité doit être simple, transparent et accessible à tous les parents, découvrez nos réponses d'experts et notre guide visuel interactif."
              : "Because school tracking should be simple, transparent, and accessible to all parents, discover our expert answers and interactive visual guide."}
          </p>
        </div>

        {/* Grille principale : FAQ à gauche / Lecteur Vidéo à droite mis à la même dimension */}
        <div
          ref={ref}
          className={`reveal mx-auto mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch ${visible ? 'is-visible' : ''}`}
        >
          
          {/* COLONNE GAUCHE : Bloc Bleu unifié contenant l'accordéon avec hauteur harmonisée */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 text-white shadow-xl relative flex flex-col justify-between overflow-hidden">
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <div>
              <div className="text-sm font-semibold text-blue-100 mb-4 flex items-center gap-2 px-1 relative z-10">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                {lang === 'fr' ? 'Foire Aux Questions' : 'Frequently Asked Questions'}
              </div>

              {/* Conteneur scrollable avec hauteur fixe synchronisée */}
              <div 
                className="space-y-4 relative z-10 max-h-[460px] overflow-y-auto pr-2"
                style={{ scrollbarWidth: 'thin' }}
              >
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-200 hover:border-white/40 shadow-sm"
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-white transition-colors hover:text-blue-200 focus:outline-none"
                      >
                        <span className="pr-4 text-sm sm:text-base">{item.question}</span>
                        <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition-transform duration-200 ${isOpen ? 'rotate-180 bg-amber-400 text-slate-900' : ''}`}>
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="border-t border-white/20 px-6 pb-5 pt-3 text-sm leading-relaxed text-blue-50 animate-in fade-in duration-200 bg-black/10">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 text-xs text-blue-100 text-center relative z-10">
              {lang === 'fr' ? "Consultez l'ensemble de nos rubriques d'aide ci-dessus." : "Browse all of our help topics above."}
            </div>
          </div>

          {/* COLONNE DROITE : Bloc Tutoriel Vidéo harmonisé aux mêmes dimensions */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                {lang === 'fr' ? 'Tutoriel Vidéo Claristudent' : 'Claristudent Video Tutorial'}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {lang === 'fr' ? "Comment bien utiliser l'application ?" : "How to properly use the application?"}
              </h3>
              
              <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
                {lang === 'fr'
                  ? "Regardez notre vidéo de présentation pour découvrir pas à pas le suivi des notes, des absences et des finances scolaires."
                  : "Watch our presentation video to discover step-by-step how to track grades, absences, and school finances."}
              </p>
            </div>

            {/* Miniature de la vidéo avec bouton de lecture au clic */}
            <div className="my-4 relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <div className="aspect-video w-full relative bg-blue-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
                  alt="Aperçu Tutoriel Claristudent" 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/30" />
                
                {/* Bouton Play interactif */}
                <div className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 ml-1 fill-current" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center justify-between">
                  <span>{lang === 'fr' ? '▶️ Démo complète en vidéo' : '▶️ Full video demo'}</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-semibold">
                    {lang === 'fr' ? 'Plein écran' : 'Fullscreen'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/20 text-xs text-blue-100 text-center">
              {lang === 'fr' ? "Besoin d'assistance ? Notre équipe est à votre écoute." : "Need assistance? Our team is listening."}
            </div>

          </div>

        </div>
      </div>

      {/* MODAL VIDÉO PLEIN ÉCRAN (Full Screen avec Croix de retour prononcée) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col">
            
            {/* Barre supérieure avec le titre et le bouton de fermeture (Croix) */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-white/10">
              <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                {lang === 'fr' ? 'Tutoriel Vidéo Officiel - Claristudent' : 'Official Video Tutorial - Claristudent'}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="group flex items-center gap-2 rounded-full bg-white/10 hover:bg-red-600 px-4 py-2 text-white transition-all duration-200 focus:outline-none shadow-lg"
                aria-label={lang === 'fr' ? 'Fermer la vidéo' : 'Close video'}
              >
                <span className="text-xs font-bold hidden sm:inline">
                  {lang === 'fr' ? 'Fermer' : 'Close'}
                </span>
                <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Lecteur vidéo en plein écran immersif (remplacez l'URL src par la vôtre le moment venu) */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Tutoriel Claristudent"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Pied de page de la modale */}
            <div className="p-4 bg-slate-950 text-slate-400 text-center text-xs border-t border-white/10">
              {lang === 'fr' 
                ? 'Appuyez sur la croix rouge en haut à droite pour quitter le mode plein écran.'
                : 'Click the red cross at the top right to exit full screen mode.'}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}