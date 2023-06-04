let i = 0
document.getElementById('dark').onclick = () => {
    if(!i) {
        document.documentElement.classList.add('night'); 
        i++;
    } else {
        document.documentElement.classList.remove('night');
        i--;
    }
};