import SummaryDetails from "./SummaryDetails";
import SummaryIcons from "./SummaryIcons";

function SummaryItem() {
	return (
		<div className="flex items-center gap-4 p-4">
			<SummaryDetails />
			<SummaryIcons />
		</div>
	);
}

export default SummaryItem;
