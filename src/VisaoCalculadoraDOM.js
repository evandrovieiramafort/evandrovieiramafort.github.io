import { ControladoraCalculadoraAsync } from "./ControladoraCalculadoraAsync.js"

export class VisaoCalculadoraDOM {
    
    #controladora = new ControladoraCalculadoraAsync(this)

    constructor() {
        this.botaoSalvar = document.getElementById("botaoSalvar")
        this.botaoLimpar = document.getElementById("botaoLimparCampos")
        this.botaoLimparTudo = document.getElementById("botaoLimparTudo")
        this.botaoTema = document.getElementById("botaoTema")
        this.barraBusca = document.getElementById("barraBusca")
        this.entradaOrcamento = document.getElementById("entradaOrcamento")
        this.entradaPreco = document.getElementById("entradaPreco")
        this.entradaQtd = document.getElementById("entradaQtd")
        this.elementoTotal = document.getElementById("totalGasto")
        this.elementoSaldo = document.getElementById("saldoRestante")
        this.cabecalho = document.getElementById("cabecalhoPrincipal")

        this.caminhoSol = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,5.29C7.24,5.84 6.96,6.42 6.69,7L2.5,9L3.34,7M3.36,17L2.5,15L6.68,17C6.95,17.58 7.23,18.16 7.49,18.71L3.36,17M20.65,7L21.5,9L17.3,7C17.03,6.42 16.75,5.84 16.5,5.29L20.65,7M20.64,17L16.5,18.71C16.76,18.16 17.04,17.58 17.31,17L21.5,15L20.64,17M12,22L9.61,18.58C10.35,18.85 11.16,19 12,19C12.84,19 13.65,18.85 14.39,18.58L12,22Z"
        this.caminhoLua = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.84 4.94,4.94C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.38,12.35 6.21,9.54 6.05,6.71C4.26,8.35 3.13,10.87 3.5,13.56C3.87,16.26 6.15,18.54 8.85,18.91C11.45,19.29 13.95,18.2 15.6,16.4C16.25,15.7 16.84,14.9 17.33,14Z"
        this.caminhoEditar = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
        this.caminhoDeletar = "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"

        this.#registrarEventos()
    }

    async iniciar() {
        await this.#controladora.iniciar()
    }

    #registrarEventos() {
        this.botaoSalvar.addEventListener("click", () => this.#controladora.salvar())
        this.botaoLimpar.addEventListener("click", () => this.#controladora.limparCampos())
        this.botaoLimparTudo.addEventListener("click", () => this.#controladora.limparTudo())
        this.botaoTema.addEventListener("click", () => this.#controladora.alternarTema())
        this.barraBusca.addEventListener("keyup", (e) => this.#controladora.buscar(e.target.value))
        
        this.entradaOrcamento.addEventListener("keyup", (e) => {
            this.aplicarMascara(e.target)
            this.#controladora.atualizarOrcamento(e.target.value)
        })
        this.entradaPreco.addEventListener("keyup", (e) => this.aplicarMascara(e.target))
        this.entradaQtd.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "")
        })
    }

    criarIcone(caminho) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("viewBox", "0 0 24 24")
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", caminho)
        path.setAttribute("fill", "currentColor")
        svg.appendChild(path)
        return svg
    }

    exibir(listaItens) {
        this.listaItens.textContent = ""

        if (listaItens.length === 0) {
            const vazio = document.createElement("div")
            vazio.className = "estado-vazio"
            vazio.textContent = "🛒 Lista vazia / Nenhum item encontrado."
            this.listaItens.appendChild(vazio)
            return
        }

        for (const item of listaItens) {
            this.#criarElementoItem(item, this.listaItens)
        }
    }

    #criarElementoItem(item, container) {
        const cartao = document.createElement("div")
        cartao.className = "cartao-item"
        if (!item.ativo) cartao.classList.add("inativo")

        const etiqueta = document.createElement("label")
        etiqueta.className = "checkbox-customizado"
        const chk = document.createElement("input")
        chk.type = "checkbox"
        chk.checked = item.ativo
        chk.onchange = () => this.#controladora.alternarStatus(item.id)
        const span = document.createElement("span")
        span.className = "marca-checkbox"
        etiqueta.append(chk, span)

