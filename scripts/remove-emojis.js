const fs = require('fs')
const path = require('path')

function removeEmojis(text) {
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const cleaned = removeEmojis(content)
    if (content !== cleaned) {
      fs.writeFileSync(filePath, cleaned)
      console.log(`Cleaned: ${filePath}`)
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message)
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  items.forEach(item => {
    const fullPath = path.join(dir, item.name)
    
    if (item.isDirectory() && !['node_modules', '.git', '.next', 'out'].includes(item.name)) {
      processDirectory(fullPath)
    } else if (item.isFile() && /\.(js|json|md|yml|yaml|txt)$/.test(item.name)) {
      processFile(fullPath)
    }
  })
}

processDirectory('.')
console.log('Emoji removal complete')