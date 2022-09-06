import SummaryItem from "./SummaryItem";

function SummaryContainer() {
	return (
		<div className="container h-3/5 w-1/3 divide-y divide-purple-300 overflow-auto rounded border-2 border-purple-700 bg-[#25273c] p-4">
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
			<SummaryItem />
		</div>
	);
}

export default SummaryContainer;
