import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function SignUp(props) {
	const email = useRef();
	const password = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const { setCurrentUser } = useAuth();

	async function createNewUserDoc(id) {
		await setDoc(
			doc(db, "todo", id),
			{ joiningDate: Timestamp.now() },
			{ merge: true }
		);
	}

	function submitHandler(e) {
		e.preventDefault();
		setIsLoading(true);
		createUserWithEmailAndPassword(
			auth,
			email.current.value,
			password.current.value
		)
			.then((userCredential) => {
				setCurrentUser(userCredential.user);
				console.log(userCredential.user.uid);
				createNewUserDoc(userCredential.user.uid);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error.errorCode, error.errorMessage);
				setIsLoading(false);
			});
	}

	return (
		<div
			onClick={() => {
				props.setSignupHidden("hidden");
			}}
			className={
				"fixed h-full w-full items-center justify-center backdrop-blur-sm" +
				` ${props.isSignupHidden}`
			}
		>
			<form
				onClick={(e) => {
					e.stopPropagation();
				}}
				onSubmit={submitHandler}
				className="flex h-2/4 w-full flex-col justify-evenly rounded border-2 border-purple-600 bg-[#181824] p-4 mix-blend-darken md:w-1/3"
			>
				<div className="flex">
					<span className="w-1/3 text-xl text-white" required>
						E-mail
					</span>
					<input ref={email} className="w-2/3" type="email" />
				</div>
				<div className="flex ">
					<span className="w-1/3 text-xl text-white">Password</span>
					<input ref={password} className="w-2/3" type="password" required />
				</div>
				<button
					disabled={isLoading}
					type="submit"
					className="h-10 w-4/5 self-end rounded border-2 border-purple-700 bg-purple-700 text-white hover:bg-purple-500 disabled:cursor-not-allowed md:w-1/4"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignUp;
