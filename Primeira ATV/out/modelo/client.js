"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor(nome, nomeSocial, email, cpf, telefone, pet, rg, compras) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.email = email;
        this.cpf = cpf;
        this.rg = rg;
        this.dataCadastro = new Date();
        this.telefone = telefone;
        this.pet = pet;
        this.compras = compras || [];
    }
    compraCliente() {
        return this.compras;
    }
    nomeCliente() {
        return this.nome;
    }
    get getEmail() {
        return this.email;
    }
    get getCpf() {
        return this.cpf;
    }
    get getRgs() {
        return this.rg;
    }
    get getDataCadastro() {
        return this.dataCadastro;
    }
    get getTelefones() {
        return this.telefone;
    }
    get getPets() {
        return this.pet;
    }
    adicionarCompra(compras) {
        this.compras.push(compras);
    }
    getCompras() {
        return this.compras;
    }
}
exports.default = Cliente;
