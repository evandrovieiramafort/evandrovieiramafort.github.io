import { CalculadoraException } from "./CalculadoraException.js"

export class Item {
    #id
    #nome
    #preco
    #qtd
    #ativo

    constructor({ id, nome, preco, qtd, ativo }) {
        this.#id = id ? id : Date.now()
        this.#nome = nome
        this.#preco = preco
        this.#qtd = qtd
        this.#ativo = ativo !== undefined ? ativo : true

        this.validar(nome, preco, qtd)
    }

    get id() { return this.#id }
    get nome() { return this.#nome }
    get preco() { return this.#preco }
    get qtd() { return this.#qtd }
    get ativo() { return this.#ativo }
    get total() { return this.#preco * this.#qtd }

    set nome(nome) {
        this.validar(nome, this.#preco, this.#qtd)
        this.#nome = nome
    }

    set preco(preco) {
        this.validar(this.#nome, preco, this.#qtd)
        this.#preco = preco
    }

    set qtd(qtd) {
        this.validar(this.#nome, this.#preco, qtd)
        this.#qtd = qtd
    }

    set ativo(ativo) {
        this.#ativo = ativo
    }

    validar(nome, preco, qtd) {
        if (!preco || preco < 0) {
            throw new CalculadoraException("O preço é inválido")
        }
        if (!qtd || qtd <= 0 || !Number.isInteger(qtd)) {
            throw new CalculadoraException("A quantidade deve ser um número inteiro maior que zero")
        }
    }

    paraJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            preco: this.#preco,
            qtd: this.#qtd,
            ativo: this.#ativo
        }
    }
}