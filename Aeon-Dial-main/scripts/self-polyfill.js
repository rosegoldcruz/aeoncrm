// Polyfill 'self' for Node.js environment
// This must be loaded before any webpack chunks
if (typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}
// Initialize webpack chunk array if not present
if (typeof globalThis.webpackChunk_N_E === 'undefined') {
  globalThis.webpackChunk_N_E = [];
}
