function sendData(id) {
  let value = $("#question-input-" + id).val();
  console.log(value + " " + id + " " + tokenId);
  $.post(apiUrl + '/sendValue', {questionId: id, value: value, tokenId: tokenId}, function(data){
    console.log(data);
  });
}