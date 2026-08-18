# Diagrama UML — Cesta Solidária

Diagrama de classes mostrando o relacionamento entre os objetos do sistema.
O GitHub renderiza blocos ` ```mermaid ` automaticamente na visualização do `.md`.

```mermaid
classDiagram
    class Doador {
        +int id
        +string nome
        +string telefone
        +string email
        +Endereco endereco
    }

    class Endereco {
        +int id
        +string rua
        +string numero
        +string bairro
        +string cidade
        +string cep
    }

    class Doacao {
        +int id
        +Date data
        +int doadorId
        +int[] alimentosIds
    }

    class Alimento {
        +int id
        +string nome
        +number quantidade
        +string unidade
        +int doacaoId
    }

    Doador "1" *-- "1" Endereco : possui
    Doador "1" --> "0..*" Doacao : realiza
    Doacao "1" o-- "1..*" Alimento : contém
```

## Regras de relacionamento

1. **Doador → Endereco (1:1 — composição):** todo Doador possui exatamente um Endereço, criado junto com o cadastro do doador.
2. **Doador → Doacao (1:N):** um Doador pode realizar uma ou várias Doações. Cada Doação referencia um único `doadorId`.
3. **Doacao → Alimento (1:N):** uma Doação contém um ou vários Alimentos. Cada Alimento vinculado guarda o `doacaoId` da doação à qual pertence.

## Fluxo entre camadas (arquitetura)

```mermaid
flowchart LR
    A[Cliente / Front-end] --> B[Controller]
    B --> C[Service]
    C --> D[Repository]
    D --> E[(Dados em memória)]
    F[Model] -.representa entidades usadas por.-> C
    F -.-> D
```

- **Controller** recebe a requisição HTTP e delega para o Service.
- **Service** aplica as regras de negócio (validações, verificação de relacionamentos).
- **Repository** é o único ponto que acessa/gerencia os dados.
- **Model** representa as entidades (`Doador`, `Endereco`, `Doacao`, `Alimento`) usadas por todas as camadas.
