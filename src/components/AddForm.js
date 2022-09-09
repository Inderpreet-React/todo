function AddForm() {
	return (
		<form className="mb-4 flex h-[40%] w-1/3 flex-col gap-4">
			<input type="text" required placeholder="Heading" className="h-1/4" />
			<textarea className="h-2/4 resize-none" placeholder="Description" />
			<button
				type="submit"
				className="h-1/6 w-1/4 rounded border-2 border-purple-700 bg-purple-700 text-white hover:bg-purple-500 disabled:cursor-not-allowed disabled:hover:bg-purple-700"
			>
				Add
			</button>
		</form>
	);
}

export default AddForm;
