#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <emscripten.h>


// Código extraído de https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/
EMSCRIPTEN_KEEPALIVE
long int* primeFactors(long int number)
{
	int capacity = ceil(log2(number)); // Se calcula la capacidad de la lista de factores
    long int *factors = calloc(capacity, sizeof(long int));
    int count = 0; // Contador para el número de factores

    // Guardar 2s que dividen al número
    while (number % 2 == 0)
    {
        factors[count] = 2;
        number = number / 2;
		count++;
    }

    // El número es impar a partir de este punto
    // por lo que podemos ir saltando de 2 en 2
    for (long int posible_divisor = 3; posible_divisor * posible_divisor <= number; posible_divisor += 2)
    {
        // Mientras el posible divisor divida al número, se guarda y se divide
        while (number % posible_divisor == 0)
        {
            factors[count] = posible_divisor;
            number = number / posible_divisor;
			count++;
        }
    }

    // Si ya pasamos todos los posibles divisores y el número es mayor a 2
    // entonces el número es primo y se incluye en el arreglo
    if (number > 2)
        factors[count] = number;

    return factors;
}

// Liberar memoria de los factores
EMSCRIPTEN_KEEPALIVE
void freeFactors(long int* factors)
{
	free(factors);
}
