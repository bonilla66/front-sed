function decodeJWT(token) {
    try {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decodedPayload;
    } catch (error) {
        console.error('Error al decodificar el JWT:', error);
        return null;
    }
}

function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = decodeJWT(token);
    return payload?.rol || null;
}

function getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = decodeJWT(token);
    return payload?.userId || null;
}

function verifyAccess(requiredRoles) {
    const userRole = getUserRole();
    if (!userRole) {
        alert("Acceso denegado. Inicia sesión para continuar.");
        window.location.href = '../pages/login.html';
        return;
    }

    if (!requiredRoles.includes(userRole)) {
        alert("No tienes permiso para acceder a esta página.");
        window.location.href = '../pages/unauthorized.html';
        return;
    }
}

function verifySession() {
    const tk = localStorage.getItem("token");
    if (tk !== 'null') {
        window.location.href = '../index.html';
        session = true;
    }
}

verifyAccess(['superAdmin']);