/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import gameLogic.Model.Engine;
import gameLogic.Model.Player;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servletLogic.GameManager;
import servletLogic.GameSettingsManager;
import servletLogic.MenuManager;
import servletLogic.Names;
import servletLogic.UserManager;
import utils.Constants;
import utils.ServletUtils;
import utils.SessionUtils;

/**
 *
 * @author shahar2
 */
@WebServlet(name = "NameListServlet", urlPatterns = {"/nameList"})
public class NameListServlet extends HttpServlet {

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
        GameManager gameManager = ServletUtils.getGameManager(getServletContext());
        
        List<String> nameList = new ArrayList<>();
        List<String> joined = gameSettingsManager.getGameSettings().getPlayerNames();
        String usernameFromSession = SessionUtils.getUsername(request);
        Names names;
        
        if(gameManager.IsLoaded()){
            Engine gameEngine = gameManager.getGameEngine();
            for(Player player : gameEngine.getPlayers()){
                if(player.getType() == Player.Type.PLAYER && !joined.contains(player.getName()))
                    nameList.add(player.getName());
            }
            boolean isInside = (!nameList.contains(usernameFromSession)) && (usernameFromSession != null);
            names = new Names(nameList, isInside);
        }else{
            nameList  = gameSettingsManager.getGameSettings().getPlayerNames();
            names = new Names(nameList, nameList.contains(usernameFromSession));
        }
        
        
         try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(names);
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
        
        String usernameFromSession = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String usernameFromParameter = request.getParameter(Constants.PLAYER_NAME_PARAMETER);
        if (usernameFromParameter == null) {
            response.sendRedirect("index.html");
        } 
        else {
            usernameFromParameter = usernameFromParameter.trim();
            if (userManager.isUserExists(usernameFromParameter)) {
                String errorMessage = "Username " + usernameFromParameter + " already exists. Please enter a different username.";
                request.setAttribute(Constants.USER_NAME_ERROR, errorMessage);
            } 
            else {
                GameSettingsManager gameSettingsManager = ServletUtils.getGameSettingsManager(getServletContext());
                Engine.Settings gameSettings = gameSettingsManager.getGameSettings();
                gameSettings.getPlayerNames().add(usernameFromParameter);
                if(gameSettings.getPlayerNames().size() == gameSettings.getHumanPlayers()){
                    MenuManager menuManager = ServletUtils.getMenuManager(getServletContext());
                    menuManager.setStarted(true);

                    GameManager gameManager = ServletUtils.getGameManager(getServletContext());
                    gameManager.setGameEngine(new Engine(gameSettings));
                }
                userManager.addUser(usernameFromParameter);
                request.getSession(true).setAttribute(Constants.PLAYER_NAME_PARAMETER, usernameFromParameter);
            }
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
