# Cadastro de Categoria
**RF**
[x] Deve ser possível cadastro uma categoria de carros.

**RN**
[x] Não deve ser possível cadastrar uma categoria já existente.
[x] Apenas usuários administradores podem adicionar categorias.

# Cadastro de Carro
**RF**
[x] Deve ser possível cadastro um novo carro.

**RN**
[x] Não deve ser possível cadastrar um carro com a placa existente.
[x] O carro ao ser cadastrado, deve estar disponível.
[x] Apenas usuários administradores podem adicionar carros.
[ ] Não deve ser possível alterar a placa de um carro já cadastrado.

# Listagem de Carros
**RF**
[x] Deve ser possível listar todos os carros disponíveis
[ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
[ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca
[ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
[x] O usuário não precisa estar logado para listagem

# Cadastro de Especificações no Carro
**RF**
[ ] Deve ser possível cadastrar uma especificação para um carro
[ ] Deve ser possível listar todas as especificações
[ ] Deve ser possível listar todos os carros

**RN**
[ ] Não deve ser possível cadastrar uma especificação para um carro não existente
[ ] Não deve ser possível um carro ter especificação duplicada
[ ] O usuário não precisa estar logado para listagem

# Cadastro de Imagem de Carros
**RF**
[ ] Deve ser possível adicionar uma imagem a um carro

**RN**
[ ] O usuário pode cadastrar mais de uma imagem para o mesmo carro
[ ] Apenas administrador pode adicionar uma imagem

# Alugel de Carro
**RF**
[ ] Deve ser possível cadastrar um alugel de carro

**RN**
[ ] O alugel deve ter duração mínima de uma hora
[ ] Apenas clientes podem alugar carros
[ ] Não pode alugar um carro de carro já esteja alugado
[ ] Um carro não pode ser alugado por um cliente que já tenha um alugel
