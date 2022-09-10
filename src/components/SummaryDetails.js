import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function SummaryDetails(props) {
	const { isFinishedupdate } = useAuth();
	const [isFinished, setisFinished] = useState(props.isFinished);
	const id = props.id;

	function checkBoxHandler(e) {
		setisFinished(e.target.checked);
		isFinishedupdate(id, e.target.checked);
	}

	return (
		<div className="flex w-2/3 items-center gap-4">
			<input
				checked={isFinished}
				onChange={checkBoxHandler}
				name="isFinished"
				type="checkbox"
				className="h-5 w-5 text-purple-600 checked:bg-purple-600"
			/>
			<p
				className={`container break-normal text-xl text-white decoration-2 ${
					isFinished ? "line-through" : ""
				}`}
			>
				{props.heading}
			</p>
		</div>
	);
}

export default SummaryDetails;
