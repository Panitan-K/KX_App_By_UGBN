import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA_1IioycTvR59hp-kJhRHj1ZZzLNXfyBU",
  authDomain: "kx-techbite-club.firebaseapp.com",
  projectId: "kx-techbite-club",
  storageBucket: "kx-techbite-club.appspot.com",
  messagingSenderId: "167410350669",
  appId: "1:167410350669:web:87fbb81fcb0bad2b12ba04",
  measurementId: "G-BHL0R6GMHJ"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export { app, db, auth, storage, storageRef };