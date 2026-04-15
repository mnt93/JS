
function random() {

    var x = Math.sin(6 + seed++) * 10000;

    return x - Math.floor(x);

}



function significant_digits(x, n, sci) {

    if (x != 0) {

        x = x * (1 + 1e-15);

        //x1=Math.round(Math.round(Math.abs(x)/Math.pow(10,Math.ceil(Math.log10(Math.abs(x)))-(n+1)))/10);

        x1 = Math.round(Math.abs(x) / Math.pow(10, Math.ceil(Math.log10(Math.abs(x))) - (n))) // x1 est le premier chiffre du nombre x arrondi avec chiffre significatif

        s1 = "" + x1;

        s1 = s1.substring(0, n)

        x0 = x / Math.pow(10, (Math.ceil(Math.log10(Math.abs(x))) - (n + 1))) / 10

        puissance = (Math.floor(Math.log10(Math.abs(x))))

        s0 = "" + Math.pow(10, (Math.floor(Math.log10(Math.abs(x)))));

        s4 = s1.substring(0, 1) + "." + s1.substring(1, n);

        if (x1 == Math.pow(10, n) && Math.abs(Math.abs(Math.pow(10, n) / x0) - 1) > 1e-15) {

            if ((puissance + 1) != 0) {

                if (sci == 0) {

                    s5 = ""

                }

                if (sci == 1) {

                    s5 = " 10" + "<sup>" + (puissance + 1) + "</sup>"

                }

                if (sci == 2) {

                    s5 = "e" + (puissance + 1)

                }

            } else {

                s5 = ""

            }



        } else {

            if (puissance != 0) {

                if (sci == 0) {

                    s5 = ""

                }

                if (sci == 1) {

                    s5 = " 10" + "<sup>" + (puissance) + "</sup>"

                }

                if (sci == 2) {

                    s5 = "e" + (puissance)

                }

            } else {

                s5 = ""

            }

        }

        //===================================================================================================================
        //===================================================================================================================



        if (s4.substring(s4.length, 1) == ".") {

            s4 = s4.substring(0, s4.length - 1)

        }

        s = s4 + s5

        s7 = "wech"

        if (sci == 0) {

            if (puissance >= 0) {

                s6 = s4.substring(0, 1) + s4.substring(2, s4.length);

                if (x1 == Math.pow(10, n) && Math.abs(Math.abs(Math.pow(10, n) / x0) - 1) > 1e-15) {
                    imax = puissance - n + 3
                } else {
                    imax = puissance - n + 2
                }

                for (i = 1; i < imax; i++) {

                    s6 = s6 + "0";

                }



                if (s6.length > puissance + 1 && imax != puissance - n + 3) {

                    s7 = s6.substring(0, puissance + 1) + "." + s6.substring(puissance + 1, s6.length)

                } else if (imax != puissance - n + 3) {

                    s7 = s6.substring(0, puissance + 1)

                } else {

                    s7 = s6.substring(0, puissance + 2)

                }

            } else {

                s6 = s4.substring(0, 1) + s4.substring(2, s4.length);

                if (x1 == Math.pow(10, n) && Math.abs(Math.abs(Math.pow(10, n) / x0) - 1) > 1e-15) {
                    imax = -puissance
                } else {
                    imax = -puissance + 1
                }

                for (i = 1; i < imax; i++) {

                    s6 = "0" + s6;

                }

                s7 = s6.substring(0, 1) + "." + s6.substring(1, s6.length)

            }

            if (s7.substring(s7.length, 1) == ".") {

                s7 = s7.substring(0, s7.length - 1)

            }

            s = s7;

        }

    } else if (x == 0) {

        s = "0"

        if (n > 1) {

            s = s + ".";

            for (j = 2; j <= n; j++) {

                s = s + "0"

            }

        }

    }

    //===================================================================================================================//===================================================================================================================





    if (x < 0) {

        s = "-" + s;

    }





    return s

}







function getRandomValue(x, n, c0, c1, sci) {

    // cherche une valeur comprise entre c0*x et c1*x.

    // La fonction est construite de telle sorte que la mediane des valeurs (obtenues en appelant plusieurs fois cette fonction) soit egale a x

    // la valeur doit aussi etre differente de x a n chiffres significatifs pres.

    y = x;



    alpha = Math.log((c1 - c0) / (1 - c0)) / Math.log(2);

    while (significant_digits(x, n, 2) == significant_digits(y, n, 2)) {

        r = random();

        c = c0 + (c1 - c0) * Math.pow(r, alpha); // c0 < c < c1

        y = c * x;

    }

    return significant_digits(y, n, sci)

}





//cherche reponse inferieure a x







function mediane(array) {

    sorted_array = array.sort(function (a, b) {
        return a - b
    })

    if (sorted_array.length / 2 - Math.trunc(sorted_array.length / 2) == 0) { // si nombre d'individus pair

        med = 0.5 * sorted_array[sorted_array.length / 2 - 1] + 0.5 * sorted_array[sorted_array.length / 2]

    } else {

        med = sorted_array[Math.ceil(sorted_array.length / 2) - 1]

    }

    return med

}



function min(array) {

    sorted_array = array.sort(function (a, b) {
        return a - b
    })

    min = sorted_array[0] / 1

    return min

}



function max(array) {

    sorted_array = array.sort(function (a, b) {
        return a - b
    })

    max = sorted_array[sorted_array.length - 1] / 1

    return max

}









function compte_valeurs_a_droite(x, xmax, n) { // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs

    nsup = 0;

    x = significant_digits(x, n, 2);

    xmax = significant_digits(xmax, n, 2);

    for (i = Math.ceil(Math.log10(x)); i <= Math.ceil(Math.log10(xmax)); i++) {

        d = Math.pow(10, Math.ceil(Math.log10(x))) / Math.pow(10, (n - Math.floor(x / Math.pow(10, Math.ceil(Math.log10(x))))));

        nsup = nsup + (Math.min(xmax, Math.pow(10, i)) - x) / d

        x = Math.pow(10, i);

    }

    return Math.round(nsup)

}



function compte_valeurs_a_gauche(x, xmin, n) { // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs

    ninf = 0;

    x = significant_digits(x, n, 2);

    xmin = significant_digits(xmin, n, 2);

    for (i = Math.ceil(Math.log10(xmin)); i <= Math.ceil(Math.log10(x)); i++) {

        d = Math.pow(10, Math.ceil(Math.log10(xmin))) / Math.pow(10, (n - Math.floor(xmin / Math.pow(10, Math.ceil(Math.log10(xmin))))));

        ninf = ninf + (Math.min(x, Math.pow(10, i)) - xmin) / d

        xmin = Math.pow(10, i);

    }

    return Math.round(ninf)

}



function quantile(s, q, k) {

    s = s.sort(function (a, b) {
        return a - b
    })

    N = s.length;

    p = k / q;

    j = Math.trunc((N - 1) * p);

    g = (N - 1) * p - j;



    return s[j] + g * (s[j + 1] - s[j])

}



function sum(a) {

    s = 0;

    for (j = 0; j < a.length; j++) {

        s = s + a[j];

    }

    return s

}



function mean(a) {

    m = sum(a) / a.length;

    return m

}



function variance(a) {

    m = mean(a);

    v = 0;

    n = a.length;

    for (j = 0; j < n; j++) {

        v = v + Math.pow(a[j] - m, 2);

    }

    v = v / (n - 1)

    return v

}



function sd(a) {

    v = variance(a)

    s = Math.pow(v, 0.5)

    return s

}



function valeurs_a_droite(x, rang, Nb_reponses, n) { // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs

    x = significant_digits(x, n, 2);

    coeff = 1;

    vad = new Array;

    for (r = rang + 1; r <= Nb_reponses; r++) {

        d = Math.pow(10, Math.ceil(Math.log10(x))) / Math.pow(10, (n - Math.floor(x / Math.pow(10, Math.ceil(Math.log10(x))))));

        o = Math.ceil(Math.log10(x));

        vad[r - rang - 1] = significant_digits(x * 1 + coeff * d, n, 2)

        coeff = coeff + 1

        if (vad[r - rang - 1] == Math.pow(10, o)) {

            x = Math.pow(10, o);

            coeff = 1;

        }

    }

    return vad

}



function valeurs_a_gauche(x, rang, n) {

    x = significant_digits(x, n, 2);

    coeff = 1;

    vag = new Array;

    d = Math.pow(10, Math.ceil(Math.log10(x))) / Math.pow(10, (n - Math.floor(x / Math.pow(10, Math.ceil(Math.log10(x))))));

    o = Math.ceil(Math.log10(x));



    for (r = rang - 2; r >= 0; r--) {

        vag[r] = significant_digits(x * 1 - coeff * d, n, 2)

        coeff = coeff + 1

        if (vag[r] == Math.pow(10, o - 1)) {

            x = vag[r];

            coeff = 1;

            d = d / 10;

            o = o - 1;

        }

    }

    return vag

}











































function factorial(n) {

    var f = [];

    if (n == 0 || n == 1)

        return 1;

    if (f[n] > 0)

        return f[n];

    return f[n] = factorial(n - 1) * n;

}





function C(n, k) {

    return factorial(n) / factorial(k) / factorial(n - k);

}



function hyper_pdf(np, n, Np, N) {

    return C(Np, np) * C(N - Np, n - np) / C(N, n)

}

function LogGamma(Z) {

    with (Math) {

        var S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + .00120858003 / (Z + 4) - .00000536382 / (Z + 5);

        var LG = (Z - .5) * log(Z + 4.5) - (Z + 4.5) + log(S * 2.50662827465);

    }

    return LG

}



function Betinc(X, A, B) {

    var A0 = 0;

    var B0 = 1;

    var A1 = 1;

    var B1 = 1;

    var M9 = 0;

    var A2 = 0;

    var C9;

    while (Math.abs((A1 - A2) / A1) > .00001) {

        A2 = A1;

        C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);

        A0 = A1 + C9 * A0;

        B0 = B1 + C9 * B0;

        M9 = M9 + 1;

        C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);

        A1 = A0 + C9 * A1;

        B1 = B0 + C9 * B1;

        A0 = A0 / B1;

        B0 = B0 / B1;

        A1 = A1 / B1;

        B1 = 1;

    }

    return A1 / A

}



function bin_cdf(X, N, P) {

    with (Math) {

        if (N <= 0) {

            alert("sample size must be positive")

        } else if ((P < 0) || (P > 1)) {

            alert("probability must be between 0 and 1")

        } else if (X < 0) {

            bincdf = 0

        } else if (X >= N) {

            bincdf = 1

        } else {

            X = floor(X);

            Z = P;

            A = X + 1;

            B = N - X;

            S = A + B;

            BT = exp(LogGamma(S) - LogGamma(B) - LogGamma(A) + A * log(Z) + B * log(1 - Z));

            if (Z < (A + 1) / (S + 2)) {

                Betacdf = BT * Betinc(Z, A, B)

            } else {

                Betacdf = 1 - BT * Betinc(1 - Z, B, A)

            }

            bincdf = 1 - Betacdf;

        }

        bincdf = round(bincdf * 100000000000000000000) / 100000000000000000000;

    }

    return bincdf

}

/*==============================================================================================================================*/

function rosee(x, Ta, Tb) {

    if (Ta > Tb) {

        return -Math.pow((x - 1) * Math.pow(Ta - Tb, 1 / 2), 2) + Ta

    }

    if (Ta < Tb) {

        return -Math.pow(x * Math.pow(Tb - Ta, 1 / 2), 2) + Tb

    }

}
/*==============================================================================================================================*/

function ebullition(x, Ta, Tb) {

    if (Ta > Tb) {

        return Math.pow(x * Math.pow(Ta - Tb, 1 / 2), 2) + Tb

    }

    if (Ta < Tb) {

        return Math.pow((x - 1) * Math.pow(Tb - Ta, 1 / 2), 2) + Ta

    }



}



/*==============================================================================================================================*/


function cherche_racine(fonction, y) {

    var min = 0,
        max = 1,
        step = (max - min) * 0.000001,
        diff = 0.0001;

    var xx = min;

    solution = 0;

    while (xx <= max && solution == 0) {

        d = fonction(xx) - y;

        if (Math.abs(d) <= diff) {

            solution = xx;

        }

        xx += step;

    }

    return solution

}


/*==============================================================================================================================*/

function drawCurveTypes() {

    var data = new google.visualization.DataTable();

    data.addColumn('number', 'xa');

    data.addColumn('number', curve_name1);

    data.addColumn({
        type: 'string',
        role: 'tooltip'
    });

    data.addColumn('number', curve_name2);

    data.addColumn({
        type: 'string',
        role: 'tooltip'
    });



    data.addRows(x);



    var options = {

        hAxis: {

            title: X_axis_title,

            titleTextStyle: {

                allowContainerBoundaryTextCutoff: true

            }

        },

        vAxis: {

            title: Y_axis_title,

            //format: "",

            maxValue: Y_axis_max,

            minValue: Y_axis_min,

            viewWindow: {
                min: Y_axis_min,
                max: Y_axis_max
            }

        },

        series: {

            1: {
                curveType: 'function'
            }

        }

        ,



        explorer: {

            actions: ['dragToZoom', 'rightClickToReset'],

            keepInBounds: false,

            maxZoomIn: 0.00000001,

        },

        width: Axis_width,

        height: Axis_height,



        legend: {
            position: 'top'
        },





        chartArea: {
            backgroundColor: {
                strokeWidth: 2,
                stroke: 'black'
            }
        },





        series: {

            0: {
                tooltip: false
            }, // disable tooltip

            1: {
                tooltip: false
            }, // disable tooltip

        }









    };



    var chart = new google.visualization.LineChart(document.getElementById(chart_div));

    chart.draw(data, options);

}



/*==============================================================================================================================*/


function google_chart_line(x, Y_axis_min, Y_axis_max, X_axis_title, Y_axis_title, curve_name1, curve_name2, Axis_width, Axis_height, chart_div) {

    google.charts.load('current', {
        packages: ['corechart', 'line']
    });

    google.charts.setOnLoadCallback(drawCurveTypes);

}


/*==============================================================================================================================*/



function tcdf(X, df) {

    with (Math) {

        if (df <= 0) {

            alert("Degrees of freedom must be positive")

        } else {

            A = df / 2;

            S = A + .5;

            Z = df / (df + X * X);

            BT = exp(LogGamma(S) - LogGamma(.5) - LogGamma(A) + A * log(Z) + .5 * log(1 - Z));

            if (Z < (A + 1) / (S + 2)) {

                betacdf = BT * Betinc(Z, A, .5)

            } else {

                betacdf = 1 - BT * Betinc(1 - Z, .5, A)

            }

            if (X < 0) {

                tcdf = betacdf / 2

            } else {

                tcdf = 1 - betacdf / 2

            }

        }

        //tcdf=round(tcdf*100000)/100000;

    }

    return tcdf;

}



