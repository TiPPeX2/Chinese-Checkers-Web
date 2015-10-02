/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servletLogic;

import java.util.List;

public class Names {
    boolean isInside;
    List names;

    public boolean isIsInside() {
        return isInside;
    }

    public void setIsInside(boolean isInside) {
        this.isInside = isInside;
    }

    public List getNames() {
        return names;
    }

    public void setNames(List names) {
        this.names = names;
    }

    public Names(List names, boolean isInside) {
        this.names = names;
        this.isInside = isInside;
    }
}
