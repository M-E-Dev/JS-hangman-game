// popup ortada olsun ayarla

const figures = document.querySelectorAll(".figure-part");
const wordArea = document.querySelector("#word");
const wrongLetters = document.querySelector("#wrong-letters");
const warningMessage = document.getElementById("notification-container");
const popupContainer = document.querySelector(".popup-container");
const playBtn = document.querySelector("#play-button");
const finalMess = document.querySelector("#final-message");
const finalMessReveal = document.querySelector("#final-message-reveal-word");
playBtn.addEventListener("click", () => {
    location.reload();
});

popupContainer.style.display = "none";
let word;
// let wordLen;
let count;
let minPlace = "_ ";
let placeHolder = [];
let wrongsArr = [];
let truesArr = [];

async function getWord() {
    const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
    );
    if (!response.ok) throw new Error("something went wrong!");
    const wordFromApi = await response.json();
    word = wordFromApi[0];
    // wordLen = word.length;
    splittedWord = word.split("");
    console.log(wordFromApi);
    console.log(word);
    count = 0;
    for (let i = 0; i < word.length; i++) {
        placeHolder.push(minPlace);
    }
    wordArea.innerHTML = placeHolder.join("");
}

window.onload = () => {
    getWord();
};

// const figure1 = figures[0];
// const figure2 = figures[1];
// const figure3 = figures[2];
// const figure4 = figures[3];
// const figure5 = figures[4];
// const figure6 = figures[5];

figures.forEach((item) => {
    item.style.visibility = "hidden";
});

// word.innerHTML = ""

// setTimeout(() => {
//     console.log(word);
// }, 1000);

window.addEventListener("keyup", (event) => {
    if (word.includes(event.key)) {
        if (truesArr.includes(event.key)) {
            warningMessage.classList.add("show");
            setTimeout(() => {
                warningMessage.classList.remove("show");
            }, 1000);
            console.log("1");
        } 
        
        
        else {
            truesArr.push(event.key);
            for (let i = 0; i < word.length; i++) {
                if (splittedWord[i] == event.key) {
                    placeHolder[i] = event.key.toUpperCase() + " ";
                }
            }
            console.log("2");
        }
        
        
        if (!wordArea.innerHTML.includes("_")) {
            console.log(wrongLetters.innerHTML);
            console.log("3");
            finalMessReveal.innerHTML = `..the word was: ${word}`;
            finalMess.innerHTML = "Congratulations! You did it!";
            popupContainer.style.display = "flex";
        }
    }
    
    
    else {
        if (wrongsArr.includes(event.key)) {
            warningMessage.classList.add("show");
            setTimeout(() => {
                warningMessage.classList.remove("show");
            }, 1000);
            console.log("4");
        } 
        
        
        else {
            wrongsArr.push(event.key);
            wrongLetters.innerHTML += event.key.toLocaleUpperCase() + " - ";
            count++;
            figures[count - 1].style.visibility = "visible";
            console.log("5");
        }
        
        
        if (wrongLetters.innerHTML.length == 24) {
            finalMessReveal.innerHTML = `..the word was: ${word}`;
            finalMess.innerHTML = "Ooops... You killed the poor guy!";
            popupContainer.style.display = "flex";
            console.log("6");
        }
    }
    
    wordArea.innerHTML = placeHolder.join("");

    if (event.keyCode === 13) {
        location.reload();
    }
});
