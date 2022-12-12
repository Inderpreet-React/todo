import { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function AddForm() {
	const heading = useRef();
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const { fetchTodoList } = useAuth();

	async function AddDataHandler() {
		if (!loading) {
			if (!(heading.current.value.trim().length === 0)) {
				setLoading(true);
				try {
					await addDoc(collection(db, "todo"), {
						heading: heading.current.value,
						isFinished: false,
					});
					fetchTodoList();
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			} else {
				alert("Heading cannot be empty");
			}
		}
	}

	return (
		<form
			className="flex h-[30%] w-full flex-col justify-center gap-4 md:w-1/3"
			onSubmit={(e) => {
				e.preventDefault();
				AddDataHandler();
			}}
		>
			<input
				ref={heading}
				type="text"
				required
				placeholder="Heading"
				className="h-12"
			/>
			<button
				disabled={(!currentUser ? true : false) || loading}
				type="submit"
				className="h-10 w-1/4 rounded border-2 border-purple-700 bg-purple-700 text-white hover:bg-purple-500 disabled:cursor-not-allowed disabled:hover:bg-purple-700"
			>
				Add
			</button>
		</form>
	);
}

export default AddForm;
