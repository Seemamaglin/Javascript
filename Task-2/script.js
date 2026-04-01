const display=document.getElementById("display")

let signStack=[];
function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}
function addToDisplay(input){
    display.value+=input;
}
function clearDisplay(){
    display.value='';
}

function toggleBrackets() {
    const exp = display.value;
    const lastChar = exp.slice(-1);

    if (exp === "" || isOperator(lastChar)) {
        display.value += '(';
        signStack.push('(');
    } 
    else if (signStack.length > 0 && lastChar !== ')') {
        display.value += ')';
        signStack.pop();
    }
}
function addOperator(operator) {
    const value = display.value;
    if (value === '') return;

    const lastChar=value[value.length - 1];
    if (isOperator(lastChar)){
        display.value=value.slice(0,-1)+operator;
    } else{
        display.value+=operator;
    }
}


function calculate() {
    try {
        if (signStack.length !== 0) {
            display.value = "Error";
            return;
        }
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function clearLastElement(){
    display.value=display.value.slice(0,-1);
}
