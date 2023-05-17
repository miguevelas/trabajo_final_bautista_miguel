
class Producto {
    constructor(id, nombre, precio, img){
        this.id= id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const pata = new Producto (1, "Pata", 100, "img/receta_uno.jpg");
const muslo = new Producto(2, "Muslo", 50, "img/receta_dos.jpg");
const pechuga = new Producto(3, "Pechuga", 80, "img/receta_tres.jpg");
const carcaza = new Producto(4, "Carcaza", 150, "img/receta_cuatro.jpg");

const productos = [pata, muslo, pechuga, carcaza];


let carrito = [];

if(localStorage.getItem("carrito")){
    carrito= JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () =>{
    productos.forEach( producto =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12")
        card.innerHTML= `
                        <div class= "card">
                            <img src="${producto.img}" class="card-img-top imgProductos">
                            <div class= "card-body">
                                <h5>${producto.nombre}</h5>
                                <p>${producto.precio}</p>
                                <button class= "btn colorBoton" id="boton${producto.id}">Agregar al Carrito
                                </button>
                            </div>
                        </div>
        `
        contenedorProductos.appendChild(card);

         const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", ()=>{
        agregarAlCarrito(producto.id);
        })
    })
}
mostrarProductos();


const agregarAlCarrito = (id)=>{
    const productoEnCarrito = carrito.find(producto => producto.id === id);
   if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
       const producto = productos.find (producto=> producto.id ===id);
        carrito.push(producto);
     }
     localStorage.setItem("carrito", JSON.stringify(carrito));
     calcularTotal();
 }


const contenedorCarrito =document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=>{
 mostrarCarrito();
})


const mostrarCarrito = ()=> {
    contenedorCarrito.innerHTML= "";
  carrito.forEach(producto => {
         const card = document.createElement("div"); 
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                 <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos">
                     <div class= "card-body">
                            <h5>${producto.nombre}</h5>
                            <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                       <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto 
                       </button>
                </div>
                        `
         contenedorCarrito.appendChild(card);
        const boton= document.getElementById(`eliminar${producto.id}`);
         boton.addEventListener("click", ()=>{
             eliminarDelCarrito(producto.id)
         })
 })
    calcularTotal();
 }

 const eliminarDelCarrito = (id) => {
    const producto= carrito.find(producto=> producto.id ===id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
 }


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {

    eliminarTodoElCarrito();
})
 const eliminarTodoElCarrito = () =>{
    carrito=[];
    mostrarCarrito();
 }

 const total = document.getElementById("total");


 const calcularTotal = ()=>{
    let totalCompra = 0;
    carrito.forEach(producto =>{
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total:$${totalCompra}`;
 }

// calculadora


const inputBase = document.querySelector('#baseImponible');
let inputIVA = document.querySelector('#IVA');
const tipoIVA = 0.21;
function Calcular() {
    const base = Number(inputBase.value);
    const IVA = base * tipoIVA;
    inputIVA.value = IVA; 
}

const alert = document.getElementById("boton");

alert.addEventListener ("click", ()=>{
    Swal.fire ("Bienvenido Usuario");
})





