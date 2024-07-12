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

  // Function to clear input fields
  function clearInputFields() {
    document.getElementById("full_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("contact_number").value = "";
    document.getElementById("country_of_region ").value = "";
  }

  if (
    validate_field(full_name) == false ||
    validate_field(contact_number) == false ||
    validate_field(country_of_region) == false
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Complete All Fields!",
    });
    return;
  }

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Email & Password!",
    });
    return;
    // Don't continue running the code
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
      // Show success message and reset input fields
      Swal.fire({
        icon: "success",
        title: "You Have Successfully Registered. Log In Now!!",
        showConfirmButton: true,
      }).then(() => {
        document.getElementById("button_login").style.display = "block";
        document.getElementById("button_signup").style.display = "none";
        document.getElementById("form_header").innerHTML = "Login your account";
        // Clear the input fields
        clearInputFields();
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
      text: "Please Enter Your Details!",
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
        title: "You Are Successfully Login!",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        // Redirect to another page after the alert
        window.location.href = "https://bit.ly/next-music-download"; // Replace "your-link-here" with the URL you want to redirect to
      });
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_message = error.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email or Password Is Wrong!",
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

// Select the cursor element
const cursor = document.querySelector(".cursor");

// Function to handle mouse movement
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  cursor.style.transform = "scale(1.2)"; // Slightly increase the size on move
  cursor.style.opacity = "1"; // Ensure cursor is visible
});

// Function to handle mouse down
document.addEventListener("mousedown", () => {
  cursor.style.transform = "scale(0.8)"; // Shrink cursor on click
});

// Function to handle mouse up
document.addEventListener("mouseup", () => {
  cursor.style.transform = "scale(1.2)"; // Restore cursor size on release
});

// List of elements to change cursor color on hover
const hoverElements = document.querySelectorAll(
  "button, a, li, input, textarea, select, .profile, .about-text h5, .fa-brands"
);

// Function to handle mouse enter
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hovered"); // Add class on hover
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovered"); // Remove class when not hovering
  });
});

// Function to handle mouse leaving the window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0"; // Hide the cursor when it leaves the window
});

// Function to handle mouse entering the window
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1"; // Show the cursor when it enters the window
});

// Function to clear input fields
function clearInputFields() {
  setTimeout(() => {
    document.getElementById("full_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("contact_number").value = "";
    document.getElementById("country_of_region ").value = "";
  }, 1500);
}

function handleLogin() {
  // Define screen breakpoints
  const isMobile = window.innerWidth <= 768; // Mobile: screens <= 768px
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Tablet: screens between 769px and 1024px

  // Set translate value based on screen size
  let translateValue = "translateX(-40dvw)"; // Default for larger screens

  if (isMobile) {
    translateValue = "translateX(-100dvw)";
  } else if (isTablet) {
    translateValue = "translateX(-60dvw)";
  }

  // Initial transformation
  document.getElementById("content_container").style.transform = translateValue;

  // Delay the transformation and other changes by 1.5 seconds
  setTimeout(function () {
    document.getElementById("button_signup").style.display = "none";
    document.getElementById("button_login").style.display = "block";
    document.getElementById("form_header").innerHTML = "Login your account";
    document.getElementById("content_container").style.transform =
      "translateX(0dvw)";
  }, 1500);
}

function showSignupForm() {
  // Define screen breakpoints
  const isMobile = window.innerWidth <= 768; // Mobile: screens <= 768px
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Tablet: screens between 769px and 1024px

  // Set translate value based on screen size
  let translateValue = "translateX(-40dvw)"; // Default for larger screens

  if (isMobile) {
    translateValue = "translateX(-100dvw)";
  } else if (isTablet) {
    translateValue = "translateX(-60dvw)";
  }

  // Initial transformation
  document.getElementById("content_container").style.transform = translateValue;

  // Delay the transformation and other changes by 1.5 seconds
  setTimeout(function () {
    document.getElementById("button_login").style.display = "none";
    document.getElementById("button_signup").style.display = "block";
    document.getElementById("form_header").innerHTML = "Create an account";
    document.getElementById("content_container").style.transform =
      "translateX(0dvw)";
  }, 1500);
}
