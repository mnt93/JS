
/*==============================================================================================================================*/
/* moodle.js — Bibliothèque de fonctions JavaScript pour les exercices Moodle de biostatistiques
/*
/* ORGANISATION DU FICHIER :
/*   1. Générateur de nombres aléatoires reproductibles
/*   2. Formatage des nombres (chiffres significatifs, notation scientifique)
/*   3. Génération des réponses proposées dans les QCM
/*   4. Statistiques descriptives (médiane, min, max, moyenne, variance, écart-type, quantiles)
/*   5. Comptage de valeurs à chiffres significatifs fixes
/*   6. Combinatoire et lois de probabilité discrètes (binomiale, hypergéométrique)
/*   7. Fonctions auxiliaires numériques (LogGamma, Betinc, factorielle)
/*   8. Loi de Student (tcdf, t-test, p-value)
/*   9. Fonctions thermodynamiques (rosée, ébullition, cherche_racine)
/*  10. Visualisation via Google Charts (courbes, histogrammes, nuages de points)
/*  11. Génération de données simulées (MLR, Student, Chi-deux, régression logistique)
/*  12. Modèles statistiques (régression linéaire multiple, test du Chi-deux)
/*  13. Optimisation numérique (méthode de Newton, gradient, hessienne)
/*  14. Régression logistique (vraisemblance, intervalles de confiance par profil)
/*  15. Affichage de tableaux HTML et import/export (Excel, texte)
/*  16. Tracé de densités avec zones colorées — plot_density (Google Charts)
/*==============================================================================================================================*/


/*==============================================================================================================================*/
/* SECTION 1 — GÉNÉRATEUR DE NOMBRES ALÉATOIRES REPRODUCTIBLES
/*
/* Utilise une graine globale `seed` (variable externe) pour produire des tirages
/* pseudo-aléatoires déterministes via une transformation sinusoïdale.
/* Permet de reproduire exactement le même jeu de questions à chaque chargement
/* si `seed` est initialisée avec la même valeur (ex. : identifiant de tentative Moodle).
/*==============================================================================================================================*/

/* random() — Retourne un nombre pseudo-aléatoire dans [0, 1[
/* Dépend de la variable globale `seed` (incrémentée à chaque appel).
/* Algorithme : x = sin(6 + seed) * 10000, puis partie fractionnaire de x. */
function random() {

    var x = Math.sin(6 + seed++) * 10000;

    return x - Math.floor(x);

}



/*==============================================================================================================================*/
/* SECTION 2 — FORMATAGE DES NOMBRES
/*==============================================================================================================================*/

/* significant_digits(x, n, sci) — Formate x avec n chiffres significatifs.
/*
/* @param x   {number}  Nombre à formater.
/* @param n   {number}  Nombre de chiffres significatifs souhaité.
/* @param sci {number}  Mode d'affichage :
/*                        0 → notation décimale standard   (ex. 0.00314)
/*                        1 → notation HTML puissance       (ex. 3.14 10<sup>-3</sup>)
/*                        2 → notation exponentielle "e"    (ex. 3.14e-3)
/* @returns   {string}  Chaîne de caractères représentant x formaté. */
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







/*==============================================================================================================================*/
/* SECTION 3 — GÉNÉRATION DES RÉPONSES PROPOSÉES (QCM)
/*
/* Ces fonctions construisent les listes de réponses incorrectes (distracteurs)
/* autour de la bonne réponse, en respectant la cohérence des chiffres significatifs.
/* Elles injectent également les réponses dans le DOM Moodle (balises R{Q}{i}).
/*==============================================================================================================================*/

/* getRandomValue(x, n, c0, c1, sci) — Retourne une valeur aléatoire proche de x,
/* différente de x à n chiffres significatifs près, comprise entre c0*x et c1*x.
/* La distribution est calibrée pour que la médiane des tirages soit égale à x.
/*
/* @param x   {number}  Valeur de référence (bonne réponse).
/* @param n   {number}  Nombre de chiffres significatifs.
/* @param c0  {number}  Borne inférieure du facteur multiplicatif (ex. 0.5).
/* @param c1  {number}  Borne supérieure du facteur multiplicatif (ex. 1.5).
/* @param sci {number}  Mode de formatage (0/1/2 — voir significant_digits).
/* @returns   {string}  Valeur formatée différente de x. */
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







/*==============================================================================================================================*/
/* SECTION 4 — STATISTIQUES DESCRIPTIVES
/*==============================================================================================================================*/

/* mediane(array) — Retourne la médiane d'un tableau de nombres.
/* Utilise la convention interpolée : moyenne des deux valeurs centrales si effectif pair. */
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



/* min(array) — Retourne la valeur minimale d'un tableau de nombres. */
function min(array) {

    sorted_array = array.sort(function (a, b) {
        return a - b
    })

    min = sorted_array[0] / 1

    return min

}



/* max(array) — Retourne la valeur maximale d'un tableau de nombres. */
function max(array) {

    sorted_array = array.sort(function (a, b) {
        return a - b
    })

    max = sorted_array[sorted_array.length - 1] / 1

    return max

}









/*==============================================================================================================================*/
/* SECTION 5 — COMPTAGE ET ENUMÉRATION DE VALEURS À CHIFFRES SIGNIFICATIFS FIXES
/*
/* Ces fonctions calculent combien de valeurs distinctes (à n chiffres significatifs)
/* existent dans un intervalle donné. Elles servent à construire les distracteurs
/* en s'assurant qu'il y a suffisamment de valeurs disponibles autour de la bonne réponse.
/*==============================================================================================================================*/

/* compte_valeurs_a_droite(x, xmax, n) — Compte le nombre de valeurs à n chiffres
/* significatifs comprises entre x (exclu) et xmax (inclus).
/* Gère les franchissements de puissance de 10 (ex. de 9.9 à 10.0). */
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



/* compte_valeurs_a_gauche(x, xmin, n) — Compte le nombre de valeurs à n chiffres
/* significatifs comprises entre xmin (inclus) et x (exclu). */
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



/* quantile(s, q, k) — Retourne le quantile d'ordre k/q d'un échantillon s.
/* Utilise la méthode d'interpolation linéaire (type 7 de R).
/* @param s {Array}  Echantillon de valeurs numériques.
/* @param q {number} Dénominateur (ex. 4 pour les quartiles, 100 pour les centiles).
/* @param k {number} Numérateur  (ex. 1 pour le 1er quartile Q1, 75 pour P75). */
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



/* sum(a) — Retourne la somme des éléments du tableau a. */
function sum(a) {

    s = 0;

    for (j = 0; j < a.length; j++) {

        s = s + a[j];

    }

    return s

}



/* mean(a) — Retourne la moyenne arithmétique du tableau a. */
function mean(a) {

    m = sum(a) / a.length;

    return m

}



/* variance(a) — Retourne la variance empirique corrigée (diviseur n-1) du tableau a. */
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



/* sd(a) — Retourne l'écart-type empirique corrigé (racine de la variance n-1) du tableau a. */
function sd(a) {

    v = variance(a)

    s = Math.pow(v, 0.5)

    return s

}



/* valeurs_a_droite(x, rang, Nb_reponses, n) — Retourne un tableau des valeurs supérieures
/* à x à n chiffres significatifs, dans l'ordre croissant.
/* Utilisé pour construire les distracteurs placés après la bonne réponse dans le QCM. */
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



/* valeurs_a_gauche(x, rang, n) — Retourne un tableau des valeurs inférieures
/* à x à n chiffres significatifs, dans l'ordre décroissant.
/* Utilisé pour construire les distracteurs placés avant la bonne réponse dans le QCM. */
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











































/*==============================================================================================================================*/
/* SECTION 6 — COMBINATOIRE ET LOIS DE PROBABILITÉ DISCRÈTES
/*==============================================================================================================================*/

/* factorial(n) — Retourne n! (factorielle de n) par récursion mémoïsée.
/* Cas de base : 0! = 1! = 1. */
function factorial(n) {

    var f = [];

    if (n == 0 || n == 1)

        return 1;

    if (f[n] > 0)

        return f[n];

    return f[n] = factorial(n - 1) * n;

}





/* C(n, k) — Retourne le coefficient binomial "n choose k" = n! / (k! * (n-k)!). */
function C(n, k) {

    return factorial(n) / factorial(k) / factorial(n - k);

}



/* hyper_pdf(np, n, Np, N) — Probabilité de la loi hypergéométrique H(N, Np, n).
/* P(X = np) = C(Np, np) * C(N-Np, n-np) / C(N, n)
/* @param np  {number}  Nombre de "succès" observés dans l'échantillon.
/* @param n   {number}  Taille de l'échantillon.
/* @param Np  {number}  Nombre de "succès" dans la population.
/* @param N   {number}  Taille de la population. */
function hyper_pdf(np, n, Np, N) {

    return C(Np, np) * C(N - Np, n - np) / C(N, n)

}

