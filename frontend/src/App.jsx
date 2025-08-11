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
const Dashbord = React.lazy(() => import('./pages/backoffice/Dashbord'));
const UserProfile = React.lazy(() => import('./pages/backoffice/UserProfile'));
const LogOut = React.lazy(() => import('./pages/backoffice/LogOut'));
// backoffice-project
const ProjectPage = React.lazy(() => import('./pages/backoffice/project/ProjectPage'));
const ProjectCreate = React.lazy(() => import('./pages/backoffice/project/CreateProject'));

function App() {
  return (
    <Suspense fallback={<LodingPage />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/connexion' element={<Connexion />}/>

        {/* Route protégé */}
        <Route path='/dashboard' element={<PrivateRoute> <Dashbord /> </PrivateRoute>}/>
        <Route path='/myProfil' element={<PrivateRoute> <UserProfile/> </PrivateRoute>}/>
        <Route path='/logout' element={<PrivateRoute> <LogOut/> </PrivateRoute>}/>
        {/* Route Protégé projet */}
        <Route path='/projectBord' element={<PrivateRoute> <ProjectPage/> </PrivateRoute>} />
        <Route path='/projectCreate' element={<ProjectPage> <ProjectCreate/> </ProjectPage>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
