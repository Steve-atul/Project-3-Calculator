// scripts.js

const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const { id } = button;

        if (button.classList.contains('number') || id === 'decimal') {
            appendToInput(id);
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
            chooseOperator(id);
        } else if (id === 'equals') {
            calculate();
        } else if (id === 'clear') {
            clear();
        } else if (id === 'delete') {
            deleteLast();
        }

        updateDisplay();
    });
});

function appendToInput(input) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (input === 'decimal') {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    } else {
        if (currentInput === '0' || (operator && !previousInput)) {
            currentInput = input;
        } else {
            currentInput += input;
        }
    }
}

function chooseOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    operator = op;
    previousInput = currentInput + getOperatorSymbol(op);
    currentInput = '';
    shouldResetDisplay = false;
}

function calculate() {
    if (!operator) return;

    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(previous) || isNaN(current)) return;

    let result;
    switch (operator) {
        case 'add':
            result = previous + current;
            break;
        case 'subtract':
            result = previous - current;
            break;
        case 'multiply':
            result = previous * current;
            break;
        case 'divide':
            result = previous / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
}

function deleteLast() {
    if (shouldResetDisplay) return;

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '';
    }
}

function updateDisplay() {
    display.textContent = previousInput + currentInput;
}

function getOperatorSymbol(op) {
    switch (op) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '*';
        case 'divide':
            return '/';
        default:
            return '';
    }
}
