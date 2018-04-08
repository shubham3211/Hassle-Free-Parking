//package com.parking.controller;
//
//import java.io.IOException;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.ArrayList;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import com.google.gson.Gson;
//import com.mysql.jdbc.Connection;
//import com.mysql.jdbc.Statement;
//
///**
// * Servlet implementation class ParkingController
// */
//@WebServlet("/parking")
//public class ParkingController extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//
//	private String hostName = "10.133.35.216";
//	private String dbName = "smartparking";
//	private String username = "root";
//	private String password = "root";
//
//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
//	 *      response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response)
//			throws ServletException, IOException {
//		System.out.println("Parking Request");
//		String place = request.getParameter("p");
//		System.out.println(place);
//
//		try {
//			Class.forName("com.mysql.jdbc.Driver");
//			String connectionURL = "jdbc:mysql://" + hostName + ":3306/" + dbName;
//			Connection conn = (Connection) DriverManager.getConnection(connectionURL, username, password);
//
//			Statement stmt = null;
//			String query = "SELECT totalcapacity from parking where location=" + place;
//			
//			stmt = (Statement) conn.createStatement();
//			ResultSet rs = stmt.executeQuery(query);
////			 System.out.println(rs);
//			ArrayList<String> locationList = new ArrayList<String>();
//			while (rs.next()) {
//				int totalCapacity = rs.getInt("totalcapacity");
//				// int vacant = rs.getInt("vacant");
//				// String price = rs.getString("price");
//				// String location = rs.getString("location");
//				String s = String.valueOf(totalCapacity);
//				// String loc = totalCapacity + ", " + vacant + "," + price;
//				System.out.println(s);
//				locationList.add(s);
//
//			}
//
//			String json = new Gson().toJson(locationList);
//			response.setContentType("application/json");
//			response.setCharacterEncoding("UTF-8");
//			// System.out.println(json);
//			response.getWriter().write(json);
//
//		} catch (ClassNotFoundException e) {
//			System.out.println("JDBC CLASS NOT FOUND");
//			e.printStackTrace();
//		} catch (SQLException e) {
//			System.out.println("EROR CONNECTON TO DATABASE");
//			e.printStackTrace();
//		}
//
//	}
//
//}
