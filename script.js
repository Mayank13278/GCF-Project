let users = JSON.parse(localStorage.getItem('users')) || [];

function selectPlan(element, plan){
  localStorage.setItem("selectedPlan", plan);

  document.querySelectorAll(".plan-card").forEach(card=>{
    card.classList.remove("active");
  });

  element.classList.add("active");

  showToast(plan + " Plan Selected 🚀");

  // redirect after short delay
  setTimeout(()=>{
    window.location = "register.html";
  }, 1000);
}

/* REGISTER */
async function register(e){
  e.preventDefault();

  let plan = localStorage.getItem("selectedPlan");

  try {
    let res = await fetch("http://localhost:3000/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        plan: plan
      })
    });

    let data = await res.json();

    if(data.success){
      alert("Registration Successful 🚀");
      window.location = "login.html";
    } else {
      alert(data.message || "User already exists ❌");
    }

  } catch(err){
    alert("Server not running ❌");
    console.error(err);
  }
}
/* LOGIN */
function login(e) {
  e.preventDefault();

  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;

  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Credentials");
  }
}

/* LOAD DASHBOARD */
function loadDashboard() {
  let user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById('userName').innerText = user.name;
  document.getElementById('userPlan').innerText = user.plan || "None";

  loadMembers();
}

/* MEMBERS */
function loadMembers() {
  let box = document.getElementById('members');
  box.innerHTML = '';

  users.forEach(u => {
    let div = document.createElement('div');
    div.innerText = u.name + " (" + (u.plan || "No Plan") + ")";
    box.appendChild(div);
  });
}

/* LOGOUT */
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html";
}
const API = "http://localhost:3000";

let selectedPlan = "";

function selectPlan(plan){
  selectedPlan = plan;
  alert(plan + " selected");
}

async function register(e){
  e.preventDefault();

  let res = await fetch(API+"/register", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      plan:selectedPlan
    })
  });

  let data = await res.json();
  alert(data.success ? "Registered" : data.message);
}

async function login(e){
  e.preventDefault();

  let res = await fetch(API+"/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  let data = await res.json();

  if(data.success){
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location = "dashboard.html";
  } else alert("Invalid");
}

async function loadDashboard(){
  let user = JSON.parse(localStorage.getItem("user"));

  userName.innerText = user.name;
  userPlan.innerText = user.plan;

  let res = await fetch(API+"/users");
  let users = await res.json();

  let box = document.getElementById("members");

  users.forEach(u=>{
    let div = document.createElement("div");
    div.innerText = u.name + " ("+u.plan+")";
    box.appendChild(div);
  });
}

function logout(){
  localStorage.removeItem("user");
  window.location = "login.html";
}
function togglePassword(id){
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}
if(window.location.pathname.includes("register.html")){
  let plan = localStorage.getItem("selectedPlan");
  if(plan){
    document.getElementById("selectedPlanText").innerText = "Selected Plan: " + plan;
  }
}
function startNow(){
  const section = document.getElementById("plans");

  section.scrollIntoView({ behavior: "smooth" });

  // highlight effect
  section.style.boxShadow = "0 0 40px #00f2fe";

  setTimeout(()=>{
    section.style.boxShadow = "none";
  },1500);
}
function showService(type){
  const box = document.getElementById("serviceInfo");

  let content = "";

  if(type === "spam"){
    content = "Detects and blocks spam calls using AI filtering system.";
  }
  else if(type === "fraud"){
    content = "Real-time fraud alerts to protect your number from scams.";
  }
  else if(type === "tracking"){
    content = "Track suspicious numbers and activities instantly.";
  }
  else if(type === "alert"){
    content = "Emergency alerts sent to your contacts instantly.";
  }

  box.innerText = content;
  box.style.opacity = "1";
}
function selectPlan(el, plan){
  // Save selected plan
  localStorage.setItem("selectedPlan", plan);

  // Optional: highlight UI (looks better)
  document.querySelectorAll(".plan-card").forEach(card=>{
    card.classList.remove("active");
  });
  el.classList.add("active");

  // Redirect to login page
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
}
function scrollToFeatures(){
  document.getElementById("features").scrollIntoView({behavior:"smooth"});
}
function animateCounters(){
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter=>{
    let target = +counter.getAttribute('data-target');
    let count = 0;

    let update = ()=>{
      let increment = target / 100;
      count += increment;

      if(count < target){
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
}

window.onload = animateCounters;
function fakeThreatFeed(){
  const messages = [
    "Scanning incoming call...",
    "Spam detected from +91XXXXX",
    "Blocking suspicious activity...",
    "User protected successfully",
    "Fraud attempt prevented"
  ];

  const box = document.getElementById("threatBox");

  setInterval(()=>{
    let msg = messages[Math.floor(Math.random()*messages.length)];
    let div = document.createElement("div");
    div.innerText = "> " + msg;

    box.prepend(div);

    if(box.childNodes.length > 6){
      box.removeChild(box.lastChild);
    }
  },2000);
}

fakeThreatFeed();
function loadActivity(){
  const logs = [
    "Spam call blocked",
    "Fraud alert triggered",
    "Location tracked",
    "Security scan completed"
  ];

  let box = document.getElementById("activityLog");

  setInterval(()=>{
    let log = logs[Math.floor(Math.random()*logs.length)];
    let div = document.createElement("div");
    div.innerText = log;
    box.prepend(div);

    if(box.childNodes.length > 5){
      box.removeChild(box.lastChild);
    }
  },2000);
}

loadActivity();
function register(e){
  e.preventDefault();
  alert("Form Working ✅");
}
