var content = [];

function Content (opts) {
  this.title = opts.title;
  this.page = opts.page;
  this.category = opts.category;
  this.revision = opts.revision;
  this.author = opts.author;
  this.description = opts.description;
}
()

Contnet.prototype.toHtml = function (sourceTemplate) {
  // var template = Handlebars.compile($(sourceTemplate).text());
var source = $('content-template').html();
var template = Handlebars.compile(source);


};


var appTemplate = $('#hello').html()
var compiledTemplate = Handlebars.compile(appTemplate);
var html = compiledTemplate(data);
$('#showContentApp').append(html);


articles.forEach(function(a) {
if ($('#category-filter:contains("' + a.category + '")').length === 0 ) {
  $('#category-filter').append(a.toHtml('#category-filter-template');
}

//$('#aurthor-filter').append(a.toHtml('#aurthor-filter-template'));
$('#articles').append(a.toHtml('#article-template'));

});
