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

### Benefits

- **Faster Development**: No need to manually write boilerplate code for new components
- **Consistency**: Ensures all new components follow the same structure
- **Time Saver**: Automatically sets up the basic React component template

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run the development server:
   ```bash
   bun run dev
   ```

3. (Optional) Run the watcher in a separate terminal:
   ```bash
   bun run watch
   ```

   Or run both together:
   ```bash
   bun run start:all
   ```

## Project Structure

```
my-app/
├── scripts/
│   └── watcher.ts      # File watcher for auto-populating components
├── src/
│   ├── app/            # Next.js app directory
│   └── components/     # React components (watched by watcher.ts)
└── package.json        # Project configuration
```
