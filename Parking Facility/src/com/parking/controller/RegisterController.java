package com.parking.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.parking.Connection.JDBConnection;

@WebServlet("/registeruser")
public class RegisterController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String name = request.getParameter("name");
		String username = request.getParameter("username");
		String address = request.getParameter("address");
		long phoneNumber = Long.parseLong(request.getParameter("number"));
		String password = request.getParameter("pass");
		String confirmPass = request.getParameter("confirmpass");

		if (password != confirmPass) {

			response.sendRedirect("register.html");
		}

		if (name.equals(" ") || username.equals(" ") || address.equals(" ") || password.equals(" ")
				|| confirmPass.equals(" ")) {

			response.sendRedirect("register.html");
		}

		try {
			int resultInsert = JDBConnection.addUser(name, username, address, phoneNumber, password);
			System.out.println(resultInsert);
			RequestDispatcher dispatcher = request.getRequestDispatcher("geolocation.html");
			dispatcher.forward(request, response);
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

}
