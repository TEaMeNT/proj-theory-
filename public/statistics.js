function loadJSON(path, success)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } 
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

loadJSON('base.json', function(data) { 
    let arrDec = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 };
    var sumDec = 0;
    for (let i = 0; i < data["dec[0][]"].length; i++){
        arrDec[data["dec[0][]"][i][0]]++;
        sumDec++;
    }
    console.log(arrDec);

    var DOut = "";
    var Dkeys = Object.keys(arrDec);
    for (let i = 0; i < Dkeys.length; i++) {
        DOut += Dkeys[i] + ": " + round(arrDec[Dkeys[i]] / sumDec * 100, 4) + "%<br>";
    }
    document.getElementById("DecOutput").innerHTML = DOut;


    let arrHex = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "a": 0, "b" : 0, "c": 0, "d": 0, "e": 0, "f": 0};
    var sumHex = 0;
    for (let i = 0; i < data["hex[0][]"].length; i++){
        arrHex[data["hex[0][]"][i][0]]++;
        sumHex++;
    }
    console.log(arrHex);

    var HOut = "";
    var Hkeys = Object.keys(arrHex);
    for (let i = 0; i < Hkeys.length; i++) {
        HOut += Hkeys[i] + ": " + round(arrHex[Hkeys[i]] / sumHex * 100, 4) + "%<br>";
    }
    document.getElementById("HexOutput").innerHTML = HOut;

});