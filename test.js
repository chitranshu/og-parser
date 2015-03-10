var og = require('./og-parser');

og("https://vine.co/v/OPxnt0xtaMI", function(err, obj) {
  console.log(err, obj.twitter);
});