/*==============================================================================================================================*/
/* SECTION 7 — FONCTIONS AUXILIAIRES NUMÉRIQUES (FONCTIONS SPÉCIALES)
/*==============================================================================================================================*/

/* LogGamma(Z) — Retourne le logarithme naturel de la fonction Gamma Γ(Z).
/* Utilise l'approximation de Stirling (série de Lanczos, précision ~1e-7).
/* Nécessaire pour le calcul des CDF des lois binomiale, Student et du Chi-deux. */
function LogGamma(Z) {

    with (Math) {

        var S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + .00120858003 / (Z + 4) - .00000536382 / (Z + 5);

        var LG = (Z - .5) * log(Z + 4.5) - (Z + 4.5) + log(S * 2.50662827465);

    }

    return LG

}



/* Betinc(X, A, B) — Retourne la fonction bêta incomplète régularisée I_X(A, B).
/* Calculée par développement en fraction continue (algorithme de Lentz modifié).
/* Précision de convergence : 1e-5 sur le rapport des itérations successives.
/* Utilisée en interne par bin_cdf() et tcdf() pour le calcul des queues de distribution. */
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



/* bin_cdf(X, N, P) — Retourne la fonction de répartition cumulative de la loi binomiale B(N, P).
/* P(X_bin ≤ X) pour X_bin ~ B(N, P).
/* Basé sur la relation entre la CDF binomiale et la fonction bêta incomplète régularisée.
/* @param X {number}  Valeur entière (arrondie par floor si nécessaire).
/* @param N {number}  Nombre d'essais (entier positif).
/* @param P {number}  Probabilité de succès à chaque essai (dans [0,1]).
/* @returns {number}  Probabilité cumulée, arrondie à 20 décimales significatives. */
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

/*==============================================================================================================================*/
/* SECTION 9 — FONCTIONS THERMODYNAMIQUES ET RECHERCHE DE RACINE
/*==============================================================================================================================*/

/* rosee(x, Ta, Tb) — Température de rosée en fonction de x ∈ [0,1].
/* Modélise le refroidissement d'un corps depuis une température initiale
/* vers le point de rosée par une parabole concave.
/* @param x  {number}  Paramètre normalisé dans [0,1] (ex. temps adimensionné).
/* @param Ta {number}  Température initiale (point de départ).
/* @param Tb {number}  Température finale (point de rosée). */
function rosee(x, Ta, Tb) {

    if (Ta > Tb) {

        return -Math.pow((x - 1) * Math.pow(Ta - Tb, 1 / 2), 2) + Ta

    }

    if (Ta < Tb) {

        return -Math.pow(x * Math.pow(Tb - Ta, 1 / 2), 2) + Tb

    }

}
/*==============================================================================================================================*/

/* ebullition(x, Ta, Tb) — Température d'ébullition en fonction de x ∈ [0,1].
/* Parabole convexe symétrique de rosee() : modélise un échauffement vers le point d'ébullition. */
function ebullition(x, Ta, Tb) {

    if (Ta > Tb) {

        return Math.pow(x * Math.pow(Ta - Tb, 1 / 2), 2) + Tb

    }

    if (Ta < Tb) {

        return Math.pow((x - 1) * Math.pow(Tb - Ta, 1 / 2), 2) + Ta

    }



}



/*==============================================================================================================================*/


/* cherche_racine(fonction, y) — Recherche par balayage l'antécédent de y par `fonction`
/* sur l'intervalle [0, 1] avec un pas de 0.000001.
/* Retourne la première valeur x telle que |fonction(x) - y| ≤ 0.0001.
/* @param fonction {Function}  Fonction à inverser, définie sur [0,1].
/* @param y        {number}    Valeur cible.
/* @returns        {number}    Solution approximative, ou 0 si aucune trouvée. */
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

/*==============================================================================================================================*/
/* SECTION 10 — VISUALISATION VIA GOOGLE CHARTS
/*
/* Dépendance requise dans le HTML : <script src="https://www.gstatic.com/charts/loader.js"></script>
/* Toutes les fonctions de cette section sont asynchrones : elles déclenchent le chargement
/* de la librairie Google Charts puis appellent le rendu via setOnLoadCallback().
/*==============================================================================================================================*/

/* drawCurveTypes() — Fonction de rappel (callback) interne utilisée par google_chart_line().
/* Lit les variables globales : x, curve_name1, curve_name2, X_axis_title, Y_axis_title,
/* Y_axis_min, Y_axis_max, Axis_width, Axis_height, chart_div.
/* Ne pas appeler directement : utiliser google_chart_line() à la place. */
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


/* google_chart_line(x, Y_axis_min, Y_axis_max, X_axis_title, Y_axis_title,
/*                   curve_name1, curve_name2, Axis_width, Axis_height, chart_div)
/* — Trace un graphique linéaire à deux courbes via Google Charts.
/* Charge la librairie de façon asynchrone puis déclenche drawCurveTypes() en callback.
/* Les paramètres sont stockés en variables globales pour être accessibles au callback.
/*
/* @param x            {Array}   Tableau de lignes [x, y1, tooltip1, y2, tooltip2].
/* @param Y_axis_min   {number}  Valeur minimale de l'axe Y.
/* @param Y_axis_max   {number}  Valeur maximale de l'axe Y.
/* @param X_axis_title {string}  Libellé de l'axe X.
/* @param Y_axis_title {string}  Libellé de l'axe Y.
/* @param curve_name1  {string}  Nom de la première courbe (légende).
/* @param curve_name2  {string}  Nom de la deuxième courbe (légende).
/* @param Axis_width   {number}  Largeur totale du graphique en px.
/* @param Axis_height  {number}  Hauteur totale du graphique en px.
/* @param chart_div    {string}  ID du <div> cible dans le DOM. */
function google_chart_line(x, Y_axis_min, Y_axis_max, X_axis_title, Y_axis_title, curve_name1, curve_name2, Axis_width, Axis_height, chart_div) {

    google.charts.load('current', {
        packages: ['corechart', 'line']
    });

    google.charts.setOnLoadCallback(drawCurveTypes);

}


/*==============================================================================================================================*/



/*==============================================================================================================================*/
/* SECTION 8 — LOI DE STUDENT ET TEST T
/*==============================================================================================================================*/

/* tcdf(X, df) — Fonction de répartition cumulative de la loi de Student T(df).
/* Retourne P(T ≤ X) pour T ~ Student(df degrés de liberté).
/* Basée sur la relation avec la fonction bêta incomplète régularisée.
/* @param X  {number}  Valeur de la statistique de test.
/* @param df {number}  Degrés de liberté (entier positif). */
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


/* t(sample1, sample2) — Statistique du test t de Student bilatéral pour deux échantillons
/* indépendants de variances supposées égales (test paramétrique pooled).
/* t = (m1 - m2) / (sp * sqrt(1/n1 + 1/n2))  avec sp = écart-type poolé.
/* @param sample1 {Array}  Premier échantillon de valeurs numériques.
/* @param sample2 {Array}  Deuxième échantillon de valeurs numériques.
/* @returns       {number} Valeur de la statistique t (peut être négative). */
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


/* pvalue(sample1, sample2) — P-valeur bilatérale du test t de Student.
/* Retourne 2 * P(T > |t_obs|) avec df = n1 + n2 - 2 degrés de liberté.
/* @param sample1 {Array}  Premier échantillon.
/* @param sample2 {Array}  Deuxième échantillon.
/* @returns       {number} P-valeur dans ]0, 1]. */
function pvalue(sample1, sample2) {

    X = Math.abs(t(sample1, sample2));

    df = sample1.length - 1 + sample2.length - 1;

    return 2 * (1 - tcdf(X, df))

}

/*==============================================================================================================================*/

/* getIntervalArray(x1, x2, n, rang, Nb_reponses, sci, Num_question, myrng)
/* — Génère Nb_reponses intervalles [borne_gauche ; borne_droite] sous forme de chaînes,
/* en positionnant [x1 ; x2] à la position `rang` parmi les propositions.
/* Gère le cas où x1 et x2 sont de signes opposés (les bornes sont alors indépendantes)
/* ou de même signe (les bornes sont générées symétriquement autour de leur milieu).
/* Injecte les intervalles dans les balises DOM R{Num_question}1 … R{Num_question}{Nb_reponses}. */
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


/* getRandomIntInclusive(min, max, myrng) — Retourne un entier aléatoire dans [min, max] inclus.
/* @param min   {number}    Borne inférieure (arrondie au plafond).
/* @param max   {number}    Borne supérieure (arrondie au plancher).
/* @param myrng {Function}  Générateur pseudo-aléatoire dans [0,1[ (ex. Math.seedrandom). */
function getRandomIntInclusive(min, max, myrng) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(myrng() * (max - min + 1)) + min;
}




