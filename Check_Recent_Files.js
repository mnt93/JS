function find_last_url() {


	const d = new Date();
	let year = d.getFullYear();
	let month = d.getMonth();
	if(month<7) {S="S1"} else {S="S2"}

	res="";
	file_index1=0;
    while(res!==404){
		file_index1=file_index1+1;
		url="https://raw.githubusercontent.com/mnt93/JS/main/File_"+year+"_"+S+"_"+file_index1+".xml"
		var request = new XMLHttpRequest();
		request.open('GET', url, false);  // `false` makes the request synchronous
		request.send(null);
    	res=request.status;
	}

	file_index1=file_index1-1;
    
    if (file_index1) {
		url1="https://raw.githubusercontent.com/mnt93/JS/main/File_"+year+"_"+S+"_"+file_index1+".xml"
    } else { 
    	url1="";
    }  
    
 	res="";
	file_index2=0;
    while(res!==404){
		file_index2=file_index2+1;
		url="https://cdn.jsdelivr.net/gh/mnt93/JS/File_"+year+"_"+S+"_"+file_index2+".js"
		var request = new XMLHttpRequest();
		request.open('GET', url, false);  // `false` makes the request synchronous
		request.send(null);
    	res=request.status;
	}

	file_index2=file_index2-1;
    
    if (file_index2) {
    	url2="https://cdn.jsdelivr.net/gh/mnt93/JS/File_"+year+"_"+S+"_"+file_index2+".js"
    } else { 
    	url2="";
    }   
    
	url=[url1,url2]
	return url

}


function check_course_id(id,url) {
  d = new Date();
  date_id="2020-01-01"
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url[0], false);
  xmlhttp.overrideMimeType('text/xml')
  xmlhttp.send();
  if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
  	var x, y, i=0, xmlDoc, txt ,z=0;
  	xmlDoc = xmlhttp.responseXML;
  	x = xmlDoc.getElementsByTagName("COURS_ID");
    y = xmlDoc.getElementsByTagName("DATE");
  	while ( date_id=="2020-01-01" && i< x.length) {
    	if (x[i].childNodes[0].nodeValue==id) {
    		date_id = y[i].childNodes[0].nodeValue
    	}
        i++;
  	}
  }
  if (d.getTime() < Date.parse(date_id)) {
    return url[1]}
  else {
    return ""
  }
}

function find_course_id() {
        let element = document.querySelector('[class^="format-topics"]')
        var i0 = element.className.indexOf("course-")
        var i1 = element.className.indexOf("context-")
        var course_id = element.className.substring(i0 + 7, i1 - 1);
        return course_id
}