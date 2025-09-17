from flask import Flask
from data.database import db, init_db
from routes.semestre_routes import semestre_bp  
from routes.sae_routes import sae_bp
from routes.ressource_routes import ressource_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///planning.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    init_db(app)
    
    # BLUEPRINTS
    app.register_blueprint(semestre_bp)  # Ou sans prefix
    app.register_blueprint(sae_bp)
    app.register_blueprint(ressource_bp)
    
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)