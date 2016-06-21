(function(module) {

  function Content (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Content.prototype.toHtml = function (scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Content.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS articles (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'page VARCHAR(255) NOT NULL, ' +
        'category VARCHAR(20), ' +
        'revision VARCHAR(20), ' +
        'publishedOn DATETIME, ' +
        'author VARCHAR(30), ' +
        'body TEXT NOT NULL);',
      function() {
        console.log('Successfully set up the articles table.');
      }
    );
  };

  Content.prototype.insertRecord = function() {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (title, page, category, revision, publishedOn, author, body) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.page, this.category, this.revision, this.publishedOn, this.author, this.body],
        }
      ]
    );
  };

  Content.loadAll = function(rows) {
    Article.allArticles = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  Content.fetchAll = function() {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Article.loadAll(rows);
        articleView.renderIndexPage();
        articleView.initAdminPage();
      } else {
        $.getJSON('/data/hackerIpsum.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var article = new Article(item); // Instantiate an article based on item from JSON
            article.insertRecord(); // Cache the article in DB
          });
          webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
            Article.loadAll(rows);
            articleView.renderIndexPage();
            articleView.initAdminPage();
          });
        });
      }
    });
  };

  // content.forEach(function(a) {
  // if ($('#category-filter:contains("' + a.category + '")').length === 0 ) {
  //   $('#category-filter').append(a.toHtml('#category-filter-template'));
  // }
  //
  // //$('#aurthor-filter').append(a.toHtml('#aurthor-filter-template'));
  // $('#articles').append(a.toHtml('#article-template'));
  //
  // });

  Content.createTable();
  Content.fetchAll();

  module.Content = Content;
})(window);
