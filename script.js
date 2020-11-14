class Calculator {

    constructor (previousElement, currentElement)  {
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.expression1 = ""
        this.expression2 = ""
        this.result = "Result"
    }

    clear = () => {
        this.expression1 = ""
        this.operation = undefined
        this.updateDisplay()
    }

    appendNumber = (number) => {
        const symbols = "+-*÷."
        if(symbols.includes(number) && 
           symbols.includes(this.expression1[this.expression1.length -1])){
            console.log("Not valid");
        }
        else{
            this.expression1 =  this.expression1.concat(number.toString())
        }
    }

    updateDisplay = () => {
        this.currentElement[0].textContent = this.expression1
        this.previousElement[0].textContent = this.expression2
    }

    delete = () => {
        this.expression1 = this.expression1.substring(0, this.expression1.length-1)
        this.updateDisplay()
    }

    separateOps = () => {
        this.numbers = this.expression1.split(new RegExp('[-+()*÷ ]', 'g'))
                                       .filter(num => num)
        // Get the symbols and make sure we have only the valid ones
        this.symbols = this.expression1.split(new RegExp('[ 0123456789]', 'g'))
        this.symbols = this.symbols.filter(symbol => "-+()*÷".includes(symbol))
                                   .filter(s => s)
        console.log(this.numbers);
        console.log(this.symbols);
    }

    divOrMul = () => {

        // > If pos of * is i, then numbers at i and i+1 get
        // multiplied then removed and replaced, and * removed
        
       // HANDLE MULTIPLICATION
       var posM = this.symbols.indexOf("*")
        while(posM!==-1){
            const currMult = parseFloat(this.numbers[posM]) 
                           * parseFloat(this.numbers[posM+1])
            this.symbols.splice(posM, 1)
            this.numbers.splice(posM, 2, currMult)
            posM = this.symbols.indexOf("*")
        }

        // HANDLE DIVISION
        var posD = this.symbols.indexOf("÷")
        while(posD!==-1){
            const currMult = parseFloat(this.numbers[posD]) 
                           / parseFloat(this.numbers[posD+1])
            this.symbols.splice(posD, 1)
            this.numbers.splice(posD, 2, currMult)
            posD = this.symbols.indexOf("÷")
        }
    }

    calculate = () => {
        this.separateOps()
        this.expression2= this.expression1
        this.expression1 = this.result
        
        var itS = 0
        var itN = 0
        
        // If expression starts with '-', ex -1+4=3
        if ( this.symbols.length === this.numbers.length){
            this.numbers.unshift("0")
        }
        this.divOrMul()
        this.result = parseFloat(this.numbers[0])
      
        while(itS<this.symbols.length){
            const symbol = this.symbols[itS]
            const nextNum = parseFloat(this.numbers[itN+1])
            if (symbol === '+'){
                this.result += nextNum
            }
            else if(symbol === '-'){
                this.result -= nextNum
            }
            itS += 1
            itN += 1
        }
        console.log("Result", this.result);
        this.expression1 = this.result.toString()
        this.updateDisplay()
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear]')
const previousElement = document.querySelectorAll('[data-previous]')
const currentElement = document.querySelectorAll('[data-current]')


const calculator = new Calculator(previousElement, currentElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

clearAllButton.addEventListener('click', () => {
    calculator.clear()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
})

equals.addEventListener('click', () => {
    calculator.calculate()
})