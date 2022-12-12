const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice_text'));
const progresstext = document.querySelector('#progresstext');
const scoreText = document.querySelector('#score');
const progressbarfull = document.querySelector('#progressbarfull');

const hints = Array.from(document.querySelectorAll('.Hinttext'));

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What's the official name for someone who travels and works in space?",
        choice1: 'a Moonwalker',
        choice2: 'a Rocket scientist',
        choice3: 'an Astronaut',
        choice4: 'a Star person',
        answer: 3,
        Hinttext: 'a person who is trained to travel in a spacecraft',
    },
    {
        question:"Who's the No 1 astronaut in the world?",
        choice1: "Neil Armstrong",
        choice2: "Roger Chaffee",
        choice3: "William Anders",
        choice4: "None of the above",
        answer: 1,  
        Hinttext: 'First human to step on the Moon',
    },
    {
        question: "Which planet has a hexagonal-shaped storm?",
        choice1: "Pluto",
        choice2: "Earth",
        choice3: "Starun",
        choice4: "Venus",
        answer: 3,
        Hinttext: 'It is the 6th planet in the Solar System',
    },
    {
        question: "How many constellations are there?",
        choice1: "55",
        choice2: "66",
        choice3: "44",
        choice4: "88",
        answer: 4,
        Hinttext: 'It falls between 70 to 90',
    },
    {
        question: "Which part of Astronaut's body changes shape due to microgravity?",
        choice1: 'Heart',
        choice2: 'Lungs',
        choice3: 'Kidney',
        choice4: 'Liver',
        answer: 1,
        Hinttext: 'Fist-sized organ that pumps blood throughout your body',
    },
    {
        question:"Which galaxy is Earth located in?",
        choice1: "Starbust galaxy",
        choice2: "Andromeda Galaxy",
        choice3: "The Milky Way galaxy",
        choice4: "None of the above",
        answer: 3,  
        Hinttext: 'Galactos - the milky thing in the sky',
    },
    {
        question: "Which of these planets is furthest from the sun?",
        choice1: "Neptune",
        choice2: "Earth",
        choice3: "Starun",
        choice4: "Venus",
        answer: 1,
        Hinttext: 'It is ranked 8th planet in the solar system',
    },
    {
        question: "What is the name of the first satellite sent into space?",
        choice1: "Geronimo",
        choice2: "Sputnik",
        choice3: "Fido",
        choice4: "Pluto",
        answer: 2,
        Hinttext: 'This satellite was launched by Soviet Union',
    },
    {
        question: "What is the name of the most recent satellite sent into space?",
        choice1: "Geronimo",
        choice2: "JPSS-2",
        choice3: "PLSV-C54",
        choice4: "GOES-18",
        answer: 2,
        Hinttext: 'This satellite was officially renamed as NOAA-21',
    },
    {
        question: "What is the name of the storm produced by the Sun?",
        choice1: "Solar storms",
        choice2: "Sun storms",
        choice3: "Heat storm",
        choice4: "UV storms",
        answer: 1,
        Hinttext: 'This is named with solar sysytem',
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progresstext.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })


   
    hints.forEach(Hinttext => {

        Hinttext.innerText = currentQuestion['Hinttext']    /*Hinttext is a class name*/
    })


    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()