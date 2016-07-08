/* refactored Content.js for week 1 project submissions */
var content = [];

function Content (opts) {
  this.title = opts.title;
  this.page = opts.page;
  this.category = opts.category;
  this.revision = opts.revision;
  this.author = opts.author;
  this.body = opts.body;
}

Content.prototype.toHtml = function() {
  //$('.tab-content').hide();
  //$('#content').fadeIn();

  var $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');
  $newArticle.attr('data-category', this.category);

  $newArticle.find('data-page', this.page);

  $newArticle.find('h1').html(this.title);
  $newArticle.find('section.page').html(this.page);
  $newArticle.find('section.category').html(this.category);
  $newArticle.find('section.revision').html(this.revision);
  $newArticle.find('section.author').html(this.author);
  $newArticle.find('section.article-body').html(this.body);

  // Display the date as a relative number of "days ago":
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.removeClass('template');
  //$('article .template').hide();
  //$('.tab-content').hide();


  return $newArticle;
};


// Sort our data by date published, descending order
ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});
/* Now iterate through our transformed collection and instantiate
 a new Article instance for each object in our collection. */
ourLocalData.forEach(function(ele){
  content.push(new Content(ele));
});

/* Append each Article to the DOM.
NOTE: Remember that the '.toHtml' method invoked is one WE created. */
content.forEach(function(content){
  $('#content').append(content.toHtml());
  $('#content').fadeIn();

});
$('article.template').hide();
