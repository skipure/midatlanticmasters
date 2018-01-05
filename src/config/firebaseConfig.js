import firebase from 'firebase'


const config = {
	apiKey: "AIzaSyBTwAeTvSZcuj_m23zJVW3jyoUoT9YLSGk",
	authDomain: "midatlanticmasters-f4ce6.firebaseapp.com",
	databaseURL: "https://midatlanticmasters-f4ce6.firebaseio.com/",
    projectId: "midatlanticmasters-f4ce6",
    storageBucket: "midatlanticmasters-f4ce6.appspot.com",
    messagingSenderId: "766519039008"
}

firebase.initializeApp(config);

export function firebaseListener(func) {
	firebase.auth().onAuthStateChanged(function (user) {
	  if (user) {
	  	console.log("User log in success", user);
	    func(true, user)
	  } else {
	  	console.log("User log in failed", user);
	    func(false)
	  }
	}, function(error) {
	  console.log(error)
	});
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;