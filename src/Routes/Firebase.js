import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCXZoBTQewPYmsbO4RAl7lrvwdbaqNdoo8",
  authDomain: "uphasia.firebaseapp.com",
  projectId: "uphasia",
  storageBucket: "uphasia.appspot.com",
  messagingSenderId: "482459960192",
  appId: "1:482459960192:web:9ef3ebc9c9d9c423be7765",
  measurementId: "G-Z8GC16XP3D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export { app, db, auth, storage, storageRef };