window.addEventListener('message', (event) => {
  // Remove the leading #
  var params = new URLSearchParams(window.location.hash.substring(1));
  var token = params.get('access_token');
  if (token) {
    event.source.postMessage(
      {
        token: token,
      },
      event.origin,
    );
  } else {
    var error = params.get('error_description') || params.get('error');
    if (error) {
      event.source.postMessage(
        {
          error: error,
        },
        event.origin,
      );
    }
  }
});
