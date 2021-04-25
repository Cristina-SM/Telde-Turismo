window.onload = inicializar;
var fichero;
var databaseRef;
var storageRef;
var imagenASubir;
var imagennombre;
var refImagedelete;
var refImageedit;
var update = "Modificar imagen";

var user = firebase.auth().currentUser;
function inicializar(event) {
  storageRef = firebase.storage().ref();
  databaseRef = firebase.database().ref().child("Image");
  showImagesFirebase();
  fichero = document.getElementById("img");
  button = document.getElementById("form-file")
  button.addEventListener("submit", sendImageFirebase, false);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById("alert").style.display = "none";
      document.getElementById("archivos").style.display = "block";
      if(user.email == "admin@admin.com"){
        showImagesFirebaseAdmin();
      }
    } else {
      document.getElementById("alert").style.display = "block";
    }
  });
}

function showImagesFirebaseAdmin(event) {
  databaseRef.on("value", function (snapshot) {
    var data = snapshot.val();
    var result = "";
    for (var key in data) {
      result += '<img width = "200" class = "img-thumbmail" src ="' + data[key].url + '"/>'+
        // '<td class = "edit">' +
        // '<button class="btn btn-default editB" imagen ="' + key + '">' +
        // '<i class="fas fa-pen-alt"></i>' +
        // '</button>' +
        // '</td>' +
        '<td class = "delete">' +
        '<button class="btn btn-danger deleteB" imagen="' + key + '">' +
        '<i class="far fa-trash-alt"></i>' +
        '</button>' +
        '</td>';
    }
    document.getElementById("image-firebase").innerHTML = result;
    if (result != "") {
      var elementedit = document.getElementsByClassName("editB");
      for (var i = 0; i < elementedit.length; i++) {
        elementedit[i].addEventListener("click", editImageFirebase, false);
      }
      var elementdelete = document.getElementsByClassName("deleteB");
      for (var i = 0; i < elementdelete.length; i++) {
        elementdelete[i].addEventListener("click", deleteImageFirebase, false);
      }
    }
  });
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

function sendImageFirebase(event) {
  event.preventDefault();
  console.log("send")
  var imagenASubir = fichero.files[0];
  var imagennombre = imagenASubir.name;
  var uploadTask = storageRef.child('Opinion/' + imagennombre).put(imagenASubir);
  document.getElementById("bar").style.display = "block";
  uploadTask.on('state_changed',
    function (snapshot) {
    }, function (error) {
      console.log(error);
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        document.getElementById("bar").style.display = "none";
        createNodo(imagennombre, downloadURL);
        console.log("finish");
      });
    });
}

function createNodo(imagennombre, downloadURL) {
  databaseRef.push({
    nombre: imagennombre,
    url: downloadURL
  });
}


function deleteImageFirebase(event) {
  event.preventDefault();
  databaseRef.on("value", function (snapshot) {
  var data = snapshot.val();
    var result = "";
    for (var key in data) {
      result += '<img width = "200" class = "img-thumbmail" src ="' + data[key].url + '"/>' +
      // '<td class = "edit">' +
      // '<button class="btn btn-default editB" imagen ="' + key + '">' +
      // '<i class="fas fa-pen-alt"></i>' +
      // '</button>' +
      // '</td>' +
      '<td class = "delete">' +
      '<button class="btn btn-danger deleteB" imagen="' + key + '">' +
      '<i class="far fa-trash-alt"></i>' +
      '</button>' +
      '</td>'+
      storageRef.child('Opinion/'+ data[key].nombre);

    }
    document.getElementById("image-firebase").innerHTML = result;
    storageRef.remove();
  })
  var keyImagedelete = this.getAttribute("imagen");
  var refImagedelete = databaseRef.child(keyImagedelete);
  refImagedelete.remove();
};

  



// function editImageFirebase(event) {
//   event.preventDefault();
//   console.log("edit")
//   var keyImageedit = this.getAttribute("imagen-edit");
//   refImageedit = databaseRef.child(Imagen);
//   refImageedit.once("value", function (snap) {
//     var dataedit = snap.val();
//     document.getElementById("Image").value = dataedit.url;
//   });
//   document.getElementById("send-file").value = update;
//   mode = update;
// }