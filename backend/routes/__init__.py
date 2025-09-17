from flask import Blueprint

#Blueprint principal
planning_bp = Blueprint('planning', __name__)
semestre_bp = Blueprint('semestre', __name__)
ressource_bp = Blueprint('ressource', __name__)
sae_bp = Blueprint('sae', __name__)

from . import planning_routes