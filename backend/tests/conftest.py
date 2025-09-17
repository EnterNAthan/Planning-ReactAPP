import pytest
import sys
import os

# Ajouter le dossier parent (backend) au path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import create_app
from data.database import db
from models.models import Semestre
from routes.semestre_routes import semestre_bp
from routes.sae_routes import sae_bp  
from routes.ressource_routes import ressource_bp

@pytest.fixture
def app():
    """Create and configure test app"""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """Test client"""
    return app.test_client()

@pytest.fixture
def sample_semestre(app):
    """Create sample semestre for tests"""
    with app.app_context():
        semestre = Semestre(nom="S1", annee="2024-2025")
        db.session.add(semestre)
        db.session.commit()
        return semestre

@pytest.fixture
def sample_ressource(sample_semestre, app):
    """Create sample ressource for tests"""
    with app.app_context():
        from models.models import Ressource
        ressource = Ressource(nom="Ressource Test", semestre_id=sample_semestre.id)
        db.session.add(ressource)
        db.session.commit()
        db.session.refresh(ressource)
        return ressource

@pytest.fixture
def sample_sae(sample_semestre, app):
    """Create sample SAE for tests"""
    with app.app_context():
        from models.models import Sae
        sae = Sae(nom="SAE Test", semestre_id=sample_semestre.id)
        db.session.add(sae)
        db.session.commit()
        db.session.refresh(sae)
        return sae