/*==============================================================================================================================*/


/*==============================================================================================================================*/
/* SECTION 15 — AFFICHAGE DE TABLEAUX HTML ET EXPORT DE DONNÉES
/*==============================================================================================================================*/

/* ExportToExcel(type, fn, dl) — Exporte la table HTML d'id "table1" vers un fichier Excel.
/* Utilise la librairie SheetJS (XLSX).
/* @param type {string}  Format cible (ex. 'xlsx', 'csv').
/* @param fn   {string}  Nom du fichier (défaut : 'Donnees_Exercice_Moodle.xlsx').
/* @param dl   {boolean} Si true, retourne le fichier en base64 ; sinon, télécharge directement. */
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

/*==============================================================================================================================*/
/* SECTION 11 — GÉNÉRATION DE JEUX DE DONNÉES SIMULÉS
/*
/* Ces fonctions créent des tableaux de données synthétiques à partir de distributions
/* normales (via jStat) pour alimenter des exercices de régression ou de tests statistiques.
/*==============================================================================================================================*/

/* Create_MLR_Data(rows, Intercept, coeff_X, mean_X, sigma_X, sigma_E, Col_Names, myrng)
/* — Génère un jeu de données pour une régression linéaire multiple (MLR).
/* Y = Intercept + coeff_X[0]*X[0] + ... + coeff_X[K-1]*X[K-1] + epsilon
/* avec epsilon ~ N(0, sigma_E²) et X[j] ~ N(mean_X[j], sigma_X[j]²).
/*
/* @param rows      {number}   Nombre d'individus.
/* @param Intercept {number}   Constante du modèle (bruit centré sur cette valeur).
/* @param coeff_X   {Array}    Coefficients de régression [β1, β2, ...].
/* @param mean_X    {Array}    Moyennes des variables explicatives.
/* @param sigma_X   {Array}    Écarts-types des variables explicatives.
/* @param sigma_E   {number}   Écart-type du terme d'erreur.
/* @param Col_Names {Array}    Noms des colonnes (X1, X2, ..., Y).
/* @param myrng     {Function} Générateur pseudo-aléatoire.
/* @returns {Object} { data, Y, X } — tableau complet, vecteur Y, matrice X. */
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

/*==============================================================================================================================*/
/* SECTION 12 — MODÈLES STATISTIQUES
/*==============================================================================================================================*/

/* MLR(Y, X) — Estimation d'une régression linéaire multiple par moindres carrés ordinaires.
/* Modèle : Y = X * Beta1 + Beta0  (terme constant ajouté automatiquement).
/* Formule : Beta = (X'X)^{-1} X'Y  (résolution matricielle exacte via math.js).
/*
/* @param Y {Array}  Vecteur réponse (n × 1).
/* @param X {Array}  Matrice des variables explicatives (n × p), SANS colonne de 1.
/* @returns {Object} {
/*   beta             : coefficients estimés [Beta0, Beta1, ...],
/*   Ypred            : valeurs ajustées,
/*   Epred            : résidus Y - Ypred,
/*   SST              : somme des carrés totale,
/*   SSE              : somme des carrés des résidus,
/*   R2               : coefficient de détermination,
/*   sigma_E_estimat  : écart-type résiduel estimé,
/*   sigma_Beta_estimat : écarts-types des coefficients,
/*   X                : matrice X augmentée (avec colonne de 1)
/* } */
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


/* getRandomArbitrary(min, max, myrng) — Retourne un nombre réel aléatoire dans [min, max[.
/* @param myrng {Function} Générateur pseudo-aléatoire dans [0,1[. */
function getRandomArbitrary(min, max, myrng) {
    return myrng() * (max - min) + min;
}

/*==============================================================================================================================*/

/* Create_Student_Test_Data(rows, mean_X, sigma_X, Col_Names, Seed_Table)
/* — Génère un jeu de données simulé avec K variables normales pour exercices de test t.
/* Chaque variable X[j] ~ N(mean_X[j], sigma_X[j]²), avec Precision = 3 chiffres significatifs.
/*
/* @param rows       {number}  Nombre d'individus.
/* @param mean_X     {Array}   Moyennes des K variables.
/* @param sigma_X    {Array}   Écarts-types des K variables.
/* @param Col_Names  {Array}   Noms des colonnes.
/* @param Seed_Table {string}  Graine pour la reproductibilité.
/* @returns {Object} { data, X } — tableau complet et matrice numérique X. */
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

/* Create_Chi2_Test_Data(Theoretical_contingency_table, Row_Names, Col_Names, Seed_Table)
/* — Génère un tableau de contingence observé par simulation multinomiale.
/* Les effectifs théoriques sont donnés dans Theoretical_contingency_table (matrice C × G).
/* Pour chaque groupe g, on tire Ng individus selon la distribution catégorielle des C classes.
/*
/* @param Theoretical_contingency_table {Array}  Matrice C × G des effectifs théoriques.
/* @param Row_Names {Array}  Noms des lignes (modalités de la variable en ligne).
/* @param Col_Names {Array}  Noms des colonnes (groupes ou modalités de la variable en colonne).
/* @param Seed_Table {string} Graine pour la reproductibilité.
/* @returns {Object} { data, X } — tableau formaté avec en-têtes et matrice des effectifs observés. */
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


/* Chi2_Test(X) — Effectue le test d'indépendance du Chi-deux sur un tableau de contingence X.
/* Calcule les effectifs théoriques E sous H0 d'indépendance, la statistique χ² et la p-valeur.
/* Degrés de liberté : (nb_lignes - 1) * (nb_colonnes - 1).
/* Utilise jStat.chisquare.cdf() pour la p-valeur.
/*
/* @param X {Array}  Matrice N × K des effectifs observés.
/* @returns {Object} {
/*   col_marginal_sum : sommes marginales des colonnes,
/*   row_marginal_sum : sommes marginales des lignes,
/*   Chi2             : valeur de la statistique Chi-deux,
/*   p_value          : p-valeur du test,
/*   E                : matrice des effectifs théoriques sous H0
/* } */
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

/* CreateTable(Data, Table_position, Table_id, decimal_separator)
/* — Génère un tableau HTML <table> à partir d'un tableau 2D et l'insère dans le DOM.
/* La virgule remplace le point comme séparateur décimal par défaut (convention française).
/*
/* @param Data              {Array}  Tableau 2D (lignes × colonnes) incluant les en-têtes.
/* @param Table_position    {string} ID du nœud DOM avant lequel insérer le tableau
/*                                   (si vide, document.write() est utilisé).
/* @param Table_id          {string} Attribut id du tableau HTML généré (défaut : 'table1').
/* @param decimal_separator {string} Séparateur décimal (défaut : ',').
/* @returns {string} Code HTML du tableau. */
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

/* plot_line(array, emplacement_courbe, line_title, hAxes_title, vAxes_title,
/*           chartArea_width, chartArea_height)
/* — Trace une courbe en ligne via Google Charts à partir d'un tableau de données 2D.
/* Le tableau doit avoir pour première ligne les noms des colonnes [X, Y1, Y2, ...].
/*
/* @param array             {Array}  Tableau au format Google Charts (en-têtes + données).
/* @param emplacement_courbe{string} ID du <div> cible (défaut : "emplacement_courbe").
/* @param line_title        {string} Titre du graphique.
/* @param hAxes_title       {string} Titre de l'axe horizontal (défaut : nom col. 0).
/* @param vAxes_title       {string} Titre de l'axe vertical   (défaut : nom col. 1).
/* @param chartArea_width   {number} Largeur de la zone de tracé en px (défaut : 250).
/* @param chartArea_height  {number} Hauteur de la zone de tracé en px (défaut : 250). */
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

