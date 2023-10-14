function sendData(id) {
  let value = $("#question-input-" + id).val();
  alert(value + " " + keyData[id]);
  $.post(apiUrl + '/sendValue', {classId: classId, questionId: keyData[id], value: value}, function(data){
    console.log(data);
  });
}