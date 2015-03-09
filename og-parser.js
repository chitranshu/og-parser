var htmlparser = require("htmlparser2"),
  string = require('string'),
  request = require('request'),
  meta = {},
  currTag = null;

function unescape(str) {
  return;
}

function setOg(meta, name, value) {
  if (!meta.og) {
    meta.og = {}
  }
  if (typeof value === "string") {
    value = string(value).unescapeHTML().s;
  }
  if (meta.og[name]) {
    if (!Array.isArray(meta.og[name])) {
      meta.og[name] = [meta.og[name]];
    }
    meta.og[name].push(value);
  } else {
    meta.og[name] = value;
  }
}

function assign(obj, prop, value) {
  if (typeof prop === "string")
    prop = prop.split(":");

  if (prop.length > 1) {
    var e = prop.shift();
    assign(obj[e] =
      Object.prototype.toString.call(obj[e]) === "[object Object]" ? obj[e] : {},
      prop,
      value);
  } else {
    if (typeof value === "string") {
      value = string(value).unescapeHTML().s;
    }
    obj[prop[0]] = value;
  }
}

var parser = new htmlparser.Parser({
  onopentag: function(name, attribs) {
    if (name === 'head') {
      currTag = "head";
    } else if (currTag === "head" && name === "meta") {
      currTag = "head/meta";
      var name = attribs.property,
        value = attribs.content;
      if (attribs.name) {
        name = attribs.name;
      }
      if (name === 'title') {
        meta.title = value;
      } else if (name === 'description') {
        meta.description = value;
      }
      if (name.indexOf('twitter:') === 0 || name.indexOf('al:') === 0) {
        assign(meta, name, value);
      } else {
        switch (name) {
          case 'og:title':
          case 'og:description':
          case 'og:type':
          case 'og:url':
          case 'og:determiner':
          case 'og:site_name':
            setOg(meta, name.substring(3), value);
            break;
          case 'og:locale':
            {
              setOg(meta, 'locale', {
                name: value
              });
              break;
            }
          case 'og:locale:alternate':
            {
              if (meta.og.locale) {
                if (!meta.og.locale.alternate) {
                  meta.og.locale.alternate = [];
                }
                meta.og.locale.alternate.push(value);
              }
              break;
            }
          case 'og:image':
          case 'og:image:url':
            {
              var obj = {
                url: value
              };
              setOg(meta, 'image', obj);
              break;
            }
          case 'og:image:type':
          case 'og:image:width':
          case 'og:image:height':
          case 'og:image:secure_url':
            {
              var image = {}
              if (meta.og.image) {
                image = meta.og.image
                if (Array.isArray(meta.og.image)) {
                  image = meta.og.image[meta.og.image.length - 1];
                }
              } else {
                setOg(meta, 'image', image);
              }
              image[name.substring(9)] = value;
              break;
            }
          case 'og:audio':
          case 'og:audio:url':
            {
              var obj = {
                url: value
              };
              setOg(meta, 'audio', obj);
              break;
            }
          case 'og:audio:type':
          case 'og:audio:secure_url':
            {
              var audio = {}
              if (meta.og.audio) {
                audio = meta.og.audio;
                if (Array.isArray(meta.og.audio)) {
                  audio = meta.og.audio[meta.og.audio.length - 1];
                }
              } else {
                setOg(meta, 'audio', audio);
              }
              audio[name.substring(9)] = value;
              break;
            }
          case 'og:video':
          case 'og:video:url':
            {
              var obj = {
                url: value
              };
              setOg(meta, 'video', obj);
              break;
            }
          case 'og:video:type':
          case 'og:video:width':
          case 'og:video:height':
          case 'og:video:secure_url':
            {
              var video = {}
              if (meta.og.video) {
                video = meta.og.video
                if (Array.isArray(meta.og.video)) {
                  video = meta.og.video[meta.og.video.length - 1];
                }
              } else {
                setOg(meta, 'video', video);
              }
              video[name.substring(9)] = value;
              break;
            }
        }
      }
    } else if (currTag === "head" && name === "title") {
      currTag = "head/title";
    }
    if (currTag === "head") {
      // TODO: get more details
    }
  },
  ontext: function(text) {
    if (currTag === "head/title") {
      meta.title = text;
    }
  },
  onclosetag: function(tagname) {
    if (currTag === "head/title" && tagname === "title") {
      currTag = "head";
    } else if (currTag === "head/meta" && tagname === "meta") {
      currTag = "head"
    } else if (currTag === "head" && tagname === "head") {
      currTag = null;
    }
  }
});

function isImage(contentType) {
  switch (contentType) {
    case "image/gif":
    case "image/jpeg":
    case "image/pjpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/tiff":
    case "image/vnd.djvu":
    case "image/example":
      return true;
    default:
      return false;
  }
}

function getOGData(url, callback) {
  if (!callback) {
    return;
  }
  request(url, function(error, response, body) {
    if (error) {
      callback(error, null);
    }
    meta = {};
    if (response.statusCode == 200) {
      if (isImage(response.headers['content-type'])) {
        callback(null, {
          image: url
        });
      } else {
        parser.write(body);
        parser.end();
        callback(null, meta);
      }
    } else {
      callback(null, null);
    }
  });
}

module.exports = getOGData;
