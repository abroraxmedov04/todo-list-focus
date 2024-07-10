const form = document.forms.myForm;
const input = form.elements.myInput;
const template = document.querySelector(".templateTask").content;
const list = document.querySelector("#list");

let tasks = [];

input.addEventListener("blur", function () {
  if (!this.value.trim()) {
    this.classList.add("error");
    this.focus();
  } else {
    this.classList.remove("error");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputValue = input.value.trim();

  if (!inputValue) {
    input.classList.add("error");
    input.focus();
    return;
  }

  let date = new Date();
  let newTask = {
    id: date.getTime(),
    task: inputValue,
    isDone: false,
  };

  tasks.push(newTask);
  input.value = "";
  input.classList.remove("error");
  renderTasks(tasks, list);
  saveTasksToLocalStorage();
});

function renderTasks(arr, node) {
  node.innerHTML = "";
  arr.forEach((item) => {
    let clone = template.cloneNode(true);
    let taskText = clone.querySelector(".task-text");
    let deleteBtn = clone.querySelector(".delete-btn");
    let editBtn = clone.querySelector(".edit-btn");
    let checkBox = clone.querySelector(".check-box");

    taskText.textContent = item.task;
    deleteBtn.dataset.deleteId = item.id;
    editBtn.dataset.editId = item.id;
    checkBox.dataset.checkId = item.id;

    if (item.isDone) {
      checkBox.checked = true;
      taskText.classList.add("done");
    } else {
      checkBox.checked = false;
      taskText.classList.remove("done");
    }

    node.appendChild(clone);
  });
}

function deleteTodo(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks(tasks, list);
  saveTasksToLocalStorage();
}

function handleBlurEdit(e, parent, editBtn, text) {
  const editedTaskText = e.target.value.trim();
  const id = parseInt(editBtn.dataset.editId, 10);

  if (!editedTaskText) {
    editBtn.textContent = "edit";
    parent.classList.remove("active");
    return;
  }

  tasks = tasks.map((item) => {
    if (item.id === id) {
      return { ...item, task: editedTaskText };
    }
    return item;
  });

  saveTasksToLocalStorage();

  text.textContent = editedTaskText;
  editBtn.textContent = "edit";
  parent.classList.remove("active");
}

function handleCheck(id, checked) {
  tasks = tasks.map((item) => {
    if (item.id === id) {
      return { ...item, isDone: checked };
    }
    return item;
  });
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

list.addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("delete-btn")) {
    const id = parseInt(target.dataset.deleteId, 10);
    deleteTodo(id);
  }

  if (target.classList.contains("edit-btn")) {
    let parent = target.parentNode;
    parent.classList.toggle("active");
    let text = parent.querySelector(".task-text");

    if (parent.classList.contains("active")) {
      let currentTaskText = text.textContent;
      text.innerHTML = `<input type="text" name="editMy" class="edit-input" value="${currentTaskText}">`;
      target.textContent = "save";

      let editInput = parent.querySelector(".edit-input");
      editInput.addEventListener("blur", function (e) {
        const parent = this.closest(".item");
        const editBtn = parent.querySelector(".edit-btn");
        const text = parent.querySelector(".task-text");
        handleBlurEdit(e, parent, editBtn, text);
      });

      editInput.focus();
    } else {
      let editedTaskText = text.querySelector(".edit-input").value;
      handleBlurEdit(
        { target: { value: editedTaskText } },
        parent,
        target,
        text
      );
    }
  }

  if (target.classList.contains("check-box")) {
    const id = parseInt(target.dataset.checkId, 10);
    handleCheck(id, target.checked);
    renderTasks(tasks, list);
  }
});

loadTasksFromLocalStorage();
renderTasks(tasks, list);
