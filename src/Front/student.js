//URL de la API local
const API_URL = "http://localhost:9000/api/";
var students = [];
var idclass = [];
var validar = 0;

//esperamos hasta que el dom carge el contenido para mandar a traer los datos BD
window.addEventListener('DOMContentLoaded', ()=>{
    getClassrooms();
})
//recuperamos todos los datos de la bd
const getClassrooms = () => {
    fetch(`${API_URL}/students`)
    .then(response => response.json())
    .catch(error => {
        alert("¡Algo salio mal!" + "\nHubo un problema al cargar los datos de la materia" 
        +"\n\nSe recomienda recargar la pagina");
    })
    .then(data =>{
        students = data;
        console.log(students);
        renderResult(students);
    })
}
console.log(students);

const classroomsList = document.querySelector("#tabla-body");
//mostramos en la tabla los datos
const renderResult = (students) =>{
    let listHTML = "";
    students.forEach(student => {
        //idclass = classrooms._id;
        listHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.active}</td>
                <td>${student.Order}</td>
                <td>
                    <a href= "#edit" id="btn-editar" onclick ="editClass(${student.Order})">Editar</a>
                    <button class="btn-no" type:"button" onclick="deleteClassroom(${student.Order})">Eliminar</button>
                </td>
                
            </tr>`
            
    })
    classroomsList.innerHTML = listHTML;
    
}
//agregamos una nueva clase a la BD
const createClassRoom = () =>{
    const formData = new FormData(document.querySelector("#formulario"));
    
    if(!formData.get('name').length || !formData.get('age').length || !formData.get('active').length 
    || !formData.get('order').length )
    {
        document.querySelector('#alert').innerHTML = "* Todos los campos son obligatorios";
        return;
    }
    document.querySelector("#alert").innerHTML = '';
    
    const Astudent = {
        name: formData.get("name"),
        age: formData.get("age"),
        active: formData.get("active"),
        Order: formData.get("order"),
    }
    console.log(Astudent);
    
    students.filter(stud => {
        if(stud.Order == Astudent.Order){
            alert("¡Error!" +"\n\nNo se puede tener 2 Materías con el mismo número de orden");
            validar = 1;
        }
    });
    if(validar != 1)
    {
        fetch(`${API_URL}/students`, {
            method: 'POST',
            body: JSON.stringify(Astudent),
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
    }
    document.querySelector("#formulario").reset();
    validar = 0;
}

const editClass = (orden) =>{
    //console.log(id);
    let NewStudent = {};
    students.filter(std => {
        if(std.Order == orden){
            NewStudent = std;
        }
    });
    document.querySelector('#editar #ID').value = NewStudent._id;
    document.querySelector('#editar #name').value = NewStudent.name;
    document.querySelector('#editar #age').value = NewStudent.age;
    document.querySelector('#editar #active').value = NewStudent.active;
    document.querySelector('#editar #order').value = NewStudent.Order;
    

    console.log(NewStudent);

}
const updateClass = () =>{
    const NStudent ={
        name: document.querySelector('#editar #name').value,
        age: document.querySelector('#editar #age').value,
        active: document.querySelector('#editar #active').value,
        order: document.querySelector('#editar #order').value,
        Id: document.querySelector('#editar #ID').value,
    }

    if(!NStudent.name || !NStudent.age || !NStudent.active 
    || !NStudent.order)
    {
        document.querySelector('#alert').innerHTML = "* Todos los campos son obligatorios";
        return;
    }
    document.querySelector("#alert").innerHTML = '';

    fetch(`${API_URL}/students/${NStudent.Id}`, {
        method: 'PUT',
        body: JSON.stringify(NStudent),
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

    let NewStudent = {};
    students.filter(std => {
        if(std.Order == orden){
            NewStudent = std;
        }
    });

    fetch(`${API_URL}/students/${NewStudent._id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .catch(error => {
        alert("Error, no se pudo borrar el registro" + error);
    })
    .then(response => {
        alert("Se ha eliminado correctamente el registro");
        getClassrooms();
    })
}
function cancelar(){
    document.querySelector("#editar").reset();
}
