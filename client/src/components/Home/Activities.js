
export let listaActividades = [];
export function cargarActividades(countries){
    countries.map(
        (data) =>
          data.activities?.length &&
          data.activities.map(
            (activity) => activity.name && listaActividades.push(activity.name)
          )
      );
}