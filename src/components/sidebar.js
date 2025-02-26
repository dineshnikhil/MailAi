import { copyToClipboard } from '../utils/emailUtils';
import { doubleCheckSummary } from '../utils/doubleCheckFun';

export function createSummarySidebar() {
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

	// Mail summary section (now will hold combined subject and content)
	const mailSummary = document.createElement('div');
	mailSummary.className = 'mail-summery';
	const summaryHeader = document.createElement('h3');
	summaryHeader.textContent = 'Summery:';
	mailSummary.appendChild(summaryHeader);
	const summaryParagraph = document.createElement('p'); // Element to hold summary from API
	mailSummary.appendChild(summaryParagraph);

	// Action items section
	const actionItems = document.createElement('div');
	actionItems.className = 'action-items';
	const actionHeader = document.createElement('h3');
	actionHeader.textContent = 'Action Items:';
	const actionList = document.createElement('ul');
	actionItems.appendChild(actionHeader);
	actionItems.appendChild(actionList);

	// Action buttons
	const actionButtons = document.createElement('div');
	actionButtons.className = 'actionButtons';
	const copyButton = document.createElement('button');
	copyButton.textContent = 'Copy';
	const replyButton = document.createElement('button');
	replyButton.textContent = 'Reply';
	const doubleCheckButton = document.createElement('button');
	doubleCheckButton.textContent = 'Double Check';

	actionButtons.appendChild(copyButton);
	actionButtons.appendChild(doubleCheckButton);
	actionButtons.appendChild(replyButton);

	// Assemble summary box
	summaryBox.appendChild(mailSummary); // `mailSummary` with `summaryParagraph` is now the first child
	summaryBox.appendChild(actionItems);
	summaryBox.appendChild(actionButtons);

	// Create intro copy (visible initially)
	const introCopy = document.createElement('div');
	introCopy.className = 'intoCopy';
	const introHeader = document.createElement('h2');
	introHeader.innerHTML =
		'🚀 <span style="color: #32cd32;">Supercharge</span> your gmail with <span style="color: #32cd32;">MailMind AI</span>';
	const introText = document.createElement('p');
	introText.textContent =
		'Tired of reading long emails? MailMind AI brings AI-powered summaries right into your Gmail sidebar. Instantly get the key points, copy, double-check, or reply in seconds—saving you time and effort. Stay focused, work smarter, and never miss important details again!';

	const featureContainer = document.createElement('div');
	// Create the heading
	const heading = document.createElement('h3');
	heading.textContent = 'What can we do with MailMind AI?';
	featureContainer.appendChild(heading);
	// Create the list
	const list = document.createElement('ul');
	const features = ['Get Summary', 'Get Action Item (if any)', 'Double Check'];
	features.forEach((featureText) => {
		const listItem = document.createElement('li');
		listItem.textContent = featureText;
		list.appendChild(listItem);
	});
	featureContainer.appendChild(list);

	const tryNowBtn = document.createElement('button');
	tryNowBtn.textContent = 'Try Now ✨ (by selecting mail)';

	introCopy.appendChild(introHeader);
	introCopy.appendChild(introText);
	introCopy.appendChild(featureContainer);
	introCopy.appendChild(tryNowBtn);

	// Assemble container
	container.appendChild(header);
	container.appendChild(summaryBox);
	container.appendChild(introCopy);
	sidebar.appendChild(container);

	// Add button functionality
	copyButton.addEventListener('click', () => {
		const summaryText = document.querySelector('.mail-summery p').textContent;
		copyToClipboard(summaryText);
	});

	doubleCheckButton.addEventListener('click', (event) => {
		console.log('Double check clicked');
		doubleCheckSummary(event);
	});

	replyButton.addEventListener('click', () => {
		// Implement reply functionality
		console.log('Reply clicked');
	});

	return sidebar;
}
