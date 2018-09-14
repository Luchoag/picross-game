/*
This is the JavaScript code for the game. It might be a little bit messy and it probably would have been
shorter if I used JQuery, but I wanted to do it just with JavaScript this time.
First, the global variables are declared. Not all of them work as intended as some of them are called before
being loaded in the page. I'm trying to figure out which ones I can delete without breaking the game.
After the variables, we have all the functions that make the game work.
Last part of the code is the timer. Credits for that goes to StackOverflow user Mate, as it's stated below.
*/

var correctTiles = new Array(13, 14, 15, 18, 19, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 68, 69, 70, 71, 72, 73, 74, 75, 79, 80, 81, 82, 83, 84, 85, 86, 91, 92, 93, 94, 95, 96, 103, 104, 105, 106, 115, 116);
var incorrectTiles = new Array(12, 16, 17, 21, 67, 76, 78, 87, 89, 90, 97, 98, 100, 101, 102, 107, 108, 109, 111, 112, 113, 114, 117, 118, 119, 120);
var correctTilesL2 = new Array(13,14,15,16,17,18,19,20,24,31,35,37,38,39,40,41,42,46,48,49,50,51,52,53,57,64,68,69,70,71,72,73,75,79,81,82,83,84,86,90,97,101,102,103,104,105,106,107,108,114,115,116,117);
var incorrectTilesL2 = new Array(12,21,23,25,26,27,28,29,30,32,34,36,43,45,47,54,56,58,59,60,61,62,63,65,67,74,76,78,80,85,87,89,91,92,93,94,95,96,98,100,109,111,112,113,118,119,120);
var correctTilesL3 = new Array(37,40,41,42,43,48,50,54,59,61,70,72,73,74,75,78,81,84,85,86,87,89,92,98,100,103,105,109,112,113,116,117,118,119);
var incorrectTilesL3 = new Array(12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,38,39,45,46,47,49,51,52,53,56,57,58,60,62,63,64,65,67,68,69,71,76,79,80,82,83,90,91,93,94,95,96,97,101,102,104,106,107,108,111,114,115,120);
var correctTilesL4 = new Array(15,18,25,28,37,40,47,50,59,62,68,71,72,74,75,76,79,80,81,82,83,84,85,87,90,91,92,93,94,95,96,97,98,101,102,103,104,105,106,107,113,114,115,116,117,118);
var incorrectTilesL4 = new Array(12,13,14,16,17,19,20,21,23,24,26,27,29,30,31,32,34,35,36,38,39,41,42,43,45,46,48,49,51,52,53,54,56,57,58,60,61,63,64,65,67,69,70,73,78,86,89,100,108,109,111,112,119,120);
var puzzlesSolved = new Array(false,false,false,false);
var row=document.getElementsByTagName("td");
var gridLevel1=document.getElementById("level1");
var menu1=document.getElementById("menu");
var menu2=document.getElementById("menuLevels");

function startGame() {
    var buttonBack=document.getElementById("back2");
    var menu1=document.getElementById("menu");
    var menu2=document.getElementById("menuLevels");
    var chkbtn=document.getElementById("checkbtn");
    gridLevel1=document.getElementById("level1");
    buttonBack.style.display="block"; //shows the "Back Button"
    menu1.style.display="none"; //hides de Main Menu
    gridLevel1.style.display="inline-block"; //shows the grid
    chkbtn.style.display="block"; //shows the "Check Puzzle" button
    menu2.style.display="none"; //hides the "Choose Levels" menu, just in case it was open
}

function chooseLevel() {
    var menu1=document.getElementById("menu");
    var menu2=document.getElementById("menuLevels");
    var page1=document.getElementById("page1");
    var page2=document.getElementById("page2");
    menu1.style.display="none";
    menu2.style.display="block";
    page1.style.display="block";
    page2.style.display="none";
}

function openHTP() {
   var menu1=document.getElementById("menu");
   var menuHTP=document.getElementById("menuHTP");
   menuHTP.style.display="block"; //opens the "How To Play Section"
   menu1.style.display="none";    //hides Main Menu
}

function goBack() {
    var gridLevel1=document.getElementById("level1");
    var menu1=document.getElementById("menu");
    var menu2=document.getElementById("menuLevels");
    var chkbtn=document.getElementById("checkbtn");
    var buttonBack=document.getElementById("back2");
    var menuHTP=document.getElementById("menuHTP");
    menu1.style.display="block"; //This shows Main Menu and below lines hides everything else
    buttonBack.style.display="none";
    checkbtn.style.display="none";
    gridLevel1.style.display="none";
    menu2.style.display="none";
    menuHTP.style.display="none";
    stop(); //stops the timer, if running
}

