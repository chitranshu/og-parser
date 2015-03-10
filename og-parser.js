var htmlparser = require("htmlparser2"),
  string = require('string'),
  request = require('request'),
  meta = {},
  currTag = null;

function _og() {};
_og.prototype._set_og = function(inoutMeta, name, value) {
  if (!inoutMeta.og) {
    inoutMeta.og = {}
  }
  if (typeof value === "string") {
    value = string(value).unescapeHTML().s;
  }
  if (inoutMeta.og[name]) {
    if (!Array.isArray(inoutMeta.og[name])) {
      inoutMeta.og[name] = [inoutMeta.og[name]];
    }
    inoutMeta.og[name].push(value);
  } else {
    inoutMeta.og[name] = value;
  }
};

_og.prototype._process_header = function(inoutMeta, name, value) {
  switch (name) {
    case 'og:title':
    case 'og:description':
    case 'og:type':
    case 'og:url':
    case 'og:determiner':
    case 'og:site_name':
      this._set_og(inoutMeta, name.substring(3), value);
      break;
    case 'og:locale':
      {
        this._set_og(inoutMeta, 'locale', {
          name: value
        });
        break;
      }
    case 'og:locale:alternate':
      {
        if (inoutMeta.og.locale) {
          if (!inoutMeta.og.locale.alternate) {
            inoutMeta.og.locale.alternate = [];
          }
          inoutMeta.og.locale.alternate.push(value);
        }
        break;
      }
    case 'og:image':
    case 'og:image:url':
      {
        var obj = {
          url: value
        };
        this._set_og(inoutMeta, 'image', obj);
        break;
      }
    case 'og:image:type':
    case 'og:image:width':
    case 'og:image:height':
    case 'og:image:secure_url':
      {
        var image = {}
        if (inoutMeta.og.image) {
          image = inoutMeta.og.image
          if (Array.isArray(inoutMeta.og.image)) {
            image = inoutMeta.og.image[inoutMeta.og.image.length - 1];
          }
        } else {
          this._set_og(inoutMeta, 'image', image);
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
        this._set_og(inoutMeta, 'audio', obj);
        break;
      }
    case 'og:audio:type':
    case 'og:audio:secure_url':
      {
        var audio = {}
        if (inoutMeta.og.audio) {
          audio = inoutMeta.og.audio;
          if (Array.isArray(inoutMeta.og.audio)) {
            audio = inoutMeta.og.audio[inoutMeta.og.audio.length - 1];
          }
        } else {
          this._set_og(inoutMeta, 'audio', audio);
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
        this._set_og(inoutMeta, 'video', obj);
        break;
      }
    case 'og:video:type':
    case 'og:video:width':
    case 'og:video:height':
    case 'og:video:secure_url':
      {
        var video = {}
        if (inoutMeta.og.video) {
          video = inoutMeta.og.video
          if (Array.isArray(inoutMeta.og.video)) {
            video = inoutMeta.og.video[inoutMeta.og.video.length - 1];
          }
        } else {
          this._set_og(inoutMeta, 'video', video);
        }
        video[name.substring(9)] = value;
        break;
      }
  }
};

var og = new _og();

function _util() {};
_util.prototype._assign = function(obj, prop, value) {
  if (typeof prop === "string")
    prop = prop.split(":");

  if (prop.length > 1) {
    var e = prop.shift();
    this._assign(obj[e] =
      Object.prototype.toString.call(obj[e]) === "[object Object]" ? obj[e] : {},
      prop,
      value);
  } else {
    if (typeof value === "string") {
      value = string(value).unescapeHTML().s;
    }
    obj[prop[0]] = value;
  }
};
_util.prototype._is_image = function(contentType) {
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
};

var util = new _util();

var parser = new htmlparser.Parser({
  onopentag: function(name, attribs) {
    if (name === 'head') {
      currTag = "head";
    } else if (currTag === "head" && name === "meta") {
      var n = attribs.property,
        v = attribs.content;
      if (attribs.name) {
        n = attribs.name;
      }
      if (name === 'title') {
        meta.title = value;
      } else if (name === 'description') {
        meta.description = value;
      }
      if (n) {
        if (n.indexOf('twitter:') === 0 || n.indexOf('al:') === 0) {
          util._assign(meta, n, v);
        } else if (n.indexOf('og:') === 0) {
          og._process_header(meta, n, v);
        }
      }
    } else if (currTag === "head" && name === "title") {
      currTag = "head/title";
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
    } else if (currTag === "head" && tagname === "head") {
      currTag = null;
    }
  }
});
var _get_og_data = function(url, callback) {
  if (!callback) {
    return;
  }
  var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36',
    'Accept-Language': 'en-US'
  }
  var options = {
      url: url,
      method: 'GET',
      headers: headers
  }

  request(options, function(error, response, body) {
    if (error) {
      callback(error, null);
    }
    meta = {};
    if (response.statusCode == 200) {
      if (util._is_image(response.headers['content-type'])) {
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
};

module.exports = _get_og_data;
