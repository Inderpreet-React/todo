import AddForm from "../components/AddForm";
import SummaryContainer from "../components/SummaryContainer";
import SummaryHandlerContainer from "../components/SummaryHandlerContainer";
import { AuthProvider } from "../context/AuthContext";

function Todo() {
	return (
		<div className="flex h-screen flex-col items-center bg-[#181824] p-2">
			<AuthProvider>
				<h1 className="h-[10%] text-3xl text-white">Todo</h1>
				<AddForm />
				<SummaryContainer />
				<SummaryHandlerContainer />
			</AuthProvider>
		</div>
	);
}

export default Todo;
