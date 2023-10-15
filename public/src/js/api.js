function sendData(id) {
  let value = $("#question-input-" + id).val();
  alert(value + " " + id);
  $.post(apiUrl + '/sendValue', {questionId: id, value: value}, function(data){
    console.log(data);
  });
}