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

function quantile(s,q,k){
	s=s.sort(function(a, b){return a - b})
    N=s.length;
    p=k/q;
    j=Math.trunc((N-1)*p);
    g=(N-1)*p-j;

	return s[j]+g*(s[j+1]-s[j])
}

function sum(a){
    s=0;
    for (j=0;j<a.length;j++){
        s=s+a[j];
    }
	return s
}

function mean(a){
	m=sum(a)/a.length;
	return m
}

function variance(a){
	m=mean(a);
    v=0;
    n=a.length;
    for (j=0;j<n;j++){
        v=v+Math.pow(a[j]-m,2);
    }
    v=v/(n-1)
    return v
}

function sd(a){
	v=variance(a)
    s=Math.pow(v,0.5)
    return s
}

function valeurs_a_droite(x,rang,Nb_reponses,n){ // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs
	x=significant_digits(x,n,2);
    coeff=1;
    vad = new Array;
    for (r=rang+1;r<=Nb_reponses;r++){
    	d=Math.pow(10,Math.ceil(Math.log10(x)))/Math.pow(10,(n-Math.floor(x/Math.pow(10,Math.ceil(Math.log10(x))))));
        o=Math.ceil(Math.log10(x));
    	vad[r-rang-1]=significant_digits(x*1+coeff*d,n,2)
        coeff=coeff+1
        if ( vad[r-rang-1] == Math.pow(10,o)){
        	x=Math.pow(10,o);
            coeff=1;
        }
    }
	return vad	
}

function valeurs_a_gauche(x,rang,n){ 
	x=significant_digits(x,n,2);
    coeff=1;
    vag = new Array;
    d=Math.pow(10,Math.ceil(Math.log10(x)))/Math.pow(10,(n-Math.floor(x/Math.pow(10,Math.ceil(Math.log10(x))))));
    o=Math.ceil(Math.log10(x));

    for (r=rang-2;r>=0;r--){
    	vag[r]=significant_digits(x*1-coeff*d,n,2)
        coeff=coeff+1
        if ( vag[r] == Math.pow(10,o-1)){
        	x=vag[r];
            coeff=1;
            d=d/10;
            o=o-1;
        }
    }
	return vag	
}

function getArray(x,n,rang,Nb_reponses,sci){
	vag=valeurs_a_gauche(x,rang,n);
    vad=valeurs_a_droite(x,rang,Nb_reponses,n);
    reponse = new Array;
    for (j=0;j<vag.length;j++){
    	reponse[j]=significant_digits(vag[j],n,sci);
    }
    reponse[rang-1]=significant_digits(x,n,sci);
    for (j=rang;j<Nb_reponses;j++){
    	reponse[j]=significant_digits(vad[j-rang],n,sci);
    }    
	return reponse	
}

function factorial (n) {
  var f = [];
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
}
 

function C(n,k) {
  return factorial(n)/factorial(k)/factorial(n-k);
}

function hyper_pdf(np,n,Np,N) {
	return C(Np,np)*C(N-Np,n-np)/C(N,n)
}
function LogGamma(Z) {
	with (Math) {
		var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
		var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	}
	return LG
}

function Betinc(X,A,B) {
	var A0=0;
	var B0=1;
	var A1=1;
	var B1=1;
	var M9=0;
	var A2=0;
	var C9;
	while (Math.abs((A1-A2)/A1)>.00001) {
		A2=A1;
		C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
		A0=A1+C9*A0;
		B0=B1+C9*B0;
		M9=M9+1;
		C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
		A1=A0+C9*A1;
		B1=B0+C9*B1;
		A0=A0/B1;
		B0=B0/B1;
		A1=A1/B1;
		B1=1;
	}
	return A1/A
}

function bin_cdf(X,N,P) {
    with (Math) {
		if (N<=0) {
			alert("sample size must be positive")
		} else if ((P<0)||(P>1)) {
			alert("probability must be between 0 and 1")
		} else if (X<0) {
			bincdf=0
		} else if (X>=N) {
			bincdf=1
		} else {
			X=floor(X);
			Z=P;
			A=X+1;
			B=N-X;
			S=A+B;
			BT=exp(LogGamma(S)-LogGamma(B)-LogGamma(A)+A*log(Z)+B*log(1-Z));
			if (Z<(A+1)/(S+2)) {
				Betacdf=BT*Betinc(Z,A,B)
			} else {
				Betacdf=1-BT*Betinc(1-Z,B,A)
			}
			bincdf=1-Betacdf;
		}
		bincdf=round(bincdf*100000)/100000;
	}
        return bincdf 
}
function rosee(x){
   if(Ta>Tb) {
   		return -Math.pow((x-1)*Math.pow(Ta-Tb,1/2),2)+Ta
   }
   if(Ta<Tb) {
   		return -Math.pow(x*Math.pow(Tb-Ta,1/2),2)+Tb
   }
}
function ebullition(x){
   if(Ta>Tb) {
  		return Math.pow(x*Math.pow(Ta-Tb,1/2),2)+Tb
   }
   if(Ta<Tb) {
   		return Math.pow((x-1)*Math.pow(Tb-Ta,1/2),2)+Ta
   }

}


function cherche_racine(fonction,y){
	var min=0, max=1, step=0.00001, diff=0.01;
	var xx = min;
	sol=0;
	while(xx <= max && sol==0) {
    	d = fonction(xx)-y;
    	if(Math.abs(d)<=diff) {
        	solution=xx;
    	}
    	xx+=step;
	} 
    return solution
}

function drawCurveTypes() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'xa');
      data.addColumn('number', curve_name1);
      data.addColumn({type: 'string', role: 'tooltip'});
      data.addColumn('number', curve_name2);
      data.addColumn({type: 'string', role: 'tooltip'});

      data.addRows(x);

      var options = {
        hAxis: {
          title: X_axis_title
        },
        vAxis: {
          title: Y_axis_title,
          //format: "",
          maxValue: Y_axis_max,
          minValue: Y_axis_min,
          viewWindow : {min:Y_axis_min,max:Y_axis_max}
        },
        series: {
          1: {curveType: 'function'}
        }
        ,
        
        explorer: {
                    actions: ['dragToZoom', 'rightClickToReset'],
                    keepInBounds: false,
                    maxZoomIn: 0.00000001
                },  
        width: Axis_width,
        height: Axis_height,

      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
