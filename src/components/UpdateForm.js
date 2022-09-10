import { useAuth } from "../context/AuthContext";
import { useRef } from "react";

export function UpdateForm(props) {
	const showUpdateForm = props.showUpdateForm;
	const setShowUpdateForm = props.setShowUpdateForm;
	const { updateHeading, fetchTodoList } = useAuth();
	const headingValue = useRef();
	const id = props.id;

	const btnClasses =
		"h-12 w-20 rounded bg-purple-600 text-white hover:bg-purple-500";
	return (
		<div
			className={`fixed top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-sm ${
				showUpdateForm ? "" : "hidden"
			}`}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateHeading(id, headingValue.current.value);
					fetchTodoList();
					setShowUpdateForm(false);
				}}
				className="flex gap-4"
			>
				<input ref={headingValue} type="text" defaultValue={props.heading} />
				<button type="submit" className={btnClasses}>
					Update
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						setShowUpdateForm(false);
					}}
					className={btnClasses}
				>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default UpdateForm;
