import { readdir, readFile, writeFile, stat, mkdir } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function fetchInputs() {
  const srcDir = path.resolve(__dirname, '..', 'src');
  const publicDir = path.resolve(__dirname, '..', 'public', 'inputs');
  await mkdir(publicDir, { recursive: true });
  const years = await readdir(srcDir);

  for (const year of years) {
    const yearDir = path.join(srcDir, year);
    const stats = await stat(yearDir);
    if (!stats.isDirectory()) {
      continue;
    }
    const days = await readdir(yearDir);

    for (const day of days) {
      const dayDir = path.join(yearDir, day);
      const inputPath = path.join(dayDir, 'input.txt');
      const publicInputPath = path.join(publicDir, `${year}-${day}-input.txt`);

      try {
        const inputContent = await readFile(inputPath, 'utf-8');
        if (inputContent.trim() === '') {
          await fetchAndSaveInput(year, day, inputPath, publicInputPath);
        } else {
          await writeFile(publicInputPath, inputContent);
          console.log(`Copied input for ${year}/${day} to ${publicInputPath}`);
        }
      } catch (error) {
        await fetchAndSaveInput(year, day, inputPath, publicInputPath);
      }
    }
  }
}

async function fetchAndSaveInput(year: string, day: string, inputPath: string, publicInputPath: string) {
  console.log(`Fetching input for ${year}/${day}...`);
  const url = `https://adventofcode.com/${year}/day/${Number(day)}/input`;
  const res = await fetch(url, {
    headers: {
      cookie: `session=${process.env.AOC_SESSION_COOKIE}`,
    },
  });
  const text = await res.text();
  await writeFile(inputPath, text);
  console.log(`Saved input for ${year}/${day} to ${inputPath}`);

  await writeFile(publicInputPath, text);
  console.log(`Saved input for ${year}/${day} to ${publicInputPath}`);
}

fetchInputs();
