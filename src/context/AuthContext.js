import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(false);
		}
	});

	const value = {
		currentUser,
		setCurrentUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
