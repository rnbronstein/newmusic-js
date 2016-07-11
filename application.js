document.addEventListener('DOMContentLoaded', function () {
  initialLoad();
  onClick();
});

function initialLoad(){
  getPage('about.html').then(function(response){
    appendResponse(response);
  })
}

function onClick(){
  var links = document.querySelectorAll('.nav-link');
  links.forEach(function(link){
    link.addEventListener("click", function(){
      var url = this.id + '.html';
      toggleSelected(this);
      getPage(url).then(function(response){
        fadeOut('content', 9);
        appendResponse(response);
        fadeIn('content', 0);
      });
    });
  });
}

function appendResponse(response){
  var contentDiv = document.querySelector('#content');
  contentDiv.innerHTML = response;
}

function toggleSelected(element){
  var selected = document.querySelector('.selected');
  if (selected){
    selected.classList.remove('selected');
  };
  element.classList.add('selected');
}

function getPage(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText));
      }
    };
    request.send();
  });
}


function fadeOut(id, value){
  document.getElementById(id).style.opacity = '0.' + value;
  if (value > 0) {
    value--;
    setTimeout('fadeOut("'+id+'",'+value+')', 80);
  }else {
    return;
  }
}

function fadeIn(id, value){
  document.getElementById(id).style.opacity = '0.' + value;
  if (value < 9){
    value ++;
    // alert(value);
    setTimeout('fadeIn("'+ id + '", '+ value +')', 80);
  } else {
    return;
  }
}
