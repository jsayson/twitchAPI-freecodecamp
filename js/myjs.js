$(document).ready(function(){

function result(pic, name, mature){
  if(mature === true){
  $("#res1").append("<tr><td><img src='"+pic+"' height='50px' width='50px'></td><td>"+name+"</td><td>"+onlineIcon+"</td></tr>");
  }
  else if(mature === false){
  $("#res1").append("<tr><td><img src='"+pic+"' height='50px' width='50px'></td><td>"+name+"</td><td>"+offlineIcon+"</td></tr>");
  }
  else{
   $("#res1").append("<tr><td><img src='"+pic+"' height='50px' width='50px'></td><td>"+name+"</td><td>"+mature+"</td></tr>");
  } 
};
  var resInfo = "<i class='fa fa-info-circle' style='color:#2962FF;font-size:25px;'></i>";

  var foll = document.getElementById("follows");
  var onl = document.getElementById("online");
  var off = document.getElementById("offline");

  var onlineIcon = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Disc_Plain_green_dark.svg/1000px-Disc_Plain_green_dark.svg.png' width='10px' height='10px'>";
  var offlineIcon = "<img src='https://i.stack.imgur.com/ma4sx.png' height='10px' width='10px'>";

  var url = "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?";
  $.getJSON(url, function(data){
    if(data.stream === null){
      $("#res").append("<h2>FreeCodeCamp is currently offline.</h2>");
    }
    else{
      $("#res").html("<h2>"+response.stream["name"]+" is currently Online.</h2>");
    }
  });

  follows();

function follows(){
  $("#res1").html("");
  foll.className = "active";
  onl.className = "button";
  off.className = "button";
  var urlF = "https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels?callback=?";
  $.getJSON(urlF, function(data2){
    var res2 = data2.follows;
    for(var i=0;i<=data2.follows.length;i++){
      var myRes2 = res2[i].channel; 
      /*myRes2.mature*/
      var res2Info = "<a href='https://www.twitch.tv/"+myRes2["name"]+"' target='blank'>"+resInfo+"</a>";
      result(myRes2.logo, myRes2["name"], res2Info);
    }
  });
};

function online(){
  $("#res1").html("");
  foll.className = "button";
  onl.className = "active";
  off.className = "button";
  var url = "https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels?callback=?";
  $.getJSON(url, function(data){
    console.log(data);
    var res = data.follows;
    for(var i=0;i<=res.length;i++){
      if(res[i].channel.mature === true){
        result(res[i].channel.logo, res[i].channel["name"], res[i].channel.mature);
      }
    }
  });
};

function offline(){
  $("#res1").html("");
  foll.className = "button";
  onl.className = "button";
  off.className = "active";
  var url = "https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels?callback=?";
  $.getJSON(url, function(data){
    var res = data.follows;
    for(var i=0;i<=res.length;i++){
      if(res[i].channel.mature != true){
        result(res[i].channel.logo, res[i].channel["name"], res[i].channel.mature);
      }
    }
  });
};

$("#online").on("click", online);
$("#follows").on("click", follows);
$("#offline").on("click", offline);
});
