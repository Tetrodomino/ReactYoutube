import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup,
    updateProfile, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: "1:428313190593:web:e007b07965a6d4352a3440",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// 유저 등록
export function register({email, password, name, photo}) {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    })
    .then(() => {logout()}) // 등록 후 로그아웃시키기
    .catch(console.error); // 에러가 뜨면 콘솔창에 에러 띄우기 (요소가 error이므로 함수의 형태를 하지 않고 그냥 error도 가능)
}

export function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
        .catch(console.error);
}

export function loginWithGithub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
    signOut(auth).catch(console.error);
}
export function onUserStateChanged(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}