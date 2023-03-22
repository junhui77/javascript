// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true false
//2. true 이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let tabs = document.querySelectorAll(".taskTabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click",addTask);
console.log("tabs",tabs);


for(let i=1; i< tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}
function addTask(){
    // let taskContent = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    };

     taskList.push(task);
     console.log(taskList);
     mode = "all";
     render();
}

function render(){
    let list = [];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }


    let resultHTML = '' ;
    for(let i=0; i < list.length; i++){
        if(list[i].isComplete == true){
            console.log("렌더1")
            console.log(list[i].iscomplete)
            resultHTML += 
        `<div class="task">
            <div class="taskDone">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            console.log("렌더2")
            console.log(list[i].isComplete)
            resultHTML += 
        `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        
        }

        
    }

    document.getElementById("taskBoard").innerHTML = resultHTML;

   
}

function toggleComplete(id){
       
        for(let i=0; i<taskList.length; i++){
            // if(taskList[i].id == id && taskList[i].isComplete == false){
            //     taskList[i].isComplete = true
            //     break;
            // }else if(taskList[i].id == id && taskList[i].isComplete == true){
            //     taskList[i].isComplete = false
            //     break;
            // }
            if(taskList[i].id === id){
                taskList[i].isComplete = !taskList[i].isComplete;
                break;
            }
        }
        render();
        console.log("체크 됐음",taskList);
       
}

function deleteTask(id){
    for(let i=0; i < taskList.length; i++){
        if(mode == "all" && taskList[i].id === id){
            taskList.splice(i,1);
            filterList.splice(i,1);
            console.log("delete 이벤트 발생")
            break;
        }else if((mode == "ongoing" || mode == "done") && filterList[i].id === id){
            filterList.splice(i,1);
            taskList.splice(i,1);
            console.log("delete 이벤트 발생")
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id
    filterList = [];

    document.getElementById("underLine").style.width = event.target.offsetWidth + "px";
    document.getElementById("underLine").style.top = event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("underLine").style.left = event.target.offsetLeft + "px";

    console.log("filter 클릭",event.target);
    if(mode == "all"){
        console.log("mode이벤트 발생")
        render();
    }else if(mode == "ongoing"){
        for(let i=0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            } 
        }
       
      
        render();
    }else if(mode == "done"){
        for(let i=0; i< taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])

            }
        }
        render();
    }
    

}





function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}



