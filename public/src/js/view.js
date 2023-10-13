var shownStatus = {};

function writePage(data){
  $("#main").html("");
  $("#main").append("<h1>" + data.name + "</h1>");
  $("#main").append("<ul id='main-questions'></ul>");
  let id = "#main-questions"
  for(let question of data.questions){
    writeQuestion(question, id);
  }
}

function writeQuestion(data, id){
  $(id).append("<ul id='questions-" + data.id + "'></ul>");
  var childId = "#questions-" + data.id;
  if(shownStatus[data.id] == null){
    $(childId).append("<li><span id='question-span-" + data.id + "' onclick='changeShownStatus(" + data.id + ")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:none'></ul><div id='question-div-" + data.id + "'></div></li>");
    shownStatus[data.id] = false;
  } else if(shownStatus[data.id]){
    $(childId).append("<li><span id='question-span-" + data.id + "' onclick='changeShownStatus(" + data.id + ")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:block'></ul><div id='question-div-" + data.id + "'></div></li>");
  } else{
    $(childId).append("<li><span id='question-span-" + data.id + "' onclick='changeShownStatus(" + data.id + ")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:none'></ul><div id='question-div-" + data.id + "'></div></li>");
  }
  if(data.children){
    childId = "#question-ul-" + data.id;
    for(let question of data.children){
      writeQuestion(question, childId);
    }
  } else{
    childId = "#question-div-" + data.id;
    $(childId).html("<input type='range' id='question-input-" + data.id + "' onchange='sendData(" + data.id + ")'>");
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