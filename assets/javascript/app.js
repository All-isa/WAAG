// var map;
// var searchedLocation;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: 5.8520, lng: -55.2038
//         },
//         zoom: 3
//     });
// }

$(document).ready(function () {


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
        }
    });


});
// $("button").on("click", function () {

var APIKey = "200232469-8c224addc6df491926b59fdf73c26e1a";

// Here we are building the URL we need to query the database
var queryURL = "https://www.hikingproject.com/data/get-trails?lat=39.9997&lon=-105.283&maxDistance=10&key=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {


        // var searchTerm = $("#").val().trim();
        // queryURL += "&q=" + searchTerm;

        // // if the user provides a startYear, include it in the queryURL
        // var startYear = $("#start-year").val().trim();

        // if (parseInt(startYear)) {
        //     queryURL += "&begin_date=" + startYear + "0101";
        // }

        // // if the user provides an endYear, include it in the queryURL
        // var endYear = $("#end-year").val().trim();

        // if (parseInt(endYear)) {
        //     queryURL += "&end_date=" + endYear + "0101";
        // }

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML


        // Log the data in the console as well
        console.log(response.trails[0].location);
        console.log(response.trails[0].type);
        console.log(response.trails[0].length);
        console.log(response.trails[0].ascent);
    });
        // });