//DEFINICION DE VARIABLES
let cantidad
let meses
let total
let pagos
let interes
let insertar
let prestamos=[]


//DEFINICION DE CLASE
class Prestamo{
    constructor(cantidad, meses, total, pagos){
        this.cantidad=cantidad
        this.meses=meses
        this.total=total 
        this.pagos=pagos
    }
    
}


//CONEXION CON API PARA MOSTRAR EL PRECIO DEL DOLAR
fetch("https://criptoya.com/api/dolar")
.then(response => response.json())
.then(({oficial, solidario, blue}) => {		
    divDollar.innerHTML=`
    
    <div class="card text-white color-card mb-3" >
        <div class="card-header">Oficial </div>
        <div class="card-body">
            <h4 class="card-title">$${oficial}</h4>
            <p class="card-text"></p>
        </div>
    </div>

    <div class="card text-white color-card mb-3" >
        <div class="card-header">Solidario </div>
        <div class="card-body">
            <h4 class="card-title">$${solidario}</h4>
            <p class="card-text"></p>
        </div>
    </div>

    <div class="card text-white color-card mb-3" >
        <div class="card-header">Blue </div>
        <div class="card-body">
            <h4 class="card-title">$${blue}</h4>
            <p class="card-text"></p>
        </div>
    </div>
    
    `
  })

//FUNCION PARA ACTUALIZAR EL PRECIO DEL DOLAR DESDE LA API
  const dolar = document.getElementById('divdolar')
  setInterval(() => {
  fetch("https://criptoya.com/api/dolar")
  .then(response => response.json())
  .then(({oficial, solidario, blue}) => {		
      divDollar.innerHTML=`
      <div class="card text-white color-card mb-3" >
        <div class="card-header">Oficial </div>
        <div class="card-body">
            <h4 class="card-title">$${oficial}</h4>
            <p class="card-text"></p>
        </div>
    </div>

    <div class="card text-white color-card mb-3" >
        <div class="card-header">Solidario </div>
        <div class="card-body">
            <h4 class="card-title">$${solidario}</h4>
            <p class="card-text"></p>
        </div>
    </div>

    <div class="card text-white color-card mb-3" >
        <div class="card-header">Blue </div>
        <div class="card-body">
            <h4 class="card-title">$${blue}</h4>
            <p class="card-text"></p>
        </div>
    </div>
      `
    })},350000
  )



//VERIFICACION DE COTIZACCIONES EN LOCAL STORAGE
if(localStorage.getItem('storagePrestamos')){
    prestamos = JSON.parse(localStorage.getItem('storagePrestamos'))
} else{
    localStorage.setItem('storagePrestamos', JSON.stringify(prestamos))
}


//ACCESO A ELEMENTOS DEL COTIZADOR MEDIANTE DOM
const formulario = document.getElementById('idForm') 
const botonTareas = document.getElementById('btn-tareas')
const divPrestamos = document.getElementById('div-prestamos')


//FUNCION PARA GUARDAR LA COTIZACION DEL PRESTAMO
formulario.addEventListener('submit',(event) =>{	
	event.preventDefault()	
    cantidad = parseFloat((document.getElementById('idMonto').value))
	meses = parseFloat((document.getElementById('idMeses').value))
    
    totales() //SE LLAMA LA FUNCION PARA CALCULAR PAGOS, PLAZOS E INTERES DEL PRESTAMO

    if((cantidad >=1000 && cantidad <=50000) && (meses >=1 && meses <=12)){
        const prestamo1 = new Prestamo(cantidad, meses, total, pagos)
        prestamos.push(prestamo1)
        localStorage.setItem('storagePrestamos', JSON.stringify(prestamos))
    }

    formulario.reset()
    insertarDatos()
})


//FUNCION PARA CALCULAR LOS PAGOS, PLAZOS E INTERES DEL PRESTAMO
function totales(){
    if((meses <= 3) && (cantidad >= 1000 && cantidad <=50000)){
        interes = 0.10
        total = cantidad + (cantidad * interes)
        pagos = parseFloat((total / meses).toFixed(2))  
    }

    else if((meses >3 && meses <= 6) && (cantidad >= 1000 && cantidad <=50000)) {
        interes = 0.25
        total = cantidad + (cantidad * interes)
        pagos = parseFloat((total / meses).toFixed(2))
    }

    else if((meses >6 && meses <= 12) && (cantidad >= 1000 && cantidad <=50000)) {
        interes = 0.50
        total = cantidad + (cantidad * interes)
        pagos = parseFloat((total / meses).toFixed(2))
    } 
}



//FUNCION PARA VERIFICAR QUE LA INFORMACION INGRESADA AL SIMULADOR ES CORRECTA
function insertarDatos(){
    if((meses >=1 && meses <= 12) && (cantidad >= 1000 && cantidad <=50000)){
        prestamos.forEach(dato => {
        resultado.innerHTML =`
        <p>El prestamo solicitado es de: ${dato.cantidad} pesos a pagar en ${dato.meses} meses, 
        por lo que usted pagará un total de ${dato.total} pesos en cuotas de ${dato.pagos} mensuales</p>`
})} else if((meses >12) || (cantidad <1000 || cantidad >50000)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los datos ingresados no son correctos, intentelo nuevamente',
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Aceptar'
          })
}
}


//EVENTO PARA MOSTRAR LAS COTIZACIONES GUARDADAS EN LOCALSTORAGE
botonTareas.addEventListener('click', () =>{
    let prestamoStorage = JSON.parse(localStorage.getItem('storagePrestamos'))
    divprestamos.innerHTML=""
    prestamoStorage.forEach((dato, indice) => {
        divprestamos.innerHTML+=`
            <div class="row" id='prestamo${indice}'>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Cotizacion de ${dato.cantidad}$ pesos</h5>
                            <p>El prestamo solicitado es de: ${dato.cantidad} pesos a pagar en ${dato.meses} meses, 
                            por lo que usted pagará un total de ${dato.total} pesos en cuotas de ${dato.pagos} mensuales</p>
                            <a href="#" class="btn btn-danger" id="btn-eliminar">Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>
        
            <br>
            `
        })

//FUNCION PARA ELIMINAR UNA COTIZACION DE LOCALSTORAGE
    prestamoStorage.forEach((dato,indice) => {
    document.getElementById(`prestamo${indice}`).lastElementChild.lastElementChild.lastElementChild.lastElementChild.addEventListener("click",()=>{ 
    document.getElementById(`prestamo${indice}`).remove()
    prestamos.splice(indice,1)
    localStorage.setItem('storagePrestamos',JSON.stringify(prestamos))
    })
     
     })
})


let contacForm = document.getElementById("contact-form")

contacForm.addEventListener('submit', () =>{
    event.preventDefault()
    Swal.fire({
        icon: 'success',
        title: 'Tu correo ha sido enviado',
        text: 'En breve uno de nuestros agentes te contactará',
        confirmButtonColor: '#0d6efd',
        confirmButtonText: 'Aceptar'
      })

      contacForm.reset()
})





