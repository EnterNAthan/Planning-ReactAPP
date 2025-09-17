
def test_get_semestres_empty(client):
    """Test récupération des semestres (liste vide)"""
    response = client.get('/api/semestres')  # ✅ Ajout /api
    assert response.status_code == 200
    data = response.get_json()
    assert data == []

def test_get_semestres_with_data(sample_semestre, client):
    """Test récupération des semestres avec données"""
    response = client.get('/api/semestres')  # ✅ Ajout /api
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]['nom'] == 'S1'
    assert data[0]['annee'] == '2024-2025'

def test_post_semestre(client):
    """Test création d'un nouveau semestre"""
    nouveau_semestre = {
        'nom': 'S2',
        'annee': '2024-2025'
    }
    
    response = client.post('/api/semestres',  # ✅ Ajout /api
    json=nouveau_semestre,
    content_type='application/json')
    
    assert response.status_code == 201
    data = response.get_json()
    assert data['nom'] == 'S2'
    assert data['annee'] == '2024-2025'
    assert 'id' in data