/*==============================================================================================================================*/


function t(sample1, sample2) {

    n1 = sample1.length;

    n2 = sample2.length;

    m1 = mean(sample1);

    m2 = mean(sample2);

    s1 = sd(sample1);

    s2 = sd(sample2);

    sp = Math.pow(((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / (n1 - 1 + n2 - 1), 0.5);

    t = (m1 - m2) / (sp * Math.pow((1 / n1 + 1 / n2), 0.5));

    return t

}

/*==============================================================================================================================*/


function pvalue(sample1, sample2) {

    X = Math.abs(t(sample1, sample2));

    df = sample1.length - 1 + sample2.length - 1;

    return 2 * (1 - tcdf(X, df))

}

/*==============================================================================================================================*/

function getIntervalArray(x1, x2, n, rang, Nb_reponses, sci, Num_question, myrng) {
    if (Math.sign(x1 * x2) < 0) {

        Interval1 = getArray(x1, n, rang, Nb_reponses, sci, Num_question, myrng)

        Interval2 = getArray(x2, n, rang, Nb_reponses, sci, Num_question, myrng)

    } else {

        Interval1 = getArray(x1, n, rang, Nb_reponses, sci, Num_question, myrng)

        Interval2 = getArray(x2, n, Nb_reponses - rang + 1, Nb_reponses, sci, Num_question, myrng)

        Interval2 = Interval2.reverse();

    }

    IntervalArray = new Array;

    for (j = 0; j < Nb_reponses; j++) {

        IntervalArray[j] = "[" + Interval1[j] + ";" + Interval2[j] + "]";

    }

    for (i = 1; i <= Nb_reponses; i++) {
        document.getElementById("R" + Num_question + i).innerHTML = IntervalArray[i - 1]
    }
    return IntervalArray

}

/*==============================================================================================================================*/


function getRandomIntInclusive(min, max, myrng) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(myrng() * (max - min + 1)) + min;
}




/*==============================================================================================================================*/


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
        XLSX.writeFile(wb, fn || ('Donnees_Exercice_Moodle.' + (type || 'xlsx')));
}

/*==============================================================================================================================*/

function Create_MLR_Data(rows, Intercept, coeff_X, mean_X, sigma_X, sigma_E, Col_Names, myrng) {
    //var myrng = new Math.seedrandom(Seed_Table);
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

/*==============================================================================================================================*/

function MLR(Y, X) {
    // calcule une regression lineaire multiple avec terme constant par la méthode des moindres carrés.
    // Y=X*Beta1+Beta0 avec Beta=[Beta1,Beta0] 
    var n = X.length; // nombre d'individu
    var p = X[0].length; // nombre de variables explicatives
    var X = math.subset(math.ones(n, p + 1), math.index(math.range(0, n), math.range(1, p + 1)), X).map(Number).toArray()
    var beta = math.multiply(math.inv(math.multiply(math.transpose(X), X)), math.transpose(X), Y);
    var Ypred = math.multiply(X, beta);
    var Epred = math.subtract(Y, Ypred);
    var sigma_E_estimat = math.sqrt(math.multiply(math.transpose(Epred), Epred) / (n - p - 1));
    var sigma_Beta_estimat = math.diag(math.sqrt(math.multiply(math.diag(math.diag(math.inv(math.multiply(math.transpose(X), X)))), sigma_E_estimat * sigma_E_estimat)));
    var SST = math.variance(Y) * (n - 1);
    var SSE = math.multiply(math.transpose(Epred), Epred);
    var R2 = 1 - SSE / SST;

    var mlr_result = {
        'beta': beta,
        'Ypred': Ypred,
        'Epred': Epred,
        'SST': SST,
        'SSE': SSE,
        'R2': R2,
        'sigma_E_estimat': sigma_E_estimat,
        'sigma_Beta_estimat': sigma_Beta_estimat,
        'X': X
    };
    return mlr_result
}


/*==============================================================================================================================*/


function getRandomArbitrary(min, max, myrng) {
    return myrng() * (max - min) + min;
}

/*==============================================================================================================================*/

function Create_Student_Test_Data(rows, mean_X, sigma_X, Col_Names, Seed_Table) {
    var myrng = new Math.seedrandom(Seed_Table);
    var data = new Array()
    var K = mean_X.length // nombre de variables
    var Precision = 3
    data[0] = Col_Names;
    for (var i = 1; i < rows + 1; i++) {
        data[i] = new Array()
        for (var j = 0; j < K; j++) {
            data[i][j] = Number(jStat.normal.inv(myrng(), mean_X[j], sigma_X[j]).toPrecision(Precision))
            data[i][j] = data[i][j].toPrecision(Precision)
        }
    }
    var X = math.subset(data, math.index(math.range(1, rows + 1), math.range(0, K)))


    var Student_Test_Data = {
        'data': data,
        'X': X
    };

    return Student_Test_Data

}

/*==============================================================================================================================*/

function Create_Chi2_Test_Data(Theoretical_contingency_table, Row_Names, Col_Names, Seed_Table) {
    var myrng = new Math.seedrandom(Seed_Table);
    var data = new Array()
    var P = Theoretical_contingency_table
    var C = P.length; //nombre de classes
    var G = P[0].length; //nombre de groupes
    var Precision = 3
    p = math.cumsum(math.dotDivide(P, math.multiply(math.ones(C, G), P))).toArray();
    data = math.zeros(C + 1, G + 1).toArray();
    X = math.zeros(C, G).toArray();

    for (g = 0; g < G; g++) {
        Ng = math.sum(math.transpose(P)[g])
        for (i = 0; i < Ng; i++) {
            r = myrng();
            if (r < p[0][g]) {
                X[0][g] = X[0][g] + 1;
            }
            for (c = 1; c < C; c++) {
                if (r < p[c][g] && r > p[c - 1][g]) {
                    X[c][g] = X[c][g] + 1;
                }
            }
        }
    }


    data = math.subset(data, math.index(0, math.range(1, G + 1)), Col_Names)
    data = math.subset(data, math.index(math.range(1, C + 1), 0), Row_Names)
    data = math.subset(data, math.index(math.range(1, C + 1), math.range(1, G + 1)), X)
    data = math.subset(data, math.index(0, 0), "")

    var Chi2_Test_Data = {
        'data': data,
        'X': X
    };

    return Chi2_Test_Data
}


/*==============================================================================================================================*/


function Chi2_Test(X) {
    var N = X.length
    var K = X[0].length
    var row_marginal_sum = math.cumsum(math.transpose(X))[K - 1];
    var col_marginal_sum = math.cumsum(X)[N - 1];
    var row_marginal_sum_matrix = math.transpose(math.cumsum(math.subset(math.zeros(K, N), math.index(0, math.range(0, N)), row_marginal_sum)))
    var col_marginal_sum_matrix = math.cumsum(math.subset(math.zeros(N, K), math.index(0, math.range(0, K)), col_marginal_sum))
    var Total_sum = math.sum(row_marginal_sum);
    var E = math.divide(math.dotMultiply(row_marginal_sum_matrix, col_marginal_sum_matrix), Total_sum)
    var Chi2 = math.sum(math.dotDivide(math.dotMultiply(math.subtract(X, E), math.subtract(X, E)), E))
    var p_value = 1 - jStat.chisquare.cdf(Chi2, (K - 1) * (N - 1))
    var Chi2_Test_Result = {
        "col_marginal_sum": col_marginal_sum,
        "row_marginal_sum": row_marginal_sum,
        "Chi2": Chi2,
        "p_value": p_value,
        "E": E
    }

    return Chi2_Test_Result

}

/*==============================================================================================================================*/

function CreateTable(Data, Table_position = '', Table_id = 'table1', decimal_separator = ',') {
    var rows = Data.length;
    var cols = Data[0].length;
    var table = "";
    for (var i = 0; i < rows; i++) {
        table += "<tr>"
        for (var j = 0; j < cols; j++) {
            if (String(Data[i][j]).indexOf(".")) {
                table += "<td>" + String(Data[i][j]).replace('.', decimal_separator) + "</td>"
            } else {
                table += "<td>" + Data[i][j] + "</td>"
            }
        }
        table += "</tr>"
    }
    code_table = "<table id=" + Table_id + " border=1>" + table + "</table>";
    if (Table_position == '') {
        document.write(code_table);

    } else {
        document.getElementById(Table_position).insertAdjacentHTML("beforebegin", code_table)
    }

    return code_table

}

/*==============================================================================================================================*/

function plot_line(array, emplacement_courbe = "emplacement_courbe", line_title = "", hAxes_title = array[0][0], vAxes_title = array[0][1], chartArea_width = 250, chartArea_height = 250,) {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable(array);

        var options = {
            title: line_title,
            titleTextStyle: {
                fontSize: 20,
                bold: true,
            },
            curveType: 'none',
            legend: 'none',
            vAxes: {
                0: {
                    viewWindow: {
                        min: 0
                    },
                    title: vAxes_title,
                    titleTextStyle: {
                        fontSize: 20
                    }
                }
            },
            hAxes: {
                0: {
                    title: hAxes_title,
                    titleTextStyle: {
                        fontSize: 20
                    }
                }
            },

            lineWidth: 5,
            colors: ['red', '#004411'],
            chartArea: {
                width: chartArea_width,
                height: chartArea_height,
                bottom: 100,
                left: 100,
                backgroundColor: {
                    stroke: 'black',
                    strokeWidth: 2
                }
            },


        };

        var chart = new google.visualization.LineChart(document.getElementById(emplacement_courbe));

        chart.draw(data, options);
    }
}


/*==============================================================================================================================*/

/* data_from_function — remplacée par la version math.js plus bas */

/*==============================================================================================================================*/

function display_polynom_LaTex(expr, tag_id) {
    document.getElementById(tag_id).appendChild(MathJax.tex2svg(math.parse(expr).toTex(), {
        display: false
    }));
}

/*==============================================================================================================================*/

function display_polynom(expr, tag_id, var_symb = 'x') {
    expr = expr.replaceAll('x', var_symb);
    var coeff = nerdamer.coeffs(expr, var_symb).toString().replace('[', '').replace(']', '').split(',')
    var pmin = coeff.findIndex(val => val[0] > 0);
    var pmax = coeff.length - 1;
    for (var p = pmax; p >= pmin; p--) {
        document.getElementById(tag_id).insertAdjacentHTML("beforebegin", '<a id="a' + p + '"></a>')
    }
    for (var p = pmin; p <= pmax; p++) {
        abs_coeff = (nerdamer(coeff[p]).denominator() == 1 ? String(nerdamer(math.abs(eval(coeff[p])))) :
            '(' + String(nerdamer(math.abs(eval(coeff[p])))) + ')');
        abs_coeff = (Number(abs_coeff) == 1 ? '' : abs_coeff);
        sign_coeff = (eval(coeff[p]) < 0 ? ' - ' : (p == pmax ? '' : ' + '))
        document.getElementById("a" + p).innerHTML = sign_coeff + abs_coeff +
            (p - pmin > 0 ? ' <i>' + var_symb + ' <sup>' + (p - pmin > 1 ? p - pmin : '') + '</sup></i>' : '')
    }
}




/*==============================================================================================================================*/


function getArray(x, n, rang, Nb_reponses, sci, Num_question, myrng) {

    absx = Math.abs(x);
    var reponse = new Array;

    if (parseInt(x) == x && x > 0) { //&& x<=10

        shift = Math.floor(myrng() * 10);
        shift = Math.min(...[shift - 1, x - 1])
        if (x <= 10) { shift = x - 1 }

        var reponse = Array.from({ length: Nb_reponses }, (_, i) => i + x - shift);
        reponse.splice(shift, 1);

        if (x != rang) {

            reponse = reponse.sort((a, b) => 0.5 - myrng()); // permutation aleatoire des elements du tableau
        }
        reponse.splice(rang - 1, 0, x);

        document.getElementsByTagName("emplacement_nombre_chiffres_significatifs_ext")[(Num_question - 1)].setAttribute("id", "emplacement_nombre_chiffres_significatifs_ext" + Num_question)
        document.getElementById("emplacement_nombre_chiffres_significatifs_ext" + Num_question).innerHTML = ''

    } else {
        vag = valeurs_a_gauche(absx, rang, n);
        vad = valeurs_a_droite(absx, rang, Nb_reponses, n);

        for (j = 0; j < vag.length; j++) {
            reponse[j] = significant_digits(vag[j], n, sci);
        }

        reponse[rang - 1] = significant_digits(absx, n, sci);

        for (j = rang; j < Nb_reponses; j++) {
            reponse[j] = significant_digits(vad[j - rang], n, sci);
        }

        for (j = 0; j < Nb_reponses; j++) {
            reponse[j] = significant_digits(Math.sign(x) * reponse[j], n, sci);
        }
    }

    for (i = 1; i <= Nb_reponses; i++) {
        document.getElementById("R" + Num_question + i).innerHTML = reponse[i - 1]
    }

    return reponse

}



/*==============================================================================================================================*/


