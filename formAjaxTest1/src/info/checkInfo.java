package info;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
/**
 * Servlet implementation class checkInfo
 */
@WebServlet("/checkInfo")
public class checkInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public checkInfo() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("passwordInput");

		String usernameInput=request.getParameter("username");
		String passwordInput=request.getParameter("password");
		String emailInput=request.getParameter("email");
		String birthdayInput=request.getParameter("birthday");
	 
		Connection myConn=null;
		Statement mySta=null;
		ResultSet myRes=null;

		try{
			myConn=DriverManager.getConnection("jdbc:mysql://localhost:3306/demo","student","student");
			mySta=myConn.createStatement();
			myRes=mySta.executeQuery("select username from user");
			
			response.setContentType("text/blank;charset=UTF-8");
			PrintWriter out=response.getWriter();
			while(myRes.next()){
				if(myRes.getString("username")==usernameInput){
					out.print("User exist");
					System.out.println("User exist");
				}else{
					int rowsAffected = mySta.executeUpdate(
							"insert into user " +
							"(username, password, email, birthday) " + 
							"values " + 
							"(usernameInput, passwordInput, emailInput, , new Date(birhdayInput)");
					out.print("Your user account has been added to our account");
					System.out.println("Your account has been added to our account");
				}
				if (myRes != null) {
					myRes.close();
				}
				
				if (mySta != null) {
					mySta.close();
				}
				
				if (myConn != null) {
					myConn.close();
				}
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
	}

	}

