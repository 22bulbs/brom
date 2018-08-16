console.log('spy script installed by brom');
//IFE that takes in the XMLHttpRequest prototype's open method as an argument
(function(open) {

  //reassigns XMLHttpRequest prototype's open method to a new function that takes all the same args
  XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
    const spyUrl = '/p4bcxeq3jgp2jvsx2tobdhs7';

    const requestInfo = { url };
    requestInfo.options = { method, async, user, pass};
    requestInfo.options.headers = {};

    this.requestInfo = requestInfo;
    if (url.match(/^\/[^/]/)) {
      open.call(this, method, url, async, user, pass);
    } else {
      //call's the original open method (passed in through args) with function.prototype.call method, passing down all original args
      //EXCEPT the url which is replaced with the newUrl we defined in the function body
      open.call(this, 'POST', spyUrl, async, user, pass);
    }
  }
})(XMLHttpRequest.prototype.open);

//to keep track of the XMLHttpRequest's headers, we'll have to hijack the .setRequestHeader
(function(setRequestHeader) {

  //reassigns XMLHttpRequest prototype's setRequestHeader method to a new function that takes all the same args, with the addition of an override
  //override is used so that when we add a "Content-Type": "application/json" header to send to our server, we don't add it to the list of 'actual' headers being added by the app
  XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
    //if override is included, add the header to the request without recording it to our requestInfo
    if (!this.requestInfo.url.match(/^\/[^/]/)) {
      //create a new key in our headers object with the corresponding value
      this.requestInfo.options.headers[header] = value;
    }
    //call the original setHeaderRequest method
    setRequestHeader.call(this, header, value);
  }
})(XMLHttpRequest.prototype.setRequestHeader);

//to hijack other methods, try creating new property on xhr object and then accessing that with xhr.send (after hijacking it as well)
(function(send) {

  //reassigns XMLHttpRequest prototype's send method to a new function that takes all the same args
  XMLHttpRequest.prototype.send = function(data) {
    if (this.requestInfo.url.match(/^\/[^/]/)) {
      send.call(this, data);
    } else {
      if (!this.requestInfo.options.headers.Accept) {
        this.setRequestHeader("Accept", "*/*")
      }
      this.requestInfo.data = data;
      const requestInfo = JSON.stringify(this.requestInfo);
      this.withCredentials = true;
      send.call(this, requestInfo);
    }
  }
})(XMLHttpRequest.prototype.send);


//doing the same with fetch just involves adding a return in front of the call
(function(fetch) {
  const spyUrl = '/p4bcxeq3jgp2jvsx2tobdhs7';
  window.fetch = function(input, init = {}) {
    if (input.match(/^\/[^/]/)) {
      return fetch.call(this, input, init);
    } else {
      const defaults = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'default',
        credentials: 'omit',
        headers: {},
        redirect: 'follow',
        referrer: 'client'
      };
      const requestInfo = {};
      requestInfo.url = input;
      const mergedInit = Object.assign(defaults, init)

      requestInfo.data = init.body;
      delete mergedInit.body;

      requestInfo.options = mergedInit;
      const newInit = {
        method: 'POST',
        body: JSON.stringify(requestInfo)
      }
      return fetch.call(this, spyUrl, newInit);
    }
  }
})(window.fetch);
