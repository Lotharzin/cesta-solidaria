const Doador = require('../models/Doador');

/**
 * Repository: DoadorRepository
 * Responsável exclusivamente pelo acesso/armazenamento dos dados de Doador.
 * Nesta versão os dados ficam em memória (array). Trocar a implementação
 * interna (ex: por um banco de dados) não afeta as camadas Service/Controller.
 */
class DoadorRepository {
  constructor() {
    this.doadores = [];
    this.nextId = 1;
  }

  create(dadosDoador) {
    const doador = new Doador({ id: this.nextId++, ...dadosDoador });
    this.doadores.push(doador);
    return doador;
  }

  findAll() {
    return this.doadores;
  }

  findById(id) {
    return this.doadores.find((d) => d.id === Number(id)) || null;
  }

  exists(id) {
    return this.findById(id) !== null;
  }
}

module.exports = DoadorRepository;
