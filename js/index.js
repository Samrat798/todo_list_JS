document.addEventListener('DOMContentLoaded', function () {
  const todoInput = document.querySelector('.todo__input');
  const addBtn = document.querySelector('.add__btn');
  const todoContainer = document.querySelector('.todo__container');
  const emptyMessage = document.querySelector('.empty__message');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTask = function (tasks) {
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
            ${task.complete ? '<input type="checkbox" checked />' : '<input type="checkbox" />'}
            <span class="task__text ${task.complete ? 'mark__complete' : ''}">${task.text}</span>
            <div class="task-btn__container">
            ${task.complete ? '<button class="btn edit__btn btn-disabled" disabled>Edit</button>' : '<button class="btn edit__btn">Edit</button>'}
                <button class="btn delete__btn">Delete</button>
            </div>
        `;
      todoContainer.appendChild(li);
    });
  };

  const addTask = function (e) {
    e.preventDefault();
    const taskText = todoInput.value;
    // Add new task
    const newtask = {
      id: Date.now(),
      text: taskText,
      complete: false,
    };
    tasks.push(newtask);
    renderTask(tasks);
    todoInput.value = '';
    todoInput.focus();
    saveTask();
    renderTask(tasks);
  };

  const handelTaskListClick = function (e) {
    if (e.target.type === 'checkbox') {
      markTask(e.target.parentElement.getAttribute('data-id'));
    }
    const target = e.target.closest('button');
    if (!target) return;
    const taskId = target.closest('.task').dataset.id;
    if (target.classList.contains('delete__btn')) {
      deleteTask(taskId);
    } else if (target.classList.contains('edit__btn')) {
      editTask(taskId);
    }
  };

  const markTask = function (id) {
    tasks.forEach(function (task) {
      if (task.id == id) {
        task.complete = !task.complete;
      }
    });
    renderTask(tasks);
    saveTask();
  };

  const deleteTask = function (id) {
    tasks = tasks.filter((task) => task.id != id);
    renderTask(tasks);
    saveTask();
  };

  const editTask = function (id) {
    const task = tasks.find((t) => t.id == id);
    const newVal = prompt('Edit your task: ', task.text);
    if (newVal !== null && newVal.trim() !== '') {
      task.text = newVal.trim();
    }
    saveTask();
    renderTask(tasks);
  };

  renderTask(tasks);
  addBtn.addEventListener('click', addTask);
  todoContainer.addEventListener('click', handelTaskListClick);
});
