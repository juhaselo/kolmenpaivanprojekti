$(function () {

  console.log(" Main JS Toimii !!");


  // 1) Hae Kaveria funktio 
  $("#serchFriend").click(function () {
    console.log("Hae kaveria toimii");
    searchFriends()
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

});

function searchFriends() {
  $('#demo').append('Haku tehty. Valitse Löydetyt Kaverit listasta haluamasi kaveri.<br>');

}

function sendMail() {
  $('#demo').append('Lähetetty kaveri pyyntö käyttäjälle.<br>');

}

