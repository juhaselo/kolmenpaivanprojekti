$(function () {

   console.log("Toimii !!");


  // 1) Hae Kaveria funktio 
  $("#serchFriend").click(function () {
    console.log("Hae kaveria toimii");
    searchFriends()
  });

  // 2) Valittu kaveri
  
  $('#searchResult').on('change', onValueChange);

  // vaihtoehto: erillinen tapahtumankÃĪsittelijÃĪ
  function onValueChange() {
 
  }
  



 function onValueChange() {
  console.log("Valittu kaveri toimii valitsit " + this.value);
    console.log('Valittu teksti: '+$('#serchFriend option:selected').text());
   appendToFriendDiv('<b>arvo: '+this.value+'</b>'); 

   
  }

    function appendToFriendDiv(html) {
     	 $('#demo2').append(html+'<br/>');
  }

  //3) Valittu ikä 
  //age

    $('#ageResult').on('change', onValueChange);

 function onValueChange() {
   console.log("Ikä toimii valitsit " + this.value);

  }
  //3) Valittu ikä 
  //age

    $('#ageResult').on('change', onValueChange);

 function onValueChange() {
   console.log("Ikä toimii valitsit " + this.value);

  }

  // 4)Valittu kaveri sukupuoli
  //gender

    $('#genderResult').on('change', onValueChange);

 function onValueChange() {
   console.log("Sukupuoli toimii valitsit " + this.value);

  }

  // 5) Valittu kaveri koulutus
  //education

    $('#educationResult').on('change', onValueChange);

 function onValueChange() {
   console.log("Koulutus toimii valitsit " + this.value);

  }

  // 6) Hae Kaveria funktio 

  $("#sendResponce").click(function () {
    console.log("Ota yhteyttä toimii");
  });

});

function searchFriends() {
  $('#demo').append('Tähän tulee haun tulokset.<br>');

}
