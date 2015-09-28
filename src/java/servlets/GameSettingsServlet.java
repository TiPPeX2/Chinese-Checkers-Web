/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import gameLogic.Model.Engine;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servletLogic.GameManager;
import servletLogic.GameSettingsManager;
import servletLogic.MenuManager;
import utils.Constants;
import utils.ServletUtils;

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
        response.setContentType("text/html;charset=UTF-8");
        
        String colorNumStr = request.getParameter(Constants.COLOR_NUM_PARAMETER);
        String playersNumStr = request.getParameter(Constants.PLAYERS_NUM_PARAMETER);
        String humansNumStr = request.getParameter(Constants.HUMANS_NUM_PARAMETER);
        String playerName = request.getParameter(Constants.PLAYER_NAME_PARAMETER);
        
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
            response.sendRedirect("html/game.html");
        }else{
            menuManager.setInLoby(true);
            response.sendRedirect("html/loby.html");
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