/* data_from_function(func, Xrange, ColNames)
/* — Génère un tableau de 500 points [x, f(x)] à partir d'une expression symbolique.
/*
/* ÉVALUATEUR : utilise math.js (math.evaluate) en priorité, avec fallback sur nerdamer.
/* Raison : nerdamer retourne NaN pour les expressions impliquant sqrt(pi) ou des
/* différences négatives élevées au carré, ce qui rend les densités de lois normales
/* (et exponentielle, uniforme) incorrectes. math.js évalue correctement toutes ces formes.
/*
/* Syntaxe de l'expression (math.js) :
/*   - Opérateur puissance : ^ ou ** (les deux acceptés par math.js)
/*   - Fonctions : exp, sqrt, abs, log, sin, cos, tan, ...
/*   - Constantes : pi, e  (en minuscules — math.js les reconnaît)
/*   - Variable   : x  (sera substituée numériquement à chaque point)
/*   - Exemple densité N(mu, sigma²) :
/*       'exp(-0.5*((x-' + mu + ')/' + sigma + ')^2)/(' + sigma + '*sqrt(2*pi))'
/*   - Exemple densité Exp(lambda) :
/*       lambda + '*exp(-' + lambda + '*x)'
/*
/* IMPORTANT — incorporation des paramètres :
/*   Les valeurs numériques (mu, sigma, lambda, a, b, ...) DOIVENT être incorporées
/*   dans la chaîne par concaténation JS avant l'appel, pas passées comme variables :
/*   CORRECT : 'exp(-0.5*((x-' + mu + ')/' + sigma + ')^2)/(' + sigma + '*sqrt(2*pi))'
/*   INCORRECT: 'exp(-0.5*((x-mu)/sigma)^2)/(sigma*sqrt(2*pi))'   <- mu/sigma inconnus
/*
/* @param func     {string}  Expression de f(x), variable x (syntaxe math.js).
/* @param Xrange   {Array}   [x_min, x_max] — bornes de la plage de tracé.
/* @param ColNames {Array}   Noms des colonnes (défaut : ['X', 'Y']).
/* @returns {Array}  Tableau au format Google Charts (ligne 0 = en-têtes, lignes 1..500 = points). */
function data_from_function(func, Xrange, ColNames) {
    ColNames = ColNames || ['X', 'Y'];
    var N    = 500;
    var data = new Array(N + 1);
    data[0]  = ColNames;

    // Choix de l'évaluateur : math.js en priorité (gère sqrt(pi), exp(...), puissances négatives)
    // Fallback sur nerdamer si math.js n'est pas disponible.
    var use_mathjs = (typeof math !== 'undefined' && typeof math.evaluate === 'function');

    for (var i = 0; i < N; i++) {
        var xv = Xrange[0] + (i / (N - 1)) * (Xrange[1] - Xrange[0]);
        var yv;

        if (use_mathjs) {
            // math.js : substitution de x dans la chaîne par sa valeur numérique
            // puis évaluation de l'expression résultante (entièrement numérique).
            try {
                var expr = func.replace(/\bx\b/g, '(' + xv + ')');
                yv = Number(math.evaluate(expr));
            } catch(e) {
                yv = 0;
            }
        } else {
            // Fallback nerdamer (fonctionne pour les expressions simples sans sqrt(pi))
            try {
                var expr_n = func.replace(/\bx\b/g, '(' + xv + ')');
                yv = Number(nerdamer(expr_n));
            } catch(e) {
                yv = 0;
            }
        }

        if (!isFinite(yv) || isNaN(yv)) yv = 0;
        data[i + 1] = [xv, yv];
    }

    return data;
}

/*==============================================================================================================================*/

/* display_polynom_LaTex(expr, tag_id) — Affiche un polynôme formaté en LaTeX dans un élément DOM.
/* Convertit l'expression via math.js (toTex()) puis la rend avec MathJax.
/* @param expr   {string}  Expression algébrique sous forme de chaîne (ex. '3*x^2 + 2*x - 1').
/* @param tag_id {string}  ID de l'élément HTML cible. */
function display_polynom_LaTex(expr, tag_id) {
    document.getElementById(tag_id).appendChild(MathJax.tex2svg(math.parse(expr).toTex(), {
        display: false
    }));
}

/*==============================================================================================================================*/

/* display_polynom(expr, tag_id, var_symb) — Affiche un polynôme en notation mathématique HTML.
/* Décompose l'expression par ses coefficients (via nerdamer), gère les signes et les puissances.
/* @param expr     {string}  Expression polynomiale (en x par défaut).
/* @param tag_id   {string}  ID de l'élément HTML cible (le polynôme est inséré avant lui).
/* @param var_symb {string}  Symbole de la variable (défaut : 'x'). */
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


/* getArray(x, n, rang, Nb_reponses, sci, Num_question, myrng)
/* — Génère un tableau de Nb_reponses propositions ordonnées autour de x,
/* en plaçant x à la position `rang`, et injecte les valeurs dans le DOM.
/* Cas entier ≤ 10 : génère des entiers consécutifs centrés sur x.
/* Cas général      : utilise valeurs_a_gauche / valeurs_a_droite à n chiffres significatifs.
/*
/* @param x           {number}    Bonne réponse.
/* @param n           {number}    Chiffres significatifs.
/* @param rang        {number}    Position de la bonne réponse dans la liste (1-indexé).
/* @param Nb_reponses {number}    Nombre total de réponses proposées.
/* @param sci         {number}    Mode de formatage (0/1/2 — voir significant_digits).
/* @param Num_question{number}    Numéro de la question dans le DOM.
/* @param myrng       {Function}  Générateur pseudo-aléatoire.
/* @returns {Array} Tableau de chaînes des réponses proposées. */
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


/* getExprArray(solution_expr, par_var, rang, Nb_reponses)
/* — Génère des réponses symboliques (expressions mathématiques en LaTeX/MathJax)
/* en faisant varier les paramètres de `par_var` autour de leurs valeurs actuelles.
/* Distingue les expressions réelles des expressions complexes (partie réelle / imaginaire).
/* ATTENTION : la condition temporelle (Date < 2023-01-29) est désactivée — fonction archivée. */
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


/* transform_expression(expr, displayed_expr, par, par_var)
/* — Substitue dans une expression symbolique les valeurs aléatoires des paramètres fixes,
/* et mémorise les valeurs des paramètres variables (ceux qui seront variés pour les distracteurs).
/*
/* @param expr          {string}  Expression à évaluer numériquement (pour le calcul).
/* @param displayed_expr{string}  Expression à afficher à l'étudiant (peut inclure LaTeX).
/* @param par           {Object}  Paramètres fixes : { symb: [...], extrema: [...] }.
/*                                Si extrema est un tableau 1D → mêmes bornes pour tous ;
/*                                si c'est une matrice 2D → bornes individuelles par paramètre.
/* @param par_var       {Object}  Paramètres variables : { symb: [...] }.
/* @returns {Object} { displayed_expr, expr, par_var } avec par_var.val renseigné. */
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

/* Create_Rand_Data_Table(myrng, rows, cols, min, max, precision)
/* — Génère un tableau rows × cols de valeurs aléatoires uniformes dans [min, max],
/* arrondies à `precision` chiffres significatifs.
/* @param myrng     {Function}  Générateur pseudo-aléatoire.
/* @param rows      {number}    Nombre de lignes     (défaut : 2).
/* @param cols      {number}    Nombre de colonnes   (défaut : 2).
/* @param min       {number}    Borne inférieure      (défaut : 0).
/* @param max       {number}    Borne supérieure      (défaut : 1).
/* @param precision {number}    Chiffres significatifs (défaut : 3).
/* @returns {Array}  Tableau 2D de chaînes de caractères. */
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

/* plot_hist(array, div_id, hist_title) — Trace un histogramme via Google Charts.
/* Google Charts calcule automatiquement les classes (bins).
/* @param array      {Array}  Tableau au format ['individu', 'valeur'] (format convert_2d_table_to_google_hist_data).
/* @param div_id     {string} ID du <div> cible.
/* @param hist_title {string} Titre du graphique (défaut : ''). */
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
/* convert_2d_table_to_google_hist_data(data) — Convertit un tableau 2D de valeurs numériques
/* au format requis par plot_hist() : [['individus', 'valeur'], ['ind1', v1], ['ind2', v2], ...].
/* @param data {Array}  Tableau 2D rows × cols de valeurs numériques.
/* @returns {Array}  Tableau aplati compatible Google Charts Histogram. */
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


/* get_frequencies(data, min_value, max_value, range)
/* — Calcule les fréquences absolues et cumulées d'un échantillon 1D par classes de largeur `range`.
/*
/* @param data      {Array}   Echantillon de valeurs numériques (tableau 1D).
/* @param min_value {number}  Borne inférieure de la première classe.
/* @param max_value {number}  Borne supérieure de la dernière classe.
/* @param range     {number}  Largeur de chaque classe (amplitude).
/* @returns {Object} {
/*   frequencies    : Array des effectifs par classe,
/*   cumfrequencies : Array des fréquences cumulées relatives (0 à 1), taille numClasses+1,
/*   bins_limits    : Array des bornes inférieures des classes, taille numClasses+1
/* } */
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


/* ExportToTxt() — Exporte le contenu de la table HTML d'id "table1" vers un fichier texte.
/* Les colonnes sont séparées par des tabulations (\t), les lignes par des sauts de ligne (\n).
/* Le téléchargement est déclenché automatiquement via un lien temporaire dans le DOM.
/* Nom du fichier généré : "tableau.txt". */
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


/*==============================================================================================================================*/
/* SECTION 14 — RÉGRESSION LOGISTIQUE
/*
/* Implémente la régression logistique binaire par maximum de vraisemblance,
/* avec estimation des intervalles de confiance par la méthode du profil de vraisemblance.
/* Référence : Stryhn & Christensen, "Confidence intervals by the profile likelihood method",
/*             Preventive Veterinary Medicine, 2003.
/*==============================================================================================================================*/

