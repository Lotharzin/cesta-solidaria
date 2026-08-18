const Doacao = require('../models/Doacao');

/**
 * Repository: DoacaoRepository
 * Responsável exclusivamente pelo acesso/armazenamento dos dados de Doacao.
 */
class DoacaoRepository {
  constructor() {
    this.doacoes = [];
    this.nextId = 1;
  }

  create(dadosDoacao) {
    const doacao = new Doacao({ id: this.nextId++, ...dadosDoacao });
    this.doacoes.push(doacao);
    return doacao;
  }

  findAll() {
    return this.doacoes;
  }

  findById(id) {
    return this.doacoes.find((d) => d.id === Number(id)) || null;
  }

  findByDoadorId(doadorId) {
    return this.doacoes.filter((d) => d.doadorId === Number(doadorId));
  }
}

module.exports = DoacaoRepository;
