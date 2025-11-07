# Quick simple example (bun-tasks watcher)

## Watcher Script (`scripts/watcher.ts`)

The watcher script is a file monitoring utility that automatically populates empty React component files with a template.

### How It Works

1. **Monitors Directory**: Watches the `./src/components` directory for file changes
2. **Detects New Files**: When a new file is created (detected via the `rename` event)
3. **Auto-Populates**: If the new file is:
   - A `.tsx` file
   - Empty (0 bytes)
   
   Then it automatically writes a generic React component template to it:
   ```tsx
   import React from 'react';
   
   const MyComponent = () => {
     return <div>Hello, World!</div>;
   };
   
   export default MyComponent;
   ```

### Usage

Run the watcher in a separate terminal:
```bash
bun run watch
```

Or run it alongside the dev server:
```bash
bun run start:all
```

The watcher will continue running until you stop it with `Ctrl+C`.

