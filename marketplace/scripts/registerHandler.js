const BASE_URL = 'http://127.0.0.1:3000/api/';

const registerForm = document.getElementById("register-form");

function showErrorMessage(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if ((firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '')
        && (password === confirmPassword)) {
        try {
            let data = { 
                nombre: firstName+" "+lastName, 
                email: email, 
                contra: password, 
                rol: { nombre: "usuario" }
            }
            let requestData = JSON.stringify(data);

            const response = await fetch(`${BASE_URL}usuarios`, {
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

            window.location.href = '../pages/login.html';

        } catch (error) {
            console.error(error);
        }
    } else if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        const message = "Campos vacios o solamente contienen espacios. Por favor verificar";
        showErrorMessage(message);
    } else if (password !== confirmPassword) {
        const message = "Las contrasenas no coinciden";
        showErrorMessage(message);
    }
});