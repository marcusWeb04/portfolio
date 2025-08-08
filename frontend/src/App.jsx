import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import PrivateRoute from './components/route/PrivateRoute';
import './App.css';

// loading page
const LodingPage = React.lazy(() => import('./pages/loading/LoadingPage'));

// Chargement différé des composants
// public
const Home = React.lazy(() => import('./pages/public/Home'));

// connexion
const Connexion = React.lazy(() => import('./pages/backoffice/Connexion'));

// backoffice
const UserProfile = React.lazy(() => import('./pages/backoffice/UserProfile'));

function App() {
  return (
    <Suspense fallback={<LodingPage />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/connexion' element={<Connexion />}/>

        <Route path='/myProfil' element={<PrivateRoute> <UserProfile/> </PrivateRoute>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
