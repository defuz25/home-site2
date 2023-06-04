if (!window.jQuery) {
    console.log('!');
}

onkeypress = specialkey;

let sizec1 = document.getElementById("sizecanvas1");
let sizec2 = document.getElementById("sizecanvas2");
sizec1.oninput = changesizec;
sizec2.oninput = changesizec;

let panel = document.getElementById("id1");

let rangersz = document.getElementById("aaa");
let penexmpl = document.getElementById("pen");
let clr = document.getElementById("color");
//    let rangerop = document.getElementById("bbb");
let clear = document.getElementById('clear');
let txts = document.getElementById("txt1");
let saveb = document.getElementById('saveb');
saveb.onclick = save;
clear.onclick = clearall;
rangersz.oninput = setwidth;
//    rangerop.oninput = setopacity;
clr.oninput = setclr;

let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.textAlign='center';
canvas2.onmousedown = drawstart;
canvas2.onmousemove = draw;
canvas2.onmouseup = drawstop;
canvas2.onmouseout = drawstop;
canvas2.onclick = setcustom;
ctx2.clearRect(0,0,canvas.width,canvas.height);

let xstart;
let ystart;
let xend; 
let yend;
let x;
let y;
let r;

let instr = {
    bruh: true,
    esraser: false,
    sext: false,
    simg: false,
    demotiv: false,
    figure: false
};

document.addEventListener('DOMContentLoaded', function () {
    $('#fontselect').hide();
    $('#fi').hide();
    $('#imgw').hide();
    $('#imgh').hide();
    $('#txtsimg').hide();
    $('#sta').hide();
    $('#figsel').hide();
    $('#txt4').hide();
});

let reader = new FileReader();
let img = document.createElement('img');

let isdraw = false;
let ista = false;
let isfi = false;
let isf = false;

function tru_folz(ni){
    for(i in instr){
        instr[i]=false;
    }
    instr[ni]=true;
}

function remove(){
    if(ista) {
        $("#fontselect").hide();
        document.getElementById('sta').value='';
        $("#sta").hide();
        ista=false;
        txts.textContent='Размер кисти';
    }
    if(isfi){
        isfi=false;
        isf=false;
        txts.textContent='Размер кисти';
        document.getElementById('fi').value='';
        document.getElementById('imgw').value='';
        document.getElementById('imgh').value='';
        $('#fi').hide();
        $('#imgw').hide();
        $('#imgh').hide();
        $('#txtsimg').hide();
    }
    $('#linestyle').hide();
    $('#txt3').hide();
    $('#figsel').hide();
    $('#txt4').hide();
}
function create(){
    if(instr.sext || instr.demotiv) {
        $("#fontselect").show();
        $("#sta").show();
        ista=true;
        txts.textContent='Размер шрифта';
        rangersz.value=10;
        $('#sta').attr('placeholder','Введите текст, который хотите вставить');
    }
    if(instr.simg || instr.demotiv) {
        isfi=true;
        $('#fi').show();
        $('#fi').change(createf);
        $('#imgw').show();
        $('#imgh').show();
        $('#txtsimg').show();
        txts.textContent='Размер кисти (недоступно)';
    }
    if(instr.bruh||instr.figure){
        $('#linestyle').show();
        $('#txt3').show();
    }
    if(instr.figure){
        $('#figsel').show();
        $('#txt4').show();
    }
}

function etg_for_demotiv() {
    create();
    $("#fontselect").hide();
    $('#imgw').hide();
    $('#imgh').hide();
    $('#txtsimg').hide();
    txts.textContent='Размер шрифта';
    $('#sta').attr('placeholder','Введите текст демотиватора');
}

function drawstart(xy) {
    isdraw=true;
    xstart=xy.pageX-canvas.offsetLeft;
    ystart=xy.pageY-canvas.offsetTop;
    ctx.moveTo(xstart, ystart);
    ctx.beginPath();
    ctx2.beginPath();
    ctx2.moveTo(xstart, ystart);
    ctx.strokeStyle=clr.value;
    if($('#linestyle').val()=='solid'){
        ctx.setLineDash([]);
        ctx2.setLineDash([]);
    }else{
        ctx.setLineDash([10+Number(rangersz.value)*1.5, 8]);
        ctx2.setLineDash([10+Number(rangersz.value)*1.5, 8]);
    }
}
function draw(xy) {
    ctx2.font=rangersz.value*2+'px '+$('#fontselect').val();
    ctx2.textAlign='center';
    ctx2.fillStyle=clr.value;
    ctx.lineWidth=rangersz.value;
    ctx2.lineWidth=rangersz.value;
    xend=xy.pageX-canvas.offsetLeft;
    yend=xy.pageY-canvas.offsetTop;
    if(instr.sext){
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        ctx2.fillText($('#sta').val(),xy.pageX-canvas.offsetLeft,xy.pageY-canvas.offsetTop)
    } else if(instr.simg && isf){
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        ctx2.drawImage(img, xy.pageX-canvas.offsetLeft-$('#imgw').val()/2, xy.pageY-canvas.offsetTop-$('#imgh').val()/2, $('#imgw').val(), $('#imgh').val());
    } else if(isdraw && instr.bruh){
        ctx.lineTo(xy.pageX-canvas.offsetLeft,xy.pageY-canvas.offsetTop);
        ctx.stroke();
    } else if(isdraw && instr.esraser){
        // ctx2.clearRect(0,0,canvas.width,canvas.height);
        // ctx2.strokeRect(xy.pageX-canvas.offsetLeft,xy.pageY-canvas.offsetTop,rangersz.value,rangersz.value);
        ctx.clearRect(xy.pageX-canvas.offsetLeft,xy.pageY-canvas.offsetTop,rangersz.value,rangersz.value);
    } else if(instr.figure && isdraw){
        if($('#figsel').val()=='line'){
            ctx2.clearRect(0,0,canvas.width,canvas.height);
            ctx2.moveTo(xstart, ystart);
            ctx2.lineTo(xend,yend);
            ctx2.closePath()
            ctx2.stroke();
            ctx2.beginPath();
        } else if($('#figsel').val()=='rect'){
            ctx2.clearRect(0,0,canvas.width,canvas.height);
            ctx2.strokeRect(xstart, ystart, xend-xstart, yend-ystart);
        } else if($('#figsel').val()=='circle'){
            // let r2=(yend>ystart)?yend:-yend;
            // let r=(r1+r2)/2;
            ctx2.clearRect(0,0,canvas.width,canvas.height);
            ctx2.arc(xstart+(xend-xstart)/2, ystart, (xend>xstart)?(xend-xstart)/2:-(xend-xstart)/2, 0, Math.PI*2);
            ctx2.stroke();
            ctx2.beginPath();
        }
    }
}
function zalivka(){
    
}

