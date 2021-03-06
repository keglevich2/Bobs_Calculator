function EquationParser(input, variab) {
 

	    String.prototype.replaceAll = function(search, replace) {
		if (replace === undefined) {
            return this.toString();
        }
        return this.split(search).join(replace);
    }
 
        var inputString = input;
 
    var variable = variab;
    var R = toRPN(inputString.replaceAll(" ", ""));
    if (!(this instanceof EquationParser))
        return new EquationParser();
    this.string = String(correctBraces(input)).replaceAll(" ","").replaceAll("_1*","-").replaceAll("_","-");
 
   
 
    function isOperator(input) {
        if (input == "+" || input == "^" || input == "-" || input == "*" || input == "/") {
            return true;
        }
        else { return false; }
    }
    function getRPN(){
        return RPN;}
    function isFunction(input) {
        if (input == "sin" || input == "sinh" || input == "cos" || input == "cosh" || input == "tan" || input == "tanh" || input == "ctg" || input == "log" || input == "ln" || input == "abs" || input == "sgn" || input == "sqrt") {
            return true;
        }
        else { return false; }
    }
    function replaceAtIndex(index,value,input){
        return input.substr(0,index)+value+input.substr(index+1);
    }
    function correctBraces(input) {
        var h = input.replaceAll("+", "%+%");
        h = h.replaceAll("-", "%-%");
        h = h.replaceAll("*", "%*%");
        h = h.replaceAll("^", "%^%");
        h = h.replaceAll("/", "%/%");
        h = h.replaceAll("sinh", "%senh%");
        h = h.replaceAll("cosh", "%csh%");
        h = h.replaceAll("tanh", "%tenh%");
        h = h.replaceAll("sqrt", "%sqrt%");
        h = h.replaceAll("sin", "%sin%");
        h = h.replaceAll("cos", "%cos%");
        h = h.replaceAll("tan", "%tan%");
        h = h.replaceAll("ctg", "%ctg%");
        h = h.replaceAll("log", "%log%");
        h = h.replaceAll("abs", "%abs%");
        h = h.replaceAll("sgn", "%sgn%");
        h = h.replaceAll("ln", "%ln%");
        h = h.replaceAll("(", "%(%");
        h = h.replaceAll(")", "%)%");
        h = h.replaceAll("senh", "sinh");
        h = h.replaceAll("tenh", "tanh");
        h = h.replaceAll("csh", "cosh");
        h = String(h);
        var supportTokens=h.split("%");
        var numTokens = supportTokens.length;
        for (var i = 0; i < numTokens; i++) {
            supportTokens[i] = supportTokens[i].replaceAll(" ", "");
            //supportTokens[i] = supportTokens[i].replaceAll("_", "-");
        }
        supportTokens = supportTokens.filter(function (n) { return n });
        var parToAdd = 0;
        var openedPar = 0;
        var previousOpenedPar=new Array();
        for (var i = 0; i < supportTokens.length; i++) {
            var tk1 = supportTokens[i];
            if (i < supportTokens.length - 1) {
               
                var tk2 = supportTokens[i + 1];
                if (isFunction(tk1)) {
                    previousOpenedPar.push(openedPar);
 
                    if (isFunction(tk2)) {
                        supportTokens[i] = supportTokens[i] + "(";
                        parToAdd++;
                    }
                    else if (tk2 == "-"||tk2=="_") {
                        if (i < supportTokens.length - 2) {
                            if (isNumeric(supportTokens[i + 2], variable)) {
                                supportTokens[i] = supportTokens[i] + "(";
                                parToAdd++;
                                for (var j = previousOpenedPar.length; j > -1; j--) {
                                    if (previousOpenedPar[j] == openedPar && parToAdd > 0) {
                                        supportTokens[i + 2] = supportTokens[i + 2] + ")";
                                        parToAdd -= 1;
                                        tbr++;
                                    }
                                }
//                                if (previousOpenedPar - openedPar == 0 && parToAdd > 0) {
//                                    for (var j = 0; j < parToAdd; j++) {
//                                        supportTokens[i + 2] = supportTokens[i + 2] + ")";
//                                    }
//                                    parToAdd = 0;
//                                }
                                i += 2;
                            }
                            else {
                                supportTokens[i] = supportTokens[i] + "(";
                                supportTokens[i + 1] = "_1*";
                                i++;
                                parToAdd++;
                            }
                        }
                    }
 
                    else if (isNumeric(tk2, variable) || isNumeric(tk2.replaceAll("_", ""), variable)) {
                        supportTokens[i] = supportTokens[i] + "(";
                        parToAdd++;
 
                        for (var j = previousOpenedPar.length; j > -1; j--) {
                            if (previousOpenedPar[j] == openedPar && parToAdd > 0) {
                                supportTokens[i+1] = supportTokens[i+1] + ")";
                                parToAdd -= 1;
                                tbr++;
                            }
                        }
 
//                        if (previousOpenedPar - openedPar == 0 && parToAdd > 0) {
//                            for (var j = 0; j < parToAdd; j++) {
//                                supportTokens[i + 1] = supportTokens[i + 1] + ")";
//                            }
//                            parToAdd = 0;
//                        }
                        i++;
                    }
//                    else if (String(tk2) == "(") {
//                        i++;
//                        openedPar += 1;
//                    }
//                    else if (String(tk2) == ")") {
//                        i++;
//                        openedPar -= 1;
//                    }
 
                }
            }
            if (String(tk1) == "(") {
                openedPar += 1;
            }
            else if (String(tk1) == ")") {
                openedPar -= 1;
                var tbr = 0;
                for (var j= previousOpenedPar.length; j > -1; j--) {
                    if (previousOpenedPar[j] == openedPar && parToAdd > 0) {
                        supportTokens[i] = supportTokens[i] + ")";
                        parToAdd -= 1;
                        tbr++;
                    }
                }
                for (var j = 0; j < tbr; j++) { previousOpenedPar.pop(); }
            }
            else if (isNumeric(tk1,variable)||isNumeric(tk1.replaceAll("_",""),variable)) {
                var tbr = 0;
                for (var j = previousOpenedPar.length; j > -1; j--) {
                    if (previousOpenedPar[j] == openedPar && parToAdd>0) {
                        supportTokens[i] = supportTokens[i] + ")";
                        parToAdd -= 1;
                        tbr++;
                    }
                }
                for (var j = 0;j < tbr; j++) { previousOpenedPar.pop(); }
            }
         
        }
        var str="";
        for (var j = 0; j< supportTokens.length; j++) {
            str+=supportTokens[j].replaceAll("%", "");
        }
       
        return str;
    }
    function correctFunctionBraces(input, func) {
        input=String(input);
        var b=input.indexOf(func);
        if (b > 0) {
            if (input.substr(b - 1, 1) == "_") {
                if (b > 1) {
                    input = input.substr(b - 2) + "_1*" + input.substr(input.indexOf(func));
                }
                else {
                    input = "_1*" + input.substr(input.indexOf(func));}
 
            }
        }
 
        var index=0;
        if (input.indexOf(func) >= 0) {
            var indexfirst=input.indexOf(func);
            do{
                indexfirst=input.substr(index).indexOf(func)+index;
                input=input.substr(0,indexfirst)+"("+func+input.substr(indexfirst+func.length);
                var firstindex=input.substr(index).indexOf(func);
 
                index=input.indexOf(func,index)+func.length;
                var j=0;
                var nid=false;
                var parToAdd=0;
 
                do{
                    var sub=input.substr(index,1);
                    if(nid==true){nid=false;}
                    if (sub == "(") { j++; }
                    else if (sub == ")") { j--; }
                    else if (input.length - index > 1 && isFunction(input.substr(index, 1))) {
                        nid = true; index += 0;
                    }
                    else if (input.length - index > 2 && isFunction(input.substr(index, 2))) {
                        nid = true; index += 1;
                    }
                    else if (input.length - index > 3 && isFunction(input.substr(index, 3))) {
                        nid = true; index += 2;
                    }
                    else if (sub == "_") {
                        index++;
                        if (input.length - index > 1 && isFunction(input.substr(index, 1))) {
                            nid = true;
                            parToAdd++;
                            input = input.substr(0, index - 1) + "%1*" + input.substr(index);
                            index += 0;
                        }
                        else if (input.length - index > 2 && isFunction(input.substr(index, 2))) {
                            nid = true;
                            parToAdd++;
                            input = input.substr(0, index - 1) + "%1*" + input.substr(index);
                            index += 1;
                        }
                        else if (input.length - index > 3 && isFunction(input.substr(index, 3))) {
                            nid = true;
                            parToAdd++;
                            input = input.substr(0, index - 1) + "%1*" + input.substr(index);
                            index += 2;
                        }
                    }
                    if(isNumeric(sub)||sub=="_"){
                   
                        var ii=index;
                        var firstPoint = false;
                        var sub1 = input.substr(index, 1);
                        do{
                            if (isNumeric(sub1) || (sub1 == "." && firstPoint == false)) {
                                ii += 1;
                                if (sub1 == ".") { firstPoint = true; }
                            }
                            else { break; }
                            var sub1 = input.substr(ii, 1);
                        } while (isNumeric(sub1)||sub1==".");
                        index = ii;
                    }
                    index++;
                    var bb=((j>0)||nid==true);
                }while (bb);
                var ptoa="";
                for(var i=0;i<parToAdd;i++){
                    ptoa+=")";
                }
                input=input.substr(0,index)+")"+ptoa+input.substr(index);
                if(input.substr(indexfirst+func.length).indexOf(func)>=0){
                    index=input.substr(indexfirst+func.length).indexOf(func)+indexfirst+func.length;
                }
                else { index = -1; }
                var bbb = index > 0;
            }while(bbb);
           
        }
        input = input.replaceAll("%", "_");
        return input;
    }
   
 
    function isNumeric(n,variable) {
        if(n==variable||n=="-"+variable){return true;}
        else{
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }
 
    function opAssociativity(op){
        if(op=="+"||op=="-"||op=="*"||op=="/"||op=="^"){
            return 1;
        }
        else{return 0;}
    }
    function opPrecedence(op){
        if(op=="+"||op=="-"){
            return 4;
        }
        else if(op=="*"||op=="/"){
            return 3;
        }
        else if(op=="^"){
            return 2;
        }
    }
 
    function toRPN(input) {
        var supportInput = "" + input;
        var piStr = String(Math.PI);
        var eStr = String(Math.E);
        supportInput = supportInput.replaceAll("pi", piStr);
        supportInput = supportInput.replaceAll("e", piStr);
        for (var k = 0; k < supportInput.length; k++) {
            //   PER RIPRISTINARE IL - DAVANTI AD OPERATORE SOSTITUISCI A RIGA SOTTO         if (k > 0 && supportInput.substr(k, 1) == "-" && (supportInput.substr(k - 1, 1) == "(" || isOperator(supportInput.substr(k - 1, 1)) || isFunction(supportInput.substr(k - 1, 1)) || isFunction(supportInput.substr(k - 2, 2)) || isFunction(supportInput.substr(k - 3, 3)))) {
 
            if (k > 0 && supportInput.substr(k, 1) == "-" && (supportInput.substr(k - 1, 1) == "(" || isOperator(supportInput.substr(k - 1, 1)) || isFunction(supportInput.substr(k - 1, 1)) || isFunction(supportInput.substr(k - 2, 2)) || isFunction(supportInput.substr(k - 3, 3)) || isFunction(supportInput.substr(k - 4, 4)))) {
                supportInput = replaceAtIndex(k, "_", supportInput);
            }
            if (k == 0 && supportInput.substr(k, 1) == "-") {
                supportInput=replaceAtIndex(k,"_1*",supportInput);
            }
        }
//        supportInput = correctFunctionBraces(supportInput,"sin");
//        supportInput = correctFunctionBraces(supportInput, "cos");
//        supportInput = correctFunctionBraces(supportInput, "tan");
//        supportInput = correctFunctionBraces(supportInput, "ctg");
//        supportInput = correctFunctionBraces(supportInput, "log");
//        supportInput = correctFunctionBraces(supportInput, "ln");
        //        supportInput = correctFunctionBraces(supportInput, "abs");
        supportInput = correctBraces(supportInput);
        supportInput = supportInput.replaceAll("+", "%+%");
        supportInput = supportInput.replaceAll("-", "%-%");
        supportInput = supportInput.replaceAll("*", "%*%");
        supportInput = supportInput.replaceAll("^", "%^%");
        supportInput = supportInput.replaceAll("/", "%/%");
        supportInput = supportInput.replaceAll("sinh", "%senh%");
        supportInput = supportInput.replaceAll("tanh", "%tenh%");
        supportInput = supportInput.replaceAll("cosh", "%csh%");
        supportInput = supportInput.replaceAll("sin", "%sin%");
        supportInput = supportInput.replaceAll("cos", "%cos%");
        supportInput = supportInput.replaceAll("tan", "%tan%");
        supportInput = supportInput.replaceAll("ctg", "%ctg%");
        supportInput = supportInput.replaceAll("log", "%log%");
        supportInput = supportInput.replaceAll("abs", "%abs%");
        supportInput = supportInput.replaceAll("sqrt", "%sqrt%");
        supportInput = supportInput.replaceAll("ln", "%ln%");
        supportInput = supportInput.replaceAll("(", "%(%");
        supportInput = supportInput.replaceAll(")", "%)%");
        supportInput = supportInput.replaceAll("senh", "%sinh%");
        supportInput = supportInput.replaceAll("csh", "%cosh%");
        supportInput = supportInput.replaceAll("tenh", "%tanh%");
        supportInput=String(supportInput);
       
        var tokens=supportInput.split("%");
        var numTokens=tokens.length;
        for (var i = 0; i < numTokens; i++) {
            tokens[i]=tokens[i].replaceAll(" ","");
            tokens[i]=tokens[i].replaceAll("_","-");
        }
        tokens = tokens.filter(function (n) { return n });
        var outputQueue=new Array();
        var stack=new Array();
 
        var j=0;
        if (tokens.length == 0) {
            throw "Empty equation";
        }
        while (j < tokens.length) {
            if(isNumeric(tokens[j],variable)){
                outputQueue.push(tokens[j]);
            }
            if (isFunction(tokens[j])) {
                stack.push(tokens[j]);
            }
            if (isOperator(tokens[j])) {
                while(stack.length>0&&((isOperator(stack[stack.length-1]))&&(opAssociativity(tokens[j])==1 & opPrecedence(tokens[j])==opPrecedence(stack[stack.length-1])||opPrecedence(tokens[j])>opPrecedence(stack[stack.length-1])))){
                    outputQueue.push(stack.pop());
                }stack.push(tokens[j]);
            }
            if(tokens[j]=="("){
                stack.push(tokens[j]);
            }
            if (tokens[j] == ")") {
                while (stack.length > 0 && (stack[stack.length - 1] != "(")) {
                    outputQueue.push(stack.pop());
                }
                if (stack.length == 0) {
                    throw "mismatched parentheses";
                    return;
                }
                stack.pop();
                if (isFunction(stack[stack.length - 1])) {
 
                    //outputQueue.push(stack[stack.length - 1]);
                    outputQueue.push(stack.pop());
                }
               
            }
            if(tokens.length==0||tokens[j]!=")"&&tokens[j]!="("&&!isOperator(tokens[j])&&!isNumeric(tokens[j],variable)&&!isFunction(tokens[j])) { throw "unrecognized token"; }
            j++;
        }
        while(stack.length>0){
            if(stack[stack.length-1]==")"|stack[stack.length-1]=="("){
                throw "mismatched parentheses";
                return;
            }
            else{
                outputQueue.push(stack.pop());
            }
        }
        var bool = validate(outputQueue);
        if (!bool) { throw "Syntax Error"; }
        return outputQueue;
    }
    function validate(inputRPN) {
        var stack = new Array();
 
        for (var j = 0; j < inputRPN.length; j++) {
            if (isNumeric(inputRPN[j], variable) == true) {
                stack.push(inputRPN[j]);
            }
            else {
                var k = inputRPN[j];
                if (k == "+" || k == "-" || k == "*" || k== "/" || k == "^") {
                    if (stack.length < 2) {
                       
                        return false;
                    }
                    stack.pop();
                }
                else if (isFunction(k)) {
                    if (stack.length < 1) {
                        return false;
                    }
                }
            }
        }
        if (stack.length > 1 || stack.length < 0) { return false; }
        return true;
 
    }
    this.compute = function (varValue) {
        try {
            var i = 0;
            var input = new Array();
            for (var j = 0; j < R.length; j++) {
                if (variable != null && variable.length > 0) {
                    input.push(R[j].replace(variable, varValue).replaceAll("--", ""));
                }
                else {
                    input.push(R[j]);
                }
            }
 
            var stack = new Array();
 
            for (var j = 0; j < input.length; j++) {
                if (!isOperator(input[i]) && !isFunction(input[i])) {
                    stack.push(parseFloat(input[i]));
                }
                else {
                    switch (input[i]) {
                        case "+":
                            stack.push((stack.pop() + stack.pop()));
                            break;
                        case "-":
                            stack.push(-(stack.pop() - stack.pop()));
                            break;
                        case "*":
                            var n = stack.pop();
                            stack.push(stack.pop() * n);
                            break;
                        case "/":
                            var n1 = stack.pop();
                            stack.push(stack.pop() / n1);
                            break;
                        case "sin":
                            stack.push(Math.sin(stack.pop()));
                            break;
                        case "sinh":
                            var x = stack.pop();
                            stack.push((Math.pow(Math.E,x)-Math.pow(Math.E,-x))/2);
                            break;
                        case "cosh":
                            var x = stack.pop();
                            stack.push((Math.pow(Math.E, x) + Math.pow(Math.E, -x)) / 2);
                            break;
                        case "cos":
                            stack.push(Math.cos(stack.pop()));
                            break;
                        case "tan":
                            stack.push(Math.tan(stack.pop()));
                            break;
                        case "sqrt":
                            stack.push(Math.pow(stack.pop(),0.5));
                            break;
                        case "tanh":
                            var x = stack.pop();
                            stack.push((Math.pow(Math.E, x) - Math.pow(Math.E, -x)) / (Math.pow(Math.E, x) + Math.pow(Math.E, -x)));
                            break;
                        case "ctg":
                            stack.push(1 / Math.tan(stack.pop()));
                            break;
                        case "log":
                            stack.push(Math.log(stack.pop()) / Math.LN10);
                            break;
                        case "ln":
                            stack.push(Math.log(stack.pop()));
                            break;
                        case "abs":
                            stack.push(Math.abs(stack.pop()));
                            break;
                        case "sgn":
                            var x = stack.pop();
                            if (x > 0) { stack.push(1); } else if (x == 0) { stack.push(0); } else { stack.push(-1); }
                            break;
                        case "^":
                            var n2 = stack.pop();
                            stack.push(Math.pow(stack.pop(), n2));
                            break;
                        default:
                            throw "error while parsing RPN string";
                    }
                }
                i++;
            }
            return stack.pop();
        }
        catch (exc) {
            return NaN;
        }
    }
};