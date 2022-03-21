const userNameInput = document.querySelector('#userName')
const emailInput = document.querySelector('#email')
const mensageInput = document.querySelector('#mensage')
const submitInput = document.querySelector('#result')
const alertContainer = document.querySelector('#alert')
const validCharactersUser = "abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ1234567890."
const validCharactersDomain = "abcdefghijklmnopqrstuvwxyz1234567890."

function createAlert(reference, mensage){
    const iconError = 'fa-circle-exclamation'
    const iconSuccess = 'fa-check'
    let icon = ''
    const error = 'error'
    const success = 'success'
    let status = ''

    if(reference){
        icon = iconSuccess
        status = success
    } else{
        icon = iconError
        status = error
    }

    const alert = `
        <div class="${status}">
            <i class="fa-solid ${icon}"></i>
            ${mensage}
        </div>`
    alertContainer.innerHTML = alert

    setTimeout(function(){
        alertContainer.innerHTML = ''
    }, 3000)
}

function clearInput(){
    userNameInput.value = ''
    emailInput.value = ''
    mensageInput.value = ''
}

function validateInput(event){
    event.preventDefault()
    let mensage = ''
    const mensageDefault = `Obrigada pelo contato! ${userNameInput.value}`

    function userIsntValid(){
        if(userNameInput.value.length == 0){
            mensage = 'Erro de envio. Insira um nome.'
            return true
        }
    }

    function emailIsntValid(){
        if(emailInput.value.length == 0){
            mensage = "Erro de envio. Insira um e-mail."
            return true
        }

        if(!emailInput.value.includes('@')){
            mensage = "Erro de envio. E-mail inválido. Deve conter '@'" 
            return true
        }

        const emailSplited = emailInput.value.split('@')
        const user = emailSplited[0]
        const domain = emailSplited[1]
        const domainSplited = domain.split('.com')
        
        if(user.length > 32){
            mensage = "Erro de envio. E-mail inválido. Deve conter de 1 a 32 caracteres."
            return true
        }  

        for(let character in user){
            if(!validCharactersUser.includes(user[character])){
                mensage = "Erro de envio. E-mail inválido. Não deve conter '#$%^'"
                return true
            }
        }

        if(!domain.includes('.com')){
            mensage = "Erro de envio. E-mail inválido. Deve conter '.com'"
            return true
        }

        if(domainSplited[0].length == 0){
            mensage = "Erro de envio. E-mail inválido. Deve conter 'dominio.com'."
            return true
        }

        if(domainSplited[0].length > 16){
            mensage = "Erro de envio. E-mail inválido. Deve conter de 1 a 16 caracteres."
            return true
        }

        for(let character in domainSplited[0]){
            if(!validCharactersDomain.includes(domainSplited[0][character])){
                mensage = "Erro de envio. E-mail inválido. Não deve conter letras maiúsculas ou '#$%^'"
                return true
            }
        }    
    }

    function mensageInstValid(){
        if(mensageInput.value.length == 0){
            mensage = 'Erro de envio. Insira uma mensagem.'
            return true
        }
    }

    if(userIsntValid() || emailIsntValid() || mensageInstValid()){
        return createAlert(false, mensage)
    } else{
        createAlert(true, mensageDefault)
        clearInput()
    }
}


submitInput.onclick = validateInput