function createf() { 
    let file = $("#fi")[0].files[0];
    reader.readAsDataURL(file);
    reader.onload=function() {
        isf=true;
        img.src=reader.result;
        setTimeout(function(){
            document.getElementById("imgw").value=img.width;
            document.getElementById("imgh").value=img.height;
        }, 100);
    }
}

function setcustom(xy){
    if(instr.simg && isf){
        ctx.drawImage(img, xy.pageX-canvas.offsetLeft-$('#imgw').val()/2, xy.pageY-canvas.offsetTop-$('#imgh').val()/2, $('#imgw').val(), $('#imgh').val());
    } else if(instr.sext){
        ctx.fillStyle=clr.value;
        ctx.font=rangersz.value*2+'px '+$('#fontselect').val();
        ctx.fillText($('#sta').val(),xy.pageX-canvas.offsetLeft,xy.pageY-canvas.offsetTop)
    } else if(instr.demotiv && isf){
        ctx.font=rangersz.value*2+"px serif";
        ctx.fillStyle=clr.value;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='white';
        ctx.fillRect(10,10,canvas.width-20,canvas.height-80);
        ctx.fillStyle=clr.value;
        ctx.fillRect(12,12,canvas.width-24,canvas.height-84);
        ctx.drawImage(img,15,15,canvas.width-30,canvas.height-90);
        ctx.fillStyle='white';
        ctx.fillText($('#sta').val(),canvas.width/2,canvas.height-25)
    }
}
    
function drawstop() {
    isdraw=false;
    ctx2.clearRect(0,0,canvas.width,canvas.height);
}

function changesizec() {
    canvas.width=sizec1.value;
    canvas2.width=sizec1.value;
    canvas.height=sizec2.value;
    canvas2.height=sizec2.value;
    ctx.restore();
}
function defsize() {
    canvas.width=500;
    canvas.height=300;
    sizec1.value=canvas.width;
    sizec2.value=canvas.height;
}

function setclr() {
    penexmpl.style.backgroundColor=clr.value;
    ctx.strokeStyle=clr.value;
    ctx2.strokeStyle=clr.value;
}
function setwidth() {
    ctx.lineWidth=rangersz.value;
    ctx2.lineWidth=rangersz.value;
    penexmpl.style.height=rangersz.value*2+'px'
    penexmpl.style.width=rangersz.value*2+'px';
}
function clearall(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function chgbgc(){
    canvas.style.backgroundColor=clr.value;
}

function specialkey(){
    if(event.key=='+'){
        rangersz.value++;
    } else if(event.key=='-'){
        rangersz.value--;
    } else if(event.key==' '){
        if(instr.figure && isdraw && $('#figsel').val()=='rect'){
            ctx.strokeRect(xstart, ystart, xend-xstart, yend-ystart); 
        } else if(instr.figure && isdraw  && $('#figsel').val()=='line'){
            ctx.moveTo(xstart,ystart)
            ctx.lineTo(xend,yend);
            ctx.closePath();
            ctx.stroke();
        } else if($('#figsel').val()=='circle'){
            ctx.arc(xstart+(xend-xstart)/2, ystart, (xend>xstart)?(xend-xstart)/2:-(xend-xstart)/2, 0, Math.PI*2);
            ctx.stroke();
        }
    }
    setwidth();
}

function save(){
    let data = canvas.toDataURL("imag/jpg")
    let a = document.createElement("a")
    
    console.log(a.href);
    a.href = data;
    console.log(a.href);
    a.download = "create_with_risovalka.jpg"
    a.click()
}
/*function setopacity() {
    penexmpl.style.opacity=rangerop.value;
    ctx.globalAlpha=rangerop.value;
}*/
