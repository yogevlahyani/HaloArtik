
'use strict';

angular.module('starter.services', [])

.service("RegLogin", function($q) {
    var provider = new firebase.auth.FacebookAuthProvider();
    //var getAuth = firebase.getAuth();
    return {
        /*
        makeUser: function(email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        },
        */
        makeUser: function(username, password, email, fname) {
            firebase.database().ref('users/').push({
                username: username,
                password: password,
                email: email,
                fname: fname
            });
        },
        fbLogin: function() {

            var defer = $q.defer();

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                console.log(token);
                // The signed-in user info.
                var user = result.user;
                console.log(user);

                defer.resolve(result);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                defer.reject(error);
            });

            return defer.promise;
        },
        isUserExist: function() {
            firebase.database();
        },
        getAllUsers: function() {
            var defer = $q.defer();
            // Get a database reference to our posts
            var db = firebase.database();
            var ref = db.ref("users");

            // Attach an asynchronous callback to read the data at our posts reference
            ref.on("value", function(snapshot) {
                defer.resolve(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                defer.reject(errorObject);
            });

            return defer.promise;
        }
        /*
        makeUser: function(username, password, email, fname) {
            ref.createUser({
                username: username,
                password: password,
                email: email,
                fname: fname
            }, function(error, userData) {
                if (error) {
                    switch (error.code) {
                        case "EMAIL_TAKEN":
                            console.log("The new user account cannot be created because the email is already in use.");
                            break;
                        case "INVALID_EMAIL":
                            console.log("The specified email is not a valid email.");
                            break;
                        default:
                            console.log("Error creating user:", error);
                    }
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });
        }
        */
    }
});