function next() {
    var page1=document.getElementById("page1");
    var page2=document.getElementById("page2");
    page1.style.display="none";
    page2.style.display="block";
}



function fill(valor) {
    //This the function to fill the cells of the grid with black, gray or leave it as it is. It takes the number of the cell as parameter.
    var row=document.getElementsByTagName("td")[valor];
    if (row.style.backgroundColor=="black") {
          row.style.backgroundColor="gainsboro"; //if the cell was black, it paints it with "gainsboro" (a light gray)
    } else if (row.style.backgroundColor=="gainsboro") {
        row.style.backgroundColor="orange"; //if it was gray ("gainsboro"), it paints it with orange
    }
    else {
        row.style.backgroundColor="black"; //Paint it Black
    }
}

function checkPuzzle() {
    //Function to check if the puzzle was correctly solved.
    var contCorrect=0; //counter of black squares
    var contIncorrect=0; //counter of gray or orange squares
    var gridLevel2=document.getElementsByClassName("num2");
    //The first "If" checks if you are in the first level
    if (gridLevel2[0].innerHTML.indexOf("Level 1") != -1) {
        //The following code will compare the squares you painted (or not) with the arrays declared at the beggining of this document
        for (var i=0;i<correctTiles.length;i++) {
            if (row[correctTiles[i]].style.backgroundColor=="black") {
                  contCorrect+=1;
            }
        }
        for (j=0;j<incorrectTiles.length;j++) {
             if (row[incorrectTiles[j]].style.backgroundColor!=="black") {
                  contIncorrect+=1;  
            }
        }
        if (contCorrect==74 && contIncorrect==26) {
            //If you have the correct amount of filled and unfilled squares, this will happen.
               puzzlesSolved[0]=true; //turns true the first element of the array
            alert("Solved!");
            alert("Your time: "+strHH+":"+strMin+":"+strSec); //Shows the time that took you to solve the puzzle
            stop(); //stops the timer
            for (var i=0;i<correctTiles.length;i++) {
                   row[correctTiles[i]].style.backgroundColor="red";
            }
            setTimeout(level2,3000);      
         } else {
             //if you haven't solved the puzzle correctly, this will pop up.
            alert("Keep trying!");
           }
    //Next "If" checks if you are in the second level. Afterwards, it does pretty much the same as the former "IF".
    } else if (gridLevel2[0].innerHTML.indexOf("Level 2") != -1){
        for (var i=0;i<correctTilesL2.length;i++) {
            if (row[correctTilesL2[i]].style.backgroundColor=="black") {
                 contCorrect+=1;
            }
          }
        for (j=0;j<incorrectTilesL2.length;j++) {
            if (row[incorrectTilesL2[j]].style.backgroundColor!=="black") {
                contIncorrect+=1;  
            }
        }
        if (contCorrect==53 && contIncorrect==47) {
               puzzlesSolved[1]=true;
            alert("Solved!");
            alert("Your time: "+strHH+":"+strMin+":"+strSec);
            stop();
            for (var m=0;m<incorrectTilesL2.length;m++) {
                row[incorrectTilesL2[m]].style.backgroundColor="#e6e6e6";
            }
            for (var n=0;n<correctTilesL2.length;n++) {
                row[correctTilesL2[n]].style.backgroundColor="DarkOrange";
            }
            for (var p=13;p<21;p++) {
                row[p].style.backgroundColor="#e67e00";
            }
            for (var p=24;p<102;p=p+11) {
                row[p].style.backgroundColor="#e67e00";
            }
            for (var p=31;p<109;p=p+11) {
                row[p].style.backgroundColor="#e67e00";
            }
            for (var p=114;p<118;p++) {
                row[p].style.backgroundColor="#e67e00";
            }
            setTimeout(level3,3000);
        } else {
           alert("Keep trying!");
           }
    //Conditions for the Level 3
    } else if (gridLevel2[0].innerHTML.indexOf("Level 3") != -1) {
            for (var i=0;i<correctTilesL3.length;i++) {
                if (row[correctTilesL3[i]].style.backgroundColor=="black") {
                      contCorrect+=1;  
                }
               }
        for (j=0;j<incorrectTilesL3.length;j++) {
            if (row[incorrectTilesL3[j]].style.backgroundColor!=="black") {
                contIncorrect+=1;  
            }
        }
        if (contCorrect==34 && contIncorrect==66) {
               puzzlesSolved[2]=true;
            alert("Solved!");
            alert("Your time: "+strHH+":"+strMin+":"+strSec);
            stop();
            for (var i=0;i<incorrectTilesL3.length;i++) {
                row[incorrectTilesL3[i]].style.backgroundColor="#ffe033";
            }
                        setTimeout(level4,3000);
           } else {
            alert("Keep trying!");
           }
    //Conditions for Level 4
    } else if (gridLevel2[0].innerHTML.indexOf("Level 4") != -1) {
            for (var i=0;i<correctTilesL4.length;i++) {
                if (row[correctTilesL4[i]].style.backgroundColor=="black") {
                      contCorrect+=1;  
                }
               }
        for (j=0;j<incorrectTilesL4.length;j++) {
            if (row[incorrectTilesL4[j]].style.backgroundColor!=="black") {
                contIncorrect+=1;  
            }
        }
        if (contCorrect==46 && contIncorrect==54) {
               puzzlesSolved[3]=true;
            alert("Solved!");
            alert("Your time: "+strHH+":"+strMin+":"+strSec);
            if (puzzlesSolved[0] && puzzlesSolved[1] && puzzlesSolved[2] && puzzlesSolved[3]) {
                alert("Congratulations! You beat the game!");
            }
            stop();
            for (var i=0;i<incorrectTilesL4.length;i++) {
                row[incorrectTilesL4[i]].style.backgroundColor="white";
            }
            for (var i=0;i<10;i++) {
                row[correctTilesL4[i]].style.backgroundColor="DarkOrange";   
            }
            row[correctTilesL4[10]].style.backgroundColor="CadetBlue";
            row[correctTilesL4[11]].style.backgroundColor="DarkOrange";
            row[correctTilesL4[12]].style.backgroundColor="DarkOrange";
            for (var i=13;i<correctTilesL4.length;i++) {
                row[correctTilesL4[i]].style.backgroundColor="CadetBlue";   
            }
           } else {
            alert("Keep trying!");
           }
    }


}

