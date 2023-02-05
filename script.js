// input box element
const input_box = document.getElementById('new_item_input_box');
// main list element
const list_main = document.getElementById('list_main');
// button element
const button = document.getElementById('new_item_button');

// creates the todo_list from the local storage
const todo_list = JSON.parse(localStorage.getItem("todo_items")) || [];


// adds an item to the list
function add_item (input) {

    // gets user input
    var item_text = input;

    // prevents empty items from being created
    if ( item_text != '' ) {
        // current number of list items BEFORE adding the new one
        var current_count = list_main.childElementCount;
        
        // limits the number of list items
        if ( current_count < 9 ) {  

            // adds todo list item to the 
            todo_list.push(item_text);
            
            // creates new element
            var li = document.createElement('li');

            // adds text to new element
            li.innerText = item_text;

            // creates and applies id to each item
            var id = 'item' + todo_list.length;
            li.setAttribute('id', id)

            // appends new element to the main list using DOM
            list_main.append(li)

            // adds the remove_item listener
            document.getElementById(id).addEventListener('click', function () {remove_item(id)})

            // resets the value of the input box
            input_box.value = '';

            // adds value to the local storage
            localStorage.setItem("todo_items", JSON.stringify(todo_list));



        } else {
            window.alert('Item limit reached!')
        }
    } else {
        window.alert('Please enter a task!')
    }
}

// add function to load the items
// does not add items to the local storage
function add_item_load (input, index) {

    // gets user input
    var item_text = input;

    // current number of list items BEFORE adding the new one
    var current_count = list_main.childElementCount;
    
    // limits the number of list items
    if ( current_count < 9 ) {  
        
        // creates new element
        var li = document.createElement('li');

        // adds text to new element
        li.innerText = item_text;

        // creates and applies id to each item
        var id = 'item' + index;
        li.setAttribute('id', id)

        // appends new element to the main list using DOM
        list_main.append(li)

        // adds the remove_item listener
        document.getElementById(id).addEventListener('click', function () {remove_item(id)})

        // resets the value of the input box
        input_box.value = '';

    } else {
        window.alert('Item limit reached!')
    }
}

// removes the item when its clicked
function remove_item (id) {

    // gets the element VIA the ID
    var element = document.getElementById(id);

    // gets index of the selected item in the todo_list
    var index = todo_list.indexOf(element.innerHTML)
   
    // removes the item from the list
    todo_list.splice(index, 1)

    // adds value to the local storage
    localStorage.setItem("todo_items", JSON.stringify(todo_list));

    // removes the element
    element.remove();
}

// loads the item when the page is reloaded
function load_items () {
    console.log(todo_list)

    // length of the list
    var len = todo_list.length;

    // timing index
    var index = 1;

    // creates an item for each element in the list
    for ( i=0; i<len; i++ ) {
        add_item_load(todo_list[i], index);
        index++;
    }

    
}


// loads the item when the page is reloaded
load_items();

// add item click event for the add item button
button.addEventListener('click', function () {add_item(input_box.value)})