function getExprArray(solution_expr, par_var, rang, Nb_reponses) {

    var par_array = new Array
    for (var i = 0; i < Nb_reponses; i++) {
        par_array[i] = ''
        for (var j = 0; j < par_var.symb.length; j++) {
            par_array[i] = par_array[i] + (par_var.val[j] + (math.pow(-1, j) * (i - rang + 1)))
            if (j < par_var.symb.length - 1) {
                par_array[i] = par_array[i] + ','
            }
        }
    }

    nerdamer.setFunction('f', par_var.symb, solution_expr);
    var reponse = new Array;

    const d = new Date();

    if (d.getTime() < Date.parse("2023-01-29")) {
        for (j = 0; j < Nb_reponses; j++) {
            solution_exprf = nerdamer('f(' + par_array[j] + ')').toString();
            solution_exprf_im = nerdamer('imagpart(' + solution_exprf + ')').toString();
            solution_exprf_re = nerdamer('realpart(' + solution_exprf + ')').toString();
            if (isNaN(Number(nerdamer(solution_exprf_im).evaluate())) || Number(solution_exprf_im) == 0 || Number(solution_exprf_re) == 0) {
                solution_exprf_tex = nerdamer(solution_exprf).toTeX()
                solution_exprf_re_tex = nerdamer(solution_exprf_re).toTeX()
                if (Number(solution_exprf_re) == 0) {
                    reponse[j] = '\\(\\ \\ \\ \\ ' + solution_exprf_tex + ' \\)'
                } else {
                    reponse[j] = '\\(\\ \\ \\ \\ ' + solution_exprf_re_tex + ' \\)'
                }
            } else {
                if (Number(nerdamer(solution_exprf_im).evaluate()) < 0) {
                    solution_exprf_im = nerdamer('realpart(-(' + solution_exprf_im + '))').toString()
                    solution_exprf_im_tex = nerdamer(solution_exprf_im).toTeX()
                    solution_exprf_re_tex = nerdamer(solution_exprf_re).toTeX()
                    reponse[j] = '\\(\\ \\ \\ \\ ' + solution_exprf_re_tex + ' \\)' + '\\(  - \\)' + (nerdamer(solution_exprf_im).toString().includes("+") ? ' \\((' + solution_exprf_im_tex + ') i \\) ' : ' \\(' + solution_exprf_im_tex + ' i \\) ')
                } else {
                    solution_exprf_re_tex = nerdamer(solution_exprf_re).toTeX()
                    solution_exprf_im_tex = nerdamer(solution_exprf_im).toTeX()
                    reponse[j] = '\\(\\ \\ \\ \\ ' + solution_exprf_re_tex + ' \\)' + '\\(  + \\)' + (nerdamer(solution_exprf_im).toString().includes("+") ? ' \\((' + solution_exprf_im_tex + ') i \\) ' : ' \\(' + solution_exprf_im_tex + ' i \\) ')
                }
            }
            document.getElementById("R" + Num_question + (j + 1)).style.fontSize = "130%"

        }
        return reponse
    }

}

/*==============================================================================================================================*/


function transform_expression(expr, displayed_expr, par, par_var) {

    var par_var = par_var
    par_var.val = new Array
    for (i = 0; i < par.symb.length; i++) {
        if (!par.hasOwnProperty('extrema')) {
            eval(par.symb[i] + '=' + getRandomIntInclusive(1, 10, myrng)) // attribuer une valeur a chaque parametre
            //alert("par.extrema pas defini "+par.symb[i]+"="+eval("1*"+par.symb[i]))
        } else {
            if (!Array.isArray(par.extrema[0])) {
                eval(par.symb[i] + '=' + getRandomIntInclusive(par.extrema[0], par.extrema[1], myrng))
                //alert("par.extrema n'est pas une matrice "+par.symb[i]+"="+eval("1*"+par.symb[i]))
            } else {
                eval(par.symb[i] + '=' + getRandomIntInclusive(par.extrema[i][0], par.extrema[i][1], myrng))
                //alert("par.extrema est une matrice")
            }
        }
        if (!(par_var.symb.includes(par.symb[i]))) {
            expr = expr.replaceAll(par.symb[i], String(eval(par.symb[i]))) // substituer les symbols des paramètres fixes dans expr par des valeurs.
            //alert("parametre fixe "+par.symb[i]+"="+eval("1*"+par.symb[i]))

        } else {
            //alert("parametre variable "+par.symb[i]+"="+eval("1*"+par.symb[i]))
            k = par_var.symb.indexOf(par.symb[i])
            par_var.val[k] = eval("1*" + par_var.symb[k]) // stocke les valeurs des parametres variables
        }
        displayed_expr = displayed_expr.replaceAll(par.symb[i], String(eval(par.symb[i]))) // substituer tous les symbols des paramètres dans displayed_expr par des valeurs.

    }
    transformed = {
        "displayed_expr": displayed_expr,
        "expr": expr,
        "par_var": par_var
    }

    return transformed
}

/*==============================================================================================================================*/

function Create_Rand_Data_Table(myrng, rows = 2, cols = 2, min = 0, max = 1, precision = 3) {
    var data = new Array()
    for (var i = 0; i < rows; i++) {
        data[i] = new Array()
        for (var j = 0; j < cols; j++) {
            data[i][j] = min + myrng() * (max - min);
            data[i][j] = data[i][j].toPrecision(precision)
        }
    }

    return data
}

/*==============================================================================================================================*/

function plot_hist(array, div_id, hist_title = "") {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(array);

        var options = {
            legend: {
                position: 'none'
            },
            colors: ['#e7711c'],
            title: hist_title,
            titleTextStyle: {
                fontSize: 20,
                bold: true,
            }
        };

        var chart = new google.visualization.Histogram(document.getElementById(div_id));
        chart.draw(data, options);
    }
}

/*==============================================================================================================================*/
function convert_2d_table_to_google_hist_data(data) {
    var individal_index = 0;
    var data_hist = new Array()
    data_hist[0] = ['indviduals', 'value']
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[0].length; j++) {
            individal_index++
            data_hist[individal_index] = ["ind" + individal_index.toString(), data[i][j]]
        }
    }
    return data_hist
}


/*==============================================================================================================================*/


function get_frequencies(data, min_value, max_value, range) {

    let numClasses = math.ceil((max_value - min_value) / range);

    // Compteur de fréquence pour chaque classe
    let frequencies = new Array(numClasses).fill(0);


    // Parcourez chaque élément de données et comptez les fréquences de classe
    data.forEach((d) => {
        let classIndex = Math.floor((d - min_value) / range);
        frequencies[classIndex]++;
    });
    var cumfrequencies = new Array()
    var bins_limits = new Array()
    bins_limits[0] = min_value;
    cumfrequencies[0] = 0;
    for (var i = 0; i < frequencies.length; i++) {
        cumfrequencies[i + 1] = frequencies[i] / data.flat().length + cumfrequencies[i];
        bins_limits[i + 1] = min_value + (i + 1) * range;
    }

    return res = {
        frequencies,
        cumfrequencies,
        bins_limits
    };

}
/*==============================================================================================================================*/


function ExportToTxt() {

    // obtenir la table par son ID
    var table = document.getElementById("table1");

    // obtenir les données de la table
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = [];
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            row.push(table.rows[i].cells[j].innerText);
        }
        data.push(row);
    }

    // créer le contenu du fichier texte avec des tabulations comme séparateurs
    var textContent = "";
    for (var i = 0; i < data.length; i++) {
        var row = data[i].join("\t");
        textContent += row + "\n";
    }

    // créer un objet URL pour le contenu texte
    var url = URL.createObjectURL(new Blob([textContent], {
        type: "text/plain"
    }));

    // créer un élément d'ancrage pour télécharger le fichier
    var link = document.createElement("a");
    link.download = "tableau.txt";
    link.href = url;

    // ajouter l'élément d'ancrage au document et le cliquer pour télécharger le fichier
    document.body.appendChild(link);
    link.click();

    // nettoyer l'objet URL créé
    URL.revokeObjectURL(url);
}

/*==============================================================================================================================*/


// Fonction calculant l'opposé du logarithme de la vraisemblance pour la régression logistique

function minus_log_likelihood(beta, args) {
    const X = args.X;
    const y = args.y;
    const p = X.map((xi) => 1 / (1 + math.exp(math.multiply(-1, math.dot(xi, beta)))));
    const log_likelihood = y.reduce((sum, yi, i) => sum + yi * Math.log(p[i]) + (1 - yi) * Math.log(1 - p[i]), 0);
    return -log_likelihood;
}

/*==============================================================================================================================*/

// Fonction calculant l'opposé du logarithme de la vraisemblance pour la régression logistique connaissant les valeurs des variables explicatives et de la variable réponse.

function minus_log_likelihood_x(beta) {
    args = { X: X, y: y }
    return minus_log_likelihood(beta, args)
}

/*==============================================================================================================================*/

//Cherche le minimum de la fonction f en utilisant la méthode de Newton

function newtonMethod(f, x0, args = {}, tol = 1e-6, maxIter = 100) {

    if (!Array.isArray(x0)) {
        x0 = [x0]; // Convertir en un tableau à une seule variable
    }
    let iter = 0;
    let x = x0;
    const n = x.length;
    while (iter < maxIter) {

        // calcul du gradient et de la matrice hessienne de f
        const gradFx = partial_derivatives(f, x, args); //gradient de f en x
        const hessFx = hessian_matrix(f, x, args); //matrice hessienne de f en x

        // calcul de la direction de descente
        const p = math.multiply(math.inv(hessFx), gradFx);

        // mise à jour de x
        if (n != 1) {
            x = x.map((xi, i) => xi - p[i]);
            crit = Math.sqrt(p.reduce((acc, pi) => acc + pi ** 2, 0))
        }
        else {
            x = x - p
            crit = Math.sqrt(p * p)
        }
        //document.getElementById("demo").innerHTML =crit

        // test de convergence
        if (crit < tol) {

            return x;
        }
        iter++;
    }

}

/*==============================================================================================================================*/

//Calcul des dérivées partielles de la fonction de log - vraisemblance

function partial_derivatives(f, x, args = {}) {
    const h = 1e-6;
    if (!Array.isArray(x)) {
        x = [x]; // Convertir en un tableau à une seule variable
    }
    const n = x.length;
    let grad = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        const hVec = new Array(n).fill(0);
        hVec[i] = h;
        if (n != 1) {
            grad[i] = (f(x.map((xi, j) => xi + hVec[j]), { ...args }) - f(x.map((xi, j) => xi - hVec[j]), { ...args })) / (2 * h);
        } else {
            grad = (f(x[0] + h, { ...args }) - f(x[0], { ...args })) / (2 * h);
        }
    }
    return grad;
}

/*==============================================================================================================================*/

//fonction qui calcule la matrice hessienne de f en x

function hessian_matrix(f, x, args = {}) {
    if (typeof f !== 'function') {
        throw new TypeError('f doit être une fonction');
    }
    if (!Array.isArray(x)) {
        x = [x]; // Convertir en un tableau à une seule variable
    }
    const h = 1e-6;
    const n = x.length;
    let hess = Array.from(Array(n), () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {

        const hVecI = new Array(n).fill(0);
        hVecI[i] = h;
        for (let j = i; j < n; j++) {
            const hVecJ = new Array(n).fill(0);
            if (n != 1) {
                hVecJ[j] = h;
                hess[i][j] = (f(x.map((xi, k) => xi + hVecI[k] + hVecJ[k]), { ...args }) - f(x.map((xi, k) => xi + hVecI[k] - hVecJ[k]), { ...args }) - f(x.map((xi, k) => xi - hVecI[k] + hVecJ[k]), { ...args }) + f(x.map((xi, k) => xi - hVecI[k] - hVecJ[k]), { ...args })) / (4 * h ** 2);
                hess[j][i] = hess[i][j];
            } else {
                hess = (f(x[0] + h, { ...args }) - 2 * f(x[0], { ...args }) + f(x[0] - h, { ...args })) / (h * h);

            }
        }
    }
    return hess;
}


/*==============================================================================================================================*/

//fonction qui calcule l'intervalle de confiance des coefficients
//de la regression logistique a l'aide la methode du profil de vraissemblance
//Based on : Confidence intervals by the profile likelihood method, with applications in veterinary epidemiology
//H. Stryhn1, J. Christensen*2

function conf_int_logistic_reg(beta0, args = {}, tol = 1e-6) {
    let conf_int = new Array(beta0.length).fill(0);
    let SD = new Array(beta0.length).fill(0);
    for (let j = 0; j < beta0.length; j++) {
        SD[j] = math.sqrt(math.diag(math.inv(hessian_matrix(minus_log_likelihood, beta0, args))))[j];

        let teta0 = beta0[j];

        let gamma0 = beta0.filter((_, index) => index !== j);
        // La fonction profile_likelihood calcul la valeur du jeme element de beta (teta) pour lequel le logarithme de la vraissemblance (maximisé par rapport aux autres elements de beta : gamma) est egale au 95eme percentile du maximum global de ce logarithme
        let profile_likelihood = function (teta, args = {}) {
            let h = function (gamma, args = {}) {
                let beta = gamma;
                beta.splice(j, 0, teta); // insérer teta dans beta à la position j
                let ff = Math.pow(minus_log_likelihood(beta, args), 20);
                return ff;
            };

            let gamma = newtonMethod(h, gamma0, args, tol);
            // cherche la valeur des coeff de beta correspondant au maximum de vraissemblance lorsque la valeur du jeme coeff de beta vaut teta.

            let beta = gamma;
            beta.splice(j, 0, teta);
            // insérer teta dans beta à la position j

            return math.pow((minus_log_likelihood(beta, args) - minus_log_likelihood(beta0, args) - jStat.chisquare.inv(0.95, 1) / 2), 2);
        };

        conf_int[j] = new Array(2).fill(0);

        conf_int[j][0] = newtonMethod(profile_likelihood, teta0 - 2 * SD[j], args, tol);
        conf_int[j][1] = newtonMethod(profile_likelihood, teta0 + 2 * SD[j], args, tol);
    }

    return conf_int
}

/*==============================================================================================================================*/
//Fabrique un jeu de donnees pour une regression logistique

function Create_Log_Reg_Data(N, beta, mean_X, sigma_X, Col_Names, myrng) {

    var data = new Array()
    var K = beta.length + 1 // nombre de variables explicatives
    var Precision = 3
    data[0] = Col_Names;

    x = Array.from(Array(N), () => new Array(K - 1).fill(0));
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < K - 1; j++) {
            x[i][j] = jStat.normal.inv(myrng(), mean_X[j], sigma_X[j]).toPrecision(3);
        }
    }

    // Ajout d'un intercept (colonne de 1) aux données d'entraînement
    if (Array.isArray(x[0])) {
        var X = x.map((xi) => [1, ...xi]);
    } else {
        var X = x.map((xi) => [1, xi]);
    }

    beta.splice(0, 0, -math.dot(mean_X, beta))


    P = X.map((xi) => 1 / (1 + math.exp(math.multiply(-1, math.dot(xi, beta)))))

    y = new Array(N).fill(1);
    for (let i = 0; i < N; i++) {
        if (myrng() > P[i]) {
            y[i] = 0;
        }
    }

    for (let i = 1; i <= N; i++) {
        data[i] = new Array(K).fill(0)
        for (let j = 0; j < K; j++) {
            data[i][j] = x[i - 1][j];
            data[i][K - 1] = y[i - 1];
        }
    }

    var data_num = math.subset(data, math.index(math.range(1, N + 1), math.range(0, Col_Names.length)))

    var Y1 = math.subset(data_num, math.index(math.range(0, N), Col_Names.length - 1))
    var X1 = math.subset(data_num, math.index(math.range(0, N), math.range(0, Col_Names.length - 1)))


    var Log_Reg_Data = {
        'data': data,
        'Y': Y1,
        'X': X1
    };

    return Log_Reg_Data
}
/*==============================================================================================================================*/

