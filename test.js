var og = require('./og-parser');

og("https://www.youtube.com/watch?v=aboZctrHfK8", function(err, obj) {
  console.log(err, obj);
});
