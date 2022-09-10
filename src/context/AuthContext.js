import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

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
			console.log(`${doc.id} => ${doc.data().heading}`);
			newTodo.push({
				id: doc.id,
				heading: doc.data().heading,
				isFinished: doc.data().isFinished,
			});
		});
		setTodoList(newTodo);
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
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
