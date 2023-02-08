//const classroom = require("./models/classroom");
const formulario = document.querySelector('#formulario');
const Class = document.querySelector('#class');
const Order = document.querySelector('#order');
const numberOfStudents = document.querySelector('#numberofstudents');
const active = document.querySelector('#active');
const ListStudents = document.querySelector('#liststudents');
const Agregar = document.querySelector('#agregar');

const API_URL = "http://localhost:9000/api/";


formulario.addEventListener('submit', validarFormuario);

function validarFormuario(e){
    e.preventDefault();

    if(Class.value == '' || Order === '' || numberOfStudents === '' || active === '' || ListStudents === ''){
        alert("todos los campos son obligatorios");
        return;
    }
}

const HTMLResponse = document.querySelector("#tabla-body");
const tr = document.createElement('td');

fetch(`${API_URL}/classrooms`).then((response) => response.json()//get por defecto
    .then((classrooms) => {
        for(let i = 0; i<classrooms.lenght; i++)
        {
            classrooms.forEach(classrooms => {
                let elem = document.createElement('tr');
                elem.appendChild(document.createTextNode(`${classrooms.Class} ${classrooms.Order} ${classrooms.numberOfStudents} ${classrooms.active} ${classrooms.ListStudents}`))
                tr.appendChild(elem);
            });
        }
    HTMLResponse.appendChild(tr);
    
    // const tpl = classrooms.map(classrooms => `<li>${classrooms.Class} ||| ${classrooms.Order} ||| ${classrooms.numberOfStudents} ||| ${classrooms.active} ||| ${classrooms.ListStudents}</li>`);
    // HTMLResponse.innerHTML = `<ul>${tpl}</ul>`;
}));

// fetch("POST", `${API_URL}/classrooms/63e1ba8873c4a89a02cc3aad`)
//     .then(response) =>



// const xrh = new XMLHttpRequest();

// function onRequestHandler(){
//     if(this.readyState === 4 && this.status === 200){
//         //console.log(this.response)
//         const data = JSON.parse(this.response);
//         const HTMLResponse = document.querySelector("#app");

//         const tpl = data.map((classrooms) => `<li>${classrooms.Class} ||| ${classrooms.Order} ||| ${classrooms.numberOfStudents} ||| ${classrooms.active} ||| ${classrooms.ListStudents}</li>`);
//         HTMLResponse.innerHTML = `<ul>${tpl}</ul>`

//     }
// }
// xrh.addEventListener("load", onRequestHandler);
// xrh.open('GET', `${API_URL}classrooms/`);
// xrh.send();
