    const todos = JSON.parse(localStorage.getItem('todos')) || [] // creamos un arreglo vacio donde almacernar los todos


const render = () =>{
        const todoList = document.getElementById('todo-list')
            
            // esto es una forma de hacer que se muestre los todos los elementos con un bucle FOR
            //todoList.innerHTML = ''
            //for(let i = 0; i < todos.length; i++){
            //    todoList.innerHTML += '<li>' + todos[i] + '</li>'
            //}


            // abajo la 2da forma de hacer que se muestren los todos pero con la funcion .map y .join
            const todosTemplate = todos.map(t => '<li>' + t + '</li>') // a todos los elementos concatenale LI al comienzo y al final y devuelve un nuevo arreglo con esas modificaciones
            todoList.innerHTML = todosTemplate.join('') // el .join es una funcion que toma todos los elementos de un arreglo y los junta mediante lo que le indiquemos como parametro
        
            const elementos = document.querySelectorAll('#todo-list li') // a diferencia de getelementId nos permite buscar por etiquetas, por id etc. en este caso obtenemos todos los elementos li generados (los todos)
            elementos.forEach((elemento, i) =>{ // ejecutamos un callback por cada elemento del array
                elemento.addEventListener('click', () => { // escuchamos el evento click de cada elemento y ejecutamos el codigo
                    elemento.parentNode.removeChild(elemento) // le indico al padre que elemine al hijo
                    todos.splice(i,1) // eliminamos el elemento tambien del array de todos con splice
                    actualizaTodos(todos)
                    render()
                })
            })
}

    const actualizaTodos = (todos) => {
        const todoStrings = JSON.stringify(todos) //transformamos todos a un string
        localStorage.setItem('todos', todoStrings)
    }

window.onload = () => { // .onload espera a que la pagina este completamente cargada
    render()
    const form = document.getElementById('todo-form')
    form.onsubmit = (e) =>{
        e.preventDefault() // hace que la app no se refresque
        const todo = document.getElementById('todo')
        const todoText = todo.value
        todo.value = ''
        todos.push(todoText) // agrego el todo al arreglo vacio
        actualizaTodos(todos)
        render()
    }
}