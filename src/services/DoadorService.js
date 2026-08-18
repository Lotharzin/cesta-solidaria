const Endereco = require('../models/Endereco');

/**
 * Service: DoadorService
 * Implementa as regras de negócio relacionadas ao Doador,
 * incluindo a criação do Endereco associado (composição 1:1).
 */
class DoadorService {
  constructor(doadorRepository) {
    this.doadorRepository = doadorRepository;
    this.nextEnderecoId = 1;
  }

  cadastrar({ nome, telefone, email, endereco }) {
    if (!nome || !nome.trim()) {
      throw new Error('O nome do doador é obrigatório.');
    }
    if (!telefone || !telefone.trim()) {
      throw new Error('O telefone do doador é obrigatório.');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Informe um e-mail válido.');
    }
    if (!endereco || !endereco.rua || !endereco.cidade || !endereco.cep) {
      throw new Error('Endereço incompleto: rua, cidade e CEP são obrigatórios.');
    }

    const enderecoCriado = new Endereco({
      id: this.nextEnderecoId++,
      rua: endereco.rua,
      numero: endereco.numero || 'S/N',
      bairro: endereco.bairro || '',
      cidade: endereco.cidade,
      cep: endereco.cep,
    });

    return this.doadorRepository.create({
      nome,
      telefone,
      email,
      endereco: enderecoCriado,
    });
  }

  listarTodos() {
    return this.doadorRepository.findAll();
  }

  buscarPorId(id) {
    const doador = this.doadorRepository.findById(id);
    if (!doador) throw new Error('Doador não encontrado.');
    return doador;
  }
}

module.exports = DoadorService;
