(() => {
  "use strict";

  function onReady(fn){
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

function initContact(){
  const form = document.getElementById("contactForm");
    if (!form) return;
  
    const note = document.getElementById("note");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const msg = String(fd.get("msg") || "").trim();
  
      if (!name || !email || !msg) {
        note.textContent = "Vui lòng nhập đầy đủ thông tin.";
        return;
      }
      note.textContent = "✅ Đã gửi (demo). Cảm ơn bạn!";
      form.reset();
    });
}

function init_bt20(){
  const search = document.getElementById('qSearch');
      const tbody = document.querySelector('#qaTable tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
  
      function norm(s) {
        return String(s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'');
      }
  
      search.addEventListener('input', () => {
        const kw = norm(search.value.trim());
        rows.forEach(r => {
          const txt = norm(r.innerText);
          r.style.display = (!kw || txt.includes(kw)) ? '' : 'none';
        });
      });
}

function init_bt21(){
  // ===== TK4 Tabs =====
      const tabBtns = document.querySelectorAll('.tab-btn');
      const tabContents = document.querySelectorAll('.tab-content');
  
      function openTab(tabName){
        tabContents.forEach(c => c.classList.remove('active'));
        tabBtns.forEach(b => b.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
      }
      tabBtns.forEach(b => b.addEventListener('click', () => openTab(b.dataset.tab)));
  
      // ===== TK5 Accordion =====
      function toggleAccordion(id, headEl){
        const content = document.getElementById(id);
        const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
        content.style.maxHeight = isOpen ? "0" : content.scrollHeight + "px";
        headEl.querySelector('span').textContent = isOpen ? "＋" : "－";
      }
      document.querySelectorAll('.acc-head').forEach(btn => {
        btn.addEventListener('click', () => toggleAccordion(btn.dataset.acc, btn));
      });
  
      // ===== K3 Password match =====
      const regForm = document.getElementById("reg-form");
      const errMsg = document.getElementById("error-msg");
      const okMsg = document.getElementById("ok-msg");
  
      regForm.addEventListener("submit", function(e){
        e.preventDefault();
        const p1 = document.getElementById("pass1").value;
        const p2 = document.getElementById("pass2").value;
  
        if (p1 !== p2){
          errMsg.textContent = "Mật khẩu không khớp!";
          okMsg.textContent = "";
          return;
        }
        if (p1.length < 6){
          errMsg.textContent = "Mật khẩu phải từ 6 ký tự trở lên!";
          okMsg.textContent = "";
          return;
        }
  
        errMsg.textContent = "";
        okMsg.textContent = "✅ Đăng ký thành công (demo).";
        regForm.reset();
      });
  
      // ===== K7 Parallax =====
      const parallax = document.getElementById("parallax-bg");
      window.addEventListener("scroll", function(){
        const scrolled = window.scrollY;
        parallax.style.transform = "translateY(" + scrolled * 0.35 + "px)";
      });
  
      // ===== K8 BMI =====
      function classifyBMI(bmi){
        if (bmi < 18.5) return "Thiếu cân";
        if (bmi < 25) return "Bình thường";
        if (bmi < 30) return "Thừa cân";
        return "Béo phì";
      }
  
      document.getElementById("bmiBtn").addEventListener("click", function(){
        const w = parseFloat(document.getElementById("weight").value);
        const h = parseFloat(document.getElementById("height").value);
        const out = document.getElementById("bmiOut");
  
        if (!Number.isFinite(w) || !Number.isFinite(h)){
          out.textContent = "Vui lòng nhập đủ cân nặng và chiều cao.";
          return;
        }
        if (w <= 0 || h <= 0){
          out.textContent = "Giá trị phải lớn hơn 0.";
          return;
        }
  
        const bmi = w / (h * h);
        out.textContent = "BMI = " + bmi.toFixed(2) + " → " + classifyBMI(bmi);
      });
  
      document.getElementById("bmiReset").addEventListener("click", function(){
        document.getElementById("weight").value = "";
        document.getElementById("height").value = "";
        document.getElementById("bmiOut").textContent = "";
      });
}

function init_bt01(){
  const track = document.getElementById("track");
      const slides = Array.from(track.children);
      const total = slides.length;
  
      const dotsEl = document.getElementById("dots");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const carousel = document.getElementById("carousel");
  
      let index = 0;
      let timer = null;
      const INTERVAL = 3000;
  
      function buildDots() {
        dotsEl.innerHTML = "";
        for (let i = 0; i < total; i++) {
          const b = document.createElement("button");
          b.className = "dot" + (i === index ? " active" : "");
          b.type = "button";
          b.addEventListener("click", () => goTo(i, true));
          dotsEl.appendChild(b);
        }
      }
  
      function update() {
        track.style.transform = `translateX(${-index * 100}%)`;
        Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle("active", i === index));
      }
  
      function goTo(newIndex, userAction=false) {
        index = (newIndex + total) % total; // chống vượt biên
        update();
        if (userAction) restartAuto();
      }
  
      function next(userAction=false) { goTo(index + 1, userAction); }
      function prev(userAction=false) { goTo(index - 1, userAction); }
  
      function startAuto() {
        stopAuto();
        timer = setInterval(() => next(false), INTERVAL);
      }
      function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
      }
      function restartAuto() { startAuto(); }
  
      nextBtn.addEventListener("click", () => next(true));
      prevBtn.addEventListener("click", () => prev(true));
  
      carousel.addEventListener("mouseenter", stopAuto);
      carousel.addEventListener("mouseleave", startAuto);
  
      window.addEventListener("resize", () => requestAnimationFrame(update));
  
      buildDots();
      update();
      startAuto();
}

function init_bt02(){
  const KEY = "tasks_v1";
      const input = document.getElementById("taskInput");
      const listEl = document.getElementById("list");
      const countEl = document.getElementById("count");
      const lsEl = document.getElementById("ls");
  
      let tasks = load();
  
      function load() {
        try {
          const raw = localStorage.getItem(KEY);
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          lsEl.textContent = "Lỗi";
          return [];
        }
      }
  
      function save() {
        localStorage.setItem(KEY, JSON.stringify(tasks));
      }
  
      function sanitize(text) {
        return text.replace(/[<>&"]/g, c => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", '"':"&quot;" }[c]));
      }
  
      function render() {
        listEl.innerHTML = "";
        countEl.textContent = tasks.length;
  
        if (tasks.length === 0) {
          const li = document.createElement("li");
          li.innerHTML = `<div class="task"><span>Chưa có công việc nào. Hãy thêm nhé 🙂</span></div>`;
          listEl.appendChild(li);
          return;
        }
  
        tasks.forEach((t, i) => {
          const li = document.createElement("li");
  
          const left = document.createElement("div");
          left.className = "task";
          left.innerHTML = `<span>${sanitize(t)}</span>`;
  
          const editBtn = document.createElement("button");
          editBtn.className = "secondary";
          editBtn.textContent = "Sửa";
          editBtn.addEventListener("click", () => editTask(i));
  
          const delBtn = document.createElement("button");
          delBtn.className = "danger";
          delBtn.textContent = "Xóa";
          delBtn.addEventListener("click", () => deleteTask(i));
  
          li.appendChild(left);
          li.appendChild(editBtn);
          li.appendChild(delBtn);
          listEl.appendChild(li);
        });
      }
  
      function addTask() {
        const value = input.value.trim();
        if (!value) {
          alert("Vui lòng nhập nội dung công việc!");
          input.focus();
          return;
        }
        tasks.push(value);
        save();
        render();
        input.value = "";
        input.focus();
      }
  
      function deleteTask(i) {
        tasks.splice(i, 1);
        save();
        render();
      }
  
      function editTask(i) {
        const current = tasks[i];
        const next = prompt("Sửa công việc:", current);
        if (next === null) return;
        const value = next.trim();
        if (!value) {
          alert("Nội dung không được để trống!");
          return;
        }
        tasks[i] = value;
        save();
        render();
      }
  
      function clearAll() {
        if (tasks.length === 0) return;
        if (!confirm("Bạn có chắc muốn xóa hết công việc?")) return;
        tasks = [];
        save();
        render();
      }
  
      document.getElementById("addBtn").addEventListener("click", addTask);
      document.getElementById("clearBtn").addEventListener("click", clearAll);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
      });
  
      render();
}

