import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyALA3gHOENX7tEE8ZoykkyXlFRShunGm9U",
	authDomain: "todo-demo-78409.firebaseapp.com",
	projectId: "todo-demo-78409",
	storageBucket: "todo-demo-78409.appspot.com",
	messagingSenderId: "573310261477",
	appId: "1:573310261477:web:4f08677bc4f902b3321c0c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
