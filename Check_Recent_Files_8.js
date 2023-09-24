function find_last_url() {


  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  if (month < 7) {
    S = "Semester_2"
  } else {
    S = "Semester_1"
  }

  res = "";
  file_index1 = 0;
  while (res !== 404) {
    file_index1 = file_index1 + 1;
    url = "https://cdn.jsdelivr.net/gh/mnt93/JS/File_" + year + "_" + S + "_" + file_index1 + ".xml"
    var request = new XMLHttpRequest();
    request.open('GET', url, false); // `false` makes the request synchronous
    request.send(null);
    res = request.status;
  }

  file_index1 = file_index1 - 1;

  if (file_index1) {
    url1 = "https://cdn.jsdelivr.net/gh/mnt93/JS/File_" + year + "_" + S + "_" + file_index1 + ".xml"
  } else {
    url1 = "";
  }

  res = "";
  file_index2 = 0;
  while (res !== 404) {
    file_index2 = file_index2 + 1;
    url = "https://cdn.jsdelivr.net/gh/mnt93/JS/File_" + year + "_" + S + "_" + file_index2 + ".js"
    var request = new XMLHttpRequest();
    request.open('GET', url, false); // `false` makes the request synchronous
    request.send(null);
    res = request.status;
  }

  file_index2 = file_index2 - 1;

  if (file_index2) {
    url2 = "https://cdn.jsdelivr.net/gh/mnt93/JS/File_" + year + "_" + S + "_" + file_index2 + ".js"
  } else {
    url2 = "";
  }

  url = [url1, url2]
  return url

}

/*=============================================================================================================== */
/*=============================================================================================================== */


function check_course_id(id, url) {
  d = new Date();
  date_id = "2020-01-01"
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url[0], false);
  xmlhttp.overrideMimeType('text/xml')
  xmlhttp.send();
  if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
    var x, y, i = 0,
      xmlDoc, txt, z = 0;
    xmlDoc = xmlhttp.responseXML;
    x = xmlDoc.getElementsByTagName("COURS_ID");
    y = xmlDoc.getElementsByTagName("DATE");
    while (date_id == "2020-01-01" && i < x.length) {
      if (x[i].childNodes[0].nodeValue == id) {
        date_id = y[i].childNodes[0].nodeValue
      }
      i++;
    }
  }
  if (d.getTime() < Date.parse(date_id)) {
    return url[1]
  } else {
    return ""
  }
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
  let href = document.getElementById("langmenu0").getAttribute("href")
  var i0 = href.indexOf("=")
  var i1 = href.indexOf("&")
  var attempt = href.substring(i0 + 1, i1);
  return attempt
}
