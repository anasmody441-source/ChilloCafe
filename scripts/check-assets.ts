// Validates the predefined catalog and confirms that every local asset referenced by the source exists.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { categoryLabels } from '../src/data/categories.ts';
import { predefinedProducts } from '../src/data/products.ts';

const root = path.resolve(import.meta.dirname, '..');
const problems: string[] = [];

const assetExists = (assetPath: string) => existsSync(path.join(root, 'public', assetPath));

const ids = new Set<string>();
const images = new Set<string>();
for (const product of predefinedProducts) {
  if (ids.has(product.id)) problems.push(`Duplicate id: ${product.id}`);
  ids.add(product.id);
  if (images.has(product.image)) problems.push(`Image used twice: ${product.image}`);
  images.add(product.image);
  if (!(product.category in categoryLabels)) problems.push(`${product.id}: invalid category ${product.category}`);
  if (!(product.price > 0)) problems.push(`${product.id}: invalid price ${product.price}`);
  if (!product.name.trim() || !product.description.trim()) problems.push(`${product.id}: missing text`);
  if (!assetExists(product.image)) problems.push(`${product.id}: missing image ${product.image}`);
}

const sourceFiles = (readdirSync(path.join(root, 'src'), { recursive: true }) as string[])
  .map((file) => path.join(root, 'src', file))
  .filter((file) => statSync(file).isFile() && /\.(tsx?|css)$/.test(file));

let references = 0;
for (const file of sourceFiles) {
  const source = readFileSync(file, 'utf8');
  for (const [assetPath] of source.matchAll(/\/assets\/[\w./-]+\.(?:webp|svg|jpg|png)/g)) {
    references += 1;
    if (!assetExists(assetPath)) problems.push(`${path.relative(root, file)}: missing asset ${assetPath}`);
  }
  const code = source.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '');
  if (/\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie/.test(code)) {
    problems.push(`${path.relative(root, file)}: uses a persistence API`);
  }
  // imageCredits.ts holds links to source pages for attribution; nothing there is loaded as an image.
  if (path.basename(file) !== 'imageCredits.ts' && /https?:\/\/[^'"\s]+\.(?:webp|jpe?g|png|svg|gif|avif)/i.test(code)) {
    problems.push(`${path.relative(root, file)}: references a remote image`);
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(
  `OK: ${predefinedProducts.length} products with unique images, ${references} asset references in ${sourceFiles.length} source files.`,
);
