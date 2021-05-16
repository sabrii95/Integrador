
$(document).ready(() => {

    const opciones = {
        type: "",
        debilidad: "",
        eggs: "",
        height: 100000000000,
        width: 100000000000
    }


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

    $('.debilidad').click(async (response) => {
        if (response.target.dataset.value == opciones.debilidad) {
            opciones.debilidad = "";
            $(response.target).removeClass('invertir-color');

        }
        else {
            opciones.debilidad = response.target.dataset.value;
            $(response.target).addClass('invertir-color');

        }


    })
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
        console.log(JSON.stringify(opciones))

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
        console.log(JSON.stringify(opciones))

    })



    $('.type-eggs').click(async (response) => {
        opciones.eggs = response.target.dataset.value;
    })

    $('#busqueda-Avanzada').click(async () => {
        $('#listado-pokemon').text("");
        $('.list-container').text("");
        var pokemones = [];

        if (opciones.eggs != "") {

            const eggs = await buscarTiposHuevos(opciones.eggs)
            const json = eggs.response;
            for await (let x of json) {
                let pokemon = await buscarPokemon(x.name);
                pokemones.push(pokemon)
            }

        }
        if (opciones.type != "" && opciones.eggs == "") {
            const type = await buscarTiposPokemon(opciones.type);
            const json = type.response;
            // console.log(JSON.stringify(json))

            for await (let x of json) {
             
                let pokemon = await buscarPokemon(x.pokemon.name);
                // console.log(pokemon)
                pokemones.push(pokemon)
            }


        }
        else if (opciones.type != "" && opciones.eggs != "") {
            // console.log("typePokemon" +pokemones)

            const typePokemon = filtrarPorTipo(pokemones, opciones.type)
            console.log("typePokemon" + typePokemon.length + "" + pokemones.length)
            pokemones = typePokemon;


        }
        //console.log(JSON.stringify(pokemones))
        const filtradoPeso = filtrasPorPeso(pokemones, opciones.width)
        const filtradoAltura = filtrarAltura(filtradoPeso, opciones.height)
        console.log("tamaño" + pokemones.length + "otra " + filtradoPeso.length)

        for await (let x of filtradoAltura) {

            añadirPokemon(x.response);

        }

        console.log(JSON.stringify(opciones))
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



    const filtrasPorPeso = (coleccion, peso) => {

        if (peso > 500 && peso < 100000000000) {
            let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.peso > 500);

            return coleccionfiltrado;
        }
        if (peso < 501) {
            let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.peso < peso);
            // console.log(coleccionfiltrado.length)
            return coleccionfiltrado;
        }
        return coleccion

    }
    const filtrarAltura = (coleccion, altura) => {
        if (altura > 16 && altura < 100000000000) {
            let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.altura > 16);

            return coleccionfiltrado;
        }
        if (altura < 17) {
            let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.altura < altura);
            // console.log(coleccionfiltrado.length)
            return coleccionfiltrado;
        }
        return coleccion

    }

    const filtrarPorTipo = (coleccion, type) => {
        let coleccionTipos= [];
        coleccion.map( pokemomon => {
            console.log(pokemomon.response.type[0].type.name)
            // console.log(pokemon.code)
            const tipos = (pokemomon.response.type)
            tipos.map( x  => {
                if (x.type.name == opciones.type)
                coleccionTipos.push(pokemomon) 
            })

        });

        // if (pokemon.response.type.length == 2) {
        //     let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.type[0].type.name == type || pokemon.response.type[1].type.name == type);
        // } else {
        //     let coleccionfiltrado = coleccion.filter(pokemon => pokemon.response.type[0].type.name == type);
        // }

        return coleccionTipos;



    }


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

    var allOptions = $("#lista-huevos").children('li:not(.init)');
    $("#lista-huevos").on("click", "li:not(.init)", function () {

        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#option-selected").html($(this).html())
        // console.log("this" + JSON.stringify($(this)))

        allOptions.toggle();

    });



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
                response: { image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`, especie: response.name, type: response.types, peso: response.weight, altura: response.height }
            };
        } catch ({ error }) {

            return { code: 400, response: "ocurrio un error al recuperar la informacion" }

        }


    }
    const añadirPokemon = (data) => {

        if (data.type.length == 1) {


            $("<article>", {
                'class': 'pokemon'
                // 'class': 'Poke-card'
            }).append(
                $('<figure>', {
                    'src': data.image,
                    'alt': data.especie
                }),

                $('<img>', {
                    'src': data.image,
                    'alt': data.especie
                }),
                $('<h5>', {
                    'text': data.especie.toUpperCase(),
                    'class': 'nombre-pokemon'
                })
                ,
                $('<h5>', {
                    'text': data.type[0].type.name.toUpperCase(),
                    'class': `tipos-pokemon ${data.type[0].type.name.toUpperCase()}`

                })

            ).hide().appendTo('#listado-pokemon').fadeIn('fast');
        }
        else {

            $("<article>", {
                'class': 'pokemon'
            }).append(
                $('<img>', {
                    'src': data.image,
                    'alt': data.especie
                }),
                $('<h5>', {
                    'text': data.especie.toUpperCase(),
                    'class': 'nombre-pokemon'
                })
                ,
                $('<h5>', {
                    'text': data.type[0].type.name.toUpperCase(),
                    'class': `tipos-pokemon ${data.type[0].type.name.toUpperCase()}`

                }), $('<h5>', {
                    'text': data.type[1].type.name.toUpperCase(),
                    'class': `tipos-pokemon ${data.type[1].type.name.toUpperCase()}`,


                })

            ).hide().appendTo('#listado-pokemon').fadeIn('fast');

        }


    }

    const buscarTiposPokemon = async (tipo) => {
        try {
            const response = await $.ajax(`https://pokeapi.co/api/v2/type/${tipo}`);
            var json = response.pokemon;
            // json.map(async x => {
            //     console.log("nombre"+x.pokemon.name)

            //      let image = await buscarPokemon(x.pokemon.name);

            //      if(image != 400)  añadirPokemon(image);


            // });

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

})

