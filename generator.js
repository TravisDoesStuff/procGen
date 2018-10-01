var canvasWidth = document.getElementById('landscape').getAttribute('width');
var canvasHeight = document.getElementById('landscape').getAttribute('height');

var variationValue = document.getElementById('variation').value;
var intensity = document.getElementById('intensity').value;
var waterLevel = document.getElementById('waterLevel').value;

var randomness = Math.floor(canvasWidth / variationValue);

var terrain = new Array();

var chunk = new Array(randomness);
for(i=0; i<variationValue; i++){
    chunk.fill(0);
    addChunk();
}

draw();

function addChunk(){
    var startPoint = Math.random()*intensity + ((canvasHeight/2) - (intensity/2));
    if(terrain.length > 0) {
        startPoint = terrain[terrain.length-1]
    }
    chunk[0] = Math.round(startPoint);
    chunk[randomness] = Math.round(Math.random()*intensity) + ((canvasHeight/2) - (intensity/2));

    generate(0, randomness);
    terrain = terrain.concat(chunk);
}

function generate(minPoint, maxPoint){
    var middlePoint = Math.round((minPoint+maxPoint)/2);
    var pointBetween = Math.round((chunk[minPoint]+chunk[maxPoint])/2);
    var pointRange = Math.abs(chunk[maxPoint]-chunk[minPoint]);

    if(minPoint == middlePoint) return;
    if(maxPoint == middlePoint) return;

    var deviation = Math.round(Math.random()*pointRange);
    chunk[middlePoint] = Math.round(pointBetween + (deviation - (pointRange/2)));

    generate(minPoint, middlePoint);
    generate(middlePoint, maxPoint);
}

function draw(){
    var landscape = document.getElementById('landscape');
    var ctx = landscape.getContext("2d");

    xIncrement = landscape.width / (terrain.length-1);
    for(var x=0; x<=terrain.length; x++){

        if(terrain[x] < waterLevel){
            ctx.beginPath();
            ctx.moveTo(x, terrain[x]-5);
            ctx.lineTo(x, terrain[x]+0);
            ctx.strokeStyle="forestgreen";

            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, terrain[x]+0);
            ctx.lineTo(x, terrain[x]+20);
            ctx.strokeStyle="brown";
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(x, waterLevel);
            ctx.lineTo(x, terrain[x]+0);
            ctx.strokeStyle="teal";
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, terrain[x]+0);
            ctx.lineTo(x, terrain[x]+20);
            ctx.strokeStyle="tan";
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(x, terrain[x]+20);
        ctx.lineTo(x, 500);
        ctx.strokeStyle="grey";
        ctx.stroke();
    }
}

function updateSliderVariation(value){
    document.querySelector('#numVariation').value = value;
}
function updateSliderIntensity(value){
    document.querySelector('#numIntensity').value = value;
}
function updateSliderWater(value){
    document.querySelector('#numWater').value = value;
}

function procGen() {
    
}
