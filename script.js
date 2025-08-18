// variables declaration
var taskTitle = document.getElementById("taskTitle");
var taskDesc = document.getElementById("taskDesc");
var taskItems = document.querySelector(".task-items");
var btn = document.getElementById("addBtn");
var searchInput = document.getElementById("searchInput");
var taskList = [];


// localStorage.clear();

// retreiving the data from the local storage at startup
if(localStorage.getItem("taskList")) 
{
    taskList = JSON.parse(localStorage.getItem("taskList"));
    displayData(taskList);
}
else
{
    taskItems.classList.remove("has-tasks");
}


// the reset function to reset the entries and the btn
function init() {
    btn.innerText = "Add"; 
        btn.onclick = addTask; 
        taskTitle.value = "";  
        taskDesc.value = "";
}

// function to add tasks
function addTask() {
    var task = {
        name: taskTitle.value,
        desc: taskDesc.value,
        isDone: false
    };

    taskList.push(task);
    displayData(taskList);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    taskTitle.value = "";
    taskDesc.value = "";
}   

// function display the data
function displayData(list) {
    var data = ``;
    var listSize = list.length
    for (var i = 0; i < listSize; i++) {
        data += `<div class="task-item" data-index="${i}">
            <div class="task-content">
                <h4>${list[i].name}</h4>
                <p class="task-desc">${list[i].desc || ""}</p>
            </div>
            <span class="icons">
              <i class="fa fa-check" onclick="markDone(${i})"></i>
              <i class="fa fa-pencil" onclick="editData(${i})"></i>
            </span>
          </div>`;
    }
    taskItems.innerHTML = data;
    if (listSize > 0) {
        taskItems.classList.add("has-tasks");
    }
    else {
        taskItems.classList.remove("has-tasks");
    }

    search();
}

// function edit the data
function editData(idx) {
    if (!taskList[idx].isDone) {
    btn.innerText = "Update";
    taskTitle.value = taskList[idx].name;
    taskDesc.value = taskList[idx].desc;
    btn.onclick = function() 
    {
        taskList.splice(idx, 1, 
            {name: taskTitle.value, desc: taskDesc.value});
            displayData(taskList);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            init();
    }
}
    else {
        alert("You cannot edit a completed task.");
    }
     
}

// function mark done
function markDone(index) {
    var items = document.querySelectorAll(".task-item");
    items[index].classList.toggle("done");
    taskList[index].isDone = !taskList[index].isDone;
    
}


// function search
function search(){
    if (!searchInput) return;
    var query = searchInput.value.trim().toLowerCase();
    var items = document.querySelectorAll(".task-item");

    for (var item of items){
        var titleEl = item.querySelector("h4");
        var title = titleEl ? titleEl.textContent.toLowerCase() : "";

        if (query === "" || title.includes(query)){
            item.style.display = "flex";
        }
        else{
            item.style.display = "none";
        }
    }
}

if (searchInput) {
    searchInput.addEventListener("input", search);
}
