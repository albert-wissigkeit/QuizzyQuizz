let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",   //definiert als sogenannten string  (text-buchstabenfolge)
        "right_answer": 3  // definiert als sogenannter integer (zahl)
    },
    {
        "question": "Was kann man vom Mond aus sehen?",
        "answer_1": "Chinesische Mauer",
        "answer_2": "Freiheitsstatue",
        "answer_3": "Eiffelturm",
        "answer_4": "Pentagon",
        "right_answer": 1
    },
    {
        "question": "Was ist eine Platane?",
        "answer_1": "Laubbaum",
        "answer_2": "Abdeckung",
        "answer_3": "Computerbauteil",
        "answer_4": "grosser Bauernhof",
        "right_answer": 1
    },
    {
        "question": "Wie viele Igelarten gibt es Weltweit?",
        "answer_1": "82",
        "answer_2": "22",
        "answer_3": "8",
        "answer_4": "65",
        "right_answer": 2
    },
    {
        "question": "Wie viele stacheln hat ein ausgewachsener Igel?",
        "answer_1": "1.000-2.500",
        "answer_2": "5.000-8.000",
        "answer_3": "10.000-12.500",
        "answer_4": "12.500-14.000",
        "right_answer": 2
    },
    {
        "question": "Wer war keiner der Heiligen drei Könige aus der Bibelgeschichte?",
        "answer_1": "Caspar",
        "answer_2": "Melchor",
        "answer_3": "Hosea",
        "answer_4": "Balthasar",
        "right_answer": 3
    },
    {
        "question": "Wie wird ein explodierender Stern genannt?",
        "answer_1": "Supernova",
        "answer_2": "SETI",
        "answer_3": "Big Bang",
        "answer_4": "Roter Riese",
        "right_answer": 1
    },
    {
        "question": "Wie heißt die Nachbargalaxie der Milchstraße?",
        "answer_1": "Fornax",
        "answer_2": "Ogarmega",
        "answer_3": "Andromeda",
        "answer_4": "Verdan",
        "right_answer":  3
    },
    {
        "question": "Welche Farbe haben Khao Manee-Katzen ausschließlich?",
        "answer_1": "blau",
        "answer_2": "schwarz",
        "answer_3": "braun",
        "answer_4": "weiß",
        "right_answer": 4 
    },
    {
        "question": "Zu welchem Genre gehört das Spiel \"World of Warcraft\"?",
        "answer_1": "MMO",
        "answer_2": "MMORPG",
        "answer_3": "SRPG",
        "answer_4": "FPS",
        "right_answer":  2
    },
];

let rightQuestions = 0;

let currentQuestion = 0;

let AUDIO_success = new Audio('sounds/success.wav')
let AUDIO_loose = new Audio('sounds/loose.wav')

function init() {
    allQuestions()
    showCurrentQuestion()
}


function allQuestions() {
    document.getElementById('all-questions-number').innerHTML = questions.length;

    // let allQuestion = questions.length;  //meine 1 st version, functioniert, aber kürzer ist natürlich das andere :D
    // document.getElementById('all-questions-number').innerHTML = `
    // ${allQuestion} 
    // `;
}


