const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const checkboxReal = document.getElementById('real');
const rightAngle = document.getElementById('right');
ctx.textAlign='center';

let length = 0;
let sample = 1;
let round = 0.01;

let xStart;
let yStart;
let xEnd;
let yEnd;
let isDraw = false;

let reader = new FileReader();

function drawStart(xy) {
    isDraw=true;
    if(checkboxReal.checked){
        ctx.strokeStyle='red';
        ctx2.strokeStyle='red';
        ctx.fillStyle='red';
    } else {
        ctx.strokeStyle=$('#color').val();
        ctx2.strokeStyle=$('#color').val();
        ctx.fillStyle=$('#color').val();
    }
    ctx.lineWidth=$('#weight').val();
    ctx2.lineWidth=$('#weight').val();
    ctx.font='bold '+ (Number($('#weight').val())+15)+'px sans-serif';
    xStart=xy.pageX-canvas.offsetLeft;
    yStart=xy.pageY-canvas.offsetTop;
    ctx.beginPath();
    ctx2.beginPath();
}
function draw(xy) {
    if(isDraw){
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        xEnd=xy.pageX-canvas.offsetLeft;
        yEnd=xy.pageY-canvas.offsetTop;
        ctx2.moveTo(xStart, yStart);
        if(rightAngle.checked){
            if((xEnd-yEnd>xStart-yStart && xEnd+yEnd>xStart+yStart)||(xEnd-yEnd<xStart-yStart && xEnd+yEnd<xStart+yStart)) ctx2.lineTo(xEnd,yStart);
            else ctx2.lineTo(xStart,yEnd);
        } else{
            ctx2.lineTo(xEnd,yEnd);
        }
        ctx2.closePath()
        ctx2.stroke();
        ctx2.beginPath();
    }
    
}
function drawStop(xy) {
    isDraw=false;
    xEnd=xy.pageX-canvas.offsetLeft;
    yEnd=xy.pageY-canvas.offsetTop;
    sample=checkboxReal.checked?1:sample;
    if(rightAngle.checked){
        if((xEnd-yEnd>xStart-yStart && xEnd+yEnd>xStart+yStart)||(xEnd-yEnd<xStart-yStart && xEnd+yEnd<xStart+yStart)) length=Math.abs((xEnd-xStart)/sample);
        else length=Math.abs((yEnd-yStart)/sample);
    } else length=Math.sqrt((xEnd-xStart)**2+(yEnd-yStart)**2)/sample;
    if(checkboxReal.checked) sample=length>0?length:1;
    length=(length*$('#real_length').val()).toFixed($('#round').val());
    ctx.moveTo(xStart, yStart);
    if(rightAngle.checked){
        if((xEnd-yEnd>xStart-yStart && xEnd+yEnd>xStart+yStart)||(xEnd-yEnd<xStart-yStart && xEnd+yEnd<xStart+yStart)) {
            ctx.lineTo(xEnd,yStart);
            ctx.fillText(checkboxReal.checked?$('#real_length').val():length,(xStart+xEnd)/2,yStart-10);
        }
        else {
            ctx.lineTo(xStart,yEnd);
            ctx.fillText(checkboxReal.checked?$('#real_length').val():length,xStart+20+$('#weight').val()*2,(yStart+yEnd)/2-10);
        }
    } else{
        ctx.lineTo(xEnd,yEnd);
        ctx.fillText(checkboxReal.checked?$('#real_length').val():length,(xStart+xEnd)/2+20+$('#weight').val()*2,(yStart+yEnd)/2-10);
    }
    ctx.closePath();
    ctx.stroke();
    $('#length').text(length);
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    checkboxReal.checked=false;
}
function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    isDraw=false;
    sample=1;
}

canvas2.onclick=(e)=>(!isDraw)?drawStart(e):drawStop(e);
canvas2.onmousemove = draw;
$('#clear').click(()=>clear());
onkeydown=(e)=>{if(e.key==' ')isDraw=false;ctx2.clearRect(0,0,canvas.width,canvas.height)};
$('#file').change(function(){ 
    let img = $('#file')[0].files[0];
    reader.readAsDataURL(img);
    reader.onload=function(){$('#img').attr('src', reader.result)};
    setTimeout(() => {
        canvas.width=$('#img').width();
        canvas.height=$('#img').height();
        canvas2.width=$('#img').width();
        canvas2.height=$('#img').height();
    }, 50);
});