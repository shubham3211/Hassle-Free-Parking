package com.parking.controller;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JOptionPane;

import com.mysql.jdbc.Connection;
import com.parking.Connection.JDBConnection;

@WebServlet("/loginController")
public class LoginController extends HttpServlet {

	Connection connection;
	ResultSet rs;
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String un = request.getParameter("uname");
		String pw = request.getParameter("pass");
		System.out.println("Into Login Controller");

		connection = JDBConnection.getConnection();
		Statement statement;
		try {
			statement = connection.createStatement();
			String query = "SELECT * FROM user WHERE username = " + "\"" + un + "\""+ " and password = " + "\"" + pw + "\"";

			rs = statement.executeQuery(query);
			//if (rs != null && rs.isFirst() && rs.isLast()) {
			if (rs!=null && rs.next()) {				
				response.sendRedirect("geolocation.html");
				return;
			} else {
//				JOptionPane.showMessageDialog(null, "Wrong Username or Password");
				response.sendRedirect("login.html");
				return;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
