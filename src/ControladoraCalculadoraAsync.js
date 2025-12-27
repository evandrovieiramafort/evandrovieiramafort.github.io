import { Item } from "./Item.js"
import { ServicoCalculadoraAsync } from "./ServicoCalculadoraAsync.js"

export class ControladoraCalculadoraAsync {

    #visao
    #servico = new ServicoCalculadoraAsync()
    #termoBusca = ""

    constructor(visao) {
        this.#visao = visao
    }

    async iniciar() {
        this.#carregarTema()
        this.#carregarOrcamento()
        this.#atualizarLista()
    }

    async #atualizarLista() {
        try {
            const todosItens = await this.#servico.buscar()
            const itensFiltrados = todosItens.filter(i => 
                i.nome.toLowerCase().includes(this.#termoBusca.toLowerCase())
            )
            this.#visao.exibir(itensFiltrados)
            this.#calcularTotais(todosItens)
        } catch (erro) {
            alert(erro.message)
        }
    }

    async salvar() {
        try {
            const dados = this.#visao.lerFormulario()
            const item = new Item(dados)

            if (dados.id) {
                await this.#servico.atualizar(item)
            } else {
                delete item.id
                await this.#servico.cadastrar(item)
            }
            
            this.#visao.limparFormulario()
            await this.#atualizarLista()
        } catch (erro) {
            alert(erro.message)
        }
    }

    async excluir(id) {
        if (confirm("Remover item?")) {
            try {
                await this.#servico.excluir(id)
                this.#visao.limparFormulario()
                await this.#atualizarLista()
            } catch (erro) {
                alert(erro.message)
            }
        }
    }

    async alternarStatus(id) {
        try {
            const item = await this.#servico.buscarPorId(id)
            item.ativo = !item.ativo
            await this.#servico.atualizar(item)
            await this.#atualizarLista()
        } catch (erro) {
            alert(erro.message)
        }
    }

    async limparTudo() {
        if (confirm("Apagar todas as compras?")) {
            try {
                await this.#servico.limparTodos()
                this.#visao.limparFormulario()
                await this.#atualizarLista()
            } catch (erro) {
                alert(erro.message)
            }
        }
    }

    limparCampos() {
        this.#visao.limparFormulario()
    }

    buscar(termo) {
        this.#termoBusca = termo
        this.#atualizarLista()
    }

    alternarTema() {
        const temaAtual = this.#servico.obterTema()
        const novoTema = temaAtual === "escuro" ? "claro" : "escuro"
        this.#servico.salvarTema(novoTema)
        this.#aplicarTema(novoTema)
    }

    atualizarOrcamento(valorStr) {
        const valor = parseFloat(valorStr.replace(/\D/g, "")) / 100
        this.#servico.salvarOrcamento(valor)
        this.#atualizarLista()
    }

    #calcularTotais(itens) {
        const orcamento = this.#servico.obterOrcamento()
        const gasto = itens.reduce((acc, i) => i.ativo ? acc + i.total : acc, 0)
        this.#visao.atualizarTotais(gasto, orcamento - gasto)
    }

    #carregarOrcamento() {
        const orcamento = this.#servico.obterOrcamento()
        this.#visao.definirOrcamento(orcamento)
    }

    #carregarTema() {
        const salvo = this.#servico.obterTema()
        const sistemaEscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        const tema = salvo ? salvo : (sistemaEscuro ? "escuro" : "claro")
        this.#aplicarTema(tema)
    }

    #aplicarTema(tema) {
        this.#visao.definirTema(tema === "escuro")
    }
}