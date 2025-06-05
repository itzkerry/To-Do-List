
let box = document.querySelector(".tasks");
let clearAll = document.getElementById("clear");
let input = document.getElementById("input");
let taskList = document.querySelector(".tasks");
let text = '';

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(item => {
        displayTask(item);
    });
}

function displayTask(item){
    // console.log("displaying task");
    const text = item.task;
    const complete = item.completed;
    const taskDiv = document.createElement('div');
    taskDiv.innerHTML = `
                    <input type="checkbox" class="check">
                    <span>${text}</span>`;
    taskDiv.classList.add('task');
    let check = taskDiv.querySelector('input');
    check.checked = complete;
    taskDiv.classList.toggle("completed",complete);

    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
                    <button>Edit</button>
                    <button>Delete</button>`;
    buttonDiv.classList.add("edit");
    let li = document.createElement('li');
    li.classList.add('item');
    li.appendChild(taskDiv);
    li.appendChild(buttonDiv);

    box.appendChild(li);
}

function addTask(){
    const taskText = input.value.trim();

    if(taskText){
        let item = {"task":taskText, "completed" : false};

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(typeof(tasks));
        tasks.push(item);
        localStorage.setItem('tasks',JSON.stringify(tasks));

        displayTask(item);
    }
    input.value = '';
}

function removeTask(button){
    let p = button.parentNode.parentNode;
    let t = p.querySelector('.task');
    let text = t.querySelector('span').innerText;
    console.log(text);
    button.closest('li').remove();

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    let v = tasks.find((e)=> e.task === text);
    let index = tasks.indexOf(v);
    tasks.splice(index,1);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function save(button){
    let item = button.closest('li');
    let e = item.querySelector('.task');
    let Edit = e.querySelector('input');
    const updatedText = Edit.value;
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let i = tasks.find((p)=> p.task === text);
    i.task = updatedText;
    localStorage.setItem('tasks',JSON.stringify(tasks));
    e.innerHTML = `<div class="task">
                    <input type="checkbox" class="check">
                    <span>${updatedText}</span>
                </div>`
    button.innerText = 'Edit';
}
function editTask(button){
    let item = button.closest('li');
    let e = item.querySelector('.task');
    let span = e.querySelector('span');
    text = span.innerText;
    e.innerHTML = `<input type="text" value="${text}">`
    button.innerText = 'Save';    
}
function checkbox(e){
    let div = e.parentNode;
    let text = div.querySelector('span').innerText;
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let i = tasks.find((p)=> p.task === text);
    i.completed = i.completed ? false : true;
    localStorage.setItem('tasks',JSON.stringify(tasks));
    console.log("aage");
    div.classList.toggle("completed",i.completed);
    console.log("piche");
}

function clear(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(0);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    taskList.innerText = '';
}


document.addEventListener('DOMContentLoaded',()=>{
    loadTasks();
    
    clearAll.addEventListener('click',(e)=>{
        if(e.target.innerText === 'Clear All'){
            clear();
        }
    });
    
    // event for editing and removing task 
    taskList.addEventListener('click',function(e){
        if(e.target.textContent == 'Edit'){
            editTask(e.target);
        }else if(e.target.textContent == 'Delete'){
            removeTask(e.target);
        }else if(e.target.textContent == 'Save'){
            save(e.target);
        }
    });
    // Event for checkbox
    taskList.addEventListener('change',(e)=>{
        if(e.target.type == 'checkbox'){
            checkbox(e.target);
        }
    });
    
    //Event for adding task 
    input.addEventListener('keydown',function(event){
        if(event.key === 'Enter'){
            try{
                addTask();
            }
            catch(error){
                console.log(error);
            }
            event.preventDefault();
        }
    });
});