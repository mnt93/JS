/*===============================================================================================================
 * check.js — Point d'entrée unique pour les exercices Moodle
 *
 * Ce fichier est chargé via XHR synchrone + eval() dans chaque question.
 * Il fournit :
 *   1. Les fonctions utilitaires : check_course_id(), find_course_id(), find_attempt_id()
 *   2. Le chargement IMMÉDIAT et INCONDITIONNEL de Plotly et jStat
 *      (indépendant de l'autorisation du cours)
 *   3. La fonction moodle_init() qui charge moodle.js et exécute les callbacks
 *      une fois toutes les dépendances prêtes
 *===============================================================================================================*/


/*=============================================================================================================== */
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
    let element = document.querySelector('[class^="format-topics"]');
    var i0 = element.className.indexOf("course-");
    var i1 = element.className.indexOf("context-");
    var course_id = element.className.substring(i0 + 7, i1 - 1);
    return course_id;
}
/*=============================================================================================================== */

function find_attempt_id() {
    const htmlContent = document.documentElement.outerHTML;
    const startIndex = htmlContent.indexOf("attempt=");
    if (startIndex === -1) {
        console.log("La chaine 'attempt=' n'a pas ete trouvee dans le code source.");
        return null;
    }
    const start = startIndex + "attempt=".length;
    const endIndex = htmlContent.indexOf("&amp;cmid=", start);
    if (endIndex === -1) {
        console.log("La chaine '&amp;cmid=' n'a pas ete trouvee dans le code source.");
        return null;
    }
    return htmlContent.substring(start, endIndex);
}
/*=============================================================================================================== */

/*
 * Chargement IMMEDIAT et INCONDITIONNEL de Plotly et jStat
 * ---------------------------------------------------------
 * Ces bibliotheques sont chargees des l'execution de check.js,
 * independamment de l'autorisation du cours.
 *
 * Les Promises resultantes sont stockees sur window (_loadPlotly, _loadJstat)
 * pour que moodle_init() puisse les attendre sans les relancer.
 *
 * Plotly : chargement via <script src> — aucun conflit AMD avec RequireJS.
 *
 * jStat  : chargement via fetch + eval avec neutralisation temporaire de define().
 *          jStat est package comme module AMD : un <script src> declencherait
 *          "Mismatched anonymous define()" dans RequireJS de Moodle.
 *          On masque window.define le temps de l'eval puis on le restaure.
 */

// Garde : sur review.php, check.js est evalue plusieurs fois (une par question).
// On ne recrée les Promises que si elles n'existent pas encore, pour eviter
// de relancer des chargements deja en cours ou termines.
if (!window._loadPlotly) {
    window._loadPlotly = (typeof window.Plotly !== 'undefined')
        ? Promise.resolve()
        : new Promise(function(resolve, reject) {
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/plotly.js-dist-min@3.5.0/plotly.min.js';
            s.onload  = function() { console.log("Plotly charge."); resolve(); };
            s.onerror = function() { reject(new Error('Echec chargement Plotly')); };
            document.head.appendChild(s);
        });
    console.log("check.js : chargement de Plotly lance.");
}

if (!window._loadJstat) {
    window._loadJstat = (typeof window.jStat !== 'undefined')
        ? Promise.resolve()
        : fetch('https://cdn.jsdelivr.net/npm/jstat@1.9.6/dist/jstat.min.js')
            .then(function(r) {
                if (!r.ok) throw new Error('Echec chargement jStat');
                return r.text();
            })
            .then(function(jstatCode) {
                var _define = window.define;
                window.define = undefined;
                try   { eval(jstatCode); }
                finally { window.define = _define; }
                console.log("jStat charge.");
            });
    console.log("check.js : chargement de jStat lance.");
}

/*=============================================================================================================== */

/*
 * Systeme de callbacks _onMoodleReady
 * ------------------------------------
 * Les questions enregistrent leurs fonctions graphiques avant d'appeler
 * moodle_init() :
 *
 *   window._onMoodleReady = window._onMoodleReady || [];
 *   window._onMoodleReady.push(function() { plot_distribution_plotly(...); });
 *   moodle_init('loading-mask', 'exercise-content');
 *
 * moodle_init() attend que moodle.js, Plotly ET jStat soient tous disponibles
 * avant d'executer ces callbacks.
 */

