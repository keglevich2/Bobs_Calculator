package main;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.gadberry.utility.expression.Resolver;

public class SimpleResolver implements Resolver {

	private SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

	public boolean canResolve(String path) {
		return resolve(path) != null;
	}

	public Object resolve(String path) {
		try {
			return sdf.parse(path);
		} catch (ParseException e) {
		}
		return null;
	}
}