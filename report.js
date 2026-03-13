// ===============================
// REPORTS JS – CHARTS
// ===============================

const STORAGE_KEY = "paymentsData";
let payments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Utilities: group payments by month
function groupByMonth(data) {
    const result = {};
    data.forEach(p => {
        const date = new Date(p.date);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (!result[month]) result[month] = [];
        result[month].push(p);
    });
    return result;
}

const grouped = groupByMonth(payments);

// Data for charts
const months = Object.keys(grouped).sort();
const paymentsCount = months.map(m => grouped[m].length);
const amountSum = months.map(m => grouped[m].reduce((sum, p) => sum + Number(p.amount), 0));

// Payments per month chart
const ctx1 = document.getElementById('paymentsChart').getContext('2d');
new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: 'Payments per Month',
            data: paymentsCount,
            backgroundColor: '#0f766e'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Amount per month chart
const ctx2 = document.getElementById('amountChart').getContext('2d');
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Total Amount per Month',
            data: amountSum,
            fill: false,
            borderColor: '#0f766e',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Back to Dashboard
document.getElementById("goDashboard").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});