const elements = document.querySelectorAll('.memory-card');

let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

elements.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    checkIfWon();
    this.classList.add('flip');

    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        checkCards();
    }
}

function checkCards(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.setAttribute('data-flipped', 'true');
    secondCard.setAttribute('data-flipped', 'true');

    checkIfWon();
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 750);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function initCards(){
    let nums = ['img/java.svg', 'img/javascript.svg', 'img/python.svg', 'img/kotlin.svg', 
    'img/c++.svg', 'img/php.svg', 'img/typescript.svg', 'img/go.svg'];
    let index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let img = document.querySelectorAll('.front-face');
    let Cards = document.querySelectorAll('.memory-card');
    let rnd = 0, rnd2 = 0, tf = false;
    let CardName = "";
    for (let i = 0; i < 8; i++){
        while (tf == false) {
            rnd = index[Math.floor(Math.random() * 16)];
            rnd2 = index[Math.floor(Math.random() * 16)];

            if (index.includes(rnd) == true && index.includes(rnd2) == true && rnd != rnd2 && rnd !== undefined && rnd2 !== undefined){
                CardName = nums[i].substring(4, nums[i].length);
                CardName = CardName.substring(0, CardName.length - 4);

                img[rnd - 1].src = nums[i];
                img[rnd2 - 1].src = nums[i];

                Cards[rnd - 1].setAttribute("data-framework", CardName);
                Cards[rnd2 - 1].setAttribute("data-framework", CardName);

                index = removeItem(rnd, index);
                index = removeItem(rnd2, index);
                
                tf = true;
            }
        }
        tf = false;
    }
}

function checkIfWon(){
    let wrong = 0;
    let tf = true;
    let Cards = document.querySelectorAll('.memory-card');

    for (let i = 0; i < Cards.length; i++){
        if (Cards[i].getAttribute('data-flipped') != 'true'){
            wrong++;
        }
    }

    if (wrong == 0){
        let x = confirm("Sie haben gewonnen! Möchten Sie noch eine Runde spielen?");
        x ? location.reload() : null;
    }
}

function removeItem(item, arr){
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == item){
            arr.splice(i, 1);
        }
    }
    return arr;
}

window.onload = initCards();