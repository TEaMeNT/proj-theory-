const form  = document.getElementsByTagName('form')[0];
var dictJSON = { "dec": [[]], "hex": [[]] };

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
document.getElementById("write").onclick = function() {  
    var inp = document.getElementById("num");
    dictJSON["dec"][0].push(inp.value);
    dictJSON["hex"][0].push(parseInt(inp.value).toString(16));
    document.getElementById("info").innerHTML = document.getElementById("info").innerHTML + inp.value + " ";
    inp.value = '';
}

document.getElementById("delete").onclick = function() {  
    dictJSON["hex"][0].pop();
    dictJSON["dec"][0].pop();
    var info = document.getElementById("info").innerHTML;
    info = info.substring(0, info.length - 1);
    document.getElementById("info").innerHTML = info.substring(0, info.lastIndexOf(" "));
}

document.getElementById("stat").onclick = function() {
    window.location.href = document.location.href + "statistics";
}

form.addEventListener('submit', function (event) { 
    event.preventDefault();
    loadJSON('base.json', function(data) { 
        data["dec[0][]"] = data["dec[0][]"].concat(dictJSON["dec"][0]);
        data["hex[0][]"] = data["hex[0][]"].concat(dictJSON["hex"][0]);
        dictJSON["dec"][0] = [];
        dictJSON["hex"][0] = [];
        jQuery.ajax({
            type: 'POST',
            data: data,
           success: function (resp) {
               alert(resp);
           },
           error: function (xhr, str) {
               alert('Возникла ошибка: ' + xhr.responseCode);
           }
       });
    });
    document.getElementById("info").innerHTML = "Отправлено!";
    setTimeout(() => document.getElementById("info").innerHTML = "Записано: ", 1000);
});