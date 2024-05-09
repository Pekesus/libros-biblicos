//express
const { json } = require('body-parser');
const express = require('express'); //llamando a la libreria instalada
const res = require('express/lib/response');
const app = express(); //inicializando la libreria (express) 
const PORT = 3000; //asignando un puerto, puede cambiar si está en uso

//array
let librosbiblicos =[
    {id: 1, nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2, nombre: 'Exodo', autor: 'Moises', anioPublicacion: 2024},
    {id: 3, nombre: 'Levitico', autor: 'Moises', anioPublicacion: 1990},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosbiblicos); //que nos devuelva en un json los ibros
});
//endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosbiblicos.find((libro) => libro.id === idCapturado);
    if(libroEncontrado){
        res.json(libroEncontrado);
    }else{
        res.status(404).json({mensaje: 'Libro no encontrado'});
    }
});
//endpoint 3 agregar un libro
app.post('/agregar-libro', (req, res) =>{
    const nuevoLibro = req.body; //ya no es parametro, es el cuerpo
    console.log(nuevoLibro);
    librosbiblicos.push(nuevoLibro); //para guardar/agregar el nuevo libro
    res.status(201).json('este libro fue guardado exitosamente'); //siempre que se hace un request tiene que tener un res
})
// endpoint 4 actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosbiblicos.findIndex((libro) => libro.id === idCapturado);
    if(indexLibroLocalizado !== -1){
        librosbiblicos[indexLibroLocalizado] = req.body;
        res.json(librosbiblicos[indexLibroLocalizado]);
    }else{
        res.status(404).json({mensaje : 'libro no encontrado'});
    }
    
    //console.log(libroEncontrado);
});
//endpoint 5 Eliminar libro
app.delete('/eliminar-libro/:id',(req, res) => {
    const id = parseInt(req.params.id);
    lbiblico = librosbiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'Se ha eliminado el libro'});
    console.log(lbiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year = parseInt(req.params.anio);
    const librosPublicados = librosbiblicos.filter( anio => anio.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404),json({mensaje : 'No se han encontrado libros publicados'});
    }
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http:// localhost:" + PORT); //estado de confirmación
})