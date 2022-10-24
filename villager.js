let names = ['Armando','Edgar','Jacoby','Oscar','Jake','Mathias','Nathen','Quinton','Saul','Kaleb','Henry','Simon','Jermaine','Lucas','Gary','Houston','Landen','Jaydan','Trenton','Phillip','Blaze','Jaylin','Maximus','Ray','Ronin','Kade','Lamont','Raphael','Gustavo','Reuben','Steve','Gerald','Brayden','Omar','Solomon','German','Alan','Luca','Tomas','Alvaro','Bryant','Roger','Ryan','Eugene','Osvaldo','Kash','Travis','Seamus','Christopher','Drew','Avery','Jason','Yurem','Brock','Jamal','Nathanial','Joshua','Rhys','Turner','Abram','Walker','Ezekiel','Jeffery','Cristofer','Antonio','Erick','Reilly','Johnny','Sidney','Gabriel','Marc','Edward','Maxwell','Jerry','Yosef','Cullen','Konnor','Brice','Jayce','Silas','Javier','Demarcus','Mark','Marshall','Uriah','Brodie','Cooper','Weston','Julius','Orion','London','Darius','Greyson','Immanuel','Quintin','Koen','Caleb','Hugo','Kareem','Cade','Mikayla','Sage','Bianca','Cassie','Jaylin','Alma','Annabelle','Vanessa','Jakayla','Charlize','Kaylin','Carolina','Baylee','Nora','Kaylyn','Shania','Reese','Alani','Sydney','Zariah','Alexandria','Janiyah','Viviana','Eva','Rosa','Tara','Kailee','Diamond','Anabelle','Marisol','Jenna','Maggie','Rosemary','Giana','Andrea','Eileen','Adelaide','Emilee','Zion','Kianna','Yoselin','Vivian','Jamiya','Greta','Hallie','Rebecca','Presley','Rachel','Isabell','Kathleen','Megan','Raven','Ashlyn','Erica','Savanna','Kendra','Aileen','Karina','Fatima','Juliet','Grace','Daniella','Madelyn','Aleah','Emerson','Emilie','Abbigail','Jacquelyn','Briana','Serenity','Kristina','Amanda','Estrella','Meadow','Amirah','Allison','Annika','Charlotte','Priscilla','Eve','Hailie','Isla','Georgia','Heidi','Alaina','Nyasia','Lina','Jayleen','Marlee','Quinn','Alena','Arabella','Emmalee','Alondra','Selina','Jaylen','Ainsley','Genevieve','Delilah','America'];

function Villager(){
    this.name = names[parseInt(random(names.length))];
    this.gauges = [];
    this.nextAction = "";
    this.dead = false;

    this.blackBoard;
    this.actionPool;
    this.gaugesCommunism;
    

    this.addGauge = function(template){
        this.gauges.push(template.clone());
    };

    this.addGauges = function(templateListe){
        for(tmp of templateListe){
            this.addGauge(tmp);
        }
    };

    this.setActionPool = function(acp){
        this.actionPool = acp;
    };

    this.setBlackBoard = function(bbd){
        this.blackBoard = bbd;
    };



    this.discuss = function(){//EVIDAMENT il faudra mettre le vrai code ici -> c'est bon


        //for(currentAction of this.actionPool )
        
        for(let c =0 ; c< this.actionPool.length ; c++)
        {
            let currentAction = this.actionPool[c];
            
            let currentGauge = this.gaugesCommunism.filter(a=>a.name==currentAction.gauge)[0]
            for( message of this.blackBoard)
            {
                if(this.name == message.sender.name)
                {
                    
                    c = this.actionPool.length+1;
                    break;
                }    
            } 
            if( c == this.actionPool.length+1)break;
             let messageBoy = new MessageAction(this,this.actionPool[c],this.gauges.filter(a=>a.name==this.actionPool[c].costGauge)[0] );
            let messagesForAction = this.blackBoard.filter(a=>a.action.name==currentAction.name);
            let challengersCount = messagesForAction.length
            //let bucket = challengersCount*messagesForAction[0].action.value;
            let bucket = messagesForAction.reduce((a,b)=>a+b.action.value,0);

            console.log("bucket : "+bucket);
            console.log("currentGauge.max : "+currentGauge.max);
            console.log("currentGauge.value : "+currentGauge.value);

            if( bucket < (currentGauge.max - currentGauge.value) && challengersCount < nbVillager/5)
            {
                this.blackBoard.push(messageBoy);
            }
            else
            {
                let weakBoy
                let miniBoy = 101
                for(message of messagesForAction)
                {
                    let gauge = message.sender.gauges.filter(a=>a.name==currentAction.costGauge)[0]
                    if( gauge.value < miniBoy)
                    {
                        miniBoy = gauge.value
                        weakBoy = message.sender 
                    }
                }
                let mygauge = this.gauges.filter(a=>a.name==currentAction.costGauge)[0].value
                //console.log(miniBoy + " "+ mygauge)
                if(miniBoy < mygauge)
                {           
                    //console.log("REMPLACEMENT " + this.name +" "+ weakBoy.name);
                    // efface weakboy
                    let index = messagesForAction.filter(a=>a==weakBoy)
                    for(let i = 0 ; i < this.blackBoard.length ; i ++){
                        if(this.blackBoard[i].sender == weakBoy){
                            this.blackBoard.splice(i,1,messageBoy);
                        }
                    }   
                   
                }

            }

        }
        
        
    }
    
    this.takeDecision = function(){
        console.log("TIME TO DECISION");

        
        this.nextAction = this.actionPool[parseInt(random(this.actionPool.length))].name;
    }



    this.draw = function(posX,posY,sizeX,sizeY){
        if(!this.dead){
            fill(200);
            rect(posX,posY,sizeX,sizeY);
            rect(posX,posY,sizeX,45);

            textSize(32);
            fill(0,0,0);
            text(this.name, posX+10, posY+10+25);

            for(let i = 0 ; i < this.gauges.length ; i ++){
                let gposy = posY + 45*2 + i*40;
                textSize(25);
                fill(0,0,0)
                text(this.gauges[i].name,posX+10,gposy);
                fill(220);
                rect(posX+90,gposy-17,sizeX-100,20)
                
                fill(this.gauges[i].color[0],this.gauges[i].color[1],this.gauges[i].color[2])
                rect(posX+90,gposy-17,map(this.gauges[i].value,0,this.gauges[i].max,0,sizeX-100),20)

                if(gposy+190>posY+sizeY)
                break;
            }

            fill(150)
            rect(posX+10,posY+sizeY-140,sizeX-20,130)
            fill(0)
            text(this.nextAction,posX+15,posY+sizeY-135,sizeX-30,120)
        }else{
            fill(0);
            rect(posX,posY,sizeX,sizeY);
        }
    }
}