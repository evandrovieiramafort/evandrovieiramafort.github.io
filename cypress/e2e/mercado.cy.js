describe('Fluxo Completo da Calculadora de Mercado', () => {
  const tempoEspera = 500

  beforeEach(() => {
    cy.clearLocalStorage()
    
    // Visita a página forçando a preferência de sistema para "CLARO" (light)
    // Isso evita que o teste falhe se o seu Windows estiver em modo escuro
    cy.visit('http://127.0.0.1:5500/mercado.html', {
      onBeforeLoad(win) {
        cy.stub(win, 'matchMedia').returns({
          matches: false, // false = não prefere tema escuro (logo, é claro)
          addListener: () => {},
          removeListener: () => {}
        })
      }
    })
    cy.wait(tempoEspera)
  })

  const normalizarTexto = (texto) => {
    return texto.replace(/\u00a0/g, ' ').trim()
  }

  it('Deve adicionar um item com sucesso', () => {
    cy.get('#entradaNome').type('Leite')
    cy.wait(tempoEspera)
    cy.get('#entradaPreco').type('450')
    cy.wait(tempoEspera)
    cy.get('#entradaQtd').clear().type('2')
    cy.wait(tempoEspera)
    cy.get('#botaoSalvar').click()

    cy.get('#listaItens').invoke('text').then((texto) => {
      expect(texto).to.contain('Leite')
      expect(normalizarTexto(texto)).to.contain('2 x R$ 4,50')
    })
    
    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 9,00')
    })
  })

  it('Deve remover um item da lista', () => {
    cy.get('#entradaNome').type('Item Remover')
    cy.get('#entradaPreco').type('1000')
    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.contains('.cartao-item', 'Item Remover').find('.botao-deletar').click()
    cy.wait(tempoEspera)

    cy.get('#listaItens').should('not.contain', 'Item Remover')
    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 0,00')
    })
  })

  it('Deve editar um item alterando nome, preço e quantidade', () => {
    cy.get('#entradaNome').type('Bolacha')
    cy.get('#entradaPreco').type('200')
    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.contains('.cartao-item', 'Bolacha').find('.botao-editar').click()
    cy.wait(tempoEspera)

    cy.get('#entradaNome').clear().type('Biscoito')
    cy.wait(tempoEspera)
    cy.get('#entradaPreco').clear().type('300') 
    cy.wait(tempoEspera)
    cy.get('#entradaQtd').clear().type('3')
    cy.wait(tempoEspera)
    
    cy.get('#botaoSalvar').click()

    cy.get('#listaItens').invoke('text').then((texto) => {
      expect(texto).to.contain('Biscoito')
      expect(normalizarTexto(texto)).to.contain('3 x R$ 3,00')
    })

    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 9,00')
    })
  })

  it('Deve limpar o orçamento e atualizar o saldo', () => {
    cy.get('#entradaOrcamento').type('10000')
    cy.wait(tempoEspera)
    cy.get('#botaoLimparOrcamento').click()
    cy.wait(tempoEspera)

    cy.on('window:confirm', () => true)

    cy.get('#entradaOrcamento').should('have.value', '')
    cy.get('#saldoRestante').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 0,00')
    })
  })

  it('Deve limpar os campos de entrada (Vassoura)', () => {
    cy.get('#entradaNome').type('Texto Teste')
    cy.get('#entradaPreco').type('123')
    cy.get('#entradaQtd').clear().type('5')
    cy.wait(tempoEspera)

    cy.get('#botaoLimparCampos').click()
    cy.wait(tempoEspera)

    cy.get('#entradaNome').should('have.value', '')
    cy.get('#entradaPreco').should('have.value', '')
    cy.get('#entradaQtd').should('have.value', '1')
  })

  it('Deve limpar tudo (Lixeira) removendo todos os itens', () => {
    cy.get('#entradaNome').type('Item 1')
    cy.get('#entradaPreco').type('100')
    cy.get('#botaoSalvar').click()
    cy.get('#entradaNome').type('Item 2')
    cy.get('#entradaPreco').type('200')
    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.get('#botaoLimparTudo').click()
    cy.wait(tempoEspera)

    cy.on('window:confirm', () => true)

    cy.get('#listaItens').should('contain', 'Lista vazia')
    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 0,00')
    })
  })

  it('Deve buscar itens na lista', () => {
    cy.get('#entradaNome').type('Banana')
    cy.get('#entradaPreco').type('100')
    cy.get('#botaoSalvar').click()
    
    cy.get('#entradaNome').type('Maçã')
    cy.get('#entradaPreco').type('200')
    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.get('#barraBusca').type('Banana')
    cy.wait(tempoEspera)

    cy.get('#listaItens').should('contain', 'Banana')
    cy.get('#listaItens').should('not.contain', 'Maçã')
  })

  it('Deve ignorar item no cálculo ao desmarcar checkbox', () => {
    // CORREÇÃO: Digitar 10000 para virar R$ 100,00
    cy.get('#entradaOrcamento').type('10000') 
    cy.get('#entradaNome').type('Carne')
    // Digitar 5000 para virar R$ 50,00
    cy.get('#entradaPreco').type('5000') 
    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 50,00')
    })

    cy.get('.checkbox-customizado input').click({ force: true })
    cy.wait(tempoEspera)

    cy.get('.cartao-item').should('have.class', 'inativo')
    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 0,00')
    })
    cy.get('#saldoRestante').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 100,00')
    })
  })

  it('Deve persistir os dados ao recarregar a página', () => {
    cy.get('#entradaNome').type('Persistencia')
    cy.get('#entradaPreco').type('199')
    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.reload()
    cy.wait(tempoEspera)

    cy.get('#listaItens').should('contain', 'Persistencia')
    cy.get('#totalGasto').invoke('text').then((texto) => {
      expect(normalizarTexto(texto)).to.equal('R$ 1,99')
    })
  })

  it('Deve alternar entre tema claro e escuro', () => {
    // Agora o teste começa garantidamente no modo CLARO devido ao stub no beforeEach
    cy.get('body').should('not.have.class', 'modo-escuro')
    
    cy.get('#botaoTema').click()
    cy.wait(tempoEspera)
    cy.get('body').should('have.class', 'modo-escuro')
    
    cy.get('#botaoTema').click()
    cy.wait(tempoEspera)
    cy.get('body').should('not.have.class', 'modo-escuro')
  })

  it('Não deve permitir adicionar item sem preço', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#entradaNome').type('Item Inválido')

    cy.get('#botaoSalvar').click()
    cy.wait(tempoEspera)

    cy.then(() => {
      expect(stub.getCall(0)).to.be.calledWith('O preço é inválido')
    })
    cy.get('#listaItens').should('contain', 'Lista vazia')
  })
})