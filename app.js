const express = require('express');
const exphbs = require('express-handlebars');
const req = require('express/lib/request');
const path = require('path');

const app = express();

//========================================================
//      Indicar el motor de vistas
//========================================================
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// configurar motor
app.set('views', './views');

//========================================================
//      Static Files
//========================================================
app.use(express.static(path.join(__dirname, 'public')));

//========================================================
//      ROUTES DE MI APP
//========================================================
app.get('/', (req, res) => {
    // Renderizar vista home
    res.render('home', {layout: 'main'});
});

app.get('/productos', (req, res) => {
    // Renderizar vista home
    res.render('Productos/homeProductos', 
        {
            layout: 'main',
            nombre: 'Néstor León',
            persona: {
                nombre: "Néstor León",
                edad: 36
            },
            edad: 36,
            bandera: false,
            productos: [
                {id: 1, descripcion: "Leche", costo: 12.50},
                {id: 2, descripcion: "Cerveza", costo: 22.50},
                {id: 3, descripcion: "Tequila", costo: 90.50},
                {id: 4, descripcion: "Vodka", costo: 122.50},
                {id: 5, descripcion: "Ron", costo: 222.50},
            ],
        });
});

app.get('/productos/:id', (req, res) => {
    res.render('Productos/detalleProducto', {
        layout: 'main',
        id: req.params['id']
    });
});

app.get('/productos/edit/:id', (req, res) => {
    res.render('Productos/editProducto', {
        layout: 'main',
        id: req.params['id'],
        producto: {
            id: req.params['id'], 
            descripcion: "Cerveza", 
            costo: 22.50
        }    
    });
});


//========================================================
//      LISTEN
//========================================================
app.listen(8080);