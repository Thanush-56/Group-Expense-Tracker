let currentGroup = null;

function loadGroups() {
  const groups = JSON.parse(localStorage.getItem("groups")) || {};
  const groupList = document.getElementById("group-list");
  groupList.innerHTML = '';

  Object.keys(groups).forEach(group => {
    const btn = document.createElement("button");
    btn.textContent = group;
    btn.onclick = () => selectGroup(group);
    groupList.appendChild(btn);
  });
}

function createGroup() {
  const name = document.getElementById("group-name").value.trim();
  if (!name) return alert("Enter a group name");

  let groups = JSON.parse(localStorage.getItem("groups")) || {};
  if (groups[name]) return alert("Group already exists!");

  groups[name] = { members: [], expenses: [] };
  localStorage.setItem("groups", JSON.stringify(groups));
  loadGroups();
  document.getElementById("group-name").value = '';
}

function selectGroup(name) {
  currentGroup = name;
  document.getElementById("member-management").classList.remove("hidden");
  document.getElementById("expense-section").classList.remove("hidden");
  document.getElementById("balance-section").classList.remove("hidden");
  document.getElementById("settlement-section").classList.remove("hidden");
  document.getElementById("current-group-name").textContent = name;
  renderMembers();
  updateExpenseUI();
  renderBalances();
  suggestSettlements();
}

function addMember() {
  const member = document.getElementById("member-name").value.trim();
  if (!member) return;

  const groups = JSON.parse(localStorage.getItem("groups"));
  const group = groups[currentGroup];
  if (group.members.includes(member)) return alert("Member already exists!");

  group.members.push(member);
  localStorage.setItem("groups", JSON.stringify(groups));
  renderMembers();
  updateExpenseUI();
  document.getElementById("member-name").value = '';
}

function renderMembers() {
  const groups = JSON.parse(localStorage.getItem("groups"));
  const members = groups[currentGroup].members;

  const memberList = document.getElementById("member-list");
  memberList.innerHTML = '';

  members.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    memberList.appendChild(li);
  });
}

function updateExpenseUI() {
  const payerSelect = document.getElementById("expense-payer");
  const splitInputs = document.getElementById("split-inputs");

  const groupData = JSON.parse(localStorage.getItem("groups"))[currentGroup];
  payerSelect.innerHTML = '';
  splitInputs.innerHTML = '';

  groupData.members.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    payerSelect.appendChild(option);

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.placeholder = `${name}'s share`;
    input.dataset.member = name;
    splitInputs.appendChild(input);
  });
}

document.getElementById("split-equally").addEventListener("change", function () {
  const splitInputs = document.getElementById("split-inputs");
  splitInputs.classList.toggle("hidden", this.checked);
});

function addExpense() {
  const desc = document.getElementById("expense-description").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const payer = document.getElementById("expense-payer").value;
  const category = document.getElementById("expense-category").value;
  const isEqual = document.getElementById("split-equally").checked;

  if (!desc || isNaN(amount) || amount <= 0) return alert("Invalid inputs");

  const groups = JSON.parse(localStorage.getItem("groups"));
  const group = groups[currentGroup];

  let split = {};
  if (isEqual) {
    const share = +(amount / group.members.length).toFixed(2);
    group.members.forEach(m => split[m] = share);
  } else {
    const inputs = document.querySelectorAll('#split-inputs input');
    inputs.forEach(input => {
      const member = input.dataset.member;
      const val = parseFloat(input.value);
      if (!isNaN(val) && val >= 0) split[member] = val;
    });

    const totalSplit = Object.values(split).reduce((a, b) => a + b, 0);
    if (Math.abs(totalSplit - amount) > 0.01) {
      return alert("Split amounts must add up to total");
    }
  }

  group.expenses.push({ desc, amount, category, payer, split });
  localStorage.setItem("groups", JSON.stringify(groups));
  document.getElementById("expense-description").value = '';
  document.getElementById("expense-amount").value = '';
  renderBalances();
  suggestSettlements();
}

function renderBalances() {
  const group = JSON.parse(localStorage.getItem("groups"))[currentGroup];
  const members = group.members;
  const balances = {};

  members.forEach(m => balances[m] = 0);

  group.expenses.forEach(exp => {
    members.forEach(m => {
      if (m in exp.split) balances[m] -= exp.split[m];
    });
    balances[exp.payer] += exp.amount;
  });

  const list = document.getElementById("balance-list");
  list.innerHTML = '';
  for (let m in balances) {
    const li = document.createElement("li");
    const b = balances[m];
    li.textContent = `${m} ${b > 0 ? 'gets back' : 'owes'} $${Math.abs(b).toFixed(2)}`;
    li.style.color = b > 0 ? "#9aff9a" : "#ffb3b3";
    list.appendChild(li);
  }
}

function suggestSettlements() {
  const group = JSON.parse(localStorage.getItem("groups"))[currentGroup];
  const members = group.members;
  const balances = {};

  members.forEach(m => balances[m] = 0);

  group.expenses.forEach(exp => {
    members.forEach(m => {
      if (m in exp.split) balances[m] -= exp.split[m];
    });
    balances[exp.payer] += exp.amount;
  });

  const debtors = [], creditors = [];
  for (let m in balances) {
    const amt = +balances[m].toFixed(2);
    if (amt < 0) debtors.push({ name: m, amount: -amt });
    else if (amt > 0) creditors.push({ name: m, amount: amt });
  }

  const settlements = [];
  while (debtors.length && creditors.length) {
    const debtor = debtors[0];
    const creditor = creditors[0];
    const payment = Math.min(debtor.amount, creditor.amount);

    settlements.push(`${debtor.name} ➡️ ${creditor.name}: $${payment.toFixed(2)}`);
    debtor.amount -= payment;
    creditor.amount -= payment;
    if (debtor.amount < 0.01) debtors.shift();
    if (creditor.amount < 0.01) creditors.shift();
  }

  const ul = document.getElementById("settlement-suggestions");
  ul.innerHTML = "";
  settlements.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
}

function settleAll() {
  const groups = JSON.parse(localStorage.getItem("groups"));
  groups[currentGroup].expenses = [];
  localStorage.setItem("groups", JSON.stringify(groups));
  renderBalances();
  suggestSettlements();
  showToast("All expenses settled!");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2000);
}

window.onload = loadGroups;
