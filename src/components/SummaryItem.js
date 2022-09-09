import SummaryDetails from "./SummaryDetails";
import SummaryIcons from "./SummaryIcons";

function SummaryItem(props) {
	const heading = props.heading;
	const isFinished = props.isFinished;
	return (
		<div className="flex items-center gap-4 p-4">
			<SummaryDetails heading={heading} isFinished={isFinished} />
			<SummaryIcons />
		</div>
	);
}

export default SummaryItem;
