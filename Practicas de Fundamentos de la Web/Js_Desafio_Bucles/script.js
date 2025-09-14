var i = 0;
while (i < 31) {
    console.log(i);
    i++;
}

for (var i = 100; i > 0; i -= 4) { 
    console.log(i); 
}

for (var i = 10; i > -6; i -= 3) { 
    console.log(i); 
}

var suma = 0;
for (var i = 2; i <= 50; i += 2) {
  suma += i;
}
console.log(suma);

var suma = 1;
for (var i = 2; i <= 20; i++) {
  suma *= i;
}
console.log(suma);