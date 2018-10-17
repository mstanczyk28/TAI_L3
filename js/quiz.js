(function() {
    const myQuestions = [
        {
            question: "Tramwaj jakiej linii prowadził Karol Krawczyk?",
            answers: {
                a: "8",
                b: "28",
                c: "18"
            },
            correctAnswer: "c"
        },
        {
            question: "Kto jest największym przeciwnikiem amatorskiej drużyny FC Albatros?",
            answers: {
                a: "Orły Otwocka",
                b: "Zamieć Piaski",
                c: "Cegły Muranów"
            },
            correctAnswer: "a"
        },
        {
            question: "Jak zaczyna się piosenka 'Sentymantalna ballada filozoficzna' Romana Kurskiego?",
            answers: {
                a: "Życie jak wysoka wieża, takie życie w mordę jeża...",
                b: "Pod celą, pod celą, poezje się mielą...",
                c: "Pod celą, pod celą, majową niedzielą..."
            },
            correctAnswer: "a"
        },
        {
            question: "Jak nazywają się rodzice Karola?",
            answers: {
                a: "Jadwiga i Edward",
                b: "Zofia i Karol",
                c: "Zofia i Edward"
            },
            correctAnswer: "b"
        },
        {
            question: "Na czym z poniższych Karol Krawczyk NIE próbował zarobić pieniędzy?",
            answers: {
                a: "na snakołykach z psiej karmy",
                b: "na barze szybkiej obsługi",
                c: "na odblaskowej paście do butów"
            },
            correctAnswer: "c"
        },
        {
            question: "'Tramwaj pędzi po prostej i po rondzie, a w nim motorniczy o głupim wyglądzie' to fragment utworu ułożonego przez Krawczyka i Norka:",
            answers: {
                a: "do występu świątecznego dla rozbawienia Marszałka",
                b: "w ramach pracy zespołu 'Kanalersi'",
                c: "do gazetki tramwajarskiej 'Pantograf'"
            },
            correctAnswer: "c"
        },
        {
            question: "Karol Krawczyk znany jest z tego, że często w swojej pracy:",
            answers: {
                a: "jeździ przy otwartych drzwiach",
                b: "przygniata staruszki drzwiami",
                c: "zapomina zatrzymać się na każdym przystanku"
            },
            correctAnswer: "b"
        },
        {
            question: "W jakiej drużynie piłkarskiej grają Tadziu i Karol?",
            answers: {
                a: "Albinosy",
                b: "Albatrosy",
                c: "Abiturenci"
            },
            correctAnswer: "b"
        },
        {
            question: "Jak Karol zwraca się do swojej teściowej?",
            answers: {
                a: "Mamusia",
                b: "Teściowa",
                c: "Wiedźma"
            },
            correctAnswer: "a"
        },
        {
            question: "Jaki brzmi tekst Danusi, aby Norek poszedł do mieszkania?",
            answers: {
                a: "Tadeuszu, czy mógłbyś udac się do mieszkania?",
                b: "Tadzik, na górę!",
                c: "Ręce do góry i chodź na mną!"
            },
            correctAnswer: "b"
        }
    ];

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
                     <input type="radio" name="question${questionNumber}" value="${letter}">
                      ${letter} :
                      ${currentQuestion.answers[letter]}
                   </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
                   <div class="question"> ${currentQuestion.question} </div>
                   <div class="answers"> ${answers.join("")} </div>
                 </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");
        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

        myStorage = window.localStorage;

        objects = JSON.parse(myStorage.getItem("score"));

        if (objects == null) {
            objects = [];
            objects[0] = numCorrect;
        } else {
            objects.push(numCorrect);
        }
        myStorage.setItem("score", JSON.stringify(objects));
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();