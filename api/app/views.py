from app import app

@app.route('/')
def index():
    print('hello world')
    return 'Hello Flask!'


@app.route('/about')
def about():
    return  'About one node'