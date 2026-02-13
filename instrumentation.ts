// This file runs before any other code in the application
// Polyfill 'self' for webpack chunks in Node.js environment
if (typeof globalThis !== 'undefined' && typeof (globalThis as any).self === 'undefined') {
  (globalThis as any).self = globalThis
}

export async function register() {
  // Instrumentation hook - runs on server startup
}
