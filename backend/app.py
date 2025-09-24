from flask import Flask
from flask_cors import CORS
from data.database import db, init_db
from routes.semestre_routes import semestre_bp  
from routes.sae_routes import sae_bp
from routes.ressource_routes import ressource_bp
from routes.planning_routes import planning_bp

def create_app():
    app = Flask(__name__)
    # Configuration CORS 
    CORS(app, origins=[
        "http://localhost:3000",    # React dev server
        "http://localhost:3001",    # React dev server (port alternatif)
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
    ], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
    
    
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