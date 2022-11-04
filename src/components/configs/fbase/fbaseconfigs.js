// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt8oaE7U9hxt9V3c1xLG9mrcWOPnsgA-A",
  authDomain: "itlabsproject.firebaseapp.com",
  projectId: "itlabsproject",
  storageBucket: "itlabsproject.appspot.com",
  messagingSenderId: "729705602482",
  appId: "1:729705602482:web:185ccd4ecd1aa5af7ed8ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app