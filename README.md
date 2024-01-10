## React env setup for 2024 (Step by Step)

1. node -v(volta list)
2. npm create vite@latest smaple-app -- --template react-swc-ts
3. npm run dev, build, preview
4. tsconfig.json(path alias)

```json
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
```

5. npm i -D vite-tsconfig-paths (これで vite.config.ts は編集する必要なし)
6. vite.config.ts

```ts
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()], //for path alias
});
```

7. npm install -D \
   vitest \
   happy-dom \
   @vitest/coverage-v8 \
   @testing-library/react \
   @testing-library/user-event \
   @testing-library/jest-dom

8. "coverage": "vitest run --coverage"

9. vite.config.ts

```ts
/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"],
  },
});
```

10. vitest-setup.ts(import "@testing-library/jest-dom/vitest")

11. tsconfig.json

```json
{
  "include": ["src", "vitest-setup.ts"]
}
```

12. src/components/Count.tsx

```tsx
// TextInput.js
import { useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter some text"
        aria-label="Text Input"
      />
      <p>Entered Text: {text}</p>
    </div>
  );
};

export default TextInput;
```

13. Count.test.tsx (and run coverage, test)

```tsx
// TextInput.test.js
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

test("TextInput Component Test", async () => {
  const user = userEvent.setup();
  render(<TextInput />);

  const inputElement = screen.getByLabelText("Text Input");
  expect(screen.getByText("Entered Text:")).toBeInTheDocument();

  await user.type(inputElement, "Hello World");
  expect(screen.getByText("Entered Text: Hello World")).toBeInTheDocument();
});
```

#### Reference

https://zenn.dev/tentel/articles/488dd8765fb059
https://zenn.dev/kazukix/articles/react-setup-2024
