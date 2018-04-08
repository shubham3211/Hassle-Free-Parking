package com.practice.FetchData;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.mysql.jdbc.Connection;
import com.parking.Connection.JDBConnection;
import com.parking.pojo.Parking;

public class Fetchdata {

	static Connection connection;

	public static ArrayList<Parking> getAllData(String place) {
		connection = JDBConnection.getConnection();

		ArrayList<Parking> parkingData = new ArrayList<Parking>();
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery("SELECT * FROM parking WHERE location =" + "'" + place + "'");
			while (rs.next()) {
				Parking parking1 = new Parking();
				parking1.setTotalCapacity(rs.getInt("totalcapacity"));
				parking1.setPrice(rs.getString("price"));
				parking1.setVacant(rs.getInt("vacant"));
				parkingData.add(parking1);
				System.out.println(parking1.getTotalCapacity() + parking1.getPrice() + parking1.getVacant());
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return parkingData;

	}
}