function level1() {

    start(); //initialize the timer

    var gridLevel2=document.getElementsByClassName("num2");
    var gridLvl2tr=document.getElementsByTagName("td");

    for (var h=0;h<correctTiles.length;h++) {
        row[correctTiles[h]].style.backgroundColor="orange";
    }
    for (var k=0;k<incorrectTiles.length;k++) {
        row[incorrectTiles[k]].style.backgroundColor="orange";
    }
    gridLevel2[0].innerHTML="Level 1";
    gridLevel2[0].style.fontWeight="bold";
    gridLevel2[1].innerHTML="3 - 3";
    gridLevel2[2].innerHTML="10";
    gridLevel2[3].innerHTML="10";
    gridLevel2[4].innerHTML="10";
    gridLevel2[5].innerHTML="10";
    gridLevel2[6].innerHTML="8";
    gridLevel2[7].innerHTML="8";
    gridLevel2[8].innerHTML="6";
    gridLevel2[9].innerHTML="4";
    gridLevel2[10].innerHTML="2";
    gridLvl2tr[1].innerHTML="4";
    gridLvl2tr[2].innerHTML="7";
    gridLvl2tr[3].innerHTML="8";
    gridLvl2tr[4].innerHTML="9";
    gridLvl2tr[5].innerHTML="9";
    gridLvl2tr[6].innerHTML="9";
    gridLvl2tr[7].innerHTML="9";
    gridLvl2tr[8].innerHTML="8";
    gridLvl2tr[9].innerHTML="7";
    gridLvl2tr[10].innerHTML="4";
}
   

function level2() {

    start(); //initialize the timer

    var gridLevel2=document.getElementsByClassName("num2");
    var gridLvl2tr=document.getElementsByTagName("td");

    for (var h=0;h<correctTiles.length;h++) {
        row[correctTiles[h]].style.backgroundColor="orange";
    }
    for (var k=0;k<incorrectTiles.length;k++) {
        row[incorrectTiles[k]].style.backgroundColor="orange";
    }
    gridLevel2[0].innerHTML="Level 2";
    gridLevel2[0].style.fontWeight="bold";
    gridLevel2[1].innerHTML="8";
    gridLevel2[2].innerHTML="1 - 1";
    gridLevel2[3].innerHTML="1 - 6";
    gridLevel2[4].innerHTML="1 - 6";
    gridLevel2[5].innerHTML="1 - 1";
    gridLevel2[6].innerHTML="6 - 1";
    gridLevel2[7].innerHTML="1-4-1";
    gridLevel2[8].innerHTML="1 - 1";
    gridLevel2[9].innerHTML="8";
    gridLevel2[10].innerHTML="4";
    gridLvl2tr[1].innerHTML="0";
    gridLvl2tr[2].innerHTML="9";
    gridLvl2tr[3].innerHTML="1<br>1<br>1";
    gridLvl2tr[4].innerHTML="1<br>2<br>2<br>2";
    gridLvl2tr[5].innerHTML="1<br>2<br>2<br>2";
    gridLvl2tr[6].innerHTML="1<br>2<br>2<br>2";
    gridLvl2tr[7].innerHTML="1<br>2<br>2<br>2";
    gridLvl2tr[8].innerHTML="1<br>2<br>1";
    gridLvl2tr[9].innerHTML="9";
    gridLvl2tr[10].innerHTML="0";
}

