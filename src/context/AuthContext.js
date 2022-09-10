import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(false);
	const [todoList, setTodoList] = useState([]);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(false);
		}
	});

	async function fetchTodoList() {
		const newTodo = [];
		const querySnapshot = await getDocs(collection(db, "todo"));
		querySnapshot.forEach((doc) => {
			newTodo.push({
				id: doc.id,
				heading: doc.data().heading,
				isFinished: doc.data().isFinished,
			});
		});
		setTodoList(newTodo);
	}

	async function isFinishedupdate(id, isFinished) {
		const docRef = doc(db, "todo", id);
		const updatedData = { isFinished: isFinished };
		try {
			await updateDoc(docRef, updatedData);
		} catch (e) {
			console.log(e);
		}
	}

	async function updateHeading(id, heading) {
		const docRef = doc(db, "todo", id);
		const updatedData = { heading: heading };
		try {
			await updateDoc(docRef, updatedData);
		} catch (e) {
			console.log(e);
		} finally {
			fetchTodoList();
		}
	}

	async function deleteTodo(id) {
		try {
			await deleteDoc(doc(db, "todo", id));
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
