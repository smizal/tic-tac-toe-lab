/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
let winnerCombo
let playerOneName
let playerTwoName
let playerOneScore
let playerTwoScore

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const playerOneCounterEl = document.querySelector('#playerOneCounter')
const playerTwoCounterEl = document.querySelector('#playerTwoCounter')
const resetGameBtnEl = document.querySelector('#resetGame')
const resetTurnBtnEl = document.querySelector('#resetTurn')

/*-------------------------------- Functions --------------------------------*/

const initGame = () => {
  playerOneName = document.querySelector('#playerOneName').value
  if (playerOneName.trim() === '') {
    messageEl.textContent = `Error: Game is not initialized. Please enter player one name`
    messageEl.classList.add('error')
    return
  }
  playerTwoName = document.querySelector('#playerTwoName').value
  if (playerTwoName.trim() === '') {
    messageEl.textContent = `Error: Game is not initialized. Please enter player Two name`
    messageEl.classList.add('error')
    return
  }

  squareEls.forEach((squareEl) => {
    squareEl.classList.remove('winner')
  })
  document.querySelectorAll('.hidden').forEach((hiddenEl) => {
    hiddenEl.classList.remove('hidden')
  })
  playerOneCounterEl.textContent = ''
  playerTwoCounterEl.textContent = ''
  messageEl.classList.remove('winner')
  messageEl.classList.remove('error')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  winnerCombo = []
  playerOneScore = 0
  playerTwoScore = 0
  /* localStorage.setItem('playerOneName', playerOneName)
  localStorage.setItem('playerOneScore', playerOneScore)
  localStorage.setItem('playerTwoName', playerTwoName)
  localStorage.setItem('playerTwoScore', playerTwoScore) */
  render()
}

const initTurn = () => {
  squareEls.forEach((squareEl) => {
    squareEl.classList.remove('winner')
  })
  messageEl.classList.remove('winner')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  winnerCombo = []
  render()
}

const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  board.forEach((boardEl, index) => {
    squareEls[index].textContent = boardEl
  })
}

const updateMessage = () => {
  if (!winner && !tie) {
    if (turn === 'X') {
      messageEl.textContent = `It is ${playerOneName} (${turn}) turn now` // render whose turn it is.
    } else {
      messageEl.textContent = `It is ${playerTwoName} (${turn}) turn now` // render whose turn it is.
    }
  } else if (!winner && tie) {
    messageEl.textContent = `The game finished, no winner in this turn. good luck next time.` // render a tie message.
  } else {
    styleWinnerSquares()
    if (turn === 'X') {
      messageEl.textContent = `Congratulation ${playerOneName} (${turn}), You won this turn` // render a congratulatory message to the player that has won
    } else {
      messageEl.textContent = `Congratulation ${playerTwoName} (${turn}), You won this turn` // render a congratulatory message to the player that has won
    }

    messageEl.classList.add('winner')
    updateMessageCounter()
  }
}

const updateMessageCounter = () => {
  if (turn === 'X') {
    playerOneScore += 1
  } else {
    playerTwoScore += 1
  }
  playerOneCounterEl.textContent = `player (x): ${playerOneName} Score: ${playerOneScore}`
  playerTwoCounterEl.textContent = `player (O): ${playerTwoName} Score: ${playerTwoScore}`
}
const handleClick = (event) => {
  let squareIndex = event.target.id
  console.log(squareIndex)
  if (board[squareIndex] !== '' || winner) {
    return
  } else {
    placePiece(squareIndex)
    console.log(board)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
  }
}

const placePiece = (index) => {
  board[index] = turn
}

const checkForWinner = () => {
  let winningCombo
  for (let wcIndex = 0; wcIndex < winningCombos.length; wcIndex++) {
    winningCombo = winningCombos[wcIndex]
    if (
      board[winningCombo[0]] === board[winningCombo[1]] &&
      board[winningCombo[0]] === board[winningCombo[2]] &&
      board[winningCombo[0]] != ''
    ) {
      winner = true
      winnerCombo = winningCombo
      return true
    }
  }
}

const checkForTie = () => {
  if (winner) {
    return
  } else {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == '') {
        return
      }
    }
  }
  tie = true
  return
}

const switchPlayerTurn = () => {
  if (winner || tie) {
    return
  }
  if (turn == 'X') {
    turn = 'O'
  } else {
    turn = 'X'
  }
}

const styleWinnerSquares = () => {
  squareEls.forEach((squareEl) => {
    if (
      squareEl.id == winnerCombo[0] ||
      squareEl.id == winnerCombo[1] ||
      squareEl.id == winnerCombo[2]
    ) {
      squareEl.classList.add('winner')
    }
  })
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((squareEl) => {
  squareEl.addEventListener('click', handleClick)
})

resetGameBtnEl.addEventListener('click', initGame)
resetTurnBtnEl.addEventListener('click', initTurn)

// initGame()
