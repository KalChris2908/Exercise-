// Mock login user
const mockUser = { emailPhone: "user@gmail.com", password: "123456" };

// Login Elements
const loginContainer = document.getElementById("loginContainer");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");

loginBtn.addEventListener("click", () => {
  const input = document.getElementById("emailPhone").value;
  const pass = document.getElementById("password").value;

  if ((input === mockUser.emailPhone || input === "08123456789") && pass === mockUser.password) {
    loginContainer.style.display = "none";
    dashboard.style.display = "block";
    initDashboard();
  } else {
    loginError.textContent = "Invalid credentials.";
  }
});

logoutBtn.addEventListener("click", () => {
  dashboard.style.display = "none";
  loginContainer.style.display = "flex";
});

// Dashboard Data & Animation
function initDashboard() {
  const statsData = { users: 1342, revenue: 4870, signups: 57 };
  const users = [
    {name:"James Carter", status:"Active", plan:"Pro"},
    {name:"Maria N.", status:"Pending", plan:"Starter"},
    {name:"Tommy Blaze", status:"Inactive", plan:"Free"},
    {name:"Linda G.", status:"Active", plan:"Pro"},
    {name:"Sam T.", status:"Pending", plan:"Starter"}
  ];

  animateCount("usersCount", statsData.users);
  animateCount("revenue", statsData.revenue, "$");
  animateCount("signups", statsData.signups);

  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.name}</td><td>${user.status}</td><td>${user.plan}</td>`;
    tbody.appendChild(row);
  });

  drawChart();
}

// Animated Counter
function animateCount(id, endValue, prefix="") {
  const el = document.getElementById(id);
  let start = 0;
  const duration = 1000;
  const step = Math.ceil(endValue / (duration / 16));
  const interval = setInterval(() => {
    start += step;
    if(start >= endValue){
      start = endValue;
      clearInterval(interval);
    }
    el.textContent = prefix + start.toLocaleString();
  },16);
}

// Interactive Chart
function drawChart() {
  const canvas = document.getElementById("chartCanvas");
  const ctx = canvas.getContext("2d");
  const points = [150,120,140,90,110,70,100];

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.moveTo(10, points[0]);
  for(let i=1;i<points.length;i++){
    ctx.lineTo(10 + i*50, points[i]);
  }
  ctx.strokeStyle="#2563eb";
  ctx.lineWidth=3;
  ctx.stroke();

  // Draw points and hover tooltip
  points.forEach((p,i)=>{
    ctx.beginPath();
    ctx.arc(10+i*50, p, 6, 0, Math.PI*2);
    ctx.fillStyle="#2563eb";
    ctx.fill();
  });

  // Optional: You can add mouse hover tooltips using canvas mousemove events
                     }
