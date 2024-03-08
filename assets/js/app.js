
$(document).ready(function () {


    const formulario = $("#formulario")
    const inputform = $("#inputFormulario")
    const entregaSuperHero = $("#entregaSuperHero")
    const chartContainer = $("#chartContainer")





    formulario.on("submit", function (stopActualizacion) {
        stopActualizacion.preventDefault()
        console.log("diste submit")


        const inputUser = parseInt(inputform.val().trim())
        console.log(inputUser)



        if (inputUser > 0) {
            console.log("Es correcta la busqueda")
            inputform.addClass("is-valid")
            inputform.removeClass("is-invalid")
            getNumero(inputUser)
        } else {
            console.log("No es correcto")
            inputform.addClass("is-invalid")
            inputform.removeClass("is-valid")
        }

    })



    const getNumero = (numeroApi) => {


        $.ajax({
            url: `https://www.superheroapi.com/api.php/10231403815334635/${numeroApi}`,
            method: "GET",

            success(infoApi) {
                console.log(infoApi);


                const hero = {
                    name: infoApi.name,
                    image: infoApi.image.url,
                    connections: infoApi.connections["group-affiliation"],
                    connectionsDos: infoApi.connections.relatives,
                    publisher: infoApi.biography.publisher,
                    occupation: infoApi.work.occupation,
                    firstAppearance: infoApi.biography["first-appearance"],
                    height: infoApi.appearance.height.join(" "),
                    weight: infoApi.appearance.weight.join(" "),
                    aliases: infoApi.biography.aliases.join(" "),
                    combat: infoApi.powerstats.combat,
                    durability: infoApi.powerstats.durability,
                    intelligence: infoApi.powerstats.intelligence,
                    power: infoApi.powerstats.power,
                    speed: infoApi.powerstats.speed,
                    strength: infoApi.powerstats.strength

                }



                entregaSuperHero.html(`
                <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${infoApi.image.url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Nombre: ${infoApi.name}</li>
                                        <li class="list-group-item">Conexiones: ${infoApi.connections["group-affiliation"]} ${infoApi.connections.relatives}</li>
                                        <li class="list-group-item">Publicado por: ${infoApi.biography.publisher}</li>
                                        <li class="list-group-item">Ocupacion: ${infoApi.work.occupation}</li>
                                        <li class="list-group-item">Primera Aparicion: ${infoApi.biography["first-appearance"]}</li>
                                        <li class="list-group-item">Altura: ${infoApi.appearance.height.join(" ")}</li>
                                        <li class="list-group-item">Peso ${infoApi.appearance.weight.join(" ")}</li>
                                        <li class="list-group-item">Alianzas: ${infoApi.biography.aliases.join(" ")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `)




                const options = {

                    title: {
                        text: `Estadisticas de poder para ${infoApi.name}`
                    },
                    animationEnabled: true,

                    data: [
                        {
                            type: "pie",

                            dataPoints: [
                                { y: infoApi.powerstats.combat, label: "combat" },
                                { y: infoApi.powerstats.durability, label: "durability" },
                                { y: infoApi.powerstats.intelligence, label: "intelligence" },
                                { y: infoApi.powerstats.power, label: "power" },
                                { y: infoApi.powerstats.speed, label: "speed" },
                                { y: infoApi.powerstats.strength, label: "strength" },

                            ]

                        }

                    ]

                }
                chartContainer.CanvasJSChart(options);









            },
            error(malito) {
                console.log(malito)

            }
        })



    }

})

