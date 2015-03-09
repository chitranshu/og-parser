# og-parser
node js module to parse open graph details from given url

## Installation

<pre>npm install og-parser --save</pre>

## Usage
<pre>
var ogParser = require("og-parser");
ogParser("http://www.youtube.com/watch?v=l3cpnjhiHq8", function(error, data) {
    console.log(error, data);
  }
});
</pre>

## Ouput
<pre>
{ title: 'Howard imitates to Nicolas Cage, Al pacino, Christopher Walken and Raj',
  description: 'Howard imitates to Nicolas Cage, Al pacino, Christopher Walken and Raj.',
  og: 
   { site_name: 'YouTube',
     url: 'http://www.youtube.com/watch?v=l3cpnjhiHq8',
     title: 'Howard imitates to Nicolas Cage, Al pacino, Christopher Walken and Raj',
     image: { url: 'https://i.ytimg.com/vi/l3cpnjhiHq8/hqdefault.jpg' },
     description: 'Howard imitates to Nicolas Cage, Al pacino, Christopher Walken and Raj.',
     type: 'video',
     video: [ [Object], [Object] ] },
  al: 
   { ios: 
      { app_store_id: '544007664',
        app_name: 'YouTube',
        url: 'vnd.youtube://www.youtube.com/watch?v=l3cpnjhiHq8&feature=applinks' },
     android: 
      { url: 'vnd.youtube://www.youtube.com/watch?v=l3cpnjhiHq8&feature=applinks',
        app_name: 'YouTube',
        package: 'com.google.android.youtube' },
     web: { url: 'http://www.youtube.com/watch?v=l3cpnjhiHq8&feature=applinks' } },
  twitter: 
   { card: 'player',
     site: '@youtube',
     url: 'http://www.youtube.com/watch?v=l3cpnjhiHq8',
     title: 'Howard imitates to Nicolas Cage, Al pacino, Christopher Walken and Raj',
     description: 'Howard imitates to Nicolas Cage, Al pacino, Christopher Walken and Raj.',
     image: 'https://i.ytimg.com/vi/l3cpnjhiHq8/hqdefault.jpg',
     app: { name: [Object], id: [Object], url: [Object] },
     player: { width: '1280', height: '720' } 
    } 
}
</pre>

