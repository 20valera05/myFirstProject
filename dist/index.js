let taskInput = document.getElementById("taskInput");
let inputContainer = document.getElementById("inputContainer");
let taskContainerTop = document.getElementById("taskContainerTop");
let taskContainerBottom = document.getElementById("taskContainerBottom");
let allDiv = document.getElementById("allDiv");
let bottomDiv = document.getElementById("bottomDiv");
let title = document.getElementById("title");
let counterContainer = document.getElementById("counterContainer");
let allDoneContainer;
let result = document.getElementById("result");

function updateDivAll() {
    let quantityOfTaskTop = taskContainerTop.querySelectorAll("div");
    let quantityOfTaskBottom = taskContainerBottom.querySelectorAll("div");
    allDiv.innerHTML = quantityOfTaskTop.length + quantityOfTaskBottom.length;
    bottomDiv.innerHTML = quantityOfTaskBottom.length;

    let countOfTask = parseFloat(quantityOfTaskBottom.length / (quantityOfTaskTop.length + quantityOfTaskBottom.length)) * 100;
    let intCountOfTask = parseInt(countOfTask);
    if (intCountOfTask > 0 && intCountOfTask < 50) {
        result.innerHTML = parseInt(countOfTask) + "%";
        result.classList.remove("text-orange-400", "text-green-500");
        result.classList.add("text-red-600");
    }
    if (intCountOfTask >= 50 && intCountOfTask < 100) {
        result.innerHTML = parseInt(countOfTask) + "%";
        result.classList.remove("text-red-600", "text-green-500");
        result.classList.add("text-orange-400");
    }
    if (intCountOfTask == 100) {
        result.innerHTML = parseInt(countOfTask) + "%";
        result.classList.remove("text-red-600", "text-orange-400");
        result.classList.add("text-green-500");
    }
    if (intCountOfTask == 0) {
        result.innerHTML = parseInt(countOfTask) + "%";
        result.classList.remove("text-red-600", "text-orange-400", "text-green-500");
    }
}

function allEmptyDiv() {
    let quantityOfTaskTop = taskContainerTop.querySelectorAll("div");
    let quantityOfTaskBottom = taskContainerBottom.querySelectorAll("div");
    if (quantityOfTaskTop.length == 0 && quantityOfTaskBottom.length == 0) {
        let noTaskContainer = document.createElement("div");
        noTaskContainer.id = "noTaskContainer";
        noTaskContainer.classList.add("flex", "justify-center", "text-xl", "font-bold", "text-gray-500");
        let noTaskSpan = document.createElement("span");
        noTaskSpan.textContent = "You don't have tasks to do.";
        noTaskContainer.appendChild(noTaskSpan);
        title.insertAdjacentElement("afterend", noTaskContainer);
        counterContainer.remove();
    } else {
        let noTaskContainer = document.getElementById("noTaskContainer");
        if (noTaskContainer) {
            noTaskContainer.remove();
            inputContainer.insertAdjacentElement("afterend", counterContainer);
        }
    }
    if (quantityOfTaskTop.length == 0 && quantityOfTaskBottom.length > 0) {
        if (!allDoneContainer) {
            allDoneContainer = document.createElement("div");
            allDoneContainer.id = "allDoneContainer";
            allDoneContainer.classList.add("flex", "items-center", "flex-col", "text-xl", "font-bold", "text-gray-500");
            let doneTaskImg = document.createElement("div");
            doneTaskImg.innerHTML = (`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          `);
            allDoneContainer.appendChild(doneTaskImg);
            let doneTaskSpan = document.createElement("span");
            doneTaskSpan.textContent = "All done!";
            allDoneContainer.appendChild(doneTaskSpan);
            title.insertAdjacentElement("afterend", allDoneContainer);
        }
    } else {
        if (allDoneContainer) {
            allDoneContainer.remove();
            allDoneContainer = null;
        }
    }
}

setInterval(updateDivAll, 0);
allEmptyDiv();

taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        let newContainer = document.createElement("div");
        newContainer.classList.add("flex", "items-center", "my-5");

        let a = document.createElement("a");
        a.classList.add("inline-block", "w-6", "h-6", "rounded-full", "border", "border-green-500", "hover:bg-green-200", "cursor-pointer");
        newContainer.appendChild(a);

        let span = document.createElement("span");
        span.classList.add("w-full", "pl-6", "text-lg");
        span.textContent = taskInput.value;
        newContainer.appendChild(span);

        let button = document.createElement("button");
        button.classList.add("w-6", "h-6", "border", "border-red-300", "bg-gray-300", "rounded-sm");
        button.insertAdjacentHTML("afterbegin", `<svg class ="w-4 h-4 pl-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" >
    <path stroke-linecap="round" stroke-linejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>`);
        newContainer.appendChild(button);
        taskContainerTop.insertAdjacentElement("beforeend", newContainer);
        taskInput.value = "";
        updateDivAll();
        allEmptyDiv();
    }
})
let deleteTaskText = document.getElementById("deleteTaskText")
let modalBackground = document.getElementById("modalBackground");
let modalWindow = document.getElementById("modalWindow");
modalWindow.classList.add("hidden");

function openModalWindow(removeParentDiv) {
    let confirmButton = document.getElementById("confirmButton");
    let cancelButton = document.getElementById("cancelButton");
    modalBackground.classList.remove("hidden");
    modalWindow.classList.remove("hidden");
    let spanElemText = removeParentDiv.querySelector("span");
    deleteTaskText.innerHTML = "Are you sure you want to delete task " + `"${spanElemText.textContent}"`;
    confirmButton.addEventListener("click", function () {
        if (removeParentDiv) {
            removeParentDiv.remove();
            removeParentDiv = null;
        }
        modalWindow.classList.add("hidden");
        modalBackground.classList.add("hidden");
        allEmptyDiv();
    })
    cancelButton.addEventListener("click", function () {
        modalWindow.classList.add("hidden");
        modalBackground.classList.add("hidden");
        removeParentDiv = null;
    })
}

document.addEventListener("click", function (event) {
    if (event.target && event.target.tagName == "A") {
        let parentDiv = event.target.parentNode;
        let parentContainer = parentDiv.parentNode;
        let spanElem = parentDiv.querySelector("span");
        if (parentContainer === taskContainerTop) {
            if (spanElem) {
                spanElem.classList.add("line-through");
            }
            (event.target).classList.remove("hover:bg-green-200");
            (event.target).classList.remove("border-green-500");
            (event.target).classList.add("bg-green-400");
            (event.target).classList.add("border-green-600");
            taskContainerBottom.insertAdjacentElement("afterbegin", parentDiv);
        }
        if (parentContainer === taskContainerBottom) {
            if (spanElem) {
                spanElem.classList.remove("line-through");
            }
            (event.target).classList.remove("bg-green-400");
            (event.target).classList.remove("border-green-600");
            (event.target).classList.add("hover:bg-green-200");
            (event.target).classList.add("border-green-500");
            taskContainerTop.insertAdjacentElement("beforeend", parentDiv);
        }
        allEmptyDiv();
    }
    let button = event.target.closest("button");
    if (button && button.closest(".flex.items-center.my-5")) {
        let removeParentDiv = event.target.closest("div.flex.items-center.my-5");
        openModalWindow(removeParentDiv);
    }
});



