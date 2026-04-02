import { build } from 'esbuild';
import { join, basename } from 'path';

const scripts = [
  'src/content/clipboard-capture.ts',
  'src/content/snippet-expander.ts',
];

for (const script of scripts) {
  const outFile = join('dist-firefox/src/content', basename(script).replace('.ts', '.js'));
  await build({
    entryPoints: [script],
    bundle: true,
    format: 'iife',
    outfile: outFile,
    target: 'es2020',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  console.log(`bundled ${script} -> ${outFile}`);
}