/* minus_log_likelihood(beta, args) — Retourne l'opposé du log-vraisemblance du modèle logistique.
/* Modèle : P(Y=1|X) = sigmoid(X·beta) = 1 / (1 + exp(-X·beta)).
/* @param beta {Array}  Vecteur des coefficients (incluant l'intercept en position 0).
/* @param args {Object} { X: matrice n×(p+1) avec colonne de 1, y: vecteur binaire 0/1 }. */
function minus_log_likelihood(beta, args) {
    const X = args.X;
    const y = args.y;
    const p = X.map((xi) => 1 / (1 + math.exp(math.multiply(-1, math.dot(xi, beta)))));
    const log_likelihood = y.reduce((sum, yi, i) => sum + yi * Math.log(p[i]) + (1 - yi) * Math.log(1 - p[i]), 0);
    return -log_likelihood;
}

/*==============================================================================================================================*/

/* minus_log_likelihood_x(beta) — Variante de minus_log_likelihood() utilisant les variables
/* globales X et y (matrices déjà définies dans le contexte d'un exercice).
/* Commodité pour passer la fonction à newtonMethod() sans reconstruire args à chaque appel. */
function minus_log_likelihood_x(beta) {
    args = { X: X, y: y }
    return minus_log_likelihood(beta, args)
}

/*==============================================================================================================================*/

/*==============================================================================================================================*/
/* SECTION 13 — OPTIMISATION NUMÉRIQUE (MÉTHODE DE NEWTON)
/*==============================================================================================================================*/

/* newtonMethod(f, x0, args, tol, maxIter) — Minimise f par la méthode de Newton-Raphson.
/* A chaque itération : x ← x - H(f)^{-1} · ∇f(x), avec H la hessienne et ∇f le gradient.
/* Convergence testée sur la norme euclidienne du pas.
/*
/* @param f       {Function}  Fonction scalaire à minimiser. Signature : f(x, args).
/* @param x0      {Array|number} Point de départ (vecteur ou scalaire).
/* @param args    {Object}    Arguments supplémentaires passés à f.
/* @param tol     {number}    Tolérance de convergence sur le pas (défaut : 1e-6).
/* @param maxIter {number}    Nombre maximal d'itérations (défaut : 100).
/* @returns {Array|number}    Point minimisant f, au format du point de départ x0. */
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

/* partial_derivatives(f, x, args) — Calcule le gradient de f en x par différences finies centrées.
/* Schéma : ∂f/∂xi ≈ [f(x + h·ei) - f(x - h·ei)] / (2h), avec h = 1e-6.
/* @param f    {Function}     Fonction à dériver. Signature : f(x, args).
/* @param x    {Array|number} Point d'évaluation.
/* @param args {Object}       Arguments supplémentaires passés à f.
/* @returns {Array|number}    Gradient ∇f(x) (même format que x). */
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

/* hessian_matrix(f, x, args) — Calcule la matrice hessienne de f en x par différences finies.
/* Schéma centré du second ordre : h_ij = [f(x+hi+hj) - f(x+hi-hj) - f(x-hi+hj) + f(x-hi-hj)] / (4h²).
/* La matrice est symétrique (hess[i][j] = hess[j][i]).
/* @param f    {Function}     Fonction à dériver deux fois. Signature : f(x, args).
/* @param x    {Array|number} Point d'évaluation (vecteur ou scalaire).
/* @param args {Object}       Arguments supplémentaires passés à f.
/* @returns {Array|number}    Matrice hessienne n×n (ou scalaire si n=1). */
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

/* conf_int_logistic_reg(beta0, args, tol) — Intervalle de confiance à 95 % pour chaque
/* coefficient de la régression logistique, par la méthode du profil de vraisemblance.
/*
/* Principe : pour le j-ème coefficient β_j, on cherche les valeurs θ telles que
/*   2 * [L(β_max) - L(β_max|θ)] = χ²(0.95, 1)
/* où L(β_max|θ) est le maximum de la log-vraisemblance contraint à β_j = θ.
/* Les bornes sont trouvées par la méthode de Newton, en partant de β_j ± 2·SD_j.
/*
/* Référence : Stryhn & Christensen, "Confidence intervals by the profile likelihood method,
/*             with applications in veterinary epidemiology", Prev. Vet. Med., 2003.
/*
/* @param beta0 {Array}   Estimateur du MLE (coefficients optimaux, incluant l'intercept).
/* @param args  {Object}  Arguments pour minus_log_likelihood : { X, y }.
/* @param tol   {number}  Tolérance de Newton (défaut : 1e-6).
/* @returns {Array}  Tableau beta0.length × 2 : [[IC_inf_0, IC_sup_0], [IC_inf_1, IC_sup_1], ...]. */
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

/* Create_Log_Reg_Data(N, beta, mean_X, sigma_X, Col_Names, myrng)
/* — Génère un jeu de données simulé pour la régression logistique binaire.
/*
/* Modèle : P(Y=1 | X) = sigmoid(β₀ + β₁X₁ + ... + β_{K-1}X_{K-1})
/* avec X_j ~ N(mean_X[j], sigma_X[j]²).
/* L'intercept β₀ est ajusté pour centrer les probabilités : β₀ = -mean_X · beta,
/* ce qui assure P(Y=1) ≈ 0.5 en moyenne pour les données générées.
/*
/* @param N         {number}    Nombre d'individus.
/* @param beta      {Array}     Coefficients de régression [β₁, …, β_{K-1}] (sans intercept).
/*                              Modifié en place : l'intercept est inséré en position 0.
/* @param mean_X    {Array}     Moyennes des variables explicatives.
/* @param sigma_X   {Array}     Écarts-types des variables explicatives.
/* @param Col_Names {Array}     Noms des colonnes [X1, …, X_{K-1}, Y].
/* @param myrng     {Function}  Générateur pseudo-aléatoire.
/* @returns {Object} { data, Y, X } — tableau complet avec en-têtes, vecteur Y, matrice X (sans intercept). */
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

/* scatter_plot(array, emplacement_courbe, line_title, hAxes_title, vAxes_title,
/*              chartArea_width, chartArea_height)
/* — Trace un nuage de points via Google Charts à partir d'un tableau de données 2D.
/* Identique à plot_line() mais utilise google.visualization.ScatterChart.
/* Utile pour visualiser des corrélations ou les résidus d'une régression.
/*
/* @param array             {Array}  Tableau au format Google Charts (en-têtes + données).
/* @param emplacement_courbe{string} ID du <div> cible (défaut : "emplacement_courbe").
/* @param line_title        {string} Titre du graphique.
/* @param hAxes_title       {string} Titre de l'axe horizontal (défaut : nom col. 0).
/* @param vAxes_title       {string} Titre de l'axe vertical   (défaut : nom col. 1).
/* @param chartArea_width   {number} Largeur de la zone de tracé en px (défaut : 250).
/* @param chartArea_height  {number} Hauteur de la zone de tracé en px (défaut : 250). */
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

/* reponses_proposees(x, min_x, max_x, NCS, myrng, NbRep, rang, Num_question)
/* — Version ancienne de reponses() : génère NbRep propositions de réponses numériques
/* à NCS chiffres significatifs autour de la bonne réponse x.
/*
/* Différence avec reponses() : le générateur de candidats utilise i < 10^NCS (exclu)
/* au lieu de i <= 10^NCS, ce qui peut manquer certaines puissances de 10 exactes.
/* Préférer reponses() pour les nouveaux exercices.
/*
/* @param x            {number}    Bonne réponse (numérique ou chaîne parsée).
/* @param min_x        {number}    Borne inférieure des propositions acceptables.
/* @param max_x        {number}    Borne supérieure des propositions acceptables.
/* @param NCS          {number}    Nombre de chiffres significatifs.
/* @param myrng        {Function}  Générateur pseudo-aléatoire principal.
/* @param NbRep        {number}    Nombre total de réponses proposées (bonne + distracteurs).
/* @param rang         {number}    Position de la bonne réponse dans la liste (1-indexé).
/* @param Num_question {number}    Numéro de la question (pour cibler les balises DOM R{Q}{i}).
/* @returns {Array}  Tableau de NbRep chaînes HTML (notation scientifique si nécessaire). */
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


/* sample(elements, nombre, myrng) — Tirage sans remise de `nombre` éléments dans `elements`.
/* Algorithme : sélection itérative d'un indice aléatoire parmi les indices restants
/* (équivalent à un Fisher-Yates partiel).
/* S'arrête si le tableau est épuisé avant d'atteindre `nombre`.
/*
/* @param elements {Array}    Tableau source d'éléments à tirer.
/* @param nombre   {number}   Nombre d'éléments à sélectionner.
/* @param myrng    {Function} Générateur pseudo-aléatoire dans [0,1[.
/* @returns {Array}  Sous-tableau de `nombre` éléments distincts. */
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
/* arrondir_ncs(x, ncs) — Arrondit x à `ncs` chiffres significatifs et retourne une chaîne
/* formatée adaptée à l'affichage dans Moodle.
/* Notation fixe si |x| ∈ ]1e-3, 1e3[, notation exponentielle sinon.
/*
/* @param x   {number}  Valeur à arrondir.
/* @param ncs {number}  Nombre de chiffres significatifs souhaité.
/* @returns   {string}  Valeur arrondie et formatée. */
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

