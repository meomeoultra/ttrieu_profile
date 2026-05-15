document.addEventListener("DOMContentLoaded", () => {

    const nameWrapper = document.getElementById("nameWrapper");

    /* ===== SHRINK EFFECT ===== */
    window.addEventListener("scroll", () => {
        const shrink = window.scrollY > 30;
        nameWrapper.classList.toggle("shrink", shrink);
    });

    /* ===== LIGHT PETAL EFFECT ===== */
    function createPetal(){

        // tắt hoàn toàn trên mobile để tối ưu FPS
        if(window.innerWidth < 768) return;

        // giới hạn số lượng effect
        if(document.querySelectorAll('.petal-effect').length > 4) return;

        const petal = document.createElement("div");
        petal.classList.add('petal-effect');

        petal.textContent = "🌸";
        petal.style.position = "fixed";
        petal.style.top = "-20px";
        petal.style.left = Math.random() * window.innerWidth + "px";
        petal.style.fontSize = (Math.random() * 10 + 14) + "px";
        petal.style.animation = `fall ${Math.random() * 4 + 6}s linear forwards`;
        petal.style.pointerEvents = "none";
        petal.style.opacity = ".8";
        petal.style.zIndex = "0";

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 10000);
    }

    // giảm hiệu ứng gây lag

    if(window.innerWidth > 768){
        setInterval(createPetal, 5000);
    }

});

/* ===== SCROLL REVEAL ===== */

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }

    });

},{
    threshold:0.12
});

reveals.forEach(el=>observer.observe(el));

// scr dark light
const themeToggle = document.getElementById("themeToggle");

// load saved mode
if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "☀️";

}

themeToggle.addEventListener("click", ()=>{

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");
        themeToggle.innerHTML = "☀️";

    }else{

        localStorage.setItem("theme","dark");
        themeToggle.innerHTML = "🌙";

    }
});
