window.onload = initialize;

var formOpinions;
var refOpinions;
var tbodyTableOpinion;
var refOpinionsedit;
var create = "Añadir opinión";
var update = "Modificar opinión";
var mode = create;
var formauth;
var formaccount;
var formexit;

function initialize() {
  formOpinions = document.getElementById("form-opinion");
  formOpinions.addEventListener("submit", sendOpinionAFirebase, false);


  tbodyTableOpinion = document.getElementById("tbody-table-opinion");

  refOpinions = firebase.database().ref().child("Opiniones");
  showOpinionFirebase();

  // account
  formauth = document.getElementById("form-auth");
  formauth.addEventListener("submit", authentication, false);

  formaccount = document.getElementById("form-account");
  formaccount.addEventListener("submit", sendAccount, false);

  formexit = document.getElementById("logout");
  formexit.addEventListener("click", exit, false);


}


function showOpinionFirebase() {
  refOpinions.on("value", function (snap) {
    var data = snap.val();
    var rowstoshow = "";
    for (var key in data) {
      rowstoshow += "<tr>" +
        "<td>" + data[key].NameUser + "</td>" +
        "<td>" + data[key].PlaceUser + "</td>" +
        "<td>" + data[key].OpinionUser + "</td>" +
        '<td class = "edit">' +
        '<button class="btn btn-default editB" data-opinion="' + key + '">' +
        '<i class="fas fa-pen-alt"></i>' +
        '</button>' +
        '</td>' +
        '<td class = "delete">' +
        '<button class="btn btn-danger deleteB" data-opinion="' + key + '">' +
        '<i class="far fa-trash-alt"></i>' +
        '</button>' +
        '</td>' +
        "</tr>";
    }
    tbodyTableOpinion.innerHTML = rowstoshow;
    if (rowstoshow != "") {
      var elementedit = document.getElementsByClassName("editB");
      for (var i = 0; i < elementedit.length; i++) {
        elementedit[i].addEventListener("click", editOpinionFirebase, false);
      }
      var elementdelete = document.getElementsByClassName("deleteB");
      for (var i = 0; i < elementdelete.length; i++) {
        elementdelete[i].addEventListener("click", deleteOpinionFirebase, false);
      }
    }
  });
}

function editOpinionFirebase() {
  event.preventDefault();
  var keytheOpinionedit = this.getAttribute("data-opinion");
  refOpinionsedit = refOpinions.child(keytheOpinionedit);
  refOpinionsedit.once("value", function (snap) {
    var dataedit = snap.val();
    document.getElementById("Name-user").value = dataedit.NameUser;
    document.getElementById("Opinion-user").value = dataedit.OpinionUser;
    document.getElementById("Place-user").value = dataedit.PlaceUser;
  });
  document.getElementById("button-send-opinion").value = update;
  mode = update;
}

function deleteOpinionFirebase() {
  event.preventDefault();
  var keytheOpiniondelete = this.getAttribute("data-opinion");
  var refOpinionsdelete = refOpinions.child(keytheOpiniondelete);
  refOpinionsdelete.remove();
}

function sendOpinionAFirebase(event) {
  event.preventDefault();
  switch (mode) {
      case create:
        refOpinions.push({
          NameUser: event.target.NameUser.value,
          OpinionUser: event.target.OpinionUser.value,
          PlaceUser: event.target.PlaceUser.value
        });
        break;
        
      case update:
        refOpinionsedit.update({
          NameUser: event.target.NameUser.value,
          OpinionUser: event.target.OpinionUser.value,
          PlaceUser: event.target.PlaceUser.value
        });
        document.getElementById("button-send-opinion").value = create;
        mode = create;
        break;


  }
  formOpinions.reset();
}

// account 

function authentication(event) {
  event.preventDefault();
  var email = event.target.email.value;
  var password = event.target.password.value;


  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result) {
      console.log("Sign in");
      document.getElementById("logout").style.display = "block";
      document.getElementById("login").style.display = "none";
      document.getElementById("logup").style.display = "none";
      document.getElementById("form-opinion").style.display = "block";
      document.getElementById("form-text").style.display = "none";
      if (email == "admin@admin.com") {
        removeEdit = document.getElementsByClassName("edit");
        for (var i = 0; i < removeEdit.length; i++) {
          removeEdit[i].style.display = "block";
        }
        removeDelete = document.getElementsByClassName("delete");
        for (var i = 0; i < removeDelete.length; i++) {
          removeDelete[i].style.display = "block";
        }
      }
    })
    .catch(function (error) {
      console.log(error);
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
    document.getElementById("form-opinion").style.display = "none";
    document.getElementById("form-text").style.display = "block";

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    alert("Se ha producido un error", errorMessage);
  });
}
