package main;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class JavaScriptCalc {

	public static void javaScriptCalc(String args) throws ScriptException {

		// create a script engine manager
		ScriptEngineManager factory = new ScriptEngineManager();
		// create a JavaScript engine
		ScriptEngine engine = factory.getEngineByName("JavaScript");

		Double d = (Double) engine.eval(args);
		System.out.println(d);

	}

}
