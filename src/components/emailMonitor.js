import {
	waitForEmailContentLoad,
	getFullEmailDetails,
} from '../utils/emailUtils';
import { updateSummaryBox } from '../utils/updateSummaryBox';

export async function monitorEmailClicks() {
	document.addEventListener('click', async (event) => {
		// Make the event listener async
		const emailItem = event.target.closest('.zA');
		if (emailItem) {
			const summaryBox = document.querySelector('.summery-box');
			const introCopy = document.querySelector('.intoCopy');
			const summaryParagraph = document.querySelector('.mail-summery p');
			const actionList = document.querySelector('.action-items ul');

			// Show loading state
			summaryParagraph.textContent = 'Loading summary...';
			actionList.innerHTML = '';
			const loadingLi = document.createElement('li');
			loadingLi.textContent = 'Fetching action items...';
			actionList.appendChild(loadingLi);

			// Toggle visibility
			introCopy.style.display = 'none';
			summaryBox.style.display = 'block';

			try {
				await waitForEmailContentLoad(); // Wait for email content to load
				const fullEmailDetails = getFullEmailDetails(emailItem);

				const response = await fetch('http://localhost:8000/summarize', {
					// Wait for API response
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: fullEmailDetails }),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log(data);
				updateSummaryBox(data);
			} catch (error) {
				console.error('Error processing email:', error);
				summaryParagraph.textContent = 'Failed to load summary.';
				actionList.innerHTML = '';
				const errorLi = document.createElement('li');
				errorLi.textContent = 'Failed to fetch action items.';
				actionList.appendChild(errorLi);
			}
		}
	});
}
