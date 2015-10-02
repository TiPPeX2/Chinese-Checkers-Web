/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import gameLogic.Model.Engine;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servletLogic.GameManager;
import servletLogic.GameSettingsManager;
import servletLogic.MenuManager;
import servletLogic.UserManager;
import utils.Constants;
import utils.ServletUtils;
import utils.SessionUtils;

/**
 *
 * @author shahar2
 */
@WebServlet(name = "GameSettingsServlet", urlPatterns = {"/gameSettings"})
public class GameSettingsServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        GameSettingsManager gameSettingsManager = ServletUtils.getGameSettingsManager(getServletContext());
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(gameSettingsManager.getGameSettings());
            out.print(jsonResponse);
            out.flush();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
               
        String colorNumStr = request.getParameter(Constants.COLOR_NUM_PARAMETER);
        String playersNumStr = request.getParameter(Constants.PLAYERS_NUM_PARAMETER);
        String humansNumStr = request.getParameter(Constants.HUMANS_NUM_PARAMETER);
        String playerName = request.getParameter(Constants.PLAYER_NAME_PARAMETER);
        
        String usernameFromSession = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        if (usernameFromSession == null) {
            //user is not logged in yet
            String usernameFromParameter = request.getParameter(Constants.PLAYER_NAME_PARAMETER);
            if (usernameFromParameter == null) {
                //no username in session and no username in parameter -
                //redirect back to the index page
                //this return an HTTP code back to the browser telling it to load
                //the given URL (in this case: "index.jsp")
                response.sendRedirect("index.html");
            } else {
                //normalize the username value
                usernameFromParameter = usernameFromParameter.trim();
                if (userManager.isUserExists(usernameFromParameter)) {
                    String errorMessage = "Username " + usernameFromParameter + " already exists. Please enter a different username.";
                    //username already exists, forward the request back to index.jsp
                    //with a parameter that indicates that an error should be displayed
                    request.setAttribute(Constants.USER_NAME_ERROR, errorMessage);
                } else {
                    //add the new user to the users list
                    userManager.addUser(usernameFromParameter);
                    //set the username in a session so it will be available on each request
                    //the true parameter means that is a session object does not exists yet
                    //create a new one
                    request.getSession(true).setAttribute(Constants.PLAYER_NAME_PARAMETER, usernameFromParameter);

                    //redirect the request to the chat room - in order to actually change the URL
                }
            }
        } else {
            //user is already logged in
            response.sendRedirect("index.html");
        }
        
        
        int colorNum = Integer.parseInt(colorNumStr);
        int playerNum = Integer.parseInt(playersNumStr);
        int humansNum = Integer.parseInt(humansNumStr);
        
        //Create Game settings logic goes here.
        GameSettingsManager gameSettingsManager = ServletUtils.getGameSettingsManager(getServletContext());
        gameSettingsManager.getGameSettings().setColorNumber(colorNum);
        gameSettingsManager.getGameSettings().setHumanPlayers(humansNum);
        gameSettingsManager.getGameSettings().setTotalPlayers(playerNum);
        gameSettingsManager.getGameSettings().getPlayerNames().add(playerName);
        
        MenuManager menuManager = ServletUtils.getMenuManager(getServletContext());
        if(humansNum == 1){        

            GameManager gameManager = ServletUtils.getGameManager(getServletContext());
            gameManager.setGameEngine(new Engine(gameSettingsManager.getGameSettings()));
            menuManager.setStarted(true);
            //response.sendRedirect("html/game.html");
        }else{
            menuManager.setInLoby(true);
            //response.sendRedirect("html/lobby.html");
        }
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
