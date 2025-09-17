from flask import Flask
from data.database import db

def create_app() -> Flask:
    """Factory pour créer l'application Flask"""
    app = Flask(__name__)
    
    
    # Initialiser la DB
    db.init_app(app)
    
    # Route d'accueil
    @app.route('/')
    def home():  
        return 'Hello, Flask!'
    
    return app 

# Pour lancer directement ce fichier
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
