const formEl = document.querySelector("form");
const nameInputEl = document.querySelector("#input-name input");
const emailInputEl = document.querySelector("#input-email input");
const passInputEl = document.querySelector("#input-pass input");
const btn = document.querySelector("#btn button");
let emailVal = false;
let passVal = false;
let nameVal = false;
function errorHandler(message, type) {
  const errorEl = document.querySelector(`.${type}-val`);
  errorEl.textContent = message;
}

function nameValidation() {
  nameInputEl.addEventListener("keyup", () => {
    const name = nameInputEl.value;
    if (name.length > 0) {
      nameVal = true;
      errorHandler(``, "name");
    } else {
      nameVal = false;
      errorHandler(`Please Enter Your name`, "name");
    }
    buttonHandler();
  });
}
function emailValidation() {
  emailInputEl.addEventListener("keyup", () => {
    const email = emailInputEl.value;
    if (!email.includes("@")) {
      errorHandler("Please enter valid email.", "email");
      emailVal = false;
    } else {
      errorHandler("", "email");
      emailVal = true;
    }
    buttonHandler();
  });
}
//  in those two events we chech if both are vaild we enabled a button else disable it.
function passValidation() {
  passInputEl.addEventListener("keyup", () => {
    const pass = passInputEl.value;
    if (pass.length < 8) {
      errorHandler("Please enter 8 or more charecters.", "password");
      passVal = false;
    } else {
      errorHandler("", "password");
      passVal = true;
    }
    buttonHandler();
  });
}
// for first time when we click button submit we get a message
// we shouid fill all fields
function form(e) {
  e.preventDefault();
  const [name, email, pass] = [
    nameInputEl.value,
    emailInputEl.value,
    passInputEl.value,
  ];
  const valLoop = [name, email, pass];
  valLoop.forEach((e, index) => {
    if (e.length === 0) {
      if (index === 0) nameVal = false;
      if (index === 1) emailVal = false;
      if (index === 2) passVal = false;
      let type = index === 0 ? "name" : index === 1 ? "email" : "password";
      errorHandler(`Please Enter Your ${type}`, type);
      btn.disabled = true;
      setTimeout(() => {
        buttonHandler();
      }, 3000);
    } else {
      nameVal = true;
    }
  });

  if (emailVal && nameVal && passVal) {
    console.log("Correct Validation");
  }
  buttonHandler();
}
function buttonHandler() {
  if (emailVal && nameVal && passVal) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}
nameValidation();
emailValidation();
passValidation();
formEl.addEventListener("submit", form);
