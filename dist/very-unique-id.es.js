var datatype = { exports: {} };
(function(module) {
  function Datatype2(faker2, seed) {
    if (Array.isArray(seed) && seed.length) {
      faker2.mersenne.seed_array(seed);
    } else if (!isNaN(seed)) {
      faker2.mersenne.seed(seed);
    }
    this.number = function(options) {
      if (typeof options === "number") {
        options = {
          max: options
        };
      }
      options = options || {};
      if (typeof options.min === "undefined") {
        options.min = 0;
      }
      if (typeof options.max === "undefined") {
        options.max = 99999;
      }
      if (typeof options.precision === "undefined") {
        options.precision = 1;
      }
      var max = options.max;
      if (max >= 0) {
        max += options.precision;
      }
      var randomNumber = Math.floor(faker2.mersenne.rand(max / options.precision, options.min / options.precision));
      randomNumber = randomNumber / (1 / options.precision);
      return randomNumber;
    };
    this.float = function(options) {
      if (typeof options === "number") {
        options = {
          precision: options
        };
      }
      options = options || {};
      var opts = {};
      for (var p in options) {
        opts[p] = options[p];
      }
      if (typeof opts.precision === "undefined") {
        opts.precision = 0.01;
      }
      return faker2.datatype.number(opts);
    };
    this.datetime = function(options) {
      if (typeof options === "number") {
        options = {
          max: options
        };
      }
      var minMax = 864e13;
      options = options || {};
      if (typeof options.min === "undefined" || options.min < minMax * -1) {
        options.min = new Date().setFullYear(1990, 1, 1);
      }
      if (typeof options.max === "undefined" || options.max > minMax) {
        options.max = new Date().setFullYear(2100, 1, 1);
      }
      var random2 = faker2.datatype.number(options);
      return new Date(random2);
    };
    this.string = function(length) {
      if (length === void 0) {
        length = 10;
      }
      var maxLength = Math.pow(2, 20);
      if (length >= maxLength) {
        length = maxLength;
      }
      var charCodeOption = {
        min: 33,
        max: 125
      };
      var returnString = "";
      for (var i = 0; i < length; i++) {
        returnString += String.fromCharCode(faker2.datatype.number(charCodeOption));
      }
      return returnString;
    };
    this.uuid = function() {
      var RFC4122_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
      var replacePlaceholders = function(placeholder) {
        var random2 = faker2.datatype.number({ min: 0, max: 15 });
        var value = placeholder == "x" ? random2 : random2 & 3 | 8;
        return value.toString(16);
      };
      return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    };
    this.boolean = function() {
      return !!faker2.datatype.number(1);
    };
    this.hexaDecimal = function hexaDecimal(count) {
      if (typeof count === "undefined") {
        count = 1;
      }
      var wholeString = "";
      for (var i = 0; i < count; i++) {
        wholeString += faker2.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
      }
      return "0x" + wholeString;
    };
    this.json = function json() {
      var properties = ["foo", "bar", "bike", "a", "b", "name", "prop"];
      var returnObject = {};
      properties.forEach(function(prop) {
        returnObject[prop] = faker2.datatype.boolean() ? faker2.datatype.string() : faker2.datatype.number();
      });
      return JSON.stringify(returnObject);
    };
    this.array = function array(length) {
      if (length === void 0) {
        length = 10;
      }
      var returnArray = new Array(length);
      for (var i = 0; i < length; i++) {
        returnArray[i] = faker2.datatype.boolean() ? faker2.datatype.string() : faker2.datatype.number();
      }
      return returnArray;
    };
    return this;
  }
  module["exports"] = Datatype2;
})(datatype);
var Datatype = datatype.exports;
var mersenne$1 = {};
function MersenneTwister19937() {
  var N, M, MATRIX_A, UPPER_MASK, LOWER_MASK;
  N = 624;
  M = 397;
  MATRIX_A = 2567483615;
  UPPER_MASK = 2147483648;
  LOWER_MASK = 2147483647;
  var mt = new Array(N);
  var mti = N + 1;
  function unsigned32(n1) {
    return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
  }
  function subtraction32(n1, n2) {
    return n1 < n2 ? unsigned32(4294967296 - (n2 - n1) & 4294967295) : n1 - n2;
  }
  function addition32(n1, n2) {
    return unsigned32(n1 + n2 & 4294967295);
  }
  function multiplication32(n1, n2) {
    var sum = 0;
    for (var i = 0; i < 32; ++i) {
      if (n1 >>> i & 1) {
        sum = addition32(sum, unsigned32(n2 << i));
      }
    }
    return sum;
  }
  this.init_genrand = function(s) {
    mt[0] = unsigned32(s & 4294967295);
    for (mti = 1; mti < N; mti++) {
      mt[mti] = addition32(multiplication32(1812433253, unsigned32(mt[mti - 1] ^ mt[mti - 1] >>> 30)), mti);
      mt[mti] = unsigned32(mt[mti] & 4294967295);
    }
  };
  this.init_by_array = function(init_key, key_length) {
    var i, j, k;
    this.init_genrand(19650218);
    i = 1;
    j = 0;
    k = N > key_length ? N : key_length;
    for (; k; k--) {
      mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i - 1] ^ mt[i - 1] >>> 30), 1664525)), init_key[j]), j);
      mt[i] = unsigned32(mt[i] & 4294967295);
      i++;
      j++;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
      if (j >= key_length) {
        j = 0;
      }
    }
    for (k = N - 1; k; k--) {
      mt[i] = subtraction32(unsigned32((dbg = mt[i]) ^ multiplication32(unsigned32(mt[i - 1] ^ mt[i - 1] >>> 30), 1566083941)), i);
      mt[i] = unsigned32(mt[i] & 4294967295);
      i++;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
    }
    mt[0] = 2147483648;
  };
  var mag01 = [0, MATRIX_A];
  this.genrand_int32 = function() {
    var y;
    if (mti >= N) {
      var kk;
      if (mti == N + 1) {
        this.init_genrand(5489);
      }
      for (kk = 0; kk < N - M; kk++) {
        y = unsigned32(mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK);
        mt[kk] = unsigned32(mt[kk + M] ^ y >>> 1 ^ mag01[y & 1]);
      }
      for (; kk < N - 1; kk++) {
        y = unsigned32(mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK);
        mt[kk] = unsigned32(mt[kk + (M - N)] ^ y >>> 1 ^ mag01[y & 1]);
      }
      y = unsigned32(mt[N - 1] & UPPER_MASK | mt[0] & LOWER_MASK);
      mt[N - 1] = unsigned32(mt[M - 1] ^ y >>> 1 ^ mag01[y & 1]);
      mti = 0;
    }
    y = mt[mti++];
    y = unsigned32(y ^ y >>> 11);
    y = unsigned32(y ^ y << 7 & 2636928640);
    y = unsigned32(y ^ y << 15 & 4022730752);
    y = unsigned32(y ^ y >>> 18);
    return y;
  };
  this.genrand_int31 = function() {
    return this.genrand_int32() >>> 1;
  };
  this.genrand_real1 = function() {
    return this.genrand_int32() * (1 / 4294967295);
  };
  this.genrand_real2 = function() {
    return this.genrand_int32() * (1 / 4294967296);
  };
  this.genrand_real3 = function() {
    return (this.genrand_int32() + 0.5) * (1 / 4294967296);
  };
  this.genrand_res53 = function() {
    var a = this.genrand_int32() >>> 5, b = this.genrand_int32() >>> 6;
    return (a * 67108864 + b) * (1 / 9007199254740992);
  };
}
mersenne$1.MersenneTwister19937 = MersenneTwister19937;
var Gen = mersenne$1.MersenneTwister19937;
function Mersenne() {
  var gen = new Gen();
  gen.init_genrand(new Date().getTime() % 1e9);
  this.rand = function(max, min) {
    if (max === void 0) {
      min = 0;
      max = 32768;
    }
    return Math.floor(gen.genrand_real2() * (max - min) + min);
  };
  this.seed = function(S) {
    if (typeof S != "number") {
      throw new Error("seed(S) must take numeric argument; is " + typeof S);
    }
    gen.init_genrand(S);
  };
  this.seed_array = function(A) {
    if (typeof A != "object") {
      throw new Error("seed_array(A) must take array of numbers; is " + typeof A);
    }
    gen.init_by_array(A, A.length);
  };
}
var mersenne = Mersenne;
var unique$1 = { exports: {} };
var unique = {};
var found = {};
var exclude = [];
var currentIterations = 0;
var defaultCompare = function(obj, key) {
  if (typeof obj[key] === "undefined") {
    return -1;
  }
  return 0;
};
unique.errorMessage = function(now, code, opts) {
  console.error("error", code);
  console.log("found", Object.keys(found).length, "unique entries before throwing error. \nretried:", currentIterations, "\ntotal time:", now - opts.startTime, "ms");
  throw new Error(code + " for uniqueness check \n\nMay not be able to generate any more unique values with current settings. \nTry adjusting maxTime or maxRetries parameters for faker.unique()");
};
unique.exec = function(method, args, opts) {
  var now = new Date().getTime();
  opts = opts || {};
  opts.maxTime = opts.maxTime || 3;
  opts.maxRetries = opts.maxRetries || 50;
  opts.exclude = opts.exclude || exclude;
  opts.compare = opts.compare || defaultCompare;
  if (typeof opts.currentIterations !== "number") {
    opts.currentIterations = 0;
  }
  if (typeof opts.startTime === "undefined") {
    opts.startTime = new Date().getTime();
  }
  var startTime = opts.startTime;
  if (typeof opts.exclude === "string") {
    opts.exclude = [opts.exclude];
  }
  if (opts.currentIterations > 0)
    ;
  if (now - startTime >= opts.maxTime) {
    return unique.errorMessage(now, "Exceeded maxTime:" + opts.maxTime, opts);
  }
  if (opts.currentIterations >= opts.maxRetries) {
    return unique.errorMessage(now, "Exceeded maxRetries:" + opts.maxRetries, opts);
  }
  var result = method.apply(this, args);
  if (opts.compare(found, result) === -1 && opts.exclude.indexOf(result) === -1) {
    found[result] = result;
    opts.currentIterations = 0;
    return result;
  } else {
    opts.currentIterations++;
    return unique.exec(method, args, opts);
  }
};
var unique_1 = unique;
(function(module) {
  var uniqueExec = unique_1;
  function Unique2(faker2) {
    var maxTime = 10;
    var maxRetries = 10;
    this.unique = function unique2(method, args, opts) {
      opts = opts || {};
      opts.startTime = new Date().getTime();
      if (typeof opts.maxTime !== "number") {
        opts.maxTime = maxTime;
      }
      if (typeof opts.maxRetries !== "number") {
        opts.maxRetries = maxRetries;
      }
      opts.currentIterations = 0;
      return uniqueExec.exec(method, args, opts);
    };
  }
  module["exports"] = Unique2;
})(unique$1);
var Unique = unique$1.exports;
var random = { exports: {} };
(function(module) {
  var arrayRemove = function(arr, values) {
    values.forEach(function(value) {
      arr = arr.filter(function(ele) {
        return ele !== value;
      });
    });
    return arr;
  };
  function Random2(faker2, seed) {
    if (Array.isArray(seed) && seed.length) {
      faker2.mersenne.seed_array(seed);
    } else if (!isNaN(seed)) {
      faker2.mersenne.seed(seed);
    }
    this.number = function(options) {
      console.log("Deprecation Warning: faker.random.number is now located in faker.datatype.number");
      return faker2.datatype.number(options);
    };
    this.float = function(options) {
      console.log("Deprecation Warning: faker.random.float is now located in faker.datatype.float");
      return faker2.datatype.float(options);
    };
    this.arrayElement = function(array) {
      array = array || ["a", "b", "c"];
      var r = faker2.datatype.number({ max: array.length - 1 });
      return array[r];
    };
    this.arrayElements = function(array, count) {
      array = array || ["a", "b", "c"];
      if (typeof count !== "number") {
        count = faker2.datatype.number({ min: 1, max: array.length });
      } else if (count > array.length) {
        count = array.length;
      } else if (count < 0) {
        count = 0;
      }
      var arrayCopy = array.slice(0);
      var i = array.length;
      var min = i - count;
      var temp;
      var index;
      while (i-- > min) {
        index = Math.floor((i + 1) * faker2.datatype.float({ min: 0, max: 0.99 }));
        temp = arrayCopy[index];
        arrayCopy[index] = arrayCopy[i];
        arrayCopy[i] = temp;
      }
      return arrayCopy.slice(min);
    };
    this.objectElement = function(object, field) {
      object = object || { "foo": "bar", "too": "car" };
      var array = Object.keys(object);
      var key = faker2.random.arrayElement(array);
      return field === "key" ? key : object[key];
    };
    this.uuid = function() {
      console.log("Deprecation Warning: faker.random.uuid is now located in faker.datatype.uuid");
      return faker2.datatype.uuid();
    };
    this.boolean = function() {
      console.log("Deprecation Warning: faker.random.boolean is now located in faker.datatype.boolean");
      return faker2.datatype.boolean();
    };
    this.word = function randomWord(type) {
      var wordMethods = [
        "commerce.department",
        "commerce.productName",
        "commerce.productAdjective",
        "commerce.productMaterial",
        "commerce.product",
        "commerce.color",
        "company.catchPhraseAdjective",
        "company.catchPhraseDescriptor",
        "company.catchPhraseNoun",
        "company.bsAdjective",
        "company.bsBuzz",
        "company.bsNoun",
        "address.streetSuffix",
        "address.county",
        "address.country",
        "address.state",
        "finance.accountName",
        "finance.transactionType",
        "finance.currencyName",
        "hacker.noun",
        "hacker.verb",
        "hacker.adjective",
        "hacker.ingverb",
        "hacker.abbreviation",
        "name.jobDescriptor",
        "name.jobArea",
        "name.jobType"
      ];
      var randomWordMethod = faker2.random.arrayElement(wordMethods);
      var result = faker2.fake("{{" + randomWordMethod + "}}");
      return faker2.random.arrayElement(result.split(" "));
    };
    this.words = function randomWords(count) {
      var words = [];
      if (typeof count === "undefined") {
        count = faker2.datatype.number({ min: 1, max: 3 });
      }
      for (var i = 0; i < count; i++) {
        words.push(faker2.random.word());
      }
      return words.join(" ");
    };
    this.image = function randomImage() {
      return faker2.image.image();
    };
    this.locale = function randomLocale() {
      return faker2.random.arrayElement(Object.keys(faker2.locales));
    };
    this.alpha = function alpha(options) {
      if (typeof options === "undefined") {
        options = {
          count: 1
        };
      } else if (typeof options === "number") {
        options = {
          count: options
        };
      } else if (typeof options.count === "undefined") {
        options.count = 1;
      }
      if (typeof options.upcase === "undefined") {
        options.upcase = false;
      }
      if (typeof options.bannedChars === "undefined") {
        options.bannedChars = [];
      }
      var wholeString = "";
      var charsArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      if (options.bannedChars) {
        charsArray = arrayRemove(charsArray, options.bannedChars);
      }
      for (var i = 0; i < options.count; i++) {
        wholeString += faker2.random.arrayElement(charsArray);
      }
      return options.upcase ? wholeString.toUpperCase() : wholeString;
    };
    this.alphaNumeric = function alphaNumeric(count, options) {
      if (typeof count === "undefined") {
        count = 1;
      }
      if (typeof options === "undefined") {
        options = {};
      }
      if (typeof options.bannedChars === "undefined") {
        options.bannedChars = [];
      }
      var wholeString = "";
      var charsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      if (options) {
        if (options.bannedChars) {
          charsArray = arrayRemove(charsArray, options.bannedChars);
        }
      }
      for (var i = 0; i < count; i++) {
        wholeString += faker2.random.arrayElement(charsArray);
      }
      return wholeString;
    };
    this.hexaDecimal = function hexaDecimal(count) {
      console.log("Deprecation Warning: faker.random.hexaDecimal is now located in faker.datatype.hexaDecimal");
      return faker2.datatype.hexaDecimal(count);
    };
    return this;
  }
  module["exports"] = Random2;
})(random);
var Random = random.exports;
var helpers = { exports: {} };
(function(module) {
  var Helpers2 = function(faker2) {
    var self = this;
    self.randomize = function(array) {
      array = array || ["a", "b", "c"];
      return faker2.random.arrayElement(array);
    };
    self.slugify = function(string) {
      string = string || "";
      return string.replace(/ /g, "-").replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, "");
    };
    self.replaceSymbolWithNumber = function(string, symbol) {
      string = string || "";
      if (symbol === void 0) {
        symbol = "#";
      }
      var str = "";
      for (var i = 0; i < string.length; i++) {
        if (string.charAt(i) == symbol) {
          str += faker2.datatype.number(9);
        } else if (string.charAt(i) == "!") {
          str += faker2.datatype.number({ min: 2, max: 9 });
        } else {
          str += string.charAt(i);
        }
      }
      return str;
    };
    self.replaceSymbols = function(string) {
      string = string || "";
      var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      var str = "";
      for (var i = 0; i < string.length; i++) {
        if (string.charAt(i) == "#") {
          str += faker2.datatype.number(9);
        } else if (string.charAt(i) == "?") {
          str += faker2.random.arrayElement(alpha);
        } else if (string.charAt(i) == "*") {
          str += faker2.datatype.boolean() ? faker2.random.arrayElement(alpha) : faker2.datatype.number(9);
        } else {
          str += string.charAt(i);
        }
      }
      return str;
    };
    self.replaceCreditCardSymbols = function(string, symbol) {
      string = string || "6453-####-####-####-###L";
      symbol = symbol || "#";
      var getCheckBit = function(number) {
        number.reverse();
        number = number.map(function(num, index) {
          if (index % 2 === 0) {
            num *= 2;
            if (num > 9) {
              num -= 9;
            }
          }
          return num;
        });
        var sum = number.reduce(function(prev, curr) {
          return prev + curr;
        });
        return sum % 10;
      };
      string = faker2.helpers.regexpStyleStringParse(string);
      string = faker2.helpers.replaceSymbolWithNumber(string, symbol);
      var numberList = string.replace(/\D/g, "").split("").map(function(num) {
        return parseInt(num);
      });
      var checkNum = getCheckBit(numberList);
      return string.replace("L", checkNum);
    };
    self.repeatString = function(string, num) {
      if (typeof num === "undefined") {
        num = 0;
      }
      var text = "";
      for (var i = 0; i < num; i++) {
        text += string.toString();
      }
      return text;
    };
    self.regexpStyleStringParse = function(string) {
      string = string || "";
      var RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
      var REP_REG = /(.)\{(\d+)\}/;
      var RANGE_REG = /\[(\d+)\-(\d+)\]/;
      var min, max, tmp, repetitions;
      var token = string.match(RANGE_REP_REG);
      while (token !== null) {
        min = parseInt(token[2]);
        max = parseInt(token[3]);
        if (min > max) {
          tmp = max;
          max = min;
          min = tmp;
        }
        repetitions = faker2.datatype.number({ min, max });
        string = string.slice(0, token.index) + faker2.helpers.repeatString(token[1], repetitions) + string.slice(token.index + token[0].length);
        token = string.match(RANGE_REP_REG);
      }
      token = string.match(REP_REG);
      while (token !== null) {
        repetitions = parseInt(token[2]);
        string = string.slice(0, token.index) + faker2.helpers.repeatString(token[1], repetitions) + string.slice(token.index + token[0].length);
        token = string.match(REP_REG);
      }
      token = string.match(RANGE_REG);
      while (token !== null) {
        min = parseInt(token[1]);
        max = parseInt(token[2]);
        if (min > max) {
          tmp = max;
          max = min;
          min = tmp;
        }
        string = string.slice(0, token.index) + faker2.datatype.number({ min, max }).toString() + string.slice(token.index + token[0].length);
        token = string.match(RANGE_REG);
      }
      return string;
    };
    self.shuffle = function(o) {
      if (typeof o === "undefined" || o.length === 0) {
        return o || [];
      }
      o = o || ["a", "b", "c"];
      for (var x, j, i = o.length - 1; i > 0; --i) {
        j = faker2.datatype.number(i);
        x = o[i];
        o[i] = o[j];
        o[j] = x;
      }
      return o;
    };
    self.mustache = function(str, data) {
      if (typeof str === "undefined") {
        return "";
      }
      for (var p in data) {
        var re = new RegExp("{{" + p + "}}", "g");
        str = str.replace(re, data[p]);
      }
      return str;
    };
    self.createCard = function() {
      return {
        "name": faker2.name.findName(),
        "username": faker2.internet.userName(),
        "email": faker2.internet.email(),
        "address": {
          "streetA": faker2.address.streetName(),
          "streetB": faker2.address.streetAddress(),
          "streetC": faker2.address.streetAddress(true),
          "streetD": faker2.address.secondaryAddress(),
          "city": faker2.address.city(),
          "state": faker2.address.state(),
          "country": faker2.address.country(),
          "zipcode": faker2.address.zipCode(),
          "geo": {
            "lat": faker2.address.latitude(),
            "lng": faker2.address.longitude()
          }
        },
        "phone": faker2.phone.phoneNumber(),
        "website": faker2.internet.domainName(),
        "company": {
          "name": faker2.company.companyName(),
          "catchPhrase": faker2.company.catchPhrase(),
          "bs": faker2.company.bs()
        },
        "posts": [
          {
            "words": faker2.lorem.words(),
            "sentence": faker2.lorem.sentence(),
            "sentences": faker2.lorem.sentences(),
            "paragraph": faker2.lorem.paragraph()
          },
          {
            "words": faker2.lorem.words(),
            "sentence": faker2.lorem.sentence(),
            "sentences": faker2.lorem.sentences(),
            "paragraph": faker2.lorem.paragraph()
          },
          {
            "words": faker2.lorem.words(),
            "sentence": faker2.lorem.sentence(),
            "sentences": faker2.lorem.sentences(),
            "paragraph": faker2.lorem.paragraph()
          }
        ],
        "accountHistory": [faker2.helpers.createTransaction(), faker2.helpers.createTransaction(), faker2.helpers.createTransaction()]
      };
    };
    self.contextualCard = function() {
      var name = faker2.name.firstName(), userName = faker2.internet.userName(name);
      return {
        "name": name,
        "username": userName,
        "avatar": faker2.internet.avatar(),
        "email": faker2.internet.email(userName),
        "dob": faker2.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")),
        "phone": faker2.phone.phoneNumber(),
        "address": {
          "street": faker2.address.streetName(true),
          "suite": faker2.address.secondaryAddress(),
          "city": faker2.address.city(),
          "zipcode": faker2.address.zipCode(),
          "geo": {
            "lat": faker2.address.latitude(),
            "lng": faker2.address.longitude()
          }
        },
        "website": faker2.internet.domainName(),
        "company": {
          "name": faker2.company.companyName(),
          "catchPhrase": faker2.company.catchPhrase(),
          "bs": faker2.company.bs()
        }
      };
    };
    self.userCard = function() {
      return {
        "name": faker2.name.findName(),
        "username": faker2.internet.userName(),
        "email": faker2.internet.email(),
        "address": {
          "street": faker2.address.streetName(true),
          "suite": faker2.address.secondaryAddress(),
          "city": faker2.address.city(),
          "zipcode": faker2.address.zipCode(),
          "geo": {
            "lat": faker2.address.latitude(),
            "lng": faker2.address.longitude()
          }
        },
        "phone": faker2.phone.phoneNumber(),
        "website": faker2.internet.domainName(),
        "company": {
          "name": faker2.company.companyName(),
          "catchPhrase": faker2.company.catchPhrase(),
          "bs": faker2.company.bs()
        }
      };
    };
    self.createTransaction = function() {
      return {
        "amount": faker2.finance.amount(),
        "date": new Date(2012, 1, 2),
        "business": faker2.company.companyName(),
        "name": [faker2.finance.accountName(), faker2.finance.mask()].join(" "),
        "type": self.randomize(faker2.definitions.finance.transaction_type),
        "account": faker2.finance.account()
      };
    };
    return self;
  };
  module["exports"] = Helpers2;
})(helpers);
var Helpers = helpers.exports;
function Faker(opts) {
  var self = this;
  opts = opts || {};
  var locales = self.locales || opts.locales || {};
  var locale = self.locale || opts.locale || "en";
  var localeFallback = self.localeFallback || opts.localeFallback || "en";
  self.locales = locales;
  self.locale = locale;
  self.localeFallback = localeFallback;
  self.definitions = {};
  self.unique = new Unique(self).unique;
  self.mersenne = new mersenne();
  self.random = new Random(self);
  self.helpers = new Helpers(self);
  self.datatype = new Datatype(self);
}
var faker = new Faker({ locale: "en", localeFallback: "en" });
faker.locales.en = {};
const monsters = [
  "Alicorn",
  "Banshee",
  "Basilisk",
  "Bigfoot",
  "Black Dog",
  "Black Eyed Being",
  "Bogeyman",
  "Bogle",
  "Bray Road Beast",
  "Brownie",
  "Centaur",
  "Cerberus",
  "Charybdis",
  "Chimera",
  "Cockatrice",
  "Cyclops",
  "Cynocephalus",
  "Demon",
  "Doppelganger",
  "Dragon",
  "Dwarf",
  "Echidna",
  "Elf",
  "Fairy",
  "Ghost",
  "Gnome",
  "Goblin",
  "Golem",
  "Gorgon",
  "Griffin",
  "Grim Reaper",
  "Hobgoblin",
  "Hydra",
  "Imp",
  "Ladon",
  "Leprechaun",
  "Loch Ness Monster",
  "Manticore",
  "Medusa",
  "Mermaid",
  "Minotaur",
  "Mothman",
  "Mutant",
  "Nemean Lion",
  "New Jersey Devil",
  "Nymph",
  "Ogre",
  "Orthros",
  "Pegasus",
  "Phoenix",
  "Pixie",
  "Sasquatch",
  "Satyr",
  "Scylla",
  "Sea Monster",
  "Sea-Goat",
  "Shade",
  "Shapeshifter",
  "Siren",
  "Sphinx",
  "Sprite",
  "Sylph",
  "Thunderbird",
  "Typhon",
  "Unicorn",
  "Valkyrie",
  "Vampire",
  "Wendigo",
  "Will-o'-the-wisp",
  "Werewolf",
  "Wraith",
  "Zombie"
];
var color = { exports: {} };
(function(module) {
  module["exports"] = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "mint green",
    "teal",
    "white",
    "black",
    "orange",
    "pink",
    "grey",
    "maroon",
    "violet",
    "turquoise",
    "tan",
    "sky blue",
    "salmon",
    "plum",
    "orchid",
    "olive",
    "magenta",
    "lime",
    "ivory",
    "indigo",
    "gold",
    "fuchsia",
    "cyan",
    "azure",
    "lavender",
    "silver"
  ];
})(color);
var colors = color.exports;
function getColoredMonster() {
  const color2 = faker.random.arrayElement(colors).replace(/\s/g, "-").toLowerCase();
  const monster = faker.random.arrayElement(monsters).replace(/\s/g, "-").toLowerCase();
  return color2 + "-" + monster;
}
function getUniqueMonster() {
  return faker.unique(getColoredMonster, null, { maxTime: 500 });
}
export { getUniqueMonster as default };
