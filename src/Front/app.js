//URL de la API local
const API_URL = "http://localhost:9000/api/";
var classrooms = [];
var idclass = [];

//esperamos hasta que el dom carge el contenido para mandar a traer los datos BD
window.addEventListener('DOMContentLoaded', ()=>{
    getClassrooms();
})
//recuperamos todos los datos de la bd
const getClassrooms = () => {
    fetch(`${API_URL}/classrooms`)
    .then(response => response.json())
    .catch(error => {
        alert("¡Algo salio mal!" + "\nHubo un problema al cargar los datos de la materia");
    })
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
        idclass = classrooms._id;
        listHTML += `
            <tr>
                <td>${classrooms.Class}</td>
                <td>${classrooms.Order}</td>
                <td>${classrooms.numberOfStudents}</td>
                <td>${classrooms.active}</td>
                <td>${classrooms.ListStudents}</td>
                <td>
                    <button type="button" onclick="editClass(${idclass,json})})">Editar</button>
                    <button type:"button">Eliminar</button>
                </td>
                
            </tr>`
            console.log(typeof(classrooms._id));
    })
    classroomsList.innerHTML = listHTML;
    
}
//agregamos una nueva clase a la BD
const createClassRoom = () =>{
    const formData = new FormData(document.querySelector("#formulario"));
    
    if(!formData.get('class').length || !formData.get('order').length || !formData.get('numeroofstudents').length 
    || !formData.get('active').length ||!formData.get('liststudents').length )
    {
        document.querySelector('#alert').innerHTML = "* Todos los campos son obligatorios";
        return;
    }
    document.querySelector("#alert").innerHTML = '';

    const classroom = {
        Class: formData.get("class"),
        Order: formData.get("order"),
        numberOfStudents: formData.get("numeroofstudents"),
        active: formData.get("active"),
        ListStudents: formData.get("liststudents"),
    }
    console.log(classroom);

    fetch(`${API_URL}/classrooms`, {
        method: 'POST',
        body: JSON.stringify(classroom),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(e => {
        alert("Algo salio mal! => " + e);
        document.querySelector("#formulario").reset();
    })
    .then(response => {
        console.log(response);
        alert("El nuevo registro se ha creado con exito!")
        getClassrooms();
    })
}

const editClass = (Cid) =>{
    //console.log(id);
    let ClassR = {};
    classrooms.filter(clas => {
        if(clas._id == Cid){
            ClassR = clas;
        }
    });
    console.log(classrooms);
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
