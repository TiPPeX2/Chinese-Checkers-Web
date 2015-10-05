package gameLogic.Model;

import java.awt.Point;
import java.io.File;
import java.util.*;

public class Board {

    public static final int COLS = 25;
    public static final int ROWS = 17;
    private static final char EMPTY = 'E';
    private static final char END = ' ';

    private final Cell[][] board;

    public Color getColorByPoint(Point point) {
        return board[point.x][point.y].color;
    }

    public void setColorByPoint(Point point, Color color) {
        board[point.x][point.y].color = color;
    }

    public Board() {
        board = createFullBoard();
    }

    private Cell[][] createFullBoard() {
        Cell[][] fullBoard = null;
        try {
            ArrayList<String> boardLines = getBoardLines();
            fullBoard = createBoardFromLines(boardLines);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return fullBoard;

    }

    private Cell[][] createBoardFromLines(ArrayList<String> boardLines) {
        Cell[][] fullBoard = new Cell[ROWS][];
        for (int i = 0; i < ROWS; i++) {
            fullBoard[i] = getCellsFromString(boardLines.get(i));
        }
        return fullBoard;
    }

    private Cell[] getCellsFromString(String line) {
        Cell[] cellLine = new Cell[COLS];
        int[] charValues = line.chars().toArray();
        for (int j = 0; j < charValues.length; j++) {
            cellLine[j] = new Cell(charValues[j]);
        }
        return cellLine;
    }

    void removeColors(ArrayList<Color> colorsToRemove) {
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                removeColorFromBoard(i, j, colorsToRemove);
            }
        }
    }

    private void removeColorFromBoard(int i, int j, ArrayList<Color> colorsToRemove) {
        Color color = getColorByPoint(new Point(i, j));
        if (colorsToRemove.contains(color)) {
            board[i][j].color = Color.EMPTY;
        }
    }

    void makeEmpty() {
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                if (board[i][j].color != Color.TRANSPARENT) {
                    board[i][j].color = Color.EMPTY;
                }
            }
        }
    }
    
    ArrayList<String> getBoardLines(){
        ArrayList<String> boardLines = new ArrayList<>();
        String board = getBoardString();
        String[] lines = board.split("\\r?\\n");
        for(String line : lines){
            boardLines.add(line);
        }
        return boardLines;
    }
    
    String getBoardString(){
        return             
"            G            "          + System.getProperty("line.separator")+
"           G G           "        + System.getProperty("line.separator")+         
"          G G G          "      +System.getProperty("line.separator")+       
"         G G G G         "      +System.getProperty("line.separator")+ 
"R R R R E E E E E W W W W"+System.getProperty("line.separator")+
" R R R E E E E E E W W W "+System.getProperty("line.separator")+
"  R R E E E E E E E W W  "+System.getProperty("line.separator")+
"   R E E E E E E E E W   "+System.getProperty("line.separator")+
"    E E E E E E E E E    "+System.getProperty("line.separator")+
"   B E E E E E E E E K   "+System.getProperty("line.separator")+
"  B B E E E E E E E K K  "+System.getProperty("line.separator")+
" B B B E E E E E E K K K "+System.getProperty("line.separator")+
"B B B B E E E E E K K K K"+System.getProperty("line.separator")+
"         Y Y Y Y         "+System.getProperty("line.separator")+
"          Y Y Y          "+System.getProperty("line.separator")+
"           Y Y           "+System.getProperty("line.separator")+
"            Y            "       ;
    }
    
    private static class Cell {

        private Color color;

        private Cell(int charValue) {
            this.color = getColorByChar(charValue);
        }

        private Color getColorByChar(int charValue) {
            Color myColor = null;
            switch (charValue) {
                case 'G':
                    myColor = Color.GREEN;
                    break;
                case 'R':
                    myColor = Color.RED;
                    break;
                case 'B':
                    myColor = Color.BLUE;
                    break;
                case 'Y':
                    myColor = Color.YELLOW;
                    break;
                case 'W':
                    myColor = Color.WHITE;
                    break;
                case 'K':
                    myColor = Color.BLACK;
                    break;
                case EMPTY:
                    myColor = Color.EMPTY;
                    break;
                case END:
                    myColor = Color.TRANSPARENT;
            }
            return myColor;
        }

    }
}
