
function dropFun(){
    var menu = document.getElementById('drop-items');
   if( menu.style.visibility === 'visible'){
       menu.style.visibility = 'hidden';
   }else {
       menu.style.visibility = 'visible';
   }
}

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

const c = canvas.getContext("2d");

//properties for strocking-- strokeStyle , lineWidth 

function drawLine(p1, p2, color = "black", thickness = 2) {
  c.beginPath();
  c.strokeStyle = color ;
  c.lineWidth = thickness; 
  c.moveTo(p1.x, p1.y);
  c.lineTo(p2.x, p2.y);
  c.stroke();
  c.closePath();
}   


// --------PENCIL DRAWING--------------

const pencil = document.getElementById("pencil");
let isPencilActive = false ; //initially its inactive

function onPencilClick() {
    
    pencil.classList.toggle("active");
    isPencilActive = !isPencilActive ;

    if(isPencilActive ){
        canvas.style.cursor ="crosshair";
        canvas.addEventListener("mousedown" , onMouseDown );
    }
    else {
        canvas.style.cursor = 'auto';
        canvas.removeEventListener("mousedown" , onMouseDown);
    }
}
pencil.addEventListener('click' , onPencilClick);



let drawingColor = "black";
let previousPosition = null ;

function onMouseDown(e) {
    previousPosition = [ e.clientX , e.clientY];
    c.strokeStyle = drawingColor;
    c.lineWidth = 2; 
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp); 
}

function onMouseMove(e){ 
    // for the first time inside this  
    let currentPosition = [ e.clientX , e.clientY ];
    // draw line from previous position to current position ;
    c.beginPath();
    c.moveTo(...previousPosition);
    c.lineTo(...currentPosition);
    c.stroke();
    c.closePath();
    previousPosition = currentPosition ;
}

function onMouseUp(e){ 
    canvas.removeEventListener("mousemove", onMouseMove);
}



const zoomActionButtons = document.querySelectorAll('.zoom-action');
const zoomLevelText = document.getElementById('zoomLevel');

let zoomLevel = 100; // Initial zoom level (100%)

// Function to update the zoom level and display it
function updateZoom() {
    zoomLevelText.textContent = zoomLevel + '%';
}

// Add event listeners to the zoom action buttons
zoomActionButtons.forEach(button => {
    button.addEventListener('click', function () {
        alert(4);
        const action = this.getAttribute('data-action');
        if (action === 'in') {
            zoomLevel += 10; // Increase zoom level by 10%
        } else if (action === 'out') {
            zoomLevel -= 10; // Decrease zoom level by 10%
        }

        if (zoomLevel < 10) {
            zoomLevel = 10; // Set a minimum zoom level
        }

        updateZoom();
    });
});

// Initial update
updateZoom();