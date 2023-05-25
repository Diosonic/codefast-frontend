export function convertMinutesAndSeconds(numero) {
  var minutos = Math.floor(numero / 60);
  var segundos = numero % 60;

  var minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
  var segundosFormatados = segundos < 10 ? "0" + segundos : segundos;

  var tempoFormatado = minutosFormatados + ":" + segundosFormatados;

  return tempoFormatado;
}