/* intervalles_proposees(x1, x2, n, rang, Nb_reponses, Num_question, myrng)
/* — Génère Nb_reponses intervalles [a ; b] symétriques par rapport au milieu (x1+x2)/2,
/* en plaçant [x1 ; x2] à la position `rang`, et les injecte dans les balises DOM.
/*
/* Stratégie : on fait varier la borne de plus grande valeur absolue via reponses_proposees(),
/* puis on déduit la borne symétrique par x1 + x2 - borne_variable.
/* Cela garantit que tous les intervalles proposés ont la même largeur |x2 - x1|.
/*
/* @param x1           {number}    Borne gauche du bon intervalle.
/* @param x2           {number}    Borne droite du bon intervalle.
/* @param n            {number}    Nombre de chiffres significatifs pour l'arrondi.
/* @param rang         {number}    Position du bon intervalle dans la liste (1-indexé).
/* @param Nb_reponses  {number}    Nombre total d'intervalles proposés.
/* @param Num_question {number}    Numéro de la question (pour cibler les balises DOM R{Q}{i}).
/* @param myrng        {Function}  Générateur pseudo-aléatoire.
/* @returns {Array}  Tableau de Nb_reponses chaînes "[a;b]" au format HTML. */
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


/* decodeSinRang(rang_encoded) — Décode un rang encodé via la transformation sin(10·val).
/*
/* L'encodage est : encoded = round((sin(10·val) + 1) × 4500 + 1000) / 1000
/* pour val ∈ {1.0, 1.1, …, 10.0}.
/* Cette fonction reconstruit la table de correspondance et retourne val pour un encoded donné.
/* Si la clé n'est pas trouvée exactement, retourne la valeur la plus proche (robustesse
/* aux erreurs d'arrondi flottant).
/*
/* @param rang_encoded {number}  Valeur encodée (issue de l'exercice Moodle).
/* @returns            {number}  Rang décodé dans [1.0, 10.0] avec un pas de 0.1. */
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
/* reponses(x, min_x, max_x, NCS, myrng, NbRep, rang, Num_question)
/* — Version améliorée de reponses_proposees() : génère NbRep propositions numériques
/* à NCS chiffres significatifs autour de la bonne réponse x.
/*
/* Améliorations par rapport à reponses_proposees() :
/*   - Inclusion correcte des puissances de 10 (i <= 10^NCS au lieu de i < 10^NCS).
/*   - Notation scientifique HTML améliorée : "× 10<sup>n</sup>" au lieu de " 10<sup>n".
/*   - Code commenté étape par étape pour faciliter la maintenance.
/*
/* Algorithme (9 étapes commentées dans le code) :
/*   1. Normaliser x à NCS chiffres significatifs.
/*   2. Générer tous les candidats à NCS chiffres significatifs dans l'ordre de grandeur de x.
/*   3. Filtrer les valeurs hors de [min_x, max_x].
/*   4. Formater les candidats (fixe ou exponentiel).
/*   5. Identifier la bonne réponse (candidat le plus proche de x).
/*   6. Tirer NbRep distracteurs sans remise parmi les candidats restants.
/*   7. Insérer la bonne réponse à la position `rang`.
/*   8. Formater la notation scientifique pour HTML (× 10<sup>n</sup>).
/*   9. Injecter les réponses dans les balises DOM R{Num_question}1…R{Num_question}{NbRep}.
/*
/* @param x            {number}    Bonne réponse.
/* @param min_x        {number}    Borne inférieure des propositions acceptables.
/* @param max_x        {number}    Borne supérieure des propositions acceptables.
/* @param NCS          {number}    Nombre de chiffres significatifs.
/* @param myrng        {Function}  Générateur pseudo-aléatoire principal.
/* @param NbRep        {number}    Nombre total de réponses proposées.
/* @param rang         {number}    Position de la bonne réponse (1-indexé).
/* @param Num_question {number}    Numéro de la question (pour cibler les balises DOM R{Q}{i}).
/* @returns {Array}  Tableau de NbRep chaînes HTML. */
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
/**
 * plot_density — Trace n'importe quelle fonction de densité dans un <div> cible via Google Charts,
 * avec coloriage interactif d'une ou plusieurs zones sous la courbe.
 *
 * Google Charts fournit le zoom (drag), le reset (clic droit) et les tooltips interactifs.
 * Le coloriage des zones est obtenu en superposant des séries "area" transparentes à la courbe principale.
 *
 * @param {string}   div_id     ID du <div> cible (doit exister dans le DOM).
 * @param {Function} pdf        Fonction de densité : prend un nombre x, retourne f(x) >= 0.
 * @param {number}   x_min      Borne gauche de l'axe X.
 * @param {number}   x_max      Borne droite de l'axe X.
 * @param {Array}    zones      Tableau de zones à colorier (peut être vide ou null).
 *                              Chaque zone est un objet :
 *                                { x_left: number, x_right: number, color: string, label: string }
 *                              Exemples :
 *                                { x_left: -Infinity, x_right: 1.65, color: '#3498db', label: 'P(Z≤1.65)' }
 *                                { x_left: -1, x_right: 1,          color: '#2ecc71', label: 'P(-1≤Z≤1)' }
 *                                { x_left: 1.96, x_right: Infinity, color: '#e74c3c', label: 'P(Z≥1.96)' }
 * @param {object}   options    Options graphiques (toutes optionnelles) :
 *                                n_points    {number}  Nb de points de tracé         (défaut : 400)
 *                                width       {number}  Largeur en px                  (défaut : 550)
 *                                height      {number}  Hauteur en px                  (défaut : 300)
 *                                title       {string}  Titre du graphique             (défaut : '')
 *                                x_title     {string}  Titre axe X                   (défaut : 'x')
 *                                y_title     {string}  Titre axe Y                   (défaut : 'f(x)')
 *                                curve_color {string}  Couleur de la courbe           (défaut : '#2c3e50')
 *                                curve_width {number}  Épaisseur trait courbe         (défaut : 2)
 *                                fill_opacity{number}  Opacité des zones [0-1]        (défaut : 0.35)
 *                                legend      {boolean} Afficher la légende            (défaut : true si zones.length>0)
 *
 * @returns {void}
 *
 * ── Exemples d'appel ────────────────────────────────────────────────────────────────────────
 *
 * // 1. Loi normale centrée réduite, zone gauche P(Z ≤ 1.65)
 * var phi = function(x) { return Math.exp(-x*x/2) / Math.sqrt(2*Math.PI); };
 * plot_density('mon_div', phi, -4, 4,
 *   [{ x_left: -Infinity, x_right: 1.65, color: '#3498db', label: 'P(Z≤1.65) ≈ 0.9505' }]
 * );
 *
 * // 2. Loi normale N(mu, sigma²), zone entre deux valeurs
 * var f = function(x) { return Math.exp(-0.5*((x-70)/10)**2) / (10*Math.sqrt(2*Math.PI)); };
 * plot_density('mon_div', f, 30, 110,
 *   [{ x_left: 60, x_right: 80, color: '#2ecc71', label: 'P(60≤X≤80)' }],
 *   { title: 'Poids ~ N(70, 100)', x_title: 'Poids (kg)' }
 * );
 *
 * // 3. Loi exponentielle, deux zones
 * var lambda = 0.5;
 * var fexp = function(x) { return x >= 0 ? lambda * Math.exp(-lambda * x) : 0; };
 * plot_density('mon_div', fexp, 0, 12,
 *   [
 *     { x_left: 0,   x_right: 2,        color: '#e74c3c', label: 'P(X≤2)' },
 *     { x_left: 4,   x_right: Infinity,  color: '#9b59b6', label: 'P(X≥4)' }
 *   ],
 *   { title: 'Loi Exp(0.5)', x_title: 'x', y_title: 'f(x)' }
 * );
 *
 * // 4. Sans zone colorée (courbe seule)
 * plot_density('mon_div', phi, -4, 4, []);
 */
