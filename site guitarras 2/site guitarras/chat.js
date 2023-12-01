const start = document.querySelector('#enviar')
let contador = 1
const chat = document.querySelector('.centro')

start.addEventListener('click', function(){
    let entradaDeMensagem =  document.querySelector('#texto')
    let msgUser = document.querySelector('#texto').value
    switch (contador){
        case 1: 
        let divUser = document.createElement('div')
        divUser.className = "msgUser"
        let paragrafo = document.createElement('p')
        paragrafo.innerText = `User: ${msgUser}`
        divUser.appendChild(paragrafo)
        chat.appendChild(divUser)

        let divBot = document.createElement('div')
        divBot.className = 'msgBot'
        let paragrafoBot = document.createElement('p')
        paragrafoBot.innerText = 'Bot: Olá, no que posso ajudar?\n1: Quer saber mais sobre as marcas?\n2: Quer saber mais sobre os artistas?\n3: Quer saber onde pode comprar?'
        divBot.appendChild(paragrafoBot)
        chat.appendChild(divBot)
        entradaDeMensagem.value = ''
        contador += 1
        break
        case 2:
        if(msgUser == '1'){

        let divUser = document.createElement('div')
        divUser.className = "msgUser"
        let paragrafo = document.createElement('p')
        paragrafo.innerText = `User: ${msgUser}`
        divUser.appendChild(paragrafo)
        chat.appendChild(divUser)

        let divBot = document.createElement('div')
        divBot.className = 'msgBot'
        let paragrafoBot = document.createElement('p')
        paragrafoBot.innerText = 'Bot: Pois bem! Aqui estão os sites das marcas citadas.\nGibson: https://www.gibson.com/en-US/\nESP: https://espguitars.com\nJackson: https://www.jacksonguitars.com/en/start\nIbanez: https://www.ibanez.com/na/'
        divBot.appendChild(paragrafoBot)
        chat.appendChild(divBot)

        let divEnd = document.createElement('div')
        divEnd.className = 'msgBot'
        let paragrafoEnd = document.createElement('p')
        paragrafoEnd.innerText = 'Bot: Posso ajudar em algo mais?'
        divEnd.appendChild(paragrafoEnd)
        chat.appendChild(divEnd)
        entradaDeMensagem.value = ''
        }
        if(msgUser == '2'){
            let divUser = document.createElement('div')
            divUser.className = "msgUser"
            let paragrafo = document.createElement('p')
            paragrafo.innerText = `User: ${msgUser}`
            divUser.appendChild(paragrafo)
            chat.appendChild(divUser)
    
            let divBot = document.createElement('div')
            divBot.className = 'msgBot'
            let paragrafoBot = document.createElement('p')
            paragrafoBot.innerText = 'Bot: Pois bem! Aqui estão mais informações sobre alguns dos artistas das marcas:\nGibson: https://www.gibson.com/en-US/Collection/artist\nESP: https://www.espguitars.com/artists\nJackson: https://www.jacksonguitars.com/en/artists.html\nIbanez: https://www.ibanez.com/na/artists/'
            divBot.appendChild(paragrafoBot)
            chat.appendChild(divBot)

            let divEnd = document.createElement('div')
            divEnd.className = 'msgBot'
            let paragrafoEnd = document.createElement('p')
            paragrafoEnd.innerText = 'Bot: Posso ajudar em algo mais?'
            divEnd.appendChild(paragrafoEnd)
            chat.appendChild(divEnd)
            entradaDeMensagem.value = ''
            }
        if(msgUser == '3'){
            let divUser = document.createElement('div')
            divUser.className = "msgUser"
            let paragrafo = document.createElement('p')
            paragrafo.innerText = `User: ${msgUser}`
            divUser.appendChild(paragrafo)
            chat.appendChild(divUser)
    
            let divBot = document.createElement('div')
            divBot.className = 'msgBot'
            let paragrafoBot = document.createElement('p')
            paragrafoBot.innerText = 'Bot: Pois bem! Aqui estão mais informações sobre lugares bons para comprar guitarras:\nhttps://www.pridemusicshop.com.br\nhttps://www.madeinbrazil.com.br\nhttps://barramusic.com.br\nhttps://www.musitechinstrumentos.com.br'
            divBot.appendChild(paragrafoBot)
            chat.appendChild(divBot)

            let divEnd = document.createElement('div')
            divEnd.className = 'msgBot'
            let paragrafoEnd = document.createElement('p')
            paragrafoEnd.innerText = 'Bot: Posso ajudar em algo mais?'
            divEnd.appendChild(paragrafoEnd)
            chat.appendChild(divEnd)
            entradaDeMensagem.value = ''
        }
        contador = 1
        break
    }
})