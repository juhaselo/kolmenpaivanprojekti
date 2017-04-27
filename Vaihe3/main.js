$(function () {

  console.log("Toimii !!");


  // 1) Hae Kaveria funktio 
  $("#serchFriend").click(function () {
    console.log("Hae kaveria toimii");
  });

  // 2) Valittu kaveri
  
  $('#searchResult').on('change', onValueChange);

 function onValueChange() {
   console.log("Valittu kaveri toimii valitsit " + this.value);

  }

  //3) Valittu ikä 
  //age

    $('#age').on('change', onValueChange);

 function onValueChange() {
   console.log("Ikä toimii valitsit " + this.value);

  }

  // 4)Valittu kaveri sukupuoli
  //gender

    $('#gender').on('change', onValueChange);

 function onValueChange() {
   console.log("Sukupuoli toimii valitsit " + this.value);

  }

  // 5) Valittu kaveri koulutus
  //education

    $('#education').on('change', onValueChange);

 function onValueChange() {
   console.log("Koulutus toimii valitsit " + this.value);

  }


  // 6) Hae Kaveria funktio 

  $("#sendResponce").click(function () {
    console.log("Ota yhteyttä toimii");
  });

  });

