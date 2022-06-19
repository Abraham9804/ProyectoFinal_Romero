let multiplicando
let multiplicador
multiplicando = prompt("ingrese la tabla de multiplicacion deseada")
multiplicador = prompt("ingrese hasta que numero desea multiplicar")





for(let i =1; i <= multiplicador; i ++){
    operacion = multiplicando * i
    console.log(multiplicando + ' X ' + i + ' = ' + operacion )
}