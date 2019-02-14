const screen = document.querySelector('.screen');
let buffer = '0';
let runningTotal = 0;
let operator = null;

function renderScreen(value) {
    screen.innerText = value;
}

function clickedButton(buttonValue) {
    if (isNaN(buttonValue)) {
        // Button was not a number, handle operator
        clickedOperator(buttonValue);
    } else {
        // Button was a number
        if (operator === '=') {
            reset()
        }
        handleNumber(buttonValue);
    }
}

function reset() {
    buffer = '0';
    operator = null;
    runningTotal = 0;
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
        reset();
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
        if (!event.target.classList.contains('screen')) {
            clickedButton(event.target.innerText);
            console.log(`Buffer: ${buffer}`);
        }
    });
}

init();