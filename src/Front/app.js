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
        alert("¡Algo salio mal!" + "\nHubo un problema al cargar los datos de la materia" 
        +"\n\nSe recomienda recargar la pagina");
    })
    .then(data =>{
        classrooms = data;
        console.log(classrooms);
        renderResult(classrooms);
    })
}
console.log(classrooms);

const classroomsList = document.querySelector("#tabla-body");
//mostramos en la tabla los datos
const renderResult = (classrooms) =>{
    let listHTML = "";
    classrooms.forEach(classrooms => {
        //idclass = classrooms._id;
        listHTML += `
            <tr>
                <td>${classrooms.Class}</td>
                <td>${classrooms.Order}</td>
                <td>${classrooms.numberOfStudents}</td>
                <td>${classrooms.active}</td>
                <td>${classrooms.ListStudents}</td>
                <td>
                    <a href= "#edit" onclick ="editClass(${classrooms.Order})">Editar</a>
                    <button class="btn-no" type:"button" onclick="deleteClassroom(${classrooms.Order})">Eliminar</button>
                </td>
                
            </tr>`
            
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
    })
    .then(response => {
        console.log(response);
        alert("El nuevo registro se ha creado con exito!")
        getClassrooms();

    })
    document.querySelector("#formulario").reset();

}

const editClass = (orden) =>{
    //console.log(id);
    let ClassR = {};
    classrooms.filter(clas => {
        if(clas.Order == orden){
            ClassR = clas;
        }
    });
    document.querySelector('#editar #ID').value = ClassR._id;
    document.querySelector('#editar #nameclass').value = ClassR.Class;
    document.querySelector('#editar #orderclass').value = ClassR.Order;
    document.querySelector('#editar #numberstudentsclass').value = ClassR.numberOfStudents;
    document.querySelector('#editar #activeclass').value = ClassR.active;
    document.querySelector('#editar #listclass').value = ClassR.ListStudents;

    console.log(ClassR);

}
const updateClass = () =>{
    const classroom ={
        Class: document.querySelector('#editar #nameclass').value,
        Order: document.querySelector('#editar #orderclass').value,
        numberOfStudents: document.querySelector('#editar #numberstudentsclass').value,
        active: document.querySelector('#editar #activeclass').value,
        ListStudents: document.querySelector('#editar #listclass').value,
        Id: document.querySelector('#editar #ID').value,
    }

    if(!classroom.Class || !classroom.Order || !classroom.numberOfStudents 
    || !classroom.active ||!classroom.ListStudents )
    {
        document.querySelector('#alert').innerHTML = "* Todos los campos son obligatorios";
        return;
    }
    document.querySelector("#alert").innerHTML = '';

    fetch(`${API_URL}/classrooms/${classroom.Id}`, {
        method: 'PUT',
        body: JSON.stringify(classroom),
        headers: {
            'Content-Type': 'application/json'
        }
    } )
    .then(res => res.json())
    .catch(error => {
        alert("Error, No se pudo actualizar correctamente");
    })
    .then(response => {
        alert("¡Actualización exitosa!");
        getClassrooms();

    })
    document.querySelector("#editar").reset();

}

const deleteClassroom = (orden) => {

    let ClassR = {};
    classrooms.filter(clas => {
        if(clas.Order == orden){
            ClassR = clas;
        }
    });

    fetch(`${API_URL}/classrooms/${ClassR._id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .catch(error => {
        alert("Error, no se pudo borrar el registroo \n\n" + error);
    })
    .then(response => {
        alert("Se ha eliminado correctamente el registro");
        getClassrooms();
    })
}

