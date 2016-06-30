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

	var grapeCount=0;
	var appleCount=0;
	var bananaCount=0;
	var orangeCount=0;
	var grapeMoney=0;
	var appleMoney=0;
	var bananaMoney=0;
	var orangeMoney=0;
	var grapeAvg=0;
	var appleAvg=0;
	var bananaAvg=0;
	var orangeAvg=0;

	var gameEnd = false;

	fruitArray.push(grape, apple, banana, orange);


	var timeID = 0;
	var secondID = 0;
	var timeForGame = 30000;
	// sets up our timer, currently 5 seconds.
	// var timeID = setInterval(fruitUpdater, 5000);
	// setInterval(gameOver, 30000);

	$(".startBut").on("click", function(){
		fruitUpdater();
		timeID = setInterval(fruitUpdater, 5000);
		secondID = setInterval(timeDisplay, 1000);
		setTimeout(gameOver, timeForGame);

	});

	function timeDisplay(){
		if(timeForGame > 0){
			timeForGame -= 1000;
			$(".timer").text((timeForGame/1000) + " seconds remaining");
		}
	}

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
	};

	// remember to change this to 300000 at turn in


	function gameOver(){
		clearInterval(timeID);
		clearInterval(secondID);

		playerMoney += ((grapeCount * grape.price) + (appleCount * apple.price) + (bananaCount * banana.price) + (orangeCount * orange.price));
		$("#playerMoney").text(playerMoney.toFixed(2))
		$("#grapesOwned").text(0);
		$("#applesOwned").text(0);
		$("#bananasOwned").text(0);
		$("#orangesOwned").text(0);
		$("h4").text("Game Over! You made $" + (playerMoney - 100).toFixed(2));
		$(".startBut").remove();
		$("header").append("<button class=\"restart\">Restart</button>");
		$(".fruitBox").removeClass("grapeColor").addClass("colorHighlight");
		$(".fruitBox").removeClass("appleColor").addClass("colorHighlight");
		$(".fruitBox").removeClass("bananaColor").addClass("colorHighlight");
		$(".fruitBox").removeClass("orangeColor").addClass("colorHighlight");
		$("#grapeBut").remove();
		$("#appleBut").remove();
		$("#bananaBut").remove();
		$("#orangeBut").remove();

		$(".restart").on("click", function(){
			location.reload();
		});
		gameEnd = true;
	}



// Begin Trent Code

//purchasing Buttons
$(".grapeColor").on("click",function(event){
    event.preventDefault();
    if(playerMoney>=grape.price && !gameEnd){
        playerMoney-=grape.price;
        grapeMoney+=grape.price;
        grapeCount++;
        grapeAvg=grapeMoney/grapeCount;
        $("#playerMoney").text(playerMoney.toFixed(2));
        $("#avgGrape").text(grapeAvg.toFixed(2));
        $("#grapesOwned").text(grapeCount);
        $("h4").text("Bought Grapes");
    }
    else if(!gameEnd){
        $("h4").text("Not Enough Money");
    }
});
$(".appleColor").on("click",function(event){
    event.preventDefault();
    if(playerMoney>=apple.price && !gameEnd){
        playerMoney-=apple.price;
        appleMoney+=apple.price;
        appleCount++;
        appleAvg=appleMoney/appleCount;
        $("#playerMoney").text(playerMoney.toFixed(2));
        $("#avgApple").text(appleAvg.toFixed(2));
        $("#applesOwned").text(appleCount);
        $("h4").text("Bought Apples");
    }
    else if(!gameEnd){
        $("h4").text("Not Enough Money");
    }
});
$(".bananaColor").on("click",function(event){
    event.preventDefault();
    if(playerMoney>=banana.price && !gameEnd){
        playerMoney-=banana.price;
        bananaMoney+=banana.price;
        bananaCount++;
        bananaAvg=bananaMoney/bananaCount;
        $("#playerMoney").text(playerMoney.toFixed(2));
        $("#avgBanana").text(bananaAvg.toFixed(2));
        $("#bananasOwned").text(bananaCount);
        $("h4").text("Bought Bananas");
    }
    else if(!gameEnd){
        $("h4").text("Not Enough Money");
    }
});
$(".orangeColor").on("click",function(event){
    event.preventDefault();
    if(playerMoney>=orange.price && !gameEnd){
        playerMoney-=orange.price;
        orangeMoney+=orange.price;
        orangeCount++;
        orangeAvg=orangeMoney/orangeCount;
        $("#playerMoney").text(playerMoney.toFixed(2));
        $("#avgOrange").text(orangeAvg.toFixed(2));
        $("#orangesOwned").text(orangeCount);
        $("h4").text("Bought Oranges");
    }
    else if(!gameEnd){
        $("h4").text("Not Enough Money");
    }
});

//Selling Buttons
$("#grapeBut").on("click", function(event){
    event.preventDefault();
    if(grapeCount>0){
        playerMoney+=grape.price;
        grapeMoney-=grapeAvg;
        grapeCount--;
        $("#playerMoney").text(playerMoney.toFixed(2));
        if(grapeCount==0){$("#avgGrape").text(0);}
        $("#grapesOwned").text(grapeCount);
        $("h4").text("Sold Grapes");
    }
    else{
        $("h4").text("No Grapes to Sell");
    }
});
$("#appleBut").on("click", function(event){
    event.preventDefault();
    if(appleCount>0){
        playerMoney+=apple.price;
        appleMoney-=apple.price;
        appleCount--;
        $("#playerMoney").text(playerMoney.toFixed(2));
        if(appleCount==0){$("#avgApple").text(0);}
        $("#applesOwned").text(appleCount);
        $("h4").text("Sold Apples");
    }
    else{
        $("h4").text("No Apples to Sell");
    }
});
$("#bananaBut").on("click", function(event){
    event.preventDefault();
    if(bananaCount>0){
        playerMoney+=banana.price;
        bananaMoney-=banana.price;
        bananaCount--;
        $("#playerMoney").text(playerMoney.toFixed(2));
        if(bananaCount==0){$("#avgBanana").text(0);}
        $("#bananasOwned").text(bananaCount);
        $("h4").text("Sold Bananas");
    }
    else{
        $("h4").text("No Bananas to Sell");
    }
});
$("#orangeBut").on("click", function(event){
    event.preventDefault();
    if(orangeCount>0){
        playerMoney+=orange.price;
        orangeMoney-=orange.price;
        orangeCount--;
        $("#playerMoney").text(playerMoney.toFixed(2));
        if(orangeCount==0){$("#avgOrange").text(0);}
        $("#orangesOwned").text(orangeCount);
        $("h4").text("Sold Oranges");
    }
    else{
        $("h4").text("No Oranges to Sell");
    }
});

// End Trent code


});