function init_bt03(){
  let secret = Math.floor(Math.random() * 100) + 1;
      let tries = 0;
      let won = false;
  
      const numEl = document.getElementById("num");
      const hintEl = document.getElementById("hint");
      const triesEl = document.getElementById("tries");
      const guessBtn = document.getElementById("guessBtn");
      const resetBtn = document.getElementById("resetBtn");
      const fireworks = document.getElementById("fireworks");
  
      function setHint(t){ hintEl.textContent = t; }
      function setTries(){ triesEl.textContent = "Số lần thử: " + tries; }
  
      function validate(n){
        if (!Number.isFinite(n)) return "Vui lòng nhập số hợp lệ.";
        if (n < 1 || n > 100) return "Chỉ được nhập số từ 1 đến 100.";
        return "";
      }
  
      function createFireworks(){
        fireworks.innerHTML = "";
        fireworks.classList.add("on");
  
        const bursts = 3;
        const sparksPerBurst = 22;
  
        for (let b = 0; b < bursts; b++){
          const baseX = Math.random() * 100;      // vw
          const baseY = 20 + Math.random() * 50;  // vh
  
          for (let i = 0; i < sparksPerBurst; i++){
            const s = document.createElement("div");
            s.className = "spark";
  
            s.style.setProperty("--x", baseX + "vw");
            s.style.setProperty("--y", baseY + "vh");
  
            const angle = (Math.PI * 2) * (i / sparksPerBurst);
            const power = 60 + Math.random() * 90;
  
            const dx = Math.cos(angle) * power;
            const dy = Math.sin(angle) * power;
  
            s.style.setProperty("--dx", dx + "px");
            s.style.setProperty("--dy", dy + "px");
            s.style.animationDelay = (b * 220) + "ms";
  
            fireworks.appendChild(s);
          }
        }
  
        setTimeout(() => fireworks.classList.remove("on"), 2200);
      }
  
      function guess(){
        if (won) return;
  
        const n = Number(numEl.value);
        const err = validate(n);
        if (err) { setHint(err); return; }
  
        tries++;
        setTries();
  
        if (n > secret) setHint("Quá cao 😅 Hãy thử số nhỏ hơn.");
        else if (n < secret) setHint("Quá thấp 🙂 Hãy thử số lớn hơn.");
        else {
          won = true;
          setHint(`🎉 Chính xác! Bạn đoán đúng sau ${tries} lần.`);
          guessBtn.disabled = true;
          createFireworks();
        }
      }
  
      function resetGame(){
        secret = Math.floor(Math.random() * 100) + 1;
        tries = 0;
        won = false;
        guessBtn.disabled = false;
        numEl.value = "";
        setHint("Đã tạo số mới. Mời bạn đoán lại!");
        setTries();
      }
  
      guessBtn.addEventListener("click", guess);
      resetBtn.addEventListener("click", resetGame);
      numEl.addEventListener("keydown", (e) => { if (e.key === "Enter") guess(); });
  
      setTries();
}


  onReady(() => {
    // Always safe: each init has its own guards if needed
    initContact();

    const page = document.body && document.body.dataset ? document.body.dataset.page : "";
    switch(page){
      case "bt01": init_bt01(); break;
      case "bt02": init_bt02(); break;
      case "bt03": init_bt03(); break;
      case "bt20": init_bt20(); break;
      case "bt21": init_bt21(); break;
      default: break;
    }
  });
})(); 
