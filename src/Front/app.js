const API_URL = "http://localhost:9000/api/";
var classrooms = [];

window.addEventListener('DOMContentLoaded', ()=>{
    getClassrooms();
})

const getClassrooms = () => {
    fetch(`${API_URL}/classrooms`)
    .then(response => response.json())
    .then(data =>{
        classrooms = data;
        console.log(data);
        renderResult(classrooms);
    })
}
console.log(classrooms);

const classroomsList = document.querySelector("#tabla-body");
//mostramos en la tabla los datos
const renderResult = (classrooms) =>{
    let listHTML = "";
    classrooms.forEach(classrooms => {
        listHTML += `
            <tr>
                <td>${classrooms.Class}</td>
                <td>${classrooms.Order}</td>
                <td>${classrooms.numberOfStudents}</td>
                <td>${classrooms.active}</td>
                <td>${classrooms.ListStudents}</td>
            </tr>`
    })
    classroomsList.innerHTML = listHTML;
}


const createClassRoom = () =>{
    const formData = new FormData(document.querySelector("#formulario"));

    const classroom = {
        Class: formData.get("#class"),
        Order: formData.get("#order"),
        numberOfStudents: formData.get("#numberofstudents"),
        active: formData.get("#active"),
        ListStudents: formData.get("#listofstudents")
    }

    console.log(classroom);
}




// formulario.addEventListener('submit', validarFormuario);

// function validarFormuario(e){
//     e.preventDefault();

//     if(Class.value == '' || Order === '' || numberOfStudents === '' || active === '' || ListStudents === ''){
//         alert("todos los campos son obligatorios");
//         return;
//     }
// }








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
