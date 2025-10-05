#!/usr/bin/env node

import { mkdir, writeFile, readFile } from 'fs/promises';
import path from 'node:path';

async function scaffoldNewDay() {
	const [,, yearArg, dayArg] = process.argv;
	if (!yearArg || !dayArg) {
		console.error('Usage: npm run new <year> <day>');
		process.exit(1);
	}
	const year = yearArg;
	const day = dayArg.padStart(2, '0');

	const dayDir = path.resolve('src', year, day);
	await mkdir(dayDir, { recursive: true });

	// Prepare template file paths
	const templatesDir = path.resolve('templates', 'day');
	const files = [
		{ name: 'index.ts', out: 'index.ts' },
		{ name: 'index.test.ts', out: 'index.test.ts' },
		{ name: 'style.css', out: 'style.css' },
	];

	for (const { name, out } of files) {
		const templatePath = path.join(templatesDir, name);
		let content = await readFile(templatePath, 'utf-8');
		content = content
			.replace(/YEAR/g, year)
			.replace(/DAY/g, day);
		await writeFile(path.join(dayDir, out), content, { flag: 'wx' }).catch(() => {});
	}

	// Create input file in day directory
	const inputPath = path.join(dayDir, 'input.txt');
	await writeFile(inputPath, '', { flag: 'wx' }).catch(() => {});

	const htmlPath = path.resolve('public', `${year}-${day}.html`);
	const htmlContent = `
	<!doctype html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>AoC ${year} Day ${day} Visualization</title>
	</head>
	<body>
		<div id="viz"></div>
		<script type="module" src="/src/${year}/${day}/visualize.ts"></script>
	</body>
	</html>
	`.trim();
	await writeFile(htmlPath, htmlContent, { flag: 'wx' }).catch(() => {});

	// 2. Optionally create a default visualize.ts if not present
	const vizPath = path.resolve('src', year, day, 'visualize.ts');
	const vizContent = `// Visualization for ${year} Day ${day}\n\nexport default function visualize() {\n  // TODO: Implement visualization\n}\n`;
	await writeFile(vizPath, vizContent, { flag: 'wx' }).catch(() => {});

	console.log(`Scaffolded src/${year}/${day}/ and src/${year}/${day}/input.txt`);
}

scaffoldNewDay();
