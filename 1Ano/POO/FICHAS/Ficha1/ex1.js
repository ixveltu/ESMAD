numero1=+prompt("Indique um número: ")
numero2=+prompt("Indique um número: ")

let max = Math.max(numero1, numero2)
let min = Math.min(numero1, numero2)

soma=0

for (i=min; i<=max; i++) {
    soma+=i
}
console.log(`A soma entre ${min} e ${max}, é ${soma}`);