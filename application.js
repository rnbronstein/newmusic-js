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
      var _this = this;
      getPage(url).then(function(response){
        fadeOut('content', 9);
        appendResponse(response);
        fadeIn('content', 0);
        if (_this.id === 'media') {
          loadMedia();
        }
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

//soundcloud
function loadMedia(){
  var url = 'https://api.soundcloud.com/users/47262707/tracks?client_id=9e76b1f059ce51b6a6c29c18f5b2858e'; //all tracks by composer
  getSoundCloud(url);
}


function getSoundCloud(url){
  getPage(url).then(function(response){
    var allTracks = JSON.parse(response);
    allTracks.forEach(function(track){
      handleTrack(track);
    })
  })
}

function handleTrack(track){
  var title = track.title;
  var description = track.description;
  if (track.streamable) {
    var client_id = '9e76b1f059ce51b6a6c29c18f5b2858e';
    var stream = track.stream_url + `?client_id=${client_id}`;
  }
  if (track.artwork_url) {
    var image = track.artwork_url;
  } else {
    var image = 'https://radd.it/img/music.jpg';
  }
  appendTrack(title, description, stream, image);
}

function appendTrack(title, description, stream, image){
  var trackList = document.querySelector('#audio');
  var trackItem = document.createElement('li');
  trackItem.classList.add('track-item')
  var track = document.createElement('li');
  track.classList.add('track');
  var trackImage = document.createElement('li');
  trackImage.innerHTML = `<img class="track-image" src="${image}">`;
  track.innerHTML = `<h4 class="track-title">${title}</h4><p class="track-description">${description}</p><audio controls><source src="${stream}" type="audio/mpeg"></audio>`;
  trackItem.appendChild(trackImage);
  trackItem.appendChild(track);
  trackList.appendChild(trackItem);
}

// function appendImage(track, image){
//   var imageItem = document.createElement('li');
//
//   track.appendChild(imageItem);
// }
