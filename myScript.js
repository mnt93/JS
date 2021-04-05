function random() {
    var x = Math.sin(6+seed++) * 10000;
    return x - Math.floor(x);
}

function significant_digits(x,n,sci) 
{
	if (x !=0 ) {
		//x1=Math.round(Math.round(Math.abs(x)/Math.pow(10,Math.ceil(Math.log10(Math.abs(x)))-(n+1)))/10);
        x1=Math.round(Math.abs(x)/Math.pow(10,Math.ceil(Math.log10(Math.abs(x)))-(n)))        // x1 est le premier chiffre du nombre x arrondi avec chiffre significatif
        s1=""+x1;
        s1=s1.substring(0,n)
        x0=x/Math.pow(10,(Math.ceil(Math.log10(Math.abs(x)))-(n+1)))/10
        puissance=(Math.floor(Math.log10(Math.abs(x))))
        s0=""+Math.pow(10,(Math.floor(Math.log10(Math.abs(x)))));
        s4=s1.substring(0,1)+"."+s1.substring(1,n);
        if (x1==Math.pow(10,n) && Math.abs(Math.abs(Math.pow(10,n)/x0)-1) > 1e-15 ){
            if ( (puissance+1)!= 0 ) {
                if (sci==0){
                    s5=""
                }
                if (sci==1){
                    s5=" 10"+"<sup>"+(puissance+1)+"</sup>"
                }
                if (sci==2){
                    s5="e"+(puissance+1)
                }                
            }
            else {
                s5=""
            }
            
        }
        else {
        	if (puissance != 0) {
                if (sci==0){
                    s5=""
                }
				if (sci==1){
                    s5=" 10"+"<sup>"+(puissance)+"</sup>"
                }
                if (sci==2){
                    s5="e"+(puissance)
                }
            }
            else {
                s5=""
            }
        }
//===================================================================================================================//===================================================================================================================        
        
        if (s4.substring(s4.length,1)=="."){
        	s4=s4.substring(0,s4.length-1)
    	}
    	s=s4+s5
        s7="wech"
    	if (sci==0) {
    		if (puissance>=0 ){
            	s6=s4.substring(0,1)+s4.substring(2,s4.length);
            	if (x1==Math.pow(10,n) && Math.abs(Math.abs(Math.pow(10,n)/x0)-1) > 1e-15) { imax=puissance-n+3}
            	else { imax=puissance-n+2 }
            	for(i=1;i<imax;i++){
            		s6=s6+"0";
            	}
            	
            	if (s6.length>puissance+1 && imax!=puissance-n+3){
                	s7=s6.substring(0,puissance+1)+"."+s6.substring(puissance+1,s6.length)
            	}else if (imax!=puissance-n+3){
                    s7=s6.substring(0,puissance+1)
            	}else {
                	s7=s6.substring(0,puissance+2)
            	}
        	}
            else{
            	s6=s4.substring(0,1)+s4.substring(2,s4.length);
            	if (x1==Math.pow(10,n) && Math.abs(Math.abs(Math.pow(10,n)/x0)-1) > 1e-15) { imax=-puissance }
            	else { imax=-puissance +1 }
            	for(i=1;i<imax;i++){
            		s6="0"+s6;
            	}
            	s7=s6.substring(0,1)+"."+s6.substring(1,s6.length)
        	}
        	if (s7.substring(s7.length,1)=="."){
            	s7=s7.substring(0,s7.length-1)
        	}   
        	s=s7;
    	}
    } else if (x ==0 ) {
    	s="0"
        if (n>1) {
            s=s+".";
            for (j=2;j<=n;j++){
                s=s+"0"
            }
        }
    }
//===================================================================================================================//===================================================================================================================        

 
    if (x<0) {
    	s="-"+s;
    }
    

    return s
}



function getRandomValue(x,n,c0,c1) { 
// cherche une valeur comprise entre c0*x et c1*x.
// La fonction est construite de telle sorte que la mediane des valeurs (obtenues en appelant plusieurs fois cette fonction) soit egale a x
// la valeur doit aussi etre differente de x a n chiffres significatifs pres.
    y=x;

    alpha=Math.log((c1-c0)/(1-c0))/Math.log(2);
    while( significant_digits(x,n,2)==significant_digits(y,n,2)) {
        r=random();
        c=c0+(c1-c0)*Math.pow(r,alpha); // c0 < c < c1
        y=c*x; 
    }
    return significant_digits(y,n,2)
}


//cherche reponse inferieure a x



function mediane(array) {
	sorted_array=array.sort(function(a, b){return a - b})
    if (sorted_array.length/2-Math.trunc(sorted_array.length/2)==0){ // si nombre d'individus pair
		med=0.5*sorted_array[sorted_array.length/2-1]+0.5*sorted_array[sorted_array.length/2]
	} else {
    	med=sorted_array[Math.ceil(sorted_array.length/2)-1]
    }
	return med
}

function min(array) {
	sorted_array=array.sort(function(a, b){return a - b})
    min=sorted_array[0]/1
	return min
}

function max(array) {
	sorted_array=array.sort(function(a, b){return a - b})
    max=sorted_array[sorted_array.length-1]/1
	return max
}




function compte_valeurs_a_droite(x,xmax,n){ // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs
	nsup=0;
	x=significant_digits(x,n,2);
    xmax=significant_digits(xmax,n,2);
	for (i=Math.ceil(Math.log10(x));i<=Math.ceil(Math.log10(xmax));i++)
	{
		d=Math.pow(10,Math.ceil(Math.log10(x)))/Math.pow(10,(n-Math.floor(x/Math.pow(10,Math.ceil(Math.log10(x))))));
		nsup= nsup+(Math.min(xmax,Math.pow(10,i))-x)/d
		x=Math.pow(10,i);
	}
	return Math.round(nsup)	
}

