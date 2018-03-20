var map;
var searchedLocation;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { 
        lat: 5.8520, lng: -55.2038 },
        zoom: 3
    });
}

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
    
    $("#login").on('click', e=> {
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
        //Create User
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
    } else{
        console.log("not logged in");
    }
    });
});