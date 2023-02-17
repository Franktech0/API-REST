/**
 * Esta es una adaptación de classroom.js a student.js, pero 
 * basicamente hace lo mismo solo que con menos datos
 * name, age, id, active, orden (identificador unico para editar
 * y eleminar datos desde el front)
 */

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
var students = [];

/**
 * Esta es una variable bandera, recibe un 1 si se cumple la condición y 
 * un 0 de lo contrario => permite enviar los datos (POST) al la base de datos
 */
var validar = 0;

/**
 * En este fragmento le decimos al navegador que debemos esperar hasta 
 * que el DOM carge el contenido para mandar a traer los datos BD
*/
window.addEventListener('DOMContentLoaded', ()=>{
    getStudents();
})

/**Esta función permite recuperar todos los datos de la bd, cuando
 * no se especifica el metodo en fetch, se manda con GET por defecto
 * @type {function}
*/
const getStudents = () => {
    fetch(`${API_URL}/students`)
    .then(response => response.json())
    /**si al recuperar los datos hay algun problema envia un mensaje de error */
    .catch(error => {
        alert("¡Algo salio mal!" + "\nHubo un problema al cargar los datos de los estudiantes" 
        +"\n\nSe recomienda recargar la pagina");
    })
    /**La respuesta de la promesa se almacena en students[]*/
    .then(data =>{
        students = data;
        console.log(students);
        /**mandamos a renderResult() el arreglo students como parametro 
         * para que puedan mostrarse en el HTML
         */
        renderResult(students);
    })
}

/**
 * Esta es una constante que recibe las propiedades del body de una tabla
 * que esta en HTML a traves del metodo document.querySelector()
 */
const studentsList = document.querySelector("#tabla-body");

/**
 * Esta es una función que recibe como paramétro el arreglo students [ ]
 * , es la funcion que muestra los datos de la BDs en una tabla de 
 * HTML
 * @type {function}
 */
const renderResult = (students) =>{
    /** Esta es la variable que recibe los datos de students
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
    students.forEach(student => {
        //idclass = classrooms._id;
        listHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.active}</td>
                <td>${student.Order}</td>
                <td>
                    <a href= "#edit" id="btn-editar" onclick ="editStudent(${student.Order})">Editar</a>
                    <button class="btn-no" type:"button" onclick="deleteStudent(${student.Order})">Eliminar</button>
                </td>
                
            </tr>`
    })
    /**Se manda a pintar los datos en la tabla a traves de innerHTML */
    studentsList.innerHTML = listHTML;
}
/**
 * Esta es la función encargada de crear un nuevo registro en la BDs
 *  @type {function}
 */
