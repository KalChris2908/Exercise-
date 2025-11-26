const statsData = { users: 1342, revenue: 4870, signups: 57 };
const users = [
{name:"James Carter", status:"Active", plan:"Pro"},
{name:"Maria N.", status:"Pending", plan:"Starter"},
{name:"Tommy Blaze", status:"Inactive", plan:"Free"},
{name:"Linda G.", status:"Active", plan:"Pro"},
{name:"Sam T.", status:"Pending", plan:"Starter"}
];

// Login
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginContainer = document.getElementById("loginContainer");
const dashboard = document.getElementById("dashboard");
const loginError = document.getElementById("loginError");

loginBtn.addEventListener("click", () => {
const emailPhone = document.getElementById("emailPhone").value.trim();
const password = document.getElementById("password").value.trim();
if(!emailPhone || !password){
loginError.textContent = "Please enter both email/phone and password";
return;
}
if(emailPhone.toLowerCase() === "demo" && password === "1234"){
loginContainer.style.display = "none";
dashboard.style.display = "block";
animateStats();
} else loginError.textContent = "Invalid login credentials";
});

logoutBtn.addEventListener("click", () => {
dashboard.style.display = "none";
loginContainer.style.display = "flex";
document.getElementById("emailPhone").value = "";
document.getElementById("password").value = "";
loginError.textContent = "";
});

// Animate Stats
function animateStats(){
const usersCount = document.getElementById("usersCount");
const revenue = document.getElementById("revenue");
const signups = document.getElementById("signups");
const duration = 1000;
const startTime = performance.now();
function updateStats(now){
const progress = Math.min((now - startTime)/duration,1);
usersCount.textContent = Math.floor(statsData.usersprogress);
revenue.textContent = "$"+Math.floor(statsData.revenueprogress).toLocaleString();
signups.textContent = Math.floor(statsData.signups*progress);
if(progress < 1) requestAnimationFrame(updateStats);
}
requestAnimationFrame(updateStats);
}

// Populate Table
const tbody = document.getElementById("userTableBody");
function populateTable(){
tbody.innerHTML = "";
users.forEach(user => {
const row = document.createElement("tr");
row.innerHTML = "<td>${user.name}</td><td>${user.status}</td><td>${user.plan}</td>";
tbody.appendChild(row);
});
}
populateTable();

// Sort Table
const headers = document.querySelectorAll("thead th");
let sortOrder = 1;
headers.forEach((header,index)=>{
header.style.cursor = "pointer";
header.addEventListener("click", ()=>{
users.sort((a,b)=>{
const valA = Object.values(a)[index].toString().toLowerCase();
const valB = Object.values(b)[index].toString().toLowerCase();
return valA > valB ? sortOrder : -sortOrder;
});
sortOrder *= -1;
populateTable();
});
});

// Mock Chart
const canvas = document.getElementById("chartCanvas");
const ctx = canvas.getContext("2d");
const points = [150,120,140,90,110,70,100];
function drawChart(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.beginPath();
ctx.moveTo(10, points[0]);
for(let i=1;i<points.length;i++){
ctx.lineTo(10 + i50, points[i]);
}
ctx.strokeStyle="#2563eb";
ctx.lineWidth=3;
ctx.stroke();
points.forEach((p,i)=>{
ctx.beginPath();
ctx.arc(10+i50, p, 4, 0, Math.PI*2);
ctx.fillStyle="#2563eb";
ctx.fill();
});
}
drawChart();

// Tooltip
const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.padding = "5px 10px";
tooltip.style.background = "#111827";
tooltip.style.color = "#fff";
tooltip.style.borderRadius = "5px";
tooltip.style.fontSize = "12px";
tooltip.style.pointerEvents = "none";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

canvas.addEventListener("mousemove", (e)=>{
const rect = canvas.getBoundingClientRect();
const mouseX = e.clientX - rect.left;
const mouseY = e.clientY - rect.top;
let found = false;
points.forEach((p,i)=>{
const x = 10 + i*50;
const y = p;
if(Math.sqrt((mouseX-x)**2 + (mouseY-y)**2) < 6){
tooltip.style.left = "${e.pageX + 10}px";
tooltip.style.top = "${e.pageY + 10}px";
tooltip.textContent = "Value: ${p}";
tooltip.style.display = "block";
found = true;
}
});
if(!found) tooltip.style.display = "none";
});
