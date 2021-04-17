const title = document.querySelector(".title")
const content = document.querySelector(".discription")
const submitBtn = document.querySelector(".submitBtn")
const container = document.querySelector(".cards")


// JSON
// stringify
// parse
// map
// reduce
// window.location.reload();



// Добваление задач в localStorage если он пустой
window.addEventListener('load', () => {
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos', JSON.stringify([]));
    }else{
        const todos = JSON.parse(localStorage.getItem('todos'));

        const newTodos = todos.map((item, index) => {
            return {...item, id:index}
        })
        localStorage.setItem('todos', JSON.stringify(newTodos));

        const templete = newTodos.reverse().reduce((prev, {title, content, id, complete, date}) => {
            if(complete){
                return prev + `<div  class="card-2 completed">${cardTemplate(title,content,date,id)}</div>`
            }else{
                return prev + `<div data-aos="fade-up" class='card-2'>${cardTemplate(title,content,date,id)}</div>`
            }
        }, '')

        // const templete = newTodos.reverse().map()



        container.innerHTML = templete;
    }
})

// Adding new task
submitBtn.addEventListener('click', e =>{
    e.preventDefault();

    if(title.value === '' && content.value === '') alert('После не должны быть пустыми !');

    if(title.value !== '' && content.value !== ''){
        const todos = JSON.parse(localStorage.getItem('todos'));

        localStorage.setItem('todos', JSON.stringify([
            ...todos,
            {
                title: title.value,
                content: content.value,
                date: CurrentTime(),
                complete: false
            }
        ]));
        window.location.reload();

    }
})





function cardTemplate(title, content, time, id) {
    if(content.length >= 350){
        return `
            <div class="card-3 mb-3" ">
                <div class="card-header ">
                    <h4>${title}</h4>
                </div>
                <div class="card-b content shorted">
                    <p>${content}</p>
                    <div class="card-time">
                        <p>${time}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-around">
                        <button onclick='deleteTask(${id})' class="btn btn-danger w-25 data-id=${id}">Delete</button>
                        <button onclick='completeTask(${id})' class="btn btn-success w-25 data-id=${id}">Complete</button>
                        <button onclick='editTask(${id})' class="btn btn-info w-25 data-id=${id}">Edit</button>
                    </div>
                </div>
            </div>
    `
    }else{
        return`
            <div class="card-3 mb-3"  form>
                <div class="card-header text-center bg-dark text-white">
                    <h4>${title}</h4>
                </div>
                <div class="card-b content   ">
                    <p class="text-content">${content}</p>
                    <div class="card-time">
                        <p>${time}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-around                        ">
                        <button onclick='deleteTask(${id})' class="btn btn-danger w-25 data-id=${id}">Delete</button>
                        <button onclick='completeTask(${id})' class="btn btn-success w-25 data-id=${id}">Complete</button>
                        <button onclick='editTask(${id})' class="btn btn-info w-25 data-id=${id}">Edit</button>
                    </div>
                </div>
            </div>
        `
    }
}


// Get current time
function CurrentTime() {
    return ` ${moment().format('L')} ${moment().format('LTS')}`
}


// Change theme width local storage
const body = document.body;
const select = document.querySelector('.form-select') 

select.addEventListener('change', e => {
    const value = e.target.value;

    if(value === 'dark'){
        body.style.background = '#212559';
        localStorage.setItem('themeColor', '#212559');
        localStorage.setItem('theme', 'dark')
    }else if(value === 'light'){
        body.style.background = `#efefef`
        localStorage.setItem('themeColor', `#efefef`)
        localStorage.setItem('theme', 'light')
    }else if (value === 'custom'){
        const askColor = prompt('Your costom color?,(hex)')
        body.style.background = askColor;
        localStorage.setItem('themeColor', askColor);
        localStorage.setItem('theme', 'costom')
    }
})


window.addEventListener('load' , () => {
    if (localStorage.getItem('theme')) {
        document.body.style.background = localStorage.getItem('themeColor')
        select.value = localStorage.getItem('theme')
    }
})

// Delete task
function deleteTask(id){
    const askDelete = confirm('are u sure ?')
    if(!askDelete) return;

    const todos =JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.filter(item => item.id !== id);

    localStorage.setItem('todos', JSON.stringify(newTodos))
    window.location.reload()
}

// complete task
function completeTask(id){

    const todos =JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id === id){
            return {
                ...item,
                complete: !item.completed
            }
        }else{
            return item
        }
    })

    localStorage.setItem('todos', JSON.stringify(newTodos))
    window.location.reload()
}
// edit task
function editTask(id){

    const todos =JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id === id){
            return {
                ...item,
                title: prompt('new title', item.title),
                content: prompt('new content', item.content)
            }
        }else{
            return item
        }
    })

    localStorage.setItem('todos', JSON.stringify(newTodos))
    window.location.reload()
}


// check id Auth
window.addEventListener('load', () => {
    const isAuth = localStorage.getItem('isAuth')

    isAuth === 'true' ? null : window.open('index.html', '_self') 
})



const signtOutBtn = document.querySelector('.sighnOutBtn')

signtOutBtn.addEventListener('click', e => {
    e.preventDefault;

    localStorage.setItem('isAuth', 'false')
    window.location.reload()
})