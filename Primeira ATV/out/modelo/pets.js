"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pet {
    constructor(nome, raca, genero, tipo) {
        this.nome = nome;
        this.raca = raca;
        this.genero = genero;
        this.tipo = tipo;
    }
    get getNome() {
        return this.nome;
    }
    get getRaca() {
        return this.raca;
    }
    get getGenero() {
        return this.genero;
    }
    get getTipo() {
        return this.tipo;
    }
}
exports.default = Pet;
