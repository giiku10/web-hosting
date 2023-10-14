var shownStatus = {};

function writePage(data){
  $("#main").html("");
  $("#main").append("<h1 class='main_daimei'>" + data.name + "</h1>");
  $("#main").append("<ul id='main-questions'></ul>");
  let id = "#main-questions"
  for(let question of data.questions){
    let key = Object.keys(question)[0];
    var questionData = question[key]
    questionData["id"] = key;
    writeQuestion(questionData, id);
  }
}

function writeQuestion(data, id){
  $(id).append("<ul id='questions-" + data.id + "'></ul>");
  var childId = "#questions-" + data.id;
  if(shownStatus[data.id] == null){
    $(childId).append("<li><span class='question1' id='question-span-" + data.id + "' onclick='changeShownStatus(\"" + data.id + "\")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:none'></ul><div id='question-div-" + data.id + "'></div></li>");
    shownStatus[data.id] = false;
  } else if(shownStatus[data.id]){
    $(childId).append("<li><span class='question1' id='question-span-" + data.id + "' onclick='changeShownStatus(\"" + data.id + "\")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:block'></ul><div id='question-div-" + data.id + "'></div></li>");
  } else{
    $(childId).append("<li><span class='question1' id='question-span-" + data.id + "' onclick='changeShownStatus(\"" + data.id + "\")'>" + data.name + "</span><ul id='question-ul-" + data.id + "' style='display:none'></ul><div id='question-div-" + data.id + "'></div></li>");
  }
  if(data.children){
    childId = "#question-ul-" + data.id;
    for(let question of data.children){
      let key = Object.keys(question)[0];
      var questionData = question[key]
      questionData["id"] = key;
      writeQuestion(questionData, childId);
    }
  } else{
    childId = "#question-div-" + data.id;
    $(childId).html("<div class='understand'>理解度メーター </div><big>😱</big></h1><input class='meta' type='range' id='question-input-" + data.id + "' onchange='sendData(\"" + data.id + "\")'><big>😊</big>");
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