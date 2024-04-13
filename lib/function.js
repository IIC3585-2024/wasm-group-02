// Código extraído de: https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/

function primeFactors(n) {
    let primeFactorsList = [];
    // Guardar 2s que dividen al numero
    while (n % 2 == 0) {
        primeFactorsList.push(2);
        n = Math.floor(n / 2);
    }

    // El número es impar a partir de este punto
    // por lo que podemos ir saltando de 2 en 2
    for (let i = 3;
        i <= Math.floor(Math.sqrt(n));
        i = i + 2) {
        while (n % i == 0) {
            primeFactorsList.push(i);
            n = Math.floor(n / i);
        }
    }

    // Si ya pasamos todos los posibles divisores y el número es mayor a 2
    // entonces el número es primo y se incluye en la lista
    if (n > 2)
        primeFactorsList.push(n);
    console.log(primeFactorsList);
    return primeFactorsList;
}


let n = 30030;

primeFactors(n);


