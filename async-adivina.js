/**
 * Nota para el profesor:
 * Esta practica no ha sido copiada de ninguno de los compañeros de clase, sin embargo ciertos aspectos se han copiado
 * directamente de distintas paginas web, para su posterior tratamiento y adaptabilidad al codigo
 * 
 * Los comentarios son explicativos para poder entender yo el programa, ya que he tardado una semana en hacerlo y se me hacia
 * pesado tener que entender todo lo que iba haciendo desde 0, de igual manera espero que sirva para que puedas entender tambien
 * mas facilmente lo que hace el codigo, pero no es seguro que lo haga en todas practicas de aqui en adelante
 * 
 */

//Lista de nombres
const WORDS = [
    "Pedro",
    "Juan",
    "Alan",
    "Alejandro",
    "Emma",
    "Bernardo",
    "Marta",
    "Raquel",
    "Samuel",
    "Isabel"
]

const findCoincidence = (array, letter) => {
    const indices = [];

    let index = array.indexOf(letter);
    while (index !== -1) {
        indices.push(index);
        index = array.indexOf(letter, index + 1);
    }
    /**
     * Devuelve la lista de coincidencias, comparando (letter) con cada uno de los valores
     * del (array), similar a un array.forEach, pero con un while
     * Este codigo ha salido en base a la explicacion de .indexOf() de la pagina:
     * No es codigo a titulo propio, pero ha servido para que la funcionalidad de este programa 
     * se haya podido llevar a cabo
     * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
     */
    return indices
}

const isALetter = (letter) => {
    return letter.toLowerCase() != letter.toUpperCase()
    /** 
     * Compara si es una letra o no comprobando que el caracter no devuelva el mismo
     * valor, es decir, si es 5.UpperCase o 5.LowerCase devolvera false, si es A.UpperCase o a.LowerCase devolvera true
     * Este codigo se ha sacado de otra pagina, pero no he podido recuperar el link
     * En un inicio pensaba usar .test() pero no entendia bien lo que hacia, asi que usé esta variante
     * */
}

const loadWord = () => {
    return new Promise((resolve) => {
        const word = WORDS[(Math.floor(Math.random() * WORDS.length))]
        resolve(word)
        //Devuelve un nombre aleatorio usando Math.random() y pasado a integer con Math.floor
    })
}

const play = () => {
    return new Promise((resolve, reject) => {
        loadWord()
            .then((word) => {
                let err
                let array = Array.from(word.toLowerCase())

                let xword = []
                for (let i = 0; i < array.length; i++) {
                    xword.push("X")
                    //Crea la palabra pasada a x usando la misma longitud de la palabra original */
                }

                console.log(word)

                let isError = false
                let contador = 0

                //Bucle principal del juego, si detecta algun error se detiene y pasa a ºTratamiento de errores
                while (contador <= array.length) {

                    let answer = prompt(`Introduce ${contador + 1}º letra 
                            ${xword.join('')}`)

                    if (answer !== null) {
                        answer = answer.toLowerCase()

                        let coincidences = findCoincidence(array, answer)
                        coincidences === 0 ? contador = coincidences.length : contador++
                        if (answer === ('') || isALetter(answer)) {
                            for (let i = 0; i < coincidences.length; i++) {
                                xword[coincidences[i]] = answer
                                /**
                                 * Primero llama a la funcion findCoincidence(array, answer)
                                 * Lo que me devuelve la cantidad de coincidencias de(answer) dentro de (array)
                                 * Esto me devuelve otro array (coincidences[]), una vez hecho esto recorro la longitud
                                 * de coincidences
                                 */
                            }

                            xword[0] = xword[0].toUpperCase()
                            /**
                             * Pone la primera letra en mayusculas, aprovechando que todas las "X" ya estan en mayusculas, el usuario no 
                             * notara la diferencia
                             * */
                        } else {
                            //Tratamiento de errores
                            isError = true
                            let aintLetterError = `Error el valor introducido no es una letra 
                                Debes empezar el juego...`
                            alert(aintLetterError)
                            err = aintLetterError
                            break
                        }
                    } else {
                        isError = true
                        let gameCanceledError = 'Has cancelado el juego...'
                        alert(gameCanceledError)
                        err = gameCanceledError
                        break
                    }
                }

                //Contador de la puntuacion, en base de las letras que se hayan averiguado se suma un punto
                if (!isError) {
                    let points = 0
                    xword.forEach(letter => {
                        letter !== "X" ? points++ : points += 0
                    })

                    //Mensaje final
                    array[0] = array[0].toUpperCase()
                    let final = alert(`Palabra a adivinar: ${array.join('')}
                        Tu intento: ${xword.join('')}
                        Has obtenido: ${points}`)

                    //Resolucion de la promesa
                    resolve(final)
                } else {
                    reject(err)
                }
            })
    })
}

const isPlaying = (final) => {
    let promise = new Promise((resolve) => {
        let resultado = final //Final = void
        //Resultado = true/false
        resultado = confirm(`¿Quieres continuar?`)
        resultado ? app() : alert(`Termino el juego`)
        resolve(resultado)
    })
    return promise
}

const app = async () => {
    try {
        const word = await loadWord()
        const final = await play(word)
        const repeat = await isPlaying(final)
    } catch (err) {
        throw err
    }
}

app()