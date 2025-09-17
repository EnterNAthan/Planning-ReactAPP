from ..app import create_app
from ..data.database import db
from ..models.models import Semestre, Ressource, Sae, Planning

def create_seed_data():
    """Crée les données de base"""
    
    # Créer 2 semestres
    s1 = Semestre(nom="S1", annee="2025-2026")
    s2 = Semestre(nom="S2", annee="2025-2026")
    
    db.session.add(s1)
    db.session.add(s2)
    db.session.commit()
    
    # Créer 2 ressources par semestre
    ressources = [
        Ressource(nom="Python Web", semestre_id=s1.id),
        Ressource(nom="Base de Données", semestre_id=s1.id),
        Ressource(nom="JavaScript Avancé", semestre_id=s2.id),
        Ressource(nom="Architecture Logiciel", semestre_id=s2.id),
    ]
    
    # Créer 2 SAE par semestre
    saes = [
        Sae(nom="SAE 1.01 - Site Web", semestre_id=s1.id),
        Sae(nom="SAE 1.02 - Application Mobile", semestre_id=s1.id),
        Sae(nom="SAE 2.01 - API REST", semestre_id=s2.id),
        Sae(nom="SAE 2.02 - DevOps", semestre_id=s2.id),
    ]
    
    for ressource in ressources:
        db.session.add(ressource)
    
    for sae in saes:
        db.session.add(sae)
    
    db.session.commit()
    
    print(" Données de base créées !")
    print(f" Semestres: {len([s1, s2])}")
    print(f" Ressources: {len(ressources)}")
    print(f" SAE: {len(saes)}")

def reset_database():
    """Remet à zéro la base de données"""
    db.drop_all()
    db.create_all()
    create_seed_data()
    print(" Base de données réinitialisée !")

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        # Choix : créer ou reset
        choice = input("Voulez-vous (c)réer ou (r)eset la DB ? [c/r]: ")
        
        if choice.lower() == 'r':
            reset_database()
        else:
            create_seed_data()
