const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('transaction-type');
const descInput = document.getElementById('transaction');
const dateInput = document.getElementById('date');
const addBtn = document.getElementById('add-btn');
const transactionsBody = document.getElementById('transactions-body');

const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

let transactions = [];

function updateSummary() {
  const income = transactions
    .filter(tx => tx.type === "Income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter(tx => tx.type === "Expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expense;

  totalIncomeEl.textContent = `₹${income}`;
  totalExpenseEl.textContent = `₹${expense}`;
  balanceEl.textContent = `₹${balance}`;
}

function renderTransactions() {
  transactionsBody.innerHTML = "";
  transactions.forEach((tx, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>₹${tx.amount}</td>
      <td>${tx.type}</td>
      <td>${tx.date}</td>
      <td><button onclick="deleteTransaction(${index})" style="background: #E76F51; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button></td>
    `;

    transactionsBody.appendChild(tr);
  });
}

function addTransaction() {
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;
  const desc = descInput.value;
  const date = dateInput.value;

  if (!amount || !type || !desc || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const newTransaction = {
    amount,
    type,
    desc,
    date,
  };

  transactions.push(newTransaction);
  renderTransactions();
  updateSummary();

  // Clear inputs
  amountInput.value = "";
  typeSelect.value = "";
  descInput.value = "";
  dateInput.value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateSummary();
}

addBtn.addEventListener("click", addTransaction);
