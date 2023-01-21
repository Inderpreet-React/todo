import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";

function SummaryHandlerContainer() {
	const [isHidden, setIsHidden] = useState("hidden");
	const [isSignupHidden, setSignupHidden] = useState("hidden");
	const { currentUser } = useAuth();

	if (!currentUser) {
		function openLoginForm() {
			setIsHidden("flex");
		}
		return (
			<>
				<LogIn isHidden={isHidden} setIsHidden={setIsHidden} />
				<SignUp
					isSignupHidden={isSignupHidden}
					setSignupHidden={setSignupHidden}
				/>
				<div className="container m-4 flex h-[10%] w-1/3 items-center justify-center rounded border-2 border-purple-700 p-6">
					<p className="text-xl text-white">
						<span
							onClick={openLoginForm}
							className="cursor-pointer underline decoration-purple-500 decoration-2 underline-offset-2"
						>
							Login
						</span>
						{" or "}
						<span
							onClick={() => setSignupHidden("flex")}
							className="cursor-pointer underline decoration-purple-500 decoration-2 underline-offset-2"
						>
							Signup
						</span>{" "}
						to make changes
					</p>
				</div>
			</>
		);
	} else {
		function signOutHandler() {
			signOut(auth)
				.then(setIsHidden("hidden"))
				.catch(console.log("An error occured"));
		}

		return (
			<div className="container m-4 flex h-[10%] w-4/5 items-center justify-center rounded border-2 border-purple-700 p-6 md:w-1/3">
				<span
					className="cursor-pointer text-xl text-white underline decoration-purple-500 decoration-2 underline-offset-2"
					onClick={signOutHandler}
				>
					Log out
				</span>
			</div>
		);
	}
}

export default SummaryHandlerContainer;
