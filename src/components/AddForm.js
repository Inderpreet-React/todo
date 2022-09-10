import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function AddForm() {
	const heading = useRef();
	const { currentUser } = useAuth();
	const { fetchTodoList } = useAuth();

	async function AddDataHandler() {
		try {
			await addDoc(collection(db, "todo"), {
				heading: heading.current.value,
				isFinished: false,
			});
			fetchTodoList();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<form
			className="mb-4 flex h-[40%] w-1/3 flex-col gap-4"
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
				className="h-1/4"
			/>
			<textarea className="h-2/4 resize-none" placeholder="Description" />
			<button
				disabled={!currentUser ? true : false}
				type="submit"
				className="h-1/6 w-1/4 rounded border-2 border-purple-700 bg-purple-700 text-white hover:bg-purple-500 disabled:cursor-not-allowed disabled:hover:bg-purple-700"
			>
				Add
			</button>
		</form>
	);
}

export default AddForm;
