import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup, signOut} from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: "1:428313190593:web:e007b07965a6d4352a3440",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export async function register({email, password}) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(result => result.user)
    .catch(console.error); // 에거라 뜨면 콘솔창에 에러 띄우기 (요소가 error이므로 함수의 형태를 하지 않고 그냥 error도 가능)
}

export async function loginWithGithub() {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
    .then(result => result.user)
    .catch(console.error);
}

export async function logout() {
    return signOut(auth).then(() => null).catch(console.error);
}