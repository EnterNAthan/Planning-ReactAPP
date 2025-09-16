from ..data.database import db
from datetime import datetime



class Semestre(db.Model):
    __tablename__ = 'semestres'

    # clef primaire
    id = db.Column(db.Integer, primary_key=True)
    # Nom du semestre par exemple S5 S6
    nom = db.Column(db.String(2), nullable=False)
    #Année en cours du semestre sous le format 2025-2024 9 caractère
    annee = db.Column(db.String(9), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #Relations
    ressources = db.relationship('Ressource', backref='semestre')
    saes = db.relationship('SAE', backref='semestre')
    # Mauvaise Relations à ne pas faire double relations  et mauvaise logique sinon faudras faire planning.semestre.ressource
    #plannings = db.relationship('Planning', backref='semestre')

    def __repr__(self):
        return f'<SEMESTRE {self.nom} - {self.annee}>' 

class Ressource(db.Model):
    __tablename__ ='ressources'

     # clef primaire
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable =False)
    # la clef étrangère qui est l'id du semestre en question
    semestre_id = db.Column(db.Integer, db.ForeignKey('semestres.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

   
    # Relations
    plannings = db.relationship('Planning', backref='ressource')

    def __repr__(self):
        return f'<Ressource {self.nom}>'
    
