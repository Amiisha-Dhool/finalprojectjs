
// DASHBOARD JS

const STORAGE_KEY = "paymentsData";
let payments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const totalPaymentsEl = document.getElementById("totalPayments");
const totalAmountEl = document.getElementById("totalAmount");

const goAddBtn = document.getElementById("goAdd");
const goReportBtn = document.getElementById("goReport");

// Update stats
function updateStats() {
    totalPaymentsEl.textContent = payments.length;
    totalAmountEl.textContent = payments.reduce((sum, p) => sum + Number(p.amount), 0);
}

// Button navigation
goAddBtn.addEventListener("click", () => window.location.href = "add.html");
goReportBtn.addEventListener("click", () => window.location.href = "report.html"); // Placeholder

// Initial
updateStats();