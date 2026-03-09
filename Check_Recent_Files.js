
/*=============================================================================================================== */
/*=============================================================================================================== */


function check_course_id(id) {

    return `https://cdn.jsdelivr.net/gh/mnt93/JS@main/moodle.js`

}


/*=============================================================================================================== */
/*=============================================================================================================== */


function find_course_id() {
  let element = document.querySelector('[class^="format-topics"]')
  var i0 = element.className.indexOf("course-")
  var i1 = element.className.indexOf("context-")
  var course_id = element.className.substring(i0 + 7, i1 - 1);
  return course_id
}
/*=============================================================================================================== */
/*=============================================================================================================== */


function get_num_question() {
  var currentScript = document.currentScript;
  var scriptElements = document.getElementsByClassName("qno");
  var currentScriptIndex = -1;
  var Num_question = 0;
  for (var i = 0; i < scriptElements.length; i++) {
    if (scriptElements[i] == currentScript) {
      Num_question = (i + 1) / 2;
      break;
    }
  }
  return Num_question

}

/*=============================================================================================================== */
/*=============================================================================================================== */

function find_stdt_id() {
  let element = document.querySelector('[class^="d-none d-md-inline-block mx-1"]')
  return element.textContent
}


/*=============================================================================================================== */
/*=============================================================================================================== */


//Cette fonction calcule une valeur numérique unique à partir de chaque caractère de la chaîne en utilisant un algorithme de hachage basé sur la méthode de Horner.

function hashCode(str) {
  var hash = 0,
    i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
/*=============================================================================================================== */
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
