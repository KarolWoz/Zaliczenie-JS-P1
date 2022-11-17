// Przychody

const incomeTitle = document.querySelector("#incomeTitle");
const incomeValue = document.querySelector("#incomeValue");
const incomeForm = document.querySelector("#incomeForm");
const incomeList = document.querySelector("#incomesList");
const incomeAcc = document.querySelector("#incomesValue");
// Wydatki

const expenseTitle = document.querySelector("#expenseTitle");
const expenseValue = document.querySelector("#expenseValue");
const expenseForm = document.querySelector("#expenseForm");
const expenseList = document.querySelector("#expensesList");
const expenseAcc = document.querySelector("#expensesValue");

const budgetValue = document.querySelector("#budgetValue");
const budgetState = document.querySelector("#budgetState");

const incomes = [];
const expenses = [];

// Incomes

const addIncome = (event) => {
  event.preventDefault();
  const newIncome = {
    title: incomeTitle.value,
    amount: incomeValue.value,
    id: Math.random(),
  };

  incomes.push(newIncome);
  renderIncomeList();
};

incomeForm.addEventListener("submit", addIncome);
const renderIncomeList = () => {
  incomeList.innerHTML = "";
  incomes.forEach((element) => {
    const li = document.createElement("li");
    li.classList = "flex flex--space-between budget__list__item";
    const text = document.createElement("p");
    text.innerText = element.title;
    const amount = document.createElement("span");
    amount.innerText = element.amount;
    li.appendChild(text);
    li.appendChild(amount);
    incomeList.appendChild(li);
    incomeValue.value = "";
    incomeTitle.value = "";
  });
  // updateIncomeSum();
  // budgetCalc();
  calculateSum();
};

// Expenses

const addExpense = (event) => {
  event.preventDefault();
  const newExpense = {
    title: expenseTitle.value,
    amount: expenseValue.value,
    id: Math.random,
  };
  expenses.push(newExpense);
  renderExpenseList();
};

// const edit = () => {
//   text.setAttribute("contenteditable", "true");
//   amount.setAttribute("conteneditable", "true");
// };
expenseForm.addEventListener("submit", addExpense);

const renderExpenseList = () => {
  expenseList.innerHTML = "";
  expenses.forEach((element) => {
    const li = document.createElement("li");
    li.classList = "flex flex--space-between budget__list__item";
    const text = document.createElement("p");
    text.innerText = element.title;
    const amount = document.createElement("span");
    amount.innerText = element.amount;
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    // editBtn.addEventListener("click", () => {
    //   text.setAttribute("contenteditable", "true");
    //   amount.setAttribute("contenteditable", "true");
    //   const saveBtn = document.createElement("button");
    //   saveBtn.innerText = "Save";
    //   saveBtn
    // });
    expenseList.appendChild(li);
    li.appendChild(text);
    li.appendChild(amount);
    li.appendChild(editBtn);
    // li.appendChild(saveBtn);
    expenseValue.value = "";
    expenseTitle.value = "";
  });

  // updateExpenseSum();
  // budgetCalc();
  calculateSum();
};

const calculateSum = () => {
  const expenseSum = expenses.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);
  expenseAcc.innerHTML = expenseSum;

  const incomeSum = incomes.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);
  incomeAcc.innerHTML = incomeSum;

  const difference = budgetCalc(expenseSum, incomeSum);
  budgetText(incomeSum, expenseSum, difference);
};

const budgetCalc = (expenseSum, incomeSum) => {
  let updateBudgetValue = incomeSum - expenseSum;
  return updateBudgetValue;
};

budgetCalc();

const budgetText = (incomeSum, expenseSum, difference) => {
  if (incomeSum > expenseSum) {
    budgetState.innerHTML = `<p class="text--center">
    You can still spend <span id="budgetValue">${difference}</span> PLN
  </p>`;
  } else if (incomeSum < expenseSum) {
    budgetState.innerHTML = `<p class="text--center">
    You are under the budget <span id="budgetValue">${difference}</span> PLN
  </p>`;
  } else if (difference === 0) {
    budgetState.innerHTML = `<p class="text--center">
    You are broke <span id="budgetValue">0</span> PLN
  </p>`;
  }
};
