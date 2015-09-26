package servletLogic;


public class GameManager {
    private boolean started;
    private boolean inLoby;
    private boolean inGameSetting;

    public boolean isInLoby() {
        return inLoby;
    }

    public void setInLoby(boolean inLoby) {
        this.inLoby = inLoby;
    }

    public GameManager() {
        inLoby = false;
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
        return inLoby;
    }

    public void setInGameSetting(boolean isInGameSetting) {
        this.inLoby = isInGameSetting;
    }

}