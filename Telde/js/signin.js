window.onload = initialize;
var formauth;
var formaccount;
var formexit;

function initialize() {
  formauth = document.getElementById("form-auth");
  formauth.addEventListener("submit", authentication, false);
 
  formaccount = document.getElementById("form-account");
  formaccount.addEventListener("submit", sendAccount, false);

  formexit = document.getElementById("logout");
  formexit.addEventListener("click", exit, false);


}

function authentication(event) {
  event.preventDefault();
  var user = event.target.email.value;
  var password = event.target.password.value;

  firebase.auth().signInWithEmailAndPassword(user, password)
    .then(function (result) {
      console.log("Sign in"); 
      document.getElementById("logout").style.display = "block";
      document.getElementById("login").style.display = "none";
      document.getElementById("logup").style.display = "none";
    })
    .catch(function (error) {
      alert("Los datos introducidos no son correctos.");
    });
}

function sendAccount(event) {
  event.preventDefault();
  var emailaccount = document.getElementById("email-account").value;
  var passwordaccount = document.getElementById("password-account").value;

  firebase.auth().createUserWithEmailAndPassword(emailaccount, passwordaccount)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert("Se ha producido un error", errorMessage);
    })
    .then((user) => {
      console.log("sign up");
      document.getElementById("logout").style.display = "block";
      document.getElementById("login").style.display = "none";
      document.getElementById("logup").style.display = "none";
    });
}
function exit(event) {
  event.preventDefault();
  firebase.auth().signOut().then(() => {
    console.log("sign out");
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("logup").style.display = "block";

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    alert("Se ha producido un error", errorMessage);
  });
}
