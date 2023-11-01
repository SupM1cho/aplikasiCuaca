const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

const app = express()

//Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

//Setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

//setup direktori statis
app.use(express.static(direktoriPublic))

//ini halaman/page utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Muhammad Rizky Sandyra'
        })        
})
//ini halaman bantuan/FAQ (Frequently Asked Questions)
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Muhammad Rizky Sandyra',
        teksBantuan: 'ini adalah teks bantuan'
        })        
})
//ini halaman infoCuaca dan tentang
app.get('/infoCuaca', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Kamu harus memasukan lokasi yang ingin dicari'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })      
})

app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Muhammad Rizky Sandyra'
        })        
})

app.get('/berita', (req, res) => {
    res.render('berita', {
        judul: 'Berita',
        nama: 'Muhammad Rizky Sandyra'
        })        
})

app.get('/movie', (req, res) => {
    res.render('movie', {
        judul: 'Movie',
        nama: 'Muhammad Rizky Sandyra'
        })        
})

app.get('*', (req,res) => {
    res.render('404', {
        judul: '404',
        nama: 'Muhammad Rizky Sandyra',
        pesanKesalahan: 'Halaman tidak ditemukan'
    })
})

app.listen(5000, () => {
    console.log('Server berjalan pada port 5000.')
    })