function scatter_plot(array, emplacement_courbe = "emplacement_courbe", line_title = "", hAxes_title = array[0][0], vAxes_title = array[0][1], chartArea_width = 250, chartArea_height = 250,) {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable(array);

        var options = {
            title: line_title,
            titleTextStyle: {
                fontSize: 20,
                bold: true,
            },
            curveType: 'none',
            legend: 'none',
            vAxes: {
                0: {
                    viewWindow: {
                        min: 0
                    },
                    title: vAxes_title,
                    titleTextStyle: {
                        fontSize: 20
                    }
                }
            },
            hAxes: {
                0: {
                    title: hAxes_title,
                    titleTextStyle: {
                        fontSize: 20
                    }
                }
            },

            colors: ['red', '#004411'],
            chartArea: {
                width: chartArea_width,
                height: chartArea_height,
                bottom: 100,
                left: 100,
                backgroundColor: {
                    stroke: 'black',
                    strokeWidth: 2
                }
            },


        };

        var chart = new google.visualization.ScatterChart(document.getElementById(emplacement_courbe));

        chart.draw(data, options);
    }
}


/*==============================================================================================================================*/
/*==============================================================================================================================*/

function reponses_proposees(x, min_x, max_x, NCS, myrng, NbRep, rang, Num_question) {

    x = parseFloat(x); // au cas ou x est de type caractere

    let scale = Math.ceil(Math.log10(Math.abs(x + 1.0000e-16))); // Ordre de grandeur de la réponse correcte
    x = math.format(x * Math.pow(10, -scale), { notation: 'fixed', precision: 10 }) * Math.pow(10, scale);
    //garde 10 chiffres significatifs a cause de l'imprecision des calculs en javascript
    x = math.format(x * Math.pow(10, -scale), { notation: 'fixed', precision: NCS }) * Math.pow(10, scale);

    let sample0 = [];
    for (let i = Math.pow(10, NCS - 1); i < Math.pow(10, NCS); i++) {
        sample0.push(i / Math.pow(10, NCS));
    }


    let proposedValuesNum = sample0.map(value => Math.sign(x) * value * Math.pow(10, scale));



    // Éliminer les valeurs hors des limites
    proposedValuesNum = proposedValuesNum.filter(value => value >= min_x && value <= max_x)
    proposedValuesNum = proposedValuesNum.filter(function (value) {
        return value !== math.format(x, NCS);
    });



    // Gestion des formats d'affichage

    if (Math.abs(x) > 1e-3 && Math.abs(x) < 1e3) {
        proposedValuesNum = proposedValuesNum.map(value => math.format(value, { notation: 'fixed', precision: NCS - scale }));
    } else {
        proposedValuesNum = proposedValuesNum.map(value => math.format(value, {
            notation: 'exponential',
            precision: NCS
        }));
    }





    // Trouver la réponse correcte et incorrecte
    let differences = proposedValuesNum.map(value => Math.abs(value - x));

    let minDifference = Math.min(...differences);

    let reponseCorrecteStr = proposedValuesNum[differences.indexOf(minDifference)];

    proposedValuesNum.splice(differences.indexOf(minDifference), 1); // Éliminer la réponse correcte


    // Genere une nouvelle graine pour que les solutions incorrectes proposees soient differente d'une question a l'autre.
    let myrng1 = new Math.seedrandom(myrng() + Num_question)



    // Choisir la position de la réponse correcte et mélanger les réponses incorrectes
    positionReponseCorrecte = rang - 1;

    let reponsesIncorrectesStr = sample(proposedValuesNum, NbRep, myrng1);
    reponsesProposees = reponsesIncorrectesStr
    reponsesProposees[positionReponseCorrecte] = reponseCorrecteStr

    // Remplacement de 'e' ou 'e+' par '*10^'
    reponsesProposees = reponsesProposees.map(value => value.replace(/e\+?/, ' 10<sup>'));

    reponsesProposees = reponsesProposees.map(value => value + '</sup>');

    for (i = 1; i <= NbRep; i++) {
        document.getElementById("R" + Num_question + i).innerHTML = reponsesProposees[i - 1]
    }
    return reponsesProposees
}




/*==============================================================================================================================*/
/*==============================================================================================================================*/


function sample(elements, nombre, myrng) { // Fonction pour faire un tirage sans remise

    let tirages = [];
    let indicesDisponibles = Array.from(elements.keys()); // Créer un tableau d'indices
    //let myrng = new Math.seedrandom(seed);

    for (let i = 0; i < nombre; i++) {
        if (indicesDisponibles.length === 0) {
            break; // Sortir de la boucle si on a plus d'éléments à tirer
        }

        // Sélectionner un indice aléatoire parmi ceux disponibles
        let indexAleatoire = Math.floor(myrng() * indicesDisponibles.length);
        let indexChoisi = indicesDisponibles.splice(indexAleatoire, 1)[0]; // Retirer l'indice choisi

        // Ajouter l'élément correspondant au tirage
        tirages.push(elements[indexChoisi]);
    }

    return tirages;
}


/*==============================================================================================================================*/
/*==============================================================================================================================*/
function arrondir_ncs(x, ncs) {
    // arrondir x en gardant ncs chiffres significatifs
    var scale = Math.ceil(Math.log10(Math.abs(x + 1.0000e-16)))
    var y = x * Math.pow(10, -scale);
    var z = math.format(y, { notation: 'fixed', precision: ncs })
    var arrondi = math.format(z * Math.pow(10, scale), { notation: 'fixed', precision: Math.max(ncs - scale, 0) })

    //Gestion des formats d'affichage
    if (Math.abs(arrondi) > 1e-3 && Math.abs(arrondi) < 1e3) {
        arrondi = math.format(Number(arrondi), { notation: 'fixed', precision: ncs - scale });
    } else {
        arrondi = math.format(Number(arrondi), { notation: 'exponential', precision: ncs });
    }


    return arrondi
}

/*==============================================================================================================================*/
/*==============================================================================================================================*/

function intervalles_proposees(x1, x2, n, rang, Nb_reponses, Num_question, myrng) {

    //renvoie des intervalles symetriques par rapport à (x1+x2)/2
    //document.getElementById("demo1").innerHTML = (Math.abs(x1) < Math.abs(x2))


    if (Math.abs(x1) > Math.abs(x2)) {
        var min_x1 = x1 + math.sign(x1 * x2) * x2;
        var max_x1 = (x1 + x2) / 2;


        Interval1 = reponses_proposees(x1, min_x1, max_x1, n, myrng, Nb_reponses, rang, Num_question)
        Interval2 = new Array;

        for (j = 0; j < Nb_reponses; j++) {
            Interval2[j] = arrondir_ncs(x1 + x2 - parseFloat(Interval1[j]), n);
        }
        Interval2[rang - 1] = arrondir_ncs(x2, n);

        //document.getElementById("demo1").innerHTML = x1
    } else {

        var min_x2 = (x1 + x2) / 2;
        var max_x2 = math.sign(x1 * x2) * x1 + x2;

        Interval2 = reponses_proposees(x2, min_x2, max_x2, n, myrng, Nb_reponses, rang, Num_question)
        Interval1 = new Array;
        z = Interval2[1]
        for (j = 0; j < Nb_reponses; j++) {
            Interval1[j] = arrondir_ncs(x1 + x2 - parseFloat(Interval2[j]), n);
        }
        Interval1[rang - 1] = arrondir_ncs(x1, n);
    }


    // Remplacement de 'e' ou 'e+' par '*10^'
    Interval1 = Interval1.map(value => value.replace(/e\+?/, ' 10<sup>'));
    Interval1 = Interval1.map(value => value + '</sup>');

    Interval2 = Interval2.map(value => value.replace(/e\+?/, ' 10<sup>'));
    Interval2 = Interval2.map(value => value + '</sup>');

    IntervalArray = new Array;

    for (j = 0; j < Nb_reponses; j++) {

        IntervalArray[j] = "[" + Interval1[j] + ";" + Interval2[j] + "]";

    }

    for (i = 1; i <= Nb_reponses; i++) {
        document.getElementById("R" + Num_question + i).innerHTML = IntervalArray[i - 1]
    }
    return IntervalArray

}
/*==============================================================================================================================*/
/*==============================================================================================================================*/


function decodeSinRang(rang_encoded) {
    var encodingTable = {};
    
    for (var val = 1.0; val <= 10.0; val += 0.1) {
        var valRounded = Math.round(val * 10) / 10;
        var sinVal = Math.sin(10 * valRounded);
        var encoded = Math.round((sinVal + 1) * 4500 + 1000) / 1000;
        var encodedKey = encoded.toFixed(3);
        encodingTable[encodedKey] = valRounded;
    }
    
    var rang_encoded_key = rang_encoded.toFixed(3);
    var rang_decoded = encodingTable[rang_encoded_key];
    
    if (rang_decoded === undefined) {
        var minDiff = Infinity;
        var closestVal = 5.0;
        
        for (var key in encodingTable) {
            var diff = Math.abs(parseFloat(key) - rang_encoded);
            if (diff < minDiff) {
                minDiff = diff;
                closestVal = encodingTable[key];
            }
        }
        rang_decoded = closestVal;
    }
    
    return rang_decoded;
}

/*==============================================================================================================================*/
/*==============================================================================================================================*/
function reponses(x, min_x, max_x, NCS, myrng, NbRep, rang, Num_question) {

    // ÉTAPE 1 : normaliser x en NCS chiffres significatifs
    x = parseFloat(x);

    let scale = Math.ceil(Math.log10(Math.abs(x) + 1.0e-16));

    x = parseFloat(math.format(x * Math.pow(10, -scale), { notation: 'fixed', precision: 10 }))
        * Math.pow(10, scale);
    x = parseFloat(math.format(x * Math.pow(10, -scale), { notation: 'fixed', precision: NCS }))
        * Math.pow(10, scale);

    // ÉTAPE 2 : générer tous les candidats à NCS chiffres significatifs
    // BUG CORRIGÉ : <= au lieu de < pour inclure les puissances de 10 exactes
    let sample0 = [];
    for (let i = Math.pow(10, NCS - 1); i <= Math.pow(10, NCS); i++) {
        sample0.push(i / Math.pow(10, NCS));
    }

    let proposedValuesNum = sample0.map(value => Math.sign(x) * value * Math.pow(10, scale));

    // ÉTAPE 3 : filtrer les valeurs hors bornes [min_x, max_x]
    proposedValuesNum = proposedValuesNum.filter(value => value >= min_x && value <= max_x);

    // ÉTAPE 4 : formater les candidats
    if (Math.abs(x) > 1e-3 && Math.abs(x) < 1e3) {
        proposedValuesNum = proposedValuesNum.map(value =>
            math.format(value, { notation: 'fixed', precision: NCS - scale })
        );
    } else {
        proposedValuesNum = proposedValuesNum.map(value =>
            math.format(value, { notation: 'exponential', precision: NCS })
        );
    }

    // ÉTAPE 5 : identifier la bonne réponse (candidat le plus proche de x)
    let differences = proposedValuesNum.map(value => Math.abs(parseFloat(value) - x));
    let minDifference = Math.min(...differences);
    let idxCorrect = differences.indexOf(minDifference);
    let reponseCorrecteStr = proposedValuesNum[idxCorrect];

    // Supprimer la bonne réponse de la liste des distracteurs
    proposedValuesNum.splice(idxCorrect, 1);

    // ÉTAPE 6 : tirer NbRep distracteurs
    let myrng1 = new Math.seedrandom(myrng() + Num_question);
    let reponsesIncorrectesStr = sample(proposedValuesNum, NbRep, myrng1);

    // ÉTAPE 7 : insérer la bonne réponse à la position rang (1-indexée)
    let reponsesFinales = reponsesIncorrectesStr.slice();
    reponsesFinales[rang - 1] = reponseCorrecteStr;

    // ÉTAPE 8 : formater la notation scientifique pour HTML
    reponsesFinales = reponsesFinales.map(value =>
        value.replace(/e\+?(-?)(\d+)/, ' × 10<sup>$1$2</sup>')
    );

    // ÉTAPE 9 : injecter dans le DOM
    for (let i = 1; i <= reponsesFinales.length; i++) {
        let el = document.getElementById('R' + Num_question + i);
        if (el) el.innerHTML = reponsesFinales[i - 1];
    }

    return reponsesFinales;
}



/*==============================================================================================================================*/
/*==============================================================================================================================*/
/*  data_from_function — version math.js (remplace la version nerdamer ci-dessus)
/*
/*  Génère un tableau de 500 points [x, f(x)] à partir d'une chaîne d'expression.
/*  Utilise math.js (math.evaluate) en priorité, nerdamer en fallback.
/*  RÈGLE (section 22.3) : toujours incorporer les valeurs numériques par
/*  concaténation avant l'appel : var fdp = 'exp(-0.5*((x-' + mu + ')/' + sigma + ')^2)...'
/*
/*  @param expr     {string}  Expression f(x) en syntaxe math.js (sqrt, exp, pi acceptés).
/*  @param Xrange   {Array}   [x_min, x_max].
/*  @param ColNames {Array}   ['nom_axe_x', 'nom_axe_y'] (optionnel, défaut ['X','Y']).
/*  @returns {Array}  Tableau au format Google Charts (ligne 0 = en-têtes, 500 points).
/*==============================================================================================================================*/
function data_from_function(expr, Xrange, ColNames) {
    ColNames = ColNames || ['X', 'Y'];
    var data = [ColNames];
    var npts = 500;
    for (var i = 0; i < npts; i++) {
        var xval = Xrange[0] + i / (npts - 1) * (Xrange[1] - Xrange[0]);
        var yval;
        try {
            // math.js est disponible via CDN mathjs dans les questions
            yval = math.evaluate(expr, { x: xval });
        } catch (e) {
            try {
                yval = Number(nerdamer('f(' + xval + ')'));
            } catch (e2) {
                yval = NaN;
            }
        }
        data.push([xval, isFinite(yval) ? yval : 0]);
    }
    return data;
}

