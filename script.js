const form = document.querySelector('form');
const list = document.querySelector('ul');
const input = document.querySelector('form input');
let allTasks = [];

form.addEventListener('submit', event => {
    event.preventDefault(); // evite le rafraichissement de la page et permet de garder nos données en local

    const text = input.value.trim(); // permet d'enlever les espaces avant et après
    if(text !== ''){
      addATask(text);
      input.value = '';
    }
})

function addATask(text){
    const todo = {
      text,
      // La méthode Dat.now() 
      // renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970
      id: Date.now()
    }
    showList(todo);
}

function showList(todo){
    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', taskDone);
    item.appendChild(input);

    const text = document.createElement('span');
    text.innerText = todo.text;
    item.appendChild(text);

    const btn = document.createElement('button');
    btn.addEventListener('click', deleteTask);
    const img = document.createElement('img');
    img.setAttribute('src', 'src/close.svg');
    btn.appendChild(img);
    item.appendChild(btn);
 
    list.appendChild(item);
    allTasks.push(item);
}
function taskDone(e){
    e.target.parentNode.classList.toggle('end');
}
function deleteTask(e) {
    allTasks.forEach(el => {
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
          el.remove();
          allTasks = allTasks.filter(li => li.dataset.key !== el.dataset.key);
        }
    })
}