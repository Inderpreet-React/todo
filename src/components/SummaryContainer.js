import SummaryItem from "./SummaryItem";
import { useAuth } from "../context/AuthContext";

function SummaryContainer() {
	const { currentUser } = useAuth();
	const { todoList } = useAuth();

	return (
		<div className="container h-[50%] w-1/3 divide-y divide-purple-300 overflow-auto rounded border-2 border-purple-700 bg-[#25273c] p-4">
			{currentUser ? (
				todoList.map((data) => (
					<SummaryItem
						key={data["id"]}
						heading={data["heading"]}
						isFinished={data["isFinished"]}
					/>
				))
			) : (
				<p className="flex h-full items-center justify-center text-2xl text-white">
					Nothing to see here 😈
				</p>
			)}
		</div>
	);
}

export default SummaryContainer;
