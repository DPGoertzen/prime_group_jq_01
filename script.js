$(document).ready(function(){
	// original function is wrong. Fixed it!
	// min is inclusive, max is exclusive!
	function randomNumber(min, max) {
		return (Math.random() * (max - min)) + min;
	}

	function Fruit(type, price){
		this.type = type;
		this.price = price;
	};

	var fruitArray = [];
	var priceCalc = 0;
	var playerMoney = 100;

	var grape = new Fruit("grape", Number(randomNumber(.5, 10).toFixed(2)));
	var apple = new Fruit("apple", Number(randomNumber(.5, 10).toFixed(2)));
	var banana = new Fruit("banana", Number(randomNumber(.5, 10).toFixed(2)));
	var orange = new Fruit("orange", Number(randomNumber(.5, 10).toFixed(2)));

	var grapesOwned = 0;
	var applesOwned = 0;
	var bananasOwned = 0;
	var orangesOwned = 0;


	fruitArray.push(grape, apple, banana, orange);

	var timeID = setInterval(fruitUpdater, 5000);

	function fruitUpdater(){
		for(var i = 0; i < fruitArray.length; i++){
			priceCalc = 0;
			priceCalc = fruitArray[i].price + parseFloat(randomNumber(-.5, .51));
			priceCalc = priceCalc.toFixed(2);
			priceCalc = Number(priceCalc);
			fruitArray[i].price = priceCalc;
			if(fruitArray[i].price > 9.99){
				fruitArray[i].price = 9.99;
			}else if(fruitArray[i].price < .5){
				fruitArray[i].price = .5;
			}
			$("."+fruitArray[i].type + "Price").text("Price: $" + fruitArray[i].price);
			// console.log(fruitArray[i].type + "Price");
		}
		console.log(fruitArray);
	};


	$(".grapeColor").on("click", function(){
		console.log("Clicked!");
		if(playerMoney >= fruitArray[0].price){
			playerMoney -= fruitArray[0].price;
			$(".playerMoney").text("Money: $" + playerMoney.toFixed(2));
			grapesOwned++;
			$(".grapesOwned").text("Grapes: " + grapesOwned);
		}
	});

	$(".appleColor").on("click", function(){
		if(playerMoney >= fruitArray[1].price){
			playerMoney -= fruitArray[1].price;
			$(".playerMoney").text("Money: $" + playerMoney.toFixed(2));
			applesOwned++;
			$(".applesOwned").text("Apples: " + applesOwned);
		}
	});

	$(".bananaColor").on("click", function(){
		if(playerMoney >= fruitArray[2].price){
			playerMoney -= fruitArray[2].price;
			$(".playerMoney").text("Money: $" + playerMoney.toFixed(2));
			bananasOwned++;
			$(".bananasOwned").text("Bananas: " + bananasOwned);
		}
	});

	$(".orangeColor").on("click", function(){
		if(playerMoney >= fruitArray[3].price){
			playerMoney -= fruitArray[3].price;
			$(".playerMoney").text("Money: $" + playerMoney.toFixed(2));
			orangesOwned++;
			$(".orangesOwned").text("Oranges: " + orangesOwned);
		}
	});

});
