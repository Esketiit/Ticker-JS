/* 
  "DOMContentLoaded" is an event that detects when all of the pages content is loaded. 
  Wrapping your code in this event is a safegaurd against having your selectors run before
  the page loads and causing issues.
*/
document.addEventListener("DOMContentLoaded", (event) => {
  // Selects the button used to end rounds
  let round_button = document.getElementById("end-round")

  /* 
    Selects UI elements related to stock names and stock price.
    They are stored in an object for ease of use(?).
  */
  let gameUi = {
    stock1: {
      name: document.getElementsByClassName("stock1"),
      price: document.getElementById("stock1-price")
    },
    stock2: {
      name: document.getElementsByClassName("stock2"),
      price: document.getElementById("stock2-price")
    },
    stock3: {
      name: document.getElementsByClassName("stock3"),
      price: document.getElementById("stock3-price")
    },
    stock4: {
      name: document.getElementsByClassName("stock4"),
      price: document.getElementById("stock4-price")
    }
  }

  // These hold the ui elements for each player card.
  let player1 = {
    name: document.getElementById("player1-name"),
    stock1: document.getElementById("player1-stock1-amount"),
    stock2: document.getElementById("player1-stock2-amount"),
    stock3: document.getElementById("player1-stock3-amount"),
    stock4: document.getElementById("player1-stock4-amount"),
    netWorth: document.getElementById("player1-networth"),
    cash: document.getElementById("player1-cash")
  }

  let player2 = {
    name: document.getElementById("player2-name"),
    stock1: document.getElementById("player2-stock1-amount"),
    stock2: document.getElementById("player2-stock2-amount"),
    stock3: document.getElementById("player2-stock3-amount"),
    stock4: document.getElementById("player2-stock4-amount"),
    netWorth: document.getElementById("player2-networth"),
    cash: document.getElementById("player2-cash")
  }

  let player3 = {
    name: document.getElementById("player3-name"),
    stock1: document.getElementById("player3-stock1-amount"),
    stock2: document.getElementById("player3-stock2-amount"),
    stock3: document.getElementById("player3-stock3-amount"),
    stock4: document.getElementById("player3-stock4-amount"),
    netWorth: document.getElementById("player3-networth"),
    cash: document.getElementById("player3-cash")
  }

  let player4 = {
    name: document.getElementById("player4-name"),
    stock1: document.getElementById("player4-stock1-amount"),
    stock2: document.getElementById("player4-stock2-amount"),
    stock3: document.getElementById("player4-stock3-amount"),
    stock4: document.getElementById("player4-stock4-amount"),
    netWorth: document.getElementById("player4-networth"),
    cash: document.getElementById("player4-cash")
  }

  // Updates the name of each stock.
  let setStockNames = (name1="Stock 1", name2="Stock 2: ", name3="Stock 3: ", name4="Stock 4: ") => {
    /*
      gameUi.stock1.name is an array that holds element with the
      stock1 class
    */
    for (i = 0; i < gameUi.stock1.name.length; i++) {
      gameUi.stock1.name[i].innerText = `${name1}: `
      gameUi.stock2.name[i].innerText = `${name2}: `
      gameUi.stock3.name[i].innerText = `${name3}: `
      gameUi.stock4.name[i].innerText = `${name4}: `
    }
    
  }

  setStockNames("Apple", "Essentia", "Microsoft", "Twitch")
  player1.name.innerText = "Brian"
  player2.name.innerText = "John"
  player3.name.innerText = "Kevin"
  player4.name.innerText = "Nate"

  // Event listners 

  // Rolls new prices and increments round counter
  round_button.addEventListener("click", e => {
    endRound()
  })

  /* 
    Game Logic 
    Stocks prices move in multiples of 5. 
    Sentiment is a number from 0 to 100 and it determines how often a stock goes up
    Volatility is a number from 1 to 5 and it determines how much a stock moves in a turn
  */
  let gameInfo = {
    rounds: 10,
    stockValues: [
      {
        name: "Apple",
        ticker: "",
        value: 15,
        sentiment: 50,
        volatility: 1
      }, 
      {
        name: "Essentia",
        ticker: "",
        value: 75,
        sentiment: 80,
        volatility: 1
      },
      {
        name: "Microsoft",
        ticker: "",
        value: 260,
        sentiment: 40,
        volatility: 1
      },
      {
        name: "Sony",
        ticker: "",
        value: 120,
        sentiment: 50,
        volatility: 1
      }
    ],
    playerInfo: {
      player1: {
        name: "Player1",
        stock1: 0,
        stock2: 0,
        stock3: 0,
        stock4: 0,
        cash: 1500
      },
      player2: {
        name: "Player2",
        stock1: 0,
        stock2: 0,
        stock3: 0,
        stock4: 0,
        cash: 1500
      },
      player3: {
        name: "Player3",
        stock1: 0,
        stock2: 0,
        stock3: 0,
        stock4: 0,
        cash: 1500
      },
      player4: {
        name: "Player4",
        stock1: 0,
        stock2: 0,
        stock3: 0,
        stock4: 0,
        cash: 1500
      },
    }
  }

  let endRound = () => {
    rollStocks()
    console.log(gameInfo.stockValues)

    // Display new stock values
    updateUi()
  }

  // Updates all information on the screen
  let updateUi = () => {
    // Update stock prices on screen
    gameUi.stock1.price.innerText = gameInfo.stockValues[0].value
    gameUi.stock2.price.innerText = gameInfo.stockValues[1].value
    gameUi.stock3.price.innerText = gameInfo.stockValues[2].value
    gameUi.stock4.price.innerText = gameInfo.stockValues[3].value

    // Update player data on screen

    // Player 1
    player1.stock1.innerText = gameInfo.playerInfo.player1.stock1
    player1.stock2.innerText = gameInfo.playerInfo.player1.stock2
    player1.stock3.innerText = gameInfo.playerInfo.player1.stock3
    player1.stock4.innerText = gameInfo.playerInfo.player1.stock4
    player1.cash.innerText = gameInfo.playerInfo.player1.cash

    // Player 2
    player2.stock1.innerText = gameInfo.playerInfo.player2.stock1
    player2.stock2.innerText = gameInfo.playerInfo.player2.stock2
    player2.stock3.innerText = gameInfo.playerInfo.player2.stock3
    player2.stock4.innerText = gameInfo.playerInfo.player2.stock4
    player2.cash.innerText = gameInfo.playerInfo.player2.cash

    // Player 3
    player3.stock1.innerText = gameInfo.playerInfo.player3.stock1
    player3.stock2.innerText = gameInfo.playerInfo.player3.stock2
    player3.stock3.innerText = gameInfo.playerInfo.player3.stock3
    player3.stock4.innerText = gameInfo.playerInfo.player3.stock4
    player3.cash.innerText = gameInfo.playerInfo.player3.cash

    // Player 4
    player4.stock1.innerText = gameInfo.playerInfo.player4.stock1
    player4.stock2.innerText = gameInfo.playerInfo.player4.stock2
    player4.stock3.innerText = gameInfo.playerInfo.player4.stock3
    player4.stock4.innerText = gameInfo.playerInfo.player4.stock4
    player4.cash.innerText = gameInfo.playerInfo.player4.cash
  }

  // Rolls new values for every stock
  let rollStocks = () => {
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

  // Rolls new values for a single stock
  let rollStock = (stock = {value, sentiment, volatility}) => {
    // If diceRoll returns a number higher than sentiment, direction is set to -1
    // and 1 if the oposite is true
    let direction = stock.sentiment < diceRoll() ? 1 : -1

    // Using direction and volatility, calculate the new value of the stock
    // console.log(stock.value, stock.sentiment, stock.volatility, direction)
    let newValue  = stock.value - (5 * stock.volatility * direction)
    return newValue
  }

    // basic random number function from stackoverflow
    let diceRoll = (min = 10, max = 100) => {
      let roll = Math.floor(Math.random() * (max - min + 1))
    
      return roll
    }
})