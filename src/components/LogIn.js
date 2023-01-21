import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LogIn(props) {
	const email = useRef();
	const password = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const { setCurrentUser } = useAuth();

	function submitHandler(e) {
		e.preventDefault();
		setIsLoading(true);
		signInWithEmailAndPassword(
			auth,
			email.current.value,
			password.current.value
		)
			.then((user) => {
				setCurrentUser(user);
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
				props.setIsHidden("hidden");
			}}
			className={
				"fixed h-full w-full items-center justify-center backdrop-blur-sm" +
				` ${props.isHidden}`
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
					Log In
				</button>
			</form>
		</div>
	);
}

export default LogIn;
