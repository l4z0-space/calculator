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
        console.log(number);
        this.expression1 =  this.expression1.concat(number.toString())
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
        this.symbols = this.expression1.split(new RegExp('[ 0123456789]', 'g'))
        
        this.symbols = this.symbols.filter(symbol => "-+()*÷".includes(symbol))
                                   .filter(s => s)

        console.log(this.numbers);
        console.log(this.symbols);
    }

    calculate = () => {
        
        this.separateOps()

        this.expression2= this.expression1
        this.expression1 = this.result

        this.result = parseFloat(this.numbers[0])
        const opIt = 0
        

        var it = 0
        while(it<this.symbols.length){
            const symbol = this.symbols[it]
            const nextNum = parseFloat(this.numbers[it+1])
            if (symbol === '+'){
                this.result += nextNum
            }
            else if(symbol === '-'){
                this.result -= nextNum
            }
    
            it += 1
        }

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