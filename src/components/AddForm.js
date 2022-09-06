function AddForm() {
	return (
		<form className="m-8 flex h-10 w-1/3">
			<input
				type="text"
				required
				className="h-full w-3/4 rounded-tr-none rounded-br-none border-t-2 border-b-2 border-l-2 border-r-0 border-purple-700 bg-[#25273c] text-white"
			/>
			<button
				type="submit"
				className="h-full w-1/4 rounded rounded-tl-none rounded-bl-none border-t-2 border-r-2 border-b-2 border-purple-700 bg-purple-700 text-white hover:bg-purple-500"
			>
				Add
			</button>
		</form>
	);
}

export default AddForm;
