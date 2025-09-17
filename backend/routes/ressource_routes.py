from flask import request, jsonify
from data.database import db
from routes import ressource_bp

# Get toutes les ressources
@ressource_bp.route("/ressources", methods=['GET'])
def get_ressource():
    from models.models import Ressource
    ressources = Ressource.query.all()
    result = [
        {
            'id': ressource.id,
            'nom': ressource.nom,
            'semestre_id': ressource.semestre_id,
        } for ressource in ressources
    ]
    return jsonify(result), 200

# Get une ressource par son ID
@ressource_bp.route("/ressources/<int:ressource_id>", methods=['GET'])
def get_ressource_by_id(ressource_id):
    from models.models import Ressource
    ressource = Ressource.query.get(ressource_id)
    
    if not ressource:
        return jsonify({"error": "Ressource non trouvée"}), 404
    result = {
        'id': ressource.id,
        'nom': ressource.nom,
        'semestre_id': ressource.semestre_id,
    }
    return jsonify(result), 200

# Post une nouvelle ressource
@ressource_bp.route("/ressources", methods=['POST'])
def create_ressource():
    from models.models import Ressource
    data = request.get_json()
    
    if not data :
        return jsonify({'Error': 'Pas de data'}),400
    
    nom = data.get("nom")
    semestre_id= data.get("semestre_id")
    
    if not nom or not semestre_id:
        return jsonify({"Error": " données requise pour créer ressource"}),400
    
    NvRessource = Ressource(nom=nom, semestre_id=semestre_id)
    
    db.session.add(NvRessource)
    db.session.commit()
    
    return jsonify({
        "id": NvRessource.id,
        "nom": NvRessource.nom,
        "semestre_id": NvRessource.semestre_id,          
    }),201

# Met à jour une ressource par son ID 
@ressource_bp.route('/ressources/<int:ressource_id>', methods=['PUT'])
def update_ressource(ressource_id):
    from models.models import Ressource
    ressource = Ressource.query.get(ressource_id)
    
    if not ressource:
        return jsonify({"Error": "Ressource non trouvée"}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({"Error": "Données invalides"}), 400
    
    ressource.nom = data.get("nom", ressource.nom)
    ressource.semestre_id = data.get("semestre_id", ressource.semestre_id)
    
    db.session.commit()
    
    return jsonify({
        "id": ressource.id,
        "nom": ressource.nom,
        "semestre_id": ressource.semestre_id,          
    }),200
    

# Supprime une ressource par son ID  
@ressource_bp.route('/ressources/<int:ressource_id>', methods=['DELETE'])
def delete_ressource(ressource_id):
    from models.models import Ressource
    ressource = Ressource.query.get(ressource_id)
    
    if not ressource:
        return jsonify({"Error": "Ressource non trouvée"}), 404
    
    db.session.delete(ressource)
    db.session.commit()
    
    return jsonify({"message": "Ressource supprimée"}), 200