package servletLogic;


public class MenuManager {
    private boolean started;
    private boolean inLoby;
    private boolean inGameSetting;
    private boolean loaded;

    public MenuManager() {
        inLoby = false;
        started = false;
        inGameSetting = false;
        loaded = false;
    }

    public boolean isInLoby() {
        return inLoby;
    }

    public boolean isLoaded() {
        return loaded;
    }

    public void setLoaded(boolean loaded) {
        this.loaded = loaded;
    }

    public void setInLoby(boolean inLoby) {
        this.inLoby = inLoby;
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
        this.inGameSetting = isInGameSetting;
    }

}