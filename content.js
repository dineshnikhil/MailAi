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

	// Start monitoring for email changes
	startEmailChangeMonitoring();
}

let lastEmailUrl = null;

function startEmailChangeMonitoring() {
	// Check for email changes every 1 second
	setInterval(checkEmailChange, 1000);
	// Initial check
	checkEmailChange();
}

function checkEmailChange() {
	const currentUrl = window.location.href;
	const isOpenEmailView =
		currentUrl.includes('#inbox/') || currentUrl.includes('#search/');

	if (isOpenEmailView && currentUrl !== lastEmailUrl) {
		lastEmailUrl = currentUrl;
		updateSummary();
	} else if (!isOpenEmailView) {
		lastEmailUrl = null;
		const summaryElement = document.querySelector('.summary-text');
		if (summaryElement) {
			summaryElement.textContent = 'Select an email to view summary.';
		}
	}
}

function getEmailContent() {
	let emailBody = '';
	// Try primary email content selector
	const emailBodyElements = document.querySelectorAll('.a3s.aiL');

	if (emailBodyElements && emailBodyElements.length > 0) {
		emailBodyElements.forEach((element) => {
			emailBody += element.textContent + '\n\n';
		});
	} else {
		// Try fallback selector
		const fallbackElement = document.querySelector('.gs_message .ii.gt');
		if (fallbackElement) {
			emailBody = fallbackElement.textContent;
		}
	}
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
		console.error('Email content not found.');
	}
}

// Initialize when the page loads
window.addEventListener('load', createSummarySidebar);
