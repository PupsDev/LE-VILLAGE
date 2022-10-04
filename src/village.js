function Village(){
    this.blackBoard = [];
    this.villagers = [];
    this.actionPool = [];

    this.gauges = [];

    this.villagerWidth;
    this.margin = 10;

    this.discussionTurn = 2;

    this.nextVillager = 0;
    this.discussionTurnCount = 0;

    this.turnSurvided;

    this.addGauge = function(gag){
        this.gauges.push(gag);
    }

    this.addAction = function(act){
        this.actionPool.push(act);
    }

    this.generateVillagers = function(nb){
        for(let i = 0 ; i < nb ; i ++){
            let tmpVil = new Villager();

            tmpVil.addGauges(this.gauges);          //
            tmpVil.setActionPool(this.actionPool);  //On pourrait tout mettre dans le constructeur, je sais pas ce qui est le mieux
            tmpVil.setBlackBoard(this.blackBoard);  //
            
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
        let allText = "";
        for(m of this.blackBoard){
            allText += m.toString() + "\n";
        }

        //allText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.\n        Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.\n   Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet. ";
        fill(30);
        rect(        startx,starty+10,width-10,height-20);
        fill(255)
        text(allText,startx+20,starty+20,width-40,height-40)
    }

}