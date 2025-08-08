// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router';
import { checkAuth } from '../../service/requestUser';

export default function PrivateRoute({ children }) {
  const { user, loading } = checkAuth();

  if (loading) return <p>Chargement...</p>;

  return user ? children : <Navigate to="/connexion" />;
}
