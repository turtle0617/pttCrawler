const recognize = require('tesseractocr')

recognize(`${__dirname}/getCode.tif`, (err, text) => {
    if (err)
        console.log(err)
    else
        console.log('Yay! Text recognized!', text)
})
