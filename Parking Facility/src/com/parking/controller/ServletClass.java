package com.parking.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.parking.pojo.Parking;
import com.practice.FetchData.Fetchdata;

@WebServlet("/parking")
public class ServletClass extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Parking Request");
		String place = req.getParameter("p");
		System.out.println(" PLACE -------------------->  "+place);

		ArrayList<Parking> allData = new ArrayList<Parking>();
		allData = Fetchdata.getAllData(place);
		Gson gson = new Gson();
		JsonElement element = gson.toJsonTree(allData, new TypeToken<List<Parking>>() {
		}.getType());
		JsonArray jsonArray = element.getAsJsonArray();
		resp.setContentType("application/json");
		resp.getWriter().print(jsonArray);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		super.doPost(req, resp);
	}

}
