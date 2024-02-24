const matriz = [
  ['a', 'ai'],
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['u', 'ufat'],
]

const obtenerTexto = (elemento) => {
  return document.querySelector(elemento)
}

const establecerTextoDeSalida = (mostrar) => {
  obtenerTexto('.container-vacio').classList.remove('visible')
  obtenerTexto('.mostrar-texto').classList.add('visible')
  obtenerTexto('.texto-encriptado').textContent = mostrar
}

const borrarTexto = () => {
  obtenerTexto('.ingreso-texto').value = ''
  obtenerTexto('.texto-encriptado').textContent = ''
  obtenerTexto('.container-vacio').classList.add('visible')
  obtenerTexto('.mostrar-texto').classList.remove('visible')
  advertencia('')
}

const textoIngresado = () => {
  obtenerTexto('.info p').textContent = ''
}

const textoErroneo = (str) => {
  let regex = /[^a-z 0-9]/g
  return regex.test(str)
}

const advertencia = (text) => {
  obtenerTexto('.info p').textContent = `${text}`
}

const reemplazarCaracter = (caracter) => {
  for (let i = 0; i < matriz.length; i++) {
    if (caracter === matriz[i][0]) return matriz[i][1]
  }
  return caracter
}

const mensajeEncriptado = (mensaje) => {
  let salidaDeEncriptado = ''
  for (let i = 0; i < mensaje.length; i++) {
    salidaDeEncriptado += reemplazarCaracter(mensaje[i])
  }
  return salidaDeEncriptado
}

const desencriptarTexto = (mensaje) => {
  let mensajeDesencriptado = mensaje
  for (let i = matriz.length - 1; i >= 0; i--) {
    mensajeDesencriptado = mensajeDesencriptado.replaceAll(matriz[i][1], matriz[i][0])
  }
  return mensajeDesencriptado
}

const desencriptarMensaje = (action) => {
  const mensajeIngresado = obtenerTexto('.ingreso-texto').value

  if (!mensajeIngresado) {
    advertencia('Ingrese algún texto')
    return
  }

  if (textoErroneo(mensajeIngresado)) {
    advertencia('Ingrese solo letras minúsculas y sin caracteres especiales')
    return
  }

  action === 'desencriptar'
    ? establecerTextoDeSalida(desencriptarTexto(mensajeIngresado))
    : establecerTextoDeSalida(mensajeEncriptado(mensajeIngresado))

  window.location.replace('#mostrar')
}

// Copiar mensaje
const copiarMensaje = async () => {
  const text = obtenerTexto('.texto-encriptado').textContent
  try {
    await navigator.clipboard.writeText(text)
    borrarTexto()
    advertencia('Texto copiado al portapapeles')
  } catch (error) {
    advertencia('No se pudo copiar al portapapeles')
  }
}