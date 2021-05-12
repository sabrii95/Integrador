
$(document).ready(() => {

    const opciones = {
        type: "",
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
    })
    
    $('#Restablecer').click(async () => {
        opciones.eggs = "";
        opciones.type = "";
        opciones.height = 100000000000;
        opciones.width = 100000000000;
        $('.tipo').removeClass('invertir-color');
        // $('.type-eggs').removeClass('selected')
        // $('.type-eggs').removeClass('init')
        // $('#fijar').addClass('init');
        // $("#lista-huevos").children('.init').html($().html());

      
    })

    Restablecer


    $('.tipo').click(async (response) => {
        opciones.type = response.target.dataset.value;
        $('.tipo').removeClass('invertir-color');
        $(response.target).addClass('invertir-color');


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
            const json = eggs.response
            json.map(async x => {
                let pokemon = await buscarPokemon(x.name);
                if (pokemon.code === 200) {
                    if (opciones.type != "") {
                        const tipos = (pokemon.response.type)
                        tipos.map(async x => {                           
                            if ( x.type.name == opciones.type) añadirPokemon(pokemon.response)
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
                const tipos = (pokemon.response.type)
                tipos.map(async x => {                           
                    if ( x.type.name == opciones.type) añadirPokemon(pokemon.response)
                })
              

            });
        }





    })
          
    $('#desplegar-busqueda').click( ()=>{
        $('.tipos').toggleClass('visualizar-tipos');
        $('.eggs').toggleClass('visualizar-huevos');
        $('.boton').toggleClass('visualizar-huevos');



        
    })


    $('#all-eggs').click(async() => {

        $('.eggs ul').css({'height':'auto'})
        $('.type-eggs').css({ 'display': 'block' })
    })


    $("#lista-huevos").on("click", ".init", function() {
        $("#lista-huevos").addClass('definir-altura');
        $(this).closest("#lista-huevos").children('li:not(.init)').toggle();
        
        
    });
    
    var allOptions = $("#lista-huevos").children('li:not(.init)');
    $("#lista-huevos").on("click", "li:not(.init)", function() {
        
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#lista-huevos").children('.init').html($(this).html());
        

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
            return { code: 400, response: error }

        }


    }
    const añadirPokemon = (data) => {
        // console.log("name vacio"+data.response.name)


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

