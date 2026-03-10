function check_course_id(id) {
    var d = new Date();
    var cacheBuster = d.getTime();
    var date_id = "2020-01-01";

    var xmlhttp = new XMLHttpRequest();
    //xmlhttp.open("GET", "https://cdn.jsdelivr.net/gh/mnt93/JS@main/moodle.xml?cb=" + cacheBuster, false);
    xmlhttp.open("GET", "https://raw.githubusercontent.com/mnt93/JS/main/moodle.xml?cb=" + cacheBuster, false);
    xmlhttp.overrideMimeType('text/xml');
    xmlhttp.send();

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var xmlDoc = xmlhttp.responseXML;
        if (!xmlDoc) return "";
        var x = xmlDoc.getElementsByTagName("COURS_ID");
        var y = xmlDoc.getElementsByTagName("DATE");
        var i = 0;
        while (date_id == "2020-01-01" && i < x.length) {
            if (x[i].childNodes[0].nodeValue == id) {
                date_id = y[i].childNodes[0].nodeValue;
            }
            i++;
        }
    }
    //document.getElementById("demo").innerHTML = d.getTime();
    //document.getElementById("demo1").innerHTML = date_id;
    //document.getElementById("demo2").innerHTML = d.getTime() < Date.parse(date_id)
    if (d.getTime() < Date.parse(date_id)) {
        return "https://cdn.jsdelivr.net/gh/mnt93/JS@main/moodle.js?cb=" + cacheBuster;
    } else {
        return "";
    }
}
/*=============================================================================================================== */
    

function find_course_id() {
    let element = document.querySelector('[class^="format-topics"]')
    var i0 = element.className.indexOf("course-")
    var i1 = element.className.indexOf("context-")
    var course_id = element.className.substring(i0 + 7, i1 - 1);
    return course_id
}
/*=============================================================================================================== */

function find_attempt_id() {
    // Obtenir le code source HTML de la page actuelle
    const htmlContent = document.documentElement.outerHTML;

    // Trouver l'index de la première occurrence de "attempt="
    const startIndex = htmlContent.indexOf("attempt=");

    if (startIndex === -1) {
        // "attempt=" n'a pas été trouvé
        console.log("La chaîne 'attempt=' n'a pas été trouvée dans le code source.");
        return null;
    }

    // Définir le début de la chaîne à extraire juste après "attempt="
    const start = startIndex + "attempt=".length;

    // Trouver l'index de la première occurrence de "&amp;cmid=" après "attempt="
    const endIndex = htmlContent.indexOf("&amp;cmid=", start);

    if (endIndex === -1) {
        // "&amp;cmid=" n'a pas été trouvé
        console.log("La chaîne '&amp;cmid=' n'a pas été trouvée dans le code source.");
        return null;
    }

    // Extraire la chaîne entre "attempt=" et "&amp;cmid="
    const attemptValue = htmlContent.substring(start, endIndex);

    return attemptValue;
}
/*=============================================================================================================== */
