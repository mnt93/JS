
    function random() {

        var x = Math.sin(6 + seed++) * 10000;

        return x - Math.floor(x);

    }



    function significant_digits(x, n, sci)

    {

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

        sorted_array = array.sort(function(a, b) {
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

        sorted_array = array.sort(function(a, b) {
            return a - b
        })

        min = sorted_array[0] / 1

        return min

    }



    function max(array) {

        sorted_array = array.sort(function(a, b) {
            return a - b
        })

        max = sorted_array[sorted_array.length - 1] / 1

        return max

    }









    function compte_valeurs_a_droite(x, xmax, n) { // combien de valeurs possibles entre x0 et xmax pour n chiffres significatifs

        nsup = 0;

        x = significant_digits(x, n, 2);

        xmax = significant_digits(xmax, n, 2);

        for (i = Math.ceil(Math.log10(x)); i <= Math.ceil(Math.log10(xmax)); i++)

        {

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

        for (i = Math.ceil(Math.log10(xmin)); i <= Math.ceil(Math.log10(x)); i++)

        {

            d = Math.pow(10, Math.ceil(Math.log10(xmin))) / Math.pow(10, (n - Math.floor(xmin / Math.pow(10, Math.ceil(Math.log10(xmin))))));

            ninf = ninf + (Math.min(x, Math.pow(10, i)) - xmin) / d

            xmin = Math.pow(10, i);

        }

        return Math.round(ninf)

    }



    function quantile(s, q, k) {

        s = s.sort(function(a, b) {
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

        with(Math) {

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

        with(Math) {

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

        with(Math) {

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


    function getIntervalArray(x1, x2, n, rang, Nb_reponses, sci) {

        if (Math.sign(x1 * x2) < 0) {

            Interval1 = getArray(x1, n, rang, Nb_reponses, sci)

            Interval2 = getArray(x2, n, rang, Nb_reponses, sci)

        } else {

            Interval1 = getArray(x1, n, rang, Nb_reponses, sci)

            Interval2 = getArray(x2, n, Nb_reponses - rang + 1, Nb_reponses, sci)

            Interval2 = Interval2.reverse();

        }

        IntervalArray = new Array;

        for (j = 0; j < Nb_reponses; j++) {

            IntervalArray[j] = "[" + Interval1[j] + ";" + Interval2[j] + "]";

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

    function Create_MLR_Data(rows, Intercept, coeff_X, mean_X, sigma_X, sigma_Y, Col_Names, myrng) {
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

                    function plot_line(array, emplacement_courbe = "emplacement_courbe", line_title = "", hAxes_title = array[0][0], vAxes_title = array[0][1],chartArea_width=250,chartArea_height=250,) {
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

    function data_from_function(func, Xrange, ColNames = ['X', 'Y']) {
        nerdamer.setFunction('f', ['x'], func);
        var data = new Array()
        data[0] = ColNames;
        for (var i = 0; i < 1000; i++) {
            data[i + 1] = new Array();
            data[i + 1] = [Xrange[0] + i / 1000 * (Xrange[1] - Xrange[0]), Number(nerdamer('f(' + Xrange[0] + i / 1000 * (Xrange[1] - Xrange[0]) + ')'))]
        }

        return data

    }

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


   function getArray(x, n, rang, Nb_reponses, sci, Num_question,myrng) {

        absx = Math.abs(x);
        var reponse = new Array;

        if (parseInt(x) == x && x > 0) { //&& x<=10
 
            shift=Math.floor(myrng() * 10) ;
            shift=Math.min(...[shift-1,x-1])
            if (x<=10) {shift=x-1}

            var reponse = Array.from({length: Nb_reponses}, (_, i) => i+x-shift);
            reponse.splice(shift, 1);

            if (x!=rang) {

            reponse= reponse.sort((a, b) => 0.5 - myrng()); // permutation aleatoire des elements du tableau
            }
            reponse.splice(rang-1, 0, x);
             
            document.getElementsByTagName("emplacement_nombre_chiffres_significatifs_ext")[ (Num_question - 1)].setAttribute("id", "emplacement_nombre_chiffres_significatifs_ext" + Num_question)
            document.getElementById("emplacement_nombre_chiffres_significatifs_ext" + Num_question).innerHTML=''

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

// Fonction calculant l'opposé du logarithme de la vraissemblance pour la régression logistique connaissant les valeurs des variables explicatives et de la variable réponse.
function minus_log_likelihood_x(beta) {
  return minus_log_likelihood(beta, X, y)
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
      crit=Math.sqrt(p.reduce((acc, pi) => acc + pi ** 2, 0))
    } 
    else {
      x=x-p
      crit=Math.sqrt(p*p)
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
       grad[i] = (f(x.map((xi, j) => xi + hVec[j]), {...args}) - f(x.map((xi, j) => xi - hVec[j]), {...args})) / (2 * h);
     } else {
       grad = (f(x[0] + h, {...args}) - f(x[0], {...args})) / (2 * h);
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
        hess[i][j] = (f(x.map((xi, k) => xi + hVecI[k] + hVecJ[k]), {...args}) - f(x.map((xi, k) => xi + hVecI[k] - hVecJ[k]), {...args}) - f(x.map((xi, k) => xi - hVecI[k] + hVecJ[k]), {...args}) + f(x.map((xi, k) => xi - hVecI[k] - hVecJ[k]), {...args})) / (4 * h ** 2);
        hess[j][i] = hess[i][j];
      } else {
        hess = (f(x[0] + h, {...args}) - 2 * f(x[0], {...args}) + f(x[0] - h, {...args})) / (h * h);

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

function conf_int_logistic_reg(beta0, args = {}) {
  let conf_int = new Array(beta0.length).fill(0);
  let SD = new Array(beta0.length).fill(0);
  for (let j = 0; j < beta0.length; j++) {
    SD[j] = math.sqrt(math.diag(math.inv(hessian_matrix(minus_log_likelihood, beta0, args))))[j];

    let teta0 = beta0[j];

    let gamma0 = beta0.filter((_, index) => index !== j);
	// La fonction profile_likelihood calcul la valeur du jeme element de beta (teta) pour lequel le logarithme de la vraissemblance (maximisé par rapport aux autres elements de beta : gamma) est egale au 95eme percentile du maximum global de ce logarithme
    let profile_likelihood = function(teta,args = {}) {
      let h = function(gamma,args = {}) {
        let beta = gamma;
        beta.splice(j, 0, teta); // insérer teta dans beta à la position j
        let ff = Math.pow(minus_log_likelihood(beta, args), 2);
        return ff;
      };

      let gamma = newtonMethod(h, gamma0, args); 
      // cherche la valeur des coeff de beta correspondant au maximum de vraissemblance lorsque la valeur du jeme coeff de beta vaut teta.

      let beta = gamma;
      beta.splice(j, 0, teta); 
      // insérer teta dans beta à la position j

      return math.pow((minus_log_likelihood(beta, args) - minus_log_likelihood(beta0, args) - jStat.chisquare.inv(0.95, 1) / 2), 2);
    };

	conf_int[j]=new Array(2).fill(0);

    conf_int[j][0] = newtonMethod(profile_likelihood, teta0 - 2 * SD[j], args);
    conf_int[j][1] = newtonMethod(profile_likelihood, teta0 + 2 * SD[j], args);
  }
  
  return conf_int
}

/*==============================================================================================================================*/
//Fabrique un jeu de donnees pour une regression logistique

function Create_Log_Reg_Data(N, beta, mean_X, sigma_X, Col_Names, myrng) {

  var data = new Array()
  var K = beta.length+1 // nombre de variables explicatives
  var Precision = 3
  data[0] = Col_Names;

  x = Array.from(Array(N), () => new Array(K - 1).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < K - 1; j++) {
      x[i][j] = jStat.normal.inv(myrng(),mean_X[j], sigma_X[j]).toPrecision(3);
    }
  }

  // Ajout d'un intercept (colonne de 1) aux données d'entraînement
  if (Array.isArray(x[0])) {
    var X = x.map((xi) => [1, ...xi]);
  } else {
    var X = x.map((xi) => [1, xi]);
  }

	beta.splice(0,0,-math.dot(mean_X, beta))


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

                    function scatter_plot(array, emplacement_courbe = "emplacement_courbe", line_title = "", hAxes_title = array[0][0], vAxes_title = array[0][1],chartArea_width=250,chartArea_height=250,) {
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