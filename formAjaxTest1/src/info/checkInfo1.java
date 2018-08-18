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
import java.text.SimpleDateFormat;
/**
 * Servlet implementation class checkInfo1
 */
@WebServlet("/checkInfo1")
public class checkInfo1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public checkInfo1() {
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

		String usernameInput=request.getParameter("username");
		String passwordInput=request.getParameter("password");
		String emailInput=request.getParameter("email");
		String birthdayInput=request.getParameter("birthday");
	 
		Connection myConn=null;
		Statement mySta1=null;
		ResultSet myRes=null;

		try{
			System.out.println("passwordInput");
			boolean exist=false;
			Class.forName("com.mysql.cj.jdbc.Driver"); 
			myConn=DriverManager.getConnection("jdbc:mysql://localhost:3306/demo?useSSL=false&allowPublicKeyRetrieval=true","student","student");
			mySta1=myConn.createStatement();
			myRes=mySta1.executeQuery("select username from user");
			
			response.setContentType("text/blank;charset=UTF-8");
			PrintWriter out=response.getWriter();
			while(myRes.next()){
				if(myRes.getString("username").equals(usernameInput)){
					out.print("User exist");
					exist=true;
				}
			}
			if(!exist){
				System.out.println("test!!!!");
				 Date utilDate= (Date) new SimpleDateFormat("MM-dd-yyyy").parse(birthdayInput);
				 java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime()); 
				 PreparedStatement mySta2;
				  mySta2=myConn.prepareStatement(
						"insert into user " +
						"(username, password, email,birthday) " + 
						"values " + 
						"(?,?,?,?)");
				  mySta2.setString(1, usernameInput);
				  mySta2.setString(2, passwordInput);
				  mySta2.setString(3, emailInput);
				  mySta2.setDate(4, sqlDate);
				  mySta2.executeUpdate();
				out.print("Your user account has been added to our account");
				System.out.println("Your account has been added to our account");
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
	}

	}

