import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, 
        signInWithPopup, 
        signOut, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth, provider } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, []);

    const login = () => signInWithPopup(auth, provider);
    const logout = () => signOut(auth);
    const register = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    const loginNormal = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loginNormal }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
