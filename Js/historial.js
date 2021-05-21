

$(document).ready(async () => {

    const añadirPokemon = (data) => {

        if (data != null) {
            if (data.type.length == 1) {


                $("<article>", {
                    'class': 'pokemon',
                    'data-value': data.especie,
                }).append(
                    $('<img>', {
                        'src': data.image,
                        'alt': data.especie,


                    }),
                    $('<h5>', {
                        'text': data.especie.toUpperCase(),
                        'class': 'nombre-pokemon'
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

                            'class': 'item-favorito'

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
                        'src': data.image,
                        'alt': data.especie
                    }),
                    $('<h5>', {
                        'text': data.especie.toUpperCase(),
                        'class': 'nombre-pokemon'
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
                            'class': 'item-favorito'

                        })

                    )


                ).hide().appendTo('#listado-pokemon').fadeIn('fast');

            }

        }
    }
    for (x = 0; x <= localStorage.length - 1; x++) {
        clave = localStorage.key(x);
        const valor = localStorage.getItem(clave)
        let sustraer = clave.substring(0,4)

        const pokemonparseado = JSON.parse(valor);
        
        if ( sustraer == 'hist') {
            console.log(sustraer+ " especia "+pokemonparseado.especie )
            añadirPokemon(pokemonparseado)

        }

    }



})