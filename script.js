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
    if (b == 0) {
        return '8008135';
    }
    return a / b;
}

function square (a) {
    return a ** 2;
}

function operate (num1, operator, num2) {
    backSpaceBtn.removeEventListener('mousedown', clearLastEntry);
    num1 = Number(num1);
    num2 = Number(num2);
    let result;
    if (operator === '+') {
        result = add(num1, num2).toString();
    } else if (operator === '-') {
        result = subtract(num1, num2).toString();
    } else if (operator === 'x') {
        result = multiply (num1, num2).toString();
    } else if (operator === '÷') {
        result = divide (num1, num2).toString();
    }

    /*console.log(typeof result);
    console.log('length: ' + result.length);
    console.log(typeof Number(result));
    console.log(Number(result));
    console.log(Number(result).toExponential(4));
    console.log(typeof Number(result).toExponential(4));
    console.log(Number(result).toExponential(4).toString());
    console.log(typeof Number(result).toExponential(4).toString());*/
    if (result.length > 12) {
        result = Number(result).toExponential(4).toString();
    }
    display.textContent = result;
    numberOne = result;
    numberTwo = '';
    operator = '';
    displayOps.textContent = '=';
    opsBtn.forEach(btn => btn.addEventListener('mousedown', calculation));

    return result;
}

function addBtnEvent () {
    calcBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
    opsBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
    decimal.addEventListener('mousedown', calculation);
    backSpaceBtn.addEventListener('mousedown', clearLastEntry);
    allClearBtn.addEventListener('mousedown', allClear);
    squareBtn.addEventListener('mousedown', calculation);
    negativeBtn.addEventListener('mousedown', calculation);
}

function allClear () {
    btnClicked (this);

    numberOne = '';
    operator = '';
    numberTwo = '';

    display.textContent = '';
    displayOps.textContent = '';

    calcBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
    decimal.addEventListener('mousedown', calculation);
    backSpaceBtn.addEventListener('mousedown', clearLastEntry);
    equalBtn.removeEventListener('mousedown', calculation);
}

function clearLastEntry () {
    btnClicked (this);

    if (numberTwo) {
        if (numberTwo.slice(0,2) === '0.' && numberTwo.length === 2) {
            numberTwo = '';
            display.textContent = '';
        }else {
            numberTwo = numberTwo.slice(0, -1)
            display.textContent = numberTwo;
        }
    } else if (numberOne) {
        numberOne = numberOne.slice(0, -1);
        display.textContent = numberOne;
    }

    calcBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
    decimal.addEventListener('mousedown', calculation);
}

function btnClicked (btn) {
    btn.classList.add('btn-clicked');
    btn.addEventListener('mouseup', (e) => btn.classList.remove('btn-clicked'));
    btn.addEventListener('mouseleave', (e) => btn.classList.remove('btn-clicked'));
}

function calculation () {
    if (this.id === 'decimal') {
        if (!numberOne && !operator) {
            numberOne += '0.';
            display.textContent = '0.';
        } else if(numberOne && !operator) {
            numberOne += '.';
        } else if (numberOne && operator && !numberTwo) {
            numberTwo += '0.';
            display.textContent = '0.';
        } else if (numberTwo) {
            numberTwo += '.';
            display.textContent += '.';
        }
        decimal.removeEventListener('mousedown', calculation);
    }

    if (numbersArr.includes(this.id)) {
        if (!operator) {
            if (display.textContent.length < 12) {
                numberOne += numbers[this.id];
            } else {
                calcBtn.forEach(btn => btn.removeEventListener('mousedown', calculation));
            }
            /*numberOne += numbers[this.id];*/
        } else {
            if (display.textContent.length < 12) {
                numberTwo += numbers[this.id];
            } else {
                calcBtn.forEach(btn => btn.removeEventListener('mousedown', calculation));
            }
            opsBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
            equalBtn.addEventListener('mousedown', calculation);
        }
    }

    if (operatorsArr.includes(this.id)) {
        if (numberOne && numberTwo) {
            numberOne = operate(numberOne, operator, numberTwo);
            numberTwo = '';
            operator = operators[this.id];
            display.textContent = numberOne;
            displayOps.textContent = operator;
            decimal.addEventListener('mousedown', calculation);

        } else {
            calcBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
            decimal.addEventListener('mousedown', calculation);
            opsBtn.forEach(btn => btn.removeEventListener('mousedown', calculation));
            operator = operators[this.id];
            displayOps.textContent = operator;
            equalBtn.addEventListener('mousedown', calculation);
        }
    }

    if (this.id === 'negative') {
        if (numberOne && numberTwo) {
            numberTwo *= -1;
        } else if (numberOne && !numberTwo) {
            numberOne *= -1;
        } else {
            return;
        }
    }

    if (this.id === 'squared') {
        if (numberOne && !numberTwo) {
            let workingNum = numberOne ** 2;
            if (workingNum.toString().length > 12) {
                numberOne = workingNum.toExponential(4);
                opsBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
            } else {
                numberOne = workingNum;
                opsBtn.forEach(btn => btn.addEventListener('mousedown', calculation));
            }
        }
        
        equalBtn.removeEventListener('mousedown', calculation);
        
    }

    if (!numberTwo) {
        display.textContent = numberOne;
    } else {
        display.textContent = numberTwo;
    }
    
    if (this.id === 'equals') operate(numberOne, operator, numberTwo);
}       

const calcBtn = Array.from(document.querySelectorAll('.numBtn'));
const opsBtn = Array.from(document.querySelectorAll('.opBtn'));
const decimal = document.querySelector('.dot');
const display = document.querySelector('.output-text');
const displayOps = document.querySelector('.output-operation');
const equalBtn = document.querySelector('.equals');
const backSpaceBtn = document.querySelector('.backspace');
const allClearBtn = document.querySelector('.all-clear');
const squareBtn = document.querySelector('.squared');
const negativeBtn = document.querySelector('.negative');

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
    //decimal: '.',
};

const operators = {
    addition: '+',
    subtraction: '-',
    multiplication: 'x',
    division: '÷',
    squared: 'sq'
};

const numbersArr = Array.from(Object.keys(numbers));
const operatorsArr =  Array.from(Object.keys(operators));

let numberOne = '';
let operator = '';
let numberTwo = '';

addBtnEvent ();