from flask import request, jsonify
from data.database import db
from routes import sae_bp

# Get toutes les sae
@sae_bp.route('/saes', methods=['GET'])
def get_saes():
    """All saes"""
    from models.models import Sae
    saes = Sae.query.all()
    result = [
        {
            'id': sae.id,
            'nom': sae.nom,
            'semestre_id': sae.semestre_id,
        } for sae in saes
    ]
    return jsonify(result), 200

#Get une sae par son ID
@sae_bp.route('/saes/<int:sae_id>', methods=['GET'])
def get_saes_by_id(sae_id):
    """ Get SAE ID"""
    from models.models import Sae
    sae = Sae.query.get(sae_id)
    
    # valide que sae existe
    if not sae:
        return jsonify({"Error": "Sae non trouvé"}), 404
    
    result = {
        'id': sae.id,
        'nom': sae.nom,
        'semestre_id': sae.semestre_id,
    }
    
    return jsonify(result),200

# Post une nouvelle sae
@sae_bp.route('/saes', methods=['POST'])
def create_sae():
    """post créer une sae"""
    from models.models import Sae
    data = request.get_json()
    nom = data.get('nom')
    semestre_id = data.get('semestre_id')
    
    if not nom or not semestre_id:
        return jsonify({"Error" : "Nom requis"}),400
    
    NvSae = Sae(nom=nom, semestre_id=semestre_id)
    db.session.add(NvSae)
    db.session.commit()
    
    return jsonify({
        "id": NvSae.id,
        "nom": NvSae.nom,
        "semestre_id": NvSae.semestre_id,          
    }),200
    
# met à jour une sae par son ID
@sae_bp.route('/saes/<int:sae_id>', methods=['PUT'])
def update_sae(sae_id):
    """Update Sae"""
    from models.models import Sae
    sae = Sae.query.get(sae_id)
    if not sae:
        return jsonify({"Error":"Pas de Sae à cette id"}),404
    data = request.get_json()
    # on verif direct dans la routes moins de backend objectif focus le react
    if not data :
        return jsonify({"Error":"Pas de data"}),400
    # garde les anciennes valeurs en les mettant par défaut si pas modifié 
    sae.nom = data.get('nom',sae.nom)
    sae.semestre_id = data.get('semestre_id',sae.nom)
    
    db.session.commit()
    
    return jsonify ({
        'id': sae.id,
        'nom' : sae.nom,
        'semestre_id' : sae.semestre_id,
    }),200
    
# Route qui me permet de del une ressource en fonction de sont ID
@sae_bp.route('/saes/<int:sae_id>', methods=['DELETE'])
def delete_sae(sae_id):
    """Delete SAE"""
    from models.models import Sae
    sae = Sae.query.get(sae_id)
    
    if not sae:
        return jsonify({"Error": "pas trouve de sae à cette id"}),400
    
    db.session.delete(sae)
    db.session.commit()
    
    return jsonify({
        "Message" : "Sae à bien été supprimé ! "
    }),200