function level3() {

    start(); //initialize the timer

    var gridLevel2=document.getElementsByClassName("num2");
    var gridLvl2tr=document.getElementsByTagName("td");

    for (var h=0;h<correctTiles.length;h++) {
        row[correctTiles[h]].style.backgroundColor="orange";
    }
    for (var k=0;k<incorrectTiles.length;k++) {
        row[incorrectTiles[k]].style.backgroundColor="orange";
    }
    gridLevel2[0].innerHTML="Level 3";
    gridLevel2[0].style.fontWeight="bold";
    gridLevel2[1].innerHTML="0";
    gridLevel2[2].innerHTML="0";
    gridLevel2[3].innerHTML="1 - 4";
    gridLevel2[4].innerHTML="1-1-1";
    gridLevel2[5].innerHTML="1 - 1";
    gridLevel2[6].innerHTML="1 - 4";
    gridLevel2[7].innerHTML="1-1-4";
    gridLevel2[8].innerHTML="1-1-1";
    gridLevel2[9].innerHTML="1-1-1-1";
    gridLevel2[10].innerHTML="2 - 4";
    gridLvl2tr[1].innerHTML="3";
    gridLvl2tr[2].innerHTML="1";
    gridLvl2tr[3].innerHTML="1";
    gridLvl2tr[4].innerHTML="7";
    gridLvl2tr[5].innerHTML="0";
    gridLvl2tr[6].innerHTML="3<br>2";
    gridLvl2tr[7].innerHTML="1<br>2<br>1";
    gridLvl2tr[8].innerHTML="1<br>2<br>1";
    gridLvl2tr[9].innerHTML="1<br>2<br>1";
    gridLvl2tr[10].innerHTML="2<br>3";
}

function level4() {

    start(); //initialize the timer

    var gridLevel2=document.getElementsByClassName("num2");
    var gridLvl2tr=document.getElementsByTagName("td");

    for (var h=0;h<correctTiles.length;h++) {
        row[correctTiles[h]].style.backgroundColor="orange";
    }
    for (var k=0;k<incorrectTiles.length;k++) {
        row[incorrectTiles[k]].style.backgroundColor="orange";
    }
    gridLevel2[0].innerHTML="Level 4";
    gridLevel2[0].style.fontWeight="bold";
    gridLevel2[1].innerHTML="1 - 1";
    gridLevel2[2].innerHTML="1 - 1";
    gridLevel2[3].innerHTML="1 - 1";
    gridLevel2[4].innerHTML="1 - 1";
    gridLevel2[5].innerHTML="1 - 1";
    gridLevel2[6].innerHTML="1-2-3";
    gridLevel2[7].innerHTML="7 - 1";
    gridLevel2[8].innerHTML="9";
    gridLevel2[9].innerHTML="7";
    gridLevel2[10].innerHTML="6";
    gridLvl2tr[1].innerHTML="0";
    gridLvl2tr[2].innerHTML="4";
    gridLvl2tr[3].innerHTML="1<br>1<br>4";
    gridLvl2tr[4].innerHTML="1<br>1<br>1<br>4";
    gridLvl2tr[5].innerHTML="5";
    gridLvl2tr[6].innerHTML="1<br>1<br>5";
    gridLvl2tr[7].innerHTML="1<br>1<br>1<br>4";
    gridLvl2tr[8].innerHTML="5";
    gridLvl2tr[9].innerHTML="1<br>1";
    gridLvl2tr[10].innerHTML="3";
}

/*This is the beggining of the script of the timer.
Credits for it goes to StackOverflow user Mate.
I only added the first part so it would display in the format I wanted (hh:mm:ss) and deleted some buttons I didn't need.
Hopefully I will be able to do this on my own in the near future.
*/

function changeValue() {
    if (sec+1==60) {
        sec=0;
        ++min;
        if (min+1==60) {
            min=0;
            ++hh;
        } else {
            ++min;
        }
    } else {
        ++sec;
    }
    if (sec<10) {
        strSec="0"+sec;
    } else {
        strSec=sec;
    }
    if (min<10) {
        strMin="0"+min;
    } else {
        strMin=min;
    }
    if (hh<10) {
        strHH="0"+hh;
    } else {
        strHH=hh;
    }
      document.getElementById("timer").innerHTML = strHH+":"+strMin+":"+strSec;
}

var timerInterval = null;

function start() {
  stop();
  value = 0;
  hh = 0;
  min = 0;
  sec = 0;
  timerInterval = setInterval(changeValue, 1000);  
}
var stop = function() {
  clearInterval(timerInterval);
}