/*==============================================================================================================================*/
/*==============================================================================================================================*/
/*  plot_line_area — courbe continue avec zone colorée (Google Charts ComboChart)
/*
/*  Trace une densité f(x) et colorie la zone [xa, xb] sous la courbe.
/*  Utilisé pour les corrections de lois continues (normale, exponentielle, uniforme).
/*
/*  @param data        {Array}   Résultat de data_from_function (ligne 0 = en-têtes).
/*  @param div_id      {string}  ID du <div> cible dans le DOM.
/*  @param Xrange_area {Array}   [xa, xb] — zone colorée.
/*                               Passer [] ou null pour tracer la courbe seule.
/*                               Accepte -Infinity et +Infinity.
/*  @param options     {object}  Paramètres optionnels :
/*    title        {string}   Titre du graphique.
/*    x_title      {string}   Titre de l'axe X.
/*    y_title      {string}   Titre de l'axe Y (défaut 'f(x)').
/*    label        {string}   Libellé affiché dans la légende de la zone colorée.
/*    color        {string}   Couleur de la zone (défaut '#3498db').
/*    curve_color  {string}   Couleur de la courbe (défaut '#2c3e50').
/*    curve_width  {number}   Épaisseur de la courbe (défaut 2).
/*    fill_opacity {number}   Opacité de la zone 0-1 (défaut 0.4).
/*    width        {number}   Largeur totale px (défaut 560).
/*    height       {number}   Hauteur totale px (défaut 270).
/*    legend       {string}   Position légende : 'none'|'bottom'|'right' (défaut 'none').
/*
/*  Exemple (correction loi normale, queue gauche) :
/*    var fdp = 'exp(-0.5*((x-' + mu + ')/' + sigma + ')^2)/(' + sigma + '*sqrt(2*pi))';
/*    var data = data_from_function(fdp, [mu-4*sigma, mu+4*sigma], ['X', 'f(x)']);
/*    plot_line_area(data, 'graphe_norm_c1', [-Infinity, c1], {
/*        title:  'X ~ N(' + mu + ', ' + sigma + '²)',
/*        label:  'P(X ≤ ' + c1 + ') ≈ ' + probaArrondie_c1,
/*        color:  '#3498db'
/*    });
/*==============================================================================================================================*/
function plot_line_area(data, div_id, Xrange_area, options) {
    options = options || {};
    var w            = options.width        || 560;
    var h            = options.height       || 270;
    var title        = options.title        || '';
    var x_title      = options.x_title      || '';
    var y_title      = options.y_title      || 'f(x)';
    var area_label   = options.label        || 'Zone';
    var area_color   = options.color        || '#3498db';
    var curve_color  = options.curve_color  || '#2c3e50';
    var curve_width  = options.curve_width  || 2;
    var fill_opacity = options.fill_opacity || 0.4;
    var legend_pos   = options.legend       || 'none';

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(function() {

        // Construire le tableau Google Charts avec 3 colonnes :
        // [x, courbe_complète, zone_colorée]
        var headers = [data[0][0], data[0][1], area_label];
        var table   = [headers];
        var xa = (Xrange_area && Xrange_area.length >= 2) ? Xrange_area[0] : null;
        var xb = (Xrange_area && Xrange_area.length >= 2) ? Xrange_area[1] : null;

        var y_vals = [];
        for (var i = 1; i < data.length; i++) {
            y_vals.push(data[i][1]);
        }
        var y_max = Math.max.apply(null, y_vals);

        for (var i = 1; i < data.length; i++) {
            var xval = data[i][0];
            var yval = data[i][1];
            var in_area = (xa !== null)
                ? (xval >= xa && xval <= xb)
                : false;
            table.push([xval, yval, in_area ? yval : null]);
        }

        var gt = google.visualization.arrayToDataTable(table);

        var chart_options = {
            title:          title,
            titleTextStyle: { fontSize: 13, color: '#2c3e50' },
            hAxis: {
                title:          x_title,
                titleTextStyle: { color: '#555' },
                textStyle:      { fontSize: 10 }
            },
            vAxis: {
                title:          y_title,
                titleTextStyle: { color: '#555' },
                minValue:       0,
                viewWindow:     { min: 0, max: y_max * 1.15 }
            },
            seriesType: 'area',
            series: {
                0: {
                    type:        'line',
                    color:       curve_color,
                    lineWidth:   curve_width,
                    areaOpacity: 0
                },
                1: {
                    type:        'area',
                    color:       area_color,
                    areaOpacity: fill_opacity,
                    lineWidth:   0
                }
            },
            legend:    { position: legend_pos },
            width:     w,
            height:    h,
            chartArea: { left: 60, top: 40, width: '80%', height: '75%' }
        };

        var chart = new google.visualization.ComboChart(document.getElementById(div_id));
        chart.draw(gt, chart_options);
    });
}

/* Alias pour compatibilité */
/* Alias pour compatibilité et lisibilité */
var plot_area    = plot_line_area;   /* alias historique */
var plot_density = plot_line_area;   /* alias sémantique pour les densités continues (N, Exp, Unif) */


/*==============================================================================================================================*/

/*==============================================================================================================================*/

/*==============================================================================================================================*/
/*  plot_line_area_bilateral — densité continue avec DEUX zones colorées symétriques
/*
/*  Trace la courbe f(x) et colorie les deux queues x ≤ x_left ET x ≥ x_right.
/*  Utilisé pour la p-value bilatérale d'un test normal : colorie |z| ≥ z_abs.
/*
/*  @param data      {Array}   Résultat de data_from_function.
/*  @param div_id    {string}  ID du <div> cible.
/*  @param x_left    {number}  Borne supérieure de la queue gauche (ex : -z_abs).
/*  @param x_right   {number}  Borne inférieure de la queue droite (ex : +z_abs).
/*  @param options   {object}  Mêmes options que plot_line_area +
/*                             label_left  {string} libellé queue gauche,
/*                             label_right {string} libellé queue droite.
/*==============================================================================================================================*/
function plot_line_area_bilateral(data, div_id, x_left, x_right, options) {
    options = options || {};
    var w            = options.width        || 560;
    var h            = options.height       || 270;
    var title        = options.title        || '';
    var x_title      = options.x_title      || '';
    var y_title      = options.y_title      || 'f(x)';
    var area_label   = options.label_left   || 'Queue gauche';
    var area_color   = options.color        || '#e74c3c';
    var curve_color  = options.curve_color  || '#2c3e50';
    var curve_width  = options.curve_width  || 2;
    var fill_opacity = options.fill_opacity || 0.5;
    var legend_pos   = options.legend       || 'none';

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(function() {

        // 3 colonnes : [x, courbe_complète, zone_colorée (les deux queues)]
        var headers = [data[0][0], data[0][1], area_label];
        var table   = [headers];

        var y_vals = [];
        for (var i = 1; i < data.length; i++) { y_vals.push(data[i][1]); }
        var y_max = Math.max.apply(null, y_vals);

        for (var i = 1; i < data.length; i++) {
            var xval    = data[i][0];
            var yval    = data[i][1];
            var in_tail = (xval <= x_left || xval >= x_right);
            table.push([xval, yval, in_tail ? yval : null]);
        }

        var gt = google.visualization.arrayToDataTable(table);

        var chart_options = {
            title:          title,
            titleTextStyle: { fontSize: 13, color: '#2c3e50' },
            hAxis: {
                title:          x_title,
                titleTextStyle: { color: '#555' },
                textStyle:      { fontSize: 10 }
            },
            vAxis: {
                title:          y_title,
                titleTextStyle: { color: '#555' },
                minValue:       0,
                viewWindow:     { min: 0, max: y_max * 1.15 }
            },
            seriesType: 'area',
            series: {
                0: {
                    type:        'line',
                    color:       curve_color,
                    lineWidth:   curve_width,
                    areaOpacity: 0
                },
                1: {
                    type:        'area',
                    color:       area_color,
                    areaOpacity: fill_opacity,
                    lineWidth:   0
                }
            },
            legend:    { position: legend_pos },
            width:     w,
            height:    h,
            chartArea: { left: 60, top: 40, width: '80%', height: '75%' }
        };

        var chart = new google.visualization.ComboChart(document.getElementById(div_id));
        chart.draw(gt, chart_options);
    });
}

/* Alias sémantique */
var plot_density_bilateral = plot_line_area_bilateral;

/*==============================================================================================================================*/
/*  plot_bar_chart — Diagramme en barres générique (Google Charts ColumnChart)
/*
/*  Interface simplifiée : on passe des tableaux de labels/valeurs/couleurs,
/*  la fonction gère Google Charts, le DataTable, les annotations et la légende.
/*
/*  @param div_id   {string}  ID du <div> cible dans le DOM.
/*  @param labels   {Array}   Tableau des labels de l'axe X.  Ex: [0, 1, 2, ...] ou ['A','B','C']
/*  @param values   {Array}   Tableau des valeurs (même longueur que labels).
/*  @param options  {object}  Options facultatives (toutes optionnelles) :
/*
/*    -- Apparence générale --
/*    title        {string}   Titre du graphique.          Défaut: ''
/*    x_title      {string}   Titre axe X.                 Défaut: ''
/*    y_title      {string}   Titre axe Y.                 Défaut: ''
/*    width        {number}   Largeur totale px.            Défaut: 520
/*    height       {number}   Hauteur totale px.            Défaut: 300
/*    bar_width    {string}   Largeur des barres en %.      Défaut: '80%'
/*
/*    -- Couleurs --
/*    colors       {Array}    Tableau de couleurs CSS, une par barre.
/*                            Si absent : toutes les barres en bleu clair '#aed6f1'.
/*    default_color {string}  Couleur par défaut si colors est absent.
/*
/*    -- Annotations (labels au-dessus des barres) --
/*    annotations  {Array}    Tableau de chaînes, une par barre. '' = pas d'annotation.
/*
/*    -- Légende manuelle (sous le graphique, dans le div wrapper) --
/*    legend       {Array}    Tableau d'objets {color, label} à afficher comme légende.
/*                            Ex: [{color:'#c0392b', label:'k observe'},
/*                                 {color:'#aed6f1', label:'Zone centrale'}]
/*
/*  Exemple minimal :
/*    plot_bar_chart('mon_div', [0,1,2,3], [0.1, 0.3, 0.4, 0.2]);
/*
/*  Exemple avec couleurs et légende :
/*    var cols = labels.map(function(k) {
/*        return (Math.sign(k - k_inf) == -1 || Math.sign(k - k_sup) == 1)
/*               ? '#f5b7b1' : '#aed6f1';
/*    });
/*    plot_bar_chart('mon_div', labels, values, {
/*        title:  'Distribution B(50, 0.4)',
/*        x_title: 'k', y_title: 'P(K=k)',
/*        colors: cols,
/*        legend: [
/*            {color:'#f5b7b1', label:'Zone de rejet'},
/*            {color:'#aed6f1', label:'Zone de non-rejet'}
/*        ]
/*    });
/*==============================================================================================================================*/

function plot_bar_chart(div_id, labels, values, options) {
    var opts        = options || {};
    var title       = opts.title        || '';
    var x_title     = opts.x_title      || '';
    var y_title     = opts.y_title      || '';
    var w           = opts.width        || 520;
    var h           = opts.height       || 300;
    var bar_width   = opts.bar_width    || '80%';
    var def_color   = opts.default_color || '#aed6f1';
    var colors      = opts.colors      || null;
    var annotations = opts.annotations || null;
    var legend_items = opts.legend     || null;

    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(function() {

        /* Construction du DataTable */
        var dt = new google.visualization.DataTable();
        dt.addColumn('string', x_title || 'x');
        dt.addColumn('number', y_title || 'y');
        dt.addColumn({type: 'string', role: 'style'});
        dt.addColumn({type: 'string', role: 'annotation'});

        var n = labels.length;
        var i = 0;
        while (i != n) {
            var lbl = String(labels[i]);
            var val = Number(values[i]);
            var col = colors ? String(colors[i]) : def_color;
            var ann = annotations ? String(annotations[i]) : '';
            dt.addRow([lbl, val, col, ann]);
            i = i + 1;
        }

        /* Options Google Charts */
        var chart_opts = {
            title:          title,
            titleTextStyle: {fontSize: 13, color: '#2c3e50'},
            hAxis: {
                title:          x_title,
                titleTextStyle: {color: '#555'},
                textStyle:      {fontSize: 10}
            },
            vAxis: {
                title:          y_title,
                titleTextStyle: {color: '#555'},
                minValue:       0
            },
            legend:      {position: 'none'},
            bar:         {groupWidth: bar_width},
            annotations: {alwaysOutside: false, textStyle: {fontSize: 9, bold: true}},
            width:       w,
            height:      h,
            chartArea:   {left: 60, top: 40, width: '80%', height: '65%'}
        };

        var el = document.getElementById(div_id);
        if (!el) return;

        var chart = new google.visualization.ColumnChart(el);
        chart.draw(dt, chart_opts);

        /* Legende manuelle sous le graphique */
        if (legend_items && legend_items.length) {
            var legendDiv = document.createElement('div');
            legendDiv.style.cssText = 'display:flex; flex-wrap:wrap; gap:6px 14px;'
                + ' padding:6px 8px; font-size:12px; font-family:Arial,sans-serif;'
                + ' border-top:1px solid #eee; margin-top:2px;';
            legend_items.forEach(function(item) {
                var entry = document.createElement('div');
                entry.style.cssText = 'display:flex; align-items:center; gap:5px;';
                var swatch = document.createElement('div');
                swatch.style.cssText = 'width:12px; height:12px; border-radius:2px;'
                    + ' flex-shrink:0; background:' + item.color + ';';
                var lbl = document.createElement('span');
                lbl.textContent = item.label;
                entry.appendChild(swatch);
                entry.appendChild(lbl);
                legendDiv.appendChild(entry);
            });
            el.parentNode.insertBefore(legendDiv, el.nextSibling);
        }
    });
}

/*==============================================================================================================================*/

