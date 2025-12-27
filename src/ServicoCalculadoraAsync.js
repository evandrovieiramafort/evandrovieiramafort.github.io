import { Item } from "./Item.js"
import { CalculadoraException } from "./CalculadoraException.js"

export class ServicoCalculadoraAsync {
    #chaveItens = "mercadoItens_v13"
    #chaveOrcamento = "mercadoOrcamento_v13"
    #chaveTema = "mercadoTema_v13"

    async cadastrar(obj) {
        return new Promise((resolver, rejeitar) => {
            try {
                const itens = this.#lerLocalStorage()
                itens.push(obj.paraJSON())
                this.#salvarLocalStorage(itens)
                resolver(obj.id)
            } catch (erro) {
                rejeitar(new CalculadoraException("Erro ao salvar item"))
            }
        })
    }

    async buscar() {
        return new Promise((resolver) => {
            const dados = this.#lerLocalStorage()
            const lista = dados.map(dado => new Item(dado))
            resolver(lista)
        })
    }

    async buscarPorId(id) {
        return new Promise((resolver, rejeitar) => {
            const itens = this.#lerLocalStorage()
            const encontrado = itens.find(i => i.id == id)
            if (encontrado) {
                resolver(new Item(encontrado))
            } else {
                rejeitar(new CalculadoraException("Item não encontrado"))
            }
        })
    }

    async atualizar(obj) {
        return new Promise((resolver, rejeitar) => {
            const itens = this.#lerLocalStorage()
            const indice = itens.findIndex(i => i.id == obj.id)
            if (indice !== -1) {
                itens[indice] = obj.paraJSON()
                this.#salvarLocalStorage(itens)
                resolver()
            } else {
                rejeitar(new CalculadoraException("Erro ao atualizar item"))
            }
        })
    }

    async excluir(id) {
        return new Promise((resolver) => {
            let itens = this.#lerLocalStorage()
            itens = itens.filter(i => i.id != id)
            this.#salvarLocalStorage(itens)
            resolver()
        })
    }

    async limparTodos() {
        return new Promise((resolver) => {
            this.#salvarLocalStorage([])
            resolver()
        })
    }

    obterOrcamento() {
        return parseFloat(localStorage.getItem(this.#chaveOrcamento)) || 0
    }

    salvarOrcamento(valor) {
        localStorage.setItem(this.#chaveOrcamento, valor)
    }

    obterTema() {
        return localStorage.getItem(this.#chaveTema)
    }

    salvarTema(tema) {
        localStorage.setItem(this.#chaveTema, tema)
    }

    #lerLocalStorage() {
        return JSON.parse(localStorage.getItem(this.#chaveItens)) || []
    }

    #salvarLocalStorage(dados) {
        localStorage.setItem(this.#chaveItens, JSON.stringify(dados))
    }
}