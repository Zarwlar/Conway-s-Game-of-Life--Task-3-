function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./Polyfill', true, /\.(ts)$/));
requireAll(require.context('./', true, /\.(ts|styl)$/));
