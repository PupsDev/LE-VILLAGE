function Action(name, gaugeName, solo, value, variation, costGauge, cost){
    this.name = name;

    this.gauge = gaugeName;
    this.solo = solo;
    this.value = value;
    this.variation = variation

    this.costGauge = costGauge;
    this.cost = cost;
}