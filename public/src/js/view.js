var shownStatus = {};
var keyData = {};
var currentKey = "";

function writePage(data){
  $("#main").html("");
  $("#main").append("<h1>" + data.name + "</h1>");
  $("#main").append("<ul id='main-questions'></ul>");
  let id = "#main-questions"
  for(let key of sortedKeys(data.questions)){
    var questionData = data.questions[key];
    questionData["id"] = key;
    currentKey = key;
    keyData[key] = key;
    writeQuestion(questionData, id);
  }
  console.log(keyData);
}

function writeQuestion(data, id){
  $(id).append("<ul id='questions-" + data.id + "'></ul>");
  var childId = "#questions-" + data.id;
  if(shownStatus[data.id] == null){
    $(childId).append("<li><span id='question-span-" + data.id + "' onclick='changeShownStatus(\"" + data.id + "\")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:none'></ul><div id='question-div-" + data.id + "'></div></li>");
    shownStatus[data.id] = false;
  } else if(shownStatus[data.id]){
    $(childId).append("<li><span id='question-span-" + data.id + "' onclick='changeShownStatus(\"" + data.id + "\")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:block'></ul><div id='question-div-" + data.id + "'></div></li>");
  } else{
    $(childId).append("<li><span id='question-span-" + data.id + "' onclick='changeShownStatus(\"" + data.id + "\")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:none'></ul><div id='question-div-" + data.id + "'></div></li>");
  }
  if(data.children){
    childId = "#question-ul-" + data.id;
    let parentKey = currentKey;
    for(let key of sortedKeys(data.children)){
      var questionData = data.children[key]
      questionData["id"] = key;
      currentKey = parentKey + "-" + key;
      keyData[key] = currentKey;
      writeQuestion(questionData, childId);
    }
  } else{
    childId = "#question-div-" + data.id;
    $(childId).html("<input type='range' id='question-input-" + data.id + "' onchange='sendData(\"" + data.id + "\")'>");
  }
}

function changeShownStatus(id){
  if(shownStatus[id]){
    shownStatus[id] = false;
    $("#question-ul-" + id).css("display", "none");
  } else{
    shownStatus[id] = true;
    $("#question-ul-" + id).css("display", "block");
  }
}

function sortedKeys(questions) {
  var keys = Object.keys(questions);
  for (var i = 0; i < keys.length - 1; i++){
    for (let j = 0; j < keys.length - i - 1; j++) {
      let key = keys[j];
      let keyPlus = keys[j+1];
      if( questions[key].name > questions[keyPlus].name ){
        let keep = keys[j];
        keys[j] = keys[j+1];
        keys[j+1] = keep;
      }
    }
  }
  return keys;
}