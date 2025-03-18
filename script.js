document.addEventListener("DOMContentLoaded", () => {loadTask()})
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Digite um tarefa válida");
        return;
    }

    let taskList = document.getElementById("taskList");
    let item = document.createElement("li")
    item.innerHTML = `
        <span onclick= "toggleTask(this)"> ${taskText} </span>
        <button class= "delete-btn" onclick= "deleteTask(this)">✖</button>
    `
    taskList.appendChild(item);
    saveTasks()
    taskInput.value = "";
}

function toggleTask(element) {
    element.parentElement.classList.toggle("completed")
    saveTasks()
}

function deleteTask(button) {
    button.parentElement.remove()
    saveTasks()
}

function saveTasks() {
    let tasks = []
    document.querySelectorAll("#taskList li").forEach((task) => {
        tasks.push({
            task: task.innerText.replace("✖","").trim(),
            status: task.classList.contains("completed")
        })
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    let taskList = document.getElementById("taskList");

    tasks.forEach (element => {
        let item = document.createElement("li")
        item.innerHTML = `
        <span onclick= "toggleTask(this)"> ${element.task} </span>
        <button class= "delete-btn" onclick= "deleteTask(this)">✖</button>
        `
        if (element.status) {
            item.classList.add("completed")
        }

        taskList.appendChild(item);
    })
}