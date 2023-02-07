const API_URL = "http://localhost:9000/api/";

const xrh = new XMLHttpRequest();

function onRequestHandler(){
    if(this.readyState === 4 && this.status === 200){
        console.log(this.response)
    }
}
xrh.addEventListener("load", onRequestHandler);
xrh.open('GET', `${API_URL}classrooms/`);
xrh.send();
