$(function () {

  console.log(" Main JS Toimii !!");

var database;
database =  $.getJSON('https://gist.githubusercontent.com/Vombatti/8ca98275b2a8fca519fc9da878551841/raw/c3158bf2bf9133ebff31584f9878df90d7e23f15/data.json');


  // 1) Hae Kaveria funktio 
  $("#serchFriend").click(function () {
    console.log("Hae kaveria toimii");
    searchFriends()
    processJson(data)
  });

  // 2) Valittu kaveri

  $('#searchResult').on('change', onValueChange);

  function onValueChange() {
    console.log("Valittu kaveri toimii valitsit " + this.value);
    //console.log('Valittu teksti: ' + $('#serchFriend option:selected').text());
    appendToFriendDiv('<b>' + this.value + '</b>');


  }

  function appendToFriendDiv(html) {
    $('#demo2').append(html + '<br/>');
    $('#selectedUser').append(html);
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

function readDatabase() {
    $.getJSON('https://gist.githubusercontent.com/Vombatti/8ca98275b2a8fca519fc9da878551841/raw/c3158bf2bf9133ebff31584f9878df90d7e23f15/data.json', function (data) {
        processJson(data);
    });
}

function processJson(data) {
    for(var entry of data) {
         console.log('-----------');
         console.log('name: '+entry.name);
         console.log('gender: '+entry.gender);
         console.log('age: '+entry.age)
         console.log('education: '+entry.education)
          $('#demo2').append(entry.name + '<br/>');

         if(entry.music) {
          console.log('music: '+entry.music.join(', '));
         } else {
          console.log('music: not defined');
         }
         if(entry.restaurants) {
            //console.log('restaurants: '+entry.restaurants.join(' and '));
         }
        
    }
}

readDatabase();

function search(person, gender, music, tv, movies, restaurants) {
   console.log('search');
   var result = [];
   for(var entry of database) {
     if(includeEntry(entry, person, gender, music, tv, movies, restaurants)) {
        result.push(entry);
     }
   }
   return result;
}

function print(result) {
    for(var e of result) {
        //console.log(e.name+': '+e.music+', '+e.tv);
        console.log(e.name);
        console.log('------');
    }

}
print(search('', '', 'Haloo Helsinki', '', '', ''));






});

function searchFriends() {
  $('#demo').append('Haku tehty. Valitse Löydetyt Kaverit listasta haluamasi kaveri.<br>');

}

function sendMail() {
  $('#demo').append('Lähetetty kaveri pyyntö käyttäjälle.<br>');

}

