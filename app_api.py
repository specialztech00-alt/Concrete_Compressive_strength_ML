"""
BlockPredict ML - Flask Backend API
====================================
Run this script to start the prediction API server locally.

Prerequisites:
  pip install flask flask-cors scikit-learn pandas numpy

Usage:
  python app_api.py

The API will be available at http://localhost:5000
"""

import pickle
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests for the React frontend

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and preprocessing info
print("Loading model...")
with open(os.path.join(BASE_DIR, 'gradient_boost_model.pkl'), 'rb') as f:
    model = pickle.load(f)

with open(os.path.join(BASE_DIR, 'preprocessing_info.json'), 'r') as f:
    prep = json.load(f)

print("Model loaded successfully!")


def predict_strength(cement_brand, mix_ratio, water_cement_ratio, curing_method, curing_age):
    """Predict compressive strength using the trained Gradient Boosting model."""
    curing_map_ui_to_code = {
        'open air': 'air',
        'sprinkling': 'sprinkling',
        'submerged': 'submerged'
    }

    cement_encoded = prep['cement_ranking'][cement_brand]
    curing_key = curing_map_ui_to_code.get(curing_method.lower(), curing_method.lower())
    curing_encoded = prep['curing_ranking'][curing_key]
    mix_numeric = prep['mix_ratio_map'][mix_ratio]

    # Feature order: CuringAge, WaterCementRatio, MixRatioNumeric, CementBrandEncoded, CuringTechniqueEncoded
    features = [[curing_age, water_cement_ratio, mix_numeric, cement_encoded, curing_encoded]]
    prediction = model.predict(features)[0]

    if prediction >= 3.5:
        category = "High Strength"
        recommendation = (
            "The predicted strength is excellent for load-bearing walls. "
            "Blocks can be safely used for structural applications including "
            "multi-story buildings, foundations, and retaining walls. Ensure "
            "standard quality control during production per NIS 87:2000 and "
            "BS 6073 requirements."
        )
    elif prediction >= 2.0:
        category = "Moderate Strength"
        recommendation = (
            "The predicted strength is acceptable for non-load-bearing partitions "
            "and light structural use. Monitor production quality closely. Consider "
            "adjusting mix ratio toward 1:5, reducing water-cement ratio, or switching "
            "to submerged curing for improved consistency per ASTM C90 guidance."
        )
    else:
        category = "Low Strength"
        recommendation = (
            "The predicted strength is below recommended standards for structural "
            "applications. Consider: (1) increasing cement content with a richer mix "
            "ratio (1:5 or 1:6), (2) optimizing water-cement ratio to 0.50 or 0.55, "
            "(3) improving curing to submerged method, (4) switching to higher-performance "
            "cement brand, or (5) extending curing age to 28 days minimum."
        )

    return {
        'predicted_strength': round(float(prediction), 4),
        'category': category,
        'recommendation': recommendation
    }


@app.route('/')
def index():
    return jsonify({
        'service': 'BlockPredict ML API',
        'version': '1.0.0',
        'model': 'Gradient Boosting Regressor',
        'metrics': {
            'R2': 0.9994,
            'RMSE': 0.0527,
            'MAE': 0.0389,
            'MAPE': '1.55%'
        }
    })


@app.route('/api/predict', methods=['POST'])
def api_predict():
    """API endpoint for strength prediction."""
    try:
        data = request.get_json()

        # Validate required fields
        required = ['cement_brand', 'mix_ratio', 'water_cement_ratio', 'curing_method', 'curing_age']
        for field in required:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        result = predict_strength(
            cement_brand=data['cement_brand'],
            mix_ratio=data['mix_ratio'],
            water_cement_ratio=float(data['water_cement_ratio']),
            curing_method=data['curing_method'],
            curing_age=int(data['curing_age'])
        )

        return jsonify({
            'success': True,
            'inputs': {
                'cement_brand': data['cement_brand'],
                'mix_ratio': data['mix_ratio'],
                'water_cement_ratio': data['water_cement_ratio'],
                'curing_method': data['curing_method'],
                'curing_age': data['curing_age']
            },
            'prediction': result
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/features', methods=['GET'])
def api_features():
    """Get feature importance data."""
    importances = model.feature_importances_
    features = prep['feature_order']
    return jsonify({
        'feature_importance': [
            {'feature': f, 'importance': round(float(i), 4)}
            for f, i in zip(features, importances)
        ]
    })


if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("  BlockPredict ML API Server")
    print("=" * 60)
    print("  API Endpoint: http://localhost:5000/api/predict")
    print("  Test page:    http://localhost:5000/")
    print("=" * 60 + "\n")
    app.run(debug=True, host='0.0.0.0', port=5000)
