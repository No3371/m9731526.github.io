var Debugging = true;

var hatchCount = 0;
var TheEgg;

var Thirst, Hunger, Temperature, Health,
    TargetThirst, TargetHunger, TargetTemperature, TargetHealth,
    isThirst, isHungry, isCold, isHot, SickPhase;

var Score_Thirst=0, Score_Hunger=0, Score_Temperature=0, Score_Health=0, Score_Total= 0;;

var Fund = 50, IncomeCountDown = 10;

var FireOn = false, IceOn=false, KettleOn = false;

var Price = {
    "Water": 5,
    "Food": 5,
    "Fire": 10,
    "Needle": 20
}

var Time = 181;

var HeartList;

var IntervalID;

function start(){
    TheEgg = document.getElementById("TheEgg");
    document.getElementById("EggDiv").style.display = "block";
    document.getElementById("GUI").style.display = "block";
    document.getElementById("Menu_Options").style.display = "none";
    document.getElementById("Menu_Options").disabled = true;
    document.getElementById("Frame").style.backgroundColor = "#D99999";
    
    TargetThirst = 100; TargetHungry = 100; TargetTemperature = 38; TargetHealth = 80;
    Thirst = 70; Hungry = 100; Temperature = 37; Health = 100;
    
    InitItems();
    
    IntervalID = setInterval(StateCheck, 1000);
    document.getElementById("TimerDiv").style.display = "block";
    
    HeartList = document.getElementsByClassName("Heart");
    if(HeartList.length == 10) console.log("Heart Counts correct!");
    
    document.getElementById("BGM").setAttribute("src", "resources/Happy walk.mp3");
    document.getElementById("BGM").volume=0.5;
    
    document.getElementById("Fund").innerHTML = Fund;
}

function randomEgg(){
    console.log(hatchCount);
    if(hatchCount == 0) return "resources/EggBasic.png";
    else{
        var temp = 0;
        while(temp <= 0 || temp >= 7){
            temp = Math.round(Math.random(1, 7));
        }
       return "resources/Egg" + temp + ".png";
    }
}

function StatusVisualization(){
    console.log("Visualizing.");
    
    if(isCold){
        if(TheEgg.className.indexOf("shiverA") == -1) TheEgg.className += " shiverA";  
        document.getElementById("Shiver").disabled = false;    
        document.getElementById("Shiver").style.display = "block";
    }else{
        TheEgg.className = "";  
        document.getElementById("Shiver").disabled = true;    
        document.getElementById("Shiver").style.display = "none";
        
    }
    
    if(isHot){        
        document.getElementById("Sweat").disabled = false;
        document.getElementById("Sweat").style.display = "block";
    }else{
        document.getElementById("Sweat").disabled = true;
        document.getElementById("Sweat").style.display = "none";
        
    }    
    
    if(isThirst){        
        document.getElementById("Smoke").disabled = false;
        document.getElementById("Smoke").style.display = "block";
    }else{
        document.getElementById("Smoke").disabled = true;
        document.getElementById("Smoke").style.display = "none";        
    }      
    
    if(FireOn){        
        document.getElementById("Campfire").disabled = false;
        document.getElementById("Campfire").style.display = "block";
    }else{
        document.getElementById("Campfire").disabled = true;
        document.getElementById("Campfire").style.display = "none";        
    }
    
    if(IceOn){        
        document.getElementById("Ice").disabled = false;
        document.getElementById("Ice").style.display = "block";
    }else{
        document.getElementById("Ice").disabled = true;
        document.getElementById("Ice").style.display = "none";        
    }
    
    if(KettleOn){        
        document.getElementById("Kettle").disabled = false;
        document.getElementById("Kettle").style.display = "block";
    }else{
        document.getElementById("Kettle").disabled = true;
        document.getElementById("Kettle").style.display = "none";        
    }
    
    
    for(i = 0; i< HeartList.length; i++) HeartList[i].style.display = "none";
    for(i = 0; i < Health/10; i++){
        HeartList[i].style.display = "inline-block";
    }
}

function StateCheck(){
    Fund += 1;
    document.getElementById("Fund").innerHTML = Fund;
    Time -= 1;
    TimerUpdate();
    
    if(SickPhase >2) Thirst -= 3;
    else Thirst -= 1;
    
    //if(Hunger > 80) Temperature += 0.1;
    if(Thirst > 80) Temperature -= 0.1;
    //if(Hunger < 36) Temperature -= 0.1;
    if(Thirst < 40) Temperature += 0.1;
    if(FireOn) {
        Temperature += 1;
        Thirst -= 0.2;
    }
    if(IceOn){
        Temperature -= 1;
        Thirst += 0.2;
    }
    
    var rtemp = Math.random(0, 100);
    if(rtemp < 3) Temperature += 1 * (Math.random() <0.5 ? -1: 1);
    else if(rtemp< 7) Temperature += 0.6 * (Math.random() <0.5 ? -1 : 1);
    else if(rtemp < 30) Temperature += 0.1 * (Math.random() <0.5 ? -1: 1);
    else Temperature += 0.02 * (Math.random()<0.5 ? -1: 1);
    
    if(Thirst <= 0) Die("thirst");
    if(Thirst < 50) isThirst = true;
    else if(Thirst >= 50) isThirst = false;
    //Hunger -= 1;
    //if(Hunger < 36) isHungry = true; 
    //else if(Hunger >= 50) isHungry = false;
    
    
    if(Temperature <= 24) Die("cold");
    if(Temperature >= 40) Thirst -= 1;
    if(Temperature >= 48) Die("hot");
    if(Temperature < 30) isCold = true;
    else if(Temperature > 42) isHot = true;
    else {
        isCold= false;
        isHot = false
    }
    
    if(isThirst) Health -= 1;
    //if(isHungry) Health -= 1;
    if(isCold) Health -= 1;
    if(isHot) Health -= 1;
    
    if(Health == 0) Die("health");
    else if(Health < 25) SickPhase = 4;
    else if(Health < 50) SickPhase = 3;
    else if(Health < 65) SickPhase = 2;
    else if(Health < 80) SickPhase = 1;
    else SickPhase = 0;
    
    ScoreCounter();
    StatusVisualization();
    debugReport();
}

function ScoreCounter(){
    Score_Thirst += 10 - Math.round((TargetThirst - Thirst)/10);
    //Score_Hunger += 10 - Math.round((TargetHunger - Hunger)/10);
    Score_Temperature += (10 - Math.abs(TargetTemperature - Temperature))*3;
    Score_Health += Health - TargetHealth;
    document.getElementById("ScoreValue").innerHTML = (Score_Thirst+Score_Health+Score_Temperature).toFixed(0);
}

function TimerUpdate(){
    if(Time == 0) {
        Finish();
        return;
    }
    var temp = Time/60;
    var min = Math.floor(temp);
    var sec = Time - min * 60;
    if(sec.toString().length < 2) sec = "0" + sec;
    document.getElementById("Timer").innerHTML = min + ":" + sec;
}

function debugReport(){
    if(!Debugging) return;
    console.log("Health: " + Health + ", Thirst: " + Thirst + ", Temperature: " + Temperature);
}


function Finish(){
    
}