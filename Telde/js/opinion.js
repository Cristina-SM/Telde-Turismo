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
var user = firebase.auth().currentUser;

function initialize() {
  formOpinions = document.getElementById("form-opinion");
  formOpinions.addEventListener("submit", sendOpinionAFirebase, false);


  tbodyTableOpinion = document.getElementById("tbody-table-opinion");
  refOpinions = firebase.database().ref().child("Opiniones");
  
  showOpinionFirebase();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.email)
      document.getElementById("form-text").style.display = "none";
      if (user.email == "admin@admin.com") {
        showOpinionFirebaseAdmin();
      }
      else{
      }
    } else {
      document.getElementById("form-text").style.display = "block";
      document.getElementById("form-opinion").style.display = "none";
    }
  }); 


}
function showOpinionFirebaseAdmin(){
  refOpinions.on("value", function (snap) {
    var data = snap.val();
    var rowstoshow = "";
    for (var key in data) {
      rowstoshow += "<tr>" +
        "<td>" + data[key].NameUser + "</td>" +
        "<td>" + data[key].PlaceUser + "</td>" +
        "<td>" + data[key].OpinionUser + "</td>"+
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
function showOpinionFirebase() {  
  refOpinions.on("value", function (snap) {
    var data = snap.val();
    var rowstoshow = "";
    for (var key in data) {
      rowstoshow += "<tr>" +
        "<td>" + data[key].NameUser + "</td>" +
        "<td>" + data[key].PlaceUser + "</td>" +
        "<td>" + data[key].OpinionUser + "</td>"
    }
    tbodyTableOpinion.innerHTML = rowstoshow;
  });
}

function editOpinionFirebase(event) {
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
  document.getElementById("bar").style.display = "block";
  mode = update;
}

function deleteOpinionFirebase(event) {
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
  document.getElementById("bar").style.display = "none";
  formOpinions.reset();
}
