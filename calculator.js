const screen = document.querySelector('.screen');
let buffer = '0';
let runningTotal = 0;
let operator = null;

function renderScreen(value) {
    screen.innerText = value;
}

function clickedButton(buttonValue) {
    if (isNaN(buttonValue)) {
        // Button was not a number, handle symbol
        clickedOperator(buttonValue);
    } else {
        // button was a number
        handleNumber(buttonValue);
    }
}

function handleNumber(buttonValue) {
    if (buffer === '0') {
        buffer = buttonValue;
    } else {
        buffer += buttonValue;
    }
    renderScreen(buffer);
}

function clickedOperator(buttonValue) {
    if (buttonValue === 'C') {
        buffer = '0';
        runningTotal = 0;
        operator = null;
        renderScreen(buffer);
        return;
    } else if (buttonValue === '←') {
        if (buffer.length === 1) {
            buffer = '0';
        } else {
            buffer = buffer.substr(0, buffer.length - 1);
        }
        renderScreen(buffer);
        return;
    }
    switchOperator(operator);
    operator = buttonValue;
    if (runningTotal === 0) {
        runningTotal = parseFloat(buffer);
    }
    buffer = '0';
    renderScreen(runningTotal);
}

function switchOperator(symbol) {
    switch (symbol) {
        case '+':
            runningTotal += parseFloat(buffer);
            break;
        case '-':
            runningTotal -= parseFloat(buffer);
            break;
        case 'x':
            runningTotal *= parseFloat(buffer);
            break;
        case '÷':
            runningTotal /= parseFloat(buffer);
            break;
        case '=':
            renderScreen(runningTotal);
            break;
    }
}

function init() {
    document.querySelector('.calculator').addEventListener('click', function (event) {
        clickedButton(event.target.innerText);
        console.log(`Buffer: ${buffer}`);
        // console.log(`runningTotal: ${runningTotal}`);
        // console.log(`operator: ${operator}`);
    });
}

init();