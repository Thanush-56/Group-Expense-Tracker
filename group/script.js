 let group = [];
    let expenses = [];

    function showTab(id) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    function addMember() {
      const input = document.getElementById('memberInput');
      const name = input.value.trim();
      if (name && !group.includes(name)) {
        group.push(name);
        input.value = '';
        updateMembersList();
      }
    }

    function updateMembersList() {
      document.getElementById('membersList').innerText = group.length ? group.join(', ') : 'None';
    }

    function addExpense() {
      const description = document.getElementById('description').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      const payer = document.getElementById('payer').value.trim();

      if (!description || isNaN(amount) || !payer || !group.includes(payer)) {
        alert('Please fill all fields correctly.');
        return;
      }

      const split = group.map(name => ({ name, amount: amount / group.length }));
      expenses.push({ description, amount, payer, split });

      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';
      document.getElementById('payer').value = '';

      updateBalances();
    }

    function updateBalances() {
      const balances = {};
      group.forEach(name => balances[name] = 0);

      expenses.forEach(({ payer, split }) => {
        split.forEach(({ name, amount }) => {
          if (name !== payer) {
            balances[name] -= amount;
            balances[payer] += amount;
          }
        });
      });

      const list = document.getElementById('balancesList');
      list.innerHTML = '';
      for (let name in balances) {
        const li = document.createElement('li');
        li.textContent = `${name}: ${balances[name] >= 0 ? '+' : ''}${balances[name].toFixed(2)}`;
        list.appendChild(li);
      }
    }