import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Startsida from './pages/Startsida';
import ModulSida from './pages/ModulSida';
import AdminFelrapporter from './pages/AdminFelrapporter';
import BrakProcentModule    from './components/BrakProcentModule';
import GeometriModule      from './components/GeometriModule';
import StatistikModule     from './components/StatistikModule';
import AlgebraModule       from './components/AlgebraModule';
import TaluppfattningModule from './components/TaluppfattningModule';
import { MODULER } from './data/moduler';
import { UPPGIFTER as BRAK_UPPGIFTER } from './data/brakProcent';
import { hämtaFramsteg, sparaFramsteg, hämtaKombineratFramsteg } from './utils/progress';

// Mappning modulId → uppgiftsdata (för generiska moduler)
const MODUL_UPPGIFTER = {
  'brak-procent': BRAK_UPPGIFTER,
};

function App() {
  const [aktivModulId, setAktivModulId] = useState(null);
  const [framsteg, setFramsteg] = useState(() => hämtaKombineratFramsteg());
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const uppdateraHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', uppdateraHash);
    return () => window.removeEventListener('hashchange', uppdateraHash);
  }, []);

  // Re-read combined progress every time the user returns to the home screen,
  // because adaptiveEngine modules write directly to their own localStorage keys
  // without touching the framsteg state in App.
  useEffect(() => {
    if (!aktivModulId) {
      setFramsteg(hämtaKombineratFramsteg());
    }
  }, [aktivModulId]);

  const aktivModul = MODULER.find((m) => m.id === aktivModulId);

  const hanteraFramsteg = useCallback((nytt) => {
    setFramsteg(nytt);
    sparaFramsteg(nytt);
  }, []);

  function renderModul() {
    if (aktivModulId === 'brak-procent') {
      return <BrakProcentModule key="brak-procent" modul={aktivModul} />;
    }
    if (aktivModulId === 'geometri-matning') {
      return <GeometriModule key="geometri-matning" modul={aktivModul} />;
    }
    if (aktivModulId === 'statistik-sannolikhet') {
      return <StatistikModule key="statistik-sannolikhet" modul={aktivModul} />;
    }
    if (aktivModulId === 'algebra-monster') {
      return <AlgebraModule key="algebra-monster" modul={aktivModul} />;
    }
    if (aktivModulId === 'taluppfattning-aritmetik') {
      return <TaluppfattningModule key="taluppfattning-aritmetik" modul={aktivModul} />;
    }
    return (
      <ModulSida
        key={aktivModulId}
        modul={aktivModul}
        uppgifter={MODUL_UPPGIFTER[aktivModulId] ?? {}}
        framsteg={framsteg}
        onFramstegUppdatera={hanteraFramsteg}
      />
    );
  }

  // Dold admin-vy — nås via URL-hash #admin
  if (hash === '#admin') {
    return <AdminFelrapporter />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        modulNamn={aktivModul?.namn}
        onHem={() => setAktivModulId(null)}
      />

      {!aktivModulId ? (
        <Startsida
          framsteg={framsteg}
          onVäljModul={(id) => setAktivModulId(id)}
        />
      ) : (
        renderModul()
      )}
    </div>
  );
}

export default App;
