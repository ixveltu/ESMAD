const numeros = [];

let numero = +prompt("Indique um numero: ");
do {
        
} while (numero =! 0) {
    numeros.push(numero);
    let max = Math.max(...numeros);
    let min = Math.min(...numeros);
}
if (numero == 0) {
    console.log(`Os numeros foram ${numeros}, o maior numero foi ${max} e o menor, ${min}`)
}