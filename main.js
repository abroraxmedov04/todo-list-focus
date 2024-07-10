// form controls

// navigation
// - document.forms.my; && document.forms[0] // this way to get a form from html with the name or just get formswith it indexed position

// const form = document.forms.my;
// const elem = form.elements.one;

/* <form name="form" id="form">
  <input type="text" value="1" name="search" id="input" />
</form>; */

// let form = document.querySelector("#form");
// let input = form.querySelector("#input");

// let sameform = document.forms.form;
// let sameInput = sameform.elements.search;

// console.log(sameform);
// console.log(sameInput);

// working with select options

/* <select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>; */

// select.options[1].selected = true;
// select.selectedIndex = 1;
// select.value = "banana";

// let selected = Array.from(select.options)
//   .filter((option) => option.selected)
//   .map((option) => option.value);

// console.log(selected);

// let choosed = Array.from(genres.options).filter((option) => option.selected);

// let newOption = new Option("clissic", "classic", true, true);

// genres.appendChild(newOption);

// console.log(Array.from(genres.options).map((option) => option.selected));

// focus and blur

// focus => when user focused
// onblur => when loses focus

// input.onblur = function () {
//   if (!input.value.includes("@")) {
//     input.classList.add("invalid");
//     error.innerHTML = "Please enter a correct email.";
//   }
// };

// input.onfocus = function () {
//   if (this.classList.contains("invalid")) {
//     this.classList.remove("invalid");
//     error.innerHTML = "";
//   }
// };

// input.onblur = function () {
//   if (!this.value.includes("@")) {
//     this.classList.add("error");
//     input.focus();
//   } else {
//     this.classList.remove("error");
//   }
// };
