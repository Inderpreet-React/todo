import SummaryDetails from "./SummaryDetails";
import SummaryIcons from "./SummaryIcons";

function SummaryItem(props) {
	const heading = props.heading;
	const isFinished = props.isFinished;
	return (
		<div className="flex items-center gap-4 p-4">
			<SummaryDetails id={props.id} heading={heading} isFinished={isFinished} />
			<SummaryIcons id={props.id} heading={heading} />
		</div>
	);
}

export default SummaryItem;
