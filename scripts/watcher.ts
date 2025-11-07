import fs from 'node:fs';
import path from 'node:path';

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
fs.readdirSync(watchDir).forEach(file => {
  knownFiles.add(path.join(watchDir, file));
});

// Set up watcher (add { recursive: true } if watching subdirectories)
const watcher = fs.watch(watchDir, (event, filename) => {
  if (filename) {
    const fullPath = path.join(watchDir, filename);
    if (event === 'rename') {
      if (fs.existsSync(fullPath) && !knownFiles.has(fullPath)) {
        // New file detected
        console.log(`New file added: ${fullPath}`);
        knownFiles.add(fullPath);

        // Only act on .js files
        if (path.extname(fullPath) === '.tsx') {
          const stats = fs.statSync(fullPath);
          if (stats.size === 0) {
            fs.writeFileSync(fullPath, genericContent);
            console.log(`Populated ${fullPath} with generic data.`);
          } else {
            console.log(`Skipped ${fullPath} (not empty).`);
          }
        }
      } else if (!fs.existsSync(fullPath) && knownFiles.has(fullPath)) {
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