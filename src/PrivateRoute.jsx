import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        toast.warn("Você precisa estar logado para acessar essa página!");
        return <Navigate to="/login" replace />;
      }
    
    return children;
}

export default PrivateRoute;