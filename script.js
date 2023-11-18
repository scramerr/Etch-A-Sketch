

const gridContainer = document.getElementById('grid-container');
const  gridCreateBtn = document.getElementById("grid-create-button");
const slider = document.querySelector(".slider");


let gridSize = 0;
gridSize = slider.value;

let rainbowColorsList = ["#eb3434", "#f00505", "#f53b82", "#99053d", "#cc28fa", "#601475", "#1f07f2", "#7dbbfa", "#077df5", "#07db83", "#05f529", "#08851b", "#71b307", "#96f202", "#faee05", "#fa7305", "#f29549", "#9c231a", "#755612"];
let indexRainbowColor = (Math.floor(Math.random() * rainbowColorsList.length));
let rainbowColor = rainbowColorsList[indexRainbowColor];

let rainbowBtn = document.getElementById("radio-btn-1");
let darkeningBtn = document.getElementById("radio-btn-2");
let normalBtn = document.getElementById("normal-btn");

let rainbowMode = false;
let darkeningMode = false;


gridCreateBtn.addEventListener('click', makeGrid)

slider.addEventListener('input', (e) => {
    const sizeValue = document.querySelector(".size-value")
    sizeValue.textContent = `${slider.value} x ${slider.value}`
    e.preventDefault();


})


function getRainbowColor() {
    indexRainbowColor = (Math.floor(Math.random() * rainbowColorsList.length));
    rainbowColor = rainbowColorsList[indexRainbowColor];
}

function checkMode(){

    normalBtn.addEventListener('input', (e) => {
        rainbowBtn.checked = false;
        rainbowMode = false;
    })

    rainbowBtn.addEventListener('input', (e) => {
        if(rainbowBtn.checked == true){
            rainbowMode = true;
            normalBtn.checked = false;
            // darkeningBtn.checked = false;
        }
    })

    // darkeningBtn.addEventListener('input', (e) => {
    //     if(darkeningBtn.checked == true){
    //         darkeningMode = true;
    //         rainbowBtn.checked = false;
    //         rainbowMode = false;
    //     }
    // })
    
}

// GENERATING GRID
function makeGrid(){

    gridSize = slider.value;

    gridContainer.innerHTML = "" ; 

    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    

    for(let x = 0; x < gridSize*gridSize; x++){
        let gridContainer = document.querySelector(".grid-container");
        let cell = document.createElement('div');
        gridContainer.appendChild(cell);
        cell.className = "cell";
        
    }    
    
    drawCell()
   
}


// CLEARING GRID
function clearGrid() {
    gridContainer.innerHTML = "";
    makeGrid();
}

function drawCell() {

    checkMode();

    let isDragging = false;

    const cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach((cell)=>{

        cell.addEventListener('mousedown', (e) => {
            isDragging = true;
            if(rainbowMode){
                getRainbowColor()
                updateCellDrawRainbowMode(e)
                e.preventDefault();
            }
            else{
                updateCellDrawNormalMode(e);
                e.preventDefault();
            }
        })

        

        cell.addEventListener('mouseenter', (e) => {
            if(isDragging && rainbowMode){
                getRainbowColor();
                updateCellDrawRainbowMode(e);
            }
            else if(isDragging && rainbowMode == false){
                updateCellDrawNormalMode(e);
            }
        })


        cell.addEventListener('mouseup', () => {
            isDragging = false;
        })
    })

    function updateCellDrawNormalMode(x) {
        x.target.style.backgroundColor = "black";
    }

    function updateCellDrawRainbowMode(x) {
        x.target.style.backgroundColor = rainbowColor;
    }

}

makeGrid();
