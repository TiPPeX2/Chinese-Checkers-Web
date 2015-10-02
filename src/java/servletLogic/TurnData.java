/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servletLogic;

import gameLogic.Model.Board;
import gameLogic.Model.Player;

/**
 *
 * @author shahar2
 */
public class TurnData {
    Player currentPlayer;
    Board gameBoard;
    boolean isGameOver;
    boolean isMyTurn;

    public TurnData(Player currentPlayer, Board gameBoard, boolean isGameOver, boolean isMyTurn){
        this.currentPlayer = currentPlayer;
        this.gameBoard = gameBoard;
        this.isGameOver = isGameOver;
        this.isMyTurn = isMyTurn;
    }
}
