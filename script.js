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



    calculate = () => {
        
        this.numbers = this.expression1.split(new RegExp('[-+()*÷ ]', 'g'))
        this.symbols = this.expression1.split(new RegExp('[0123456789 ]', 'g'))
        console.log(this.numbers);
        console.log(this.symbols);
        this.expression2= this.expression1
        this.expression1 = this.result

        this.result = 0

        this.numbers.forEach(strNum => {
            const num = parseFloat(strNum)
            this.result += num
        });
        
        this.expression1 = this.result
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