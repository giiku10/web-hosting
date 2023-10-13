function sendData(id) {
  let value = $("#question-input-" + id).val();
  alert(value);
  $.post(apiUrl, {questionId: id, value: value}, function(data){
    console.log(data);
  });
}