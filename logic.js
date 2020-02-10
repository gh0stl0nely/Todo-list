displayAll();
// document.getElementsByClassName('delete-btn').addEventListener('click' , function(event){
//     event.target.parentNode.remove();
// });
var index;

function addTask(){
    var task = document.getElementById('task').value; // String

    if(task.trim() == ''){
        alert('Task cannot be empty');
        return;
    }
    
    var list = JSON.parse(localStorage.getItem('list'));
    
    // Meaning there is 0 stuff in it

    if(!list){
        localStorage.setItem('list', JSON.stringify([])); // Create a new list
        localStorage.setItem('ID', 0); // Set ID to 0
        index = Number(localStorage.getItem('ID'));  // Index is 0
        
    } else {
        localStorage.setItem('ID', list.length);
        index = Number(localStorage.getItem('ID'));
    }

        var li = document.createElement('li');
        li.className += 'item';
        li.innerHTML = task;

        //Assign an id for the li 
        li.id = index;
        //Create a div for 2 buttons
        var div = document.createElement('div');
        div.style.display = "block";
        div.style.marginTop = "10px";

        // Add button to list item
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Complete';
        deleteBtn.className += 'delete-btn';
        var editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.className += 'edit-btn';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#myModal');
        editBtn.addEventListener('click', function(){
            localStorage.setItem('current_id', this.parentElement.parentElement.id);
        })

        div.appendChild(deleteBtn);
        div.appendChild(editBtn);
        li.appendChild(div);

        deleteBtn.addEventListener('click', deleteTask);

        // Add to the task list (ul)
        document.getElementById('list').appendChild(li); 
        document.getElementById('task').value = "";   

        updateTaskList(task);
    }

function updateTaskList(task){  

    var task_list = JSON.parse(localStorage.getItem('list'));

    if(task_list){
        task_list.push(task);
        localStorage.setItem('list', JSON.stringify(task_list));
        localStorage.setItem('ID', task_list.length - 1);    
    } else {
        //If doesnt exist
        var new_list = [];
        new_list.push(task);
        localStorage.setItem('list', JSON.stringify(new_list));
        localStorage.setItem('ID', new_list.length-1); 
    }
}

function deleteTask(){
    // Find the ID of the parent
    var deleteIndex = this.parentElement.parentElement.id;
    this.parentElement.parentElement.remove();

    //Shift index for everything else?
    var list = JSON.parse(localStorage.getItem('list'));
    var ID = Number(localStorage.getItem('ID'));

    if(ID > 0){
        ID--;
        list.splice(deleteIndex,1);
        localStorage.setItem('list', JSON.stringify(list));
        localStorage.setItem('ID', ID);
        // displayAll();
    } else {
        list.splice(deleteIndex,1);
        localStorage.setItem('list', JSON.stringify(list));
        localStorage.removeItem('ID');
        // displayAll();
    }


    //Shift index 
    for(var i = 0; i < list.length;i++){
        document.getElementById('list').children[i].id = i;
    }


}

function displayAll(){
    // This is also to reset everything?

    var task_list = JSON.parse(localStorage.getItem('list')); // Access the number from Local Storage

    //If exists then remove all event listener? 
    if(task_list){
        for(var i = 0; i < task_list.length; i++){
        var li = document.createElement('li');
        li.className += 'item';
        li.innerHTML = task_list[i];
        li.id = i;
        // Add button to list item
        var div = document.createElement('div');
        div.style.display = "block";
        div.style.marginTop = "10px";

        // Add button to list item
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Complete';
        deleteBtn.className += 'delete-btn';
        var editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.className += 'edit-btn';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#myModal');
        deleteBtn.addEventListener('click', deleteTask);
        editBtn.addEventListener('click', function(){
            localStorage.setItem('current_id', this.parentElement.parentElement.id);
        })

        div.appendChild(deleteBtn);
        div.appendChild(editBtn);
        
        li.appendChild(div);
       
        
    
        // Add to the task list (ul)
        document.getElementById('list').appendChild(li);  
        }
    }
}

function clearAll(){
    document.getElementById('list').innerHTML = "";
    localStorage.removeItem('list');
    localStorage.removeItem('ID');
 }

function savedTask(){
    
    var parentID = Number(localStorage.getItem('current_id')); // Id of List Item

    // alert()
    var list = JSON.parse(localStorage.getItem('list'));
    var newContent = document.getElementById('new-content').value;

    //The textContent of LI is changed
    document.getElementById(parentID.toString()).childNodes[0].textContent = newContent;

    //Changed it in the list2
    list.splice(parentID,1,newContent);

    localStorage.setItem('list',JSON.stringify(list));
    document.getElementById('new-content').value = "";
}
 

document.getElementById('task').addEventListener('keyup', function(e){
    if(e.keyCode === 13){
       addTask();
    }
});