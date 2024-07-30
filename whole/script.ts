const addtask = document.getElementById("addtask") as HTMLButtonElement;
const tasklist = document.getElementById("tasklist") as HTMLUListElement;
const inputtask = document.getElementById("inputtask") as HTMLInputElement;

loadTasks();

function task() {
    const add = inputtask.value.trim();
    if (add) {
        createtask(add);
        savetask();  
        inputtask.value = ""; 
    } else {
        // const eror=document.createElement("input")
        // eror.value="please enter a task"
        // eror.className="eror"
        // const dv=document.getElementById("Error")
        // dv.appendChild(eror)
        // setTimeout(countdown, 1000);
        // // alert("Please enter a task");
        showError("please enter a task")
    }
}
function showError(message:string) {
    // Create an error input element
    const errorInput = document.createElement("input");
    errorInput.value = message;
    errorInput.className = "eror";
    errorInput.disabled = true; // Make it read-only to act like a message

    // Find the error container and append the error message
    const errorContainer = document.getElementById("Error") as HTMLFormElement;
    errorContainer.appendChild(errorInput);

    // Remove the error message after 3 seconds (3000 milliseconds)
    setTimeout(() => {
        errorContainer.removeChild(errorInput);
    },1000);
}

function createtask(taskText:string) {
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
        // input = document.createElement("input")
        // input.className = "update-input"
        // input.value = span.textContent
        // btn = document.createElement("button")
        // btn.textContent = "Update"

        // document.getElementById("update-content").appendChild(input)
        // document.getElementById("update-content").appendChild(btn)

        const newText = prompt("Update your task:", span.textContent||"");
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            savetask();
        }
        // btn.addEventListener("click", ()=>{
        //     span.textContent = input.value
        //     savetask()
        })
    

    
    tasklist.appendChild(li);
}

function savetask() {
    let tasks: string[] = [];
    tasklist.querySelectorAll("li").forEach(function (item) {
        const span = item.querySelector("span");
        if (span) {
            const textContent = span.textContent?.trim() || "";
            tasks.push(textContent);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = localStorage.getItem("tasks");
    const parsedTasks: string[] = tasks ? JSON.parse(tasks) : [];
    parsedTasks.forEach((task: string) => createtask(task));
}


addtask.addEventListener("click", task);
