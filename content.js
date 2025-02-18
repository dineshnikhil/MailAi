function createSummarySidebar() {
	// Create sidebar container
	const sidebar = document.createElement('div');
	sidebar.className = 'summary-sidebar';

	// Create summary content
	const content = document.createElement('div');
	content.className = 'summary-content';

	const header = document.createElement('div');
	header.className = 'summary-header';
	header.textContent = 'Email Summary';

	const summaryText = document.createElement('div');
	summaryText.className = 'summary-text';
	summaryText.textContent = 'Select an email to view summary.';

	// Assemble the sidebar
	content.appendChild(header);
	content.appendChild(summaryText);
	sidebar.appendChild(content);

	// Find the target container (.aUx) in Gmail's layout
	const targetContainer = document.querySelector('.aUx');
	if (targetContainer) {
		// Insert the sidebar as the first child of .aUx
		targetContainer.insertBefore(sidebar, targetContainer.firstChild);
	} else {
		console.error("Target container (.aUx) not found in Gmail's DOM.");
	}

	// Start monitoring for email clicks
	monitorEmailClicks();
}

function monitorEmailClicks() {
	// Use event delegation to listen for clicks on email items
	document.addEventListener('click', (event) => {
		const emailItem = event.target.closest('.zA'); // Email list item
		if (emailItem) {
			console.log('Email item clicked:', emailItem);
			// Wait for email content to load
			waitForEmailContent();
		}
	});
}

function waitForEmailContent() {
	// Check every 100ms for email content
	const checkInterval = setInterval(() => {
		const emailContent = document.querySelector('.a3s.aiL, .ii.gt');
		if (emailContent && emailContent.textContent.trim()) {
			clearInterval(checkInterval);
			updateSummary();
		}
	}, 100);

	// Stop checking after 5 seconds to prevent infinite checking
	setTimeout(() => {
		clearInterval(checkInterval);
	}, 5000);
}

function getEmailContent() {
	let emailBody = '';
	// Try primary email content selector
	const emailBodyElements = document.querySelectorAll('.a3s.aiL, .ii.gt');

	if (emailBodyElements && emailBodyElements.length > 0) {
		emailBodyElements.forEach((element) => {
			emailBody += element.textContent + '\n\n';
		});
	}

	console.log('Email content fetched:', emailBody);
	return emailBody.trim();
}

function summarizeEmail(emailText) {
	if (!emailText) return 'No email content to summarize.';

	// Extract first few sentences for summary
	const sentences = emailText.split(/[.!?]\s+/);
	const summarySentences = sentences.slice(0, 3);
	return summarySentences.join('. ') + '...';
}

function extractActionItems(emailText) {
	if (!emailText) return [];

	const actionKeywords = [
		'Action:',
		'Todo:',
		'Please:',
		'Remember to:',
		'Need to:',
	];
	const actionItems = [];
	const lines = emailText.split('\n');

	lines.forEach((line) => {
		const trimmedLine = line.trim();
		if (trimmedLine) {
			actionKeywords.forEach((keyword) => {
				if (trimmedLine.toLowerCase().includes(keyword.toLowerCase())) {
					actionItems.push(trimmedLine);
				}
			});
		}
	});
	return actionItems;
}

function updateSummary() {
	const emailContent = getEmailContent();
	if (emailContent) {
		const summary = summarizeEmail(emailContent);
		const actionItems = extractActionItems(emailContent);

		const summaryElement = document.querySelector('.summary-text');
		if (summaryElement) {
			let content = summary;

			if (actionItems.length > 0) {
				content += '\n\nAction Items:\n' + actionItems.join('\n');
			}

			summaryElement.textContent = content;
		}
	} else {
		const summaryElement = document.querySelector('.summary-text');
		if (summaryElement) {
			summaryElement.textContent = 'Loading email content...';
		}
		console.log('Email content not found or still loading.');
	}
}

// Initialize when the page loads
window.addEventListener('load', createSummarySidebar);
