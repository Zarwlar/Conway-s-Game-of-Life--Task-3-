require('./style.styl');

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /\.(ts)$/));