const createNewStudent = () =>{

    /**
     * formdata es una constante que recibe los datos del formulario,
     * estos datos se recopilan a traves de document.querytSelector(id_formulario)
    */
    const formData = new FormData(document.querySelector("#formulario"));

    /**Se comprueba que los datos del formulario no esten vacios*/
    if(!formData.get('name').length || !formData.get('age').length || !formData.get('active').length 
    || !formData.get('order').length )
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
     * Astudent Es una constante de tipo objeto que recupera los datos introducidos
     * en el formulario a través de formData.get(id o name)
     * @type {Object}
     */
    const Astudent = {
        name: formData.get("name"),
        age: formData.get("age"),
        active: formData.get("active"),
        Order: formData.get("order"),
    }
    console.log(Astudent);

    /**
     *  En esta parte se busca si algún elemento del arreglo coincide con el
     *  dato Order que el usuario creo, si encuentra alguno igual imprime un
     *  error y cambia el valor de validar en 1
     */
    students.filter(stud => {
        if(stud.Order == Astudent.Order){
            alert("¡Error!" +"\n\nNo se puede tener 2 estudiantes con el mismo número de orden, por favor revise los datos");
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
        fetch(`${API_URL}/students`, {
            method: 'POST',
            body: JSON.stringify(Astudent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        //si algo sale mal imprime el error
        .catch(e => {
            alert("Algo salio mal! => " + e);
        })
        /**Si todo sale bien envia una notoficación de exito! */
        .then(response => {
            console.log(response);
            alert("El nuevo registro se ha creado con exito!")
            getStudents();

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
 * antes de hacer la petición y muestra los datos a editar en el formulario
 * editar
 * @type {function}
 * @param {string} orden 
 */
const editStudent = (orden) =>{

    /**Esta es una variable let que permite guardar temporalmente los
     * datos del registro a editar
     */
    let NewStudent = {};

    /**Si alguno de los objetos dentro del arreglo students 
     * coincide con el parametro orden del registro a editar 
     * almacenara todos sus datos
     */
    students.filter(std => {
        if(std.Order == orden){
            NewStudent = std;
        }
    });
    /**Asignamos a la propiedad valor de los inputs HTML, 
     * los valores de cada uno de los datos del registro a editar
     * con la finalidad de mostrarlos
     */
    document.querySelector('#editar #ID').value = NewStudent._id;
    document.querySelector('#editar #name').value = NewStudent.name;
    document.querySelector('#editar #age').value = NewStudent.age;
    document.querySelector('#editar #active').value = NewStudent.active;
    document.querySelector('#editar #order').value = NewStudent.Order;
}

/**
 * Esta es una función que actuliza los datos del registro seleccionado, 
 * se encarga de hacer la peticion (PUT) a la API para que esta haga la
 * peticion al servidor
 * @type {function} 
 */
const updateStudent = () =>{
    /**
     * NStudent es un nuevo objeto que tendra los valores recuperados del
     * formulario editar, adicionalmente se agrega el ID, pues esta nos
     * permitira enviar la solicitud mediante el id a la API
     */
    const NStudent ={
        name: document.querySelector('#editar #name').value,
        age: document.querySelector('#editar #age').value,
        active: document.querySelector('#editar #active').value,
        order: document.querySelector('#editar #order').value,
        Id: document.querySelector('#editar #ID').value,
    }

    /**Se comprueba que los datos del formulario no esten vacios,
     * de lo contrario se le mostrara un mensaje de alerta en el <div>
     * alert
     */
    if(!NStudent.name || !NStudent.age || !NStudent.active 
    || !NStudent.order)
    {
        document.querySelector('#alert').innerHTML = "* Todos los campos son obligatorios";
        return;
    }

    /**Cuando se llenen los datos se limpia el mensaje de alerta */
    document.querySelector("#alert").innerHTML = '';

    /**
     * en esta parte se hace la petición mediante el metodo PUT, 
     * pasando como parametros la API_URL + el id del registro a editar
     * en el body mandamos el objeto convertido a JSON, creado 
     * mas arriba (classroom) 
     */
    fetch(`${API_URL}/students/${NStudent.Id}`, {
        method: 'PUT',
        body: JSON.stringify(NStudent),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    /** Si hay algun error, se le notifica al usuario */
    .then(res => res.json())
    .catch(error => {
        alert("Error, No se pudo actualizar correctamente");
    })
    /** De lo contrario se le manda una notificación de exito */
    .then(response => {
        alert("¡Actualización exitosa!");
        getStudents();

    })
    /**limpiamos el formulario editar mediante el metodo reset() */
    document.querySelector("#editar").reset();
}

/** 
 * Esta es una función para borrar un registro de la BDs, la funcion recive como
 * parametro orden, que es dato unico de los registros en la tabla
 * @type {function}
 */
const deleteStudent = (orden) => {

    /** se comprueba dentro del arreglo students si algún objeto
     * conicide con el parametro introducido (orden), si alguno coicide
     * asignamos a NewStudent el objeto que conicidio con la busqueda
     */
    let NewStudent = {};
    students.filter(std => {
        if(std.Order == orden){
            NewStudent = std;
        }
    });

    /**Se manda la peticion a la API con el metodo fetch
     * teniendo como parametros la URL de la API y el id.
     * method: DELETE
     */
    fetch(`${API_URL}/students/${NewStudent._id}`, {
        method: 'DELETE'
    })
    /**si hay algun error entonces manda una notificación y 
     * registra el tipo de error
     */
    .then(res => res.json())
    .catch(error => {
        alert("Error, no se pudo borrar el registro" + error);
    })
    /**Si todo salio bien manda una notificacion de exito! */
    .then(response => {
        alert("Se ha eliminado correctamente el registro");
        //recarga la tabla de datos en HTML
        getStudents();
    })
}
/**
 * Esta funcion limpia el formulario editar cuando el boton "cancelar"
 * es presionado
 * @type {function}
 */
function cancelar(){
    document.querySelector("#editar").reset();
}
