window.onload = initialize;
var formauth;
var formaccount;
var formexit;
var user = firebase.auth().currentUser;
function initialize() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("form-account").style.display = "none";
      document.getElementById("form-auth").style.display = "none";
      document.getElementById("option").style.display = "none";
      document.getElementById("logout").style.display = "block";

    } else {
      console.log("not user");
      document.getElementById("form-account").style.display = "none";
      document.getElementById("form-auth").style.display = "none";
      document.getElementById("option").style.display = "block";
      document.getElementById("logout").style.display = "none";
      document.getElementById("correct").style.display = "none";
    }
  });

  formauth = document.getElementById("form-auth");
  formauth.addEventListener("submit", authentication, false);
 
  formaccount = document.getElementById("form-account");
  formaccount.addEventListener("submit", sendAccount, false);

  formexit = document.getElementById("logout");
  formexit.addEventListener("click", exit, false);

  formoption = document.getElementById("option1");
  formoption.addEventListener("click", option1, false);
  formoption = document.getElementById("option2");
  formoption.addEventListener("click", option2, false);

}


function option1(){
  var opt = document.getElementById("option1");
  if (opt){
    console.log("Sign on option");
    document.getElementById("form-account").style.display = "block";
    document.getElementById("form-auth").style.display = "none";
    document.getElementById("option").style.display = "none";
    
  }else{
  }
}

function option2(){
  var opt = document.getElementById("option2");
  if (opt){
    console.log("Sign in option");
    document.getElementById("form-account").style.display = "none";
    document.getElementById("form-auth").style.display = "block";
    document.getElementById("option").style.display = "none";
  }else{
  }
}


function authentication(event) {
  event.preventDefault();
  var user = event.target.email.value;
  var password = event.target.password.value;

  firebase.auth().signInWithEmailAndPassword(user, password)
    .then(function (result) {
      console.log("Sign in"); 
      document.getElementById("correct").style.display = "block";
      document.getElementById("problem").style.display = "none";
      document.getElementById("logout").style.display = "block";
    })
    .catch(function (error) {
      document.getElementById("problem").style.display = "block";
      document.getElementById("correct").style.display = "none";
      document.getElementById("logout").style.display = "none";

    });

};


function sendAccount(event) {
  event.preventDefault();
  var emailaccount = document.getElementById("email-new").value;
  var passwordaccount = document.getElementById("password-new").value;
  
  firebase.auth().createUserWithEmailAndPassword(emailaccount, passwordaccount)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      console.log("true")
      document.getElementById("problem").style.display = "none";
      document.getElementById("correct").style.display = "block";
    })
    .then(() => {
      console.log("sign up");
      document.getElementById("correct").style.display = "block";
      document.getElementById("problem").style.display = "none";
      document.getElementById("logout").style.display = "none";
    });
};

function exit(event) {
  event.preventDefault();
  firebase.auth().signOut().then(() => {
    console.log("sign out");
    document.getElementById("form-account").style.display = "none";
    document.getElementById("form-auth").style.display = "none";
    document.getElementById("option").style.display = "block";
    document.getElementById("logout").style.display = "none";
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    alert("Se ha producido un error", errorMessage);
  });
};

