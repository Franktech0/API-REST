/**
 * API_URL es la dirección en la que esta alojada la API REST, a traves de la
 * cual pasan los datos del CRUD
 */
const API_URL = "http://localhost:9000/api/";
/**
 * Esta es un arreglo que almacena los datos que vienen de la base de datos
 * (MongoDB atlas) en forma de objetos 
 * @type {Array}
 */
var classrooms = [];
/**
 * Esta es una variable bandera, recibe un 1 si se cumple la condición y 
 * un 0 de lo contrario => permite enviar los datos (POST) al la base de datos
 */
var validar = 0;

/**En este fragmento le decimos al navegador que debemos 
 * esperar hasta que el DOM carge el contenido para mandar a traer los datos BD*/
window.addEventListener('DOMContentLoaded', ()=>{
    getClassrooms();
})

/**Esta función permite recuperar todos los datos de la bd, cuando
 * no se especifica el metodo en fetch, se manda con GET por defecto
 * @type {function getClassrooms() { fetch(API_URL, response)
 * }}
*/
const getClassrooms = () => {
    fetch(`${API_URL}/classrooms`)
    .then(response => response.json())
    /**si al recuperar los datos hay algun problema envia un mensaje de error */
    .catch(error => {
        alert("¡Algo salio mal!" + "\nHubo un problema al cargar los datos de la materia"
        + "\n"+error
        +"\n\nSe recomienda recargar la pagina");
    })
    /**La respuesta de la promesa se almacena en classrooms[]*/
    .then(data =>{
        classrooms = data;
        console.log(classrooms);
        /**mandamos a renderResult el arreglo classrooms como parametro 
         * para que puedan mostrarse en el HTML
         */
        renderResult(classrooms);
    })
}
/**
 * Esta es una constante que recibe las propiedades del body de una tabla
 * que esta en HTML a traves del metodo document.querySelector()
 * @type {const name = document.querySelector(id o name del tag-hmtl)}
 */
const classroomsList = document.querySelector("#tabla-body");
//mostramos en la tabla los datos
/**
 * Esta es una función que recibe como paramétro el arreglo classrooms [ ]
 * , es la funcion que muestra los datos de la BDs en una tabla de 
 * HTML
 */
const renderResult = (classrooms) =>{
    /** Esta es la variable que recibe los datos de classrooms
     * combinado con fragmentos de HTML
     */
    let listHTML = "";
    /** En este fragmento, por cada elemento del arreglo classrooms
     * imprime los datos en columnas y celdas de la tabla HTML.
     * 
     * En los botones se manda el dato order, pues lo ocupe como token 
     * para poder identificar los datos, por ende order no puede ser 
     * editado ni repetido
     */
    classrooms.forEach(classrooms => {
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
    /**Se manda a pintar los datos en la tabla a traves de innerHTML */
    classroomsList.innerHTML = listHTML;
    
}
/**
 * Esta es la función encargada de crear un nuevo registro en la BDs
 *  @type {function() => }
 */
const createClassRoom = () =>{
    /**
     * formdata es una constante que recibe los datos del formulario,
     * estos datos se recopilan a traves de document.querytSelector(id_formulario)
    */
    const formData = new FormData(document.querySelector("#formulario"));
    /**Se comprueba que los datos del formulario no esten vacios*/
    if(!formData.get('class').length || !formData.get('order').length || !formData.get('numeroofstudents').length 
    || !formData.get('active').length ||!formData.get('liststudents').length )
    {
        /**Si los datos estan vacios entonces envia un mensaje de error 
         *en <div> alerta
         */
        document.querySelector('#alert').innerHTML = "* Todos los campos son obligatorios";
        return;
    }
    /**Una ves que se llenan los datos se borra la alerta  */
    document.querySelector("#alert").innerHTML = '';
    
    /**
     * Es una constante de tipo objeto que recupera los datos introducidos
     * en el formulario atraves de formData.get(id o name)
     * @type {Object}
     */
    const classroom = {
        Class: formData.get("class"),
        Order: formData.get("order"),
        numberOfStudents: formData.get("numeroofstudents"),
        active: formData.get("active"),
        ListStudents: formData.get("liststudents"),
    }
    /**
     *  En esta parte se busca si algul elemento del arreglo coincide con el
     *  dato Order que el usuario creo, si encuentra alguno igual imprime un
     *  error y cambia el valor de validar en 1
     */
    classrooms.filter(clas => {
        if(clas.Order == classroom.Order){
            alert("¡Error!" +"\n\nNo se puede tener 2 Materías con el mismo número de orden");
            validar = 1;
        }
    });
    /**
     * Antes de mandar la solicitud al servidor se comprueba que la variable validar
     * no este en 1, si esta en 1, cancela la solicitud, pero si no envia la solicitud 
     * al servidor para registrar al nuevo classroom
     */
    if(validar != 1)
    {
        fetch(`${API_URL}/classrooms`, {
            method: 'POST',
            body: JSON.stringify(classroom),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        //si algo sale mal imprime el error
        .catch(e => {
            alert("Algo salio mal! => " + e);
        })/**Si todo sale bien envia una notoficación de exito! */
        .then(response => {
            console.log(response);
            alert("El nuevo registro se ha creado con exito!")
            getClassrooms();

        })
    }
    /** al terminar la función borramos los datos del formulario y mandamos 
     * a validar en 0
     */
    document.querySelector("#formulario").reset();
    validar = 0;
}

/**
 * editClass es una función que recupera los datos del registro a editar
 * antes de hacer la petición
 * @param {string} orden 
 */
const editClass = (orden) =>{
    /**Esta es una variable let que permite guardar temporalmente los
     * datos del registro a editar
     */
    let ClassR = {};
    /**Si alguno de los objetos dentro del arreglo Classrooms 
     * conicide con el parametro orden del registro a editar 
     * ClassR almacenara todos sus datos
     */
    classrooms.filter(clas => {
        if(clas.Order == orden){
            ClassR = clas;
        }
    });
    /**Asignamos a la propiedad valor de los inputs de HTML 
     * los valores de cada uno de los datos del registro a editar
     * con la finalidad de mostrarlos
     */
    document.querySelector('#editar #ID').value = ClassR._id;
    document.querySelector('#editar #nameclass').value = ClassR.Class;
    document.querySelector('#editar #orderclass').value = ClassR.Order;
    document.querySelector('#editar #numberstudentsclass').value = ClassR.numberOfStudents;
    document.querySelector('#editar #activeclass').value = ClassR.active;
    document.querySelector('#editar #listclass').value = ClassR.ListStudents;

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
