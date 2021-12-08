const input = document.querySelector('#input');
const todosUl = document.querySelector('.todos');
const form = document.querySelector('form');

const todos = JSON.parse(localStorage.getItem('todos'));
console.log (todos);

if (todos){
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addTodo();
})


function addTodo(todo){
    let todoText = input.value;

    if (todo){
        todoText = todo.text;
    }

    if (todoText.trim()){
        const liEl = document.createElement('li');
        if (todo && todo.completed){
            liEl.classList.add('completed');
        }
        liEl.innerText = todoText;

        liEl.addEventListener('click', ()=> {
            liEl.classList.toggle('completed');
            updateLS();
        })

        liEl.addEventListener('contextmenu', (e)=> {
            e.preventDefault();
            liEl.remove();
            updateLS();
        })

        todosUl.appendChild(liEl);
        input.value = '';

        updateLS();
    }
}


function updateLS (){

    const todos = [];
    const todosEl = document.querySelectorAll('li');

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos));

}

