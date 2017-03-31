import moment from 'moment';

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function randomString(len = 18) {
  let text = '';
  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function roundDecimal(value, point) {
  return Math.round(value * Math.pow(10, point)) / Math.pow(10, point);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ajax( config ){
  var STATE_DONE = 4;
  var request = new XMLHttpRequest();
  var onSuccess = config.success || function(){};
  var onError = config.error || function(){};
  var onComplete = config.complete || function(){};
  var timeout = config.timeout || 30000;
  var timeoutId;

  function ajaxTimeout() {
    if( request.readyState !== STATE_DONE ){
      request.abort();
    }
  }

  function _handleResponse( request, type, response ){
    if( type === "plain" || type === "arraybuffer" )
      return response;
    if( type === "json" && typeof response === "object" ){
      if(!response){
        return new Error("invalid json resource");
      }
      return response;
    }
    var _json = null;
    try{
      _json = JSON.parse( response );
    }catch( e ){
      if( request.status == 200 ){
        return new Error("error occurred during parsing json response:" + e.message);
      }else{
        return new Error("(" + request.status + ") " + request.statusText);
      }
    }
    return _json;
  }

  request.onreadystatechange = function(){
    if( request.readyState == STATE_DONE ){
      var _res = _handleResponse( request, config.type, request.response );
      if( request.status == 200  ){
        if( _res instanceof Error ){
          onError( _res );
        }else{
          onSuccess( _res );
        }
        onComplete( _res );
      }else{
        onError( _res );
        onComplete( _res );
      }
      clearTimeout(timeoutId);
    }
  }
  if( config.method === "POST" || config.method === "PUT" ||
      config.method === "DELETE"){
    request.open(config.method, config.url);
    if( config.headers ){
      for(var i in config.headers ){
        request.setRequestHeader(i, config.headers[i]);
      }
    }
    var _dataStr = "";
    if( config.data ){
       for(var i in config.data){
          if( _dataStr )
            _dataStr += "&";
          _dataStr+= (i + "=" + config.data[i]);
       }
    }
    try{
      if(config.type === "arraybuffer"){
        request.responseType = "arraybuffer";
      }else if(config.type === "json"){
        request.responseType = "json";
      }
    }catch(e){}

    if( config.jsonStr ){
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      _dataStr = config.jsonStr;
    }else{
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    }
    request.send(_dataStr);
  }else if (config.method === "GET") {
    request.open("GET", config.url);
    if( config.headers ){
      for(var i in config.headers ){
        request.setRequestHeader(i, config.headers[i]);
      }
    }
    try{
      if(config.type === "arraybuffer"){
        request.responseType = "arraybuffer";
      }else if(config.type === "json"){
        request.responseType = "json";
      }
    }catch(e){}
    request.send();
  } else{
    throw new Error('UNKNOWN ajax request method')
  }
  timeoutId = setTimeout(ajaxTimeout, timeout);

  return request;
}
