import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';

// Chargement différé des composants
const Home = React.lazy(() => import('./pages/Home'));

const Connexion = React.lazy(() => import('./pages/Connexion'));

function App() {
  return (
    <Suspense fallback={<h1>Chargement...</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/connexion' element={<Connexion />}/>
      </Routes>
    </Suspense>
  );
}

export default App;
