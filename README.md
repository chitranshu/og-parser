# og-parser
node js module to parse open graph details from given url

## Installation

<pre>npm install og-parser --save</pre>

## Usage
<pre>
var ogParser = require("og-parser");
ogParser("https://www.youtube.com/watch?v=7UaPL5PGywo", function(error, data) {
    console.log(error, data);
  }
});
</pre>

## Ouput
<pre>
null { title: '5 Most Dangerous Hackers Of All Time - YouTube',
  og: 
   { site_name: 'YouTube',
     url: 'http://www.youtube.com/watch?v=7UaPL5PGywo',
     title: '5 Most Dangerous Hackers Of All Time',
     image: { url: 'https://i.ytimg.com/vi/7UaPL5PGywo/maxresdefault.jpg' },
     description: 'Here are 5 of the most dangerous hackers to ever walk the streets of the Internet. Visit our site: http://TopTrending.com Like us on Facebook: https://www.fa...',
     type: 'video',
     video: [ [Object], [Object] ] },
  al: 
   { ios: 
      { app_store_id: '544007664',
        app_name: 'YouTube',
        url: 'vnd.youtube://www.youtube.com/watch?v=7UaPL5PGywo&feature=applinks' },
     android: 
      { url: 'vnd.youtube://www.youtube.com/watch?v=7UaPL5PGywo&feature=applinks',
        app_name: 'YouTube',
        package: 'com.google.android.youtube' },
     web: { url: 'http://www.youtube.com/watch?v=7UaPL5PGywo&feature=applinks' } },
  twitter: 
   { card: 'player',
     site: { name: '@youtube' },
     url: 'http://www.youtube.com/watch?v=7UaPL5PGywo',
     title: '5 Most Dangerous Hackers Of All Time',
     description: 'Here are 5 of the most dangerous hackers to ever walk the streets of the Internet. Visit our site: http://TopTrending.com Like us on Facebook: https://www.fa...',
     image: 'https://i.ytimg.com/vi/7UaPL5PGywo/maxresdefault.jpg',
     app: { name: [Object], id: [Object], url: [Object] },
     player: 
      { name: 'https://www.youtube.com/embed/7UaPL5PGywo',
        width: '1280',
        height: '720' } },
  meta: 
   { url: 'http://www.youtube.com/watch?v=7UaPL5PGywo',
     name: '5 Most Dangerous Hackers Of All Time',
     description: 'Here are 5 of the most dangerous hackers to ever walk the streets of the Internet. Visit our site: http://TopTrending.com Like us on Facebook: https://www.fa...',
     paid: 'False',
     channelId: 'UCtg5C-d_3rPUgMaxr285mQQ',
     videoId: '7UaPL5PGywo',
     duration: 'PT4M32S',
     unlisted: 'False',
     author: { url: 'https://plus.google.com/113354316305697462391' },
     thumbnailUrl: 'https://i.ytimg.com/vi/7UaPL5PGywo/maxresdefault.jpg',
     thumbnail: 
      { url: 'https://i.ytimg.com/vi/7UaPL5PGywo/maxresdefault.jpg',
        width: '1280',
        height: '720' },
     embedURL: 'https://www.youtube.com/embed/7UaPL5PGywo',
     playerType: 'HTML5 Flash',
     width: '1280',
     height: '720',
     isFamilyFriendly: 'True',
     regionsAllowed: 'AD,AE,AF,AG,AI,AL,AM,AO,AQ,AR,AS,AT,AU,AW,AX,AZ,BA,BB,BD,BE,BF,BG,BH,BI,BJ,BL,BM,BN,BO,BQ,BR,BS,BT,BV,BW,BY,BZ,CA,CC,CD,CF,CG,CH,CI,CK,CL,CM,CN,CO,CR,CU,CV,CW,CX,CY,CZ,DE,DJ,DK,DM,DO,DZ,EC,EE,EG,EH,ER,ES,ET,FI,FJ,FK,FM,FO,FR,GA,GB,GD,GE,GF,GG,GH,GI,GL,GM,GN,GP,GQ,GR,GS,GT,GU,GW,GY,HK,HM,HN,HR,HT,HU,ID,IE,IL,IM,IN,IO,IQ,IR,IS,IT,JE,JM,JO,JP,KE,KG,KH,KI,KM,KN,KP,KR,KW,KY,KZ,LA,LB,LC,LI,LK,LR,LS,LT,LU,LV,LY,MA,MC,MD,ME,MF,MG,MH,MK,ML,MM,MN,MO,MP,MQ,MR,MS,MT,MU,MV,MW,MX,MY,MZ,NA,NC,NE,NF,NG,NI,NL,NO,NP,NR,NU,NZ,OM,PA,PE,PF,PG,PH,PK,PL,PM,PN,PR,PS,PT,PW,PY,QA,RE,RO,RS,RU,RW,SA,SB,SC,SD,SE,SG,SH,SI,SJ,SK,SL,SM,SN,SO,SR,SS,ST,SV,SX,SY,SZ,TC,TD,TF,TG,TH,TJ,TK,TL,TM,TN,TO,TR,TT,TV,TW,TZ,UA,UG,UM,US,UY,UZ,VA,VC,VE,VG,VI,VN,VU,WF,WS,YE,YT,ZA,ZM,ZW',
     interactionCount: '1730003',
     datePublished: '2015-02-15',
     genre: 'Education' } }
</pre>
