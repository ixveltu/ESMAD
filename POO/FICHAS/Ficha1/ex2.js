const numeros = [];

do {
    let numero = +prompt("Indique um numero: ");
        
} while (numero =! 0) {
    if (numero =! 0){
        numero.push(numeros);
    }
    max = Math.max(numeros)
    min = Math.min(numeros)
}
  
console.log(`Os numeros foram ${numeros}, o maior numero foi ${max} e o menor, ${min}`)
