const incomeTitle = document.querySelector("#incomeTitle");
const incomeValue = document.querySelector("#incomeValue");
const incomeForm = document.querySelector("#incomeForm");
const incomeList = document.querySelector("#incomesList");
const incomeAcc = document.querySelector("#incomesValue");

const expenseTitle = document.querySelector("#expenseTitle");
const expenseValue = document.querySelector("#expenseValue");
const expenseForm = document.querySelector("#expenseForm");
const expenseList = document.querySelector("#expensesList");
const expenseAcc = document.querySelector("#expensesValue");

const modal = document.querySelector("#modal");
const modalBtn = document.querySelector("#modalBtn");

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
    li.id = element.id;
    li.classList = "flex flex--space-between budget__list__item";
    const text = document.createElement("p");
    text.innerText = element.title;
    const amount = document.createElement("span");
    amount.innerText = element.amount;
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add(
      "budget__list__item__button",
      "budget__list__item__button--edit"
    );
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add(
      "budget__list__item__button",
      "budget__list__item__button--delete"
    );
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.classList.add(
      "budget__list__item__button",
      "budget__list__item__button--save"
    );

    editBtn.addEventListener("click", () => {
      text.setAttribute("contenteditable", "true");
      amount.setAttribute("contenteditable", "true");
      li.removeChild(editBtn);
      li.appendChild(saveBtn);
    });
    deleteBtn.addEventListener("click", () => {
      const indexToRemove1 = incomes.findIndex(
        (item) => item.id === element.id
      );
      incomes.splice(indexToRemove1, 1);

      renderIncomeList();
    });

    saveBtn.addEventListener("click", () => {
      if (
        typeof Number(amount.textContent) === "number" &&
        Number(amount.textContent) > 0
      ) {
        incomes.map((item) => {
          if (item.id === element.id) {
            item.amount = Number(amount.textContent);
            item.title = text.textContent;
          }
        });
        renderIncomeList();
      } else {
        modal.style.display = "flex";
        modalBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }
    });
    li.appendChild(text);
    li.appendChild(amount);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    incomeList.appendChild(li);
    incomeValue.value = "";
    incomeTitle.value = "";
  });

  calculateSum();
};

// Expenses

const addExpense = (event) => {
  event.preventDefault();
  const newExpense = {
    title: expenseTitle.value,
    amount: expenseValue.value,
    id: Math.random(),
  };
  expenses.push(newExpense);
  renderExpenseList();
};

expenseForm.addEventListener("submit", addExpense);

const renderExpenseList = () => {
  expenseList.innerHTML = "";
  expenses.forEach((element) => {
    const li = document.createElement("li");
    li.id = element.id;
    li.classList = "flex flex--space-between budget__list__item ";
    const text = document.createElement("p");
    text.innerText = element.title;
    text.style.border = "1px solid black";
    const amount = document.createElement("span");
    amount.innerText = element.amount;
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add(
      "budget__list__item__button",
      "budget__list__item__button--edit"
    );
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add(
      "budget__list__item__button",
      "budget__list__item__button--delete"
    );
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.classList.add(
      "budget__list__item__button",
      "budget__list__item__button--save"
    );

    editBtn.addEventListener("click", () => {
      text.setAttribute("contenteditable", "true");
      amount.setAttribute("contenteditable", "true");
      li.removeChild(editBtn);
      li.appendChild(saveBtn);
    });
    deleteBtn.addEventListener("click", () => {
      const indexToRemove = expenses.findIndex(
        (item) => item.id === element.id
      );
      expenses.splice(indexToRemove, 1);

      renderExpenseList();
    });

    saveBtn.addEventListener("click", () => {
      if (
        typeof Number(amount.textContent) === "number" &&
        Number(amount.textContent) > 0
      ) {
        expenses.map((item) => {
          if (item.id === element.id) {
            item.amount = Number(amount.textContent);
            item.title = text.textContent;
          }
        });
        renderExpenseList();
      } else {
        modal.style.display = "flex";
        modalBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }
    });
    expenseList.appendChild(li);
    li.appendChild(text);
    li.appendChild(amount);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    expenseValue.value = "";
    expenseTitle.value = "";
  });

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
