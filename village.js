function Village(){
    this.blackBoard = [];
    this.villagers = [];
    this.actionPool = [];

    this.gauges = [];

    this.gaugesCommunism = [];

    this.villagerWidth;
    this.margin = 10;

    this.discussionTurn = 3;

    this.nextVillager = 0;
    this.discussionTurnCount = 0;

    this.turnSurvided;

    this.addGauge = function(gag){
        this.gauges.push(gag);
        this.gaugesCommunism.push(gag.clone());
        this.gaugesCommunism[this.gaugesCommunism.length-1].max *= nbVillager;
    }

    this.addAction = function(act){
        this.actionPool.push(act);
    }
    this.refreshCommunism = function(){
        

        let k =0
        for(g of this.gaugesCommunism)
        {
            g.value=0;

            for(v of this.villagers){
                g.value += v.gauges[k].value;
            }
            k++;
        }
        
        // for(g of this.gaugesCommunism)
        // {
        //     g.value/=(this.villagers.length);
        //     console.log(g.name + ":" +g.value);
        // }

    }

    this.generateVillagers = function(nb){
        for(let i = 0 ; i < nb ; i ++){
            let tmpVil = new Villager();

            tmpVil.addGauges(this.gauges);          //
            tmpVil.setActionPool(this.actionPool);  //On pourrait tout mettre dans le constructeur, je sais pas ce qui est le mieux
            tmpVil.setBlackBoard(this.blackBoard);  //
            tmpVil.gaugesCommunism = this.gaugesCommunism;

            this.villagers.push(tmpVil);
        }
        this.villagerWidth = (width - (ceil(this.villagers.length / 2)+1)*(this.margin)) /ceil(this.villagers.length / 2);
        console.log(this.villagerWidth);
    }


    this.discussionStep = function(){
        if(this.discussionTurnCount < this.discussionTurn){
            if(this.nextVillager < this.villagers.length){
                this.villagers[this.nextVillager].discuss();
                this.nextVillager++;
                if(this.nextVillager >= this.villagers.length){
                    this.discussionTurnCount++;
                    this.nextVillager = 0;
                }
            }
        }else{
            if(this.nextVillager >= this.villagers.length){
                this.doActions();

                this.nextVillager = 0;
                this.discussionTurnCount = 0;
                this.blackBoard.splice(0, this.blackBoard.length);
                this.villagers.forEach((a)=>{a.nextAction = ""});
                this.refreshCommunism();
            }else{
                this.villagers[this.nextVillager].takeDecision();
            }
            this.nextVillager++;
        }
    }


    this.doActions = function(){
        this.decreaseGauges();
        for(v of this.villagers){
            let currentAction = this.actionPool.filter((a)=>(a.name == v.nextAction))[0];
            let recolted = currentAction.value + random(currentAction.variation*2)-currentAction.variation;

            let costGauge = currentAction.costGauge;
            let cost = currentAction.cost;
            v.gauges.filter(a=>(a.name==costGauge))[0].cost(cost);

            if(currentAction.solo){
                let gauge = v.gauges.filter((a)=>(a.name == currentAction.gauge))[0];
                gauge.value = min(gauge.value + recolted, gauge.max);
            }else{
                let splited = recolted / this.villagers.length;
                this.villagers.forEach((a)=>{
                    let gauge = a.gauges.filter((a)=>(a.name == currentAction.gauge))[0];
                    gauge.value = min(gauge.value + splited, gauge.max);
                });
            }
        }
    };

    this.decreaseGauges = function(){
        this.villagers.forEach((v)=>{
            v.gauges.forEach((g)=>{
                g.value = max(0,g.value-g.decreaseRate);
                if(g.value <= 0){
                    v.dead = true;
                }
            })
        })
        this.villagers = this.villagers.filter(a=>!a.dead);
    }


    this.draw = function(startx, starty, width,height){
        let vlgPerLigne = ceil(this.villagers.length / 2)
        let i = 0;
        for(let y = 0 ; y < 2 ; y ++){
            for(let x = 0 ; x < vlgPerLigne ; x ++){
                let posX  = startx + this.margin + x*((width-this.margin)/vlgPerLigne);
                let posY  = starty + 10+y*((height-this.margin)/2);
                let sizeX = (width-this.margin)/vlgPerLigne -10;
                let sizeY = (height-this.margin)/2 - 10;

                if(i<this.villagers.length){
                    this.villagers[i].draw(posX,posY,sizeX,sizeY)
                    i++;
                }
            }
        }
    }

this.drawBlackboard = function(startx, starty, width,height){
        textSize(18);

        let nbMax = parseInt(height/32);
        //nbMax = 5;

        let allText = "";
    
        //for(let i = max(this.blackBoard.length-nbMax,0) ; i < this.blackBoard.length ; i++){
        for(let i = 0 ; i < this.blackBoard.length ; i++){
            let m = this.blackBoard[i];
            allText += m.toString() + "\n";
        }

        fill(30);
        rect(        startx,starty+10,width-10,height-20);
        fill(255)
        text(allText,startx+20,starty+20,width-40,height-40)
    }

}