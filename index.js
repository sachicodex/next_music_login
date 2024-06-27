const firebaseConfig = {
  apiKey: "AIzaSyCdoZtzprdSmidOEDY2W4XttUc1cu8M_pk",
  authDomain: "login-with-firebase-data-5088d.firebaseapp.com",
  projectId: "login-with-firebase-data-5088d",
  storageBucket: "login-with-firebase-data-5088d.appspot.com",
  messagingSenderId: "1002800694814",
  appId: "1:1002800694814:web:dcace0d82fd4c61c4c500f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;
  contact_number = document.getElementById("contact_number").value;
  country_of_region = document.getElementById("country_of_region ").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email or Password is Outta Line!!",
    });
    return;
    // Don't continue running the code
  }
  if (
    validate_field(full_name) == false ||
    validate_field(contact_number) == false ||
    validate_field(country_of_region) == false
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "One or More Extra Fields is Outta Line!!",
    });
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        contact_number: contact_number,
        country_of_region: country_of_region,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      Swal.fire({
        icon: "success",
        title: "You're successfully sign up. Login now!!",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // Redirect to another page after the alert
        window.location.href =
          "https://sachicodex.github.io/next_music_login/login.html"; // Replace "your-link-here" with the URL you want to redirect to
      });
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_message = error.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error_message,
      });
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email or Password is wrong!!",
    });
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      Swal.fire({
        icon: "success",
        title: "You are successfully login!",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        // Redirect to another page after the alert
        window.location.href = "https://sachiofficial.github.io/Blogs.html"; // Replace "your-link-here" with the URL you want to redirect to
      });
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_message = error.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error_message,
      });
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
