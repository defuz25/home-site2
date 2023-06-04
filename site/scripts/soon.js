const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let date = new Date();
let clockHand1;
let clockHand2;
const time = {
    sec: function(){
        ctx.lineWidth = 1;
        ctx.strokeStyle =  "#FF0000";
        clockHand1 = 100 + 80*Math.cos(Math.PI/2 - (date.getSeconds()*6)*(Math.PI/180))
        clockHand2 = 100 - 80*Math.sin(Math.PI/2 - (date.getSeconds()*6)*(Math.PI/180));
    },
    min: function(){
        ctx.strokeStyle =  "#000000"
        ctx.lineWidth = 3;
        clockHand1 = 100 + 70*Math.cos(Math.PI/2 - (date.getMinutes()*6)*(Math.PI/180))
        clockHand2 = 100 - 70*Math.sin(Math.PI/2 - (date.getMinutes()*6)*(Math.PI/180));
    },
    hour: function(){
        ctx.lineWidth = 4;
        clockHand1 = 100 + 50*Math.cos(Math.PI/2 - (date.getHours()*30)*(Math.PI/180))
        clockHand2 = 100 - 50*Math.sin(Math.PI/2 - (date.getHours()*30)*(Math.PI/180));
    }
    
}
function clock(){
    ctx.clearRect(0,0,200,200);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(100,100,1,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(100,100,90,0,2*Math.PI);
    ctx.stroke(); 
    for(let f in time){
        time[f]();
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(clockHand1,clockHand2);
        ctx.stroke();
        ctx.closePath();
    }
    $('#clocks p').text(date.toLocaleTimeString());
}
setInterval(function(){
    date = new Date();
    clock();
},500)
