document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
    navegacionFija();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const festival = document.querySelector('.about-festival');
    const body = document.querySelector('body');

    window.addEventListener(
        'scroll',
        function() { 
            if (festival.getBoundingClientRect().top < 0){
               barra.classList.add('fijo');
               body.classList.add('body-scroll');
            }else {
                barra.classList.remove('fijo');
                body.classList.remove('body-scroll');
            }
        }
    )
    
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML =
        `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
             <img width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagenes galeria"></img>
        `;
        
        galeria.appendChild(imagen);

        imagen.onclick = function(){
            mostrarImagen(i);
        }
    }
}

function mostrarImagen(id){
    
    const imagen = document.createElement('picture');
    imagen.innerHTML =
    `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
         <img width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagenes galeria"></img>
    `;

    //Crear el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }


    //Boton para cerrar
    const cerrarModal = document.createElement('P');
    cerrarModal.innerText= 'X';
    cerrarModal.classList.add('btn-cerrar');

    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    overlay.appendChild(cerrarModal);

    

    //Añadirlo al HMTL
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')

}
    