// server.js
const express = require('express');
const app = express();
const port = 3001;

app.post('/summery', (req, res) => {
	const responseJson = {
		Summary:
			'Before the term-end theory exams, Pokkula Dinesh Kumar must ensure system compatibility with the exam platform using their laptop or desktop.',
		'Action Items': [
			'Test your system compatibility using the provided username and password on the exam platform.',
			'Download and install the SEBLite tool and follow instructions from the attached PDF.',
			'Disable antivirus, Internet security, and firewall if necessary.',
			'Ensure a quiet and well-lit environment during exams.',
			'Contact technical support at +91 9513850025 for assistance if needed.',
			'Follow specific instructions to exit the Safe Exam Browser (SEB) only after completing the exam.',
		],
	};
	res.json(responseJson);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
