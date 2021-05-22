
$(document).ready(async () => {
    const opciones = {
        type: "",
        debilidad: "",
        eggs: "",
        height: 100000000000,
        width: 100000000000
    }
    var listadoTotalPokemon = [];
    var limit = 15;
    var offset = 0;
    var i = 0;
    var totalPokemonFiltrado = null;
    var allOptions = $("#lista-huevos").children('li:not(.init)');
    var pokemones = [];


    $(buscar).click(async () => {
        $('#listado-pokemon').text("");
        $('.list-container').text("");
        let input = $(search).val().trim();
        const pokemon = await buscarPokemon(input);
        añadirPokemon(pokemon.response)
    });

    $('#Restablecer').click(async () => {
        opciones.eggs = "";
        opciones.type = "";
        opciones.debilidad = "";
        opciones.height = 100000000000;
        opciones.width = 100000000000;
        $('.tipo').removeClass('invertir-color');
        $("#option-selected").text('Todas')
        $('.item-peso').removeClass('invertir-color-PesoAltura');
        $('#listado-pokemon').text("");
        $('.list-container').text("");

    });



    $('.tipo').click(async (response) => {
        if (response.target.dataset.value == opciones.type) {
            opciones.type = ""
            $(response.target).removeClass('invertir-color');
        }
        else {
            $('.tipo').removeClass('invertir-color');
            opciones.type = response.target.dataset.value;
            $(response.target).addClass('invertir-color');

        }

    });

    // $('.debilidad').click(async (response) => {
    //     if (response.target.dataset.value == opciones.debilidad) {
    //         opciones.debilidad = "";
    //         $(response.target).removeClass('invertir-color');

    //     }
    //     else {
    //         opciones.debilidad = response.target.dataset.value;
    //         $(response.target).addClass('invertir-color');

    //     }


    // })
    $('.item-peso').click(async (response) => {
        if (response.target.dataset.value == opciones.width) {
            opciones.width = 100000000000;
            $(response.currentTarget).removeClass('invertir-color-PesoAltura');

        }
        else {
            $('.item-peso').removeClass('invertir-color-PesoAltura');
            $(response.currentTarget).addClass('invertir-color-PesoAltura');
            opciones.width = response.target.dataset.value;
        }


    })
    $('.item-altura').click(async (response) => {
        if (response.target.dataset.value == opciones.height) {
            opciones.height = 100000000000;
            $(response.currentTarget).removeClass('invertir-color-PesoAltura');

        }
        else {
            $('.item-altura').removeClass('invertir-color-PesoAltura');
            $(response.currentTarget).addClass('invertir-color-PesoAltura');
            opciones.height = response.target.dataset.value;
        }


    })

    $('.type-eggs').click(async (response) => {
        opciones.eggs = response.target.dataset.value;
    })

    $('#busqueda-Avanzada').click(async () => {
        $('#listado-pokemon').text("");
        $('.list-container').text("");
        console.log(JSON.stringify(opciones))
        pokemones = [];
        totalPokemonFiltrado = null;;
        limit = 0;
        offset = 0;
        i = 0;

        if (opciones.eggs != "") {
            const eggs = await buscarTiposHuevos(opciones.eggs)
            console.log(eggs.response)
            totalPokemonFiltrado = eggs.response

            paginado();


        }
        else if (opciones.type != "" && opciones.eggs == "") {
            totalPokemonFiltrado = null;
            const type = await buscarTiposPokemon(opciones.type);
            totalPokemonFiltrado = type.response
            paginado();


        }
        else if (opciones.type == "" && opciones.eggs == "") {
            // pokemones = []
            // console.log("voy a llamar")
            // let pokemons = await buscarTodosPokemon(offset);
            // console.log(pokemons);

            // offset = offset + 15;
            paginado()

        }

        


        // else if (opciones.type != "" && opciones.eggs != "") {

        //     const typePokemon = filtrarPorTipo(pokemones, opciones.type)
        //     // console.log("typePokemon" + typePokemon.length + "" + pokemones.length)
        //     pokemones = typePokemon;


        // }
        // else if (opciones.type == "" && opciones.eggs == "") {
        //     pokemones = []
        //     pokemones = await completarListadoPokemon(offset);

        //     offset = offset + 15;

        // }


        // const filtradoPeso = filtrasPorPeso(pokemones, opciones.width)
        // filtradoAltura = filtrarAltura(filtradoPeso, opciones.height)

        // totalPokemonFiltrado = filtradoAltura.length;
        // paginado()
        // if (totalPokemonFiltrado < limit) limit = totalPokemonFiltrado
        // else $('.carga').addClass('visualizar-huevos');

        // for (i = i; i < limit; i++) {
        //     añadirPokemon(filtradoAltura[i].response);
        // }

        // limit += 50;
        // if (totalPokemonFiltrado === limit) $('.carga').addClass('ocultar');
        // else if (totalPokemonFiltrado < limit) limit = totalPokemonFiltrado;
        // else $('.carga').addClass('visualizar-huevos');



        // console.log("totalPokemonFiltrado" + totalPokemonFiltrado, "limit" + limit)
        // for (i = i; i < limit; i++) {
        //     añadirPokemon(filtradoAltura[i].response);
        // }

        // limit += 50;





        // for (const x of filtradoAltura) {
        //     añadirPokemon(x.response);
        // }
        // for await (let x of filtradoAltura) {

        //     añadirPokemon(x.response);

        // }


        // else if (opciones.type != "") {
        //     const type = await buscarTiposPokemon(opciones.type);
        //     json = type.response
        //     json.map(async x => {
        //         let pokemon = await buscarPokemon(x.pokemon.name);

        //         // console.log(pokemon.code)
        //         if (pokemon.code != 400) {
        //             // console.log(pokemon.code)
        //             const tipos = (pokemon.response.type)
        //             tipos.map(async x => {
        //                 if (x.type.name == opciones.type) añadirPokemon(pokemon.response)
        //             })

        //         }


        //     });
        // }
        // else if (opciones.debilidad != "") {


        // }


    })

    const filtradoTodosPokemon = async ()=>{
        let pokemons = await buscarTodosPokemon(offset);
        let pokemonFiltrado;
        console.log(pokemons.response.length)
        for await (let x of pokemons.response) {
         
            let pokemon = await buscarPokemon(x.name);
            offset +=1;
            if (pokemon.code == 200) {
               
                pokemonFiltrado = filtrasPorPeso(pokemon, opciones.width)
                pokemonFiltrado = filtrarAltura(pokemonFiltrado, opciones.height)

                if (pokemonFiltrado != null) {
                   
                    if (consultarFavorito(pokemonFiltrado.response.especie)){
                        pokemonFiltrado.response.favorito =true;
                        console.log("marque como favorito a ",pokemonFiltrado.response.especie)
                    }
    
                    limit += 1;

                    añadirPokemon(pokemon.response)
                    pokemones.push(pokemon.response)
                    console.log("pokemones len"+pokemones.length+"ofset"+offset )

                    
                    if (limit == 15) {
                        console.log("ofset" + offset)
                        return
                    }

                }

            }

        }

    } 


    const filtrarContenidoPorTipo = async () => {
        let coleccionTipo = totalPokemonFiltrado.slice(offset)
        let pokemonFiltrado;
        limit = 0;
        console.log("Los consegui")


        for await (let x of coleccionTipo) {
            let pokemon = await buscarPokemon(x.pokemon.name);
            offset +=1;
            if (pokemon.code == 200) {
                console.log("pokemon procesado")
                pokemonFiltrado = filtrasPorPeso(pokemon, opciones.width)
                pokemonFiltrado = filtrarAltura(pokemonFiltrado, opciones.height)

                if (pokemonFiltrado != null) {
                   
                    if (consultarFavorito(pokemonFiltrado.response.especie)){
                        pokemonFiltrado.response.favorito =true;
                        console.log("marque como favorito a ",pokemonFiltrado.response.especie)
                    }
    
                    limit += 1;

                    añadirPokemon(pokemon.response)


                    pokemones.push(pokemon.response)
                    if (limit == 15) {
                        console.log("ofset" + offset)
                        return
                    }

                }

            }

        }

    }

    const filtrarContenidoPorHuevo = async () => {
        let coleccionHuevos = totalPokemonFiltrado.slice(offset)
        let pokemonFiltrado;
        limit = 0;

        for await (let x of coleccionHuevos) {
            let pokemon = await buscarPokemon(x.name);
            offset += 1;
            if (pokemon.code == 200) {
                pokemonFiltrado = filtrarPorTipo(pokemon)
                pokemonFiltrado = filtrasPorPeso(pokemonFiltrado, opciones.width)
                // if (pokemonFiltrado != null) {
                pokemonFiltrado = filtrarAltura(pokemonFiltrado, opciones.height)
            }

            if (pokemonFiltrado != null) {
                if (consultarFavorito(pokemonFiltrado.response.especie)){
                    pokemonFiltrado.response.favorito =true;
                    console.log("marque como favorito a ",pokemonFiltrado.response.especie)
                }
                

                limit += 1;
                añadirPokemon(pokemon.response)
                pokemones.push(pokemon.response)

                if (limit == 15) {

                    return
                }

            }

        }


    }

    $('#listado-pokemon').on('click', '.info-pokemon', (response) => {
        // console.log("me presionaste")
     
        console.log("me presionaste y soy el articule" + response.currentTarget.dataset.value)

        if (response.currentTarget.dataset.value != undefined) {

            añadirItemHistorial(response.currentTarget.dataset.value)

        }
    })

    $('#logooo').click((response)=>{
        console.log(response)

    })

    $('#listado-pokemon').on('click', '.favorito img', (response) => {
        // console.log("me presionaste")
        // console.log( response.currentTarget)

        if (response.target.dataset.value != undefined) {
            const exist = localStorage.getItem(response.target.dataset.value)

            if (exist != null) {
                $(response.currentTarget).removeClass('restablecer-Opacidad')
                $(response.currentTarget).addClass('item-favorito')
                const exists = JSON.parse(exist)
                
                eliminarFavoritoPokemon(response.target.dataset.value)
            }
            else{ 
                marcarFavoritoPokemon(response.target.dataset.value)
                // $(response.currentTarget).css({'opacity':1})
                $(response.currentTarget).removeClass('item-favorito')
                $(response.currentTarget).addClass('restablecer-Opacidad')
                
            }
            
            

        }
    })


    $('#desplegar-busqueda').click(() => {
        $('.tipos').toggleClass('visualizar-tipos');
        $('.eggs').toggleClass('visualizar-huevos');
        $('.tamaño-pokemon').toggleClass('visualizar-huevos');
        $('.boton').toggleClass('visualizar-huevos');

    })


    $('#all-eggs').click(async () => {
        $('.eggs ul').css({ 'height': 'auto' })
        $('.type-eggs').css({ 'display': 'block' })
    })


    $("#lista-huevos").on("click", ".init", function () {
        $(this).closest("#lista-huevos").children('li:not(.init)').toggle();


    });


    $("#lista-huevos").on("click", "li:not(.init)", function () {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#option-selected").html($(this).html())
        allOptions.toggle();

    });


    $('.carga').click(async () => {


        paginado();


        // if (opciones.type != "" || opciones.eggs != "") paginado()
        // else {
        //     pokemones = await completarListadoPokemon(offset);

        //     const filtradoPeso = filtrasPorPeso(pokemones, opciones.width)
        //     filtradoAltura = filtrarAltura(filtradoPeso, opciones.height)

        //     totalPokemonFiltrado = filtradoAltura.length;
        //     paginado()

        // }


    });

    const paginado = async () => {
        if (opciones.eggs != "") {

            if (offset < totalPokemonFiltrado.length) {
                $('.carga').removeClass('ocultar');
                $('.carga').addClass('visualizar-huevos');
                await filtrarContenidoPorHuevo();

            }
            console.log("ofset " + offset + " totalPokemonFiltrado.length " + totalPokemonFiltrado.length)
            if (offset >= totalPokemonFiltrado.length) {
                $('.carga').removeClass('visualizar-huevos');
                $('.carga').addClass('ocultar');
            }


        }
        else if (opciones.type != "" && opciones.eggs == "") {
            if (offset < totalPokemonFiltrado.length) {
                $('.carga').removeClass('ocultar');
                $('.carga').addClass('visualizar-huevos');
                await filtrarContenidoPorTipo();

            }
            console.log("ofset" + offset)
            if (offset >= totalPokemonFiltrado.length) {
                $('.carga').removeClass('visualizar-huevos');
                $('.carga').addClass('ocultar');
            }


        }
        else if (opciones.type == "" && opciones.eggs == "") {
            if (offset == 0) {
                $('.carga').removeClass('ocultar');
                $('.carga').addClass('visualizar-huevos');
             
                await filtradoTodosPokemon()
            }
            else if (pokemones.length <1118 ) {
                $('.carga').removeClass('ocultar');
                $('.carga').addClass('visualizar-huevos');
             
                await filtradoTodosPokemon()

            }
            else if ( pokemones.length == 1118) {
                $('.carga').removeClass('visualizar-huevos');
                $('.carga').addClass('ocultar');
            }
            

            

        }


        // if (totalPokemonFiltrado < limit) { console.log("mayor"); limit = totalPokemonFiltrado; }
        // if (opciones.type != "" || opciones.eggs != "") {
        //     console.log("totalPokemonFiltrado" + totalPokemonFiltrado, "limite" + limit)


        //     if (totalPokemonFiltrado > limit) {


        //         $('.carga').removeClass('ocultar');
        //         $('.carga').addClass('visualizar-huevos');
        //     }
        //     if (totalPokemonFiltrado == limit) {

        //         $('.carga').removeClass('visualizar-huevos');
        //         $('.carga').addClass('ocultar');
        //     }

        // }
        // else {

        //     if (pokemones.length == 1118) {
        //         $('.carga').removeClass('visualizar-huevos');
        //         $('.carga').addClass('ocultar');
        //     }
        //     else {
        //         $('.carga').removeClass('ocultar');
        //         $('.carga').addClass('visualizar-huevos');

        //     }


        // }


        // for (i = i; i < limit; i++) {
        //     añadirPokemon(filtradoAltura[i].response);
        // }

        // limit += 15;
        // offset = offset + 15;


        // if (totalPokemonFiltrado < limit) {
        //     limit = totalPokemonFiltrado;
        // }
        // if (totalPokemonFiltrado === limit) $('.carga').addClass('ocultar');

        // console.log("totalPokemonFiltrado" + totalPokemonFiltrado, "limit" + limit)
        // for (i = i; i < limit; i++) {
        //     añadirPokemon(filtradoAltura[i].response);
        // }

        // limit += 50;


    }


    const filtrasPorPeso = (pokemon, peso) => {
        let peokemon_peso = null;

        if (pokemon != null && peso != 100000000000) {

            if (peso > 500) {

                if (pokemon.response.peso > 500 && pokemon.response.peso < 100000000000) {

                    peokemon_peso = pokemon;

                }
            }
            if (peso < 501) {

                if (pokemon.response.peso < 501) {

                    peokemon_peso = pokemon;

                }
            }
            return peokemon_peso
        }
        else {
            return pokemon
        }




        // if (peso > 500 && peso < 100000000000) {
        //     let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.peso > 500);

        //     return coleccionfiltrado;
        // }
        // if (peso < 501) {
        //     let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.peso < peso);
        //     // console.log(coleccionfiltrado.length)
        //     return coleccionfiltrado;
        // }
        // return coleccion

    }
    const filtrarAltura = (pokemon, altura) => {
        let peokemon_altura = null;

        if (pokemon != null && altura != 100000000000) {
            if (altura > 16) {
                console.log("es ingrese por alto ", altura + " en el response " + pokemon.response.altura)

                if (pokemon.response.altura > 16 && pokemon.response.altura < 100000000000) peokemon_altura = pokemon
            }
            if (altura < 17) {
                ("es ingrese por bajo ", altura + " en el response " + pokemon.response.altura)
                if (pokemon.response.altura < 17) peokemon_altura = pokemon
            }
            return peokemon_altura
        }
        else {
            return pokemon
        }

        // if (altura > 16 && altura < 100000000000) {
        //     let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.altura > 16);

        //     return coleccionfiltrado;
        // }
        // if (altura < 17) {
        //     let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.altura < altura);
        //     // console.log(coleccionfiltrado.length)
        //     return coleccionfiltrado;
        // }
        // return coleccion

    }

    const filtrarPorTipo = (pokemon, type) => {

        let tipo = null;
        // pokemon.response.type[0].type.name 
        if (opciones.type == "") {
            return pokemon
        }
        else {
            if (pokemon != null) {
                pokemon.response.type.map(x => {
                    console.log("tipo" + x.type.name + "" + opciones.type)
                    if (x.type.name == opciones.type) {
                        tipo = pokemon;
                        console.log(JSON.stringify(tipo))
                    }


                })
            }
            return tipo
        }



        // let coleccionTipos = [];
        // coleccion.map(pokemomon => {
        //     console.log(pokemomon.response.type[0].type.name)
        //     // console.log(pokemon.code)
        //     const tipos = (pokemomon.response.type)
        //     tipos.map(x => {
        //         if (x.type.name == opciones.type)
        //             coleccionTipos.push(pokemomon)
        //     })

        // });
        // return coleccionTipos;



    }



    const buscarColor = async (color) => {

        const response = await $.ajax(`https://pokeapi.co/api/v2/pokemon-color/${color}`);
        var json = response.pokemon_species;

        json.map(async x => {

            let image = await buscarPokemon(x.name)
            if (image.code != 400) {
                $("<article>", {
                    'class': 'pokemon'
                }).append(
                    $('<img>', {
                        'src': image.response,
                        'alt': x.name
                    }),
                    $('<h5>', {
                        'text': x.name
                    })
                ).hide().appendTo('#listado-pokemon').fadeIn('fast');
            }
        });

    }


    const buscarPokemon = async (name) => {
        try {
            const response = await $.ajax(`https://pokeapi.co/api/v2/pokemon/${name}`);

            return {
                code: 200,
                response: { "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`, "especie": response.name, "type": response.types, "peso": response.weight, "altura": response.height, "favorito": false , historial: false}
            };
        } catch ({ error }) {

            return { code: 400, response: "ocurrio un error al recuperar la informacion" }

        }


    }
    const añadirPokemon = (data) => {
        let clas;
        if (data != null) {
            if (data.favorito == true)  clas = 'restablecer-Opacidad'
            else clas= "item-favorito"
            if (data.type.length == 1) {


                $("<article>", {
                    'class': 'pokemon',
                    
                }).append(
                    $('<img>', {
                        'src': data.image,
                        'alt': data.especie,
                        'data-value': data.especie,
                        'class': 'info-pokemon',


                    }),
                    $('<h5>', {
                        'text': data.especie.toUpperCase(),
                        'class': 'nombre-pokemon info-pokemon',
                        'data-value': data.especie,
                    })
                    ,

                    $('<div>', {
                        // 'text': data.type[0].type.name.toUpperCase()             
                        'class': 'favorito'
                    }).append(
                        $('<h5>', {
                            'text': data.type[0].type.name.toUpperCase(),
                            'class': `tipos-pokemon ${data.type[0].type.name.toUpperCase()}`

                        }),
                        $('<img>', {
                            // 'text': data.type[0].type.name.toUpperCase(),
                            'src': '../img/estrella.png',
                            'data-value': data.especie,
                            
                            'class': clas

                        })

                    )

                ).hide().appendTo('#listado-pokemon').fadeIn('fast');
            }
            else {

                $("<article>", {
                    'class': 'pokemon',
                    'data-value': data.especie,
                }).append(
                    $('<img>', {
                        'data-value': data.especie,
                        'src': data.image,
                        'alt': data.especie,
                        'class': 'info-pokemon',
                        
                    }),
                    $('<h5>', {
                        'data-value': data.especie,
                        'text': data.especie.toUpperCase(),
                        'class': 'nombre-pokemon info-pokemon'
                    }),
                    $('<div>', {
                        // 'text': data.type[0].type.name.toUpperCase(),
                        // 'src': '../img/estrella.png',
                        // 'alt': 'icono favorito',
                        'class': 'favorito'

                    }).append(
                        $('<h5>', {
                            'text': data.type[0].type.name.toUpperCase(),
                            'class': `tipos-pokemon ${data.type[0].type.name.toUpperCase()}`

                        }), $('<h5>', {
                            'text': data.type[1].type.name.toUpperCase(),
                            'class': `tipos-pokemon ${data.type[1].type.name.toUpperCase()}`,

                        }),
                        $('<img>', {
                            // 'text': data.type[0].type.name.toUpperCase(),
                            'src': '../img/estrella.png',
                            'data-value': data.especie,
                            'class':    clas

                        })

                    )


                ).hide().appendTo('#listado-pokemon').fadeIn('fast');

            }

        }
    }

    const buscarTiposPokemon = async (tipo) => {
        try {
            const response = await $.ajax(`https://pokeapi.co/api/v2/type/${tipo}`);
            var json = response.pokemon;

            return {
                code: 200,
                response: response.pokemon
            };

        } catch ({ error }) {
            return { code: 400, response: error }

        }
    }

    const buscarTiposHuevos = async (tipo) => {
        try {
            const response = await $.ajax(`https://pokeapi.co/api/v2/egg-group/${tipo}`);

            return {
                code: 200,
                response: response.pokemon_species
            };

        } catch ({ error }) {
            return { code: 400, response: error }

        }


    }

    const buscarTodosPokemon = async (offset) => {
        try {

            const response = await $.ajax(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`);

            return {
                code: 200,
                response: response.results
            };

        } catch ({ error }) {
            return { code: 400, response: error }

        }


    }

    const marcarFavoritoPokemon = async (name) => {
        const pokemonFavorito = buscarPokemon(name).then((resp) => {
            resp.response.favorito =true
            if (localStorage) {
                localStorage.setItem(name, JSON.stringify(resp.response))
            }
        })


        console.log("Se añadio elemento ")
    }

    const eliminarFavoritoPokemon = async (name) => {
    
        if (localStorage) {
            localStorage.removeItem(name)

        }

    }

    const consultarFavorito = ( pokemon)=>{
        if (localStorage) {

            const exist = localStorage.getItem(pokemon)
            if (exist == null) return false
            return true

        }

    }

    const añadirItemHistorial = async (name) => {
        keys = Math.floor(Math.random() * (10000000 - 0))
        const pokemonFavorito = buscarPokemon(name).then((resp) => {
            let pokemonHistorial = {
                image: resp.response.image,
                especie: resp.response.especie,
                type: resp.response.type,
                fechayhora:  "dfff",
                historial: true,
                favorito: false
            }
            
            if (localStorage) {
                localStorage.setItem( `historial${keys}`, JSON.stringify(pokemonHistorial))
            }
        })


     
    }


    // const completarListadoPokemon = async (offset) => {
    //     var todosPokemon = await buscarTodosPokemon(offset);
    //     for (const x of todosPokemon.response) {

    //         const pokemon = await buscarPokemon(x.name);
    //         listadoTotalPokemon.push(pokemon);

    //     }
    //     return listadoTotalPokemon

    // }





})