        const esquerda = document.createElement("div")
        esquerda.className = "conteudo-esquerdo"
        const nome = document.createElement("div")
        nome.className = "nome-item"
        nome.textContent = item.nome
        const mat = document.createElement("div")
        mat.className = "matematica-item"
        mat.textContent = `${item.qtd} x ${this.formatarMoeda(item.preco)}`
        esquerda.append(nome, mat)

        const direita = document.createElement("div")
        direita.className = "conteudo-direito"
        const total = document.createElement("div")
        total.className = "preco-total-item"
        total.textContent = this.formatarMoeda(item.total)

        const btnEdit = document.createElement("button")
        btnEdit.className = "botao-icone botao-editar"
        btnEdit.appendChild(this.criarIcone(this.caminhoEditar))
        btnEdit.onclick = () => this.preencherFormulario(item)

        const btnDel = document.createElement("button")
        btnDel.className = "botao-icone botao-deletar"
        btnDel.appendChild(this.criarIcone(this.caminhoDeletar))
        btnDel.onclick = () => this.#controladora.excluir(item.id)

        direita.append(total, btnEdit, btnDel)
        cartao.append(etiqueta, esquerda, direita)
        container.appendChild(cartao)
    }

    lerFormulario() {
        return {
            id: document.getElementById("idItem").value,
            nome: document.getElementById("entradaNome").value,
            preco: this.#converterParaNumero(document.getElementById("entradaPreco").value),
            qtd: parseInt(document.getElementById("entradaQtd").value, 10)
        }
    }

    preencherFormulario(item) {
        document.getElementById("idItem").value = item.id
        document.getElementById("entradaNome").value = item.nome
        document.getElementById("entradaPreco").value = this.#formatarInput(item.preco)
        document.getElementById("entradaQtd").value = item.qtd
        
        this.botaoSalvar.textContent = "Salvar Alteração"
        this.botaoSalvar.classList.add("em-edicao")
        this.cabecalho.classList.add("editando")
        document.getElementById("entradaPreco").focus()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    limparFormulario() {
        document.getElementById("idItem").value = ""
        document.getElementById("entradaNome").value = ""
        document.getElementById("entradaPreco").value = ""
        document.getElementById("entradaQtd").value = "1"
        
        this.botaoSalvar.textContent = "Adicionar Item"
        this.botaoSalvar.classList.remove("em-edicao")
        this.cabecalho.classList.remove("editando")
        document.getElementById("entradaNome").focus()
    }

    atualizarTotais(gasto, restante) {
        this.elementoTotal.textContent = this.formatarMoeda(gasto)
        this.elementoSaldo.textContent = this.formatarMoeda(restante)

        if (restante < 0) {
            this.elementoSaldo.classList.remove("positivo")
            this.elementoSaldo.classList.add("negativo")
        } else {
            this.elementoSaldo.classList.remove("negativo")
            this.elementoSaldo.classList.add("positivo")
        }
    }

    definirTema(ehEscuro) {
        this.botaoTema.textContent = ""
        if (ehEscuro) {
            document.body.classList.add("modo-escuro")
            this.botaoTema.appendChild(this.criarIcone(this.caminhoSol))
        } else {
            document.body.classList.remove("modo-escuro")
            this.botaoTema.appendChild(this.criarIcone(this.caminhoLua))
        }
    }

    definirOrcamento(valor) {
        if (valor > 0) {
            this.entradaOrcamento.value = this.#formatarInput(valor)
        }
    }

    aplicarMascara(input) {
        let valor = input.value.replace(/\D/g, "")
        if (valor === "") { input.value = ""; return }
        valor = (parseInt(valor) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
        input.value = valor
    }

    formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    #formatarInput(valor) {
        return valor.toFixed(2).replace(".", ",")
    }

    #converterParaNumero(valorStr) {
        if (!valorStr) return 0
        return parseFloat(valorStr.replace(/\./g, "").replace(",", "."))
    }
}