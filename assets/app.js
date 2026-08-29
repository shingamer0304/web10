(() => {
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function initBoot(){
  const boot=$("#boot"); if(!boot) return;
  const key="shin_boot_seen";
  try{if(sessionStorage.getItem(key)){boot.classList.add("done");return}}catch(e){}
  const log=$("#bootLog");
  const lines=["INITIALIZING ENDPOINT_OS...","CHECKING IDENTITY NODE...","LOADING STUDENT PROFILE...","SYNCING INTERESTS MODULES...","CALIBRATING MOTION SYSTEM...","SIGNAL: STABLE","ACCESS GRANTED."];
  let i=0;
  const tick=()=>{if(i<lines.length){log.innerHTML+=`<div>> ${lines[i++]}</div>`;setTimeout(tick,130)}else{setTimeout(()=>boot.classList.add("done"),500);try{sessionStorage.setItem(key,"1")}catch(e){}}};
  tick();
}
function initReveal(){
  const els=$$(".reveal"); if(!els.length)return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(e=>io.observe(e));
}
function initMode(){
 const b=$("#modeBtn");if(!b)return;
 b.addEventListener("click",()=>{document.body.classList.toggle("emergency");b.textContent=document.body.classList.contains("emergency")?"SYSTEM: OVERRIDE":"SYSTEM: ONLINE"});
}
function initProjects(){
 const modal=$("#projectModal");if(!modal)return;
 const title=$("#modalTitle"),text=$("#modalText");
 const data={
  "01":["ENDPOINT UI","ระบบอินเทอร์เฟซพอร์ตโฟลิโอจำลอง เน้น HUD, data panels, navigation และ motion feedback"],
  "02":["TACTICAL HUD","การทดลองออกแบบ visual language แบบ industrial futurism ด้วยเส้น, grid, scanner และ status indicators"],
  "03":["WEB LAB","พื้นที่ทดลองสำหรับ interaction, animation และแนวคิดเว็บที่ตอบสนองต่อการเลื่อนและการชี้เมาส์"]
 };
 $$(".project").forEach(p=>p.addEventListener("click",()=>{const d=data[p.dataset.project];title.textContent=d[0];text.textContent=d[1];modal.classList.add("open")}));
 $("#closeModal")?.addEventListener("click",()=>modal.classList.remove("open"));
 modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
 $$(".node").forEach(n=>n.addEventListener("click",()=>{$$(".node").forEach(x=>x.classList.remove("active"));n.classList.add("active");$("#nodeInfo").textContent=`${n.dataset.node} / NODE SELECTED — DATA CHANNEL ONLINE`}));
}
function initTilt(){
 $$(".hero-panel,.feature-card,.portrait,.signal-panel").forEach(el=>{
   el.addEventListener("mousemove",e=>{
     const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
     if(innerWidth>900)el.style.transform=`perspective(900px) rotateX(${y*-2}deg) rotateY(${x*2}deg)`;
   });
   el.addEventListener("mouseleave",()=>el.style.transform="");
 });
}
function initScramble(){
 $$(".scramble,.decrypt").forEach(el=>{
   const final=el.textContent;let t=null;
   el.addEventListener("mouseenter",()=>{let n=0;clearInterval(t);t=setInterval(()=>{el.textContent=final.split("").map((c,i)=>i<n?c:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%"[Math.floor(Math.random()*39)]).join("");if(n++>final.length){clearInterval(t);el.textContent=final}},35)});
 });
}
initBoot();initReveal();initMode();initProjects();initTilt();initScramble();
})();

// ==========================================
// SYSTEM THEME TOGGLE (ONLINE / COMPROMISED)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const modeBtn = document.getElementById("modeBtn");
  const body = document.body;

  // ฟังก์ชันสร้างเสียงบี๊บสังเคราะห์แบบไซไฟ
  function playBeepSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'danger') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(); osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) { console.log("Audio play blocked"); }
  }

  // โหลดความจำโหมดข้ามหน้า
  const currentSystemMode = localStorage.getItem("system-mode") || "online";
  if (currentSystemMode === "compromised") {
    body.classList.add("system-compromised");
    if (modeBtn) modeBtn.textContent = "SYSTEM: COMPROMISED";
  } else {
    body.classList.remove("system-compromised");
    if (modeBtn) modeBtn.textContent = "SYSTEM: ONLINE";
  }

  // เปิดคำสั่งกดเปลี่ยนโหมดพร้อมจอกระพริบ
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      body.classList.add("system-rebooting");
      setTimeout(() => {
        if (body.classList.contains("system-compromised")) {
          body.classList.remove("system-compromised");
          modeBtn.textContent = "SYSTEM: ONLINE";
          localStorage.setItem("system-mode", "online");
          playBeepSound('online');
        } else {
          body.classList.add("system-compromised");
          modeBtn.textContent = "SYSTEM: COMPROMISED";
          localStorage.setItem("system-mode", "compromised");
          playBeepSound('danger');
        }
        body.classList.remove("system-rebooting");
      }, 400);
    });
  }
});
