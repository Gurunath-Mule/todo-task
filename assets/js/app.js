const cl = console.log;
 

let todoarr = [
  {todoname : 'css', todoid : '12345'},
  {todoname : 'javascript', todoid : '09876'}
];

const todoform = document.getElementById('todoform')
const todoitem = document.getElementById('todoitem')
const addbutton = document.getElementById('addbutton')
const updatebutton = document.getElementById('updatebutton')


function creatLists(arr){
  let result = `<ul class= "list-group">`

  arr.forEach(ele => {
    result += `  <li id="${ele.todoid}" class="list-group-item d-flex justify-content-between">
                                    <strong>${ele.todoname}</strong>
                                      <div>
                                          <i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i>

                                          <i onclick="onremove(this)" class="fa-solid fa-trash fa-2x text-danger" role="button"></i>
                                        
                                      </div>
                  </li>`
  });

  result += `</ul>`


  const todocontainer = document.getElementById('todoContainer')
  todocontainer.innerHTML = result;



  
}
creatLists(todoarr)


function ontodosubmit(eve){
 eve.preventDefault()
let todoobj = {
  todoname : todoitem.value,
  todoid :  Date.now().toString()
}
todoform.reset()

todoarr.unshift(todoobj)
// creatLists(todoarr)   // it will recreate all old liand create one new li
let li = document.createElement('li')
li.id = todoobj.todoid 
li.className = `list-group-item d-flex justify-content-between align-item-center`
li.innerHTML = `<strong>${todoobj.todoname}</strong>
                                      <div>
                                          <i onclick="onEdit(this)"class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i>

                                          <i onclick="onremove(this) "class="fa-solid fa-trash fa-2x text-danger" role="button"></i>
                                        
                                      </div>
                
`
let ul = document.querySelector('#todoContainer ul')
ul.prepend(li)

Swal.fire({
  title :` New todo item ${todoobj.todoname} is added succesfully done !`,
  timer : 3000
})

}


function onremove(ele){

let remove_id = ele.closest('li').id
let getConfirm = confirm(`are you sure, you want to  delete this todo item todo id ${remove_id}`)
if (getConfirm) {
  
let getindex = todoarr.findIndex(t =>{
  return t.todoid === remove_id
})
todoarr.splice(getindex, 1)
ele.closest('li').remove()
} 

}

let edit_id

function onEdit(ele){
  edit_id = ele.closest('li').id
  let editObj = todoarr.find(t => t.todoid === edit_id)
 
  todoitem.value = editObj.todoname
  addbutton.classList.add('d-none')
  updatebutton.classList.remove('d-none')

}

function onupdatebtn(){
let todoupdate = {
  todoname : todoitem.value,
  todoid : edit_id

  
}

todoform.reset()

let getindex = todoarr.findIndex(t => {
  return t.todoid === edit_id
})

todoarr[getindex] = todoupdate
updatebutton.classList.add('d-none')
addbutton.classList.remove('d-none')

let li = document.getElementById(edit_id).firstElementChild

li.innerText = todoupdate.todoname
}


todoform.addEventListener('submit', ontodosubmit)
updatebutton.addEventListener('click', onupdatebtn)