function plot_density(div_id, pdf, x_min, x_max, zones, options) {

    // ── Valeurs par défaut ──────────────────────────────────────────────────
    zones   = zones   || [];
    options = options || {};

    var N           = options.n_points     || 400;
    var W           = options.width        || 550;
    var H           = options.height       || 300;
    var title       = options.title        || '';
    var x_title     = options.x_title      || 'x';
    var y_title     = options.y_title      || 'f(x)';
    var curve_color = options.curve_color  || '#2c3e50';
    var curve_width = options.curve_width  || 2;
    var fill_opacity= (options.fill_opacity !== undefined) ? options.fill_opacity : 0.35;
    var show_legend = (options.legend !== undefined) ? options.legend : (zones.length > 0);

    // ── Clamp Infinity sur les bornes réelles du graphe ─────────────────────
    var clamped_zones = zones.map(function(z) {
        return {
            x_left:  Math.max(isFinite(z.x_left)  ? z.x_left  : -1e18, x_min),
            x_right: Math.min(isFinite(z.x_right) ? z.x_right : +1e18, x_max),
            color:   z.color || '#3498db',
            label:   z.label || ''
        };
    }).filter(function(z) { return z.x_right > z.x_left; });

    // ── Génération des points X (+ points de rupture aux bornes des zones) ──
    var x_points = [];
    var step = (x_max - x_min) / N;
    for (var i = 0; i <= N; i++) {
        x_points.push(x_min + i * step);
    }
    // Insérer les bornes exactes des zones pour éviter les interpolations floues
    clamped_zones.forEach(function(z) {
        [z.x_left, z.x_right].forEach(function(bx) {
            if (bx > x_min && bx < x_max) {
                x_points.push(bx);
                x_points.push(bx - step * 1e-6); // point juste avant
                x_points.push(bx + step * 1e-6); // point juste après
            }
        });
    });
    x_points.sort(function(a, b) { return a - b; });
    // Dédoublonner
    x_points = x_points.filter(function(v, i, arr) {
        return i === 0 || Math.abs(v - arr[i-1]) > 1e-10;
    });

    // ── Construction du DataTable Google Charts ──────────────────────────────
    // Colonnes :
    //   col 0 : X  (number)
    //   col 1 : courbe principale  (number)
    //   col 2 : tooltip courbe     (string, role tooltip)
    //   col 3+k*2   : série zone k (number) — valeur ou null selon si x ∈ zone
    //   col 4+k*2   : tooltip zone k (string, role tooltip)
    //
    // Chaque série zone utilise type 'area' avec opacité de remplissage.
    // La série "courbe principale" est tracée en dernier (z-order) pour apparaître dessus.

    function buildTable() {
        var dt = new google.visualization.DataTable();
        dt.addColumn('number', x_title);
        dt.addColumn('number', y_title);
        dt.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        clamped_zones.forEach(function(z, k) {
            dt.addColumn('number', z.label || ('Zone ' + (k+1)));
            dt.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        });

        var rows = x_points.map(function(xv) {
            var yv = pdf(xv);
            if (!isFinite(yv) || yv < 0) yv = 0;
            var tooltip_curve = '<div style="padding:6px;font-size:12px;">' +
                                x_title + ' = ' + xv.toFixed(3) + '<br>' +
                                y_title + ' = ' + yv.toFixed(5) + '</div>';
            var row = [xv, yv, tooltip_curve];
            clamped_zones.forEach(function(z) {
                var in_zone = (xv >= z.x_left && xv <= z.x_right);
                var zone_y = in_zone ? yv : null;
                var zone_tt = in_zone
                    ? '<div style="padding:6px;font-size:12px;">' + (z.label || '') + '</div>'
                    : null;
                row.push(zone_y, zone_tt);
            });
            return row;
        });

        dt.addRows(rows);
        return dt;
    }

    // ── Options Google Charts ────────────────────────────────────────────────
    function buildOptions() {
        // Séries : série 0 = courbe, séries 1..k = zones (type area)
        var series = {};
        series[0] = {
            type:       'line',
            color:      curve_color,
            lineWidth:  curve_width,
            areaOpacity: 0,
            zOrder:     clamped_zones.length + 1   // courbe par-dessus les zones
        };
        clamped_zones.forEach(function(z, k) {
            series[k + 1] = {
                type:        'area',
                color:       z.color,
                lineWidth:   0,
                areaOpacity: fill_opacity,
                zOrder:      k
            };
        });

        return {
            title:    title,
            titleTextStyle: { fontSize: 14, bold: true, color: '#2c3e50' },
            width:    W,
            height:   H,
            seriesType: 'area',
            series:   series,
            hAxis: {
                title:          x_title,
                titleTextStyle: { fontSize: 13 },
                textStyle:      { fontSize: 11 }
            },
            vAxis: {
                title:          y_title,
                titleTextStyle: { fontSize: 13 },
                textStyle:      { fontSize: 11 },
                viewWindow:     { min: 0 }
            },
            legend: show_legend
                ? { position: 'top', textStyle: { fontSize: 11 } }
                : { position: 'none' },
            tooltip:   { isHtml: true },
            explorer: {
                actions:     ['dragToZoom', 'rightClickToReset'],
                keepInBounds: true,
                maxZoomIn:    0.01
            },
            chartArea: {
                left:   60, top: title ? 50 : 20,
                width:  '80%', height: '70%',
                backgroundColor: { stroke: '#ccc', strokeWidth: 1 }
            },
            backgroundColor: '#fafafa'
        };
    }

    // ── Chargement et dessin ─────────────────────────────────────────────────
    function drawChart() {
        var container = document.getElementById(div_id);
        if (!container) {
            console.warn('plot_density : div_id "' + div_id + '" introuvable.');
            return;
        }
        var chart = new google.visualization.ComboChart(container);
        chart.draw(buildTable(), buildOptions());
    }

    // Charger Google Charts si pas encore chargé, sinon dessiner directement
    if (typeof google !== 'undefined' && typeof google.charts !== 'undefined') {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
    } else {
        console.warn('plot_density : Google Charts (loader.js) non chargé.');
    }
}

/*==============================================================================================================================*/
/* SECTION 17 — TRACÉ DE DENSITÉ PAR EXPRESSION SYMBOLIQUE : plot_area / plot_line_area
/*==============================================================================================================================*/
/*
/* Ces deux fonctions étendent le pipeline data_from_function → plot_line en ajoutant
/* le coloriage d'une zone sous la courbe. Elles permettent le pattern demandé :
/*
/*   var fdp         = 'exp(-0.5*((x-' + mu + ')/' + sigma + ')^2)/(' + sigma + '*sqrt(2*pi))';
/*   var Xrange_plot = [mu - 4*sigma, mu + 4*sigma];
/*   var Xrange_area = [-Infinity, c1];
/*   var ColNames    = ['X (kg)', 'f(x)'];
/*   var data        = data_from_function(fdp, Xrange_plot, ColNames);
/*   plot_line_area(data, 'graphe_q1', Xrange_area,
/*       { title: 'X ~ N(' + mu + ', ' + sigma + '\u00B2)', x_title: 'X (kg)',
/*         label: 'P(X \u2264 ' + c1 + ') \u2248 ' + ans.toPrecision(ncs) });
/*
/* OU en deux appels séparés (plot_line puis plot_area) :
/*
/*   plot_line(data, 'graphe_q1', 'X ~ N(mu, sigma\u00B2)', 'X (kg)', 'f(x)', 450, 260);
/*   plot_area(data, 'graphe_q1', Xrange_area, { label: 'P(X \u2264 c1)', color: '#3498db' });
/*   // Note : plot_area doit être appelé APRÈS plot_line (même div_id) ;
/*   //        elle redessine entièrement le graphique avec la zone colorée.
/*
/* Compatibilité : nerdamer doit être chargé (déjà dans le bloc CDN standard).
/*                 Google Charts loader.js doit être chargé.
/*==============================================================================================================================*/

