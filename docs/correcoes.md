# Registro de correções

Este arquivo deve registrar correções observadas durante os testes.

## Implementação inicial

- Criado protótipo em HTML, CSS e JavaScript sem dependências de build.
- Adicionada landing page responsiva, catálogo, formulário e painel demonstrativo.
- O armazenamento usa `localStorage`, pois o protótipo ainda não possui backend.
- O botão de WhatsApp não usa um número real e informa que a configuração está pendente.
- O painel exibe aviso explícito de que não possui autenticação real.

## Testes a executar

- [ ] Página abre em computador.
- [ ] Página abre em celular.
- [ ] Serviços aparecem corretamente.
- [ ] Formulário válido cria solicitação.
- [ ] Data passada é rejeitada.
- [ ] Solicitação aparece no painel.
- [ ] Status pode ser atualizado.
- [ ] Serviço pode ser adicionado.
- [ ] Serviço utilizado por uma solicitação não pode ser removido.
- [ ] Dados continuam no mesmo navegador após atualizar a página.

## Como registrar novas correções

Para cada problema, anotar:
1. O comportamento esperado.
2. O comportamento observado.
3. Como reproduzir.
4. A alteração realizada.
5. O resultado do reteste.

Não registrar um teste como aprovado antes de executá-lo.
