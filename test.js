var og = require('./og-parser');

og("https://www.youtube.com/watch?v=7UaPL5PGywo", function(err, obj) {
  console.log(err, obj);
});
