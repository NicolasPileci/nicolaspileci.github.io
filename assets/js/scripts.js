/* Clase Cobertura */

class Cobertura {
    constructor(tipo, precio, montoAsegurado) {
        this.tipo = tipo;
        this.precio = precio;
        this.montoAsegurado = montoAsegurado;
    }

    getDataCobertura() {
        alert(`Tipo: ${this.tipo} - Precio Mensual: ${this.precio} - Monto Asegurado: ${this.montoAsegurado}`);
    }
}

/* Clase Auto */

class Auto {
    constructor(modelo, kms, marca) {
        this.modelo = modelo;
        this.kms = kms;
        this.marca = marca;
    }

    getDataAuto() {
        return (`Datos ingresados: modelo: ${this.modelo} - Kms.: ${this.kms} - marca: ${this.marca}`);
    }

    calcularCobertura() {
        if(this.modelo < 2000 || this.kms > 120000) {
            alert("Solo admite cobertura parcial");
        }
        else if(this.modelo < 1980 || this.kms > 140000){
            alert("Admite cobertura de granizo");
        }
        else {
            alert("Admite cobertura total");
        }
    }
    
    verificarmarca() {
        let arraymarcas = ["Ford", "Fiat", "Renault", "Ford"];
        alert("Si su marca no figura en la lista, favor de agregarla: ");
        alert(arraymarcas);
        let opcionElegida = parseInt(prompt("Desea agregar su marca: (1 - Si, 2 - No)"));
        if(opcionElegida == 1) {
            let marcaNueva = prompt("Marca nueva: ");
            arraymarcas.push(marcaNueva);
        }        
    }
}

/* Servicios Extras */

arrayAutos = ["Ford", "Corsa", "Fiat", "Honda", "Toyota"];
arrayPreciosAutos = [12000, 24000, 14000, 28000, 14000];                    /* Podria ser un array de Strings para que se vea el signo $ */

function opcionAElegir() {
    var opcionElegida = parseInt(prompt("Ingrese opcion: 1 - Autos, 2 - Precios, 3 - Descuento aplicable"));
    switch(opcionElegida) {
        case 1: 
            alert(arrayAutos.join(", "));
            break;
        case 2: 
            alert(arrayPreciosAutos.join(", "));
            break;
        case 3:
            var precioIngresado = parseInt(prompt("Ingrese precio"));
            alert(`El precio con un 10% es: $${(precioIngresado /= 1.10).toFixed()}`);
    }
}

let compraAutos = document.getElementById("compra-autos");

compraAutos.addEventListener('click', (e) => {
    e.preventDefault();
    opcionAElegir();
})

let cobertura1 = new Cobertura("Parcial", "$ 3.000", "$ 200.000");
let cobertura2 = new Cobertura("Granizo", "$ 2.000", "$ 10.000");
let cobertura3 = new Cobertura("Total", "$ 4.000", "$ 300.000");

let arrayCoberturas = [cobertura1, cobertura2, cobertura3];

let listaCoberturas = document.getElementById("listaCoberturas");

listaCoberturas.addEventListener('click', (e) => {
    e.preventDefault();
    let opcionElegida = parseInt(prompt("Desea conocer nuestras coberturas: (1 - Si, 2 - No)"));
    if(opcionElegida == 1) {
        for(elements in arrayCoberturas) {
            arrayCoberturas[elements].getDataCobertura();
        }
    }   
})

/* Cambios en el DOM con JQ 

let botonCotizador = $("#boton-cotizador");
let enlace = ('<a href="cotizador.html">COTIZADOR</a>')
botonCotizador.append(enlace);

*/

/* Evento Enviar (Tecla Enter y Boton), Peticion POST */

$("#boton-enviar").on('click keypress', function(e) {

    function modificarHTML() {
        $("#result").html(auto1.getDataAuto());
        $("#result").css("border", "1px solid blue");
    }

    e.preventDefault();
    let modelo = $("#modelo").val();
    let kms = $("#kms").val();
    let marca = $("#marca").val(); 
    let auto1 = new Auto(modelo, kms, marca);
    if(e.which == 13) {
        let modelo = $("#modelo").val();
        let kms = $("#kms").val();
        let marca = $("#marca").val();
        auto1.modelo = modelo;
        auto1.kms = kms;
        auto1.marca = marca;
        modificarHTML();
    }
    modificarHTML();

    $.post("datosEnviados.json",
    {
        modelo: modelo, 
        kms: kms,
        marca: marca
    }, /* Se deberian agregar mas registros a JSON. Usamos uno solo de prueba */
    function(respuesta) {
        modificarHTML();
    });
});

/* Evento Coberturas (Boton) */

let botonCoberturas = document.getElementById("boton-cobertura");

botonCoberturas.addEventListener('click', (e) => {
    e.preventDefault();
    let modelo = $("#modelo").val();
    let kms = $("#kms").val();
    let marca = $("#marca").val(); 
    let autoCobertura = new Auto(modelo, kms, marca);
    autoCobertura.calcularCobertura() 
});

/* Efectos Boton Cobertura */

function modificarTamaño(boton) {
    boton.animate({"border-radius": "35px", "height": "60px"}, 500)              
}

function restaurarTamaño(boton) {
    boton.animate({"border-radius": "0", "height": "40px"}, 500);
}

$("#boton-cobertura").mouseover(function(e) {
    e.preventDefault()
    let botonCoberturaConEfecto = $("#boton-cobertura");
    modificarTamaño(botonCoberturaConEfecto);
});

$("#boton-cobertura").mouseout(function(e) {
    e.preventDefault()
    let botonCoberturaConEfecto = $("#boton-cobertura");
    restaurarTamaño(botonCoberturaConEfecto);
});

/* Peticion GET con AJAX */

$.ajax({
    url: "ofertaSemanal.json",
    dataType: "json",
    success: function(response) {
        $("#oferta").html(response.oferta);
        $("#tarjetas").html("");
        $("#tarjetas").append("Tarjetas: ");
        $.each(response.tarjetas, function(item) {
            $("#tarjetas").append(" ");
            $("#tarjetas").append(response.tarjetas[item]);
        })
        $("#ofertable").html(`Aplicable: ${response.aplicable}`);
    }
});
