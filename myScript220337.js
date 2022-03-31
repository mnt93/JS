function random() {

var x = Math.sin(6+seed++) * 10000;

return x - Math.floor(x);

}



function significant_digits(x,n,sci)

{

if (x !=0 ) {

x=x*(1+1e-15);

//x1=Math.round(Math.round(Math.abs(x)/Math.pow(10,Math.ceil(Math.log10(Math.abs(x)))-(n+1)))/10);

x1=Math.round(Math.abs(x)/Math.pow(10,Math.ceil(Math.log10(Math.abs(x)))-(n))) // x1 est le premier chiffre du nombre x arrondi avec chiffre significatif

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







function getRandomValue(x,n,c0,c1,sci) {

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

return significant_digits(y,n,sci)

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

absx=Math.abs(x);

vag=valeurs_a_gauche(absx,rang,n);

vad=valeurs_a_droite(absx,rang,Nb_reponses,n);

reponse = new Array;

for (j=0;j<vag.length;j++){

reponse[j]=significant_digits(vag[j],n,sci);

}

reponse[rang-1]=significant_digits(absx,n,sci);

for (j=rang;j<Nb_reponses;j++){

reponse[j]=significant_digits(vad[j-rang],n,sci);

}

for (j=0;j<Nb_reponses;j++){

reponse[j]=significant_digits(Math.sign(x)*reponse[j],n,sci);

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

function rosee(x,Ta,Tb){

if(Ta>Tb) {

return -Math.pow((x-1)*Math.pow(Ta-Tb,1/2),2)+Ta

}

if(Ta<Tb) {

return -Math.pow(x*Math.pow(Tb-Ta,1/2),2)+Tb

}

}

function ebullition(x,Ta,Tb){

if(Ta>Tb) {

return Math.pow(x*Math.pow(Ta-Tb,1/2),2)+Tb

}

if(Ta<Tb) {

return Math.pow((x-1)*Math.pow(Tb-Ta,1/2),2)+Ta

}



}





function cherche_racine(fonction,y){

var min=0, max=1, step=(max-min)*0.000001, diff=0.0001;

var xx = min;

solution =0;

while(xx <= max && solution ==0) {

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

title: X_axis_title,

titleTextStyle: {

allowContainerBoundaryTextCutoff : true

}

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

maxZoomIn: 0.00000001,

},

width: Axis_width,

height: Axis_height,



legend : {position : 'top'},





chartArea:{backgroundColor: {strokeWidth:2, stroke:'black' }},





series : {

0: { tooltip : false}, // disable tooltip

1: { tooltip : false}, // disable tooltip

}









};



var chart = new google.visualization.LineChart(document.getElementById(chart_div));

chart.draw(data, options);

}





function google_chart_line(x,Y_axis_min,Y_axis_max,X_axis_title,Y_axis_title,curve_name1,curve_name2,Axis_width,Axis_height, chart_div){

google.charts.load('current', {packages: ['corechart', 'line']});

google.charts.setOnLoadCallback(drawCurveTypes);

}





function tcdf(X,df) {

with (Math) {

if (df<=0) {

alert("Degrees of freedom must be positive")

} else {

A=df/2;

S=A+.5;

Z=df/(df+X*X);

BT=exp(LogGamma(S)-LogGamma(.5)-LogGamma(A)+A*log(Z)+.5*log(1-Z));

if (Z<(A+1)/(S+2)) {

betacdf=BT*Betinc(Z,A,.5)

} else {

betacdf=1-BT*Betinc(1-Z,.5,A)

}

if (X<0) {

tcdf=betacdf/2

} else {

tcdf=1-betacdf/2

}

}

//tcdf=round(tcdf*100000)/100000;

}

return tcdf;

}





function t(sample1,sample2) {

n1=sample1.length;

n2=sample2.length;

m1=mean(sample1);

m2=mean(sample2);

s1=sd(sample1);

s2=sd(sample2);

sp=Math.pow(((n1-1)*s1*s1+(n2-1)*s2*s2)/(n1-1+n2-1),0.5);

t=(m1-m2)/(sp*Math.pow((1/n1+1/n2),0.5));

return t

}



function pvalue(sample1,sample2) {

X=Math.abs(t(sample1,sample2));

df=sample1.length-1+sample2.length-1;

return 2*(1-tcdf(X,df))

}



function getIntervalArray(x1,x2,n,rang,Nb_reponses,sci){

if (Math.sign(x1*x2)<0){

Interval1=getArray(x1,n,rang,Nb_reponses,sci)

Interval2=getArray(x2,n,rang,Nb_reponses,sci)

}else{

Interval1=getArray(x1,n,rang,Nb_reponses,sci)

Interval2=getArray(x2,n,Nb_reponses-rang+1,Nb_reponses,sci)

Interval2=Interval2.reverse();

}

IntervalArray = new Array;

for (j=0;j<Nb_reponses;j++){

IntervalArray[j]="["+Interval1[j]+";"+Interval2[j]+"]";

}

return IntervalArray

}



 function getRandomIntInclusive(min, max, myrng) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(myrng() * (max - min + 1)) + min;
    }






    function ExportToExcel(type, fn, dl) {
        var elt = document.getElementById("table1");
        var wb = XLSX.utils.table_to_book(elt, {
            sheet: "sheet1"
        });
        return dl ?
            XLSX.write(wb, {
                bookType: type,
                bookSST: true,
                type: 'base64'
            }) :
            XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
    }

   function Create_MLR_Data(rows, Intercept, coeff_X, mean_X, sigma_X, sigma_Y, Col_Names, Seed_Table) {
        var myrng = new Math.seedrandom(Seed_Table);
        var data = new Array()
        var K = coeff_X.length // nombre de variables explicatives
        var Precision = 3
        data[0] = Col_Names;
        for (var i = 1; i < rows + 1; i++) {
            data[i] = new Array()
            data[i][K] = Number(jStat.normal.inv(myrng(), Intercept, sigma_E).toPrecision(Precision));
            for (var j = 0; j < K; j++) {
                data[i][j] = Number(jStat.normal.inv(myrng(), mean_X[j], sigma_X[j]).toPrecision(Precision))
                data[i][K] += coeff_X[j] * data[i][j]
                data[i][j] = data[i][j].toPrecision(Precision)
            }
            data[i][K] = data[i][K].toPrecision(Precision)

        }
        var data_num = math.subset(data, math.index(math.range(1, rows + 1), math.range(0, Col_Names.length)))
        var Y = math.subset(data_num, math.index(math.range(0, rows), Col_Names.length - 1))
        var X = math.subset(data_num, math.index(math.range(0, rows), math.range(0, Col_Names.length - 1)))

        var MLR_Data = {
            'data': data,
            'Y': Y,
            'X': X
        };

        return MLR_Data
    }


    function MLR(Y, X) {
        // calcule une regression lineaire multiple avec terme constant par la méthode des moindres carrés.
        // Y=X*Beta1+Beta0 avec Beta=[Beta1,Beta0] 
        var n = X.length; // nombre d'individu
        var p = X[0].length; // nombre de variables explicatives
        X = math.subset(X, math.index(math.range(0, n), p), math.ones(n, 1))
        var beta = math.multiply(math.inv(math.multiply(math.transpose(X), X)), math.transpose(X), Y);
        var Ypred = math.multiply(X, beta);
        var Epred = math.subtract(Y, Ypred);
        var sigma_E_estimat = math.sqrt(math.multiply(math.transpose(Epred), Epred) / (n - p - 1));
        var sigma_Beta_estimat = math.diag(math.sqrt(math.multiply(math.diag(math.diag(math.inv(math.multiply(math.transpose(X), X)))), sigma_E_estimat * sigma_E_estimat)));
        var SST=math.variance(Y)*(n-1);
        var SSE=math.multiply(math.transpose(Epred), Epred);
        var R2=1-SSE/SST;
        var mlr_result = {
            'beta': beta,
            'Ypred': Ypred,
            'Epred': Epred,
            'SST': SST,
            'SSE': SSE,
            'R2': R2,
            'sigma_E_estimat': sigma_E_estimat,
            'sigma_Beta_estimat': sigma_Beta_estimat
        };
        return mlr_result
    }

    function CreateTable(Data,Table_position='',Table_id='table1',decimal_separator=',') {
        var rows = Data.length;
        var cols = Data[0].length;
        var table = "";
        for (var i = 0; i < rows; i++) {
            table += "<tr>"
            for (var j = 0; j < cols; j++) {
                table += "<td>" + Data[i][j].replace('.',decimal_separator) + "</td>"
            }
            table += "</tr>"
        }
        code_table="<table id="+Table_id+" border=1>" + table + "</table>";
        if (Table_position=='') {
             document.write(code_table);

        } else {
             document.getElementById(Table_position).insertAdjacentHTML("beforebegin",code_table )
        }
        
        return code_table

    }

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}