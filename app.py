from flask import Flask, request, Response, render_template
import pandas as pd
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "Nenhum arquivo enviado", 400

    file = request.files['file']
    if file.filename == '':
        return "Arquivo inválido", 400

    # Lê CSV (usa ';' como separador)
    df = pd.read_csv(file, sep=';', engine='python')

    # Pega colunas e envia pro template select_columns.html
    columns = df.columns.tolist()
    csv_data = df.to_csv(index=False, sep=';')

    return render_template('select_columns.html', columns=columns, data=csv_data)

@app.route('/processar', methods=['POST'])
def processar():
    csv_data = request.form['data']
    colunas = request.form.getlist('colunas')

    if not colunas:
        return "Nenhuma coluna selecionada", 400

    df = pd.read_csv(io.StringIO(csv_data), sep=';')

    # Mantém apenas colunas selecionadas
    df = df[colunas]

    # Se existir a coluna 'CPF trabalhador', remove duplicados
    col_cpf = None
    for col in df.columns:
        if col.strip().lower() == "cpf trabalhador":
            col_cpf = col
            break

    if col_cpf:
        df = df.drop_duplicates(subset=[col_cpf], keep='first')

    # Gera CSV resultante (sem salvar no servidor)
    output = io.StringIO()
    df.to_csv(output, index=False, sep=';')
    output.seek(0)

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=planilha_tratada.csv"}
    )

if __name__ == '__main__':
    from livereload import Server
    app.debug = True
    server = Server(app)
    server.watch('app.py')
    server.watch('templates/*.html')
    server.watch('static/*.css')
    server.serve(host='127.0.0.1', port=5000, debug=True)
