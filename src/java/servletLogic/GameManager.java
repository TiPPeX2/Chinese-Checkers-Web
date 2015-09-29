/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servletLogic;

import com.google.gson.Gson;
import servletLogic.Move;
import gameLogic.Model.Engine;
import utils.ServletUtils;

/**
 *
 * @author shahar2
 */
public class GameManager {
    Engine gameEngine;
    boolean isGameOver;
    
    public GameManager(){
        Engine.Settings gameSettings = new Engine.Settings();
        gameSettings.setColorNumber(1);
        gameSettings.setHumanPlayers(2);
        gameSettings.setTotalPlayers(2);
        gameSettings.getPlayerNames().add("Tamir");
        gameSettings.getPlayerNames().add("Shahar");
        gameEngine = new Engine(gameSettings);
        isGameOver = false;
    }

    public Engine getGameEngine() {
        return gameEngine;
    }

    public void setGameEngine(Engine gameEngine) {
        this.gameEngine = gameEngine;
    }

    public void doIteration(String moveStr) {
        Gson gson = new Gson();
        Move move = gson.fromJson(moveStr, Move.class);
        isGameOver = gameEngine.doIteration(move.start, move.end);
        //TODO AI movment??
    }
    
    public TurnData getTurnData(){
        return new TurnData(gameEngine.getCurrentPlayer(), gameEngine.getGameBoard(), isGameOver);
    }

}
