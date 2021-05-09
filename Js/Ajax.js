
$(document).ready(() => {

    $(buscar).click( ()=>{
    let input = $(search).val().trim();
    buscarColor(input);
    })

    const buscarColor = (color)=>{
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-color/${color}`,
            method: "GET",
            async: true,
            success: (response) => {
                        var json =   response.pokemon_species;
                        json.map(x=>{
                            console.log(x.url)
                            $("<article>", {
                                'class': 'pokemon'
                            }).append(
                                $('<img>', {
                                    'src': x.url,
                                    'alt': x.name
                                }),
                                $('<h5>', {
                                    'text': x.name
                                })
                            ).hide().appendTo('#listado-pokemon').fadeIn('slow');

                        });
                    },
            error: (xhr) => {
                console.log(xhr)
            }
        });
    }


})