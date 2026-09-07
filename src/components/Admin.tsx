import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, ArrowLeft, RefreshCw, Lock, Users, Download as DownloadIcon } from 'lucide-react';

interface AdminProps {
  onExit?: () => void;
}

export default function Admin({ onExit }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [password2Input, setPassword2Input] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [downloadCount, setDownloadCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    checkAdminSetup();
  }, []);

  const checkAdminSetup = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_config')
        .select('admin_password');

      if (error || !data || data.length < 2) {
        setIsConfiguring(true);
      }
    } catch (err) {
      console.error('Erreur vérification admin:', err);
      setIsConfiguring(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupPasswords = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim() || !password2Input.trim()) {
      alert('Veuillez remplir les deux mots de passe.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('admin_config')
        .insert([
          { admin_password: passwordInput },
          { admin_password: password2Input }
        ]);

      if (error) {
        alert('Erreur lors de l\'enregistrement : ' + error.message);
      } else {
        alert('Mots de passe administrateurs enregistrés avec succès !');
        setIsConfiguring(false);
        setPasswordInput('');
        setPassword2Input('');
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('admin_config')
        .select('admin_password');

      if (error || !data || data.length === 0) {
        alert('Aucun administrateur configuré.');
        setIsConfiguring(true);
        return;
      }

      const matchFound = data.some((row) => row.admin_password === passwordInput);

      if (matchFound) {
        setIsAuthenticated(true);
        fetchStats();
      } else {
        alert('Mot de passe incorrect.');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const { count: downloads, error: downloadError } = await supabase
        .from('app_downloads')
        .select('*', { count: 'exact', head: true });

      if (!downloadError) setDownloadCount(downloads || 0);

      const { count: subs, error: subError } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true });

      if (!subError) setSubscriptionCount(subs || 0);

    } catch (err) {
      console.error('Erreur chargement stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleReturnToSite = () => {
    if (onExit) {
      onExit();
    } else {
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-slate-600 text-sm font-medium animate-pulse">Chargement de la sécurité...</p>
      </div>
    );
  }

  if (isConfiguring) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-12">
        <form onSubmit={handleSetupPasswords} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#3053C2]">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1 text-center text-slate-900">Configuration Initiale</h2>
          <p className="text-sm text-slate-500 mb-6 text-center">Définissez les deux mots de passe administrateurs sécurisés.</p>
          
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Mot de passe Admin 1</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3053C2]"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Mot de passe Admin 2</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password2Input}
              onChange={(e) => setPassword2Input(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3053C2]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3053C2] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Enregistrer les accès
          </button>
        </form>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-12">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#3053C2]">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1 text-center text-slate-900">Administration</h2>
          <p className="text-sm text-slate-500 mb-6 text-center">Entrez l'un des mots de passe administrateur.</p>
          
          <input
            type="password"
            placeholder="Mot de passe sécurisé"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#3053C2]"
          />
          <button
            type="submit"
            className="w-full bg-[#3053C2] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-500/20 cursor-pointer mb-3"
          >
            Se connecter
          </button>
          
          <button
            type="button"
            onClick={handleReturnToSite}
            className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au site principal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Tableau de bord Admin</h1>
            <p className="text-sm text-slate-500 mt-0.5">Gestion sécurisée des statistiques en temps réel.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={fetchStats}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition text-sm font-semibold cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${statsLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
            <button
              onClick={handleReturnToSite}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#3053C2] text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-semibold shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Quitter l'admin
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-[#3053C2]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Téléchargements</h3>
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3053C2]">
                <DownloadIcon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-slate-900">
              {statsLoading ? '...' : downloadCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Abonnés</h3>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-slate-900">
              {statsLoading ? '...' : subscriptionCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}