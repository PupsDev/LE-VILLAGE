function Gauge(){
    this.name;
    this.max;
    this.value;
    this.decreaseRate;

    this.add = function(a){
        this.value = min(this.value+a,this.max);
    }

    this.decrease = function(){
        this.value = max(this.value-this.decreaseRate, 0);
    }
}