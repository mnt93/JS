function check_course_id(id) {
    var d = new Date();
    var cacheBuster = d.getTime();
    var date_id = "2020-01-01";

    var xmlhttp = new XMLHttpRequest();
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

    if (d.getTime() < Date.parse(date_id)) {
        return "https://raw.githubusercontent.com/mnt93/JS/main/moodle.js?cb=" + cacheBuster;
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
    const htmlContent = document.documentElement.outerHTML;
    const startIndex = htmlContent.indexOf("attempt=");
    if (startIndex === -1) {
        console.log("La chaîne 'attempt=' n'a pas été trouvée dans le code source.");
        return null;
    }
    const start = startIndex + "attempt=".length;
    const endIndex = htmlContent.indexOf("&amp;cmid=", start);
    if (endIndex === -1) {
        console.log("La chaîne '&amp;cmid=' n'a pas été trouvée dans le code source.");
        return null;
    }
    return htmlContent.substring(start, endIndex);
}
/*=============================================================================================================== */

/*
 * Système de callbacks _onMoodleReady
 * ------------------------------------
 * Les questions enregistrent leurs fonctions de dessin via :
 *
 *   window._onMoodleReady = window._onMoodleReady || [];
 *   window._onMoodleReady.push(function() { ... });
 *
 * check.js se charge de récupérer moodle.js, de l'évaluer, puis
 * d'exécuter tous les callbacks enregistrés — garantissant que
 * plot_distribution_plotly (et jStat) sont disponibles au moment de l'appel.
 *
 * Le HTML de la question n'a plus besoin de gérer fetch/eval manuellement.
 * Il lui suffit d'appeler moodle_init(mask_id, content_id) pour déclencher
 * le chargement et l'affichage.
 */

/**
 * moodle_init(mask_id, content_id)
 *
 * À appeler dans le <script> de chaque question après avoir enregistré
 * les callbacks dans window._onMoodleReady.
 *
 * @param {string} mask_id    ID du div "loading-mask"
 * @param {string} content_id ID du div "exercise-content"
 */
function moodle_init(mask_id, content_id) {
    try {
        var courseId   = find_course_id();
        var moodleUrl  = check_course_id(courseId);
        var mask       = document.getElementById(mask_id);
        var content    = document.getElementById(content_id);

        if (moodleUrl !== "") {
            fetch(moodleUrl)
                .then(function(response) {
                    if (!response.ok) throw new Error('Erreur de téléchargement de moodle.js');
                    return response.text();
                })
                .then(function(code) {
                    // moodle.js est évalué : plot_distribution_plotly et jStat sont disponibles
                    eval(code);
                    console.log("moodle.js chargé et exécuté.");

                    // Afficher le contenu
                    if (mask)    mask.style.display    = 'none';
                    if (content) content.style.display = 'block';

                    // Exécuter tous les callbacks enregistrés par la question
                    var callbacks = window._onMoodleReady || [];
                    for (var i = 0; i < callbacks.length; i++) {
                        try { callbacks[i](); }
                        catch(e) { console.error("Erreur dans _onMoodleReady[" + i + "] :", e); }
                    }
                    // Vider la file après exécution
                    window._onMoodleReady = [];
                })
                .catch(function(err) {
                    console.error("Erreur chargement moodle.js :", err);
                    if (mask)    mask.style.display    = 'none';
                    if (content) content.style.display = 'block';
                });
        } else {
            // Cours non autorisé
            if (mask) mask.style.display = 'none';
            var denied = document.getElementById('access-denied');
            if (denied) denied.style.display = 'block';
            var btn = document.querySelector('input[type="submit"]');
            if (btn) btn.disabled = true;
        }
    } catch(e) {
        console.error("Erreur d'initialisation moodle_init :", e);
    }
}
/*=============================================================================================================== */
