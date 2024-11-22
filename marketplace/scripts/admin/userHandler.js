const BASE_URL = 'http://192.168.77.28:3000/api/';
const TOKEN_KEY = "token";

document.addEventListener("DOMContentLoaded", function () {
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('beforeend', template);
        });
});

function showErrorMessage(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}superAdmin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        })

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

const getOneUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}superAdmin/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        })

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

const editUser = async (userId, data) => {
    try {
        const requestData = JSON.stringify(data);
        const response = await fetch(`${BASE_URL}superAdmin/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                'Content-Type': 'application/json'
            },
            body: requestData
        })

        const responseData = await response.json();

        if (!response.ok && response.status !== 200) {
            showErrorMessage(responseData.message)
            throw new Error(`${response.status} ${response.statusText}`);
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Usuario editado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../pages/profiles.html';
            }
        })

    } catch (error) {
        console.log(error);
    }
}


const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}superAdmin/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        })

        const responseData = await response.json();

        if (!response.ok && response.status !== 200) {
            showErrorMessage(responseData.message)
            throw new Error(`${response.status} ${response.statusText}`);
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Usuario eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../pages/profiles.html';
            }
        })

    } catch (error) {
        console.log(error);
    }
}


const renderUsers = async () => {
    try {
        const usersData = await getAllUsers();

        if (!usersData) {
            console.error('No se pudieron obtener los usuarios.');
            return;
        }

        const profilesList = document.getElementById('profiles-list');
        profilesList.innerHTML = '';
        usersData.forEach(user => {
            const profileRow = document.createElement('tr');
            profileRow.innerHTML = `
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>${user.rol.nombre ? user.rol.nombre : 'Sin rol'}</td>
                    <td>
                        <button id="edit-btn" class="edit-user-btn" data-id=${user._id}>Editar</button>
                        <button id="edit-btn" class="delete-user-btn" data-id=${user._id}>Eliminar</button>
                    </td>
                `;
            profilesList.appendChild(profileRow);
        });

        profilesList.addEventListener('click', async (event) => {
            if (event.target.classList.contains('edit-user-btn')) {
                let userId = event.target.getAttribute('data-id');
                const user = await getOneUser(userId);

                fetch('../components/edit-user-pop-up.html')
                    .then(response => response.text())
                    .then(modalHtml => {
                        document.body.insertAdjacentHTML('beforeend', modalHtml);
                        const modal = document.getElementById('edit-user-modal');
                        modal.style.display = "block";
                        
                        const closeModal = document.getElementsByClassName('close')[0];
                        const processBtn = document.getElementById('process-edit');

                        closeModal.onclick = function () {
                            modal.style.display = "none";
                        }

                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                        
                        if (user) {
                            document.getElementById('name').value = user.nombre;
                            document.getElementById('email').value = user.email;
                            document.getElementById('role').value = user.rol.nombre;
                        }

                        processBtn.addEventListener('click', async (event) => {
                            event.preventDefault();
                            const name = document.getElementById("name").value;
                            const email = document.getElementById("email").value;
                            const role = document.getElementById("role").value;

                            if (name.trim() !== '' && email.trim() !== '' && role.trim() !== '') {
                                if (name.length <= 40 && email.length <= 100 && role.length <= 13) {
                                    const data = {
                                        nombre: name,
                                        email: email,
                                        rol: {
                                            nombre: role
                                        }
                                    }
                                    await editUser(userId, data);
                                } else {
                                    showErrorMessage("La longitud de uno o mas campos no es la esperada");
                                }
                            } else {
                                showErrorMessage("Uno o mas campos estan vacios")
                            }
                        })
                    });
            }
        });

        profilesList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-user-btn')) {
                const userId = event.target.getAttribute('data-id');
                Swal.fire({
                    title: "Cuidado",
                    text: "Esta seguro/a de eliminar a este usuario? Esta accion es irreversible",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteUser(userId);
                    }
                });
            }
        });

    } catch (error) {
        console.error('Error rendering products:', error);
    }
};

renderUsers();