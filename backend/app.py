from flask import Flask
from flask_cors import CORS
from data.database import db, init_db
from routes.semestre_routes import semestre_bp  
from routes.sae_routes import sae_bp
from routes.ressource_routes import ressource_bp
from routes.planning_routes import planning_bp

def create_app():
    app = Flask(__name__)
    # Configuration CORS - SOLUTION SIMPLE
    CORS(app, 
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  # Toutes les méthodes
        allow_headers=['Content-Type', 'Authorization'],      # Headers nécessaires
        origins=['http://localhost:3001']                     # Votre frontend
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///planning.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    init_db(app)
    
    # BLUEPRINTS
    app.register_blueprint(semestre_bp)  # Ou sans prefix
    app.register_blueprint(sae_bp)
    app.register_blueprint(ressource_bp)
    app.register_blueprint(planning_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)