function MessageGauge(name, gauge){
    this.name  = name;
    this.gauge = gauge;
    
    this.toString = function(){
        return(this.name+" : "+this.gauge.name+" -> "+parseInt(this.gauge.value));
    }
}
function MessageAction(name, action){
    this.name   = name;    
    this.action = action;

    this.toString = function(){
        return(this.name+" : "+this.action.name);
    }
}