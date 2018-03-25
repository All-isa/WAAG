//Global Variables
var googleApi;
var city;
var state;
var cityState;
var zip;
var map;
var searchedPlace;
var hikeApi = "200232469-8c224addc6df491926b59fdf73c26e1a";
var googleApi = "AIzaSyAGqySJr47rVKYnN2R2UvMM4YDKlRP691c";
var weatherApi = "6e84fd53e8f10a78c7c0f2df983c7a41";
var distance;
var lat;
var lng;
var hikeLat;
var hikeLng;
//Global variables for hiking results
var imageUrl;
var hikeName;
var hikeDesc;
var hikeRating;
var trailDis;
var trailAscent;
var trailDecent;

$(document).ready(function () {
    //Creates the map for results
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 38.8792, lng: -99.3268
            },
            zoom: 3
        });
    };


    //Click event listener for the button the index page
    $("#searchtrails").on("click", function (event) {
        event.preventDefault();
        var city = $('#city').val().trim();
        var state = $('#inputState').val().trim();

        //Query URL from the Google Maps API
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=+" + city + ",+" + state + "&key=" + googleApi;

        //Displays the city and state searched on the search page
        $("#display-city-state").html(city + " , " + state);

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (coords) {
                console.log(coords.results[0].geometry.location);
                //Passing latitude and longitude to searchedPlace
                searchedPlace = (coords.results[0].geometry.location);
                console.log(searchedPlace);
                lat = searchedPlace.lat;
                lng = searchedPlace.lng;
                var queryHike = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lng + "&maxDistance=" + distance + "&key=" + hikeApi;
                return $.ajax({
                    url: queryHike,
                    method: "GET"
                })
                    .then(function (hikeInfo) {
                        console.log(hikeInfo)
                        for (var i = 0; i < hikeInfo.trails.length; i++) {
                            pushData(city, state, hikeInfo.trails);
                            
                            // database.ref().on("child_added", function (snapshot) {
                            //}
                        
                            var card = $("<div class='card'>");
                            $("#bodyresults").append(card);

                            // imageUrl = hikeInfo.trails[i].imgSmall
                            // var trialImg = $("<img>").attr("src", imageUrl)
                            // $(".card").append(trailImg)

                            var cardBody = $("<div class='card-body'>");
                            $(".card").append(cardBody);

                            hikeName = hikeInfo.trails[i].name
                            var cardTitle = $("<h5 class='card-title'>").text(hikeName);
                            $(".card-body").append(cardTitle);

                            hikeDesc = hikeInfo.trails[i].summary
                            var pOne = $("<p class='card-text'>").text("Description: "+hikeDesc);
                            $(".card-title").append(pOne);

                            hikeDis = hikeInfo.trails[i].length
                            var pTwo = $("<p class='card-text'>").text("Trail Length:" +hikeDis);
                            $(".card-title").append(pTwo);

                            trailAscent = hikeInfo.trails[i].ascent
                            var pThree = $("<p class='card-text'>").text("Trail Ascent:" +trailAscent);
                            $(".card-title").append(pThree);

                            trailDecent = hikeInfo.trails[i].descent
                            var pFour = $("<p class='card-text'>").text("Trail Descent:" +trailDecent);
                            $(".card-title").append(pFour);

                            var pFive = $("<p class='card-text' id='rating'>");
                            $(".card-title").append(pFive);

                            hikeRating = hikeInfo.trails[i].stars;
                            var rating = $("<small class='text-muted'>").text("Rating:" +hikeRating);
                            $("#rating").append(hikeRating);

                            // $("#newsearchresults").prepend(imageUrl,hikeName,hikeDesc, hikeRating,trailDis,trailAscent,trailDecent);
                    }

                    }).then(function (weather) {
                        var queryWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + weatherApi;
                        return $.ajax({
                            url: queryWeather,
                            method: "GET"
                        }).then(function (weatherInfo) {
                            console.log(weatherInfo);
                        })
                    })
            });
    });



    //Get elements
    const emailId = $("#email");
    const passwordId = $("#password");
    const signup = $("#signup");
    const login = $("#login");
    const logout = $("#logout");
    //Firebase Auth
    const config = {
        apiKey: "AIzaSyCy9eM2c0RKkQkB3TTINPHmIX9BajI_Gt8",
        authDomain: "hikingapp-eb47b.firebaseapp.com",
        databaseURL: "https://hikingapp-eb47b.firebaseio.com",
        projectId: "hikingapp-eb47b",
        storageBucket: "",
        messagingSenderId: "768321299488"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    //Push to Firebase
    function pushData(city, state, hikeInfo) {

        database.ref().push({
            "city": city,
            "state": state,
            "info": hikeInfo
        });
    };

    const auth = firebase.auth();

    auth.onAuthStateChanged(firebaseUser => { });

    // Add Login event

    $("#login").on('click', e => {
        e.preventDefault();
        //Get email and password
        const email = emailId.val().trim();
        const password = passwordId.val().trim();
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    $("#signup").on('click', e => {
        e.preventDefault();
        //Get email and password
        //TODO: check for real email
        const email = emailId.val().trim();
        const password = passwordId.val().trim();
        const auth = firebase.auth();
        console.log(email, password);

        //Create User
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
            // Email sent.
        }).catch(function (error) {
            console.log(error);
        });
    });

    $("#logout").on('click', e => {
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log("not logged in");
            // document.location.href = document.location.hostname;
        }
    });


});