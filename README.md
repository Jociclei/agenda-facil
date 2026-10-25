# Agenda Fácil

MVP educacional de uma aplicação web para facilitar solicitações de agendamento de prestadores de serviços. Projeto desenvolvido para o desafio da DIO.

## Aplicação

- **Tecnologia:** HTML, CSS e JavaScript puro.
- **Armazenamento atual:** `localStorage` do navegador, exclusivamente para demonstração.
- **Publicação sugerida:** GitHub Pages.
- **Status:** protótipo funcional local; ainda não é adequado para uso comercial com dados reais.

## Problema

Prestadores de serviços que trabalham com hora marcada podem ter dificuldade para organizar solicitações recebidas por mensagens, acompanhar os horários pedidos e manter os dados de atendimento em um só lugar.

O Agenda Fácil propõe uma página pública com catálogo de serviços, formulário de solicitação e um painel demonstrativo para acompanhar os pedidos.

## Público-alvo

Prestadores de serviços em geral, incluindo profissionais de manutenção, beleza, aulas particulares e serviços personalizados.

## Proposta de valor

Facilitar a solicitação e a organização de atendimentos por meio de uma interface simples, responsiva e em português brasileiro.

## Funcionalidades implementadas

- Landing page responsiva.
- Catálogo de serviços demonstrativos.
- Formulário de solicitação de agendamento.
- Validação de campos e bloqueio de datas passadas.
- Registro de solicitações no armazenamento local do navegador.
- Painel demonstrativo com contadores e filtro de status.
- Atualização de status das solicitações.
- Cadastro e remoção de serviços demonstrativos.
- Identificação explícita de que os dados são locais e o painel não tem autenticação real.

## Limitações importantes

Esta versão é um protótipo de frontend. Os dados ficam apenas no navegador e não são sincronizados entre dispositivos ou usuários. O painel não tem autenticação real, portanto **não use dados pessoais reais nem publique a aplicação como serviço comercial nesta versão**.

O WhatsApp está desabilitado até que seja configurado um número autorizado. O sistema não confirma automaticamente a disponibilidade real dos horários. A verificação de conflito no protótipo é básica e não substitui validação segura no servidor.

## TAM, SAM e SOM

Os cálculos preliminares do projeto são hipóteses de planejamento, não dados de mercado verificados:

- **TAM:** profissionais potencialmente atendidos em todo o mercado escolhido.
- **SAM:** parcela alcançável com o nicho, a oferta e os canais disponíveis.
- **SOM:** meta inicial de clientes que o projeto pretende conquistar.

Premissa exploratória utilizada anteriormente: assinatura hipotética de R$ 29 por mês. Antes de apresentar os valores como pesquisa definitiva, atualizar e documentar as fontes, a população considerada e as premissas.

## Business Model Canvas

- **Proposta de valor:** simplificar solicitações e organização de agendamentos.
- **Segmentos de clientes:** prestadores de serviços que trabalham com hora marcada.
- **Canais:** WhatsApp, redes sociais, indicações e demonstrações.
- **Relacionamento:** suporte e orientação inicial.
- **Receitas:** possível assinatura mensal, ainda não validada.
- **Recursos principais:** aplicação web e infraestrutura de hospedagem/backend.
- **Atividades principais:** desenvolvimento, manutenção, divulgação e validação.
- **Parcerias:** plataformas de hospedagem, comunicação e desenvolvimento.
- **Custos:** hospedagem, domínio opcional, manutenção e divulgação.

## Hipóteses a validar

1. Prestadores de serviços sentem dificuldade para organizar solicitações.
2. Uma página de agendamento simplifica o contato com clientes.
3. O painel ajuda a acompanhar os pedidos.
4. Há profissionais dispostos a testar a ferramenta.
5. Parte do público pagaria por uma solução desse tipo.

## O que fica manual de propósito

- Confirmação da disponibilidade pelo profissional.
- Contato com o cliente.
- Cobrança, pois não há integração de pagamento.
- Coleta de feedback dos primeiros usuários.

## Como executar

Não é necessário instalar ferramentas para testar o protótipo:

1. Baixe ou clone este repositório.
2. Abra `index.html` em um navegador moderno.
3. Teste o formulário com dados fictícios.
4. Clique em **Painel do profissional** para acompanhar as solicitações.
5. Atualize a página para verificar a persistência local no mesmo navegador.

Para publicar gratuitamente, envie os arquivos ao GitHub e ative **Settings → Pages**, selecionando a branch principal e a pasta raiz (`/root`). O endereço será exibido nas configurações do GitHub Pages após a publicação.

## Estrutura

```text
agenda-facil/
├── index.html
├── style.css
├── app.js
├── README.md
├── .gitignore
└── docs/
    ├── mega-prompt.md
    ├── correcoes.md
    └── validacao.md
```

## Mega prompt

Consulte [`docs/mega-prompt.md`](docs/mega-prompt.md).

## Correções e decisões

Consulte [`docs/correcoes.md`](docs/correcoes.md).

## Plano de validação

Consulte [`docs/validacao.md`](docs/validacao.md).

## Evidências

Adicione capturas de tela reais da aplicação e dos testes em `docs/evidencias/` após executar o protótipo. Não inclua dados pessoais reais.

## Segurança

Não há credenciais neste repositório. Antes de uma versão de produção, implementar backend persistente, autenticação e autorização no servidor, regras de acesso aos dados, verificação robusta de conflitos e uma revisão de segurança.

## Próximos passos

1. Testar o protótipo.
2. Coletar feedback de profissionais.
3. Registrar correções e evidências.
4. Implementar backend e autenticação seguros.
5. Publicar a versão adequada ao uso pretendido.
