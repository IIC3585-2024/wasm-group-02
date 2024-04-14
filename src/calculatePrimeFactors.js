import ModuleO2 from "../wasm/prime_factors_O2.js";
import ModuleO3 from "../wasm/prime_factors_O3.js";
import { primeFactors } from "../lib/primeFactors.js";

export async function calculatePrimeFactors() {
    const number = document.getElementById("number").value;
    const maxAmountOfPrimes = Math.ceil(Math.log2(number));

    // Import WASM modules
    let moduleO2 = await ModuleO2();
    const primeFactorsO2 = moduleO2.cwrap(
        "primeFactors",
        "number",
        ["number"]
    );
    const freeO2 = moduleO2.cwrap("freeFactors", "void", ["number"]);

    let moduleO3 = await ModuleO3();
    const primeFactorsO3 = moduleO3.cwrap(
        "primeFactors",
        "number",
        ["number"]
    );
    const freeO3 = moduleO3.cwrap("freeFactors", "void", ["number"]);

    // Calculate prime factors with O2
    let startO2 = performance.now();
    let resultO2 = await primeFactorsO2(number);
    let endO2 = performance.now();
    let timeO2 = endO2 - startO2;
    let primesArrayO2 = new Uint32Array(moduleO2.HEAPU32.buffer, resultO2, maxAmountOfPrimes);
    let finalArrayO2 = [];
    for (let i = 0; i < maxAmountOfPrimes; i++) {
        if (primesArrayO2[i] === 0) {
            break;
        }
        finalArrayO2.push(primesArrayO2[i]);
    }
    changeResult(Array.from(finalArrayO2).toString(), "resultO2");
    changeTime(timeO2 + "ms", "timeO2");
    freeO2(primesArrayO2);

    // Calculate prime factors with O3
    let startO3 = performance.now();
    let resultO3 = await primeFactorsO3(number);
    let endO3 = performance.now();
    let timeO3 = endO3 - startO3;
    let primesArrayO3 = new Uint32Array(moduleO3.HEAPU32.buffer, resultO3, maxAmountOfPrimes);
    let finalArrayO3 = [];
    console.log(primesArrayO3);
    for (let i = 0; i < maxAmountOfPrimes; i++) {
        if (primesArrayO3[i] === 0) {
            break;
        }
        finalArrayO3.push(primesArrayO3[i]);
    }
    changeResult(Array.from(finalArrayO3).toString(), "resultO3");
    changeTime(timeO3 + "ms", "timeO3");
    freeO3(primesArrayO3);

    // Calculate prime factors with JS
    let startJS = performance.now();
    let resultJS = await primeFactors(number);
    let endJS = performance.now();
    let timeJS = endJS - startJS;
    changeResult(resultJS.toString(), "resultJS");
    changeTime(timeJS + "ms", "timeJS");
}

const changeResult = (result, id) => {
    document.getElementById(id).innerHTML = result;
}

const changeTime = (time, id) => {
    document.getElementById(id).innerHTML = time;
}
