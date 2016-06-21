var express = require('express'),
  port = process.env.PORT || 3001,
  app = express();

app.use(express.static('./'));

app.get('*', function(request, respose) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
