import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Stack;

public class MyParser {

	private static Map<Character, Integer> operators = new HashMap<Character, Integer>();

	private static void operators() {
		operators.put('+', 0);
		operators.put('-', 0);
		operators.put('*', 5);
		operators.put('/', 5);
		operators.put('^', 10);
		operators.put('(', 10);
		operators.put(')', 10);
	}

	private static String spaceAdder(String expression) {
		String result = "";
		for (int i = 0; i < expression.length(); i++) {
			char c = expression.charAt(i);
			if (operators.containsKey(c)) {
				result += " " + c + " ";
			} else {
				result += c;
			}
			System.out.println(result);
		}
		return result;
	}

	// Associativity constants for operators
	private static final int LEFT_ASSOC = 0;
	private static final int RIGHT_ASSOC = 1;

	// Operators
	private static final Map<String, int[]> OPERATORS = new HashMap<String, int[]>();
	static {
		// Map<"token", []{precendence, associativity}>
		OPERATORS.put("+", new int[] { 2, LEFT_ASSOC });
		OPERATORS.put("-", new int[] { 2, LEFT_ASSOC });
		OPERATORS.put("*", new int[] { 3, LEFT_ASSOC });
		OPERATORS.put("/", new int[] { 3, LEFT_ASSOC });
		OPERATORS.put("^", new int[] { 4, RIGHT_ASSOC });
		OPERATORS.put("(", new int[] { 9, LEFT_ASSOC });
		OPERATORS.put(")", new int[] { 0, LEFT_ASSOC });
	}

	// Test if token is an operator
	private static boolean isOperator(String token) {
		return OPERATORS.containsKey(token);
	}

	// Test associativity of operator token
	private static boolean isAssociative(String token, int type) {
		if (!isOperator(token)) {
			throw new IllegalArgumentException("Invalid token: " + token);
		}

		if (OPERATORS.get(token)[1] == type) {
			return true;
		}
		return false;
	}

	// Compare precedence of operators.
	private static final int cmpPrecedence(String token1, String token2) {
		if (!isOperator(token1) || !isOperator(token2)) {
			throw new IllegalArgumentException("Invalid tokens: " + token1 + " " + token2);
		}
		return OPERATORS.get(token1)[0] - OPERATORS.get(token2)[0];
	}

	// Convert infix expression format into reverse Polish notation
	public static String infixToRPN(String[] inputTokens) {
		ArrayList<String> out = new ArrayList<String>();
		Stack<String> stack = new Stack<String>();

		// For each token
		for (String token : inputTokens) {
			// If token is an operator
			if (isOperator(token)) {
				// While stack not empty AND stack top element
				// is an operator
				while (!stack.empty() && isOperator(stack.peek())) {
					if ((isAssociative(token, LEFT_ASSOC) && cmpPrecedence(token, stack.peek()) <= 0)
							|| (isAssociative(token, RIGHT_ASSOC) && cmpPrecedence(token, stack.peek()) < 0)) {
						out.add(stack.pop());
						continue;
					}
					break;
				}
				// Push the new operator on the stack
				stack.push(token);
			}
			// If token is a left bracket '('
			else if (token.equals("(")) {
				stack.push(token); //
			}
			// If token is a right bracket ')'
			else if (token.equals(")")) {
				while (!stack.empty() && !stack.peek().equals("(")) {
					out.add(stack.pop());
				}
				stack.pop();
			}
			// If token is a number
			else {
				out.add(token);
			}
		}
		while (!stack.empty()) {
			out.add(stack.pop());
		}
		String rpnExpression = "";
		for (String token : out) {
			System.out.print(token);
			rpnExpression += token + " ";
		}
		return rpnExpression;
	}

	private static String cleanExpr(String expr) {
		// remove all non-operators, non-whitespace, and non digit chars
		return expr.replaceAll("[^\\^\\*\\+\\-\\d/\\s]", "");
	}

	public static String fromRPNToResult(String expr) {
		String cleanExpr = cleanExpr(expr);
		LinkedList<Double> stack = new LinkedList<Double>();
		System.out.println("Input\tOperation\tStack after");
		for (String token : cleanExpr.split("\\s")) {
			System.out.print(token + "\t");
			Double tokenNum = null;
			try {
				tokenNum = Double.parseDouble(token);
			} catch (NumberFormatException e) {
				// e.printStackTrace();
			}
			if (tokenNum != null) {
				System.out.print("Push\t\t");
				stack.push(Double.parseDouble(token + ""));
			} else if (token.equals("*")) {
				System.out.print("Operate\t\t");
				double secondOperand = stack.pop();
				double firstOperand = stack.pop();
				stack.push(firstOperand * secondOperand);
			} else if (token.equals("/")) {
				System.out.print("Operate\t\t");
				double secondOperand = stack.pop();
				double firstOperand = stack.pop();
				stack.push(firstOperand / secondOperand);
			} else if (token.equals("-")) {
				System.out.print("Operate\t\t");
				double secondOperand = stack.pop();
				double firstOperand = stack.pop();
				stack.push(firstOperand - secondOperand);
			} else if (token.equals("+")) {
				System.out.print("Operate\t\t");
				double secondOperand = stack.pop();
				double firstOperand = stack.pop();
				stack.push(firstOperand + secondOperand);
			} else if (token.equals("^")) {
				System.out.print("Operate\t\t");
				double secondOperand = stack.pop();
				double firstOperand = stack.pop();
				stack.push(Math.pow(firstOperand, secondOperand));
			} else {// just in case
				return "Error";
			}
			System.out.println(stack);
		}
		return "Final answer: " + stack.pop();
	}

	public static void main(String[] args) {
		operators();
		String expression = spaceAdder("2+3*2^3+(3+1)");
		System.out.println("Result space adder:" + expression);
		
		String[] input = expression.split(" ");
		String[] rpnExpression = ReversePolishNotation.infixToRPN(input);
		String rpnExpressionStr = "";
		for (String token : rpnExpression) {
			System.out.print(token + " ");
			rpnExpressionStr += token + " ";
		}
		System.out.println(fromRPNToResult(rpnExpressionStr));
	}
}
