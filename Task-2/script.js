const display=document.getElementById("display")

function addToDisplay(input){
    display.value+=input;
}
function clearDisplay(){
    display.value='';
}

function calculate() {
    try {
        const expression = display.value;

        if (/[+\-*/]{2,}/.test(expression)) {
            display.value = "Error";
            return;
        }

        display.value = eval(expression);
    }
    catch {
        display.value = "Error";
    }
}
function clearLastElement(){
    display.value=display.value.slice(0,-1);
}
