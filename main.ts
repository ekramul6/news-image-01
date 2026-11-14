// A news-image-01 entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. The image is a magazine-cover montage of Friday 13 November
// 2026: a night-side globe at the centre, flanked by eight labelled vignettes of the day's biggest stories
// (Senate summons Huang & Lutnick; Zelensky meets US envoys; drone hits Russian warship; Iran claims strike
// in Bahrain; FBI: N. Korea $400m crypto hack; US record 483,200 deportations; Microsoft 365 outage
// worldwide; China drills around Taiwan). The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by
// 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

// Verification: after copying, read the output back and refuse to pass silently if its size does not
// match the source image byte for byte, so a truncated or partial write fails loudly instead of
// submitting a broken entry.

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const output = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

copyFileSync(source, output);

const sourceSize = statSync(source).size;
const outputSize = statSync(output).size;
if (outputSize !== sourceSize) {
  throw new Error(`entry.png copy mismatch: wrote ${outputSize} bytes, expected ${sourceSize}`);
}
