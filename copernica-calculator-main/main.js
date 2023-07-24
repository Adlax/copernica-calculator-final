const keys = document.querySelectorAll('.key');
const screen_input = document.querySelector('.screen .input-blk');
const screen_output = document.querySelector('.screen .output-blk');


let input = "";


// main function :
for (let key of keys) {
    const val = key.dataset.key;
    key.addEventListener('click', () => {
        if (val === "clear") {
            input = "";
            screen_input.innerHTML = "";
            screen_output.innerHTML = "";
        } else if (val === "backspace") {
            input = input.slice(0, -1);
            screen_input.innerHTML = inputFormater(input);
        } else if (val === "=") {
            let result = eval(percentTrim(input));
            screen_output.innerHTML = outputFormater(result);
        } else if (val === "brackets") {
            //case of adding an opening bracket:
            //there is no opening bracket OR there is one opening, one closing, but the last bracket is closing one
            if (
                (input.indexOf("(") == -1) ||
                (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))
            ) {
                input += "(";
            //case of adding a closing bracket:
            //there is one opening bracket but no closing OR one opening, one closing, but last one find is opening one
            } else if (
                (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
                (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))
            ) {
                input += ")";
            }
            screen_input.innerHTML = inputFormater(input);
        } else {
            if (validateValue(val)) {
                input += val;
                screen_input.innerHTML = inputFormater(input);
            }
        }
    });
}


// inputFormater 
// function that 1)add style(color) inside the input string, and 2)transforms characters of operators (* becomes x)
// takes the input string, and returns modified input string
function inputFormater(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;
    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] === "*") {
            input_array[i] = `<span class="operator">x</span>`;
        } else if (input_array[i] === "/") {
            input_array[i] = `<span class="operator">÷</span>`;
        } else if (input_array[i] === "+") {
            input_array[i] = `<span class="operator">+</span>`;
        } else if (input_array[i] === "-") {
            input_array[i] = `<span class="operator">-</span>`;
        } else if (input_array[i] === "(") {
            input_array[i] = `<span class="brackets">(</span>`;
        } else if (input_array[i] === ")") {
            input_array[i] = `<span class="brackets">)</span>`;
        } else if (input_array[i] === "%") {
            input_array[i] = `<span class="percent">%</span>`;
        }
    }
    return input_array.join("");
}


// outputFormater function
// it rounds the output number with 2 decimals after .
function outputFormater(output) {

    let output_string = output.toString();

    let intPart = output_string.split(".")[0];
    let decPart = output_string.split(".")[1];

    let output_array = intPart.split("");


    if (decPart) {
        output_array.push(".");
        let roundedDecsArray = [decPart[0], decPart[1]];
        let roundedDecs = roundedDecsArray.join("");
        output_array.push(roundedDecs);
    }

    return output_array.join("");

}


// function that avoids some entries/keys. Return boolean. Special cases :
// cant put 2 consecutives dots in input 
// cant put 2 consecutives operators in input
function validateValue(candidateValue) {

    let operators = ["+", "-", "*", "/"];
    let lastInputCar = input.slice(-1);

    if (candidateValue === "." && lastInputCar === ".") {
        return false;
    }

    if (operators.includes(candidateValue)) {
        if (operators.includes(lastInputCar)) {
            return false;
        } else {
            return true;
        }
    }

    return true;

}


// function that transform % character into a /100
// (2% is 2/100)
function percentTrim(input) {
    let input_array = input.split("");
    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] === "%") {
            input_array[i] = "/100";
        }
    }
    return input_array.join("");
}