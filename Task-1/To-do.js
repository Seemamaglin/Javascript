let input = document.getElementById("task-input");
let button = document.getElementById("add-btn");
let todoList = document.getElementById("task-list");

let tasks=[];
button.addEventListener('click',()=>{
    tasks.push(input.value)
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

function removeTask(task){
  let newTasks=[];

  for(let i=0;i<tasks.length;i++){
    if (tasks[i]!== task){
      newTasks.push(tasks[i]);
    }
  }
  tasks=newTasks;
}