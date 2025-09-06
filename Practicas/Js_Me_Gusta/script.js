let likeslinn  = document.querySelector(".likeslinn");
let likeslina  = document.querySelector(".likeslina");
let likesmateo = document.querySelector(".likesmateo");

let conta1 = 0;
let conta2 = 0;
let conta3 = 0;

function contadorlinn() {
  conta1++;
  likeslinn.innerText = conta1 + " like(s)";
}

function contadorlina() {
  conta2++;
  likeslina.innerText = conta2 + " like(s)";
}

function contadormateo() {
  conta3++;
  likesmateo.innerText = conta3 + " like(s)";
}