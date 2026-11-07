# Estructura de los archivos

## resultado.json (para `hacer_panel.py`)
```json
{
  "persona": "Javi",
  "objetivo": "Administrativo/a en Madrid",
  "fecha": "2026-11-05",
  "fuentes": ["Indeed"],
  "titulos": [{"titulo": "Administrativo de facturación", "por_que": "Llevas la facturación desde 2011"}],
  "ofertas": [{
    "puesto": "Administrativo/a de facturación",
    "empresa": "Empresa",
    "lugar": "Pozuelo de Alarcón",
    "modalidad": "Presencial",
    "contrato": "Temporal",
    "salario": "No lo dice",
    "publicada": "2026-11-05 o el texto del portal, como «hace 1 semana»",
    "enlace": "https://…",
    "fuente": "Indeed",
    "requisitos": [{"texto": "Experiencia en facturación", "peso": "imprescindible", "cumple": "si", "cita": "frase corta de la oferta, literal si puedes", "evidencia": "lo que dice el CV o lo que falta"}],
    "condiciones": {"zona": "encaja", "jornada": "encaja", "salario": "duda"},
    "alertas": [{"tipo": "rara", "texto": "No dice el salario"}],
    "motivo": "Una frase: por qué sí o por qué no",
    "que_hacer": "Una frase: qué hacer con esta oferta"
  }],
  "cv_ideal": {
    "titular": "Administrativo/a con experiencia en facturación y Excel",
    "resumen": "Modelo de resumen con [huecos]",
    "logros": ["Llevé la facturación de [cifra] clientes y …"],
    "piden": [{"que": "Excel", "n": 7, "estado": "no_lo_cuentas", "nota": "Lo usas a diario y no lo pone"}]
  },
  "cv_adaptado": {"oferta": "Puesto, empresa", "archivo": "cv-adaptado.docx", "cambios": ["Qué has cambiado"], "revisar": ["Qué debe comprobar"]}
}
```
`peso`: `imprescindible`, `importante`, `deseable`. `cumple`: `si`, `parcial`, `no`, `sin_dato`. `condiciones`: `encaja`, `duda`, `no`. `alertas.tipo`: `rara`, `fraude`. `piden.estado`: `tienes`, `no_lo_cuentas`, `te_falta`, `por_aclarar`. `n` es en cuántas ofertas de las que has leído aparece, sin contar las de fraude.

## cv.json (para `hacer_cv.py`)
```json
{
  "nombre": "Nombre Apellido",
  "titular": "Administrativa de facturación",
  "contacto": ["600 000 000", "correo@ejemplo.com", "Madrid"],
  "resumen": "2-3 líneas.",
  "experiencia": [{"puesto": "Administrativo", "empresa": "Empresa", "lugar": "Madrid", "fechas": "2004 - 2026", "logros": ["Logro con su resultado"]}],
  "anterior": ["Auxiliar, Empresa (1999-2004)"],
  "formacion": [{"titulo": "FP de Administración", "centro": "IES", "fechas": "1999"}],
  "aptitudes": ["Excel", "Facturación"],
  "idiomas": ["Inglés: nivel medio"],
  "otros": ["Carné B"],
  "equivalencias": [{"oferta": "conciliación bancaria", "origen": "cuadrar el banco"}],
  "no_tiene": ["SAP"]
}
```
Lo opcional, si no hay, se deja fuera (`anterior`, `aptitudes`, `idiomas`, `otros`, `equivalencias`, `no_tiene`). Los idiomas y datos del ejemplo son de muestra: solo se pone lo que esté en su CV o en sus respuestas.

`equivalencias`: cada expresión de la oferta que usas para algo que ya hizo, con cómo lo dice el original. El script comprueba que la frase original exista y entonces acepta la nueva.

`no_tiene`: lo que la persona ha dicho que no tiene o no ha hecho. Si aparece en el CV, el script avisa.

En una oferta con alerta de `fraude` no hace falta poner requisitos.
