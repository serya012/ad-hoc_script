function onEdit(e) {
  try {
    var sheet = e.source.getActiveSheet();
    var range = e.range;
    var column = range.getColumn();

    // Verifica se a edição ocorreu na coluna "Saída" (F) ou "Retorno" (G)
    if (column === 6 || column === 7) {
      var value = range.getValue().toString().trim();
      var newValue = formatTime(value);

      if (newValue === null) {
        // Se o valor for inválido, apaga o valor e exibe uma mensagem de erro
        sheet.getRange(range.getRow(), column).setValue("");
        SpreadsheetApp.getUi().alert(`Valor inválido: "${value}". Use o formato HH:MM ou HHMM.`);
      } else {
        // Atualiza o valor formatado na célula
        sheet.getRange(range.getRow(), column).setValue(newValue);
      }
    }
  } catch (error) {
    // Tratamento de erros inesperados
    SpreadsheetApp.getUi().alert("Ocorreu um erro ao processar a edição. Verifique o valor inserido.");
    console.error(error);
  }
}

function formatTime(value) {
  // Remove espaços extras e verifica se o valor está vazio
  value = value.trim();
  if (!value) return null;

  // Verifica se o valor já está no formato HH:MM
  if (/^\d{2}:\d{2}$/.test(value)) {
    var timeParts = value.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);

    if (isValidTime(hours, minutes)) {
      return value; // Retorna o valor já formatado
    } else {
      return null; // Valor inválido
    }
  }

  // Verifica se o valor tem o formato HH: ou H:
  if (/^\d{1,2}:$/.test(value)) {
    var hours = parseInt(value.replace(":", ""), 10);
    return formatTimeValue(hours, 0); // Completa com 00 minutos
  }

  // Verifica se o valor tem o formato HH:M ou H:M
  if (/^\d{1,2}:\d{1}$/.test(value)) {
    var parts = value.split(":");
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return formatTimeValue(hours, minutes); // Completa os minutos com 0
  }

  // Verifica se o valor é um número de 3 ou 4 dígitos (HHMM ou HMM)
  if (/^\d{3,4}$/.test(value)) {
    var len = value.length;
    var hours = parseInt(value.slice(0, len - 2), 10);
    var minutes = parseInt(value.slice(len - 2), 10);
    return formatTimeValue(hours, minutes); // Formata como HH:MM
  }

  // Verifica se o valor é um número de 1 ou 2 dígitos (H ou HH)
  if (/^\d{1,2}$/.test(value)) {
    var hours = parseInt(value, 10);
    return formatTimeValue(hours, 0); // Completa com 00 minutos
  }

  // Se o valor não se encaixar em nenhum formato válido, retorna null
  return null;
}

function formatTimeValue(hours, minutes) {
  // Converte 24 horas para 00
  if (hours === 24) {
    hours = 0;
  }

  // Verifica se a hora e os minutos são válidos
  if (!isValidTime(hours, minutes)) {
    return null;
  }

  // Formata a hora e os minutos para o formato HH:MM
  return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}

function isValidTime(hours, minutes) {
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}