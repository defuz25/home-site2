let n;
let nside;
let nfors;
const dice=document.querySelector('#img');
const ntxt=document.querySelector('#ndice');
const butn=document.querySelector('#roll');
butn.addEventListener('click', rolldice);
const diceArr = ["d1.png", "d2.png", "d3.png", "d4.png", "d5.png", "d6.png", "d7wtf.png", "help_id.png"];
function getrandom(){
    n=Number(Math.random().toFixed(2));
}
function side(){
    if(n<=0.16) ndice=0;
    else if(n>0.16 && n<=0.32) ndice=1;
    else if(n>0.32 && n<=0.48) ndice=2;
    else if(n>0.48 && n<=0.64) ndice=3;
    else if(n>0.64 && n<=0.80) ndice=4;
    else if(n>0.80 && n<=0.96) ndice=5;
    else if(n>0.96 && n<=0.98) ndice=6;
    else if(n>0.98) ndice=7;
} 
function sortingd(){
    nfors=Math.floor(Math.random() * 6) + 1;
    dice.src = 'image/' + diceArr[nfors-1];  
}
function rolldice(){
    butn.setAttribute('disabled', true);
    butn.style.opacity='0.6';
    sortingd();
    ntxt.textContent='.';
    setTimeout(sortingd, 300);
    setTimeout(() => {
        ntxt.textContent='..';
    },300);
    setTimeout(sortingd, 600);
    setTimeout(() => {
        ntxt.textContent='...';
    },600);
    setTimeout(rolldiceres, 900)
    setTimeout(() => {
        butn.removeAttribute('disabled');
        butn.style.opacity='1';
    },900);
}
function rolldiceres(){
    getrandom();
    side();
    dice.src = 'image/' +  diceArr[ndice];
    if(ndice<=5) ntxt.textContent=ndice+1;
    else if(ndice==6) ntxt.textContent='7 ._.';
    else ntxt.textContent='HELP_ID';
}