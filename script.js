function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDeadline = document.getElementById("task-deadline");
    const taskPriority = document.getElementById("task-priority");
    const tasksTable = document.getElementById("tasks");

    const taskText = taskInput.value;
    const deadline = new Date(taskDeadline.value);
    const priority = taskPriority.value;

    if (taskText.trim() === "") {
        alert("Please enter a task description.");
        return;
    }

    if (isNaN(deadline)) {
        alert("Please enter a valid deadline.");
        return;
    }

    const newRow = tasksTable.insertRow(1); 
    newRow.classList.add(priority);

    const cell1 = newRow.insertCell(0); 
    cell1.innerHTML = taskText;

    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = deadline.toLocaleString();

    const cell3 = newRow.insertCell(2); 
    cell3.textContent = priority; 
    cell3.style.color = getPriorityColor(priority); 
    cell3.style.fontWeight = "bold"; 

    const cell4 = newRow.insertCell(3); 
    const timerElement = document.createElement("span");
    timerElement.classList.add("timer");
    cell4.appendChild(timerElement);

    const cell5 = newRow.insertCell(4); 
    cell5.innerHTML = `<button onclick="completeTask(this)">Complete</button>
                       <button onclick="deleteTask(this)">Delete</button>`;

    const timerInterval = startCountdown(timerElement, deadline);

    
    timerElement.timerInterval = timerInterval;


    taskInput.value = "";
    taskDeadline.value = "";
}

function startCountdown(timerElement, deadline) {
    function updateTimer() {
        const now = new Date();
        const timeRemaining = deadline - now;

        if (timeRemaining <= 0) {
            timerElement.textContent = "Time's up!";
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);


    if (deadline <= new Date()) {
        timerElement.textContent = "Time's up!";
        clearInterval(timerInterval);
    }
}

function completeTask(completeButton) {
    const taskRow = completeButton.parentNode.parentNode;
    taskRow.classList.add("completed");
    completeButton.style.backgroundColor = "#2ECC40";
    completeButton.innerHTML = "Completed";
    timerElement.textContent="Completed";
    completeButton.disabled = true;
}

function getPriorityColor(priority) {
    switch (priority) {
        case "high":
            return "red";
        case "medium":
            return "green";
        case "low":
            return "yellow";
        default:
            return "black"; 
    }
}

function deleteTask(deleteButton) {
    const taskRow = deleteButton.parentNode.parentNode;
    const tasksTable = document.getElementById("tasks");
    tasksTable.deleteRow(taskRow.rowIndex);
}