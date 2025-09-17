from flask import Flask, request, jsonify
from ..data.database import db
from ..routes.__init__ import semestre_bp

# Get tout les semestres
@semestre_bp.route('/semestres', methods=['GET'])
def get_semestres():
    """Récupére tous les semestres"""
    #Evite les import circulaire
    from ..models.models import Semestre
    semestres = Semestre.query.all()
    result = [
        {
            'id': semestre.id,
            'nom': semestre.nom,
            'annee': semestre.annee,
        } for semestre in semestres
    ]
    return jsonify(result), 200

# Get un semestre par son ID
@semestre_bp.route('/semestres/<int:semestre_id>', methods=['GET'])
def get_semestre(semestre_id):
    """Récupére un semestre par son ID"""
    from ..models.models import Semestre
    semestre = Semestre.query.get(semestre_id)
    
    # valide si le semestre existe (pas de validate en dehors pour l'instant)
    if not semestre:
        return jsonify({"error": "Semestre non trouvé"}), 404
    
    result = {
        'id': semestre.id,
        'nom': semestre.nom,
        'annee': semestre.annee,
    }
    return jsonify(result), 200


#get toutes les ressources du semestre ID
@semestre_bp.route('/semestres/<int:semestre_id>/ressources', methods=['GET'])
def get_ressources_by_semestre(semestre_id):
    """Récupere toutes les ressouce par semestres"""
    from ..models.models import Semestre
    semestre = Semestre.query.get(semestre_id)
    if not semestre:
        return jsonify({"error": "Semestre non trouvé"}), 404
    ressources = semestre.ressources
    result = [
        {
            'id': ressource.id,
            'nom': ressource.nom,
            'semestre_id': ressource.semestre_id
        } for ressource in ressources
    ]
    return jsonify(result), 200

# get toutes les sae du semestre ID
@semestre_bp.route('/semestres/<int:semestre_id>/saes', methods=['GET'])
def get_saes_by_semestre(semestre_id):
    """Récupere toutes les Sae par semestre """
    from ..models.models import Semestre
    semestre = Semestre.query.get(semestre_id)
    if not semestre:
        return jsonify({"Error" : "Semestre non Trouvé"})
    saes = semestre.saes
    result = [
        {
            'id': sae.id,
            'nom' : sae.nom,
            'semestre_id' : sae.semestre_id
        } for sae in saes
    ]
    return jsonify(result), 200

# Permet de créer un semestre
@semestre_bp.route('/semestres', methods=['POST'])
def create_semestre():
    """Créer un semestre"""
    from ..models.models import Semestre
    data = request.get_json()
    new_nom = data.get("nom")
    new_annee = data.get("annee")
    # verifie la donne (je fais pas de validate que j'importe pour l'instant je reste simple sur le backend)
    if not new_nom or not new_annee:
        return jsonify({"error":"Nom et Année sont requis"}), 400
    
    NvSemestre = Semestre(nom=new_nom, annee=new_annee)

    db.session.add(NvSemestre)
    db.session.commit()
    
    return jsonify({
        "id": NvSemestre.id,
        "nom": NvSemestre.nom,
        "annee": NvSemestre.annee
    }), 201

# met à jour un semestre par sont ID
@semestre_bp.route('/semestres/<int:semestre_id>', methods=['PUT'])
def update_semestre(semestre_id):
    """Met à jour un semestre par son ID"""
    from ..models.models import Semestre
    semestre = Semestre.query.get(semestre_id)
    
    # valide le semestre (pour l'instant je gére les verifs dans les routes pas de validate )
    if not semestre:
        return jsonify({"error": "Semestre non trouvé"}), 404
    
    data = request.get_json()
    
    # valide les données (pour l'instant je gére les verifs dans les routes pas de validate )
    if not data:
        return jsonify({"error": "Données invalides"}), 400
    
    semestre.nom = data.get("nom", semestre.nom)
    semestre.annee = data.get("annee", semestre.annee)
    
    db.session.commit()
    
    return jsonify({
        "id": semestre.id,
        "nom": semestre.nom,
        "annee": semestre.annee
    }), 200

# Supprime un semestre par son ID
@semestre_bp.route('/semestres/<int:semestre_id>', methods=['DELETE'])
def delete_semestre(semestre_id):
    """Supprime un semestre par son ID"""
    from ..models.models import Semestre
    semestre = Semestre.query.get(semestre_id)
    
    if not semestre:
        return jsonify({"error": "Semestre non trouvé"}), 404
    
    db.session.delete(semestre)
    db.session.commit()
    
    return jsonify({"message": "Semestre supprimé"}), 200

# Note: Pour l'instant pas de gestion des erreurs plus poussée, ni de validation des données.