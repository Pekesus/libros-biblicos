//express
const express = require('express'); //llamando a la libreria instalada
const res = require('express/lib/response');
const app = express(); //inicializando la libreria (express) 
const PORT = 3000; //asignando un puerto, puede cambiar si está en uso

//array
let librosbiblicos =[
    {id: 1, nombre: 'Genesis', autor: 'Moises'},
    {id: 2, nombre: 'Exodo', autor: 'Moises'},
    {id: 3, nombre: 'Levitico', autor: 'Moises'},
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

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http:// localhost:" + PORT); //estado de confirmación
})