function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var value = range.getValue();

  // Verifica se a edição ocorreu na coluna "Saída" (F) ou "Retorno" (G)
  var column = range.getColumn();
  if (column === 6 || column === 7) { // Coluna F (6) e G (7)

    value = value.toString().trim(); // Garante que é uma string e remove espaços extras
    var newValue = "";

    // Caso o valor tenha o formato HH:
    if (/^\d{1,2}:$/.test(value)) {
      newValue = value + "00"; // Completa com "00" nos minutos

    } else if (/^\d{1,2}:\d$/.test(value)) {
      var parts = value.split(":");
      newValue = parts[0] + ":" + parts[1] + "0"; // Completa os minutos com 0

    } else if (/^\d{3,4}$/.test(value)) {
      // Se o valor for numérico e tiver 3 ou 4 dígitos
      var len = value.length;
      var hours = value.slice(0, len - 2);
      var minutes = value.slice(len - 2);

      if (hours.length === 1) {
        hours = "0" + hours; // Garante formato "08:30"
      }
      newValue = hours + ":" + minutes;
    } else if (/^\d{1,2}$/.test(value)) {
      // Se for apenas um número (como "23"), assume-se como hora e adiciona os minutos como 00
      newValue = value + ":00";
    } else {
      // Se o valor não se encaixar em nenhum formato válido, apaga o valor
      sheet.getRange(range.getRow(), column).setValue("");
      return;
    }

    // Verificação dos valores
    var timeParts = newValue.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);

    // Se for 24 horas, converte para 00:00
    if (hours === 24) {
      newValue = "00:00";
    }

    // Verifica se a hora e os minutos são válidos (hora 0-23 e minutos 0-59)
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      sheet.getRange(range.getRow(), column).setValue(""); // Apaga se for inválido
      return; 
    }

    // Para valores como "8643", "1297", "2599", "1084" (sem ":")
    if (/^\d{4}$/.test(value)) {
      var hourPart = parseInt(value.slice(0, 2), 10); // Parte da hora
      var minutePart = parseInt(value.slice(2, 4), 10); // Parte dos minutos

      if (hourPart === 24) {
        hourPart = 0; // Se for 24, converte para 00
      }

      if (hourPart < 0 || hourPart > 23 || minutePart < 0 || minutePart > 59) {
        sheet.getRange(range.getRow(), column).setValue(""); // Apaga se for inválido
        return;
      }

      newValue = ("0" + hourPart).slice(-2) + ":" + ("0" + minutePart).slice(-2); // Formata a hora
    }

    // Atualiza o valor formatado na célula
    sheet.getRange(range.getRow(), column).setValue(newValue);
  }
}
