const input = document.querySelector('#input');
const todosUl = document.querySelector('.todos');
const form = document.querySelector('form');

const LSItems = JSON.parse(localStorage.getItem('todos'));

LSItems.forEach(LSItem => createLi(LSItem));

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    if (input.value.trim()){
        createLi();
    }
})



function createLi(todo){

    let todoValue = input.value;

    if (todo){
        todoValue = todo.text;
    }

    const todoEl = document.createElement('li');
    todoEl.innerText = todoValue;

    todoEl.addEventListener('click', ()=> {
        todoEl.classList.toggle('completed');
        updateLS();
    })

    todoEl.addEventListener('contextmenu', ()=>{
        todoEl.remove();
        updateLS();
    })

    if (todo && todo.completed){
        todoEl.classList.add('completed');
    }

    todosUl.appendChild(todoEl);
    input.value = '';

    updateLS();
}


function updateLS(){

    const todos = [];
    const todoEls = document.querySelectorAll('li');

    todoEls.forEach(todoEl=> {
        const todo = {
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        }

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    })
}
