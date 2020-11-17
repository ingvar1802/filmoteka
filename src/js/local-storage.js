
console.log(localStorage);
localStorage.setItem('film', JSON.stringify({ userId: 1 }))

const savedData = localStorage.getItem('film')
const parseData = JSON.parse(savedData)
console.log(parseData);