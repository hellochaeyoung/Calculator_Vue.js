export default class Stack {

    constructor() {
        this.tos = -1;
        this.stack = [];
    }

    push(item) {
        if(this.tos == 100) { 
            return;
        }

        this.stack[++this.tos] = item;
    }

    pop() {
        if(this.tos == -1) {
            return null;
        }

        return this.stack[this.tos--];
    }

    isEmpty() {
        if(this.tos == -1) return true;
        else return false;
    }

    prec(op) {
        switch(op) {
            case "(": case ")": return 0;
            case "+": case "-": return 1;
            case "*": case "/": return 2;
        }
        return -1;
    }

    top() {
        return this.stack[this.tos];
    }

    operate(a,b,op) {
        console.log("$$$$$" + a + b + op);
        switch(op) {
            case "+": return a+b;
            case "-": return b-a;
            case "*": return a*b;
            case "/": return b/a;
            default: return 0.0;
            
        }

        //return 0.0;
    }
}
