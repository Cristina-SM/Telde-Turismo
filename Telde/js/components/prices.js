windoe.onload = initialize;

function intialize(){

}

function downloadVisits(){
 

    var refVisits = firebase.database().child("visits");

    refVisits.on("value", showVisits);

}

function showVisits(snap){
    var visitRows = document.getElementById("visit-rows");

    var data = snap.val();
    
    var allVisits = "";


    for(var key in data){

        allvisits.innerHTML += "<tr><td>"+data[key].name+"</td><td>"+data[key].price+"&euro;</td></tr>";


        data[key].name

        data[key].price
    }

    visitRows.innerHTML = allVisits
}