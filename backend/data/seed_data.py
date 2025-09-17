# Script pour insérer des données fictives dans la base
from models.models import Semestre, Ressource, Sae
from data.database import db
from flask import Flask

def seed():
	app = Flask(__name__)
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///planning.db'
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	db.init_app(app)

	with app.app_context():
		# Nettoyage
		db.drop_all()
		db.create_all()

		# Création de 2 semestres
		s1 = Semestre(nom="S5", annee="2024-2025")
		s2 = Semestre(nom="S6", annee="2024-2025")
		db.session.add_all([s1, s2])
		db.session.commit()

		# Création de 2 ressources (liées à s1 et s2)
		r1 = Ressource(nom="Mathématiques avancées", semestre_id=s1.id)
		r2 = Ressource(nom="Programmation Web", semestre_id=s2.id)
		db.session.add_all([r1, r2])
		db.session.commit()

		# Création de 2 SAE (liées à s1 et s2)
		sae1 = Sae(nom="SAE Projet Data", semestre_id=s1.id)
		sae2 = Sae(nom="SAE DevOps", semestre_id=s2.id)
		db.session.add_all([sae1, sae2])
		db.session.commit()

		print("Données fictives insérées !")

if __name__ == "__main__":
	seed()
