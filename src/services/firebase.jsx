import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig ={
    apiKey: "AIzaSyClgTjBWs9kmW9wQv9h0o6yKfMgreEw47Q",
    authDomain: "prime-flix-2c59e.firebaseapp.com",
    projectId: "prime-flix-2c59e",
    storageBucket: "prime-flix-2c59e.firebasestorage.app",
    messagingSenderId: "915795350522",
    appId: "1:915795350522:web:86442831e99c72ddbd8a43",
    measurementId: "G-DWD64FLM8C" 
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db, auth, provider };