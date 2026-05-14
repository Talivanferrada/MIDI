#!/bin/bash

# ============================================================
# MIDI Framework - Instalador Simplificado v0.2.0
# ============================================================
# Uso: ./install.sh [directorio_destino]
# Ejemplo: ./install.sh ~/mi-proyecto
# ============================================================

set -e

# Colores para output
RED=$(printf '%b' "$(tput setaf 1 2>/dev/null || echo '')")
GREEN=$(printf '%b' "$(tput setaf 2 2>/dev/null || echo '')")
YELLOW=$(printf '%b' "$(tput setaf 3 2>/dev/null || echo '')")
BLUE=$(printf '%b' "$(tput setaf 4 2>/dev/null || echo '')")
RESET=$(printf '%b' "$(tput sgr0 2>/dev/null || echo '')")

# Banner
echo ""
echo "${BLUE}╔═══════════════════════════════════════════════════════════╗${RESET}"
echo "${BLUE}║                                                           ║${RESET}"
echo "${BLUE}║          MIDI Framework v0.2.0 - Instalador             ║${RESET}"
echo "${BLUE}║     Modelo Inteligente de Desarrollo de Innovación       ║${RESET}"
echo "${BLUE}║                                                           ║${RESET}"
echo "${BLUE}╚═══════════════════════════════════════════════════════════╝${RESET}"
echo ""

# Detectar directorio del script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Directorio de destino
if [ -z "$1" ]; then
    DEST_DIR=$(pwd)
else
    DEST_DIR="$1"
fi

echo "${YELLOW}📁 Directorio de trabajo:${RESET} $DEST_DIR"
echo "${YELLOW}📦 Directorio del framework:${RESET} $FRAMEWORK_DIR"
echo ""

# Paso 1: Verificar Node.js
echo "${BLUE}▶ Paso 1/5: Verificando Node.js...${RESET}"
if ! command -v node &> /dev/null; then
    echo "${RED}✗ Node.js no está instalado.${RESET}"
    echo "  Por favor instala Node.js 16+ desde https://nodejs.org"
    exit 1
fi
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "${RED}✗ Node.js versión $NODE_VERSION es muy antigua. Se requiere 16+${RESET}"
    exit 1
fi
echo "${GREEN}✓ Node.js $(node --version) detectado${RESET}"

# Paso 2: Instalar dependencias del framework
echo ""
echo "${BLUE}▶ Paso 2/5: Instalando dependencias...${RESET}"
cd "$FRAMEWORK_DIR/midi-framework"

# Verificar si ya están instaladas
if [ -d "node_modules" ]; then
    echo "${GREEN}✓ Dependencias ya instaladas${RESET}"
else
    echo "  Ejecutando npm install..."
    npm install --silent 2>/dev/null || npm install
    echo "${GREEN}✓ Dependencias instaladas${RESET}"
fi

# Paso 3: Crear link global
echo ""
echo "${BLUE}▶ Paso 3/5: Configurando comando 'midi'...${RESET}"
npm link --silent 2>/dev/null || npm link
echo "${GREEN}✓ Comando 'midi' disponible globalmente${RESET}"

# Paso 4: Inicializar proyecto si se especificó directorio
echo ""
echo "${BLUE}▶ Paso 4/5: Inicializando proyecto...${RESET}"
cd "$DEST_DIR"

if [ "$DEST_DIR" != "$FRAMEWORK_DIR/midi-framework" ]; then
    # Crear directorio si no existe
    mkdir -p "$DEST_DIR"
    cd "$DEST_DIR"
    
    # Inicializar proyecto
    PROJECT_NAME=$(basename "$DEST_DIR")
    node "$FRAMEWORK_DIR/midi-framework/bin/midi.js" init --yes --project-name "$PROJECT_NAME" --country "Chile" 2>/dev/null || true
    echo "${GREEN}✓ Proyecto '$PROJECT_NAME' inicializado${RESET}"
else
    echo "${GREEN}✓ Framework listo (no se inicializa proyecto en directorio del framework)${RESET}"
fi

# Paso 5: Verificar instalación
echo ""
echo "${BLUE}▶ Paso 5/5: Verificando instalación...${RESET}"
node "$FRAMEWORK_DIR/midi-framework/bin/midi.js" doctor 2>/dev/null || echo "${YELLOW}⚠ Ejecuta 'midi doctor' para verificación completa${RESET}"

# Mostrar instrucciones
echo ""
echo "${GREEN}╔═══════════════════════════════════════════════════════════╗${RESET}"
echo "${GREEN}║               ✓ INSTALACIÓN COMPLETADA                   ║${RESET}"
echo "${GREEN}╚═══════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo "${BLUE}📚 PRÓXIMOS PASOS:${RESET}"
echo ""
echo "  ${YELLOW}1. Ir al directorio de tu proyecto:${RESET}"
echo "     cd $DEST_DIR"
echo ""
echo "  ${YELLOW}2. Iniciar el workflow de MIDI:${RESET}"
echo "     midi start"
echo ""
echo "  ${YELLOW}3. O ejecutar el modo exploración:${RESET}"
echo "     midi explore"
echo ""
echo "${BLUE}📖 COMANDOS DISPONIBLES:${RESET}"
echo ""
echo "  midi start          - Iniciar workflow completo"
echo "  midi explore        - Modo exploración (generar ideas)"
echo "  midi financeable     - Modo financiable (análisis profundo)"
echo "  midi doctor          - Verificar instalación"
echo "  midi status          - Ver estado del proyecto"
echo ""
echo "${BLUE}💡 MODO DE USO:${RESET}"
echo ""
echo "  ${GREEN}Para explorar ideas desde cero:${RESET}"
echo "    1. Ejecuta: midi start"
echo "    2. Selecciona: 'Explorar ideas desde cero'"
echo "    3. Responde las preguntas sobre tu contexto"
echo ""
echo "  ${GREEN}Para analizar un proyecto existente:${RESET}"
echo "    1. Ejecuta: midi start"
echo "    2. Selecciona: 'Analizar proyecto para financiamiento'"
echo "    3. Proporciona los detalles del proyecto"
echo ""
echo "  ${GREEN}Para postular a un fondo específico:${RESET}"
echo "    1. Ejecuta: midi start"
echo "    2. Selecciona: 'Postular a fondo concursable específico'"
echo "    3. Proporciona nombre del fondo y link a bases"
echo ""
echo "${BLUE}🌐 DOCUMENTACIÓN:${RESET}"
echo "  README: https://github.com/Talivanferrada/MIDI"
echo "  Manual:  $DEST_DIR/.midi/docs/MANUAL_DE_USO.md"
echo ""
echo "${GREEN}¡Listo para innovar! 🚀${RESET}"
echo ""
