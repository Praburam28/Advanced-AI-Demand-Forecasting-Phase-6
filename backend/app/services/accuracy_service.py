from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.model_accuracy import ModelAccuracy


def get_accuracy_dashboard(db: Session, current_user):
    records = db.query(ModelAccuracy).all()

    if not records:
        return {
            "best_model": None,
            "average_accuracy": 0,
            "average_mape": 0,
            "model_count": 0,
            "records": []
        }

    best = max(records, key=lambda item: item.accuracy_score)

    avg_accuracy = sum(item.accuracy_score for item in records) / len(records)
    avg_mape = sum(item.mape for item in records) / len(records)

    return {
        "best_model": best.model_name,
        "average_accuracy": round(avg_accuracy, 2),
        "average_mape": round(avg_mape, 2),
        "model_count": len(set(item.model_name for item in records)),
        "records": records
    }


def get_model_comparison(db: Session, current_user):
    records = db.query(ModelAccuracy).all()

    comparison = {}

    for item in records:
        if item.model_name not in comparison:
            comparison[item.model_name] = {
                "model_name": item.model_name,
                "accuracy_score": [],
                "mape": [],
                "rmse": []
            }

        comparison[item.model_name]["accuracy_score"].append(item.accuracy_score)
        comparison[item.model_name]["mape"].append(item.mape)
        comparison[item.model_name]["rmse"].append(item.rmse)

    result = []

    for model_name, values in comparison.items():
        result.append({
            "model_name": model_name,
            "average_accuracy": round(sum(values["accuracy_score"]) / len(values["accuracy_score"]), 2),
            "average_mape": round(sum(values["mape"]) / len(values["mape"]), 2),
            "average_rmse": round(sum(values["rmse"]) / len(values["rmse"]), 2),
        })

    return result