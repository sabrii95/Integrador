

$(document).ready(async () => {
    
    var listadoPokemonFavorito=[];


    const añadirPokemon = (data) => {

        if (data.type.length == 1) {


            $("<article>", {
                'class': 'pokemon',
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
                $('<h5>', {
                    'text': data.type[0].type.name.toUpperCase(),
                    'class': `tipos-pokemon ${data.type[0].type.name.toUpperCase()}`

                }),
                $('<div>', {
                    // 'text': data.type[0].type.name.toUpperCase()             
                    'class': 'favorito'
                }).append($
                    ('<img>', {
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
                'class': 'pokemon'
            }).append(
                $('<img>', {
                    'src': data.image,
                    'alt': data.especie
                }),
                $('<div>', {
                    // 'text': data.type[0].type.name.toUpperCase(),
                    // 'src': '../img/estrella.png',
                    // 'alt': 'icono favorito',
                    'class': 'contendor-favorito'

                }),
                $('<h5>', {
                    'text': data.especie.toUpperCase(),
                    'class': 'nombre-pokemon'
                }),


                $('<h5>', {
                    'text': data.type[0].type.name.toUpperCase(),
                    'class': `tipos-pokemon ${data.type[0].type.name.toUpperCase()}`

                }), $('<h5>', {
                    'text': data.type[1].type.name.toUpperCase(),
                    'class': `tipos-pokemon ${data.type[1].type.name.toUpperCase()}`,


                }),


            ).hide().appendTo('#listado-pokemon').fadeIn('fast');

        }


    }

    for (x = 0; x <= localStorage.length - 1; x++) {
        clave = localStorage.key(x);
        const valor = localStorage.getItem(clave)

        const calor = JSON.parse(valor);
        añadirPokemon(calor)
        console.log("localso", (calor))

    }

})