/**
 * Model: Doacao
 * Uma Doacao pertence a um Doador (N:1)
 * e possui um ou vários Alimentos (1:N).
 */
class Doacao {
  constructor({ id, data, doadorId, alimentosIds = [] }) {
    this.id = id;
    this.data = data;
    this.doadorId = doadorId;
    this.alimentosIds = alimentosIds; // ids dos Alimentos vinculados
  }
}

module.exports = Doacao;
