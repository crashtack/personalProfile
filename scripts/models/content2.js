/* refactored Content.js for week 1 project submissions */
var content = [];

function Content (opts) {
  this.title = opts.title;
  this.page = opts.page;
  this.category = opts.category;
  this.revision = opts.revision;
  this.author = opts.author;
  this.body = opts.body;
};

Content.protoype.toHtml = function() {
  var $new
};
