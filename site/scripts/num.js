             let attempts = 0;
             let mAx;
             
             function random_tatar(min, max){
                 return Math.random() * (max - min + 1) + min;
             }
             function atemps(text){
                 document.getElementById("tmpts").innerHTML = text;
             }
             function ntext(text){
                 document.getElementById("txt").innerHTML = text;
             }

             function random(min, max){
                 return Math.floor(Math.random() * (max - min + 1)) + min;
             }
             function numm(){
                 attempts=0;
                 num = random(1,mAx);
                 console.log(num);
             }
             function num_l(){
                 ntext("угадайте число от 1 до 50");
                 num = random(1,50);
                 console.log(num);
                 mAx=50;
             }
             function num_c(){
                 ntext("угадайте число от 1 до 150");
                 num = random(1,150);
                 console.log(num);
                 mAx=150;
             }
             function num_h(){
                 ntext("угадайте число от 1 до 500");
                 num = random(1,500);
                 console.log(num);
                 mAx=500;
             }
             function num_uh(){
                 ntext("угадайте число от 1 до 1000");
                 num = random(1,1000);
                 console.log(num);
                 mAx=1000
             }
             function num_sumh(){
                 ntext("угадайте число от 1 до 9999");
                 num = random(1,9999);
                 console.log(num);
                 mAx=9999;
             }
             function tatar(){
                 
                 ntext("угадайте число от 1 до 999 999<br> напрмер: 456047.02633057564");
                 num = random_tatar(1,999999);
                 console.log(num);
                 mAx=999999;
             }
             function num_check(){
                 let n_u = document.getElementById("num_user").value;
                 ++attempts
                 atemps(attempts)
                 if (n_u < num) {
                     alert("надо больше");
                 }
                 if (n_u > num) {
                     alert("надо меньше");
                 }
                 if (n_u == num) {
                     alert("победа, кол-во попыток: " + attempts);
                 }
              } 