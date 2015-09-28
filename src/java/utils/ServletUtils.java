/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import javax.servlet.ServletContext;
import servletLogic.GameManager;
import servletLogic.GameSettingsManager;
import servletLogic.MenuManager;

public class ServletUtils {
    private static final String MENU_MANAGER_ATTRIBUTE_NAME = "menuManager";
    private static final String GAME_SETTINGS_MANAGER_ATTRIBUTE_NAME = "gameSetingsManager";
    private static final String GAME_MANAGER_ATTRIBUTE_NAME = "gameManager";
    
     public static MenuManager getMenuManager(ServletContext servletContext) {
	if (servletContext.getAttribute(MENU_MANAGER_ATTRIBUTE_NAME) == null) {
	    servletContext.setAttribute(MENU_MANAGER_ATTRIBUTE_NAME, new MenuManager());
	}
	return (MenuManager) servletContext.getAttribute(MENU_MANAGER_ATTRIBUTE_NAME);
    }
    
    public static GameSettingsManager getGameSettingsManager(ServletContext servletContext) {
	if (servletContext.getAttribute(GAME_SETTINGS_MANAGER_ATTRIBUTE_NAME) == null) {
	    servletContext.setAttribute(GAME_SETTINGS_MANAGER_ATTRIBUTE_NAME, new GameSettingsManager());
	}
	return (GameSettingsManager) servletContext.getAttribute(GAME_SETTINGS_MANAGER_ATTRIBUTE_NAME);
    }
    
    public static GameManager getGameManager(ServletContext servletContext) {
	if (servletContext.getAttribute(GAME_MANAGER_ATTRIBUTE_NAME) == null) {
	    servletContext.setAttribute(GAME_MANAGER_ATTRIBUTE_NAME, new GameManager());
	}
	return (GameManager) servletContext.getAttribute(GAME_MANAGER_ATTRIBUTE_NAME);
    }
}
