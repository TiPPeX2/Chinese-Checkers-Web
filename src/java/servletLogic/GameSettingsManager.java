package servletLogic;

import gameLogic.Model.Engine;


public class GameSettingsManager {
    
    private Engine.Settings gameSettings;

    
    public GameSettingsManager() {
        gameSettings = new Engine.Settings();
    }

    public Engine.Settings getGameSettings() {
        return gameSettings;
    }
    
    public void setGameSettings(Engine.Settings gameSettings) {
        this.gameSettings = gameSettings;
    }
}
