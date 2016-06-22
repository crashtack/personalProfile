/*
  content.js provides methods and functions to handle Content Data.
  There are functions for loading of the JSON data, creating an SQL data base
  populating the SQL data base with the data loaded from JSON.

*/

(function(module) {

  function Content (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Content.allContent = [];

  Content.prototype.toHtml = function (scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Content.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS drawings (' +
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
    console.log('entering .insertRecord');
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO drawings (title, page, category, revision, publishedOn, author, body) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.page, this.category, this.revision, this.publishedOn, this.author, this.body],
        }
      ]
    );
  };

  // TODO: refactor this function
  Content.loadAll = function(rows) {
    Content.allContent = rows.map(function(ele) {
      return new Content(ele);
    });
  };

  Content.fetchAll = function() {
    webDB.execute('SELECT * FROM drawings ORDER BY page DESC', function(rows) {
      if (rows.length) {
        Content.loadAll(rows);
        indexView.renderIndexPage();
        // articleView.initAdminPage();
      } else {
        console.log('entering .fecthAll else');
        $.getJSON('/data/contentNStuff.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          console.log('fetchAll initial .getJSON call');
          rawData.forEach(function(item) {
            var content = new Content(item); // Instantiate an article based on item from JSON
            content.insertRecord(); // Cache the article in DB
          });
          webDB.execute('SELECT * FROM drawings ORDER BY page DESC', function(rows) {
            Content.loadAll(rows);
            indexView.renderIndexPage();
            //indexView.initAdminPage();
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
