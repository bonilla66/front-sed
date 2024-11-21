//import { decodeJWT } from "./roleHandler";
const BASE_URL = 'http://127.0.0.1:3000/api/';
const TOKEN_KEY = "token";

const loginForm = document.getElementById("login-form");

function showErrorMessage(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

function decodeJWT(token) {
    try {
        // Dividimos el token en sus tres partes: header, payload, y signature
        const [, payload] = token.split('.');

        if (!payload) {
            throw new Error('Token inválido');
        }

        // Decodificamos el payload de Base64URL a un objeto JSON
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

        return decodedPayload;
    } catch (error) {
        console.error('Error al decodificar el JWT:', error);
        return null;
    }
}

if (loginForm !== null) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
    
        if (email.trim() == '' || password.trim() == '') {
            const message = 'Campos vacios o solamente contienen espacios. Por favor verificar'
            showErrorMessage(message)
        } else {
            try {
                let data = { email: email, contra: password }
                let requestData = JSON.stringify(data);

                if (localStorage.getItem(TOKEN_KEY !== null)) {
                    showErrorMessage("No es posible iniciar sesión con este usuario debido a una sesión previa existente")
                    throw new Error("No es posible iniciar sesion debido a una sesion previa");
                }
    
                const response = await fetch(`${BASE_URL}usuarios/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: requestData
                })
    
                const responseData = await response.json();
    
                if (!response.ok && response.status !== 200) {
                    showErrorMessage(responseData.message)
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                
                const decode = decodeJWT(responseData.accessToken);
                localStorage.setItem("token", responseData.accessToken);
                localStorage.setItem("usR", decode.rol);

                if (decode.rol == "administrador" || decode.rol == "superAdmin") {
                    window.location.href = '../pages/all-products.html';
                } else if (decode.rol == "usuario" || decode.rol == "user") {
                    window.location.href = '../pages/products.html';
                }
    
            } catch (error) {
                console.error(error);
            }
        }
    });    
}