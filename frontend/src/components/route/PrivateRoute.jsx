import { Navigate } from 'react-router';
import { checkAuth } from '../../service/requestUser';
import { useEffect, useState } from 'react';
import LoadingPage from '../../pages/loading/LoadingPage';

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const result = await checkAuth();
      setIsAuthenticated(!!result);
    };
    fetchAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingPage/>;
  }

  return isAuthenticated ? children : <Navigate to="/connexion" />;
}
