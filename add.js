// add payment
const STORAGE_KEY = "paymentsData";
let payments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Elements
const paymentForm = document.getElementById("paymentForm");
const paymentsTableBody = document.querySelector("#paymentsTable tbody");

function renderPayments() {
    paymentsTableBody.innerHTML = ""; 

    payments.forEach((payment, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${payment.name}</td>
            <td>${payment.amount}</td>
            <td>${payment.date}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        paymentsTableBody.appendChild(tr);
    });

    attachTableButtons();
}

function attachTableButtons() {
    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");

    // Edit
    editBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            const payment = payments[idx];

            // Fill form with current values
            document.getElementById("name").value = payment.name;
            document.getElementById("amount").value = payment.amount;
            document.getElementById("date").value = payment.date;

            // Remove the old entry
            payments.splice(idx, 1);
            saveAndRender();
        });
    });

    // Delete
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            payments.splice(idx, 1);
            saveAndRender();
        });
    });
}

function saveAndRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    renderPayments();
}

// Form submit
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const date = document.getElementById("date").value;

    if(name && amount && date) {
        payments.push({ name, amount: parseFloat(amount), date });
        saveAndRender();
        paymentForm.reset();
    }
});

// Initial render
renderPayments();