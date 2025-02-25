import './styles.css';
import { createSummarySidebar } from './components/sidebar';
import { monitorEmailClicks } from './components/emailMonitor';

function init() {
	const sidebar = createSummarySidebar();
	// Insert into Gmail's DOM
	const targetContainer = document.querySelector('.aUx');
	if (targetContainer) {
		targetContainer.insertBefore(sidebar, targetContainer.firstChild);
	} else {
		console.error('Target container (.aUx) not found.');
	}

	monitorEmailClicks();
}

// Initialize when the page loads
window.addEventListener('load', init);
