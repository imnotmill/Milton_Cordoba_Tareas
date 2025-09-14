let conta1 = 0;

function contador(input) {
    conta1++;
    input.innerText = conta1 + " " + "Me Gusta";
    alert ("Gato Atigrado was liked");
}

let conta2 = 0;

function contador2(input) {
    conta2++;
    input.innerText = conta2 + " " + "Me Gusta";
    alert ("Golden Retriever was liked");
}

const boton = document.getElementById('miBoton');

boton.addEventListener('mouseover', function() {
  console.log('El ratón está sobre el botón');
});

boton.addEventListener('mouseout', function() {
  console.log('El ratón ha salido del botón');
});
