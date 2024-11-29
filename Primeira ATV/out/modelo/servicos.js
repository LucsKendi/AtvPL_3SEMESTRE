"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Servico {
    constructor(idserv, nomeserv, valorserv, descricaoserv, tiposerv) {
        this.idserv = idserv;
        this.nomesserv = nomeserv;
        this.valorserv = valorserv;
        this.descricaoserv = descricaoserv;
        this.tiposerv = tiposerv;
    }
    get getIdServico() {
        return this.idserv;
    }
    get getNomeServico() {
        return this.nomesserv;
    }
    get getValorServico() {
        return this.valorserv;
    }
    get getDescricaoServico() {
        return this.descricaoserv;
    }
    get getTipoServico() {
        return this.tiposerv;
    }
}
exports.default = Servico;
