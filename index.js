/* 
  "DOMContentLoaded" is an event that detects when all of the pages content is loaded. 
  Wrapping your code in this event is a safegaurd against having your selectors run before
  the page loads and causing issues.
*/
document.addEventListener("DOMContentLoaded", (event) => {
	// Selects the button used to end rounds
	let round_button = document.getElementById("end-round")
	let endModal = document.getElementById("end-modal")
	let tradeModal = document.getElementById("trade-modal")
	let tradeForm = document.getElementById("trade-form")

	/* 
    Selects UI elements related to stock names and stock price.
    They are stored in an object for ease of use(?).
  */
	let gameUi = {
		stock1: {
			name: document.getElementsByClassName("stock1"),
			price: document.getElementById("stock1-price"),
		},
		stock2: {
			name: document.getElementsByClassName("stock2"),
			price: document.getElementById("stock2-price"),
		},
		stock3: {
			name: document.getElementsByClassName("stock3"),
			price: document.getElementById("stock3-price"),
		},
		stock4: {
			name: document.getElementsByClassName("stock4"),
			price: document.getElementById("stock4-price"),
		},
		rounds: document.getElementById("rounds"),
	}

	// These hold the ui elements for each player card.
	let player1 = {
		name: document.getElementById("player1-name"),
		stock1: document.getElementById("player1-stock1-amount"),
		stock2: document.getElementById("player1-stock2-amount"),
		stock3: document.getElementById("player1-stock3-amount"),
		stock4: document.getElementById("player1-stock4-amount"),
		netWorth: document.getElementById("player1-networth"),
		cash: document.getElementById("player1-cash"),
	}

	let player2 = {
		name: document.getElementById("player2-name"),
		stock1: document.getElementById("player2-stock1-amount"),
		stock2: document.getElementById("player2-stock2-amount"),
		stock3: document.getElementById("player2-stock3-amount"),
		stock4: document.getElementById("player2-stock4-amount"),
		netWorth: document.getElementById("player2-networth"),
		cash: document.getElementById("player2-cash"),
	}

	let player3 = {
		name: document.getElementById("player3-name"),
		stock1: document.getElementById("player3-stock1-amount"),
		stock2: document.getElementById("player3-stock2-amount"),
		stock3: document.getElementById("player3-stock3-amount"),
		stock4: document.getElementById("player3-stock4-amount"),
		netWorth: document.getElementById("player3-networth"),
		cash: document.getElementById("player3-cash"),
	}

	let player4 = {
		name: document.getElementById("player4-name"),
		stock1: document.getElementById("player4-stock1-amount"),
		stock2: document.getElementById("player4-stock2-amount"),
		stock3: document.getElementById("player4-stock3-amount"),
		stock4: document.getElementById("player4-stock4-amount"),
		netWorth: document.getElementById("player4-networth"),
		cash: document.getElementById("player4-cash"),
	}

	// Updates the name of each stock.
	let setStockNames = (
		name1 = "Stock 1",
		name2 = "Stock 2: ",
		name3 = "Stock 3: ",
		name4 = "Stock 4: "
	) => {
		/*
      gameUi.stock1.name is an array that holds every element with the
      stock1 class
    */
		for (i = 0; i < gameUi.stock1.name.length; i++) {
			gameUi.stock1.name[i].innerText = `${name1}: `;
			gameUi.stock2.name[i].innerText = `${name2}: `;
			gameUi.stock3.name[i].innerText = `${name3}: `;
			gameUi.stock4.name[i].innerText = `${name4}: `;
		}
	}

	// Updates all information on the screen
	let updateUi = () => {
		// Update stock prices on screen
		gameUi.stock1.price.innerText = gameInfo.stockValues[0].value
		gameUi.stock2.price.innerText = gameInfo.stockValues[1].value
		gameUi.stock3.price.innerText = gameInfo.stockValues[2].value
		gameUi.stock4.price.innerText = gameInfo.stockValues[3].value

		// update round counter
		gameUi.rounds.innerText = `Rounds Left: ${gameInfo.rounds}`

		// Update player data on screen

		// Player 1
		player1.name.innerText = gameInfo.playerInfo.player1.name
		player1.stock1.innerText = gameInfo.playerInfo.player1.stock1
		player1.stock2.innerText = gameInfo.playerInfo.player1.stock2
		player1.stock3.innerText = gameInfo.playerInfo.player1.stock3
		player1.stock4.innerText = gameInfo.playerInfo.player1.stock4
		player1.cash.innerText = gameInfo.playerInfo.player1.cash
		player1.netWorth.innerText = calculateNetWorth(gameInfo.playerInfo.player1)

		// Player 2
		player2.name.innerText = gameInfo.playerInfo.player2.name
		player2.stock1.innerText = gameInfo.playerInfo.player2.stock1
		player2.stock2.innerText = gameInfo.playerInfo.player2.stock2
		player2.stock3.innerText = gameInfo.playerInfo.player2.stock3
		player2.stock4.innerText = gameInfo.playerInfo.player2.stock4
		player2.cash.innerText = gameInfo.playerInfo.player2.cash
		player2.netWorth.innerText = calculateNetWorth(gameInfo.playerInfo.player2)

		// Player 3
		player3.name.innerText = gameInfo.playerInfo.player3.name
		player3.stock1.innerText = gameInfo.playerInfo.player3.stock1
		player3.stock2.innerText = gameInfo.playerInfo.player3.stock2
		player3.stock3.innerText = gameInfo.playerInfo.player3.stock3
		player3.stock4.innerText = gameInfo.playerInfo.player3.stock4
		player3.cash.innerText = gameInfo.playerInfo.player3.cash
		player3.netWorth.innerText = calculateNetWorth(gameInfo.playerInfo.player3)

		// Player 4
		player4.name.innerText = gameInfo.playerInfo.player4.name
		player4.stock1.innerText = gameInfo.playerInfo.player4.stock1
		player4.stock2.innerText = gameInfo.playerInfo.player4.stock2
		player4.stock3.innerText = gameInfo.playerInfo.player4.stock3
		player4.stock4.innerText = gameInfo.playerInfo.player4.stock4
		player4.cash.innerText = gameInfo.playerInfo.player4.cash
		player4.netWorth.innerText = calculateNetWorth(gameInfo.playerInfo.player4)
	}

	let calculateNetWorth = (player, roundInfo) => {
		// I want this function to get networth based on previous rounds too
		// gameInfo is undefined, calculate using the current rounds info
		if (roundInfo === undefined) {
			roundInfo = gameInfo
		}
		
		let netWorth =
			player.stock1 * roundInfo.stockValues[0].value +
			player.stock2 * roundInfo.stockValues[1].value +
			player.stock3 * roundInfo.stockValues[2].value +
			player.stock4 * roundInfo.stockValues[3].value +
			player.cash

		return netWorth
	}

	// Event listners
	// There are a lot of click event listeners that check for id.
	// Would it be better to consolidate them all under one listener?

	// Detects change in player trade forms
	tradeForm.addEventListener("change", (e) => {
		updateTradeBoxPlayer(e)
	})


	// Opens trade modal
	document.addEventListener("click", (e) => {
		if (e.target.id === "player-trade-button") {
			tradeModal.style.display = "block"
			// generateTradeForm()
		}
	})

	// Rolls new prices and increments round counter
	round_button.addEventListener("click", (e) => {
		endRound()
	})

	// this event listener listens for clicks on the buy and sell buttons
	document.addEventListener("click", function (e) {
		// class="buy-button player4-stock1-buy"
		let classNames = e.target.className.split(" ")

		/* if the target has "buy-button" or "sell-button" in its class, its a 
		   player button */
		if (classNames.includes("buy-button")) {
			let transactionInfo = classNames[1].split("-")
			playerBuy(transactionInfo[0], transactionInfo[1])
			updateUi()
		} else if (classNames.includes("sell-button")) {
			let transactionInfo = classNames[1].split("-")
      playerSell(transactionInfo[0], transactionInfo[1])
      updateUi()
		}
	})

	// The parent element of the close button should be the modal
	document.addEventListener("click", function(e) {
		if (e.target.className === "modal-close-button") {
			e.target.parentElement.style.display = "none"
		}
	})

	// Closes and resets trade form
	document.addEventListener("click", (e) => {
		if (e.target.id === "trade-close-button") {
			tradeModal.style.display = "none"
			tradeForm.reset()
		}
	})

	// displays end game modal
	document.addEventListener("click", function(e) {
		if (e.target.className === "open-modal-button") {
			endModal.style.display = "block"
		}
	})

	// changes trade offering in trade modal
	document.addEventListener("click", (e) => {
		if (e.target.className === "increase-offer-button") {
			e.target.previousSibling.value++
			e.target.previousSibling.innerText++
		} else if (e.target.className === "decrease-offer-button") {
			e.target.nextSibling.value--
			e.target.nextSibling.innerText--
		}
	})

	// handles trade form submit
	document.addEventListener("submit", (e) => {
		e.preventDefault()

		// get info on both sides of the trade
		handleTradeSubmit(e)
		e.target.reset()
	})

	/* 
    Game Logic 
    Stocks prices move in multiples of 5. 
    Sentiment is a number from 0 to 100 and it determines how often a stock goes up
    Volatility is a number from 1 to 5 and it determines how much a stock moves in a turn
  */
	let gameInfo = {
		status: "starting",
		rounds: 5,
		roundCounter: 0,
		trades: [],
		winner: null,
		// stockValues should probably be an object. 
		stockValues: [
			{
				name: "Apple",
				ticker: "",
				value: 15,
				sentiment: 50,
				volatility: 1,
			},
			{
				name: "Essentia",
				ticker: "",
				value: 75,
				sentiment: 80,
				volatility: 1,
			},
			{
				name: "Microsoft",
				ticker: "",
				value: 260,
				sentiment: 40,
				volatility: 1,
			},
			{
				name: "Sony",
				ticker: "",
				value: 120,
				sentiment: 50,
				volatility: 1,
			},
		],
		playerInfo: {
			player1: {
				name: "Amicus",
				stock1: 0,
				stock2: 0,
				stock3: 10,
				stock4: 0,
				cash: 1500,
			},
			player2: {
				name: "Nikolai",
				stock1: 0,
				stock2: 0,
				stock3: 0,
				stock4: 0,
				cash: 1500,
			},
			player3: {
				name: "Ranok",
				stock1: 0,
				stock2: 0,
				stock3: 0,
				stock4: 0,
				cash: 1500,
			},
			player4: {
				name: "Loken",
				stock1: 0,
				stock2: 0,
				stock3: 0,
				stock4: 0,
				cash: 1500,
			}
		},
		// Initially the same as the rest of game data.
		previousRounds: []
	}

	let handleTradeSubmit = (e) => {
		let tradeInputs = document.getElementsByClassName("trade-input")
		let tradeOffers = []
		
		// check if all info in the form is correct
		for (let i = 0; i < tradeInputs.length; i++) {
			console.log(tradeInputs.)
		}

		// update player info based on info in the trade form
		

		// create trade objects based on form info then add them to gameinfo
	}

	// todo: Resets the trade modall
	let resetTradeModal = () => {

	}

	// Updates trade modal when a player is selected
	let updateTradeBoxPlayer = (e) => {
		let player = {}
		let holdingsDiv = e.target.parentElement.lastElementChild
		let keys = Object.keys(gameInfo.playerInfo.player1).filter(key => key.includes("stock"))

		// Find data for the selected player, assign to player
		for (key in gameInfo.playerInfo) {
			if (gameInfo.playerInfo[key].name === e.target.value) {
				player = gameInfo.playerInfo[key]
			}
		}
		
		// Resets holdings section
		let first = holdingsDiv.firstElementChild
		while (first) {
			first.remove()
			first = holdingsDiv.firstElementChild
		}

		// Generates player holdings section
		keys.forEach(key => {
			let div = document.createElement("div")

			div.className = "holding-name"
			div.id = key
			div.innerText = `${key}: ${player[key]}`
			holdingsDiv.appendChild(div)
		})
	}

	// Creates a select element for each player in the game 
	let generateTradeForm = () => {
		// generate options in the player select input
		let formSelects = document.getElementsByClassName("player-select")
		let inputDivs = document.getElementsByClassName("trade-inputs")
		let holdingsDivs = document.getElementsByClassName("player-holdings")

		// Generates select options
		for (let i = 0; i < formSelects.length; i++) {
			for (key in gameInfo.playerInfo) {
				let option = document.createElement("option")
				option.value = gameInfo.playerInfo[key].name
				option.innerText = gameInfo.playerInfo[key].name
				formSelects[i].appendChild(option)
			}
		}

		// Generates trade inputs
		for (let i = 0; i < inputDivs.length; i++) {
			gameInfo.stockValues.forEach((stock) => {
				let div = document.createElement("div")
				let stockNameSpan = document.createElement("span")
				let tradeAmountInput = document.createElement("input")
				let buyButton = document.createElement("button")
				let sellButton = document.createElement("button")
				
				div.className = "stock-holding"
				stockNameSpan.id = `${stock.name.toLowerCase()}-holding`
				stockNameSpan.className = "stock-name"
				stockNameSpan.innerText = `${stock.name}:`
				tradeAmountInput.className = `trade-input`
				tradeAmountInput.id = `${stock.name.toLowerCase()}-input-${i+1}`
				tradeAmountInput.value = 0
				tradeAmountInput.innerText = "0"
				buyButton.className = "increase-offer-button"
				buyButton.id = `${stock.name.toLowerCase()}-increase`
				buyButton.type = "button"
				sellButton.className = "decrease-offer-button"
				sellButton.id = `${stock.name.toLowerCase()}-decrease`
				sellButton.type = "button"

				buyButton.innerText = "+"
				sellButton.innerText = "-"

				div.appendChild(stockNameSpan)
				div.appendChild(sellButton)
				div.appendChild(tradeAmountInput)
				div.appendChild(buyButton)
				inputDivs[i].appendChild(div)
			})

			// Adds cash inputs
			let cashDiv = document.createElement("div")
			let cashInput = document.createElement("input")
			let cashSpan = document.createElement("span")

			cashSpan.innerText = "Cash: "
			cashSpan.className = "stock-name"
			cashInput.className = "cash-input"
			cashInput.value = 0
			cashDiv.appendChild(cashSpan)
			cashDiv.appendChild(cashInput)
			inputDivs[i].appendChild(cashDiv)
		}
	}

	// handles the logic for buying stock
	// args example: (player1, stock1)
	let playerBuy = (player, stock) => {
		// console.log(player, stock)
		/* figure out which stock is being bought by using the last charater in 
		the stock string. Get player data. */
		let stockInfo = gameInfo.stockValues[stock[stock.length-1] - 1]
		let playerInfo = gameInfo.playerInfo[player]
		
		// Determine if the player has enough money to buy
		if (playerInfo.cash >= stockInfo.value) {
			gameInfo.playerInfo[player].cash = gameInfo.playerInfo[player].cash - stockInfo.value
			gameInfo.playerInfo[player][stock]++
		} else {
			console.log(`${playerInfo.name} does not have enough money to buy ${stockInfo.name}!`)
		}
	}

	// handles the logic for selling stock
	// args example: (player1, stock1)
	let playerSell = (player, stock) => {
		let stockInfo = gameInfo.stockValues[stock[stock.length-1] - 1]
		let playerInfo = gameInfo.playerInfo[player]
		
		// Determine if the player has stock to sell
		if (playerInfo[stock] > 0) {
			gameInfo.playerInfo[player][stock]--
			gameInfo.playerInfo[player].cash = gameInfo.playerInfo[player].cash + stockInfo.value
		} else {
			console.log(`${playerInfo.name} does not have any shares of ${stockInfo.name}!`)
		}
	}

	let endRound = () => {
		// // update lastRound and previousRounds.
		// // Turns out that cloning an object into itself is weird.
		// gameInfo.lastRound = structuredClone(gameInfo)
		if (gameInfo.roundCounter === 0) {
			
		}
		gameInfo.previousRounds.push(structuredClone(gameInfo))

		rollStocks()

		// calculate the trades that were made 
		checkForTrades()

		// Display new stock values
		updateUi()

		if (gameInfo.rounds === 0) {
			endGame()
		}
	}

	let endGame = () => {
		// display and enable end screen button
		let openTradeModalButton = document.getElementsByClassName("open-modal-button")[0]
		
		// disable all gameplay buttons 
		let buttons = document.getElementsByTagName("button")
		for (i = 0; i < buttons.length; i++) {
			if (buttons[i].id !== "modal-open-button" || buttons[i].id !== "modal-close-button") {
				buttons[i].disabled = true
			}
		}
		// Determine who won. This could probably be done better.
		// create variable that track highest NW
		let highestNetWorth = 0
		for (x in gameInfo.playerInfo) {
			// create temporary variable that hold the current players NW
			let netWorth = calculateNetWorth(gameInfo.playerInfo[x])
			// if the current player has the highest NW, reassign winner and highestNW
			if (netWorth > highestNetWorth) {
				highestNetWorth  = netWorth
				gameInfo.winner = gameInfo.playerInfo[x]
			}
		}
		
		updateEndModal()
		endModal.style.display = "block"
		openTradeModalButton.style.display = "block"
		openTradeModalButton.disabled = false
	}

	// Returns an array of trades a player has done
	let findTrades = (player) => {
		let trades = gameInfo.trades.filter((trade) => {
			return trade.player.name === player.name ? true : false
		})
		
		return trades
	}

	let checkForTrades = () => {
		// Get the keys for each player object. keys is an array
		let keys = Object.keys(gameInfo.playerInfo.player1).filter(key => key.includes("stock"))
		// I need to parse why this works. Its so simple but I can't explain it.
		let lastRound = gameInfo.previousRounds[gameInfo.previousRounds.length - 2]
		
		// check for differences in player holdings from last round
		// iterate through the different keys in playerInfo
		for (key in gameInfo.playerInfo) {
			// for every player object, compare their current holdings with what they had last round
			for (i = 0; i < keys.length; i++) {
				// if there is a difference in the holdings of a stock, run something
				if (gameInfo.playerInfo[key][keys[i]] !== lastRound.playerInfo[key][keys[i]]) {
					trackHoldingsChange(lastRound, lastRound.playerInfo[key], gameInfo.playerInfo[key], keys[i])
				}
			}
		}
	}

	// creates trade object
	let trackHoldingsChange = (lastRound, playerLastRound, playerCurrentRound, key) => {
		let stockBeingTraded = lastRound.stockValues[key[key.length-1] - 1]

		// determine if the player was buying or selling 
		if (playerCurrentRound[key] > playerLastRound[key]) {
			// the player is buying
			// console.log("buy")
			gameInfo.trades.push({
				type: "market",
				action: "buy",
				player: playerLastRound,
				stock: stockBeingTraded,
				amount: playerCurrentRound[key] - playerLastRound[key],
				round: lastRound.roundCounter
			})
		} else {
			// the player is selling
			// console.log("sell")
			gameInfo.trades.push({
				type: "market",
				action: "sell",
				player: playerLastRound,
				stock: stockBeingTraded,
				amount: playerLastRound[key] - playerCurrentRound[key],
				round: lastRound.roundCounter
			})
		}
	}

	/* // for the eventual player-to-player trading mechanic
	let executeTrade = () => {

	}*/ 

	// Updates all information on end modal
	let updateEndModal = () => {
		// Grab elements from document
		let winnerAn = document.getElementById("winner-announcement")
		let winnerHoldings = document.getElementById("winner-holdings")
		let winnerTrades = document.getElementById("winner-total-trades")
		let winnerTradeAcc = document.getElementById("winner-accuracy")
		let winnerBestTrade = document.getElementById("winner-best-trade")
		let winnerWorstTrade = document.getElementById("winner-worst-trade")
		let winnerHighestNW = document.getElementById("winner-highest-networth")
		let winnerLowestNW = document.getElementById("winner-lowest-networth")
		let winnerTotalProfits = document.getElementById("winner-total-profits")

		// Update winner announcment
		winnerAn.innerText = `${gameInfo.winner.name} is just built different!`

		// Calculate winners holdings
		winnerHoldings.innerText = `${calculateHoldings(gameInfo.winner)}`

		// Count total trades
		let totalTrades = findTrades(gameInfo.winner).length
		winnerTrades.innerText = `${totalTrades}`

		// Trade accuracy
		if (totalTrades > 0) {
			winnerTradeAcc.innerText = `${Math.round((calculateAccuracy(gameInfo.winner)))}%`
		} else {
			winnerTradeAcc.innerText = "0% and 100%!"
		}
		
		/* Have to think of a better way to display best and worst trade */

		// Best Trade
		let bestTradeData = calculateBestTrade(gameInfo.winner)
		if (totalTrades === 0) {
			winnerBestTrade.innerText = `${gameInfo.winner.name} didn't trade!`
		} else if (totalTrades === 1) {
			let trade = findTrades(gameInfo.winner)[0]
			if (bestTradeData[0].action === "buy") {
				winnerBestTrade.innerText = `Buying ${trade.stock.name} @ ${trade.stock.value} a share!`
			} else {
				winnerBestTrade.innerText = `Selling ${trade.stock.name} @ ${trade.stock.value} a share!`
			}
		} else {
			if (bestTradeData[0].action === "buy") {
				winnerBestTrade.innerText = `Buying ${bestTradeData[0].stock.name} @ ${bestTradeData[0].stock.value} a share!`
			} else {
				winnerBestTrade.innerText = `Selling ${bestTradeData[0].stock.name} @ ${bestTradeData[0].stock.value} a share!`
			}
		}

		// Worst Trade
		let worstTradeData = calculateWorstTrade(gameInfo.winner)
		if (totalTrades > 1) {
			if (worstTradeData[0].action === "buy") {
				winnerWorstTrade.innerText = `Buying ${worstTradeData[0].stock.name} @ ${worstTradeData[0].stock.value} a share!`
			} else {
				winnerWorstTrade.innerText = `Selling ${worstTradeData[0].stock.name} @ ${worstTradeData[0].stock.value} a share!`
			}
		} else if (totalTrades === 1) {
			winnerWorstTrade.innerText = "Traded once."
		} else {
			winnerWorstTrade.innerText = "To trade is to lose."
		}

		// Total Profits
		let roundZeroWinner = {}
		for (key in gameInfo.previousRounds[0].playerInfo) {
			if (gameInfo.previousRounds[0].playerInfo[key].name === gameInfo.winner.name) {
				roundZeroWinner = gameInfo.previousRounds[0].playerInfo[key]
			}
		}
		winnerTotalProfits.innerText = `${calculateNetWorth(gameInfo.winner) - calculateNetWorth(roundZeroWinner, gameInfo.previousRounds[0])}`

		// Highest Net Worth
		let highestNW = 0

		// This looks nasty. 
		// Calling calculateNW a bunch of times instead of using more variables is dumb.
		gameInfo.previousRounds.forEach((round) => {
			// iterate through playerInfo object
			for (key in round.playerInfo) {
				// if the winner object and the current player are the same
				if (round.playerInfo[key].name === gameInfo.winner.name) {
					// console.log(calculateNetWorth(round.playerInfo[key]), calculateNetWorth(gameInfo.winner), round.roundCounter, gameInfo.previousRounds)
					// compare net worth
					if (calculateNetWorth(round.playerInfo[key], round) > highestNW) {
						highestNW = calculateNetWorth(round.playerInfo[key], round)
					}
				}
			}
		})
		winnerHighestNW.innerText = highestNW

		// Lowest Net Worth
		let lowestNW = calculateNetWorth(gameInfo.winner)

		// Just as nasty
		gameInfo.previousRounds.forEach((round) => {
			for (key in round.playerInfo) {
				if (round.playerInfo[key].name === gameInfo.winner.name) {
					if (calculateNetWorth(round.playerInfo[key], round) < lowestNW) {
						lowestNW = calculateNetWorth(round.playerInfo[key], round)
					}
				}
			}
		})
		winnerLowestNW.innerText = lowestNW
	}

	let calculateWorstTrade = (player) => {
		let keys = Object.keys(gameInfo.playerInfo.player1).filter(key => key.includes("stock"))
		let trades = findTrades(player)
		let worstTrade = [{}, 0] // an array with the worst trade and its profit in %
		
		trades.forEach((trade) => {
			// Find current version of stock in trade. Maybe this can be a helper function.
			let stock = gameInfo.stockValues.find((y) => {
				return y.name === trade.stock.name
			})
			let profit = 0

			// compare trade to worstTrade, replace worstTrade if it has lower profit
			if (trade.action === "buy") {
				// ((currentPrice - buyPrice)/buyPrice)*100 = profit
				profit = (stock.value - trade.stock.value)/trade.stock.value * 100
			} else if (trade.action === "sell") {
				// (sellPrice - currentPrice)/buyPrice*100 = profit
				profit = (trade.stock.value - stock.value)/trade.stock.value * 100
			}

			if (profit < worstTrade[1]) {
				worstTrade = [trade, profit]
			}
		})

		// console.log(worstTrade)
		return worstTrade
	}

	let calculateBestTrade = (player) => {
		let keys = Object.keys(gameInfo.playerInfo.player1).filter(key => key.includes("stock"))
		let trades = findTrades(player)
		let bestTrade = [{}, 0] // an array with the best trade and its profit in %
		
		trades.forEach((trade) => {
			// Find current version of stock in trade. Maybe this can be a helper function.
			let stock = gameInfo.stockValues.find((y) => {
				return y.name === trade.stock.name
			})
			let profit = 0

			// compare trade to bestTrade, replace bestTrade if it has higher profit
			if (trade.action === "buy") {
				// ((currentPrice - buyPrice)/buyPrice)*100 = profit
				profit = (stock.value - trade.stock.value)/trade.stock.value * 100
			} else if (trade.action === "sell") {
				// (sellPrice - currentPrice)/buyPrice*100 = profit
				profit = (trade.stock.value - stock.value)/trade.stock.value * 100
			}

			if (profit > bestTrade[1]) {
				bestTrade = [trade, profit]
			}
		})
		// console.log(bestTrade)
		return bestTrade
	}

	let calculateHoldings = (player) => {
		let keys = Object.keys(gameInfo.playerInfo.player1).filter(key => key.includes("stock"))
		let sum = 0

		for (let i = 0; i < keys.length; i++) {
			sum = sum + (player[keys[i]] * gameInfo.stockValues[i].value)
		}

		return sum
	}

	// Calculates accuracy of players trade
	// This could be changed/updated later
	let calculateAccuracy = (player) => {
		let trades = findTrades(player)
		let goodTrades = 0

		gameInfo.trades.forEach((trade) => {
			// find the current version of the stock that was traded
			let stock = gameInfo.stockValues.find((y) => {
				return y.name === trade.stock.name
			}) 
			
			// if the trade was a buy and the game ended with the stock at a higher value
			// then it was bought at, increment goodTrade

			if (trade.action === "buy" && (trade.stock.value < stock.value)) {
				goodTrades++
			}
		})

		// Return profitable trade rate
		return (goodTrades/trades.length)*100
	}

	// Rolls new values for every stock
	let rollStocks = () => {
		if (gameInfo.rounds > 0) {
			gameInfo.roundCounter++
			gameInfo.rounds--;

			// Iterate through an array of objects holding each stocks value
			let newStockValues = gameInfo.stockValues.map((stock) => {
				// For each stock, take its current value,
				// calculate its new value, then update the stock
				stock.value = rollStock(stock)
				return stock
			})

			// Update gameInfo with new values
			gameInfo.stockValues = newStockValues

			return newStockValues
		}
	}

	// Rolls new values for a single stock
	let rollStock = (stock = { value, sentiment, volatility }) => {
		// If diceRoll returns a number higher than sentiment, direction is set to -1
		// and 1 if the oposite is true
		let direction = stock.sentiment < diceRoll() ? 1 : -1

		// Using direction and volatility, calculate the new value of the stock
		// console.log(stock.value, stock.sentiment, stock.volatility, direction)
		let newValue = stock.value - 5 * stock.volatility * direction
		return newValue
	}

	// basic random number function from stackoverflow
	let diceRoll = (min = 10, max = 100) => {
		let roll = Math.floor(Math.random() * (max - min + 1))

		return roll
	}

	let capitalize = (string) => {
		let firstLetter = string[0]
		return string.replace(firstLetter, firstLetter.toUpperCase())
	}

	// Eventually this will be used to generate neccesary html based on gameInfo
	let startGame = () => {
		// These functions initializes the ui once everything is done loading(hopefully)
		setStockNames(
			gameInfo.stockValues[0].name,
			gameInfo.stockValues[1].name,
			gameInfo.stockValues[2].name,
			gameInfo.stockValues[3].name
		)

		generateTradeForm()
	
		// This puts the inital game data in previousRounds
		gameInfo.previousRounds.push(structuredClone(gameInfo))
		updateUi()
	}

	startGame()
})
