/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servletLogic.GameManager;
import servletLogic.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

@WebServlet(name = "QuitServlet", urlPatterns = {"/quit"})
public class QuitServlet extends HttpServlet {

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
        
        
        GameManager gameManager = ServletUtils.getGameManager(getServletContext());
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        
        String usernameFromSession = SessionUtils.getUsername(request);
        boolean gameOver = gameManager.getGameEngine().userQuited(usernameFromSession);
        SessionUtils.clearSession(request);
        gameManager.setIsGameOver(gameOver);
        
        boolean isMyTurn = gameManager.getGameEngine().getCurrentPlayer().getName().equals(usernameFromSession);
        userManager.removeUser(usernameFromSession);
        
        if(userManager.getUsers().isEmpty())
            ServletUtils.reset(getServletContext());

        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(gameManager.getTurnData(isMyTurn));
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