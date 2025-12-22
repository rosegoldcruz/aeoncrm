// Polyfill for 'self' in Node.js environment
if (typeof self === 'undefined') {
  (global as any).self = global
}

export {}
