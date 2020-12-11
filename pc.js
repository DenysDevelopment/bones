// TODO:
// доделать кости
// сделать форму в которой будет имя игроков
//
const bones = document.querySelector(".player__bones img");

const imgFirst = document.querySelector("#images-first");
const imgSecond = document.querySelector("#images-second");

const counterFirst = document.querySelector("#counter-first span");
const counterSecond = document.querySelector("#counter-second span");

const lastBonesFirst = document.querySelectorAll(".last-bones span")[0];
const lastBonesSecond = document.querySelectorAll(".last-bones span")[1];

const h1 = document.querySelector("h1 span");

let move = true;

function changePlayer() {
  h1.textContent = move ? "вы ходите" : "ходит Компютер";
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomBones() {
  const randomNum = randomNumber(1, 6);

  bones.src = `./images/${randomNum}.jpg`;
  bones.setAttribute("data-id", randomNum);

  addingCoins(randomNum);
  whoseMove();
  styleGray();
  calculateWinnner();
  changePlayer();
  lastBones();
  animationCursorImg();
  if (!move) {
    moveComputer();
  } else {
    bones.style.display = "block";
  }

  return randomNumber;
}

function animationCursorImg() {
  const cursorStr = bones.src;

  if (cursorStr.match(/cursor.svg/) == null) {
    document.querySelector(".player__bones").classList.remove("bones-anim");
  }
}
animationCursorImg();

function whoseMove() {
  if (move) move = false;
  else move = true;
}

function styleGray() {
  if (move) {
    imgSecond.style.filter = "grayscale(1)";
    imgSecond.style.poinerEvents = "none";
    imgFirst.style.filter = "grayscale(0)";
  } else {
    imgFirst.style.filter = "grayscale(1)";
    imgFirst.style.poinerEvents = "none";
    imgSecond.style.filter = "grayscale(0)";
  }
}
styleGray();

function addingCoins(randomNum) {
  if (move) {
    counterFirst.innerHTML = randomNum + Number(counterFirst.innerHTML);
  } else {
    counterSecond.innerHTML = randomNum + Number(counterSecond.innerHTML);
  }
}

function lastBones() {
  if (move) {
    lastBonesSecond.innerHTML = bones.getAttribute("data-id");
  } else {
    lastBonesFirst.innerHTML = bones.getAttribute("data-id");
  }
}

function calculateWinnner() {
  let numberFirst = counterFirst.innerHTML;
  let numberSecond = counterSecond.innerHTML;

  if (numberFirst > 20 || numberSecond > 20) {
    if (numberFirst >= numberSecond)
      renderModalWinner("Вы победили", numberFirst - numberSecond);
    if (numberFirst < numberSecond)
      renderModalWinner("Компютер победил", numberSecond - numberFirst);
  }
}
calculateWinnner();

function renderModalWinner(playerWinner, coins) {
  if (move) {
    return (document.body.innerHTML += `
   <div id="modal" class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__body">
        <img class="modal__img" src="./images/first-pl.svg" alt="" />
        <p class="modal__text">${playerWinner}, с отрывом в ${coins} очков</p>
        <button onClick="reloadLocation()">Сыграть ище раз</p>
        </div>
    </div>
    `);
  }
}

function moveComputer() {
  setTimeout(randomBones, 2000);
  bones.style.display = "none";
}

function reloadLocation() {
  location.reload();
}

bones.addEventListener("click", randomBones);
