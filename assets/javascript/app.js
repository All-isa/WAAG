var map;
var searchedLocation;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { 
        lat: 5.8520, lng: -55.2038 },
        zoom: 3
    });
}
