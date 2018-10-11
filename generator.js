const canvasWidth = document.getElementById('landscape').getAttribute('width');
const canvasHeight = document.getElementById('landscape').getAttribute('height');

var terrain = new Array();

create();

function procGen() {
    clear();
    create();
}

function create() {
    let variationValue = document.getElementById('variation').value;
    let intensity = document.getElementById('intensity').value;
    
    for(i=0; i<variationValue; i++){
        addChunk(intensity, variationValue);
    }

    draw();
}

function clear() {
    terrain = [];
}

function addChunk(intensity, variationValue){
    let chunkSize = Math.floor(canvasWidth / variationValue);
    let chunk = new Array(chunkSize);
    chunk.fill(0);

    let startPoint = Math.random()*intensity + ((canvasHeight/2) - (intensity/2));
    if(terrain.length > 0) {
        startPoint = terrain[terrain.length-1]
    }
    chunk[0] = Math.round(startPoint);
    chunk[chunkSize] = Math.round(Math.random()*intensity) + ((canvasHeight/2) - (intensity/2));

    generate(0, chunkSize, chunk);
    terrain = terrain.concat(chunk);
}

function generate(minPoint, maxPoint, chunk){
    let middlePoint = Math.round((minPoint+maxPoint)/2);
    let pointBetween = Math.round((chunk[minPoint]+chunk[maxPoint])/2);
    let pointRange = Math.abs(chunk[maxPoint]-chunk[minPoint]);

    if(minPoint == middlePoint) return;
    if(maxPoint == middlePoint) return;

    let deviation = Math.round(Math.random()*pointRange);
    chunk[middlePoint] = Math.round(pointBetween + (deviation - (pointRange/2)));

    generate(minPoint, middlePoint, chunk);
    generate(middlePoint, maxPoint, chunk);
}

function draw(){
    let waterLevel = document.getElementById('waterLevel').getAttribute('max') - document.getElementById('waterLevel').value;

    let landscape = document.getElementById('landscape');
    let ctx = landscape.getContext("2d");
    ctx.clearRect(0,0,landscape.width, landscape.height);
    
    let water = document.getElementById('water');
    let waterCtx = water.getContext("2d");
    waterCtx.clearRect(0,0,landscape.width, landscape.height);

    let waterDepth = waterCtx.createLinearGradient(0,waterLevel,0,waterLevel+200);
    waterDepth.addColorStop(0, "#005F7F");
    waterDepth.addColorStop(1, "#00161E");
    waterCtx.fillStyle = waterDepth;
    waterCtx.fillRect(0, waterLevel, canvasWidth, canvasHeight);

    xIncrement = landscape.width / (terrain.length-1);

    for(let x=0; x<=terrain.length; x++){

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
            ctx.moveTo(x, terrain[x]+0);
            ctx.lineTo(x, terrain[x]+20);
            ctx.strokeStyle="tan";
            ctx.stroke();
        }

        ctx.fillStyle="grey";
        ctx.fillRect(x, terrain[x], 1, canvasHeight-terrain[x]);
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
