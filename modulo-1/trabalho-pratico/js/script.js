function selectInput(color) {
  var inputRange = document.querySelector('#range' + color)
  inputRange.addEventListener('input', function (event) {
    var inputNumber = document.querySelector('#read' + color)
    inputNumber.value = event.target.value
    changeColor(color, event.target.value)
  })

  var inputNumber = document.querySelector('#read' + color)
  inputNumber.addEventListener('input', function (event) {
    if(event.target.value < 0) {
      event.target.value = 0
    }
    if(event.target.value > 255) {
      event.target.value = 255
    }
    
    var inputRange = document.querySelector('#range' + color)
    inputRange.value = event.target.value
    changeColor(color, event.target.value)
  })
}

function changeColor(color, newValue) {
  let valueInput = null
  if (color === 'Red') {
    valueInput = document.querySelector('#readRed')
  }
  else if (color === 'Green') {
    valueInput = document.querySelector('#readGreen')
  }
  else if (color === 'Blue') {
    valueInput = document.querySelector('#readBlue')
  }
  valueInput.value = newValue
  changePalette()
}

function changePalette() {
  let valueRed = document.querySelector('#readRed').value
  let valueGreen = document.querySelector('#readGreen').value
  let valueBlue = document.querySelector('#readBlue').value

  let divColor = document.querySelector('#area-color')
  divColor.style.backgroundColor = `rgb(${valueRed}, ${valueGreen}, ${valueBlue})`
}

function start() {
  selectInput('Red')
  selectInput('Green')
  selectInput('Blue')
}

window.addEventListener('load', start)
