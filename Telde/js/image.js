window.onload = inicializar;
var fichero;
var databaseRef;
var storageRef;
var formauth;
var formaccount;
var formexit;

function inicializar() {
  fichero = document.getElementById("myfile");
  fichero.addEventListener("change", sendImageFirebase, false);

  storageRef = firebase.storage().ref();
  databaseRef = firebase.database().ref().child("Image");
  showImagesFirebase();

  formauth = document.getElementById("form-auth");
  formauth.addEventListener("submit", authentication, false);
 
  formaccount = document.getElementById("form-account");
  formaccount.addEventListener("submit", sendAccount, false);

  formexit = document.getElementById("logout");
  formexit.addEventListener("click", exit, false);

}

function showImagesFirebase() {
  databaseRef.on("value", function (snapshot) {
    var data = snapshot.val();
    var result = "";
    for (var key in data) {
      result += '<img width = "200" class = "img-thumbmail" src ="' + data[key].url + '"/>';
    }
    document.getElementById("image-firebase").innerHTML = result;
  });
}

function sendImageFirebase() {
  var imagenASubir = fichero.files[0];
  var imagennombre = imagenASubir.name;
  var uploadTask = storageRef.child('Opinion/' + imagennombre).put(imagenASubir);

  uploadTask.on('state_changed',
    function (snapshot) {
    }, function (error) {
      console.log(error);
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        createNodo(imagennombre, downloadURL);
      });
    });
}

function createNodo(imagennombre, downloadURL) {
  console.log(imagennombre);
  console.log(downloadURL);
  databaseRef.push({
    nombre: imagennombre,
    url: downloadURL
  });
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
      document.getElementById("alert").style.display = "none";
      document.getElementById("file").style.display = "block";
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
    document.getElementById("alert").style.display = "block";
    document.getElementById("file").style.display = "none";
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    alert("Se ha producido un error", errorMessage);
  });
}
