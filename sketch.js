let village;

let nbVillager = 32;
let actionRate = 10; //frame entre 2 actions

let button;

function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createButton('click me');
  button.size(200, 100);
  button.style("font-size", "48px");
  button.mousePressed(()=>{});

  village = new Village();
  { //init village
    village.addGauge (new Gauge("food"  ,100,50,5));
    village.addGauge (new Gauge("water" ,100,50,5));
    village.addGauge (new Gauge("rest"  ,100,50,5));
    village.addGauge (new Gauge("health",100,50,5));
    village.addGauge (new Gauge("fate"  ,100,50,5));

    village.addAction(new Action("hunt"        , "food" , false, 500, 100));
    village.addAction(new Action("lookForWater", "water", false, 500, 100));
    village.addAction(new Action("sleep"       , "rest" , true , 90 , 10));

    village.generateVillagers(nbVillager);
  }

  windowResized();
}

function draw() {
  background(240);

  if(frameCount % actionRate == 0){
    village.discussionStep();
  }



  village.draw          (0          ,0 ,width*0.85,height*0.9);
  village.drawBlackboard(width*0.85 ,0 ,width*0.15,height*0.9);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  button.position(10, windowHeight*0.9);
}
