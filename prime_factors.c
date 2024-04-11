# include <stdio.h>

// Código extraído de https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/
void primeFactors(long int number)
{
	// Guardar 2s que dividen al numero
	while (number % 2 == 0)
	{
		printf("%d ", 2);
		number = number / 2;
	}

	// El número es impar a partir de este punto
	// por lo que podemos ir saltando de 2 en 2
	for (long int posible_divisor = 3; posible_divisor * posible_divisor <= number; posible_divisor = posible_divisor + 2)
	{
		// Mientras el posible divisor divida al número se guarda y se divide
		while (number % posible_divisor == 0)
		{
			printf("%ld ", posible_divisor);
			number = number / posible_divisor;
		}
	}

	// Si ya pasamos todos los posibles divisores y el número es mayor a 2
    // entonces el número es primo y se incluye en la lista
	if (number > 2)
		printf ("%ld ", number);
}

// Test de la función
int main()
{
	long int number = 2147483648;
	primeFactors(number);
	return 0;
}
