// Ultra Pro Max Dev No1 - main.js
(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'three-canvas';
  document.body.appendChild(canvas);

  function loadScript(url){ return new Promise((res,rej)=>{ const s=document.createElement('script'); s.src=url; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
  const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js';
  loadScript(THREE_CDN).then(()=> initThree()).catch(()=> console.warn('Three load failed'));

  function initThree(){
    const renderer = new THREE.WebGLRenderer({canvas:document.getElementById('three-canvas'), antialias:true, alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 2000);
    camera.position.z = 350;

    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(50,50,50);
    scene.add(light);

    const particles = new THREE.BufferGeometry();
    const count = 12000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for(let i=0;i<count;i++){
      const i3 = i*3;
      const r = Math.random()*700 + 20;
      const phi = Math.random()*Math.PI*2;
      const theta = Math.acos((Math.random()*2)-1);
      positions[i3]   = Math.cos(phi)*r * Math.sin(theta);
      positions[i3+1] = Math.sin(phi)*r * Math.sin(theta);
      positions[i3+2] = Math.cos(theta)*r * 0.4;
      const hue = Math.random()*360;
      const c = new THREE.Color('hsl('+hue+',80%,60%)');
      colors[i3] = c.r; colors[i3+1] = c.g; colors[i3+2] = c.b;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions,3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors,3));
    const mat = new THREE.PointsMaterial({size:1.8, vertexColors:true, transparent:true, opacity:0.95, depthWrite:false});
    const points = new THREE.Points(particles, mat);
    scene.add(points);

    const sphereGeo = new THREE.SphereGeometry(48, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({color:0x223344, metalness:0.7, roughness:0.15, emissive:0x002233, emissiveIntensity:0.6});
    const planet = new THREE.Mesh(sphereGeo, sphereMat);
    planet.position.set(-120, 30, 0);
    scene.add(planet);

    window.addEventListener('resize', ()=>{
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    const pointer = {x:0,y:0};
    window.addEventListener('pointermove', (e)=>{ pointer.x = (e.clientX / window.innerWidth) * 2 - 1; pointer.y = - (e.clientY / window.innerHeight) * 2 + 1; });

    function animate(t){
      requestAnimationFrame(animate);
      const time = t*0.0005;
      points.rotation.z = time * 0.2;
      points.rotation.y = time * 0.1;
      camera.position.x += (pointer.x * 60 - camera.position.x) * 0.05;
      camera.position.y += (pointer.y * 30 - camera.position.y) * 0.05;
      camera.lookAt(0,0,0);
      planet.rotation.y += 0.0025;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }

})();


(function(){
  function loadGSAP(){ return new Promise((res,rej)=>{ if(window.gsap) return res(); const s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
  loadGSAP().then(()=>{
    const tl = gsap.timeline({defaults:{ease:'power2.out', duration:0.9}});
    tl.from('.app', {y:40, opacity:0, duration:0.9});
    tl.from('.avatar', {scale:0.6, rotation: -10, duration:0.8}, '-=0.6');
    tl.from('.headline', {y:30, skewY:6, duration:0.9, stagger:0.04}, '-=0.5');
    document.querySelectorAll('.card').forEach((c,i)=> gsap.from(c, {y:20, opacity:0, delay:0.15*i}));
  }).catch(()=>{});

  function type(el, text, speed=28){ el.textContent=''; let i=0; const id=setInterval(()=>{ el.textContent+=text[i++]||''; if(i>text.length) clearInterval(id); }, speed); }
  const lead = document.querySelector('.hero .lead');
  if(lead) type(lead, 'bo cuoc chinh la su that bai');

  const avatar = document.querySelector('.avatar');
  if(avatar){
    avatar.addEventListener('pointermove', e=>{
      const r = avatar.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width/2) / r.width;
      const dy = (e.clientY - r.top - r.height/2) / r.height;
      avatar.style.transform = `rotateY(${dx*18}deg) rotateX(${ -dy*12 }deg) scale(1.02)`;
    });
    avatar.addEventListener('pointerleave', ()=> avatar.style.transform = '');
  }

  function clickSfx(freq){
    try{
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type='sine'; o.frequency.value = freq || 440;
      o.connect(g); g.connect(ctx.destination);
      g.gain.value = 0.0001; o.start();
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
      o.stop(ctx.currentTime + 0.18);
    }catch(e){}
  }

  document.querySelectorAll('.social-btn').forEach(btn=>{
    btn.addEventListener('pointerdown', e=>{
      const burst = document.createElement('span');
      burst.style.position='absolute'; burst.style.left=(e.offsetX-60)+'px'; burst.style.top=(e.offsetY-60)+'px';
      burst.style.width='120px'; burst.style.height='120px'; burst.style.borderRadius='50%';
      burst.style.background='radial-gradient(circle, rgba(255,255,255,0.14), rgba(255,255,255,0.02))';
      burst.style.pointerEvents='none'; burst.style.transform='scale(0)'; burst.style.transition='transform 500ms, opacity 700ms';
      btn.appendChild(burst); requestAnimationFrame(()=> burst.style.transform='scale(1)'); setTimeout(()=> burst.style.opacity='0',250); setTimeout(()=> burst.remove(),800);
      clickSfx(520 + Math.random()*180);
    });
  });

  const konami = [38,38,40,40,37,39,37,39,66,65];
  let idx=0;
  window.addEventListener('keydown', e=>{ if(e.keyCode === konami[idx]){ idx++; if(idx===konami.length){ idx=0; runFireworks(); } } else idx = 0; });
  function runFireworks(){
    for(let i=0;i<120;i++){
      const p = document.createElement('div');
      p.style.position='fixed'; p.style.left=(window.innerWidth/2)+'px'; p.style.top=(window.innerHeight/2)+'px';
      p.style.width='10px'; p.style.height='10px'; p.style.borderRadius='50%'; p.style.background = 'hsl('+ (Math.random()*360|0) +',90%,60%)'; p.style.pointerEvents='none'; p.style.zIndex=60;
      document.body.appendChild(p);
      const angle = Math.random()*Math.PI*2; const dist = 80 + Math.random()*460;
      const tx = Math.cos(angle)*dist; const ty = Math.sin(angle)*dist;
      p.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${tx}px,${ty}px) scale(0.4)`}], {duration:900+Math.random()*600, easing:'cubic-bezier(.2,.9,.3,1)'});
      p.animate([{opacity:1},{opacity:0}], {duration:900+Math.random()*600, easing:'linear'});
      setTimeout(()=> p.remove(), 1600);
    }
  }

})();
// ==============================
// DARK / LIGHT MODE TOGGLE
// ==============================
const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Đổi icon theo theme
    if (document.body.classList.contains("light-mode")) {
      toggleBtn.textContent = "🌙"; // ban đêm
    } else {
      toggleBtn.textContent = "☀️"; // ban ngày
    }
  });
}

// ==============================
// SCROLL ANIMATION
// ==============================
const scrollElements = document.querySelectorAll(".scroll-animate");

function checkScroll() {
  scrollElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// ==============================
// OPTIONAL: Lưu theme vào localStorage
// ==============================
(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (toggleBtn) toggleBtn.textContent = "🌙";
  } else {
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });
  }
})();

