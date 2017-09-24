
var theButton = document.getElementById("myButton");
theButton.addEventListener("click", getLocation, false);



function getLocation () {
var userInput= document.getElementById("userInput").value;    
var theAPICall = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userInput + ":LONDON&key=AIzaSyC53eb_s8aL8hFuuUa7Hd4Ssqw9ZY8FwKY";


var myRequest = new XMLHttpRequest ();
myRequest.open("GET", theAPICall, true);
myRequest.onload = function () {
    if (myRequest.readyState == 4 && myRequest.status == 200) 
    
    {
        
        var myData = JSON.parse(myRequest.responseText)
        console.log(myData)
        var lat1 = myData.results[0].geometry.location.lat
        
        var lng1 = myData.results[0].geometry.location.lng 
        
        
        initMap(lat1, lng1);
        initMap2(lat1, lng1, 'green');
    }
}

myRequest.send();
    
    var theAPICall2 = "https://api.tfl.gov.uk/bikepoint";
    
    var myRequest2 = new XMLHttpRequest ();
    myRequest2.open("GET", theAPICall2, true);
    myRequest2.onload = function () {
        if (myRequest2.readyState == 4 && myRequest2.status == 200)
            
        {
            var myData2 = JSON.parse(myRequest2.responseText);
             for (i = 0; i<myData2.length; i++) {
             var lfdsfd=myData2[i];
             var lat2 = lfdsfd.lat; 
             var lon2 = lfdsfd.lon;
             initMap2(lat2, lon2, 'red');
            /*console.log(lfdsfd.lat + ',' + lfdsfd.lon)*/;}
            /*console.log(myData2);*/
            
            
            
            
        }
    }
myRequest2.send();
}


function initMap(lat1, lng1) {
        var uluru = {lat: lat1, lng: lng1};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: uluru
        });
    var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
}
function initMap2(lat2, lon2, colour) { 
    console.log(lon2);
    var Latlng1 = new google.maps.LatLng(lat2, lon2);
    console.log(Latlng1);
                               
    //var uluru = {lat: lat2, lon: lon2}
    var marker = new google.maps.Marker({
          position: Latlng1,
          map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/'+ colour +'-dot.png',
          title: 'Hello World!',
        animation: google.maps.Animation.DROP,
        });
    marker.addListener('click', toggleBounce)
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

var map = null;