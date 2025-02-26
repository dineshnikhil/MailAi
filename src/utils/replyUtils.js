export async function handleReply() {
	try {
		// Find and click Gmail's reply button
		const replyButton = document.querySelector('[aria-label="Reply"]');
		if (replyButton) {
			replyButton.click();

			// Wait for the compose box to appear
			await waitForElement('.Am.Al.editable');

			// Find the compose box and insert our text
			const composeBox = document.querySelector('.Am.Al.editable');
			if (composeBox) {
				composeBox.innerHTML =
					'Hi, this is dinesh. I will reply you back.<br><br>';

				// Place cursor at the end
				const selection = window.getSelection();
				const range = document.createRange();
				range.selectNodeContents(composeBox);
				range.collapse(false);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		} else {
			throw new Error('Reply button not found');
		}
	} catch (error) {
		console.error('Error handling reply:', error);
	}
}

function waitForElement(selector) {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve();
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				observer.disconnect();
				resolve();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Add timeout to prevent infinite waiting
		setTimeout(() => {
			observer.disconnect();
			resolve();
		}, 5000);
	});
}
