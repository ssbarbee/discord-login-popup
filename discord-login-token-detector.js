function parseExpiredIn(value) {
  var parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

function checkForCode(event) {
  var params = new URLSearchParams(window.location.search);
  var code = params.get('code');
  if (code) {
    event.source.postMessage(
      {
        code: code,
      },
      event.origin,
    );
  } else {
    var error = params.get('error_description') || params.get('error');
    if (error) {
      event.source.postMessage(
        {
          error: params.get('error'),
          error_description: params.get('error_description'),
        },
        event.origin,
      );
    }
  }
}

// https://discord.com/developers/docs/topics/oauth2#implicit-grant
function checkForToken(event) {
  // Remove the leading #
  var params = new URLSearchParams(window.location.hash.substring(1));
  var access_token = params.get('access_token');
  if (access_token) {
    var expires_in = parseExpiredIn(params.get('expires_in'));
    var token_type = params.get('token_type');
    var scope = params.get('scope');
    event.source.postMessage(
      {
        access_token,
        expires_in,
        token_type,
        scope,
      },
      event.origin,
    );
  } else {
    var error = params.get('error_description') || params.get('error');
    if (error) {
      event.source.postMessage(
        {
          error: params.get('error'),
          error_description: params.get('error_description'),
        },
        event.origin,
      );
    }
  }
}

window.addEventListener('message', event => {
  if (event.data.source !== 'discord-login-popup') {
    return;
  }

  if (event.data.params.responseType === 'code') {
    checkForCode(event);
  }
  if (event.data.params.responseType === 'token') {
    checkForToken(event);
  }
});
