package servletLogic;


public class GameManager {
    private boolean started;
    private boolean inGameSetting;

    public GameManager() {
        inGameSetting = false;
        started = false;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean isStarted) {
        this.started = isStarted;
    }

    public boolean isInGameSetting() {
        return inGameSetting;
    }

    public void setInGameSetting(boolean isInGameSetting) {
        this.inGameSetting = isInGameSetting;
    }

}