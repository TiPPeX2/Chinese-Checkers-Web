/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servletLogic;

import gameLogic.Model.Engine;

/**
 *
 * @author shahar2
 */
public class GameManager {
    Engine gameEngine;
    
    public GameManager(){
        Engine.Settings gameSettings = new Engine.Settings();
        gameSettings.setColorNumber(1);
        gameSettings.setHumanPlayers(1);
        gameSettings.setTotalPlayers(2);
        gameSettings.getPlayerNames().add("Tamir");
        gameEngine = new Engine(gameSettings);
    }

    public Engine getGameEngine() {
        return gameEngine;
    }

    public void setGameEngine(Engine gameEngine) {
        this.gameEngine = gameEngine;
    }

    public void doIteration(String move) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
