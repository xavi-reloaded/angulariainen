// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Memoria general",
        "main":    "<p>Seguro que puedes con esto ? Primero vamos a testear si te acuerdas de lo que hemos hecho.</p>",
        "results": "<h5>Hay que seguir estudiando</h5><p>No vamos mal pero hay que estudiar más. Este curso es para aprender un lenguage más potente.</p>",
        "level1":  "Has acertado todo, no está nada mal.",
        "level2":  "Bueno... no te acuerdas de todo",
        "level3":  "Madre mia ! tienes que repasar los apuntes",
        "level4":  "Amelie... no te enteras, tendremos que repasarlo todo.",
        "level5":  "No has acertado ni una !!! Que desastre pequeño demonio !!!"
    },
    "questions": [
        { // Question 1
            "q": "Para que sirve el comando 'man' ?",
            "a": [
                {"option": "Pinta los usuarios que se han conectado al ordenador",      "correct": false},
                {"option": "Muestra los mandos del ordenador",     "correct": false},
                {"option": "Da ayuda sobre un comando por pantalla",      "correct": true},
                {"option": "Sirve para ver el contenido de los archivos de texto",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Correcto !</span> Veo que te acuerdas... Muy bien !</p>",
            "incorrect": "<p><span>Que va !</span> No te acuerdas que era `man`y el comando que quieras y te  <em>muestra</em> como se usa ?!?!?!</p>" // no comma here
        },
        { // Question 2
            "q": "Qué es Ubuntu?",
            "a": [
                {"option": "Un lenguage de ordenador.",    "correct": false},
                {"option": "Un sistema operativo",     "correct": true},
                {"option": "Un ordenador",      "correct": false},
                {"option": "Lo contrario de Windows",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Menos mal !</span> La has acertado, muy bien pequeñaja !</p>",
            "incorrect": "<p><span>Que desastre !</span> Eres una pinky !!</p>" // no comma here
        },
        { // Question 3
            "q": "Como se entra en un directorio?",
            "a": [
                {"option": "Con ls",        "correct": false},
                {"option": "Con cd",           "correct": true},
                {"option": "Con cat",  "correct": false},
                {"option": "Abriendo el terminal",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Bien!</span> Vas bien :)</p>",
            "incorrect": "<p><span>No!!!!</span> Esto es muy básico, si no te acuerdas madre miaaaa !!!.</p>" // no comma here
        },
        { // Question 4
            "q": "Si fueras un developer, podrías ganarte la vida tan bien como una profesión muy bien pagada",
            "a": [
                {"option": "Si",    "correct": true},
                {"option": "No",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Claro que sí!</span> Eres grande mi pequeña Amelie !</p>",
            "incorrect": "<p><span>ERRRR!</span> pues claro que sí, petardaken !!!" // no comma here
        },
        { // Question 5
            "q": "Te acuerdas de que es una variable",
            "a": [
                {"option": "Un elemento que contiene valores",   "correct": true},
                {"option": "Algo que dentro de un programa, que uso para hacer cálculos",          "correct": false},
                {"option": "Es un comando dentro de un programa",  "correct": false},
                {"option": "Es un script, es decir, el código que he escrito",  "correct": false} // no comma here
            ],
            "correct": "<p><span>Brillante!</span> si te acuerdas de esto, es que eres guay !</p>",
            "incorrect": "<p><span>Petardalen !!</span> Es urgente que volvamos a hacer ejercicios antes de seguir con este curso</p>" // no comma here
        } // no comma here
    ]
};