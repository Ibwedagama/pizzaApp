/* Table of Content ------------------

global variables :
@ selectedPizza
@ pizzaPrice
@ selectedSize
@ sizePrice
@ toppingPrice
@ totalPrice

DOM variables :
@ menu
@ sizes
@ toppings
@ price

functions :
@ function resetOrder
@ function availToppings
@ function getSelectedToppings
@ function priceCalc

--------------------------------------
*/

let selectedPizza = null;
let pizzaPrice = 0;
let selectedSize = 'medium';
let sizePrice = 0;
let selectedToppings = [];
let toppingPrice = 0;
let totalPrice = 0;

const menu = document.querySelectorAll('.card-footer input');
menu.forEach((pizza) => {
	pizza.addEventListener('click', function () {
		resetOrder(); // reset order everytime user choose other menu, otherwise the price will adds up
		selectedPizza = pizza.id;
		pizzaPrice = parseInt(pizza.value);
		availToppings(pizza.id); // get available toppings based on chosen pizza
		priceCalc();
	});
});

const sizes = document.querySelectorAll('.size-selector input');
sizes.forEach((size) => {
	size.addEventListener('click', function () {
		selectedSize = size.id;
		sizePrice = parseInt(size.value);
		priceCalc();
	});
});

const toppings = document.querySelectorAll('.topping-selector input');
toppings.forEach((topping) => {
	topping.addEventListener('click', function () {
		getSelectedToppings();
		priceCalc();
	});
});

const price = document.querySelector('#total-price');

function resetOrder() {
	selectedPizza = null;
	pizzaPrice = 0;
	selectedToppings = [];
	toppingPrice = 0;
}

function availToppings(id) {
	toppings.forEach((topping) => {
		topping.checked = false;
		topping.disabled = true;
		// i need to reset all checkboxes first before activate it in the next step
	});
	if (id === 'pizza1') {
		toppings.forEach((topping) => {
			if (topping.id === 'avocado' || topping.id === 'brocolli' || topping.id === 'onions' || topping.id === 'zucchini' || topping.id === 'tuna' || topping.id === 'ham') {
				topping.disabled = false;
			}
		});
	} else if (id === 'pizza2') {
		toppings.forEach((topping) => {
			if (
				topping.id === 'brocolli' ||
				topping.id === 'onions' ||
				topping.id === 'zucchini' ||
				topping.id === 'lobster' ||
				topping.id === 'oyster' ||
				topping.id === 'salmon' ||
				topping.id === 'bacon' ||
				topping.id === 'ham'
			) {
				topping.disabled = false;
			}
		});
	} else {
		toppings.forEach((topping) => {
			if (
				topping.id === 'brocolli' ||
				topping.id === 'onions' ||
				topping.id === 'zucchini' ||
				topping.id === 'tuna' ||
				topping.id === 'bacon' ||
				topping.id === 'duck' ||
				topping.id === 'ham' ||
				topping.id === 'sausage'
			) {
				topping.disabled = false;
			}
		});
	}
}

function getSelectedToppings() {
	toppingPrice = 0;
	selectedToppings = [];
	// I need to reset toppingPrice and selectedToppings, so the price will increase only with selected toppings
	toppings.forEach((topping) => {
		if (topping.checked) {
			selectedToppings.push(topping.id);
			toppingPrice += parseInt(topping.value);
		}
	});
}

function priceCalc() {
	// Update price everytime user interact with buttons/checkboxes
	if (selectedPizza !== null) {
		totalPrice = pizzaPrice + sizePrice + toppingPrice;
	} else {
		// when user not selecting the menu, price will remain 0
		totalPrice = 0;
	}
	price.innerHTML = `$ ${totalPrice}`;
}
