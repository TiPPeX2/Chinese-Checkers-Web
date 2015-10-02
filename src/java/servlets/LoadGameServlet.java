/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import gameLogic.Model.Player;
import static generated.PlayerType.HUMAN;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import servletLogic.GameManager;
import servletLogic.GameSettingsManager;
import servletLogic.MenuManager;
import servletLogic.UserManager;
import utils.Constants;
import utils.ServletUtils;

@WebServlet(name = "GameManager", urlPatterns = {"/loadGame"})
@MultipartConfig
public class LoadGameServlet extends HttpServlet {

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
            throws ServletException, IOException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        String usernameFromParameter = null;
        Part filePart = request.getPart("loadFile");
        InputStream fileContent = filePart.getInputStream();
        GameManager gameManager = ServletUtils.getGameManager(getServletContext());
        GameSettingsManager gameSettingsManager = ServletUtils.getGameSettingsManager(getServletContext());
        MenuManager menuManager = ServletUtils.getMenuManager(getServletContext());
        try{
            gameSettingsManager.setGameSettings(gameManager.loadGame(fileContent));
            if(gameSettingsManager.getGameSettings().getHumanPlayers() == 1){
                UserManager userManager = ServletUtils.getUserManager(getServletContext());
                for(Player player : gameManager.getGameEngine().getPlayers()){
                    if(player.getType() == Player.Type.PLAYER)
                        usernameFromParameter = player.getName();
                }
                userManager.addUser(usernameFromParameter);
                request.getSession(true).setAttribute(Constants.PLAYER_NAME_PARAMETER, usernameFromParameter);
                menuManager.setStarted(true);
                response.sendRedirect("html/game.html");
            }
            menuManager.setInLoby(true);
            response.sendRedirect("html/loadLobby.html");
        }
        catch(Exception e){
            response.sendError(2);
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(LoadGameServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(LoadGameServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
