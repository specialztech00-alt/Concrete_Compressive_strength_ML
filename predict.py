import pickle
import json
import os

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and preprocessing info
with open(os.path.join(BASE_DIR, 'gradient_boost_model.pkl'), 'rb') as f:
    model = pickle.load(f)

with open(os.path.join(BASE_DIR, 'preprocessing_info.json'), 'r') as f:
    prep = json.load(f)

def predict_strength(cement_brand, mix_ratio, water_cement_ratio, curing_method, curing_age):
    """
    Predict compressive strength of sandcrete blocks.

    Parameters:
    - cement_brand: 'Dangote', 'Lafarge', 'BUA', 'PureChem'
    - mix_ratio: '1:5', '1:6', '1:7', '1:8', '1:9', '1:10'
    - water_cement_ratio: 0.50, 0.55, 0.60, 0.65
    - curing_method: 'Open Air', 'Sprinkling', 'Submerged'
    - curing_age: 7, 14, 28

    Returns:
    - dict with predicted_strength (MPa), category, recommendation
    """
    curing_map_ui_to_code = {
        'open air': 'air',
        'sprinkling': 'sprinkling', 
        'submerged': 'submerged'
    }

    cement_encoded = prep['cement_ranking'][cement_brand]
    curing_key = curing_map_ui_to_code.get(curing_method.lower(), curing_method.lower())
    curing_encoded = prep['curing_ranking'][curing_key]
    mix_numeric = prep['mix_ratio_map'][mix_ratio]

    features = [[curing_age, water_cement_ratio, mix_numeric, cement_encoded, curing_encoded]]
    prediction = model.predict(features)[0]

    if prediction >= 3.5:
        category = "High Strength"
        recommendation = (
            "The predicted strength is excellent for load-bearing walls. "
            "Blocks can be safely used for structural applications. "
            "Ensure standard quality control during production."
        )
    elif prediction >= 2.0:
        category = "Moderate Strength"
        recommendation = (
            "The predicted strength is acceptable, but monitor production quality. "
            "Adjust mix ratio, water-cement ratio, or curing if needed for consistency."
        )
    else:
        category = "Low Strength"
        recommendation = (
            "The predicted strength is below recommended standards. "
            "Consider increasing cement content, optimizing water-cement ratio, "
            "or improving curing methods to enhance block performance."
        )

    return {
        'predicted_strength': round(float(prediction), 4),
        'category': category,
        'recommendation': recommendation
    }


if __name__ == '__main__':
    # Quick test
    result = predict_strength('Dangote', '1:5', 0.50, 'Submerged', 28)
    print(f"Test prediction: {result}")
