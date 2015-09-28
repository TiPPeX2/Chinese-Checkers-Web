package servletLogic;

import gameLogic.Model.Engine;


public class GameSettingsManager {
    
    private final Engine.Settings gameSettings;
    
    public GameSettingsManager() {
        gameSettings = new Engine.Settings();
        
    }

    public Engine.Settings getGameSettings() {
        return gameSettings;
    }
}
