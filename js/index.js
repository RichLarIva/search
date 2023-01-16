"use strict";

var omdbAPI = new XMLHttpRequest();


var submit = document.getElementById('sub');

submit.addEventListener("click", () => {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";
    var search = document.forms[0].elements['query'].value;
    search = search.replace(" ", "%20");
    if (search == null || search == ""){
        alert("Empty");
    }
    else{

        var omdbURL = `http://www.omdbapi.com/?s=${search}&type=movie&apikey=CENSORED`;
        omdbAPI.addEventListener("load", function(){
            var res = JSON.parse(this.responseText);
            
            console.log(res);
            if(res.Error == "Movie not found!" || res == undefined || res == null){
                alert("Couldn't find the movie");
            }
            else{

                res.Search.forEach(elm => {
                    resultDiv.innerHTML += `<h3>${elm.Title}</h3> <span>${elm.Year}</span> <hr>`;
                });
            }
        })
        
        omdbAPI.open("get", omdbURL, true);
        omdbAPI.send();
    }

    event.preventDefault();
})