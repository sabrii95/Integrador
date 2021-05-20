
$(document).ready(() => {

    const opciones = {
        type: "",
        debilidad:"",
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

    });



    $('.tipo').click(async (response) => {
        if(response.target.dataset.value ==  opciones.type ){
            $(response.target).removeClass('invertir-color');
        }
        else{
            opciones.type = response.target.dataset.value;
            $(response.target).addClass('invertir-color');
        }

    });

    $('.debilidad').click(async (response) => {
        if(response.target.dataset.value ==  opciones.debilidad ){
            opciones.debilidad="";
            $(response.target).removeClass('invertir-color');
            console.log(opciones.debilidad)
        }
        else{
            opciones.debilidad = response.target.dataset.value;
            $(response.target).addClass('invertir-color');
            console.log(opciones.debilidad)
        }
        console.log(JSON.stringify(opciones))

    })



    $('.type-eggs').click(async (response) => {
        opciones.eggs = response.target.dataset.value;
    })

    $('#busqueda-Avanzada').click(async () => {
        $('#listado-pokemon').text("");
        $('.list-container').text("");


        console.log(JSON.stringify(opciones))
        if (opciones.eggs != "") {
            const eggs = await buscarTiposHuevos(opciones.eggs)
            const json = eggs.response;
            json.map(async x => {
                let pokemon = await buscarPokemon(x.name);
                if (pokemon.code != 400) {
                    if (opciones.type != "") {
                        const tipos = (pokemon.response.type)
                        tipos.map(async x => {
                            if (x.type.name == opciones.type) añadirPokemon(pokemon.response)
                        })
                    }

                    else añadirPokemon(pokemon.response)
                }

            });


        }
        else if (opciones.type != "") {
            const type = await buscarTiposPokemon(opciones.type);
            json = type.response
            json.map(async x => {
                let pokemon = await buscarPokemon(x.pokemon.name);

                console.log(pokemon.code)
                if (pokemon.code != 400 ) {
                    console.log(pokemon.code)
                    const tipos = (pokemon.response.type)
                    tipos.map(async x => {
                        if (x.type.name == opciones.type) añadirPokemon(pokemon.response)
                    })

                }


            });
        }
        else if(opciones.debilidad != ""){
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

    var allOptions = $("#lista-huevos").children('li:not(.init)');
    $("#lista-huevos").on("click", "li:not(.init)", function () {

        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#option-selected").html($(this).html())
        console.log("this"+JSON.stringify($(this)))

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
                response: { image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`, especie: response.name, type: response.types }
            };
        } catch ({ error }) {
            console.log("algo salio mal")
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