function compte_valeurs_a_gauche(x,xmin,n){ // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs
	ninf=0;
	x=significant_digits(x,n,2);
    xmin=significant_digits(xmin,n,2);
	for (i=Math.ceil(Math.log10(xmin));i<=Math.ceil(Math.log10(x));i++)
	{
		d=Math.pow(10,Math.ceil(Math.log10(xmin)))/Math.pow(10,(n-Math.floor(xmin/Math.pow(10,Math.ceil(Math.log10(xmin))))));
		ninf= ninf+(Math.min(x,Math.pow(10,i))-xmin)/d
		xmin=Math.pow(10,i);
	}
	return Math.round(ninf)	
}



function getRandomArray(x,n,rang,Nb_reponses,c0,c1,sci) { 
//cherche reponse inferieure a x
    var reponse = new Array
    j=0
    compteur=0;
    compteur_max=100
    xmax=c1*x;
    xmin=c0*x;
    if (rang>1 & rang<Nb_reponses) {
        if ((x0-xmin)/(rang-1) > (xmax-x0)/(Nb_reponses-rang)){
    		//xmax=x0+(x0-xmin)*(Nb_reponses-rang)/(rang-1)
        	//c1=xmax/x
        	xmin=x0-(xmax-x0)*(rang+2)/(Nb_reponses-rang)
        	c0=xmin/x
            message="wech"
    	}else{
    		//xmin=x0-(xmax-x0)*(rang-1)/(Nb_reponses-rang)
        	//c0=xmin/x
        	xmax=x0+(x0-xmin)*(Nb_reponses-rang+1)/(rang)
        	c1=xmax/x
            message="gros"

    	}
    }

    if (compte_valeurs_a_droite(x,xmax,n)>Nb_reponses-rang && compte_valeurs_a_gauche(x,xmin,n)>rang-1) { //si le nombre possible de valeurs comprises entre x et xmax=c1*x est plus grand que le nombre de valeurs diponibles dans le tableau 
    	compteur=0;
        j=0;
        while (j<rang && compteur < compteur_max){
 			compteur=compteur+1;
            reponse_deja_proposee=1
            compteur2=0;
 		   	while (reponse_deja_proposee==1 && compteur2 < compteur_max) {  
            	compteur2=compteur2+1
  	    		reponse[j]=getRandomValue(x,n,c0,c1); // cherche une valeur entre c0*0.9*x et 0.99*x 
   	   			//reponse[r]=significant_digits(random()*x,n,0); // cherche une valeur entre c0*x et 0.99*x 
   				reponse_deja_proposee=0
        		for (i=0;i<j;i++){
     	   			if(significant_digits(reponse[j],n,2)==significant_digits(reponse[i],n,2)) {
     	       			reponse_deja_proposee=1;
     	   			}
    			}
        		if (reponse_deja_proposee==0  && significant_digits(reponse[j],n,0) < significant_digits(x,n,0)) {
            		j=j+1;
        		}
    		}
		}
    
//============================================================================================
   		reponse[rang-1]=significant_digits(x,n,2)
//============================================================================================    
    
    	//cherche reponse superieure a x
    	j=rang
    	compteur=0;
    	compteur_max=100
    	while (j<Nb_reponses && compteur < compteur_max){
 			reponse_deja_proposee=1
            compteur = compteur+1;
            compteur2=0;
 	   		while (reponse_deja_proposee==1 && compteur2 < compteur_max) {    
                compteur2=compteur2+1
				reponse[j]=getRandomValue(x,n,c0,c1); // cherche une valeur entre 1.001*x et c1*1.1*x 
  				reponse_deja_proposee=0
        		for (i=0;i<j;i++){
     	   			if(significant_digits(reponse[j],n,2)==significant_digits(reponse[i],n,2)) {
     	       			reponse_deja_proposee=1;
     	   			}
    			}
        		if (reponse_deja_proposee==0  && significant_digits(reponse[j],n,0) > significant_digits(x,n,0)) {
            		j=j+1;
        		}
    		}
		}
//============================================================================================    
    	sorted_array=reponse.sort(function(a, b){return a - b});

    } else {
        j=0;
      	while (j<Nb_reponses && compteur < compteur_max){
 			reponse_deja_proposee=1
            compteur=compteur+1
            compteur3=0;
 		   	while (reponse_deja_proposee==1 && compteur3 < compteur_max) {
                compteur3=compteur3+1
  	    		reponse[j]=getRandomValue(x,n,c0,c1);
                xmin_temp=c0*x
                xmax_temp=c1*x
                
   				reponse_deja_proposee=0
        		for (i=0;i<j;i++){
     	   			if(significant_digits(reponse[j],n,2)==significant_digits(reponse[i],n,2) || significant_digits(reponse[j],n,2)==significant_digits(x,n,2)) {
     	       			reponse_deja_proposee=1;
     	   			}
    			}
        		if (reponse_deja_proposee==0  && significant_digits(reponse[j],n,0)) {
            		j=j+1;
        		}
    		}
		} 
        sorted_array=reponse;
        sorted_array[rang-1]=significant_digits(x,n,0)
    }
    for (j=0;j<Nb_reponses;j++){
        sorted_array[j]=significant_digits(sorted_array[j],n,sci);
    }
    return sorted_array
}



