"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Produto {
    constructor(idprod, nomeprod, valorprod, descricaoprod, tipoprod) {
        this.idprod = idprod;
        this.nomeprod = nomeprod;
        this.valorprod = valorprod;
        this.descricaoprod = descricaoprod;
        this.tipoprod = tipoprod;
    }
    get getIdProduto() {
        return this.idprod;
    }
    get getNomeProduto() {
        return this.nomeprod;
    }
    get getValorProduto() {
        return this.valorprod;
    }
    get getDescricaoProduto() {
        return this.descricaoprod;
    }
    get getTipoProduto() {
        return this.tipoprod;
    }
}
exports.default = Produto;
