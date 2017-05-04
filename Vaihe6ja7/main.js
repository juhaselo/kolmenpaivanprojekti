$(function () {

  console.log(" Main JS Toimii !!");

var database;
database =  $.getJSON('https://gist.githubusercontent.com/Vombatti/8ca98275b2a8fca519fc9da878551841/raw/c3158bf2bf9133ebff31584f9878df90d7e23f15/data.json');


  // 1) Hae Kaveria funktio 
  $("#serchFriend").click(function () {
    console.log("Hae kaveria toimii");
    getDatabase();
    //processJson(database)
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

              $('#demo2').append(entry.name + '<br/>');
              // tähän koodi, joka 
              // 1) valitsee select-elementin
              // 2) ja lisää sinne option-elementtejä, yksi jokaista löydettyä käyttäjää kohti
              $select #searchResult
          }
         } else {
          console.log('music: not defined');
         }
         if(entry.restaurants) {
            //console.log('restaurants: '+entry.restaurants.join(' and '));
         }
        
    }
}

//searchFriend();

function print(result) {
    for(var e of result) {
        //console.log(e.name+': '+e.music+', '+e.tv);
        console.log(e.name);
        console.log('------');
    }

}

// exact match
function fieldMatch(entry, fieldName, value) {
    if(value) {
     value = value.toLowerCase();
     if(entry[fieldName].toLowerCase() != value) { // ! -> negation
        return false;
     }
   }
   return true; // if value is not set or matches, return true
}

// contains substring
function fieldIncludes(entry, fieldName, value) {
   if(value) {
     value = value.toLowerCase();
     if(!entry[fieldName].toLowerCase().includes(value)) {
        return false; // match, return true
     }
   }
   return true; // if value is not set or matches, return true
}
// music, restaurants, etc
function fieldArrayContains(entry, fieldName, value) {
   var match = false;
   if(value) {
     if(!entry[fieldName]) { // if field undefined, return false
       return false;
     }
     value = value.toLowerCase();
     for(var dbValue of entry[fieldName]) {
       if(dbValue.toLowerCase().includes(value)) {
         match = true;
       }
     }
     return match;
   }
   return true; // if value is not defined, return true
}

function includeEntry(entry, person, gender, music, tv, movies, restaurants) {
   if(!fieldIncludes(entry, 'name', person)) {
     return false;
   }
   if(!fieldMatch(entry, 'gender', gender)) {
     return false;
   }
   if(!fieldArrayContains(entry, 'music', music)) {
     return false;
   }
   if(!fieldArrayContains(entry, 'tv', tv)) {
     return false;
   }
   if(!fieldArrayContains(entry, 'movies', movies)) {
     return false;
   }
   if(!fieldArrayContains(entry, 'restaurants', restaurants)) {
     return false;
   }
   return true;
}
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

//print(search('', '', 'Haloo Helsinki', '', '', ''));






});

function searchFriends() {
  $('#demo').append('Haku tehty. Valitse Löydetyt Kaverit listasta haluamasi kaveri.<br>');

}

function sendMail() {
  $('#demo').append('Lähetetty kaveri pyyntö käyttäjälle.<br>');

}

