//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄다고알려줌
//랜덤 번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Rest버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다

let computerNum = 0;
let playButton = document.getElementById("playButton");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("resultArea");
let resetButton = document.getElementById("resetButton");
let chancesArea = document.getElementById("chancesArea");
let chances = 5;
let gameOver = false;
let history=[];

console.log("playButton",playButton);


playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value = "";
});

// function pickRandomNum(){
//     computerNum = Math.floor(Math.random()*100)+1;
//     console.log("정답",computerNum);
// }

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}

function play(){
   let userValue = userInput.value
  
   if(userValue < 1 || userValue>100){
    resultArea.textContent="1과 100사이 숫자를 입력해주세요"
    return
   } 

   if(history.includes(userValue)){
    resultArea.textContent="이미 입력한 숫자입니다. 다른 겂을 입력해주세요."
    return;
   }


   chances --;
   console.log("chance",chances);
   chancesArea.textContent = `(남은 찬스:${chances}번)` ;
   if(userValue < computerNum) {
    resultArea.textContent = "UP!!"
   
   }else if(userValue > computerNum){
    resultArea.textContent = "Down!!"
   
   }else{
    resultArea.textContent = "정답입니다!";
    gameOver = true;

    //console.log("맞추셨습니다!")
   }

    history.push(userValue);
    console.log("history",history);

   if(chances == 0) {
    gameOver = true;
   }
   if(gameOver == true){
    playButton.disabled = true;
   }
}

function reset(){
    // user input창 초기화
    userInput.value = "";
    // 새로운 번호 생성
    
  
    chances = 5;
    history=[];
    resultArea.textContent ="결과값이 여기 나옵니다!";
    chancesArea.textContent = `(남은 찬스:${chances}번)` ;
  
    gameOver = false;
    console.log("gameOver",gameOver);
    playButton.disabled = false;
    pickRandomNum();
}


pickRandomNum();



