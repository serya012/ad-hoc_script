# Automacao de Formatação de Horários no Google Sheets

## Descrição

Este script em Google Apps Script automatiza a formatação de entradas de horários nas colunas **F (Saída)** e **G (Retorno)** de uma planilha no Google Sheets. Sempre que um usuário edita uma dessas colunas, o script verifica e ajusta automaticamente o formato do horário digitado.

Este código foi desenvolvido especificamente para a planilha utilizada pelo autor. Para ser utilizado em outras planilhas, pode ser necessário reescrevê-lo ou adaptá-lo conforme as necessidades do usuário.

## Funcionalidades

- Completa entradas parciais de horário, garantindo um formato padrão **HH:MM**.
- Suporta diferentes tipos de entrada:
  - `12:` → `12:00`
  - `12:3` → `12:30`
  - `830` → `08:30`
  - `2249` → `22:49`
- Mantém a planilha organizada e padronizada sem necessidade de correções manuais.

## Como Funciona

1. O script é acionado automaticamente sempre que uma edição é feita nas colunas F ou G.
2. Ele verifica o valor inserido e ajusta para o formato correto, caso necessário.
3. O valor formatado é atualizado na célula correspondente.
4. Caso a entrada não corresponda a nenhum dos padrões esperados, nenhuma alteração é feita.

## Como Adicionar o Script

1. Abra sua planilha no **Google Sheets**.
2. Clique em **Extensões** > **Apps Script**.
3. Exclua qualquer código existente e cole o script correspondente.
4. Salve o script e feche o **Apps Script**.
5. Teste editando valores nas colunas F e G para verificar a formatação automática.

