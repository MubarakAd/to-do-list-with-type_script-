"use strict";
const addtask = document.getElementById("addtask");
const tasklist = document.getElementById("tasklist");
const inputtask = document.getElementById("inputtask");
loadTasks();
function task() {
    const add = inputtask.value.trim();
    if (add) {
        createtask(add);
        savetask();
        inputtask.value = "";
    }
    else {
        showError("please enter a task");
    }
}
function showError(message) {
    const errorInput = document.createElement("input");
    errorInput.value = message;
    errorInput.className = "eror";
    errorInput.disabled = true;
    const errorContainer = document.getElementById("Error");
    errorContainer.appendChild(errorInput);
    setTimeout(() => {
        errorContainer.removeChild(errorInput);
    }, 1000);
}
function createtask(taskText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    deletebutton.className = "deletebutton";
    li.appendChild(deletebutton);
    const updatebutton = document.createElement("button");
    updatebutton.textContent = "Update";
    updatebutton.className = "update";
    li.appendChild(updatebutton);
    deletebutton.addEventListener("click", function () {
        tasklist.removeChild(li);
        savetask();
    });
    updatebutton.addEventListener("click", function () {
        const newText = prompt("Update your task:", span.textContent || "");
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            savetask();
        }
    });
    tasklist.appendChild(li);
}
function savetask() {
    let tasks = [];
    tasklist.querySelectorAll("li").forEach(function (item) {
        var _a;
        const span = item.querySelector("span");
        if (span) {
            const textContent = ((_a = span.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            tasks.push(textContent);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = localStorage.getItem("tasks");
    const parsedTasks = tasks ? JSON.parse(tasks) : [];
    parsedTasks.forEach((task) => createtask(task));
}
addtask.addEventListener("click", task);
