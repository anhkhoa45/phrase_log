let loginForm = document.getElementById('loginForm');
let emailInp = document.getElementsByName("email")[0];
let passwordInp = document.getElementsByName("password")[0];

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    let formData = new FormData(loginForm);

    console.log(formData);
});


