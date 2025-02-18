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

	// Normalize the email content
	emailBody = normalizeEmailContent(emailBody);

	console.log('Email content fetched:', emailBody);
	return emailBody.trim();
}

function normalizeEmailContent(content) {
	// Remove excessive whitespace and new lines
	return content
		.replace(/\s+/g, ' ') // Replace multiple spaces/newlines with a single space
		.replace(/^\s+|\s+$/g, '') // Trim leading and trailing whitespace
		.replace(/\s*([.,!?;])\s*/g, '$1 '); // Ensure punctuation is followed by a space
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
	const summaryElement = document.querySelector('.summary-text');

	if (emailContent) {
		const summary = summarizeEmail(emailContent);
		const actionItems = extractActionItems(emailContent);

		let content = `<div class="email-content-box">${summary}</div>`; // Wrap summary in the new box

		if (actionItems.length > 0) {
			content += `<div class="email-content-box">Action Items:<br>${actionItems.join(
				'<br>'
			)}</div>`;
		}

		summaryElement.innerHTML = content; // Use innerHTML to allow HTML content
	} else {
		if (summaryElement) {
			summaryElement.textContent = 'Loading email content...';
		}
		console.log('Email content not found or still loading.');
	}
}

// Initialize when the page loads
window.addEventListener('load', createSummarySidebar);
