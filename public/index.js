/// Initalization ///
let totalString = ''
let totalObjectsMade = []
makingRequestToIBM('Hello')
window.addEventListener('keydown', keepingTrack)
/// Initalization ///

/// Twitter ////
function makingTwitterRequest(name, number) {
  $.ajax({
    type: "GET",
    url: `https://wilsonwongnodered.mybluemix.net/getUserTweets?screen_name=${name}&count=${number}`,
    success: function(res) {
      let recievedAllTweets = parseTweets(res)
      if(number === 100) {
        makingRequestToInsights(recievedAllTweets)
      }
      recievedAllTweets.forEach(function(tweet) {
       let respone = new KeyboardEvent("keypress", {bubbles : true, cancelable : true, key : 'IBM Watson: ' + tweet, char : "", shiftKey : true});
      let enter = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Enter", code: "Enter", char : "", shiftKey : true});
      document.body.dispatchEvent(respone)
      document.body.dispatchEvent(enter)
      })
    },
    dataType: "json"
  })
}

function parseTweets(obj) {
  let allTweets = []
  obj.forEach(function(tweet) {
    allTweets.push(tweet.text)
  })
  return allTweets
}
/// Twitter ////
function makingRequestToInsights (str) {
  str = str.join(',')
  $.ajax({
    method: "POST",
    url: "https://wilsonwongnodered.mybluemix.net/allTweets",
    xhrFields: {
      withCredentials: false
    },
    data: {"payload": str},
    beforeSend: function() {
      console.log('Sending message to Insight')
    },
    success: function(results) {
          document.open("text/html", "replace");
          document.write(results);
          document.close();
    },
    error: function(xhr, textStatus, error) {
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    }
  })
}
/// IBM ///
function makingRequestToIBM(str) {
  $.ajax({
    method: "POST",
    url: "https://wilsonwongnodered.mybluemix.net/aframe",
    xhrFields: {
      withCredentials: false
    },
    data: { "msgdata": str},
    dataType: "json",
    beforeSend: function() {
      console.log('Sending message')
    },
    success: function(results) {
    let respone = new KeyboardEvent("keypress", {bubbles : true, cancelable : true, key : 'IBM Watson: ' + results.text[0], char : "", shiftKey : true});
    let enter = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Enter", code: "Enter", char : "", shiftKey : true});
    if(results.text[0].indexOf('make') > 0) {
      createAShape(results.text[0].slice(results.text[0].indexOf(':') + 2))
    }else if(results.text[0].indexOf('spinning') > 0) {
      console.log(results.text[0].slice(results.text[0].indexOf('spinning') + 'spinning'.length))
      addingProp(results.text[0].slice(results.text[0].indexOf('spinning') + 'spinning'.length + 2))
    } else if(results.text[0].indexOf('animations') > 0) {
      let str = results.text[0].slice(results.text[0].indexOf(':') + 2)
      addingProp(str)
    }
    document.body.dispatchEvent(respone)
    document.body.dispatchEvent(enter)
    },
    error: function(xhr, textStatus, error) {
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    }
  })
}
/// IBM ///


/// Shapes ///
function addingProp(str) {
  const action = str.slice(0, str.indexOf('to')).trim()
  const id = str.slice(str.indexOf('to') + 2).trim().replace(/\s/g, '')
  switch(action) {
    case "rotating":
      addingSpinng(id)
      break;
    case "changing position":
      changingPosition(id)
      break;
    case "changing scale":
      break;
    case "changing color":
      break;
    case "becoming invisible":
      break;
    default:
  }
}

function addingSpinng(id) {
  let newProp = `#${id}`+ ` Animation attribute="rotation" repeat="indefinite" to="0 360 0" `
  totalObjectsMade.push(newProp)
  $(`#${id}`).append(`Animation attribute="rotation" repeat="indefinite" to="0 360 0" `)
}

function changingPosition(id) {
  let newProp = `#${id}`+ `Animation  attribute="position" from="-2.18 1 -2.04" to="1 1 1"`
  totalObjectsMade.push(newProp)
  $(`#${id}`).append(`<a-animation attribute="position" from="-2.18 1 -2.04" to="1 1 1"></a-animation>`)
}

function createAShape(str) {
  let spec = str.split(' ')
  const color = spec[0]
  const shape = spec[1]
  let newObject = `Entity id=${color+shape} geometry="primitive: ${shape}" material: "color: ${color}"  position= "-2.18 1 -2.04"`
  totalObjectsMade.push(newObject)
  let entity = document.createElement('a-entity');
  entity.setAttribute("id", color+shape)
  entity.setAttribute("geometry", `primitive: ${shape};`)
  entity.setAttribute("material", `color: ${color};`)
  entity.setAttribute("position", '-2.18 1 -2.04')
  document.querySelector('a-scene').appendChild(entity)
}
/// Shapes ///

/// Printing Shapes and Props ///
function printObjectsMade(arr) {
  let totalString = ''
  arr.forEach(object => {
    if(object.indexOf('hatshape') === -1) {
      totalString +=  '<h2>' + object + '</h2>'
    }
  })
  document.open("text/html", "replace");
  document.write(totalString);
  document.close();
}
/// Printing Shapes and Props ///


/// Keyboard ///
function keepingTrack(event) {
  if(event.key === 'Enter') {
    let arrayOfString, name, number
    switch(true) {
      case totalString.toLowerCase() === 'restart':
        location.reload()
        break;
      case totalString.toLowerCase().indexOf('Twitter') > -1:
        arrayOfString = totalString.split(' ')
        name = arrayOfString[1]
        number = arrayOfString[2]
        makingTwitterRequest(name, number)
        break;
      case totalString.toLowerCase().indexOf('Insight') > -1:
        arrayOfString = totalString.split(' ')
        name = arrayOfString[1]
        makingTwitterRequest(name, 100)
        break;
      case totalString.toLowerCase().indexOf('Print') > -1:
        printObjectsMade(totalObjectsMade)
        break;
      case totalString.length > 1:
        makingRequestToIBM(totalString)
        break;
      default:
        break;
    }
    totalString = ''
  } else if(event.key === 'Backspace') {
    totalString = totalString.substring(0, totalString.length -1)
  } else if(event.key.length === 1) {
    totalString += event.key
  }
}
/// Keyboard ///
