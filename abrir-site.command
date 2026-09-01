#!/bin/bash
cd "$(dirname "$0")"

LOGFILE=$(mktemp)
echo "Iniciando el sitio, espera un momento..."
npm run dev > "$LOGFILE" 2>&1 &
DEVPID=$!

for i in $(seq 1 60); do
  URL=$(grep -o 'http://localhost:[0-9]*' "$LOGFILE" | head -n1)
  if [ -n "$URL" ]; then
    echo "Abriendo $URL"
    open "$URL"
    break
  fi
  sleep 1
done

echo ""
echo "El sitio está funcionando. No cierres esta ventana mientras navegas."
echo "Para detenerlo, cierra esta ventana o presiona Ctrl+C."

wait $DEVPID
