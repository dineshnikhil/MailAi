import { Ollama } from '@langchain/ollama';
import { PromptTemplate } from '@langchain/core/prompts';

async function main() {
	const llm = new Ollama({
		model: 'phi4:latest', // Default value
		temperature: 0,
		maxRetries: 2,
	});

	const prompt = PromptTemplate.fromTemplate(
		'How to say {input} in {output_language}:\n'
	);

	const chain = prompt.pipe(llm);
	const result = await chain.invoke({
		output_language: 'German',
		input: 'I love programming.',
	});

	console.log(result);
}

main().catch(console.error);
