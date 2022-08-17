const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');
const tasksContainer = document.querySelector('.tasks-container');
const checkAll = document.querySelector('.button-check-all');
const settigns = document.querySelector('.button-settings');
const deleteAll = document.querySelector(".button-delete-all");

const switchOptions = document.querySelector(".form-check-input");
const timeInput = document.querySelector(".time");
const timeInputValue = timeInput.value;
const saveBtn = document.querySelector("#save-btn");

const switchInLocalStorage = localStorage.getItem('notificationSwitch');



window.onload = () => {


  if (Notification.permission !== "default") {

    if (!localStorage.getItem('notificationSwitch')) {
      localStorage.setItem('notificationSwitch', '1')
    }
  } else {
    Notification.requestPermission()
  };
  
  if (switchInLocalStorage == '1') {
    switchOptions.checked = true;
  } else {
    switchOptions.checked = false
  }


}

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();
  
    console.log(inputIsValid);
  
    if (!inputIsValid) {
      return inputElement.classList.add("error");
    }

    //Adicionar Task

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-regular');
    deleteItem.classList.add('fa-trash-can');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));
  
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer);


    inputElement.value = "";
    updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for(const task of tasks) {

    if(task.firstChild.isSameNode(taskContent)) {
      task.firstChild.classList.toggle("completed");

    };
  };
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for(const task of tasks) {
    if(task.firstChild.isSameNode(taskContent)) {
      taskItemContainer.remove();
    }
  }
  updateLocalStorage();
}

const handleInputChange = () => {
    const inputIsValid = validateInput();
  
    if (inputIsValid) {
      return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains('completed');

    return {descripition: content.innerText, isCompleted}
  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

//FUNÇÃO PARA MARCAR TODAS AS TAREFAS
const checkAllTasks = () => {
  const tasks = document.querySelectorAll(".task-item");

  

  for (let i = 0; i < tasks.length; ++i) {
    //tasks[i].firstChild.classList.add("completed");
    tasks[i].firstChild.classList.toggle("completed");

  };

  updateLocalStorage();
};

//FUNÇÃO PARA APAGAR TODAS AS TAREFAS
const deleteAllTasks = () => {
  const tasks = document.querySelectorAll(".task-item");

  
  for (let i = 0; i < tasks.length; ++i) {
    tasks[i].remove();
  };

  updateLocalStorage();
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  //Verifica se há tasks in LocalStorage, se não tiver o 'return' sai da função
  if(!tasksFromLocalStorage) return;

  for(const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = task.descripition;

    if(task.isCompleted) {
      taskContent.classList.add('completed');
    }

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-regular');
    deleteItem.classList.add('fa-trash-can');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));
  
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer);
  }

};
refreshTasksUsingLocalStorage();


//PARA UPDATES FUTUROS
/*
const notificationSwitch = () => {

  if (switchOptions.checked == false) {
    localStorage.setItem('notificationSwitch', '0')
    switchOptions.checked = false
  } else {
    localStorage.setItem('notificationSwitch', '1')
    switchOptions.checked = true
  }



};

const notificationAlert = () => {

  

}


saveBtn.addEventListener('click', () => console.log(timeInput.value))
switchOptions.addEventListener('change', () => notificationSwitch())

*/


deleteAll.addEventListener('click', () => deleteAllTasks());
checkAll.addEventListener('click', () => checkAllTasks()); //CLICK DO BOTÃO DE MARCAR TODAS AS TAREFAS
addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());