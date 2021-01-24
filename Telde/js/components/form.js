window.onload = initialize;
var formContact;
var refContact;

function initialize() {
    formContact = document.getElementById("form-contact");
    formContact.addEventListener("submit",validateFormContact);


    refContact = firebase.database().ref().child("Contacto");
}


function sendContactAFirebase(event) {
    event.preventDefault();
    refContact.push({
        Email: event.target.Email.value,
        Email2: event.target.Email2.value,
        Language: event.target.Language.value,
        Name: event.target.Name.value,
        Surname: event.target.Surname.value,
        Validate: event.target.Validate.value
    });

    formContact.reset();
}

function validateFormContact(event){
    event.preventDefault();

    var formContact = event.target;

    var error = false;

    var Email = formContact.Email.value;
    if (!Email || (Email == "")){
        error = true;
        document.getElementById("error-email").style.display = "block";
    }else{
        document.getElementById("error-email").style.display = "none";
    }
    var Email2 = formContact.Email2.value;
    if (!Email2 || (Email2 == "")){
        error = true;
        document.getElementById("error-email2").style.display = "block";
    }else{
        document.getElementById("error-email2").style.display = "none";
    }
    var Email3 = formContact.Email2.value;
    if (!Email3 || (Email3 != Email)){
        error = true;
        document.getElementById("error-email3").style.display = "block";
    }else{
        document.getElementById("error-email3").style.display = "none";
    }
    var Name = formContact.Name.value;
    if (!Name|| (Name == "")){
        error = true;
        document.getElementById("error-name").style.display = "block";
    }else{
        document.getElementById("error-name").style.display = "none";
    }
    var Surname = formContact.Surname.value;
    if (!Surname|| (Surname == "")){
        error = true;
        document.getElementById("error-surname").style.display = "block";
    }else{
        document.getElementById("error-surname").style.display = "none";
    }
    var Language = formContact.Language.value;
    if(!Language){
        error = true;
        document.getElementById("error-language").style.display = "block";
    }else{
        document.getElementById("error-language").style.display = "none";
    }
    var Validate = formContact.Validate.value;
    if(!Validate|| (Validate != '1234')){
        error = true;
        document.getElementById("error-validate").style.display = "block";
    }else{
        document.getElementById("error-validate").style.display = "none";
    }
    if(!error) pushContactData(formContact);
}

function pushContactData(formContact){
    var refContact = firebase.database().ref().child("Contacto");
    refContact.push({
        Email: formContact.Email.value,
        Email2: formContact.Email2.value,
        Language: formContact.Language.value,
        Name: formContact.Name.value,
        Surname: formContact.Surname.value,
        Validate: formContact.Validate.value
    });
    alert("¡Correo enviado! Le enviaremos un correo para que confirme sus datos.");
}

