// Kuinka rakentaa palvelu?
// A. Käyttöliittymästä liikkeelle lähtien?
// B. Toiminnoista liikkeelle lähtien?
// -> lähdettiin liikkeelle käyttöliittymä edellä
// VAIHEET:
// 1. Luo dropdownmenu-valikko (OK)
// 2. Luo div-elementti elokuvia varten (OK)
// 3. Linkitettiin Jquery-kirjasto + finnkino.js -skripti HTML-sivulle
// 4. Rakennetaan select-valikolle (theatresMenu) kuuntelija (OK)
// 5. Reagoidaan select-valikkoon ja tulostetaan jotakin diviin (OK)
// 6. elokuvateatterin tietojen haku (OK)
// 7. elokuvateatterin tiedon dropdown-valikkoon (OK)
// 8. lisää elokuvateatterin id-tunniste valikkoon
// 9. poistetaan autot HTML-valikosta
// 10. hae teatterin perusteella elokuvien tiedot

// Syntaksi: 
// 'select' -> elementti, jota kuunnellaan
// 'change' -> tapahtumatyyppi, jota kuunnellaan
// 'function() -> mitä tehdään kun tapahtuma tapahtuu
// https://stackoverflow.com/questions/11179406/jquery-get-value-of-select-onchange
// $('select').on('change', function() {
//   alert( this.value );
// })
$(function() {

  $('#theatresMenu').on('change', onValueChange);
  
  // vaihtoehto: erillinen tapahtumankäsittelijä
  function onValueChange() {
    console.log('Valittu arvo:' +this.value);
    console.log('Valittu teksti: '+$('#theatresMenu option:selected').text());
    //appendToMovieDiv('<b>arvo: '+this.value+'</b>');

    getMovieSchedule(this.value);
  }
    
  // esim: https://www.w3schools.com/jquery/html_append.asp
  function appendToMovieDiv(html) {
     // tyhjennä div: $('#movieContainer').empty();
  	 $('#movieContainer').append(html+'<br/>');
  }
  console.log('JS ladattu');
  getTheatres();
  
  // elokuvateatterien haku, HTTP-pyynnön lähettäminen Finnkinon palvelimelle
  function getTheatres() {
    console.log('getTheatres');
    $.ajax({
        'url': 'http://www.finnkino.fi/xml/TheatreAreas/',
        'dataType': 'xml',
        'success': onGetTheatres
    });
  }
  
	function onGetTheatres(data) {
    console.log('onGetTheatres');
    // var xmlText = new XMLSerializer().serializeToString(data);
    // console.log('onSelloData: '+xmlText);
    
    // $(data) -> muuta xml JQuery-XML-objektiksi
    // $(data).find -> JQueryn tarjoama toiminto, hae XML:n sisältä elementtejä
    // 1. Ota jokainen TheatreArea -elementti
    // 2. Poimi jokaisen elementin sisältä ID- ja Name -kentät
    
    var theatres = {};
    
    $(data).find('TheatreArea').each(function() {
      // console.log('ID (testi): '+$(this).find('ID').text());
      // console.log('Name (testi): '+$(this).find('Name').text());
      var id = $(this).find('ID').text();
      var name = $(this).find('Name').text();
      // tallenna JS-objektiin pari, jossa id on avaimena ja name arvona, esim: 1032: 'Sello'
      theatres[id] = name;
    });
    
    // tulosta JS-objekti
    // console.log(theatres);
    addTheatresToMenu(theatres);
  }
  
  function addGenresToMenu(genreArray) {
    $('#genreMenu').empty();
    for (var genreEntry of genreArray) {
      $('#genreMenu').append('<option value="'+genreEntry+'">'+genreEntry+'</option>');
    }
  }
  
  function addTheatresToMenu(theatresObject) {
     // ES6-tyylin for-looppi
     // for (const key of Object.keys(obj)) {
     // console.log(key, obj[key]);
     // }
     for (var key of Object.keys(theatresObject)) {
       // console.log('id: '+key+', value: '+theatresObject[key]);
       // lisää alielementti select-objektille, joka on yksilöity id:llä 'theatresMenu'
       $('#theatresMenu').append('<option value="'+key+'">'+theatresObject[key]+'</option>');
     }
  }
  
  // hae näytöstiedot
  function getMovieSchedule(theatreId) {
    console.log('getMovieSchedule');
    $.ajax({
        'url': 'http://www.finnkino.fi/xml/Schedule/?area='+theatreId,
        'dataType': 'xml',
        'success': onGetMovieSchedule
    });
  }

  function onGetMovieSchedule(xml) {

    $('#movieContainer').empty();
    
    // Set: joukko-tietorakenne
    // Yksittäinen alkio (esim. 'komedia') voi
    // esiintyä joukossa vain kerran, eli
    // voit lisätä saman alkion useita kertoja,
    // mutta se esiintyy joukossa vain kerran
    var allGenres = new Set();
    
    $(xml).find('Show').each(function() {
       var title = $(this).find('Title').text();
       var genres = $(this).find('Genres').text();
       
       // lisää genret taulukkoon
       for (var genre of genres.split(', ')) {
         allGenres.add(genre);
       }
         
       var showStart = $(this).find('dttmShowStart').text();
       var microPortrait = $(this).find('EventMicroImagePortrait').text();
      
       var time = showStart.split('T')[1];
       var day = showStart.substring(8,10);
       var month = showStart.substring(5,7);
       var timeFormatted = day+'.'+month+'. '+time;
       $('#movieContainer').append('<img src="'+microPortrait+'"></img>'+
                                   '<p>Elokuva: '+title+'</p>'+
                                   '<p>--- Genre: '+genres+'</p>'+
                                   '<p>--- Alkaa: '+timeFormatted+'</p>');
    });
    
    console.log('All genres: '+JSON.stringify(Array.from(allGenres)));
    addGenresToMenu(Array.from(allGenres));
	}
});

