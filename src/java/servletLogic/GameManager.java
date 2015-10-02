/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servletLogic;

import com.google.gson.Gson;
import gameLogic.Model.Engine;
import gameLogic.Model.EngineFactory;
import gameLogic.Model.FileManager;
import generated.ChineseCheckers;
import java.awt.Point;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.util.ArrayList;
import javafx.util.Pair;

/**
 *
 * @author shahar2
 */
public class GameManager {
    Engine gameEngine;
    boolean isGameOver;
    private int aiCounter;
    private boolean isLoaded = false;
    
    public GameManager(){
        Engine.Settings gameSettings = new Engine.Settings();
        gameSettings.setColorNumber(1);
        gameSettings.setHumanPlayers(2);
        gameSettings.setTotalPlayers(2);
        gameSettings.getPlayerNames().add("Tamir");
        gameSettings.getPlayerNames().add("Shahar");
        gameEngine = new Engine(gameSettings);
        isGameOver = false;
        aiCounter = 0;
    }

    public void setIsGameOver(boolean isGameOver) {
        this.isGameOver = isGameOver;
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
    }
    
    public TurnData getTurnData(boolean isMyTurn){
        return new TurnData(gameEngine.getCurrentPlayer(), gameEngine.getGameBoard(), isGameOver, isMyTurn);
    }

    public void doAiIteration(int humanNum) {
        Pair<Boolean,ArrayList<Point>> res;
        aiCounter++;
        if(aiCounter == humanNum && !isGameOver){
            aiCounter = 0;
            res = gameEngine.doAiIteration();
            isGameOver = res.getKey();
        }
    }

    public Engine.Settings loadGame(InputStream fileContent) throws Exception {
        ChineseCheckers cc =  FileManager.loadGame(fileContent);
        gameEngine = EngineFactory.createEngine(cc);
        isLoaded = true;
        Engine.Settings settings = gameEngine.getGameSettings();
        settings.setPlayerNames(new ArrayList<>());
        return settings;
    }
    
     public boolean IsLoaded() {
        return isLoaded;
    }

}