/*==============================================================================================================================*/
/*  GRAPHIQUES BINOMIAL / NORMALE — plot_binom_pmf / plot_normal_01
/*
/*  Ces fonctions encapsulent le trace Google Charts ColumnChart pour les exercices
/*  de test binomial (BINOM_MENDEL_CLIN). Elles sont appelees depuis les corrections
/*  des exercices XML. Google Charts (loader.js) doit être charge dans le CDN.
/*
/*  Signatures :
/*
/*  plot_binom_pmf(div_id, n, p0, mu_H0, sigma_H0, k_obs, k_sym, color_fn, title, options)
/*    Trace la PMF de B(n, p0) sur [mu_H0 ± 4*sigma_H0].
/*    @param div_id    {string}   ID du <div> cible dans le DOM.
/*    @param n         {number}   Taille de l'echantillon.
/*    @param p0        {number}   Probabilite de succès sous H0.
/*    @param mu_H0     {number}   Esperance n*p0 (calcul via entiers, sans artefact flottant).
/*    @param sigma_H0  {number}   Écart-type sqrt(n*p0*(1-p0)).
/*    @param k_obs     {number}   Valeur observee (annotee k_obs sur la figure).
/*    @param k_sym     {number}   Valeur symetrique (annotee k_sym sur la figure).
/*    @param color_fn  {function} f(i) -> couleur CSS de la barre i (string).
/*                                Exemples :
/*                                  function(i){return i<=k_obs ? "#2980b9" : "#aed6f1";}
/*                                  function(i){return i===k_obs ? "#e74c3c" : i===k_sym ? "#2ecc71" : "#aed6f1";}
/*    @param title     {string}   Titre du graphique.
/*    @param options   {object}   Options facultatives : width, height (defauts 560×270).
/*
/*  plot_normal_01(div_id, z_obs, color_fn, title, options)
/*    Trace la densite de N(0,1) sur [-4, 4] avec des barres colorees.
/*    @param div_id    {string}   ID du <div> cible dans le DOM.
/*    @param z_obs     {number}   Statistique de test z_obs (valeur numerique).
/*    @param color_fn  {function} f(z) -> couleur CSS de la barre z (string).
/*                                Exemples :
/*                                  function(z){return Math.abs(z)>=Math.abs(z_obs) ? "#e74c3c" : "#aed6f1";}
/*    @param title     {string}   Titre du graphique.
/*    @param options   {object}   Options facultatives : width, height (defauts 560×270).
/*==============================================================================================================================*/

function plot_binom_pmf(div_id, n, p0, mu_H0, sigma_H0, k_obs, k_sym, color_fn, title, options) {
    var opts = options || {};
    var w = opts.width  || 560;
    var h = opts.height || 270;

    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(function() {
        var k_min = Math.max(0, Math.floor(mu_H0 - 4 * sigma_H0));
        var k_max = Math.min(n,  Math.ceil(mu_H0 + 4 * sigma_H0));

        var data = [['k', 'P(X=k)', {role: 'style'}, {role: 'annotation'}]];
        for (var i = k_min; i <= k_max; i++) {
            var pmf_i = jStat.binomial.pdf(i, n, p0);
            var col_i = color_fn(i);
            var ann_i = '';
            if (i === k_obs) ann_i = 'k\u2080\u1d0f\u02e2 = ' + k_obs;
            if (i === k_sym) ann_i = 'k\u209b\u02b8\u1d50 = ' + k_sym;
            data.push([i, pmf_i, col_i, ann_i]);
        }

        var table = google.visualization.arrayToDataTable(data);
        var chart_options = {
            title:           title,
            titleTextStyle:  {fontSize: 13, color: '#2c3e50'},
            hAxis: {title: 'k',      titleTextStyle: {color: '#555'}, textStyle: {fontSize: 10}},
            vAxis: {title: 'P(X=k)', titleTextStyle: {color: '#555'}, minValue: 0},
            legend:      {position: 'none'},
            bar:         {groupWidth: '80%'},
            annotations: {alwaysOutside: false, textStyle: {fontSize: 9}},
            width:       w,
            height:      h,
            chartArea:   {left: 60, top: 40, width: '80%', height: '75%'}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById(div_id));
        chart.draw(table, chart_options);
    });
}

/*==============================================================================================================================*/

function plot_normal_01(div_id, z_obs, color_fn, title, options) {
    var opts = options || {};
    var w = opts.width  || 560;
    var h = opts.height || 270;

    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(function() {
        var data = [['z', '\u03c6(z)', {role: 'style'}]];
        for (var zz = -4.0; zz <= 4.05; zz += 0.1) {
            var zr    = Math.round(zz * 10) / 10;
            var phi_z = Math.exp(-0.5 * zr * zr) / Math.sqrt(2 * Math.PI);
            var col_z = color_fn(zr);
            data.push([zr, phi_z, col_z]);
        }

        var table = google.visualization.arrayToDataTable(data);
        var chart_options = {
            title:          title,
            titleTextStyle: {fontSize: 13, color: '#2c3e50'},
            hAxis: {title: 'z',        titleTextStyle: {color: '#555'}, textStyle: {fontSize: 10}},
            vAxis: {title: '\u03c6(z)', titleTextStyle: {color: '#555'}, minValue: 0},
            legend:    {position: 'none'},
            bar:       {groupWidth: '100%'},
            width:     w,
            height:    h,
            chartArea: {left: 60, top: 40, width: '80%', height: '75%'}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById(div_id));
        chart.draw(table, chart_options);
    });
}

/*==============================================================================================================================*/

/*==============================================================================================================================*/
/*  plot_distribution(div_id, law, params, x_obs, alpha, side, title, options)
/*
/*  Trace la PMF (lois discretes) ou la densite (lois continues) d'une loi via jStat,
/*  avec coloration automatique des zones de rejet/non-rejet et legende integree.
/*
/*  @param div_id  {string}  ID du <div> cible.
/*  @param law     {string}  Nom de la loi :
/*                             'normal'      -> N(mu, sigma)     params = [mu, sigma]
/*                             'student'     -> t(df)            params = [df]
/*                             'chisquare'   -> chi2(df)         params = [df]
/*                             'binomial'    -> B(n, p)          params = [n, p]
/*                             'poisson'     -> P(lambda)        params = [lambda]
/*                             'exponential' -> Exp(lambda)      params = [lambda]
/*                             'uniform'     -> U(a, b)          params = [a, b]
/*  @param params  {Array}   Parametres de la loi (voir ci-dessus).
/*  @param x_obs   {number}  Valeur observee (statistique de test).
/*  @param alpha   {number}  Seuil de signification (ex : 0.05).
/*  @param side    {string}  'bilateral', 'left' ou 'right'.
/*  @param title   {string}  Titre du graphique.
/*  @param options {object}  Facultatif :
/*                             width    {number}  Largeur px       (defaut 520)
/*                             height   {number}  Hauteur px       (defaut 300)
/*                             x_title  {string}  Titre axe X
/*                             y_title  {string}  Titre axe Y
/*                             n_points {number}  Nb barres continu (defaut 200)
/*                             x_min, x_max {number}  Bornes forcees
/*==============================================================================================================================*/

function plot_distribution(div_id, law, params, x_obs, alpha, side, title, options) {

    var opts     = options || {};
    var w        = opts.width    || 520;
    var h        = opts.height   || 300;
    var x_title  = opts.x_title  || '';
    var y_title  = opts.y_title  || '';
    var n_points = opts.n_points || 600;

    var C_REJECT   = '#f5b7b1';
    var C_NOREJECT = '#aed6f1';

    var is_discrete = (law === 'binomial' || law === 'poisson');

    /* Fonctions jStat */
    var pdf_fn = function(x) {
        if (law === 'normal')      return jStat.normal.pdf(x, params[0], params[1]);
        if (law === 'student')     return jStat.studentt.pdf(x, params[0]);
        if (law === 'chisquare')   return jStat.chisquare.pdf(x, params[0]);
        if (law === 'binomial')    return jStat.binomial.pdf(x, params[0], params[1]);
        if (law === 'poisson')     return jStat.poisson.pdf(x, params[0]);
        if (law === 'exponential') return jStat.exponential.pdf(x, params[0]);
        if (law === 'uniform')     return jStat.uniform.pdf(x, params[0], params[1]);
        return 0;
    };

    var cdf_fn = function(x) {
        if (law === 'normal')      return jStat.normal.cdf(x, params[0], params[1]);
        if (law === 'student')     return jStat.studentt.cdf(x, params[0]);
        if (law === 'chisquare')   return jStat.chisquare.cdf(x, params[0]);
        if (law === 'binomial')    return jStat.binomial.cdf(x, params[0], params[1]);
        if (law === 'poisson')     return jStat.poisson.cdf(x, params[0]);
        if (law === 'exponential') return jStat.exponential.cdf(x, params[0]);
        if (law === 'uniform')     return jStat.uniform.cdf(x, params[0], params[1]);
        return 0;
    };

    var inv_fn = function(p) {
        if (law === 'normal')      return jStat.normal.inv(p, params[0], params[1]);
        if (law === 'student')     return jStat.studentt.inv(p, params[0]);
        if (law === 'chisquare')   return jStat.chisquare.inv(p, params[0]);
        if (law === 'exponential') return jStat.exponential.inv(p, params[0]);
        if (law === 'uniform')     return jStat.uniform.inv(p, params[0], params[1]);
        return NaN;
    };

    /* Valeurs critiques */
    var x_crit_lo = NaN;
    var x_crit_hi = NaN;

    if (is_discrete) {
        var n_max  = (law === 'binomial') ? params[0] : Math.round(params[0] * 10);
        var a_side = (side === 'bilateral') ? alpha / 2 : alpha;
        if (side === 'bilateral' || side === 'left') {
            var ki = 0;
            while (ki < n_max && cdf_fn(ki) <= a_side) ki++;
            x_crit_lo = ki - 1;
        }
        if (side === 'bilateral' || side === 'right') {
            var ks = n_max;
            while (ks > 0 && (1 - cdf_fn(ks - 1)) <= a_side) ks--;
            x_crit_hi = ks + 1;
        }
    } else {
        if (side === 'bilateral') {
            x_crit_lo = inv_fn(alpha / 2);
            x_crit_hi = inv_fn(1 - alpha / 2);
        } else if (side === 'left') {
            x_crit_lo = inv_fn(alpha);
        } else {
            x_crit_hi = inv_fn(1 - alpha);
        }
    }

    /* Valeur symetrique */
    var x_sym = NaN;
    if (side === 'bilateral') {
        if (is_discrete) {
            var p_obs = pdf_fn(Math.round(x_obs));
            var mu_d  = (law === 'binomial') ? params[0] * params[1] : params[0];
            if (Math.sign(x_obs - mu_d) === 1) {
                var j = Math.floor(mu_d);
                while (j > 0 && pdf_fn(j) > p_obs) j--;
                x_sym = j;
            } else {
                var j = Math.ceil(mu_d);
                var n_disc = (law === 'binomial') ? params[0] : Math.round(params[0] * 10);
                while (j < n_disc && pdf_fn(j) > p_obs) j++;
                x_sym = j;
            }
        } else {
            var med = inv_fn(0.5);
            x_sym = 2 * med - x_obs;
        }
    }

    /* Bornes du graphique */
    var x_min, x_max;
    if (opts.x_min !== undefined && opts.x_max !== undefined) {
        x_min = opts.x_min;
        x_max = opts.x_max;
    } else if (is_discrete) {
        var mu_d = (law === 'binomial') ? params[0] * params[1] : params[0];
        var sd_d = (law === 'binomial')
                 ? Math.sqrt(params[0] * params[1] * (1 - params[1]))
                 : Math.sqrt(params[0]);
        x_min = Math.max(0, Math.floor(mu_d - 4 * sd_d));
        x_max = Math.min(
            (law === 'binomial' ? params[0] : mu_d + 6 * sd_d),
            Math.ceil(mu_d + 4 * sd_d)
        );
    } else {
        x_min = inv_fn(0.0005);
        x_max = inv_fn(0.9995);
        if (!isFinite(x_min) || isNaN(x_min)) x_min = -5;
        if (!isFinite(x_max) || isNaN(x_max)) x_max =  5;
    }
    if (!isNaN(x_obs) && Math.sign(x_obs - x_max) === 1)  x_max = x_obs + 1;
    if (!isNaN(x_obs) && Math.sign(x_obs - x_min) === -1) x_min = x_obs - 1;
    if (!isNaN(x_sym) && Math.sign(x_sym - x_max) === 1)  x_max = x_sym + 1;
    if (!isNaN(x_sym) && Math.sign(x_sym - x_min) === -1) x_min = x_sym - 1;

    /* Prefixe du nom de variable pour les annotations */
    var vname = x_title ? x_title : 'x';

    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(function() {

        var el = document.getElementById(div_id);
        if (!el) return;

        /* ── LOI DISCRETE : ColumnChart ── */
        if (is_discrete) {

            var color_fn = function(x) {
                if (!isNaN(x_crit_lo) && Math.sign(x - x_crit_lo) !== 1)  return C_REJECT;
                if (!isNaN(x_crit_hi) && Math.sign(x - x_crit_hi) !== -1) return C_REJECT;
                return C_NOREJECT;
            };

            /* Annotation uniquement sur les barres cles, sans trait ailleurs */
            var ann_fn = function(x) {
                var xr = Math.round(x);
                if (!isNaN(x_obs)     && xr === Math.round(x_obs))     return vname + '_obs='  + x_obs;
                if (!isNaN(x_sym)     && xr === Math.round(x_sym))     return vname + '_sym='  + x_sym;
                if (!isNaN(x_crit_lo) && xr === Math.round(x_crit_lo)) return vname + '_crit=' + x_crit_lo;
                if (!isNaN(x_crit_hi) && xr === Math.round(x_crit_hi)) return vname + '_crit=' + x_crit_hi;
                return '';
            };

            var data = [['k', y_title || 'P(X=k)', {role: 'style'},
                         {role: 'annotation'}, {role: 'annotationText'}]];
            var k = Math.round(x_min);
            while (k !== Math.round(x_max) + 1) {
                var ann = ann_fn(k);
                /* annotationText vide -> Google Charts n'affiche pas de trait */
                data.push([k, pdf_fn(k), color_fn(k), ann, ann]);
                k = k + 1;
            }

            var table = google.visualization.arrayToDataTable(data);
            new google.visualization.ColumnChart(el).draw(table, {
                title: title, titleTextStyle: {fontSize: 13, color: '#2c3e50'},
                hAxis: {title: x_title, titleTextStyle: {color: '#555'}, textStyle: {fontSize: 10}},
                vAxis: {title: y_title || 'P(X=k)', titleTextStyle: {color: '#555'}, minValue: 0},
                legend: {position: 'none'}, bar: {groupWidth: '80%'},
                annotations: {
                    alwaysOutside: true,
                    stem: {color: '#555', length: 8},
                    textStyle: {fontSize: 9, bold: true, color: '#2c3e50'}
                },
                width: w, height: h, chartArea: {left: 60, top: 40, width: '80%', height: '65%'}
            });

        /* ── LOI CONTINUE : ComboChart (aires + ligne de densite) ── */
        } else {

            /* Strategy : 4 series
               0 : aire rejet gauche   (rouge)
               1 : aire non-rejet      (bleu)
               2 : aire rejet droit    (rouge)
               3 : ligne densite       (bleu fonce, lineWidth=2, type=line)
               Chaque serie recoit la valeur yi sur son segment, 0 ailleurs.
               On insere des points EXACTEMENT aux valeurs critiques (x_crit_lo, x_crit_hi)
               pour que la frontiere soit verticale. */

            var step = (x_max - x_min) / n_points;

            /* Construire la liste des x en inserant les critiques exactement */
            var xs = [];
            var idx_i = 0;
            while (idx_i !== n_points + 1) {
                xs.push(x_min + idx_i * step);
                idx_i = idx_i + 1;
            }
            /* Inserer x_crit_lo et x_crit_hi s'ils sont dans les bornes */
            var crits = [];
            if (!isNaN(x_crit_lo) && Math.sign(x_crit_lo - x_min) !== -1 && Math.sign(x_crit_lo - x_max) !== 1) crits.push(x_crit_lo);
            if (!isNaN(x_crit_hi) && Math.sign(x_crit_hi - x_min) !== -1 && Math.sign(x_crit_hi - x_max) !== 1) crits.push(x_crit_hi);
            crits.forEach(function(xc) {
                /* Ajouter xc-epsilon et xc+epsilon pour obtenir une frontiere verticale */
                xs.push(xc - 1e-9);
                xs.push(xc);
                xs.push(xc + 1e-9);
            });
            /* Trier */
            xs.sort(function(a, b) { return a - b; });

            /* Annotations : trouver l'index le plus proche de chaque cible */
            var ann_targets = [];
            if (!isNaN(x_obs))     ann_targets.push({x: x_obs,     lbl: vname + '_obs='  + (Math.round(x_obs * 100) / 100)});
            if (!isNaN(x_sym))     ann_targets.push({x: x_sym,     lbl: vname + '_sym='  + (Math.round(x_sym * 100) / 100)});
            if (!isNaN(x_crit_lo)) ann_targets.push({x: x_crit_lo, lbl: vname + '_crit=' + (Math.round(x_crit_lo * 100) / 100)});
            if (!isNaN(x_crit_hi)) ann_targets.push({x: x_crit_hi, lbl: vname + '_crit=' + (Math.round(x_crit_hi * 100) / 100)});

            var ann_map = {};
            ann_targets.forEach(function(t) {
                var best = 0;
                var best_dist = Math.abs(xs[0] - t.x);
                var ii = 1;
                while (ii < xs.length) {
                    var d = Math.abs(xs[ii] - t.x);
                    if (Math.sign(d - best_dist) === -1) { best_dist = d; best = ii; }
                    ii = ii + 1;
                }
                ann_map[best] = t.lbl;
            });

            var data_cont = [['x', 'Rejet gauche', 'Non-rejet', 'Rejet droit', 'Densite',
                              {role: 'annotation'}, {role: 'annotationText'}]];

            var jj = 0;
            while (jj < xs.length) {
                var xi = xs[jj];
                var yi = pdf_fn(xi);
                if (!isFinite(yi) || Math.sign(yi) === -1) { jj = jj + 1; continue; }

                var in_lo = !isNaN(x_crit_lo) && Math.sign(xi - x_crit_lo) !== 1;
                var in_hi = !isNaN(x_crit_hi) && Math.sign(xi - x_crit_hi) !== -1;
                var is_rej = in_lo || in_hi;

                var ann_lbl = ann_map[jj] ? ann_map[jj] : null;
                data_cont.push([
                    xi,
                    (in_lo ? yi : 0),
                    (is_rej ? 0 : yi),
                    (in_hi ? yi : 0),
                    yi,
                    ann_lbl, ann_lbl
                ]);
                jj = jj + 1;
            }

            var table_cont = google.visualization.arrayToDataTable(data_cont);
            new google.visualization.ComboChart(el).draw(table_cont, {
                title: title, titleTextStyle: {fontSize: 13, color: '#2c3e50'},
                hAxis: {title: x_title, titleTextStyle: {color: '#555'}, textStyle: {fontSize: 10}},
                vAxis: {title: y_title || 'f(x)', titleTextStyle: {color: '#555'}, minValue: 0},
                seriesType: 'area',
                series: {
                    0: {color: '#e74c3c', areaOpacity: 0.35, lineWidth: 0},
                    1: {color: '#2980b9', areaOpacity: 0.35, lineWidth: 0},
                    2: {color: '#e74c3c', areaOpacity: 0.35, lineWidth: 0},
                    3: {color: '#2c3e50', areaOpacity: 0,    lineWidth: 2, type: 'line'}
                },
                legend: {position: 'none'},
                annotations: {
                    textStyle: {fontSize: 9, bold: true, color: '#2c3e50'},
                    stem: {color: '#555', length: 12}
                },
                width: w, height: h, chartArea: {left: 60, top: 40, width: '80%', height: '65%'}
            });
        }

        /* Legende */
        var legend_items = [
            {color: C_REJECT,   label: 'Zone de rejet de H0'},
            {color: C_NOREJECT, label: 'Zone de non-rejet de H0'}
        ];
        var legendDiv = document.createElement('div');
        legendDiv.style.cssText = 'display:flex; flex-wrap:wrap; gap:6px 14px;'
            + ' padding:6px 8px; font-size:12px; font-family:Arial,sans-serif;'
            + ' border-top:1px solid #eee; margin-top:2px;';
        legend_items.forEach(function(item) {
            var entry  = document.createElement('div');
            entry.style.cssText = 'display:flex; align-items:center; gap:5px;';
            var swatch = document.createElement('div');
            swatch.style.cssText = 'width:12px; height:12px; border-radius:2px;'
                + ' flex-shrink:0; background:' + item.color + ';';
            var lbl = document.createElement('span');
            lbl.textContent = item.label;
            entry.appendChild(swatch);
            entry.appendChild(lbl);
            legendDiv.appendChild(entry);
        });
        el.parentNode.insertBefore(legendDiv, el.nextSibling);
    });
}
/*==============================================================================================================================*/



