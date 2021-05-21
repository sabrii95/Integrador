var mymap = L.map('map').setView([-34.627123516115425, -58.38655723763869], 17);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1Ijoic2FicmluYTE5OTUiLCJhIjoiY2tveHRkOG9mMDYwMTJ2bHEzMDQ3M29zeSJ9.m6jIHfeTl1vFw2zZ-2S9ow'
}).addTo(mymap);

var marker = L.marker([-34.627123516115425, -58.38655723763869]).addTo(mymap);
// marker.bindPopup("<b>Nos podes encontar en esta direccion!</b>").openPopup();

