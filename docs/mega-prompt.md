# Mega prompt — Agenda Fácil

Crie uma aplicação web responsiva chamada Agenda Fácil para prestadores de serviços que trabalham com hora marcada.

## Identidade visual
- Azul-petróleo `#176B70`, verde-claro `#DDF3E4`, fundo branco e texto cinza-escuro.
- Aparência moderna, acessível e simples.
- Interface em português brasileiro, responsiva, preços em reais e datas no formato brasileiro.

## Fluxo público
- Landing page com apresentação, benefícios, serviços e instruções.
- Catálogo de serviços com nome, descrição, preço e duração.
- Formulário com nome, telefone, serviço, data, horário e observações opcionais.
- Validar campos obrigatórios e impedir datas passadas.
- Registrar a solicitação com status inicial Pendente.
- Informar que o horário depende de confirmação.
- Botão de WhatsApp somente quando um número autorizado estiver configurado.

## Painel
- Área administrativa autenticada.
- Indicadores de solicitações pendentes, confirmadas e total.
- Listagem e filtros de agendamentos.
- Atualização de status.
- Cadastro e edição de serviços.
- Consulta de clientes vinculados aos agendamentos.

## Dados e segurança
- Usar backend persistente gerenciado.
- Aplicar autenticação e autorização no servidor e banco de dados.
- Impedir acesso entre profissionais diferentes.
- Validar dados no servidor.
- Não armazenar senhas manualmente nem expor segredos no frontend.
- Não utilizar dados reais de clientes em demonstrações públicas.

## Testes de aceitação
- Solicitação válida é salva e aparece no painel.
- Campos inválidos são rejeitados.
- Dados persistem após recarregar a página.
- Visitantes não acessam o painel.
- Usuários não acessam registros de outros profissionais.
- Conflitos de horário são validados no servidor.
- Interface funciona em celulares e computadores.

## Restrições
Não incluir pagamentos, chatbot ou notificações automáticas no primeiro MVP. Apresentar um plano antes de implementar e não declarar testes como concluídos sem executá-los.
