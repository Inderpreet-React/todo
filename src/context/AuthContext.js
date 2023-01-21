import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
	doc,
	updateDoc,
	deleteDoc,
	setDoc,
	getDoc,
	deleteField,
} from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(false);
	const [todoList, setTodoList] = useState(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(false);
		}
	});

	async function fetchTodoList() {
		const newTodo = {};
		const docRef = doc(db, "todo", currentUser.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const todoData = { ...docSnap.data() };
			delete todoData["joiningDate"];
			console.log(todoData);
			if (Object.keys(todoData).length > 0) {
				console.log(todoData);
				for (const [key, value] of Object.entries(todoData)) {
					console.log(key, value);
					newTodo[key] = value;
				}
				setTodoList(newTodo);
			} else {
				console.log("empty list");
				setTodoList(false);
			}
		} else {
			setTodoList(false);
			return;
		}
	}

	async function isFinishedupdate(id, isFinished) {
		const todoRef = doc(db, "todo", currentUser.uid);
		const updatedData = { [id]: isFinished };
		try {
			await updateDoc(todoRef, updatedData);
		} catch (e) {
			console.log(e);
		}
	}

	async function updateHeading(heading) {
		const docRef = doc(db, "todo", currentUser.uid);
		try {
			await setDoc(docRef, { [heading]: false }, { merge: true });
		} catch (e) {
			console.log(e);
		} finally {
			fetchTodoList();
		}
	}

	async function deleteTodo(id) {
		const todoRef = doc(db, "todo", currentUser.uid);
		try {
			await updateDoc(todoRef, { [id]: deleteField() });
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (currentUser) {
			fetchTodoList();
		} else {
			setTodoList([]);
		}
	}, [currentUser, setTodoList]);

	const value = {
		currentUser,
		setCurrentUser,
		todoList,
		setTodoList,
		fetchTodoList,
		isFinishedupdate,
		updateHeading,
		deleteTodo,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