/*==============================================================================================================================*/
/*  plot_distribution_plotly(div_id, law, params, x_obs, alpha, side, title, options)
/*
/*  Equivalent de plot_distribution() mais utilisant Plotly au lieu de Google Charts.
/*  Signature identique — aucune modification des appels existants necessaire.
/*
/*  Dependances (a charger avant ce script) :
/*    <script src="https://cdn.jsdelivr.net/npm/plotly.js-dist-min@3.5.0/plotly.min.js"></script>
/*    <script src="https://cdn.jsdelivr.net/npm/jstat@latest/dist/jstat.min.js"></script>
/*
/*  @param div_id  {string}  ID du <div> cible
/*  @param law     {string}  'normal' | 'student' | 'chisquare' | 'binomial' | 'poisson' | 'exponential' | 'uniform'
/*  @param params  {Array}   Parametres de la loi (identiques a plot_distribution)
/*  @param x_obs   {number}  Valeur observee
/*  @param alpha   {number}  Seuil (ex : 0.05)
/*  @param side    {string}  'bilateral' | 'left' | 'right'
/*  @param title   {string}  Titre du graphique (LaTeX $...$ accepte)
/*  @param options {object}  Facultatif : width, height, x_title, y_title, n_points, x_min, x_max
/*==============================================================================================================================*/

/* Active MathJax comme moteur LaTeX pour Plotly (appel unique, idempotent) */
if (window.Plotly && !window._plotlyMathJaxConfigured) {
    window.MathJax = window.MathJax || {};
    Plotly.setPlotConfig({ MathJaxConfig: 'v3' });
    window._plotlyMathJaxConfigured = true;
}

