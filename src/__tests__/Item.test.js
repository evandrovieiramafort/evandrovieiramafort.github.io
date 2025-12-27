import { Item } from '../Item.js';
import { CalculadoraException } from '../CalculadoraException.js';

describe('Classe Item - Testes de Unidade', () => {

    test('Deve criar um item válido corretamente', () => {
        const dados = { nome: 'Arroz', preco: 25.50, qtd: 2 };
        const item = new Item(dados);

        expect(item.nome).toBe('Arroz');
        expect(item.preco).toBe(25.50);
        expect(item.qtd).toBe(2);
        expect(item.total).toBe(51.00);
        expect(item.ativo).toBe(true);
    });

    test('Não deve aceitar preço negativo ou zero', () => {
        const dadosZero = { nome: 'Feijão', preco: 0, qtd: 1 };
        const dadosNegativo = { nome: 'Feijão', preco: -10, qtd: 1 };

        expect(() => new Item(dadosZero)).toThrow(CalculadoraException);
        expect(() => new Item(dadosZero)).toThrow("O preço é inválido");

        expect(() => new Item(dadosNegativo)).toThrow(CalculadoraException);
    });

    test('Não deve aceitar quantidade zero ou negativa', () => {
        const dadosQtdZero = { nome: 'Macarrão', preco: 5, qtd: 0 };
        expect(() => new Item(dadosQtdZero)).toThrow("A quantidade deve ser um número inteiro maior que zero");
    });

    test('Não deve aceitar quantidade decimal (float)', () => {
        const dadosQtdDecimal = { nome: 'Carne', preco: 30, qtd: 1.5 };
        expect(() => new Item(dadosQtdDecimal)).toThrow("A quantidade deve ser um número inteiro maior que zero");
    });

    test('Deve calcular o total corretamente ao atualizar atributos', () => {
        const item = new Item({ nome: 'Leite', preco: 4.00, qtd: 10 });
        expect(item.total).toBe(40.00);

        item.qtd = 5;
        expect(item.total).toBe(20.00);

        item.preco = 5.00;
        expect(item.total).toBe(25.00);
    });
});