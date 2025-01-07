window.onload = () => {
  const amountInp = document.getElementById("amount");
  const rateInp = document.getElementById("rate");
  const typeInp = document.getElementById("type");
  const startDateInp = document.getElementById("startDate");
  const endDateInp = document.getElementById("endDate");
  const periodInp = document.getElementById("period");
  const btn = document.getElementById("btn");
  const output = document.getElementById("output");

  typeInp.onchange = () => {
    if (typeInp.value == "0") {
      periodInp.disabled = true;
      periodInp.value = '';
    }
    else {
      periodInp.disabled = false;
    }
  }

  class InterestCalc {
    constructor(amount, rate, type, startDate, endDate, period) {
      this.amount = parseFloat(amount);
      this.rate = parseFloat(rate);
      this.type = parseInt(type, 10);
      this.startDate = startDate;
      this.endDate = endDate;
      this.period = eval(period); // Convert fraction to number

      this.daysBetween = this.calculateDate(this.startDate, this.endDate);

      if (this.daysBetween <= 0) {
        throw new Error("End date must be after start date.");
      }

      this.total = this.calculateAmount(
        this.amount,
        this.rate,
        this.daysBetween,
        this.type,
        this.period
      );
    }

    calculateDate(date1, date2) {
      const parseDate1 = new Date(date1);
      const parseDate2 = new Date(date2);

      const difference = parseDate2 - parseDate1;

      return difference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    }

    calculateAmount(amount, rate, days, type, period) {
      let total;
      let year = days / 365;
      if (type === 0) {
        total = (amount * rate * year) / 100 + amount;
      } else if (type === 1) {
        total = amount * (1 + rate / 100 / period) ** (year * period);
      } else {
        throw new Error("Invalid type. Use 0 for simple or 1 for compound interest.");
      }
      return total.toFixed(2); // Round to 2 decimal places
    }

    show(outputScreen, output) {
      outputScreen.innerText = `Total Amount: ${output}`;
    }
  }

  btn.onclick = () => {
    try {
      if (
        amountInp.value &&
        rateInp.value &&
        startDateInp.value &&
        endDateInp.value &&
        (typeInp.value == '0' || periodInp.value)
      ) {
        const app = new InterestCalc(
          amountInp.value,
          rateInp.value,
          typeInp.value,
          startDateInp.value,
          endDateInp.value,
          periodInp.value
        );

        app.show(output, app.total);
      } else {
        alert("Please fill in all fields.");
      }
    } catch (error) {
      output.innerText = `Error: ${error.message}`;
    }
  }


  const darkModeBtn = document.getElementById('darkModeBtn');
  const body = document.body;
  const icon = document.getElementById('icon');

  darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    if(body.classList == 'light-mode'){
      icon.setAttribute('src', 'moon.svg')
    }
    else{
      icon.setAttribute('src', 'sun.svg')
    }
  });
};