/*------------------------------------------------------------------------------------------------------------------------------*/
/* plot_area(data, div_id, Xrange_area, options)
/*
/* Prend un tableau issu de data_from_function et le redessine dans div_id sous forme
/* d'un ComboChart Google Charts avec une zone colorée entre Xrange_area[0] et Xrange_area[1].
/*
/* La zone est ajoutée en insérant dans le tableau une 3ème colonne ("série area") dont les
/* valeurs sont égales à f(x) à l'intérieur de la zone et null à l'extérieur.
/* Cela produit visuellement un remplissage coloré sous la courbe, identique à plot_density.
/*
/* @param {Array}   data         Tableau au format data_from_function :
/*                                 data[0]   = ['nom_x', 'nom_y']   (en-têtes)
/*                                 data[1..n]= [xval, yval]
/* @param {string}  div_id       ID du <div> cible dans le DOM.
/* @param {Array}   Xrange_area  [xa, xb] — bornes de la zone colorée.
/*                                 Accepte -Infinity (gauche illimitée) et +Infinity (droite illimitée).
/*                                 Passer [] ou null pour ne tracer que la courbe sans zone.
/* @param {object}  options      Options graphiques (toutes optionnelles) :
/*                                 title        {string}  Titre du graphique       (défaut : '')
/*                                 x_title      {string}  Titre axe X              (défaut : data[0][0])
/*                                 y_title      {string}  Titre axe Y              (défaut : data[0][1])
/*                                 color        {string}  Couleur de la zone       (défaut : '#3498db')
/*                                 label        {string}  Légende de la zone       (défaut : auto)
/*                                 fill_opacity {number}  Opacité zone [0-1]       (défaut : 0.35)
/*                                 curve_color  {string}  Couleur de la courbe     (défaut : '#e74c3c')
/*                                 curve_width  {number}  Épaisseur trait          (défaut : 2)
/*                                 width        {number}  Largeur div en px        (défaut : 500)
/*                                 height       {number}  Hauteur div en px        (défaut : 280)
/*                                 legend       {boolean} Afficher légende         (défaut : true si zone)
/* @returns {void}
/*
/* Exemples :
/*   // P(X <= c1) — loi normale
/*   plot_area(data, 'graphe_q1', [-Infinity, c1],
/*       { label: 'P(X \u2264 ' + c1 + ') \u2248 ' + ans.toPrecision(2), color: '#3498db' });
/*
/*   // P(a <= X <= b) — intervalle symétrique
/*   plot_area(data, 'graphe_q2', [mu - sigma, mu + sigma],
/*       { label: 'P(mu - sigma \u2264 X \u2264 mu + sigma)', color: '#2ecc71' });
/*
/*   // P(X >= c) — queue droite
/*   plot_area(data, 'graphe_q1', [c, +Infinity],
/*       { label: 'P(X \u2265 ' + c + ')', color: '#e74c3c' });
*/
function plot_area(data, div_id, Xrange_area, options) {

    options      = options || {};
    Xrange_area  = (Xrange_area && Xrange_area.length === 2) ? Xrange_area : null;

    var x_title      = options.x_title      || data[0][0];
    var y_title      = options.y_title      || data[0][1];
    var title        = options.title        || '';
    var zone_color   = options.color        || '#3498db';
    var fill_opacity = (options.fill_opacity !== undefined) ? options.fill_opacity : 0.35;
    var curve_color  = options.curve_color  || '#e74c3c';
    var curve_width  = options.curve_width  || 2;
    var W            = options.width        || 500;
    var H            = options.height       || 280;

    // ── Libellé automatique de la zone ────────────────────────────────────────
    var zone_label = options.label;
    if (!zone_label && Xrange_area) {
        var xa = Xrange_area[0], xb = Xrange_area[1];
        if (!isFinite(xa) && isFinite(xb))      { zone_label = 'P(X \u2264 ' + xb + ')'; }
        else if (isFinite(xa) && !isFinite(xb)) { zone_label = 'P(X \u2265 ' + xa + ')'; }
        else                                    { zone_label = 'P(' + xa + ' \u2264 X \u2264 ' + xb + ')'; }
    }

    var show_legend = (options.legend !== undefined) ? options.legend : (Xrange_area !== null);

    // ── Détermination du x_min et x_max effectifs depuis le tableau data ──────
    var x_min_data = data[1][0];
    var x_max_data = data[data.length - 1][0];

    // Clamp les bornes de la zone sur l'étendue réelle des données
    var xa_clamped = Xrange_area ? Math.max(isFinite(Xrange_area[0]) ? Xrange_area[0] : -1e18, x_min_data) : null;
    var xb_clamped = Xrange_area ? Math.min(isFinite(Xrange_area[1]) ? Xrange_area[1] : +1e18, x_max_data) : null;

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(function() {

        // ── Construction du DataTable ─────────────────────────────────────────
        var dt = new google.visualization.DataTable();
        dt.addColumn('number', x_title);

        if (Xrange_area) {
            // Mode zone : courbe en dernier (z-order au-dessus de la zone)
            // Ordre des séries : zone_area (série 0) | courbe (série 1)
            dt.addColumn('number', zone_label);                                          // série 0 : area
            dt.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
            dt.addColumn('number', y_title);                                             // série 1 : courbe
            dt.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

            for (var i = 1; i < data.length; i++) {
                var xv = data[i][0];
                var yv = data[i][1];
                var in_zone = (xv >= xa_clamped && xv <= xb_clamped);
                var zone_y  = in_zone ? yv : null;
                var tt_curve = '<div style="padding:5px;font-size:12px;">' +
                               x_title + ' = ' + xv.toFixed(3) + '<br>' +
                               y_title + ' = ' + yv.toFixed(5) + '</div>';
                var tt_zone  = in_zone
                    ? '<div style="padding:5px;font-size:12px;">' + zone_label + '</div>'
                    : null;
                dt.addRow([xv, zone_y, tt_zone, yv, tt_curve]);
            }
        } else {
            // Mode courbe seule (pas de zone)
            dt.addColumn('number', y_title);
            dt.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
            for (var i = 1; i < data.length; i++) {
                var xv = data[i][0];
                var yv = data[i][1];
                var tt = '<div style="padding:5px;font-size:12px;">' +
                         x_title + ' = ' + xv.toFixed(3) + '<br>' +
                         y_title + ' = ' + yv.toFixed(5) + '</div>';
                dt.addRow([xv, yv, tt]);
            }
        }

        // ── Options Google ComboChart ─────────────────────────────────────────
        // Calcul du y_max réel pour un axe Y bien cadré (pas de 0→1 par défaut)
        var y_max = 0;
        for (var j = 1; j < data.length; j++) {
            if (data[j][1] > y_max) y_max = data[j][1];
        }
        var y_axis_max = y_max * 1.15;   // 15% de marge au-dessus du pic

        var series_opts;
        if (Xrange_area) {
            series_opts = {
                0: { type: 'area',  color: zone_color,  lineWidth: 0,          areaOpacity: fill_opacity },
                1: { type: 'line',  color: curve_color, lineWidth: curve_width, areaOpacity: 0 }
            };
        } else {
            series_opts = {
                0: { type: 'line', color: curve_color, lineWidth: curve_width, areaOpacity: 0 }
            };
        }

        var chart_options = {
            title:          title,
            titleTextStyle: { fontSize: 14, bold: true, color: '#2c3e50' },
            seriesType:     'line',
            series:         series_opts,
            tooltip:        { isHtml: true },
            legend:         show_legend ? { position: 'bottom', textStyle: { fontSize: 11 } } : { position: 'none' },
            vAxis: { title: y_title, viewWindow: { min: 0, max: y_axis_max }, titleTextStyle: { fontSize: 12 }, format: '#.####' },
            hAxis: { title: x_title, titleTextStyle: { fontSize: 12 } },
            chartArea: {
                width:  W - 120,
                height: H - 100,
                left: 80, bottom: 60,
                backgroundColor: { stroke: '#bdc3c7', strokeWidth: 1 }
            },
            width:  W,
            height: H,
            backgroundColor: 'transparent'
        };

        var container = document.getElementById(div_id);
        if (!container) {
            console.warn('plot_area : div_id "' + div_id + '" introuvable.');
            return;
        }
        var chart = new google.visualization.ComboChart(container);
        chart.draw(dt, chart_options);
    });
}


/*------------------------------------------------------------------------------------------------------------------------------*/
/* plot_line_area(data, div_id, Xrange_area, options)
/*
/* Combinaison de plot_line ET plot_area en un seul appel.
/* Reçoit le tableau issu de data_from_function, trace la courbe ET colorie la zone
/* en un seul passage — inutile d'appeler plot_line puis plot_area séparément.
/*
/* C'est la fonction recommandée pour le pattern complet des questions Moodle :
/*
/*   var fdp         = 'exp(-0.5*((x-' + mu + ')/' + sigma + ')^2)/(' + sigma + '*sqrt(2*pi))';
/*   var Xrange_plot = [mu - 4*sigma, mu + 4*sigma];
/*   var Xrange_area = [-Infinity, c1];
/*   var ColNames    = ['X (kg)', 'f(x)'];
/*   var data        = data_from_function(fdp, Xrange_plot, ColNames);
/*   plot_line_area(data, 'graphe_q1', Xrange_area,
/*       { title: 'X ~ N(' + mu + ', ' + sigma + '\u00B2)',
/*         label: 'P(X \u2264 ' + c1 + ') \u2248 ' + ans.toPrecision(ncs) });
/*
/* @param {Array}   data         Tableau data_from_function (en-têtes + points).
/* @param {string}  div_id       ID du <div> cible.
/* @param {Array}   Xrange_area  [xa, xb] — zone colorée. Mêmes règles que plot_area.
/* @param {object}  options      Mêmes options que plot_area.
/* @returns {void}
/*
/* Note : plot_line_area est un alias de plot_area — les deux fonctions ont
/*        exactement la même signature. plot_line_area est fourni pour que
/*        le code question soit auto-documenté ("je trace la ligne ET la zone"). */
function plot_line_area(data, div_id, Xrange_area, options) {
    plot_area(data, div_id, Xrange_area, options);
}
