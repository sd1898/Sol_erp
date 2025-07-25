from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_data():
    data = request.json
    descricao_problema = data.get('descricao_problema', '').lower()
    
    sugestao_tipo_servico = "Outros"

    if "tela" in descricao_problema or "display" in descricao_problema:
        sugestao_tipo_servico = "Reparo de Tela"
    elif "bateria" in descricao_problema or "carregando" in descricao_problema:
        sugestao_tipo_servico = "Troca de Bateria"
    elif "software" in descricao_problema or "sistema" in descricao_problema or "travando" in descricao_problema:
        sugestao_tipo_servico = "Manutenção de Software"
    elif "teclado" in descricao_problema or "mouse" in descricao_problema:
        sugestao_tipo_servico = "Reparo de Periféricos"
    elif "rede" in descricao_problema or "internet" in descricao_problema:
        sugestao_tipo_servico = "Configuração de Rede"

    print(f"Dados recebidos para análise: {data}")
    return jsonify({
        "status": "success",
        "message": "Dados recebidos e processados pelo SolucioBot (simulado)!",
        "received_data": data,
        "sugestao_tipo_servico": sugestao_tipo_servico
    })

@app.route('/analyze_dashboard_data', methods=['POST'])
def analyze_dashboard_data():
    data = request.json
    ordens_servico = data.get('ordens_servico', [])

    # Exemplo de análise: Contagem de tipos de serviço
    tipo_servico_counts = {}
    for os in ordens_servico:
        tipo = os.get('tipo_servico', 'Desconhecido')
        tipo_servico_counts[tipo] = tipo_servico_counts.get(tipo, 0) + 1

    # Exemplo de análise: Média de tempo para conclusão (simulado)
    # Em um cenário real, você calcularia a diferença entre data_abertura e data_conclusao
    media_tempo_conclusao = "N/A (simulado)"

    return jsonify({
        "status": "success",
        "message": "Análise de dados do dashboard concluída (simulado)!",
        "analise_dashboard": {
            "tipo_servico_counts": tipo_servico_counts,
            "media_tempo_conclusao": media_tempo_conclusao
        }
    })

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "service": "SolucioBot Core AI"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)