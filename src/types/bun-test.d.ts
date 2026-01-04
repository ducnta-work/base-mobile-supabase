// Minimal type declarations for Bun's test runner to satisfy TypeScript in IDEs
// This avoids adding extra devDependencies. Bun provides the runtime implementation.
declare module "bun:test" {
  export type TestFn = (name: string, fn: () => void | Promise<void>) => void
  export const describe: TestFn
  export const it: TestFn
  export const test: TestFn

  // Very lightweight expect typings – enough for common usage in this repo
  // You can replace with `bun-types` for full type coverage if preferred.
  export function expect<T = any>(actual: T): any
}

