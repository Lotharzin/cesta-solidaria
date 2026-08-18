/**
 * Model: Doador
 * Um Doador possui um Endereco (composição 1:1)
 * e pode realizar várias Doacoes (1:N), relacionamento
 * mantido pelo doadorId dentro de cada Doacao.
 */
class Doador {
  constructor({ id, nome, telefone, email, endereco }) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco; // instância de Endereco
  }
}

module.exports = Doador;
