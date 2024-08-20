function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}

function square (a) {
    return a ** 2;
}

function operate (num1, operator, num2) {
    console.log('test');
    num1 = Number(num1);
    num2 = Number(num2);
    console.log('Number 1: ' + num1);
    console.log('Number 2: ' + num2);
    console.log('Operator: ' + operator);
    if (operator === '+') {
        display.textContent = add(num1, num2);
    } else if (operator === '-') {
        display.textContent = subtract(num1, num2);
    } else if (operator === 'X') {
        display.textContent = multiply(num1, num2);
    } else if (operator === '÷') {
        display.textContent = divide(num1, num2);
    }
}

function addBtnEvent () {
    calcBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
    opsBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
    decimal.addEventListener('mousedown', calculation);
    equalBtn.addEventListener('mousedown', calculation);
}

function calculation () {
    this.classList.add('btn-clicked');
    this.addEventListener('mouseup', (e) => this.classList.remove('btn-clicked'));
    this.addEventListener('mouseleave', (e) => this.classList.remove('btn-clicked'));

    if (!numbersArr.includes(this.id)) {
        if (this.id === 'addition') operator = '+';
        if (this.id === 'subtraction') operator = '-';
        if (this.id === 'multiplication') operator = 'X';
        if (this.id === 'division') operator = '÷';
        if (this.id === 'negative' && numberOne && !numberTwo) {
            //operator = '(-)';
            numberOne *= -1;
        }
        if (this.id === 'negative' && numberOne && numberTwo) {
            //operator = '(-)';
            numberTwo *= -1;
        }  
        if (this.id === 'squared' && numberOne) {
            operator = 'sq';
            numberOne = square(numberOne);
        }
    } else if (!operator) {
        if (this.id === 'decimal' && !numberOne) {
            decimal.removeEventListener('mousedown', calculation);
            numberOne += '0.'
        } else if (this.id === 'decimal' && numberOne) {
            decimal.removeEventListener('mousedown', calculation);
            numberOne += '.'
        } else {
            numberOne += numbers[this.id];
        }
    } else {
        if (this.id === 'decimal' && !numberTwo) {
            decimal.removeEventListener('mousedown', calculation);
            numberTwo += '0.'
        } else if (this.id === 'decimal' && numberTwo) {
            decimal.removeEventListener('mousedown', calculation);
            numberTwo += '.'
        } else {
            numberTwo += numbers[this.id];
        }
    }

    
    if (!numberTwo) {
        display.textContent = numberOne;
    } else {
        display.textContent = numberTwo;
    }
    
    displayOps.textContent = operator;
    
    if (this.id === 'equals') operate(numberOne, operator, numberTwo);

}

const calcBtn = Array.from(document.querySelectorAll('.numBtn'));
const opsBtn = Array.from(document.querySelectorAll('.opBtn'));
const decimal = document.querySelector('.dot');
const display = document.querySelector('.output-text');
const displayOps = document.querySelector('.output-operation');
const equalBtn = document.querySelector('.equals');

const numbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    decimal: '.',
}

const numbersArr = Array.from(Object.keys(numbers));

let numberOne = '';
let operator;
let numberTwo = '';

addBtnEvent();