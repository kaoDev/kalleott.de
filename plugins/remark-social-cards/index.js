const path = require('path')
const { format } = require('date-fns')
const svg2img = require('svg2img')
const fs = require('fs')

function createDirRecursively(dir) {
  if (!fs.existsSync(dir)) {
    createDirRecursively(path.join(dir, '..'))
    fs.mkdirSync(dir)
  }
}

const createSvgCard = (title, date) => {
  return new Promise((resolve, reject) => {
    svg2img(svgString(title, 'Kalle Ott', date), function(error, buffer) {
      if (error) {
        reject(error)
      } else {
        resolve(buffer)
      }
    })
  })
}

module.exports = ({ markdownNode }, options) => {
  const post = markdownNode.frontmatter

  const summary =
    markdownNode.rawMarkdownBody.substr(
      0,
      markdownNode.rawMarkdownBody.lastIndexOf(' ', 40)
    ) + '...'

  post.excerpt = summary
  const outputDir = path.join('./public', markdownNode.fields.slug)
  const output = path.join(outputDir, 'twitter-card.jpg')

  createSvgCard(post.title, post.date)
    .then(buffer => {
      if (!fs.existsSync(outputDir)) {
        createDirRecursively(outputDir)
      }
      fs.writeFileSync(output, buffer)
    })
    .then(() => console.log('Generated Twitter Card:', output))
    .catch(err => console.log('ERROR GENERATING TWITTER CARD', err))
}

const genTextBits = title => {
  if (title.length <= 30) {
    return `<text class="text-shadow" id="g_1" x="50%" y="65" fill="#f1f0ec" font-family="sans-serif" font-size="34" font-style="normal" font-weight="bold" text-anchor="middle">${title}</text>`
  } else {
    const [first, second] = title.split(' ').reduce(
      (acc, word) => {
        if (acc[acc.length - 1].length + word.length < 30) {
          acc[acc.length - 1] += ` ${word}`
        } else {
          acc.push(word)
        }
        if (acc.length > 2) {
          throw new Error('too long title')
        }
        return acc
      },
      ['']
    )

    return `<text class="text-shadow" id="g_1" x="50%" y="45" fill="#f1f0ec" font-family="sans-serif" font-size="34" font-style="normal" font-weight="bold" text-anchor="middle">
${first}
</text>
<text class="text-shadow" id="g_1" x="50%" y="85" fill="#f1f0ec" font-family="sans-serif" font-size="34" font-style="normal" font-weight="bold" text-anchor="middle">
${second}
</text>`
  }
}

const svgString = (title, author, date) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="600" height="314">
    <style>
        .text-shadow { text-shadow: 0px 0px 0px #0a111b, 1px 1.3px 0px #0a111b, 2px 2.6px 0px #0a111b, 3px 3.9000000000000004px 0px #0a111b, 4px 5.2px 0px #0a111b, 5px 6.5px 0px #0a111b, 6px 7.800000000000001px 0px #0a111b, 7px 9.1px 0px #0a111b, 8px 10.4px 0px #0a111b, 9px 11.700000000000001px 0px #0a111b; }
    </style>
    <defs>
    </defs>
    <rect id="canvas_background" width="602" height="316" x="-1" y="-1" fill="#f1f0ec"/>
    <g>
        <g transform="translate(-10 80) rotate(-5)">
            <rect id="g_2" width="620" height="130" x="0" fill="#f63b34" stroke-width="0"/>
            <line x1="22" x2="598" y1="12" y2="12" stroke="#fff" stroke-width="2"/>
            <line x1="12" x2="588" y1="118" y2="118" stroke="#fff" stroke-width="2"/>
            <g dominant-baseline="middle">
${genTextBits(title)}
            </g>
        </g>
        <text id="g_7" x="12" y="302" fill="#0a111b" font-weight="lighter" font-family="sans-serif" font-size="14" text-anchor="start">
${author}
        </text>
        <text id="g_8" x="588" y="302" fill="#0a111b" font-weight="lighter" font-family="sans-serif" font-size="14" text-anchor="end">
${format(date, 'DD.MM.YYYY')}
        </text>
    </g>
</svg>
`
