let taskBox=document.querySelector("#task-box");
let inputValues=document.querySelectorAll(".inputs");
let ticks=document.querySelector("#tick");
let right=document.querySelector("#right");
let loading=document.querySelector("#load-done");
let totalTasks=0;
let doneTasks=0;
right.innerText=`${doneTasks}/${totalTasks}`;



function updateRecords(){
    right.innerText = `${doneTasks}/${totalTasks}`;
    let fraction = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;
    let loaderFraction = (fraction / 100) * 300;
    loading.style.width = `${loaderFraction}px`;
}

    ticks.addEventListener("click",()=>{

    if(inputValues[inputValues.length-1].value!=="")
    totalTasks++;
    updateRecords();

    if(inputValues[inputValues.length-1].value==="")
    return;

    let singleTask=document.createElement("div");//parent task node
    singleTask.classList.add("singtasks");

    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.classList.add("check");

    let taskPara=document.createElement("p");
    taskPara.innerText=inputValues[inputValues.length-1].value;
    taskPara.classList.add("texts");

    let edit=document.createElement("span");
    edit.classList.add("fa-solid","fa-pen-to-square","icons","edit-icon");

    let del=document.createElement("span");
    del.classList.add("fa-solid","fa-trash","icons","delete-icon");

    //appending childs to parent task child
    singleTask.appendChild(checkbox);
    singleTask.appendChild(taskPara);
    singleTask.appendChild(edit);
    singleTask.appendChild(del);

    //appending single task to parent tak box
    taskBox.appendChild(singleTask);

    //after clicking tick input box should also become blank again
    inputValues[inputValues.length-1].value="";
    inputValues[inputValues.length-1].placeholder="Write something....";

    //working on edit icon
    let alreadyHandled=false;

    edit.addEventListener("click",()=>{

    const editInput=document.createElement("input");
    editInput.type="text";
    editInput.value=taskPara.innerText;
    editInput.classList.add("editInput","singletasks");

    singleTask.replaceChild(editInput,taskPara);

    editInput.focus();

    editInput.addEventListener("blur", handleEditComplete);
    editInput.addEventListener("keydown", function (e) {
     if (e.key === "Enter") {
        handleEditComplete();}
     if (e.key === "Escape") {
          cancelEdit();}
         }
    );
// Step 2: Function to finish editing and save text
    function handleEditComplete() {
     if(alreadyHandled)return;
        alreadyHandled=true;
    const newText = editInput.value.trim();
    
    // If input is not empty, save and replace input with <p>
        if (newText !== "") {
        taskPara.innerText = newText;
    }
    // Else keep old text (do nothing)
    singleTask.replaceChild(taskPara, editInput);
    }

// Step 3: Optional cancel edit (pressing ESC)
    function cancelEdit() {
    // Just replace input back with original paragraph — no changes
           singleTask.replaceChild(taskPara, editInput);
    }

}
)

    //working on delete icon
    del.addEventListener("click",()=>{
        singleTask.remove();
        totalTasks--;
        if(checkbox.checked)
        doneTasks--;

        updateRecords();
        }
    )

        //ab hum checkbox pr kam kren ge
    checkbox.addEventListener("change",()=>{
        if(checkbox.checked){
         taskPara.classList.add("checkbox-done");
        doneTasks++;
        }
        else{
            taskPara.classList.remove("checkbox-done");
            doneTasks--;
        }
            updateRecords();
        })

})
    

    

