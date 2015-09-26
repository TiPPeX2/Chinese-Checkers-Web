/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import javax.servlet.ServletContext;
import servletLogic.GameManager;

/**
 *
 * @author shahar2
 */
public class ServletUtils {
    private static final String GAME_MANAGER_ATTRIBUTE_NAME = "gameManager";
    
     public static GameManager getGameManager(ServletContext servletContext) {
	if (servletContext.getAttribute(GAME_MANAGER_ATTRIBUTE_NAME) == null) {
	    servletContext.setAttribute(GAME_MANAGER_ATTRIBUTE_NAME, new GameManager());
	}
	return (GameManager) servletContext.getAttribute(GAME_MANAGER_ATTRIBUTE_NAME);
    }
}
