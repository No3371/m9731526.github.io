var intro = 0;

function Introduction (){
    switch(intro){
        case 0:
            document.getElementById("BGM").pause();
            document.getElementById("IntroLine").innerHTML = "你聽得見嗎......？";
            intro += 1;
            break;
        case 1:
            document.getElementById("IntroLine").innerHTML =  "請幫我照顧我可憐的孩子......";
            document.getElementById("Menu_Button").innerHTML = "...";
            intro += 1;
            break;
        case 2:
            document.getElementById("IntroLine").innerHTML =  "他就快出生了，卻沒有媽媽在一旁守候......";
            document.getElementById("Menu_Button").innerHTML = "...";
            intro += 1;
            break;
        case 3:
            document.getElementById("IntroLine").innerHTML =  "請讓他平安地來到這世上。"
            document.getElementById("Menu_Button").innerHTML = "伸出援手";
            document.getElementById("Menu_Button").removeEventListener("click", Introduction);
            document.getElementById("Menu_Button").addEventListener("click", start);
            break;
    }
}

    
var SadMommy = 0;

function Die(reason){
    document.getElementById("EggDiv").style.display = "none";
    document.getElementById("EggDiv").disabled = true;
    document.getElementById("Menu_Options").style.display = "block";
    document.getElementById("Menu_Options").disabled = false;
    document.getElementById("Frame").style.backgroundColor = "black";
    document.getElementById("GUI").style.display = "none";
    clearInterval(IntervalID);
    Score_Total = (Score_Thirst+Score_Health+Score_Temperature).toFixed(0)
    
    if(document.getElementById("BGM").volume > 0.3){
        var tempInterval = setInterval(function(){
        if(document.getElementById("BGM").volume <= 0.1){
            clearInterval(tempInterval);
            document.getElementById("BGM").pause();
        }
        document.getElementById("BGM").volume -= 0.075;
    }, 200);
    }
    if(SadMommy == 0) new Audio("resources/mutantdie.wav").play();
            
        
    switch(SadMommy){
        case 0:
            document.getElementById("Menu_Button").removeEventListener("click", start);
            document.getElementById("Menu_Button").addEventListener("click", Die);
            document.getElementById("IntroLine").innerHTML = "你.....為什麼......";
            document.getElementById("Menu_Button").innerHTML = "...";
            SadMommy += 1;
            break;
        case 1:
            document.getElementById("IntroLine").innerHTML =  "為什麼！為什麼......？";
            document.getElementById("Menu_Button").innerHTML = "...";
            SadMommy += 1;
            break;
        case 2:
            document.getElementById("IntroLine").innerHTML =  "......我的孩子呀！是媽媽對不起你！將你託付給了錯誤的人！";
            SadMommy += 1;
            break;
    }
    
    if(SadMommy == 3){
        switch(reason){
            case "cold":
                document.getElementById("Menu_Button").innerHTML = "小雞冷死了......得分: " + Score_Total; 
                break;
            case "thirst":
                document.getElementById("Menu_Button").innerHTML = "小雞乾枯了......得分: " + Score_Total; 
                break;
            case "hot":
                document.getElementById("Menu_Button").innerHTML = "小雞烤熟了......得分: " + Score_Total; 
                break;
            case "sick":
                document.getElementById("Menu_Button").innerHTML = "小雞病死了......得分: " + Score_Total; 
                break;
        }
    }
}

function Init (){
    console.log("Init"); 
    document.getElementById("Menu_Button").addEventListener("click", Introduction);
    document.getElementById("TheEgg").setAttribute("src", randomEgg());
    
    
    document.getElementById("Sweat").disabled = true;
    document.getElementById("Sweat").style.display = "none";
    document.getElementById("Shiver").disabled = true;
    document.getElementById("Shiver").style.display = "none";
    document.getElementById("Smoke").disabled = true;
    document.getElementById("Smoke").style.display = "none";
    document.getElementById("Campfire").disabled = true;
    document.getElementById("Campfire").style.display = "none";
    document.getElementById("Ice").disabled = true;
    document.getElementById("Ice").style.display = "none";  
    document.getElementById("Kettle").disabled = true;
    document.getElementById("Kettle").style.display = "none";  
}