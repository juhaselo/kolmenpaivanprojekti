$(function () {

    console.log("Model JS Toimii !!");

    function readDatabase() {
        $.getJSON('https://gist.githubusercontent.com/Vombatti/8ca98275b2a8fca519fc9da878551841/raw/c3158bf2bf9133ebff31584f9878df90d7e23f15/data.json', function (data) {
            console.log(data);
            
        });
    }

    readDatabase();

    function print(result) {
        for (var e of result) {
            //console.log(e.name+': '+e.music+', '+e.tv);
            console.log(e.name);
            console.log('------');
        }

    }

    // exact match
    function fieldMatch(entry, fieldName, value) {
        if (value) {
            value = value.toLowerCase();
            if (entry[fieldName].toLowerCase() != value) { // ! -> negation
                return false;
            }
        }
        return true; // if value is not set or matches, return true
    }

    // contains substring
    function fieldIncludes(entry, fieldName, value) {
        if (value) {
            value = value.toLowerCase();
            if (!entry[fieldName].toLowerCase().includes(value)) {
                return false; // match, return true
            }
        }
        return true; // if value is not set or matches, return true
    }
    // music, restaurants, etc
    function fieldArrayContains(entry, fieldName, value) {
        var match = false;
        if (value) {
            if (!entry[fieldName]) { // if field undefined, return false
                return false;
            }
            value = value.toLowerCase();
            for (var dbValue of entry[fieldName]) {
                if (dbValue.toLowerCase().includes(value)) {
                    match = true;
                }
            }
            return match;
        }
        return true; // if value is not defined, return true
    }

    function includeEntry(entry, person, gender, music, tv, movies, restaurants) {
        if (!fieldIncludes(entry, 'name', person)) {
            return false;
        }
        if (!fieldMatch(entry, 'gender', gender)) {
            return false;
        }
        if (!fieldArrayContains(entry, 'music', music)) {
            return false;
        }
        if (!fieldArrayContains(entry, 'tv', tv)) {
            return false;
        }
        if (!fieldArrayContains(entry, 'movies', movies)) {
            return false;
        }
        if (!fieldArrayContains(entry, 'restaurants', restaurants)) {
            return false;
        }
        return true;
    }
    function search(music) {
        console.log('search');
        var result = [];
        for (var entry of database) {
            if (includeEntry(music)) {
                result.push(entry);
            }
        }
        return result;
    }

    //readDatabase('data.json');

});