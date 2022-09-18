let names = ['Armando','Edgar','Jacoby','Oscar','Jake','Mathias','Nathen','Quinton','Saul','Kaleb','Henry','Simon','Jermaine','Lucas','Gary','Houston','Landen','Jaydan','Trenton','Phillip','Blaze','Jaylin','Maximus','Ray','Ronin','Kade','Lamont','Raphael','Gustavo','Reuben','Steve','Gerald','Brayden','Omar','Solomon','German','Alan','Luca','Tomas','Alvaro','Bryant','Roger','Ryan','Eugene','Osvaldo','Kash','Travis','Seamus','Christopher','Drew','Avery','Jason','Yurem','Brock','Jamal','Nathanial','Joshua','Rhys','Turner','Abram','Walker','Ezekiel','Jeffery','Cristofer','Antonio','Erick','Reilly','Johnny','Sidney','Gabriel','Marc','Edward','Maxwell','Jerry','Yosef','Cullen','Konnor','Brice','Jayce','Silas','Javier','Demarcus','Mark','Marshall','Uriah','Brodie','Cooper','Weston','Julius','Orion','London','Darius','Greyson','Immanuel','Quintin','Koen','Caleb','Hugo','Kareem','Cade','Mikayla','Sage','Bianca','Cassie','Jaylin','Alma','Annabelle','Vanessa','Jakayla','Charlize','Kaylin','Carolina','Baylee','Nora','Kaylyn','Shania','Reese','Alani','Sydney','Zariah','Alexandria','Janiyah','Viviana','Eva','Rosa','Tara','Kailee','Diamond','Anabelle','Marisol','Jenna','Maggie','Rosemary','Giana','Andrea','Eileen','Adelaide','Emilee','Zion','Kianna','Yoselin','Vivian','Jamiya','Greta','Hallie','Rebecca','Presley','Rachel','Isabell','Kathleen','Megan','Raven','Ashlyn','Erica','Savanna','Kendra','Aileen','Karina','Fatima','Juliet','Grace','Daniella','Madelyn','Aleah','Emerson','Emilie','Abbigail','Jacquelyn','Briana','Serenity','Kristina','Amanda','Estrella','Meadow','Amirah','Allison','Annika','Charlotte','Priscilla','Eve','Hailie','Isla','Georgia','Heidi','Alaina','Nyasia','Lina','Jayleen','Marlee','Quinn','Alena','Arabella','Emmalee','Alondra','Selina','Jaylen','Ainsley','Genevieve','Delilah','America'];

function Villager(){
    this.name = names[parseInt(random(names.length))];
    console.log(this.name);
    this.gauges = [];
    this.nextAction = "";
    this.dead = false;

    this.blackBoard;
    this.actionPool;
    

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



    this.discuss = function(){//EVIDAMENT il faudra mettre le vrai code ici
        if(random(1)>0.5){
            this.blackBoard.push(new MessageGauge(this.name,this.gauges[parseInt(random(this.gauges.length))]));
        }
        else{
            this.blackBoard.push(new MessageAction(this.name,this.actionPool[parseInt(random(this.actionPool.length))]));
        }
    }
    this.takeDecision = function(){
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