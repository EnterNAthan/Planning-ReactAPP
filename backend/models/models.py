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

    # Permet d'initialiser un semestre
    def __init__(self, nom: str, annee: str,) -> None:
        super().__init__()
        self.nom = nom
        self.annee = annee
        
    def __repr__(self):
        return f'<SEMESTRE {self.nom} - {self.annee}>' 


class Ressource(db.Model):
    __tablename__ ='ressources'

    # clef primaire
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    # la clef étrangère qui est l'id du semestre en question
    semestre_id = db.Column(db.Integer, db.ForeignKey('semestres.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relations
    plannings = db.relationship('Planning', backref='ressource')

    # Permet d'initialiser une ressource
    def __init__(self, nom: str, semestre_id: int) -> None:
        super().__init__()
        self.nom = nom
        self.semestre_id = semestre_id
        
    def __repr__(self):
        return f'<Ressource {self.nom}>'


class Sae(db.Model):
    __tablename__ = 'saes'

    #Presque la meme Table que Ressource
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    semestre_id=db.Column(db.Integer, db.ForeignKey('semestres.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relations
    plannings = db.relationship('Planning', backref='sae')

    def __init__(self, nom: str, semestre_id: int) -> None:
        super().__init__()
        self.nom = nom
        self.semestre_id = semestre_id
        
    def __repr__(self):
        return f'<SAE {self.nom}>'

class Planning(db.Model):
    __tablename__ = 'planning'

    id = db.Column(db.Integer, primary_key=True)
    # clef etrangere qui vont me permettre de relier une ressource ou/et une sae a un semestre
    semestre_id = db.Column(db.Integer,db.ForeignKey('semestres.id'), nullable=False)
    ressource_id = db.Column(db.Integer, db.ForeignKey('ressources.id'), nullable=True)
    sae_id = db.Column(db.Integer, db.ForeignKey('saes.id'), nullable=True)

    jour_semaine = db.Column(db.String(10), nullable=False)  #'Lundi', 'Mardi'
    heure_debut = db.Column(db.Time, nullable=False)  # 14:00
    heure_fin = db.Column(db.Time, nullable=False)  # 16:00
    salle = db.Column(db.String(50), nullable=False)  # 'Salle 101'

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, semestre_id: int, jour_semaine: str, heure_debut, heure_fin, salle: str, ressource_id: int = None, sae_id: int = None) -> None:
        super().__init__()
        self.semestre_id = semestre_id
        self.ressource_id = ressource_id
        self.sae_id = sae_id
        self.jour_semaine = jour_semaine
        self.heure_debut = heure_debut
        self.heure_fin = heure_fin
        self.salle = salle
    
    def __repr__(self):
        activite = self.activite.nom if self.ressource else (self.sae.nom if self.sae else "Aucune activité")
        return f'<Planning de {activite} - Jour -{self.jour_semaine} {self.heure_debut}-{self.heure_fin} Salle: {self.salle}>'


    @property
    def activite_nom(self):
        if self.ressource:
            return self.ressource.nom
        elif self.sae:
            return self.sae.nom
        return "Aucune activité"

    @property
    def activite_type(self):
        if self.ressource:
            return "Ressource"
        elif self.sae:
            return "SAE"
        return "Aucune activité"    