/**
 * Model: Alimento
 * Um Alimento pertence a uma Doacao (N:1),
 * relacionamento mantido pelo doacaoId.
 */
class Alimento {
  constructor({ id, nome, quantidade, unidade, doacaoId = null }) {
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.unidade = unidade;
    this.doacaoId = doacaoId;
  }
}

module.exports = Alimento;
