let classroom = ['Barletti', 'Batistini', 'Belmar', 'Berlincioni', 'Ciampi', 'Cistellini', 'Corsini', 'Dapinguente', 'Di Carlo', 'Fantacci', 'Franceschini', 'Ghelli', 'Guilot', 'La Torre', 'Lanzi', 'Lotti', 'Lulli', 'Magboo', 'Meratti', 'Ndoja', 'Nencioni', 'Pacini', 'Perricone', 'Sartorio', 'Secci', 'Wilun']

let delay = 0

document.querySelector("#shuffle").onclick = () =>
{
  fillTable(shuffle(classroom))
}

document.querySelector("#reset").onclick = () =>
{
  document.querySelector("tbody").innerHTML = ""
  document.querySelector("#shuffle").disabled = false
}

document.onkeydown = (e) =>
{
  if (e.key === "e" || e.key === "E")
  document.querySelector("#shuffle").click()
  else if (e.key === "r" || e.key === "R")
  document.querySelector("#reset").click()
  else if (e.key === "s" || e.key === "S")
  saveExtraction(classroom)
  else if (e.key === "ArrowRight")
  {
    if (delay <= 1000)
    delay += 5
  }
  else if (e.key === "ArrowLeft")
  {
    if (delay > 0)
    delay -= 5
  }
}

function shuffle(array)
{
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0)
    {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
    }
  
    return array
}

async function fillTable(array)
{
  document.querySelector("#shuffle").disabled = true
  document.querySelector("#reset").disabled = true
  let index = 1
  for (const entry in array)
  {
    document.querySelector("tbody").innerHTML += `<tr><td>${index}</td><td>${array[entry]}</td></tr>`
    index++
    await sleep(delay)
  }
  document.querySelector("#reset").disabled = false
}

async function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

function saveExtraction(array)
{
  let parsedData = array
  let downloader = document.querySelector("#downloader")
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parsedData));
  downloader.setAttribute("href", dataStr)
  downloader.setAttribute("download", "estrazione.json")
  downloader.click()
}
