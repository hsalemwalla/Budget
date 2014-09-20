sendRequest(
    'users/test', 
    { data: JSON.stringify({ intent: 'test Intent'})}
);



function sendRequest(url, data) {
  $.ajax({
    url: url,
    type: 'PUT',
    data: data,
    dataType: 'json'
  });
}
