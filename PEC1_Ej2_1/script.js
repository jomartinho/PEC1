const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(re.test(input.value.trim())) {
            showSuccess(input);
        } else{
            showError(input, 'Email is not valid');
        }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim() ===''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }
    else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

function checkAge(input) {
    const ageValue = parseInt(input.value, 10);
    if (isNaN(ageValue) || ageValue < 0 || ageValue >= 1000) {
        showError(input, 'Age must be a number between 0 and 1000');
    } else {
        showSuccess(input);
    }
}

function checkPassword(input) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;
    if (!re.test(input.value.trim())) {
        showError(input, 'Password must be at least 8 characters, include uppercase, lowercase, numbers, and special characters');
    } else {
        showSuccess(input);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    checkAge(age);
    checkPassword(password);
})
