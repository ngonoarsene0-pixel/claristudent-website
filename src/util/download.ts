import { supabase } from '../lib/supabase';

export const handleAppDownload = async () => {
  const hasDownloaded = localStorage.getItem('clari_student_downloaded');

  // Si l'appareil n'a jamais enregistré de téléchargement dans le localStorage
  if (!hasDownloaded) {
    try {
      await supabase
        .from('app_downloads')
        .upsert(
          [{ device_info: navigator.userAgent }],
          { onConflict: 'device_info' }
        );
      
      // On marque cet appareil comme "déjà comptabilisé"
      localStorage.setItem('clari_student_downloaded', 'true');
    } catch (err) {
      console.error('Erreur lors du suivi du téléchargement :', err);
    }
  }

  // Le téléchargement s'exécute toujours normalement pour l'utilisateur
  const link = document.createElement('a');
  link.href = 'https://drive.google.com/uc?export=download&id=1SwkomAfh_qlf4QLg9-Mxo6yPiPoNWfy1';
  link.download = 'Claristudent.apk';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};