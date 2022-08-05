# Rick and Morty Challenge

Solución al Rick and Morty Challenge propuesto por Chipax

## Información general

El proyecto tiene como entrada el archivo index.js de la raiz. Hay 2 controladores, uno para cada problema del reto.
Se usa una clase para formatear el problema.

El primer problema lo resolví usando REST para buscar las respuestas, como se necesita solo la cantidad de characters con cierta letra en el nombre, usé el filtro que proporciona la API y leí el objeto info para saber el count.

El segundo problema lo traté de hacer con REST pero se estaba demorando mucho así que opté por usar GraphQL. Como son 51 episodios (3 páginas), hago una query a la primera página y después un ciclo para buscar el resto de páginas usando la llave next que viene en el objeto info.

### Notas

Aún no sé por qué la primera vez que ejecuto el programa se demora tanto la request con GraphQL
