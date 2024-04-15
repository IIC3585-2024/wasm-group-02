import { calculatePrimeFactors } from './calculatePrimeFactors.js';

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('triggerButton');
    button.addEventListener('click', calculatePrimeFactors);
});
