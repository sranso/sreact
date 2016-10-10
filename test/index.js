const context = require.context('./', false, /.+-test\.*js$/);
context.keys().forEach(context);
module.exports = context;
