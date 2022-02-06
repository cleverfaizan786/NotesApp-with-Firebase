import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4H1LmCfXpugWfqeokgT9ejkU5QEUT3L4",
  authDomain: "notesapp-a86fd.firebaseapp.com",
  projectId: "notesapp-a86fd",
  storageBucket: "notesapp-a86fd.appspot.com",
  messagingSenderId: "848294042733",
  appId: "1:848294042733:web:c759e10aef62c6a3c2b364",
  measurementId: "G-59R919H5DS",
};

const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore(app);

export { auth, db }
