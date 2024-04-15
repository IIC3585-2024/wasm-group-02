# Web Assembly - Factores Primos

Este es el repositorio de la tarea 2 del grupo 2 del curso IIC3585.

## 📑 Features

Este programa permite calcular los factores primos de un número cualquiera de hasta 9 dígitos. Para ello se debe correr el programa e ingresar un número a calcular y luego apretar el botón `calcular`. Luego, en una tabla se mostrarán los resultados de las distintas versiones del algoritmo, una para WASM con O2, WASM con O3 y finalmante JavaScript.

## 💡 Cómo funciona

Utilizando un algoritmo que busca los números que dividen al número ingresado, los factores primos resultantes se guardan en un arreglo. Este algoritmo es el que se encuentra dentro de la carpeta `/lib` en `prime_factors.c` y en `primeFactors.js`. Ambos archivos ocupan el mismos algoritmo de resolución.

Dentro del archivo `calculatePrimeFactors.js` se importan los módulos de las funciones de WASM contenidas en la carpeta `/wasm`, que fueron compiladas con los flags O2 y O3. Ambas funciones importadas se usan para calcular el número tomado del input en el archivo `index.html` y se utiliza también la misma función en la versión de JavaScript.

Las funciones WASM compiladas con emscripten incluyen también funciones para liberar la memoria del arreglo creado, dado que en C es necesario liberarla. Cada módulo, O2 y O3, importa una función llamada `primeFactors` y una llamada `free`.

Luego, se actualizan los valores en la tabla mostrada en el html con los primos encontrados y los tiempos de ejecución en milisegundos. Todo esto es ejecutado por el archivo `index.js` al momento de apretar el botón `Calcular`.

## 🚀 Correr programa

Para correr el programa, se debe correr el comando `python3 -m http.server` en el directorio en el que esté el archivo `index.html` y luego abrir `localhost:puerto` cambiando `puerto` por el especificado en la terminal.