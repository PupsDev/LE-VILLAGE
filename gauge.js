let defaultColors = {
    "food":  [240,157,40],
    "water": [38 ,34 ,240],
    "rest":  [192,188,194],
    "health":[250,60 ,44],
    "faith":  [250,219,83],
}

function randomColor(){
    return([parseInt(random(255)),parseInt(random(255)),parseInt(random(255))]);
}

function Gauge(name, maxVal, value, decreaseRate){
    this.name = name;
    this.max = maxVal;
    this.value = maxVal*0.9 + random(maxVal*0.1);
    this.decreaseRate = decreaseRate;
    this.color;

    if(name in defaultColors){
        this.color = defaultColors[name];
    }else{
        this.color = randomColor();
    }

    this.add = function(a){
        this.value = min(this.value+a,this.max);
    }

    this.decrease = function(){
        this.value = max(this.value-this.decreaseRate, 0);
    }
    this.cost = function(cost){
        this.value = max(this.value-cost, 0);
    }
    this.clone = function(){
        let res = new Gauge(this.name, this.max, this.value, this.decreaseRate);
        res.color = this.color;
        return res; 
    }
}