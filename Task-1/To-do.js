let input = document.getElementById("task-input");
let button = document.getElementById("add-btn");
let todoList = document.getElementById("task-list");

// let tasks=[];
let tasks=JSON.parse(localStorage.getItem('tasks'))||[];
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

button.addEventListener('click',()=>{
    if (input.value==="") return;
    
    tasks.push(input.value)
    saveTasks();
    addtask(input.value)
    input.value='';
})


function addtask(task){
  let li=document.createElement('li');
  li.innerText=task;

  let deleteBtn=document.createElement('button');
  deleteBtn.innerText='✖';
  deleteBtn.style.color='white';
  deleteBtn.cursor='pointer';

  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  li.addEventListener('click',()=>{
    li.style.textDecoration='line-through';
    removeTask(task);
  })
  deleteBtn.addEventListener('click',()=>{
    todoList.removeChild(li);
    removeTask(task);
  })
}

/* function removeTask(task) {
  let index = tasks.indexOf(task);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
}
 */
function removeTask(task){
  let index=tasks.indexOf(task);

  if (index!==-1){
    tasks.splice(index,1);
    saveTasks();
  }
}