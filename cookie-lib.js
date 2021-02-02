class CookieManager {
  /*
  Define constructor
   */
  constructor() {
    this.processedArray = [];
  }

  /*
  Track events
   */
  track = (eventName, properties) => {

    let cookieObject = {
      'event': eventName,
      'properties': properties
    };

    // Get current cookie value.
    let activeCookie = this.getCookie();

    if (activeCookie !== null) {
      this.processedArray = this.processObjectArray(activeCookie);
      this.processedArray.push(cookieObject);
    } else {
      this.processedArray.push(cookieObject);
    }
    this.setCookie();

  };

  /*
  Set cookies processed by Track method.
   */
  setCookie = () => {
    // Set expiry date from a year from today's date
    var CookieDate = new Date;
    CookieDate.setFullYear(CookieDate.getFullYear() + 1);
    document.cookie = 'myCookieObject=' + JSON.stringify(this.processedArray) + ';expires=' + CookieDate.toUTCString() + ';';
  };

  /*
  Get active cookie values.
   */
  getCookie = (name = 'myCookieObject') => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if (name == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return JSON.parse(decodeURIComponent(cookiePair[1]));
      }
    }

    // Return null if not found
    return null;
  };

  /*
  Delete active cookie.
   */
  deleteCookie = (name = 'myCookieObject') => {
    var d = new Date();
    d.setTime(d.getTime());
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + "" + ";" + expires;
  }

  /*
  Helper method for Track()
   */
  processObjectArray = (objectArray) => {
    let newObjectArray = [];

    Object.values(objectArray).forEach(val => {
      newObjectArray.push(val)
    });

    return newObjectArray;
  }
}