function plot_distribution_plotly(div_id, law, params, x_obs, alpha, side, title, options) {

    var opts     = options || {};
    var x_title  = opts.x_title  || 'x';
    var y_title  = opts.y_title  || 'f(x)';
    var n_points = opts.n_points || 300;

    /* helpers de comparaison sans operateurs < > (compatibilite STACK/Moodle) */
    var _lt  = function(a, b) { return Math.sign(a - b) === -1; };
    var _lte = function(a, b) { return Math.sign(a - b) !== 1; };
    var _gt  = function(a, b) { return Math.sign(a - b) === 1; };
    var _gte = function(a, b) { return Math.sign(a - b) !== -1; };

    /* ------------------------------------------------------------------ */
    /* Couleurs fixes (fond blanc, texte noir)                              */
    /* ------------------------------------------------------------------ */
    var C_REJECT       = 'rgba(226,75,74,0.30)';
    var C_REJECT_SOLID = 'rgba(226,75,74,0.55)';
    var C_NOREJECT     = 'rgba(55,138,221,0.15)';
    var C_OBS          = '#EF9F27';
    var C_CRIT         = '#E24B4A';
    var C_CURVE        = '#378ADD';
    var C_REJECT_BAR   = 'rgba(226,75,74,0.70)';
    var C_NOREJECT_BAR = 'rgba(55,138,221,0.55)';
    var C_TEXT         = '#1a1a1a';
    var C_GRID         = 'rgba(0,0,0,0.10)';

    /* ------------------------------------------------------------------ */
    /* Fonctions jStat                                                      */
    /* ------------------------------------------------------------------ */
    var pdf_fn = function(x) {
        if (law === 'normal')      return jStat.normal.pdf(x, params[0], params[1]);
        if (law === 'student')     return jStat.studentt.pdf(x, params[0]);
        if (law === 'chisquare')   return jStat.chisquare.pdf(x, params[0]);
        if (law === 'binomial')    return jStat.binomial.pdf(x, params[0], params[1]);
        if (law === 'poisson')     return jStat.poisson.pdf(x, params[0]);
        if (law === 'exponential') return jStat.exponential.pdf(x, params[0]);
        if (law === 'uniform')     return jStat.uniform.pdf(x, params[0], params[1]);
        return 0;
    };

    var cdf_fn = function(x) {
        if (law === 'normal')      return jStat.normal.cdf(x, params[0], params[1]);
        if (law === 'student')     return jStat.studentt.cdf(x, params[0]);
        if (law === 'chisquare')   return jStat.chisquare.cdf(x, params[0]);
        if (law === 'binomial')    return jStat.binomial.cdf(x, params[0], params[1]);
        if (law === 'poisson')     return jStat.poisson.cdf(x, params[0]);
        if (law === 'exponential') return jStat.exponential.cdf(x, params[0]);
        if (law === 'uniform')     return jStat.uniform.cdf(x, params[0], params[1]);
        return 0;
    };

    var inv_fn = function(p) {
        if (law === 'normal')      return jStat.normal.inv(p, params[0], params[1]);
        if (law === 'student')     return jStat.studentt.inv(p, params[0]);
        if (law === 'chisquare')   return jStat.chisquare.inv(p, params[0]);
        if (law === 'exponential') return jStat.exponential.inv(p, params[0]);
        if (law === 'uniform')     return jStat.uniform.inv(p, params[0], params[1]);
        return NaN;
    };

    var is_discrete = (law === 'binomial' || law === 'poisson');

    /* ------------------------------------------------------------------ */
    /* Valeurs critiques                                                    */
    /* ------------------------------------------------------------------ */
    var x_crit_lo = NaN;
    var x_crit_hi = NaN;
    var a_side = (side === 'bilateral') ? alpha / 2 : alpha;

    if (is_discrete) {
        var n_max = (law === 'binomial') ? params[0] : Math.round(params[0] * 10);
        if (side === 'bilateral' || side === 'left') {
            var ki = 0;
            while (_lt(ki, n_max) && _lte(cdf_fn(ki), a_side)) ki++;
            x_crit_lo = ki - 1;
        }
        if (side === 'bilateral' || side === 'right') {
            var ks = n_max;
            while (_gt(ks, 0) && _lte(1 - cdf_fn(ks - 1), a_side)) ks--;
            x_crit_hi = ks + 1;
        }
    } else {
        if (side === 'bilateral') {
            x_crit_lo = inv_fn(alpha / 2);
            x_crit_hi = inv_fn(1 - alpha / 2);
        } else if (side === 'left') {
            x_crit_lo = inv_fn(alpha);
        } else {
            x_crit_hi = inv_fn(1 - alpha);
        }
    }

    /* ------------------------------------------------------------------ */
    /* Valeur symetrique pour test bilateral                                */
    /* x_sym : plus petite valeur telle que P(X=x_sym) <= P(X=x_obs)      */
    /* du cote oppose a x_obs par rapport a la moyenne                     */
    /* ------------------------------------------------------------------ */
    var x_sym = NaN;
    if (side === 'bilateral' && !isNaN(x_obs)) {
        if (is_discrete) {
            var p_obs = pdf_fn(Math.round(x_obs));
            var mu_d  = (law === 'binomial') ? params[0] * params[1] : params[0];
            var j_sym;
            if (_gt(x_obs, mu_d)) {
                j_sym = Math.floor(mu_d);
                while (_gt(j_sym, 0) && _gt(pdf_fn(j_sym), p_obs)) j_sym--;
            } else {
                j_sym = Math.ceil(mu_d);
                var n_disc = (law === 'binomial') ? params[0] : Math.round(params[0] * 10);
                while (_lt(j_sym, n_disc) && _gt(pdf_fn(j_sym), p_obs)) j_sym++;
            }
            x_sym = j_sym;
        } else {
            x_sym = 2 * inv_fn(0.5) - x_obs;
        }
    }

    /* ------------------------------------------------------------------ */
    /* Bornes du graphique                                                  */
    /* ------------------------------------------------------------------ */
    var x_min, x_max;
    if (opts.x_min !== undefined && opts.x_max !== undefined) {
        x_min = opts.x_min;
        x_max = opts.x_max;
    } else if (is_discrete) {
        var mu_d2 = (law === 'binomial') ? params[0] * params[1] : params[0];
        var sd_d  = (law === 'binomial')
                  ? Math.sqrt(params[0] * params[1] * (1 - params[1]))
                  : Math.sqrt(params[0]);
        x_min = Math.max(0, Math.floor(mu_d2 - 4 * sd_d));
        x_max = Math.min(
            (law === 'binomial' ? params[0] : mu_d2 + 6 * sd_d),
            Math.ceil(mu_d2 + 4 * sd_d)
        );
    } else {
        x_min = inv_fn(0.0005);
        x_max = inv_fn(0.9995);
        if (!isFinite(x_min) || isNaN(x_min)) x_min = -5;
        if (!isFinite(x_max) || isNaN(x_max)) x_max =  5;
    }
    if (!isNaN(x_obs) && _gt(x_obs, x_max)) x_max = x_obs + 1;
    if (!isNaN(x_obs) && _lt(x_obs, x_min)) x_min = x_obs - 1;
    if (!isNaN(x_sym) && _gt(x_sym, x_max)) x_max = x_sym + 1;
    if (!isNaN(x_sym) && _lt(x_sym, x_min)) x_min = x_sym - 1;

    /* ------------------------------------------------------------------ */
    /* Helpers labels                                                       */
    /* ------------------------------------------------------------------ */
    var _bare = function(s) {
        return (s.charAt(0) === '$' && s.charAt(s.length - 1) === '$')
               ? s.slice(1, s.length - 1) : s;
    };
    var _fmt = function(v) { return Math.round(v * 1000) / 1000; };

    var _latex_ann = function(subscript, val) {
        return '$' + _bare(x_title) + '_{\\text{' + subscript + '}} = ' + _fmt(val) + '$';
    };

    /* ------------------------------------------------------------------ */
    /* Annotations : fleches verticales sur la courbe                      */
    /* obs et sym : orange, crit : rouge                                   */
    /* ------------------------------------------------------------------ */
    var annotations = [];

    var _make_ann = function(xv, y_anchor, latex_lbl, color) {
        return {
            x: xv, y: y_anchor,
            xref: 'x', yref: 'y',
            text: latex_lbl,
            showarrow: true, arrowhead: 2, arrowcolor: color,
            ax: 0, ay: -45,
            axref: 'pixel', ayref: 'pixel',
            font: { color: color, size: 11 },
            bgcolor: 'rgba(255,255,255,0.95)',
            bordercolor: color, borderwidth: 1, borderpad: 3
        };
    };

    if (!isNaN(x_obs)) {
        var y_obs = pdf_fn(x_obs);
        if (!isFinite(y_obs) || isNaN(y_obs)) y_obs = 0;
        annotations.push(_make_ann(x_obs, y_obs, _latex_ann('obs', x_obs), C_OBS));
    }
    if (!isNaN(x_sym)) {
        var y_sym = pdf_fn(x_sym);
        if (!isFinite(y_sym) || isNaN(y_sym)) y_sym = 0;
        annotations.push(_make_ann(x_sym, y_sym, _latex_ann('sym', x_sym), C_OBS));
    }
    if (!isNaN(x_crit_lo)) {
        var y_clo = pdf_fn(x_crit_lo);
        if (!isFinite(y_clo) || isNaN(y_clo)) y_clo = 0;
        annotations.push(_make_ann(x_crit_lo, y_clo, _latex_ann('crit', x_crit_lo), C_CRIT));
    }
    if (!isNaN(x_crit_hi)) {
        var y_chi2 = pdf_fn(x_crit_hi);
        if (!isFinite(y_chi2) || isNaN(y_chi2)) y_chi2 = 0;
        annotations.push(_make_ann(x_crit_hi, y_chi2, _latex_ann('crit', x_crit_hi), C_CRIT));
    }

    /* ------------------------------------------------------------------ */
    /* Legendes                                                           */
    /* ------------------------------------------------------------------ */
    var legend_traces = [
        {
            x: [null], y: [null], type: 'scatter', mode: 'markers',
            marker: { color: C_REJECT_SOLID, size: 14, symbol: 'square' },
            name: 'Zone de rejet de H₀',
            showlegend: true, hoverinfo: 'skip'
        },
        {
            x: [null], y: [null], type: 'scatter', mode: 'markers',
            marker: { color: C_NOREJECT, size: 14, symbol: 'square' },
            name: 'Zone de non-rejet de H₀',
            showlegend: true, hoverinfo: 'skip'
        },
        {
            x: [null], y: [null], type: 'scatter', mode: 'markers',
            marker: {
                color: 'rgba(0,0,0,0)', size: 14, symbol: 'square',
                line: { color: C_OBS, width: 2 }
            },
            name: 'Zone au moins aussi extrême que la valeur observée',
            showlegend: true, hoverinfo: 'skip'
        }
    ];

    /* ------------------------------------------------------------------ */
    /* Layout commun                                                        */
    /* ------------------------------------------------------------------ */
    var layout = {
        title: { text: title, font: { size: 14, color: C_TEXT } },
        xaxis: {
            title: { text: x_title, font: { size: 12, color: C_TEXT } },
            color: C_TEXT, gridcolor: C_GRID, zeroline: false, tickcolor: C_TEXT
        },
        yaxis: {
            title: { text: y_title, font: { size: 12, color: C_TEXT } },
            color: C_TEXT, gridcolor: C_GRID, zeroline: false, tickcolor: C_TEXT
        },
        paper_bgcolor: '#ffffff',
        plot_bgcolor:  '#ffffff',
        font: { family: 'Arial,sans-serif', color: C_TEXT },
        annotations: annotations,
        showlegend: true,
        legend: {
            orientation: 'h', x: 0, y: -0.22,
            font: { size: 11, color: C_TEXT },
            bgcolor: 'rgba(255,255,255,0)',
            borderwidth: 0
        },
        margin: { l: 60, r: 30, t: 80, b: 100 }
    };

    var plotly_opts = { responsive: true, displayModeBar: false, mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js' };

    /* ------------------------------------------------------------------ */
    /* LOI DISCRETE                                                       */
    /* ------------------------------------------------------------------ */
    if (is_discrete) {

        var p_obs_d = (!isNaN(x_obs)) ? pdf_fn(Math.round(x_obs)) : -1;

        var ks_arr     = [];
        var pmf_arr    = [];
        var col_arr    = [];
        var border_arr   = [];
        var border_w_arr = [];

        var k_iter = Math.round(x_min);
        while (_lte(k_iter, Math.round(x_max))) {
            ks_arr.push(k_iter);
            var pmf_k = pdf_fn(k_iter);
            pmf_arr.push(pmf_k);

            var is_rej  = (!isNaN(x_crit_lo) && _lte(k_iter, x_crit_lo))
                       || (!isNaN(x_crit_hi) && _gte(k_iter, x_crit_hi));
            
            if (is_rej) {
                col_arr.push(C_REJECT_BAR);
            } else {
                col_arr.push(C_NOREJECT_BAR);
            }
            
            var k_r = Math.round(x_obs);
            var k_s = !isNaN(x_sym) ? Math.round(x_sym) : NaN;
            var on_obs_side = _gte(k_iter, k_r);
            var on_sym_side = !isNaN(k_s) && _lte(k_iter, k_s);
            var is_extreme = (!isNaN(x_obs)
                              && _lte(pmf_k, p_obs_d)
                              && (on_obs_side || on_sym_side));
            
            if (is_extreme) {
                border_arr.push(C_OBS);
                border_w_arr.push(1);
            } else {
                border_arr.push('rgba(0,0,0,0)');
                border_w_arr.push(0);
            }
            
            k_iter++;
        }

        var bare_xt = _bare(x_title);
        var bare_yt = _bare(y_title);
        var trace_d = {
            x: ks_arr, y: pmf_arr, type: 'bar',
            marker: {
                color: col_arr,
                line: { color: border_arr, width: border_w_arr }
            },
            hovertemplate: bare_xt + ' = %{x}<br>' + bare_yt + ' = %{y:.5f}<extra></extra>',
            showlegend: false
        };

        Plotly.newPlot(div_id, [trace_d].concat(legend_traces), layout, plotly_opts);

    /* ------------------------------------------------------------------ */
    /* LOI CONTINUE                                                       */
    /* La bordure orange suit UNIQUEMENT la courbe et l'axe des x         */
    /* Pas de ligne verticale aux bornes de la zone (open_start/open_end) */
    /* ------------------------------------------------------------------ */
    } else {

        var step = (x_max - x_min) / n_points;

        var xs = [];
        var ii = 0;
        while (_lte(ii, n_points)) {
            xs.push(x_min + ii * step);
            ii++;
        }
        if (!isNaN(x_crit_lo)) {
            xs.push(x_crit_lo - 1e-9);
            xs.push(x_crit_lo);
            xs.push(x_crit_lo + 1e-9);
        }
        if (!isNaN(x_crit_hi)) {
            xs.push(x_crit_hi - 1e-9);
            xs.push(x_crit_hi);
            xs.push(x_crit_hi + 1e-9);
        }
        xs.sort(function(a, b) { return a - b; });

        var ys = [];
        var jj = 0;
        while (_lt(jj, xs.length)) {
            var yv = pdf_fn(xs[jj]);
            ys.push((isFinite(yv) && _gte(yv, 0)) ? yv : 0);
            jj++;
        }

        var y_max_c = 0;
        var mm = 0;
        while (_lt(mm, ys.length)) { if (_gt(ys[mm], y_max_c)) y_max_c = ys[mm]; mm++; }

        var bare_xt2 = _bare(x_title);
        var bare_yt2 = _bare(y_title);

        /* Zone extreme : contour orange qui suit la courbe et l'axe des x */
        var extreme_traces = [];

        /* Version originale avec open_start et open_end pour eviter les lignes verticales */
        var _add_extreme_zone = function(xa, xb, open_start, open_end) {
            var xZ = [], yZ = [];
            var hz = 0;
            while (_lt(hz, xs.length)) {
                if (_gte(xs[hz], xa) && _lte(xs[hz], xb)) {
                    xZ.push(xs[hz]); 
                    yZ.push(ys[hz]);
                }
                hz++;
            }
            if (!xZ.length) return;
            
            var contour_x, contour_y;
            var y_at_xa = 0;
            var y_at_xb = 0;
            
            // Trouver les valeurs y aux bornes
            for (var idx = 0; idx < xs.length; idx++) {
                if (Math.abs(xs[idx] - xa) < 1e-9) y_at_xa = ys[idx];
                if (Math.abs(xs[idx] - xb) < 1e-9) y_at_xb = ys[idx];
            }
            
            if (open_start && open_end) {
                contour_x = [xa].concat(xZ).concat([xb]);
                contour_y = [y_at_xa].concat(yZ).concat([y_at_xb]);
            } 
            else if (open_start && !open_end) {
                contour_x = [xa].concat(xZ).concat([xb, xb]);
                contour_y = [y_at_xa].concat(yZ).concat([y_at_xb, 0]);
            }
            else if (!open_start && open_end) {
                contour_x = [xa, xa].concat(xZ).concat([xb]);
                contour_y = [0, y_at_xa].concat(yZ).concat([y_at_xb]);
            }
            else {
                contour_x = [xa, xa].concat(xZ).concat([xb, xb]);
                contour_y = [0, y_at_xa].concat(yZ).concat([y_at_xb, 0]);
            }
            
            extreme_traces.push({
                x: contour_x,
                y: contour_y,
                type: 'scatter', mode: 'lines',
                fill: 'none',
                line: { color: C_OBS, width: 2 },
                name: '', hoverinfo: 'skip', showlegend: false
            });
        };

        if (!isNaN(x_obs)) {
            if (side === 'right') {
                _add_extreme_zone(x_obs, x_max, true, false);
            }
            else if (side === 'left') {
                _add_extreme_zone(x_min, x_obs, false, true);
            }
            else if (side === 'bilateral') {
                if (!isNaN(x_sym)) {
                    _add_extreme_zone(x_min, x_sym, false, true);
                }
                _add_extreme_zone(x_obs, x_max, true, false);
            }
        }

        /* Remplissage bleu */
        var traces = [{
            x: xs, y: ys,
            type: 'scatter', mode: 'lines', fill: 'tozeroy',
            fillcolor: C_NOREJECT,
            line: { color: 'rgba(0,0,0,0)', width: 0 },
            hovertemplate: bare_xt2 + ' = %{x:.4f}<br>' + bare_yt2 + ' = %{y:.5f}<extra></extra>',
            name: '', showlegend: false
        }];

        /* Zone de rejet gauche */
        if (!isNaN(x_crit_lo)) {
            var xRL = [], yRL = [];
            var rr = 0;
            while (_lt(rr, xs.length)) {
                if (_lte(xs[rr], x_crit_lo)) { xRL.push(xs[rr]); yRL.push(ys[rr]); }
                rr++;
            }
            if (xRL.length) {
                traces.push({
                    x: [xRL[0]].concat(xRL).concat([xRL[xRL.length - 1]]),
                    y: [0].concat(yRL).concat([0]),
                    type: 'scatter', mode: 'lines', fill: 'tozeroy',
                    fillcolor: C_REJECT, line: { color: C_CRIT, width: 0 },
                    name: '', hoverinfo: 'skip', showlegend: false
                });
            }
        }

        /* Zone de rejet droite */
        if (!isNaN(x_crit_hi)) {
            var xRR = [], yRR = [];
            var ss = 0;
            while (_lt(ss, xs.length)) {
                if (_gte(xs[ss], x_crit_hi)) { xRR.push(xs[ss]); yRR.push(ys[ss]); }
                ss++;
            }
            if (xRR.length) {
                traces.push({
                    x: [xRR[0]].concat(xRR).concat([xRR[xRR.length - 1]]),
                    y: [0].concat(yRR).concat([0]),
                    type: 'scatter', mode: 'lines', fill: 'tozeroy',
                    fillcolor: C_REJECT, line: { color: C_CRIT, width: 0 },
                    name: '', hoverinfo: 'skip', showlegend: false
                });
            }
        }

        /* Courbe principale */
        traces.push({
            x: xs, y: ys,
            type: 'scatter', mode: 'lines',
            line: { color: C_CURVE, width: 2 },
            hoverinfo: 'skip', name: '', showlegend: false
        });

        /* Lignes verticales x_obs et x_sym (pointillees) */
        if (!isNaN(x_obs)) {
            var y_obs_top = pdf_fn(x_obs);
            if (!isFinite(y_obs_top) || y_obs_top === 0) y_obs_top = y_max_c * 0.9;
            traces.push({
                x: [x_obs, x_obs], y: [0, y_obs_top * 1.15],
                type: 'scatter', mode: 'lines',
                line: { color: C_OBS, width: 2, dash: 'dot' },
                name: '', hoverinfo: 'skip', showlegend: false
            });
        }

        if (!isNaN(x_sym)) {
            var y_sym_top = pdf_fn(x_sym);
            if (!isFinite(y_sym_top) || y_sym_top === 0) y_sym_top = y_max_c * 0.9;
            traces.push({
                x: [x_sym, x_sym], y: [0, y_sym_top * 1.15],
                type: 'scatter', mode: 'lines',
                line: { color: C_OBS, width: 2, dash: 'dot' },
                name: '', hoverinfo: 'skip', showlegend: false
            });
        }

        traces = traces.concat(extreme_traces);
        Plotly.newPlot(div_id, traces.concat(legend_traces), layout, plotly_opts);
    }
}
/*==============================================================================================================================*/
