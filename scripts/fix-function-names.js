const fs = require('fs')
const path = require('path')

function fixFunctionNames(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      fixFunctionNames(fullPath)
    } else if (file.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      
      // Fix function names that start with numbers or have invalid characters
      content = content.replace(/export default function (\d+.*?)\(\)/g, (match, funcName) => {
        const safeName = 'Page' + funcName.replace(/[^a-zA-Z0-9]/g, '')
        return `export default function ${safeName}()`
      })
      
      content = content.replace(/export default function (\d.*?)\(\)/g, (match, funcName) => {
        const safeName = 'Page' + funcName.replace(/[^a-zA-Z0-9]/g, '')
        return `export default function ${safeName}()`
      })
      
      // Fix specific problematic function names
      content = content.replace(/function 2024\(\)/g, 'function News2024Page()')
      content = content.replace(/function 2025\(\)/g, 'function News2025Page()')
      content = content.replace(/function 3gpp\(\)/g, 'function ThreeGppPage()')
      content = content.replace(/function 5gStandalonePage\(\)/g, 'function FiveGStandalonePage()')
      content = content.replace(/function 5gNonStandalonePage\(\)/g, 'function FiveGNonStandalonePage()')
      content = content.replace(/function 6gresearch\(\)/g, 'function SixGResearchPage()')
      
      fs.writeFileSync(fullPath, content)
      console.log(`Fixed: ${fullPath}`)
    }
  })
}

fixFunctionNames(path.join(__dirname, '..', 'pages'))
console.log('All function names fixed!')