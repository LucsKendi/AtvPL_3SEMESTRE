"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Empresa {
    constructor() {
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
        this.compras = [];
    }
    get getClientes() {
        return this.clientes;
    }
    get getProdutos() {
        return this.produtos;
    }
    get getServicos() {
        return this.servicos;
    }
    get getCompras() {
        return this.compras;
    }
}
exports.default = Empresa;
