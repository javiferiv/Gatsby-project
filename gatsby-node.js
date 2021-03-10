exports.createPages = async ({ actions, graphql, reportes }) => {
    const resultado = await graphql(`
            query {
            allDatoCmsHabitacion {
                nodes {
                    slug
            }
        }
        }
    `);

    //console.log(resultado.data.allDatoCmsHabitacion.nodes)
    if (resultado.errors) {
        reporter.panic('No hubo resultados', resultado.errors);
    }

    //Si hay páginas, crear los archivos

    const habitaciones = resultado.data.allDatoCmsHabitacion.nodes;

    habitaciones.forEach(habitacion => {
        actions.createPage({
            path: habitacion.slug,
            component: require.resolve('./src/components/habitaciones.js'),
            context: {
                slug: habitacion.slug
            }
        })
    })
}