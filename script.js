const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('transaction-type');
const transactionInput = document.getElementById('transaction');
const dateInput = document.getElementById('date');
const addBtn = document.getElementById('add-btn');
const transactionsBody = document.getElementById('transactions-body');

const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === 'Income') {
      income += t.amount;
    } else if (t.type === 'Expense') {
      expense += t.amount;
    }
  });

  totalIncomeEl.textContent = `₹${income}`;
  totalExpenseEl.textContent = `₹${expense}`;
  balanceEl.textContent = `₹${income - expense}`;
}

function renderTransactions() {
  transactionsBody.innerHTML = '';
  transactions.forEach((t, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>₹${t.amount}</td>
      <td>${t.type}</td>
      <td>${t.description}</td>
      <td>${t.date}</td>
      <td><button onclick="deleteTransaction(${index})">Delete</button></td>
    `;
    transactionsBody.appendChild(row);
  });
  updateSummary();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
}

if (addBtn) {
  addBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const description = transactionInput.value;
    const date = dateInput.value;

    if (!amount || !type || !description || !date) {
      alert('Please fill all fields');
      return;
    }

    transactions.push({ amount, type, description, date });
    saveAndRender();

    amountInput.value = '';
    typeSelect.value = '';
    transactionInput.value = '';
    dateInput.value = '';
  });
  renderTransactions();
}
