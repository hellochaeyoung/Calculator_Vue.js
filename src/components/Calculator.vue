<template>
<div class="calculator">
  <div class="outcome">{{current || '0'}}</div>
  <div @click="clear" class = "button">AC</div>
  <div @click="sign" class = "button">+/-</div>
  <div @click="remove" class = "button">DEL</div>

  <div @click='operators("/")' class = "button operator">/</div>
  <div @click='getNumber(7)' class = "button">7</div>
  <div @click='getNumber(8)' class = "button">8</div>
  <div @click='getNumber(9)' class = "button">9</div>

  <div @click='operators("*")' class = "button operator">x</div>
  <div @click='getNumber(4)' class = "button">4</div>
  <div @click='getNumber(5)' class = "button">5</div>
  <div @click='getNumber(6)' class = "button">6</div>

  <div @click='operators("-")' class = "button operator">-</div>
  <div @click='getNumber(1)' class = "button">1</div>
  <div @click='getNumber(2)' class = "button">2</div>
  <div @click='getNumber(3)' class = "button">3</div>

  <div @click='operators("+")' class = "button operator">+</div>
  <div @click='getNumber(0)' class = "button zero">0</div>

  <div @click='dot' class = "button">.</div>
  <div @click='equal' class = "button operator">=</div>
</div>
  
</template> 
<script>
import Stack from './Stack.js'

export default {

    data() {
        return {
            current: '',
            previous:null,
            operator:null,
            isOperatorClicked:false,
            total:'',
            isOperateFinished:false,
            isNumberTyped:false,
            start: 0,
        }
    },

    methods: {

        clear() {
            this.current = '';
            this.total = '';
            this.start = 0;
        },

        sign() {
            if(this.current.charAt(0) === '-') {
                this.current = this.current.slice(1);
                

            }else {
                this.current = `-${this.current}`; 
                
            }
        },

        dot() {
            if(this.current.indexOf('.') === -1) {
                this.current = `${this.current}.`;
            }
            
        },

        remove() {
            this.current = this.current.slice(0,-1);

        },

        addNumber() {
            if(this.start == 1 || this.isOperatorClicked) {
                this.total += this.current;
                this.total += " ";
            }
        },

        operators(op) {
            
            this.total += this.current + " "; 
            var lastWord = this.total.charAt(this.total.length - 2);
            if(lastWord === "+" || lastWord === "-" || lastWord === "*" || lastWord === "/") { // 연산자 뒤에 바로 연산자 입력 안되게
                console.log("No Operator");
            }else {
                this.total += op;
                this.total += " ";
                this.isOperatorClicked = true;
            }
            
            
        },

        getNumber(num) {
            if(this.isOperatorClicked) {
                this.current = num + '';
                
                console.log(this.total);
                
                this.isOperatorClicked = false;
                this.isNumberTyped = true;
            }else{
                this.current = `${this.current}${num}`; // 숫자 이어서 붙이기
                
                this.start++;
                
            }
            
        },

        equal() {

            console.log("  ");
            console.log(this.total);
            this.total += this.current;
            this.total += " =";
            console.log("@@@@@" + this.total);
            
            var after = this.toPostfix(this.total);
            this.current = after;
            
            this.total = '';
        },

        toPostfix : (total) => {
            const before = total;
            const arrayInfix = before.split(' ');

            const operatorStack = new Stack();
            const numberStack = new Stack();

            for(let i=0;i<arrayInfix.length;i++) {
                console.log("%%%%%" + " " + arrayInfix[i]);

                if(isNaN(arrayInfix[i])) {
                    switch(arrayInfix[i]) {
                        case "+": case "-": case "*": case "/":
                            if(!operatorStack.isEmpty() && (operatorStack.prec(arrayInfix[i]) <= operatorStack.prec(operatorStack.top()))) {
                                var n1 = numberStack.pop();
                                var n2 = numberStack.pop();
                                var op = operatorStack.pop();

                                numberStack.push(numberStack.operate(n1,n2,op));

                            }

                            operatorStack.push(arrayInfix[i]);
                            console.log("operator push ok");

                            break;
                        
                        case "=":
                            
                            while(!operatorStack.isEmpty()) {
                                
                                var a1 = numberStack.pop();
                                var a2 = numberStack.pop();
                                var op2 = operatorStack.pop();

                                
                                console.log("a1 " + a1 + " a2 " + a2);

                                var out = numberStack.operate(a1,a2,op2);
                                numberStack.push(out);
                                console.log("*****" + numberStack.operate(a1,a2,op2));
                            }

                            return numberStack.pop();
                            
                    }

                }else {
                    let n = parseFloat(arrayInfix[i]);
                    console.log("n " + n);
                    numberStack.push(n);
                    
                }

            }
        },


    }
  
}


</script>

<style>
.calculator {
  width: 400px;
  margin: 0 auto;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.outcome {
  grid-column: 1 / 5;
  background-color: black;
  color: white;
}

.zero {
  grid-column: 1 / 3 ;
}

.button {
  background-color: #eee;
  border: 1px solid #333;
}

.operator {
  background-color: orange;
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
