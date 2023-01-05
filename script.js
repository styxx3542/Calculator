const operate = (op1,op2,operator) =>
{
    switch(operator)
    {
        case '+':return add(op1,op2)
        case '-':return subtract(op1,op2)
        case '*':return multiply(op1,op2)
        case '/':
            if (op2 == 0)DivideZero()
            else return divide(op1,op2)
    }
}
const add = (a,b) => (a+b);
const subtract = (a,b)=>(a-b);
const multiply = (a,b)=>
{
    let num = a*b;
    if(num == parseInt(num))return num.toString()
    return num.toFixed(3)*1
};
const divide = (a,b) => {
    let num = a/b;
    return num.toFixed(3)*1
};

const display = document.getElementById('main_display');
const sec_display = document.getElementById('sec_display');
operands = document.querySelectorAll(".operand")
var operator = "";
let hasFirstOperand = false
let hasSecondOperand = false
let floatPressed = false
for(let op of operands)
{
    op.addEventListener("click",(e) => (show(e)))
}
const show = (e) => {
    if (hasFirstOperand == false || operator == ""){
        if (display.innerHTML == '0'){
            display.innerHTML = e.srcElement.innerHTML;
        }
        else{
            display.innerHTML += e.srcElement.innerHTML;
        }
        op1 = parseFloat(display.innerHTML);
        hasFirstOperand = true
        floatPressed = false;
}
else{
if(hasSecondOperand == false)
{
    display.innerHTML = e.srcElement.innerHTML;
    hasSecondOperand = true
}
else{
    display.innerHTML += e.srcElement.innerHTML;
}
op2 = parseFloat(display.innerHTML)
}
}
const operators = document.querySelectorAll(".operator")
for (let oper of operators)
{
    oper.addEventListener("click",() => {
        if(hasFirstOperand && hasSecondOperand == false){
            operator = oper.id;
            sec_display.innerHTML = op1.toString() + " " + oper.innerHTML;
        }
        else if(hasSecondOperand)
        {
            console.log("hello")
            equals()
            operator = oper.id
            sec_display.innerHTML = op1.toString() + " " + oper.innerHTML;
        }

    })
}
document.getElementById('=').addEventListener("click",()=>(equals()))
const equals = () => {
    if (hasFirstOperand && hasSecondOperand && floatPressed == false){
    let result = operate(op1,op2,operator)
    hasSecondOperand = false 
    operator = ""
    sec_display.innerHTML = ""
    display.innerHTML = result || "0";
    op1 = parseFloat(result);
}
}
document.getElementById('clear').addEventListener("click", ()=>{
    hasFirstOperand = false;
    hasSecondOperand = false;
    display.innerHTML = "0"
    op1 = parseFloat(0);
    sec_display.innerHTML = ""
    operator = ""
})
document.getElementById('delete').addEventListener("click",()=>{
    if(display.innerHTML && display.innerHTML != '0'){
        str = display.innerHTML;
        display.innerHTML = str.substring(0,str.length - 1)
        if (display.innerHTML == "")display.innerHTML = "0";
    }
    if(hasSecondOperand)op2 = parseFLoat(display.innerHTML)
    else if(hasFirstOperand)op1 = parseFloat(display.innerHTML)
})
const DivideZero = () =>{
    document.getElementById('clear').click();
    alert("Can't divide by zero")
}
document.getElementById('.').addEventListener("click",()=>{
    if(display.innerHTML.includes('.'))return;
    display.innerHTML += '.'
    floatPressed = true
})

document.addEventListener("keypress",(e)=>{
    if((e.key >= '0' && e.key <= '9') || e.key == "= " || e.key == "+"  || e.key == "-"  || e.key == "*" || e.key == "/" || e.key == '.'){
    document.getElementById(e.key).click();
    }
})
document.addEventListener("keydown",(e) => {
    if(e.key == "Enter")document.getElementById('=').click()
    if(e.key == "Backspace")document.getElementById('delete').click()
})