/**
 * moodle_init(mask_id, content_id)
 *
 * Charge moodle.js (si le cours est autorise) puis execute tous les callbacks
 * enregistres dans window._onMoodleReady une fois toutes les dependances pretes.
 *
 * @param {string} mask_id    ID du div "loading-mask"
 * @param {string} content_id ID du div "exercise-content"
 */
function moodle_init(mask_id, content_id) {
    try {
        var courseId  = find_course_id();
        var moodleUrl = check_course_id(courseId);
        var mask      = document.getElementById(mask_id);
        var content   = document.getElementById(content_id);

        console.log("moodle_init : URL de moodle.js =",
            moodleUrl !== "" ? moodleUrl : "(cours non autorise)");

        if (moodleUrl !== "") {

            // Capturer l'index des callbacks enregistres AU MOMENT de cet appel.
            // Sur review.php, plusieurs moodle_init() coexistent sur la meme page
            // et partagent window._onMoodleReady. Chaque moodle_init ne doit
            // executer QUE les callbacks enregistres avant son propre appel,
            // pas ceux des autres questions qui arriveront plus tard.
            window._onMoodleReady = window._onMoodleReady || [];
            var myStart = window._onMoodleReady.length;

            // Fetch de moodle.js — lance en parallele avec Plotly/jStat deja en cours
            var fetchMoodle = (window._moodleJsCode)
                ? Promise.resolve(window._moodleJsCode)
                : fetch(moodleUrl)
                    .then(function(response) {
                        if (!response.ok) throw new Error('Erreur telechargement moodle.js');
                        return response.text();
                    })
                    .then(function(code) {
                        window._moodleJsCode = code; // cache pour les appels suivants
                        return code;
                    });

            // Attendre les trois ressources simultanement
            Promise.all([fetchMoodle, window._loadPlotly, window._loadJstat])
                .then(function(results) {
                    var code = results[0]; // texte de moodle.js

                    // Evaluer moodle.js une seule fois (idempotent grace a _moodleJsLoaded)
                    if (!window._moodleJsLoaded) {
                        var wrappedCode = '(function(global){\n' + code + '\n'
                            + 'var _fns=["plot_distribution_plotly","plot_distribution",'
                            + '"plot_binom_pmf","plot_normal_01","plot_line_area",'
                            + '"plot_bar_chart","plot_line_area_bilateral",'
                            + '"data_from_function","bin_cdf","tcdf","getArray","reponses",'
                            + '"reponses_proposees","intervalles_proposees"];\n'
                            + 'for(var _i=0;_i<_fns.length;_i++){' 
                            + '  try{if(typeof eval(_fns[_i])!=="undefined")' 
                            + '    global[_fns[_i]]=eval(_fns[_i]);}' 
                            + '  catch(e){}}' 
                            + '\n})(window);';
                        // Neutraliser l'option mathjax pour supprimer le warning
                        // "No MathJax version: undefined" de Plotly
                        wrappedCode = wrappedCode.replace(/mathjax\s*:\s*'[^']*'/g, '');
                        eval(wrappedCode);
                        window._moodleJsLoaded = true;
                        console.log("moodle.js evalue — toutes les dependances pretes.");
                    }

                    // Afficher le contenu de cette question
                    if (mask)    mask.style.display    = 'none';
                    if (content) content.style.display = 'block';

                    // Executer UNIQUEMENT les callbacks enregistres avant cet appel
                    var callbacks = window._onMoodleReady || [];
                    var myEnd = callbacks.length;
                    for (var i = myStart; i < myEnd; i++) {
                        try { callbacks[i](); }
                        catch(e) {
                            console.error("Erreur dans _onMoodleReady[" + i + "] :", e);
                        }
                    }
                    // Marquer les callbacks consommes (sans les supprimer pour les autres)
                    for (var j = myStart; j < myEnd; j++) {
                        callbacks[j] = null;
                    }
                })
                .catch(function(err) {
                    console.error("Erreur chargement des ressources :", err);
                    if (mask)    mask.style.display    = 'none';
                    if (content) content.style.display = 'block';
                });

        } else {
            // Cours non autorise
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
