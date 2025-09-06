const boton = document.getElementById('miBoton');

boton.addEventListener('mouseover', function() {
  console.log('El ratón está sobre el botón');
});

boton.addEventListener('mouseout', function() {
  console.log('El ratón ha salido del botón');
});