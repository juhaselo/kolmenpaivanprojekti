$(function () {

  console.log(" Main JS Toimii !!");

var database;
database =  $.getJSON('https://gist.githubusercontent.com/Vombatti/8ca98275b2a8fca519fc9da878551841/raw/c3158bf2bf9133ebff31584f9878df90d7e23f15/data.json');


  // 1) Hae Kaveria funktio 
  $("#serchFriend").click(function () {
    console.log("Hae kaveria toimii");
    searchFriends();
    getDatabase();
    //processJson(database)
  });

  // 2) Valittu kaveri

  $('#searchResult').on('change', onValueChange);

  function onValueChange() {
    console.log("Valittu kaveri toimii valitsit " + this.value);
    //console.log('Valittu teksti: ' + $('#serchFriend option:selected').text());
    //appendToFriendDiv('<b>' + this.value + '</b>');
   //$('#selectedUser').append(this.value);
  $('#selectedUser').val(this.value)

  }

  function appendToFriendDiv(html) {
    $('#demo2').append(html + '<br/>');
    //$('#selectedUser').append(html);
   
    
  }

  //3) Valittu ikä 
  //age

  $('#ageResult').on('change', onAgeSelected);

  function onAgeSelected() {
    console.log("Ikä toimii valitsit " + this.value);

  }

  // 4)Valittu kaveri sukupuoli
  //gender

  $('input[name="gender"]').on('change', onGenderSelected);

  function onGenderSelected() {
    console.log("Sukupuoli toimii valitsit " + this.value);

  }


  // 5) Valittu kaveri koulutus
  //education

  $('#educationResult').on('change', onEeducationSelected);

  function onEeducationSelected() {
    console.log("Koulutus toimii valitsit " + this.value);

  }

  // 6) Hae Kaveria funktio 

  $("#sendResponce").click(function () {
    console.log("Ota yhteyttä toimii");
    sendMail();
  });

function getDatabase() {
    $.getJSON('https://gist.githubusercontent.com/Vombatti/8ca98275b2a8fca519fc9da878551841/raw/c3158bf2bf9133ebff31584f9878df90d7e23f15/data.json', function (database) {
        //console.log(database);
        var musicValue = $('#music').val();
        console.log(musicValue);
        findPersonByMusic(database, musicValue);
    });
}

function findPersonByMusic(dataset, musicQuery) {
    console.log('findPersonByMusic');
    for(var entry of dataset) {
         console.log('-----------');
         console.log('name: '+entry.name);
         console.log('gender: '+entry.gender);
         console.log('age: '+entry.age)
         console.log('education: '+entry.education)
          

         if(entry.music) {
          console.log('music: '+entry.music.join(', '));
          var musicStr = entry.music.join(', ').toLowerCase();
          musicQuery = musicQuery.toLowerCase();
          if(musicStr.includes(musicQuery)) {

              //$('#demo2').append(entry.name + '<br/>');
              // tähän koodi, joka 
              // 1) valitsee select-elementin
              // 2) ja lisää sinne option-elementtejä, yksi jokaista löydettyä käyttäjää kohti
               
//for (var entry of entry) {
      $('#searchResult').append('<option value="'+entry.name +'">'+entry.name +'</option>');
  // }



              
          }
         } else {
          console.log('music: not defined');
         }
         if(entry.restaurants) {
            //console.log('restaurants: '+entry.restaurants.join(' and '));
         }
        
    }
}


});

function searchFriends() {
  $('#demo').append('<b>Haku tehty. Valitse Löydetyt Kaverit listasta haluamasi kaveri.</b><br>');

}

function sendMail() {
  $('#demo').append('<b>Lähetetty kaveri pyyntö käyttäjälle.</b><br>');

}

