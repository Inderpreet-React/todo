import AddForm from "../components/AddForm";
import SummaryContainer from "../components/SummaryContainer";

function Todo() {
	return (
		<div className="flex h-screen flex-col items-center bg-[#181824] p-8">
			<h1 className="text-5xl text-white">Todo</h1>
			<AddForm />
			<SummaryContainer />
		</div>
	);
}

export default Todo;
