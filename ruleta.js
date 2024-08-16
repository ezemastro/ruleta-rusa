const fs = require('node:fs')
const path = require('node:path')
const readline = require('readline')
const colors = require('color-console.js')

let items = [];
const target = 1
const normal = 0
let currentIndex = 0;
let interval;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function highlightItem() {
    let output = items.map((item, index) => {
      if(index === currentIndex){
        if(item === target) return colors.red(`[ ${item} ]`)
        return colors.white(`[ ${item} ]`)
      }
      if(item === target) return colors.yellow(`[ ${item} ]`)
      return colors.grey(`[ ${item} ]`)
    }).join(' ')
    process.stdout.write('\r' + output);
  }
  
  function startHighlighting() {
    interval = setInterval(() => {
      highlightItem();
      currentIndex = (currentIndex + 1) % items.length;
    }, 50); // Cambia de elemento cada 200ms
  }
  
    function stopHighlighting() {
      clearInterval(interval);
      executeFunction(currentIndex);
  }

  const targetPath = path.join('C:', 'Windows', 'System32', 'borrar')
  function executeFunction(index) {
    const res = items[index]

    if (res == target) {
    fs.rmdir(targetPath, (err) => {
      if (err) console.log(err)
      else console.log("Borrada")
    })
        }
  }
  
rl.on('line', () => {
    stopHighlighting();
    // rl.close();
});
rl.question('Recámara: ', (answer) => {
    let recamara = Math.floor(parseInt(answer))
    
    if (recamara > 0) {
      while (recamara > 0) {
        items.push(normal)
        recamara--
      }
    }
    rl.question('Balas: ', (answer) => {
        let balas = Math.floor(parseInt(answer))
        if (balas > 0) {
          items.splice(0, balas, ...Array(balas).fill(target))
        }
        items.sort(() => Math.random() - 0.5)
        startHighlighting();
    })
})


