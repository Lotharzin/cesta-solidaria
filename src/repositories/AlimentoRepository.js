const Alimento = require('../models/Alimento');

/**
 * Repository: AlimentoRepository
 * Responsável exclusivamente pelo acesso/armazenamento dos dados de Alimento.
 */
class AlimentoRepository {
  constructor() {
    this.alimentos = [];
    this.nextId = 1;
  }

  create(dadosAlimento) {
    const alimento = new Alimento({ id: this.nextId++, ...dadosAlimento });
    this.alimentos.push(alimento);
    return alimento;
  }

  findAll() {
    return this.alimentos;
  }

  findById(id) {
    return this.alimentos.find((a) => a.id === Number(id)) || null;
  }

  findByIds(ids = []) {
    const idsNum = ids.map(Number);
    return this.alimentos.filter((a) => idsNum.includes(a.id));
  }

  findByDoacaoId(doacaoId) {
    return this.alimentos.filter((a) => a.doacaoId === Number(doacaoId));
  }

  vincularADoacao(id, doacaoId) {
    const alimento = this.findById(id);
    if (alimento) alimento.doacaoId = doacaoId;
    return alimento;
  }
}

module.exports = AlimentoRepository;
