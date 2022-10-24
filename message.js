function MessageGauge(name, gauge){
    this.name  = name;
    this.gauge = gauge;
    
    this.toString = function(){
        return(this.name+" : "+this.gauge.name+" -> "+parseInt(this.gauge.value));
    }
}
function MessageAction(villager, action, gauge){
    this.sender   = villager;    
    this.action = action;
    this.gauge = gauge;

    this.toString = function(){
        return(this.sender.name+" : "+this.action.name+" : "+this.gauge.name + " : "+parseInt(this.gauge.value));
    }
}