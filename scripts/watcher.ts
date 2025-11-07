import { watch, readdirSync, existsSync, statSync, writeFileSync } from "fs";
import { join, extname } from "path";

// Directory to watch (adjust as needed)
const watchDir = './src/components';

// Generic data to populate (customize this)
const genericContent = `import React from 'react';

const MyComponent = () => {
  return <div>Hello, World!</div>;
};

export default MyComponent;
`;

// Initial scan of existing files
let knownFiles = new Set();
readdirSync(watchDir).forEach(file => {
  knownFiles.add(join(watchDir, file));
});

// Set up watcher (add { recursive: true } if watching subdirectories)
const watcher = watch(watchDir, (event, filename) => {
  if (filename) {
    const fullPath = join(watchDir, filename);
    if (event === 'rename') {
      if (existsSync(fullPath) && !knownFiles.has(fullPath)) {
        // New file detected
        console.log(`New file added: ${fullPath}`);
        knownFiles.add(fullPath);

        // Only act on .tsx files
        if (extname(fullPath) === '.tsx') {
          const stats = statSync(fullPath);
          if (stats.size === 0) {
            writeFileSync(fullPath, genericContent);
            console.log(`Populated ${fullPath} with generic data.`);
          } else {
            console.log(`Skipped ${fullPath} (not empty).`);
          }
        }
      } else if (!existsSync(fullPath) && knownFiles.has(fullPath)) {
        // File deleted
        knownFiles.delete(fullPath);
      }
    }
  }
});

console.log(`Watching for new files in ${watchDir}...`);

// Keep the process alive until interrupted (Ctrl+C)
process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});