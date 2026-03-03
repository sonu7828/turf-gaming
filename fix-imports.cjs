const fs = require('fs')
const path = require('path')

const baseDir = path.join(__dirname, 'src', 'pages')

// Folders to process
const folders = ['superadmin', 'owner', 'staff', 'customer']

folders.forEach(folder => {
    const folderPath = path.join(baseDir, folder)
    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jsx'))
        files.forEach(file => {
            const filePath = path.join(folderPath, file)
            const content = fs.readFileSync(filePath, 'utf-8')
            const updated = content.replace(/\.\.\/\.\.\/\.\.\/components/g, '../../components')
            if (content !== updated) {
                fs.writeFileSync(filePath, updated, 'utf-8')
                console.log(`Updated ${folder}/${file}`)
            }
        })
    }
})
