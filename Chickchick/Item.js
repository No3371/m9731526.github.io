var Items;

var itemCount = 0;

function ItemTemplates (name, type, value, icon){
    var temp = {
        "Name": name,
        "type": type,
        "value": value,
        "icon": icon,
        "id": itemCount,
        "button": new generateItemButton(itemCount, icon)    
    };
    itemCount += 1;
    return temp;
}
  

function generateItemButton(id, icon){
    var temp = document.createElement("div");
    temp.addEventListener("click", function(){useItem(id);});
    temp.className = "ItemFrame";
    temp.style.backgroundImage = "url(" + icon + ")";
    document.getElementById("ItemsPanel").appendChild(temp);
    console.log("Generating Item " + id + ". icon: " + icon);
    temp.addEventListener("click", function(){ new Audio("resources/Menu Selection Click.wav").play();});
    return temp;
}

function useItem(id){
    if(Items[id].type == "water"){
        Thirst += Items[id].value;
        KettleOn = true;
        document.getElementById("Kettle").disabled = false;
        document.getElementById("Kettle").style.display = "block";
        setTimeout(KettleOut, 1000);
        Fund -= 7;
    }else if(Items[id].type == "ice"){
        IceOn = true;
        setTimeout(IceOut, 5000);
        Fund -= 8;
    }else if(Items[id].type == "health"){
        Health += Items[id].value;
        Fund -= 30;
    }else if(Items[id].type == "fire"){
        FireOn = true;
        setTimeout(fireOut, 5000);
        Fund -= 8;
    }
    document.getElementById("Fund").innerHTML = Fund;
}

function InitItems(){
    Items = [
    new ItemTemplates("海洋深層水", "water", 10, "resources/Icon_Kettle.png"),
    new ItemTemplates("雪冰", "ice", 8, "resources/Icon_Ice.png"),
    new ItemTemplates("Bonfire", "fire", 10, "resources/Icon_Fire.png"),
    new ItemTemplates("捅破靜脈", "health", 20, "resources/Icon_Needle.png")
    ];
}

function fireOut(){
    FireOn = false;
}
function IceOut(){
    IceOn = false;    
}

function KettleOut(){
    KettleOn = false;
}