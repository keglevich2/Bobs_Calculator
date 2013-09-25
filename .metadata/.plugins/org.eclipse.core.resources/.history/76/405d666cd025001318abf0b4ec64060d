package main;

import java.util.Stack;
import java.util.StringTokenizer;

public class ArithmeticExpression {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String[] strs = {"3 + 3 * 5 - 2 - 6 * 7", ""};
		
		for(String str : strs){
			System.out.println(str + " ==>");
			System.out.println("   " + infix2rpn(str));
		}

	}
	
	/**
	 * Convert an infix expression to reversed polish notation.
	 * Example: input: "3 + 3 * 5 - 2 - 6 * 7"
	 *          output: "3 3 5 * + 2 - 6 7 * -"
	 * @param infixExpr
	 * @return
	 */
	static String infix2rpn(String infixExpr){
		
		if(infixExpr == null){
			return null;
		}
		
		StringTokenizer st = new StringTokenizer(infixExpr);
		StringBuilder sb = new StringBuilder();
		Stack<String> optStk = new Stack<String>();

		while(st.hasMoreTokens()){
			String tok = st.nextToken();
			
			assert(!tok.isEmpty());
			
			if(Character.isDigit(tok.charAt(0))){
				// operand
				sb.append(tok).append(" ");
			} else {
				// operator
				int pri = getPriority(tok);
				while(!optStk.isEmpty() && getPriority(optStk.peek()) >= pri){
					sb.append(optStk.pop()).append(" ");
				}
				
				optStk.push(tok);
			}
		}
		
		while(!optStk.isEmpty()){
			sb.append(optStk.pop()).append(" ");
		}
		
		if(sb.length() > 0){
			sb.setLength(sb.length() - 1);
		}
		
		return sb.toString();
	}
	
	static boolean isOperator(String str){
		return str.equals("+") || str.equals("-") || str.equals("*") || str.equals("/");
	}
	
	static int getPriority(String op){
		
		if(op.equals("+") || op.equals("-")){
			return 1;
		}
		
		if(op.equals("*") || op.equals("/")){
			return 3;
		}
		
		return -1;
	}

	/**
	 * Compute value of RPN:
	 * {"4", "1", "+", "2", "*"} -> ((4 + 1) * 2) -> 10
	 * {"5", "8", "4", "/", "+"} -> (5 + (8 / 4)) -> 7
	 */

}