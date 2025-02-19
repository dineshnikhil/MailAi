function createSummarySidebar() {
	// Create sidebar container
	const sidebar = document.createElement('div');
	sidebar.className = 'summary-sidebar';

	// Create main container structure
	const container = document.createElement('div');
	container.className = 'container';

	// Create header
	const header = document.createElement('header');
	const headerText = document.createElement('h1');
	headerText.innerHTML = 'MailMind AI ✨';
	header.appendChild(headerText);

	// Create summary box (hidden initially)
	const summaryBox = document.createElement('div');
	summaryBox.className = 'summery-box';
	summaryBox.style.display = 'none';

	// Mail summary section
	const mailSummary = document.createElement('div');
	mailSummary.className = 'mail-summery';
	const summaryContent = document.createElement('p');
	mailSummary.appendChild(summaryContent);

	// Action items section
	const actionItems = document.createElement('div');
	actionItems.className = 'action-items';
	const actionHeader = document.createElement('h2');
	actionHeader.textContent = 'Action Items:';
	const actionList = document.createElement('ul');
	actionItems.appendChild(actionHeader);
	actionItems.appendChild(actionList);

	// Action buttons
	const actionButtons = document.createElement('div');
	actionButtons.className = 'actionButtons';
	const copyButton = document.createElement('button');
	copyButton.textContent = 'Copy';
	const doubleCheckButton = document.createElement('button');
	doubleCheckButton.textContent = 'Double Check';
	const replyButton = document.createElement('button');
	replyButton.textContent = 'Reply';

	actionButtons.appendChild(copyButton);
	actionButtons.appendChild(doubleCheckButton);
	actionButtons.appendChild(replyButton);

	// Assemble summary box
	summaryBox.appendChild(mailSummary);
	summaryBox.appendChild(actionItems);
	summaryBox.appendChild(actionButtons);

	// Create intro copy (visible initially)
	const introCopy = document.createElement('div');
	introCopy.className = 'intoCopy';
	const introHeader = document.createElement('h1');
	introHeader.textContent = '🚀 Supercharge your gmail with MailMind AI';
	const introText = document.createElement('p');
	introText.textContent =
		'Tired of reading long emails? MailMind AI brings AI-powered summaries right into your Gmail sidebar. Instantly get the key points, copy, double-check, or reply in seconds—saving you time and effort. Stay focused, work smarter, and never miss important details again!';

	introCopy.appendChild(introHeader);
	introCopy.appendChild(introText);

	// Assemble container
	container.appendChild(header);
	container.appendChild(summaryBox);
	container.appendChild(introCopy);
	sidebar.appendChild(container);

	// Insert into Gmail's DOM
	const targetContainer = document.querySelector('.aUx');
	if (targetContainer) {
		targetContainer.insertBefore(sidebar, targetContainer.firstChild);
	} else {
		console.error('Target container (.aUx) not found.');
	}

	// Add button functionality
	copyButton.addEventListener('click', () => {
		const summaryText = document.querySelector('.mail-summery p').textContent;
		copyToClipboard(summaryText);
	});

	doubleCheckButton.addEventListener('click', () => {
		// Implement double check functionality
		console.log('Double check clicked');
	});

	replyButton.addEventListener('click', () => {
		// Implement reply functionality
		console.log('Reply clicked');
	});

	monitorEmailClicks();
}

// Modified monitorEmailClicks to handle raw content
function monitorEmailClicks() {
	document.addEventListener('click', (event) => {
		const emailItem = event.target.closest('.zA');
		if (emailItem) {
			const summaryBox = document.querySelector('.summery-box');
			const introCopy = document.querySelector('.intoCopy');
			const summaryContent = document.querySelector('.mail-summery p');

			// Show loading state
			summaryContent.textContent = 'Loading email content...';

			// Toggle visibility
			introCopy.style.display = 'none';
			summaryBox.style.display = 'block';

			setTimeout(() => {
				const emailContent = getEmailContent();
				updateSummary(emailContent);
			}, 500);
		}
	});
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

function updateSummary(emailContent) {
	const summaryContent = document.querySelector('.mail-summery p');
	const actionList = document.querySelector('.action-items ul');

	// Display raw email content
	summaryContent.textContent = emailContent || 'No email content found';

	// Clear and reset action items
	actionList.innerHTML = '';
	const li = document.createElement('li');
	li.textContent = 'No action items to take'; // Default message
	actionList.appendChild(li);
}

function copyToClipboard(text) {
	// Use the Clipboard API to copy text
	navigator.clipboard
		.writeText(text)
		.then(() => {
			// Show feedback to the user
			const feedbackElement = document.createElement('div');
			feedbackElement.textContent = 'Summary copied to clipboard!';
			feedbackElement.className = 'copy-feedback';
			document.body.appendChild(feedbackElement);

			// Remove feedback after 2 seconds
			setTimeout(() => {
				document.body.removeChild(feedbackElement);
			}, 2000);
		})
		.catch((err) => {
			console.error('Failed to copy: ', err);
		});
}

// Initialize when the page loads
window.addEventListener('load', createSummarySidebar);
