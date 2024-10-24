document.addEventListener("DOMContentLoaded", function () {
    let paises = [];

    // Api de países

    fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(pais => {
                paises.push(pais);
            });
            mostrarPaises(paises);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Mostrar todos los países

    function mostrarPaises(listaPaises) {
        let tabla = document.getElementById('tabla');
        tabla.innerHTML = '';

        listaPaises.forEach(pais => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${pais.name.common}</td>
                <td>${pais.capital}</td>
                <td>${pais.population.toLocaleString()}</td>
                <td>${pais.region}</td>
            `;
            tabla.appendChild(row);
        });
    }
    
    // Mostrar búsqueda

    document.getElementById('btnBuscar').addEventListener('click', () => {
        let busqueda = document.getElementById('busqueda').value.toLowerCase();
        let paisesFiltrados = paises.filter(pais =>
            pais.name.common.toLowerCase().includes(busqueda)
        );
        mostrarPaises(paisesFiltrados);
    });
});
