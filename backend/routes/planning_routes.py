from flask import request, jsonify
from data.database import db  
from routes import planning_bp
from datetime import time

#  GET : Récupérer le planning d'un semestre
@planning_bp.route('/planning/semestre/<int:semestre_id>', methods=['GET'])
def get_planning_by_semestre(semestre_id):
    """Récupère tous les créneaux de planning d'un semestre"""
    from models.models import Planning
    
    try:
        plannings = Planning.query.filter_by(semestre_id=semestre_id).all()
        
        result = []
        for planning in plannings:
            result.append({
                'id': planning.id,
                'jour_semaine': planning.jour_semaine,
                'heure_debut': planning.heure_debut.strftime('%H:%M') if planning.heure_debut else None,
                'heure_fin': planning.heure_fin.strftime('%H:%M') if planning.heure_fin else None,
                'salle': planning.salle,
                'semestre_id': planning.semestre_id,
                'ressource_id': planning.ressource_id,
                'sae_id': planning.sae_id,
                # Relations avec les cours
                'ressource': {
                    'id': planning.ressource.id,
                    'nom': planning.ressource.nom,
                    'type': 'ressource'
                } if planning.ressource else None,
                'sae': {
                    'id': planning.sae.id,
                    'nom': planning.sae.nom,
                    'type': 'sae'
                } if planning.sae else None,
                # Propriétés utiles
                'activite_nom': planning.activite_nom,
                'activite_type': planning.activite_type
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f" Erreur get_planning_by_semestre: {e}")
        return jsonify({'error': str(e)}), 500

# POST : Créer un nouveau créneau de planning
@planning_bp.route('/planning', methods=['POST'])
def create_planning():
    """Créé un nouveau créneau dans le planning"""
    from models.models import Planning
    
    try:
        data = request.get_json()
        print(f"Données reçues pour créer planning: {data}")
        
        # Validation des données obligatoires
        required_fields = ['jour_semaine', 'heure_debut', 'heure_fin', 'salle', 'semestre_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est requis'}), 400
        
        # Conversion des heures string vers time object
        try:
            heure_debut = time.fromisoformat(data['heure_debut'])
            heure_fin = time.fromisoformat(data['heure_fin'])
        except ValueError:
            return jsonify({'error': 'Format d\'heure invalide. Utilisez HH:MM'}), 400
        
        # Au moins une ressource ou Sae doit être spécifiée
        if not data.get('ressource_id') and not data.get('sae_id'):
            return jsonify({'error': 'Une ressource ou une SAE doit être spécifiée'}), 400
        
        nouveau_planning = Planning(
            semestre_id=data['semestre_id'],
            jour_semaine=data['jour_semaine'],
            heure_debut=heure_debut,
            heure_fin=heure_fin,
            salle=data['salle'],
            ressource_id=data.get('ressource_id'),
            sae_id=data.get('sae_id')
        )
        
        db.session.add(nouveau_planning)
        db.session.commit()
        
        print(f"Planning créé avec ID: {nouveau_planning.id}")
        
        return jsonify({
            'message': 'Planning créé avec succès',
            'id': nouveau_planning.id,
            'planning': {
                'id': nouveau_planning.id,
                'jour_semaine': nouveau_planning.jour_semaine,
                'heure_debut': nouveau_planning.heure_debut.strftime('%H:%M'),
                'heure_fin': nouveau_planning.heure_fin.strftime('%H:%M'),
                'salle': nouveau_planning.salle,
                'semestre_id': nouveau_planning.semestre_id,
                'ressource_id': nouveau_planning.ressource_id,
                'sae_id': nouveau_planning.sae_id,
                'activite_nom': nouveau_planning.activite_nom,
                'activite_type': nouveau_planning.activite_type
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f" Erreur création planning: {e}")
        return jsonify({'error': str(e)}), 500

#  PUT : Modifier un créneau de planning
@planning_bp.route('/planning/<int:planning_id>', methods=['PUT'])  
def update_planning(planning_id):
    """Met à jour un créneau de planning par son ID"""
    from models.models import Planning
    
    try:
        planning = Planning.query.get(planning_id)
        if not planning:
            return jsonify({'error': 'Planning non trouvé'}), 404
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Données invalides'}), 400
        
        # Mettre à jour les champs si fournis
        if 'jour_semaine' in data:
            planning.jour_semaine = data['jour_semaine']
        
        if 'heure_debut' in data:
            try:
                planning.heure_debut = time.fromisoformat(data['heure_debut'])
            except ValueError:
                return jsonify({'error': 'Format d\'heure_debut invalide'}), 400
        
        if 'heure_fin' in data:
            try:
                planning.heure_fin = time.fromisoformat(data['heure_fin'])
            except ValueError:
                return jsonify({'error': 'Format d\'heure_fin invalide'}), 400
        
        if 'salle' in data:
            planning.salle = data['salle']
        
        if 'ressource_id' in data:
            planning.ressource_id = data['ressource_id']
        
        if 'sae_id' in data:
            planning.sae_id = data['sae_id']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Planning mis à jour avec succès',
            'planning': {
                'id': planning.id,
                'jour_semaine': planning.jour_semaine,
                'heure_debut': planning.heure_debut.strftime('%H:%M'),
                'heure_fin': planning.heure_fin.strftime('%H:%M'),
                'salle': planning.salle,
                'ressource_id': planning.ressource_id,
                'sae_id': planning.sae_id,
                'activite_nom': planning.activite_nom,
                'activite_type': planning.activite_type
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

#  DELETE : Supprimer un créneau de planning  
@planning_bp.route('/planning/<int:planning_id>', methods=['DELETE'])
def delete_planning(planning_id):
    """Supprime un créneau de planning par son ID"""
    from models.models import Planning
    
    try:
        planning = Planning.query.get(planning_id)
        if not planning:
            return jsonify({'error': 'Planning non trouvé'}), 404
        
        db.session.delete(planning)
        db.session.commit()
        
        return jsonify({'message': 'Planning supprimé avec succès'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

#  GET : Récupérer un planning spécifique par ID
@planning_bp.route('/planning/<int:planning_id>', methods=['GET'])
def get_planning(planning_id):
    """Récupère un créneau de planning par son ID"""
    from models.models import Planning
    
    try:
        planning = Planning.query.get(planning_id)
        if not planning:
            return jsonify({'error': 'Planning non trouvé'}), 404
        
        result = {
            'id': planning.id,
            'jour_semaine': planning.jour_semaine,
            'heure_debut': planning.heure_debut.strftime('%H:%M'),
            'heure_fin': planning.heure_fin.strftime('%H:%M'),
            'salle': planning.salle,
            'semestre_id': planning.semestre_id,
            'ressource_id': planning.ressource_id,
            'sae_id': planning.sae_id,
            'ressource': planning.ressource.to_dict() if planning.ressource else None,
            'sae': planning.sae.to_dict() if planning.sae else None,
            'activite_nom': planning.activite_nom,
            'activite_type': planning.activite_type
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Erreur get_planning: {e}")
        return jsonify({'error': str(e)}), 500
