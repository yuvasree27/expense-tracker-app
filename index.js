let enter_budget = document.getElementById("enter_budget");
let budget_amt = document.getElementById("budget_amt");
let enter_exp = document.getElementById("enter_exp");
let exp_name = document.getElementById("exp_name");
let exp_amt = document.getElementById("exp_amt");
let bud = document.getElementById("bud");
let exp = document.getElementById("exp");
let balance = document.getElementById("balance");
let tbody = document.getElementById("tbody");

const updateStorage = (type, payload) => {
    let userData = JSON.parse(localStorage.getItem("user")) || { budget: 0, expenses: [] };
    switch (type) {
        case "updateBudget":
            userData.budget = payload.budget;
            break;
        case "addExpense":
            userData.expenses.push(payload);
            break;
        case "deleteExpense":
            userData.expenses = userData.expenses.filter(exp => exp.name !== payload.name);
            break;
    }
    localStorage.setItem("user", JSON.stringify(userData));
    loadUserData();
};

const loadUserData = () => {
    let userData = JSON.parse(localStorage.getItem("user")) || { budget: 0, expenses: [] };
    bud.innerText = `$${userData.budget}`;
    let totalExpenses = userData.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    exp.innerText = `$${totalExpenses}`;
    balance.innerText = `$${userData.budget - totalExpenses}`;
    tbody.innerHTML = userData.expenses.map(exp => `
        <tr>
            <td>${exp.name}</td>
            <td>$${exp.amount}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteExpense('${exp.name}')">Delete</button></td>
        </tr>
    `).join("");
};

enter_budget.addEventListener("submit", e => {
    e.preventDefault();
    updateStorage("updateBudget", { budget: Number(budget_amt.value) });
    enter_budget.reset();
});

enter_exp.addEventListener("submit", e => {
    e.preventDefault();
    updateStorage("addExpense", { name: exp_name.value, amount: Number(exp_amt.value) });
    enter_exp.reset();
});

const deleteExpense = name => updateStorage("deleteExpense", { name });

document.addEventListener("DOMContentLoaded", loadUserData);
