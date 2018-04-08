package com.parking.Connection;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

public class JDBConnection {

	static Connection connection;

	public static Connection getConnection() {

		if (connection != null) {
			return connection;
		} else {
			String hostName = "localhost";
			String dbName = "smartparking";
			String username = "root";
			String password = "root";
			try {
				Class.forName("com.mysql.jdbc.Driver");
				String connectionURL = "jdbc:mysql://" + hostName + ":3306/" + dbName;
				connection = (Connection) DriverManager.getConnection(connectionURL, username, password);
			} catch (ClassNotFoundException e) {
				System.out.println("Class not found exception");
				e.printStackTrace();
			} catch (SQLException e) {
				System.out.println("SQL EXCEPTION");
				e.printStackTrace();
			}
			return connection;
		}

	}

	public static int addUser(String name, String username, String address, long phoneNumber, String password
			) throws SQLException {

		Statement stmt = null;
		stmt = (Statement) connection.createStatement();
		String query = "INSERT into user "
				+ "VALUES "+"(" + "\""+ name+"," + "\""+ username +","+ "\""+ address+"," + "\"" + phoneNumber+"," + "\""+ password +")" + "\"" ;
		int status = stmt.executeUpdate(query);
		return status;
	}
}