function showCurrentQuestion() {
    if (gameIsOver()) {                   //wenn currentquestion größer oder gleich der array länge ist dann:
        showEndScreen();
    } else {
        
        updateToNextQuestion();
        
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';   //entfernt den style (display:none) der standartmäßig auf dem endscreen ist
    document.getElementById('questionBody').style = "display: none;";  // fügt display none dem game-body hinzu und zeigt somit nur den endscreen an
    document.getElementById('allQuestionsAnswered').innerHTML = questions.length; // zeigt die zahl aller fragen an
    document.getElementById('rightQuestionsAnswered').innerHTML = rightQuestions;  // zeigt an wie viele fragen man richtig hatte (in combi mit 
    //der cariablen oben + dem rightquestions++ wenn man richtig geantwortet hatte)
    // document.getElementById('hide-by-win').style = 'display: none;'; //versteckt das quiz-bild wenn man gewonnen hat (meine idee)
    document.getElementById('hide-by-win').src = "./img/beer.jpg"; //junus lösung, das bild wird überschrieben indem man auf src zugreift
    document.getElementById('progress-bar').innerHTML = `100 %`; // verändert die progress bar
    document.getElementById('progress-bar').style.width = `100%`;  // verändert die progress bar
}


function updateToNextQuestion() {


    let question = questions[currentQuestion];
    document.getElementById('question').innerHTML = question['question']; // eigene version hier drunter
    document.getElementById('answer1').innerHTML = question['answer_1'];
    document.getElementById('answer2').innerHTML = question['answer_2'];
    document.getElementById('answer3').innerHTML = question['answer_3'];
    document.getElementById('answer4').innerHTML = question['answer_4'];
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length; // junus lösung: current question +1 rechnen da man sonst an der stelle 0 anfängt

    percent = Math.round(percent * 100); //seine lösung fürs runden
    // percent = percent.toFixed(); //meine lösung fürs runden
    console.log('fortschritt:', percent);  // zwischenschritt um zu schauen ob die rechnung percent = xx überhaupt etwas bringt
    document.getElementById('progress-bar').innerHTML = `${percent} %`; // verändert die progress bar
    document.getElementById('progress-bar').style.width = `${percent}%`;  // verändert die progress bar
}


function answer(index) {
    let question = questions[currentQuestion];   // die variable question wied auf questions an der stelle currentquestions gesetzt (anfangs immer 0)
    console.log('Selected answer is', index);   // console zeigt welche antwort man geklickt hat (onclick im html) an
    let selectedQuestionNumber = index.slice(-1);  // hier wird dem index die letzte zahl abgeschnitten und an selectionquestionnumber übergeben
    console.log('selected questionnumber(antwort-slice1) is', selectedQuestionNumber) // hier wird einmal diese letzte zahl ausgegeben um zu schauen ob es klappt
    console.log('current right answer from question is', question['right_answer']);  // hier wird die richtige antwort angezeigt 
    // if ( currentQuestion > 0 ) {  // meine version die klassen wieder zu verstecken,video 13 wenn es nicht die erste frage ist, geht leider nicht...
    //     document.getElementById(index).parentNode.classList.remove('bg-danger');
    //     document.getElementById(idOfRightAnswer).parentNode.classList.remove('bg-success');
    //     }
    let idOfRightAnswer = `answer${question['right_answer']}`; // neue variable die den wert answer[zahl der antwort aus array] bekommt und somit kann auf die id zugegriffen werden

    updateProgressBar();
    if (rightAnswerSelected(selectedQuestionNumber, question)) {  // wenn die ausgewähle nummer die selbe zahl wie right-answer hat
        console.log('das ist das richtige ergebenis!');  // dann wird das richtige ergebnis angezeigt
        document.getElementById(index).parentNode.classList.add('bg-success'); //fügt der id index(aus dem html) die class bg-success hinzu
        //parentNode stehe dafür das die div darüber aber die klasse kriegt . classlist.add fügt die klasse hinzu
        rightQuestions++; // das ist mir dann selber eingefallen  hier :D
        AUDIO_success.play();
        
    } else {   // wenn nicht dann wird falsche antwort angezeigt
        console.log('falsche antwort!');
        document.getElementById(index).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); //hier wird auf die idofrightanswer zugegriffen
        AUDIO_loose.play();
    }
    document.getElementById('next-button').disabled = false; // der button wird hier aktiviert da er grundsätzlich deaktiviert ist

    // eigene idee ganz zu anfang, aber alles was davor kam wäre schwer geworden:
    // if ( index == 'answer_1') {    
    //     // wenn richtig grün anzeigen
    // } else {
    //     //wenn falsch rot anzeigen
    // }
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}

// let questionNumber = 2; //meine idee hochzählen:  wird hochgezählt damit man sieht bei welcher frage man ist 
function nextQuestion() {
    currentQuestion++; // frage wird erhöht von 0 auf 1 und so weiter 1 auf 2 
    // document.getElementById('current-question-number').innerHTML = questionNumber++;  //meine idee hochzählen: zählt beim klicken auf next die frage hoch.
    
    document.getElementById('current-question-number').innerHTML = currentQuestion + 1;  //einfacher als meine function 
    document.getElementById('next-button').disabled = true; //setzt den button auf disabled
    resetAnswerButtons()  // entfernt alle klassen z.b. grün / rot unterlegung für richtig und flasch
    showCurrentQuestion()  // läd die nächste frage

  

}


function resetAnswerButtons() {
    document.getElementById('answer1').parentNode.classList.remove('bg-success');
    document.getElementById('answer1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer2').parentNode.classList.remove('bg-success');
    document.getElementById('answer2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer3').parentNode.classList.remove('bg-success');
    document.getElementById('answer3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer4').parentNode.classList.remove('bg-success');
    document.getElementById('answer4').parentNode.classList.remove('bg-danger');
}


function restartGame() {
    document.getElementById('hide-by-win').src = "./img/quiz.png";
    document.getElementById('endScreen').style = 'display: none;';   //endscreen ausblenden
    document.getElementById('questionBody').style = "";   // questions werden wieder angezeigt bzw display none wird weggenommen

    rightQuestions = 0; // setzt right questions auf 0
    currentQuestion = 0; //soll curretnquestion auf 0 setzen
    document.getElementById('current-question-number').innerHTML = 1; // setzt den wert der current question auf 1
    document.getElementById('progress-bar').innerHTML = `$0 %`; // verändert die progress bar
    document.getElementById('progress-bar').style.width = `0%`;  // verändert die progress bar
    init();
}