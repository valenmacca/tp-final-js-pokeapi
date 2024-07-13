let LinkDeLaPokeAPI = "https://pokeapi.co/api/v2/pokemon";
let todoslospokemones = document.getElementById("todoslospokemonescard");

const botonesbusqueda = document.querySelectorAll(".btn-header");

let botondebuscar = document.getElementById("botondebuscar")
let buscatupojemon = document.getElementById("buscatupojemon")

botondebuscar.addEventListener("click", function(){
    let buscatupojemonvalor = buscatupojemon.value.toLowerCase()
    todoslospokemones.innerHTML = "";
        fetch(`https://pokeapi.co/api/v2/pokemon/${buscatupojemonvalor}`).then(ok =>{
            return ok.json()
        }).then(data =>{
            mostrarpokemon(data)
        }).catch(e =>{
            console.log(e)
        })
    
})

botonesbusqueda.forEach(boton => {
    boton.addEventListener("click", function(event) {
        const botonesparaelid = event.currentTarget.id;
        todoslospokemones.innerHTML = "";

        for (let index = 1; index <= 150; index++) {
            fetch(`${LinkDeLaPokeAPI}/${index}`)
                .then(Response => Response.json())
                .then(data => {
                    const tipos = data.types.map(type => type.type.name);
                    if(botonesparaelid === "ver-normal"){
                        mostrarpokemon(data)

                    }
                        if (tipos.includes(botonesparaelid)) {
                            mostrarpokemon(data);
                        }
                    

                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
});


function mostrarpokemon(pokedata) {
    let tiposdepokemones = pokedata.types.map(type => `
        <p class="tiposdepokemon ${type.type.name}">${type.type.name}</p>
    `).join(" ");


    const divdelpokemon = document.createElement("div");
    divdelpokemon.classList.add("cardspokemones");
    divdelpokemon.innerHTML = `
        <div class="imgdelpokemondivs">
            <img src="${pokedata.sprites.other["official-artwork"].front_default}" alt="${pokedata.name}" class="imagendelospokemos">
        </div>
        <div class="datosdelpokemon">
            <p class="numerodeserie">#${pokedata.id}</p>
            <p class="nombredelpokemon">${pokedata.name}</p>
        </div>
        <div class="pokemonvalor">
            ${tiposdepokemones}
        </div>
        <div class="pokemonstats">
            <p class="peso">${pokedata.weight}kg</p>
            <p class="altura">${pokedata.height}M</p>
        </div>
    `;
    todoslospokemones.appendChild(divdelpokemon);
}

async function guardarlospokemones() {
    for (let i = 1; i <= 150; i++) {
        try {
            let respuestadelfech = await fetch(`${LinkDeLaPokeAPI}/${i}`);
            let pasarajson = await respuestadelfech.json();
            mostrarpokemon(pasarajson);
        } catch (error) {
            console.log(error);
        }
    }
}

guardarlospokemones();



// ``