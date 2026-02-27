document.addEventListener('DOMContentLoaded', function () {
  const todoInput = document.querySelector('.todo__input');
  const addBtn = document.querySelector('.add__btn');
  const todoContainer = document.querySelector('.todo__container');
  const emptyMessage = document.querySelector('.empty__message');

  let tasks = [];

  const renderTask = function () {
    todoContainer.innerHTML = '';

    if (tasks.length !== 0) {
      emptyMessage.classList.add('hidden');
    } else {
      emptyMessage.classList.remove('hidden');
    }

    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.classList = `task`;
      li.dataset.id = task.id;

      li.innerHTML = `
            <input type='checkbox' class='mark__complete'/>
            <span class="task__text">${task.text}</span>
            <div class="task-btn__container">
                <button class="btn edit__btn">Edit</button>
                <button class="btn delete__btn">Delete</button>
            </div>
        `;
      todoContainer.appendChild(li);
    });
  };

  const addTask = function (e) {
    e.preventDefault();
    const taskText = todoInput.value;
    const newtask = {
      id: Date.now(),
      text: taskText,
      complete: false,
    };
    tasks.push(newtask);
    renderTask();
    todoInput.value = '';
    todoInput.focus();
  };

  const handelTaskListClick = function (e) {
    const markBtn = document.querySelector('.mark__complete');

    const target = e.target.closest('button');
    if (!target || !markBtn) return;

    const taskId = target.closest('.task').dataset.id;
    if (target.classList.contains('delete__btn')) {
      deleteTask(taskId);
    }
  };

  const markTask = function (id) {
    tasks = tasks.find((task) => task.id == id);
  };

  const deleteTask = function (id) {
    tasks = tasks.filter((task) => task.id != id);
    renderTask();
  };

  //   const editTask = function(id) {
  //     let task = tasks.find(task => task.id == id)
  //     todoInput.value = task.task;
  //     addBtn.textContent = 'Edit';

  //   }

  addBtn.addEventListener('click', addTask);
  todoContainer.addEventListener('click', handelTaskListClick);
});
