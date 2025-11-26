// Sample Data
const statsData = { users: 1342, revenue: 4870, signups: 57 };
const users = [
  {name:"James Carter", status:"Active", plan:"Pro"},
  {name:"Maria N.", status:"Pending", plan:"Starter"},
  {name:"Tommy Blaze", status:"Inactive", plan:"Free"},
  {name:"Linda G.", status:"Active", plan:"Pro"},
  {name:"Sam T.", status:"Pending", plan:"Starter"}
];

// Update Stats
document.getElementById("usersCount").textContent = statsData.users;
document.getElementById("revenue").textContent = `$${statsData.revenue.toLocaleString()}`;
document.getElementById("signups").textContent = statsData.signups;

// Populate Table
const tbody = document.getElementById("userTableBody");
users.forEach(user => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${user.name}</td><td>${user.status}</td><td>${user.plan}</td>`;
  tbody.appendChild(row);
});

// Mock Chart
const canvas = document.getElementById("chartCanvas");
const ctx = canvas.getContext("2d");
const points = [150,120,140,90,110,70,100];
ctx.beginPath();
ctx.moveTo(10, points[0]);
for(let i=1;i<points.length;i++){
  ctx.lineTo(10 + i*50, points[i]);
}
ctx.strokeStyle="#2563eb";
ctx.lineWidth=3;
ctx.stroke();

// Add points
points.forEach((p,i)=>{
  ctx.beginPath();
  ctx.arc(10+i*50, p, 4, 0, Math.PI*2);
  ctx.fillStyle="#2563eb";
  ctx.fill();
});
