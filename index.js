// TODO:
// доделать кости
// сделать форму в которой будет имя игроков
//
const bones = document.querySelector(".player__bones img");

const imgFirst = document.querySelector("#images-first");
const imgSecond = document.querySelector("#images-second");

const counterFirst = document.querySelectorAll("#counter-first span")[0];
const counterSecond = document.querySelectorAll("#counter-second span")[0];

const lastBonesFirst = document.querySelectorAll(".last-bones span")[0];
const lastBonesSecond = document.querySelectorAll(".last-bones span")[1];

const h1 = document.querySelector("h1 span");

let move = true;

function changePlayer() {
  h1.textContent = move ? 1 : 2;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function animationCursorImg() {
  const cursorStr = bones.src;

  if (cursorStr.match(/cursor.svg/) == null) {
    document.querySelector(".player__bones").classList.remove("bones-anim");
  }
}
animationCursorImg();

function randomBones() {
  const randomNum = randomNumber(1, 6);

  bones.src = `./images/${randomNum}.jpg`;
  bones.setAttribute("data-id", randomNum);

  animationCursorImg();

  addingCoins(randomNum);
  whoseMove();
  styleGray();
  calculateWinnner();
  changePlayer();
  lastBones();

  return randomNumber;
}

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

function calculateWinnner() {
  let numberFirst = +counterFirst.innerHTML;
  let numberSecond = +counterSecond.innerHTML;

  if (numberFirst > 20 || numberSecond > 20) {
    if (numberFirst >= numberSecond)
      renderModalWinner("1 игрок", numberFirst - numberSecond);
    if (numberFirst <= numberSecond)
      renderModalWinner("2 игрок", numberSecond - numberFirst);
  }
}

function lastBones() {
  if (move) {
    lastBonesSecond.innerHTML = bones.getAttribute("data-id");
  } else {
    lastBonesFirst.innerHTML = bones.getAttribute("data-id");
  }
}

function renderModalWinner(playerWinner, coins) {
  return (document.body.innerHTML += `
   <div id="modal" class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__body">
        <img class="modal__img" src="./images/first-pl.svg" alt="" />
        <p class="modal__text">Победил ${playerWinner}, с отрывом в ${coins} очков</p>
         <button onClick="reloadLocation()">Сыграть ище раз</p>
        </div>
      </div>
    </div>
    `);
}

function reloadLocation() {
  location.reload();
}

bones.addEventListener("click", randomBones);
