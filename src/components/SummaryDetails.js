function SummaryDetails(props) {
	return (
		<div className="flex w-2/3 items-center gap-4">
			<input
				type="checkbox"
				className="h-5 w-5 text-purple-600 checked:bg-purple-600"
			/>
			<h4
				className={`" + text-xl text-white ${
					props.isFinished ? "line-through" : ""
				}`}
			>
				{props.heading}
			</h4>
		</div>
	);
}

export default SummaryDetails;
