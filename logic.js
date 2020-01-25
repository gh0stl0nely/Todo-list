var remove = function(){
    this.parentNode.removeChild(this);
}

function addTask(){
    document.getElementById('deleteTask').textContent = 'Delete Task';

    var lis = document.querySelectorAll('li');
    for(var i = 0 ; i < lis.length; i ++){
        var li = lis[i];
        li.style.cursor  = 'pointer'; 
        li.removeEventListener('click', remove);
    }

    //Get the element from input field
    var li = document.createElement('li'); // create a <li> </li>
    var userInput = document.getElementById('userInput').value; // Get the input from User

    if(userInput.trim() != ''){
        var userText = document.createTextNode(userInput);
        li.appendChild(userText);
        var ul = document.getElementById('unorder_list');
        ul.appendChild(li);
    } else {
        alert('Field cannot be empty');
        
    }
    
    document.getElementById('userInput').value = '';
    
    var lis = document.querySelectorAll('li');
    for(var i = 0 ; i < lis.length ; i ++){
       lis[i].style.cursor  = 'auto';
    }

}

function deleteAll(){
    var ul = document.getElementById('unorder_list');
    ul.innerHTML = '';
}

function deleteTask(){
    document.getElementById('deleteTask').textContent = 'Click to delete';

    //Click this button first, all the <li> is now clickable and when you click on one, it disappears!
    var lis = document.querySelectorAll('li');
    
    for(var i = 0 ; i < lis.length; i ++){
        var li = lis[i];
        li.style.cursor  = 'pointer'; 
        li.addEventListener('click', remove);
    }

}

