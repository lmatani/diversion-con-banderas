const container = document.getElementById('countries-list');
const body = document.querySelector('body');
let idVentana = 0;

const getApiPaises = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3/all');
      if (!response.ok) {
        throw new Error('Ha surgido un error', response.status);
      }
      const dataPaises = await response.json();
      //const pruebaArray = dataPaises.slice(0,20);
      //console.log(pruebaArray);
      getInfoPaises(dataPaises);
    } catch (error) {
      console.log('Error al obtener los datos: ', error);
    }
  };

  
getApiPaises();

function getInfoPaises(dataPaises){
    let arrayPaises = [];
    /*La información del pais: bandera, la capital, la población y el lado de la carretera donde se circula.*/

     dataPaises.forEach((jsonPais) => {
        const { name: { official }, capital, flags, population, car: { side } } = jsonPais;
          const cardPais = {
            id: dataPaises.indexOf(jsonPais),
            nombre: official,
            capital: capital !== undefined ?  capital[0] : official,
            poblacion: population,
            circula: side,
            bandera: flags.find((img) => img.includes('svg')),
          } 
          arrayPaises.push(cardPais);
         
     });
 
     arrayPaises.sort(function (a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
    });
    //console.log(arrayPaises);
    crearListaPais(arrayPaises);
  }


function crearListaPais(arrayPaises){
    const ulElem = document.createElement('ul');

    
    arrayPaises.forEach(pais => {
        const divCerrar = document.createElement('div');
        divCerrar.id = 'cerrar';
        divCerrar.innerHTML = `<a href="javascript:cerraVentana(${pais.id});"><i class="fa-solid fa-rectangle-xmark"></i></a>`;
       
        const divElem = document.createElement('div');
        divElem.className = 'ventana';
        divElem.id = pais.id;
        divElem.appendChild(divCerrar);

        let poblacionCFormato = Intl.NumberFormat("de-DE").format(pais.poblacion);
        let ladoCFormato = pais.circula === 'right' ? 'derecho' : 'izquierdo';
        divElem.innerHTML += '<p class="titulo_info">Datos de interés</p>';
        divElem.innerHTML += `<p><span>La capital es</span> ${pais.capital}</p>`;
        divElem.innerHTML += `<p><span>La población es de</span> ${poblacionCFormato} <span>habitantes</span></p>`;
        divElem.innerHTML += `<p><span>Se circula por el lado</span> ${ladoCFormato}</p>`;
        
        let liElem = document.createElement('li');
        liElem.innerHTML = `
        <a href="javascript:abrirVentana(${pais.id});"><img src="${pais.bandera}" alt="${pais.nombre}"></a>
        <p>${pais.nombre}</p>`;
        
        liElem.appendChild(divElem);
        ulElem.appendChild(liElem);
    });
    container.appendChild(ulElem);
  
}

function abrirVentana(id) {
    const divPais = document.getElementById(id);
    idVentana = id;
    divPais.style.display = 'block';
}

function cerraVentana(id) {
    const divPais = document.getElementById(id);
    idVentana = id;
    divPais.style.display = 'none';
}
 
body.addEventListener("click",function(event) {
    var popup = document.getElementById(idVentana);
    const elemento = event.target;
    if (elemento !== null && elemento.id != popup.id){
        cerraVentana(popup.id);
    }
  });
 
  

function showError(txt){
    let div = document.createElement('div');
    div.innerHTML = txt;
    container.appendChild(div);
}


/*

function getApiPaises(){
    fetch('https://restcountries.com/v3/all').then((response) => {
        if (!response.ok) {
            throw new Error('Ha ocurrido un error en la solicitud');
        }
        return response.json();
    })
    .then ((dataPaises) => {
        //const pruebaArray = dataPaises.slice(0,20);
       // console.log(pruebaArray);
        getInfoPaises(dataPaises);
    })
    .catch((error) => {
        showError(error);
    });
}
*/