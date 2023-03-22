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
let playButton = document.getElementById('playButton');
let resetButton = document.getElementById('resetButton');
let userInput = document.getElementById('userInput');
let resultArea = document.getElementById('resultArea');
let chancesArea = document.getElementById('chancesArea');
let chances = 5;
let history = [];
let gameOver = false;



playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value = "";
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100+1);
    console.log("정답", computerNum);
}

function play(){
    let userValue = userInput.value ;
    console.log(userValue);
   


   
    console.log(history);
   if(userValue < 0 || 100 < userValue ){
    resultArea.textContent = "1부터 100사이의 숫자만 입력가능합니다.";
    return
   }
   if(history.includes(userValue)){
    resultArea.textContent = "이미 입력했던 숫자입니다.";
    console.log(history.includes(userValue));
    return;
   }

   

   if(computerNum > userValue){
    resultArea.textContent = "UP!";
   } else if(computerNum < userValue){
    resultArea.textContent = "DOWN!";
   } else if(computerNum == userValue){
    resultArea.textContent = "정답입니다!";
    gameOver = true;
   } 
   
    --chances;
    chancesArea.textContent = `(남은 찬스:${chances}번)`;

    if(chances <= 0){
        gameOver = true;
        console.log("gameOver", gameOver);
    }
    if(gameOver == true){
        userInput.value = "";
        playButton.disabled = true;
    }
    history.push(userValue);
   
}

function reset(){
   userInput.value = "";
   history=[];
   chances = 5;
   gameOver = false;
   playButton.disabled = false;
   chancesArea.textContent = `(남은 찬스:${chances}번)`;
   pickRandomNum();
}





pickRandomNum();


