// Script para redirigir a 404.html si la URL no coincide con rutas válidas

// Lista de rutas válidas de tu proyecto
const validRoutes = [
    '/index.html',
    '/pages/addnew.html',
    '/pages/all-products.html',
    '/pages/buying.html',
    '/pages/details.html',
    '/pages/editing.html',
    '/pages/login.html',
    '/pages/pastcom.html',
    '/pages/products.html',
    '/pages/profiles.html',
    '/pages/register.html',
    '/pages/unauthorized.html'
];

// Función para validar rutas
const handleInvalidRoute = () => {
    const basePath = '/marketplace';
    const currentPath = window.location.pathname;

    if (currentPath.startsWith(basePath)) {
        // Extraer la parte después de "/marketplace"
        const relativePath = currentPath.slice(basePath.length);

        // Validar la ruta relativa
        if (!validRoutes.includes(currentPath)) {
            window.location.href = '/marketplace/pages/not-found.html';
        }
    }
};

handleInvalidRoute();
