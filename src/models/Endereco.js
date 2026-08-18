/**
 * Model: Endereco
 * Representa o endereço de um Doador.
 */
class Endereco {
  constructor({ id, rua, numero, bairro, cidade, cep }) {
    this.id = id;
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.cep = cep;
  }
}

module.exports = Endereco;
