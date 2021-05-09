
$(document).ready(() => {

    $(buscar).click(() => {
        let input = $(search).val().trim();
        buscarColor(input);


    })

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
   

            return {code:200, response:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`};
        } catch ({ error }) {
            return {code:400, response: error}

        }


    }

})

