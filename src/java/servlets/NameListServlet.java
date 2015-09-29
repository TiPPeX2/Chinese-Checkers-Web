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
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servletLogic.GameManager;
import servletLogic.GameSettingsManager;
import servletLogic.MenuManager;
import utils.ServletUtils;

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
        List names = gameSettingsManager.getGameSettings().getPlayerNames();
        
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
        
        String name = request.getParameter("playerName");
        GameSettingsManager gameSettingsManager = ServletUtils.getGameSettingsManager(getServletContext());
        Engine.Settings gameSettings = gameSettingsManager.getGameSettings();
        gameSettings.getPlayerNames().add(name);
        
        if(gameSettings.getPlayerNames().size() == gameSettings.getHumanPlayers()){
            MenuManager menuManager = ServletUtils.getMenuManager(getServletContext());
            menuManager.setStarted(true);
            
            GameManager gameManager = ServletUtils.getGameManager(getServletContext());
            gameManager.setGameEngine(new Engine(gameSettings));
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
