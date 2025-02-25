export function updateSummaryBox(apiResponse) {
	const summaryParagraph = document.querySelector('.mail-summery p');
	const actionList = document.querySelector('.action-items ul');

	summaryParagraph.textContent = apiResponse.summary || 'Summary not found.'; // Display summary or default
	console.log('from the update box: ', apiResponse.summary);

	actionList.innerHTML = ''; // Clear existing action items

	if (apiResponse['actionItems'] && apiResponse['actionItems'].length > 0) {
		apiResponse['actionItems'].forEach((item) => {
			const li = document.createElement('li');
			li.textContent = item;
			actionList.appendChild(li);
		});
	} else {
		const li = document.createElement('li');
		li.textContent = 'No Action Items';
		actionList.appendChild(li);
	}
}
