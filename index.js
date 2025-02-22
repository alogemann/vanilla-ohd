import express from 'express'
const app = express()


//app config
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.render('landing')
})

app.get('/custom', (req,res) => {
    res.render('custom')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
