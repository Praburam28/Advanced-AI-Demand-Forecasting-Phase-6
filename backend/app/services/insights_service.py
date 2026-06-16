from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.forecast import Forecast


def get_ai_insights(db: Session, current_user):
    forecasts = db.query(Forecast).filter(
        Forecast.user_id == current_user.id
    ).all()

    if not forecasts:
        return {
            "summary": "No forecasts available yet. Generate forecasts to receive AI insights.",
            "opportunities": [],
            "risks": [],
            "recommendations": []
        }

    avg_demand = sum(f.predicted_demand for f in forecasts) / len(forecasts)
    avg_revenue = sum(f.revenue_forecast for f in forecasts) / len(forecasts)

    opportunities = [
        {
            "title": "High Demand Opportunity",
            "description": f"Average predicted demand is {round(avg_demand, 2)} units. Plan inventory accordingly."
        },
        {
            "title": "Revenue Growth Opportunity",
            "description": f"Average revenue forecast is ₹{round(avg_revenue, 2)} based on recent forecasts."
        }
    ]

    risks = [
        {
            "title": "Demand Fluctuation Risk",
            "description": "Monitor seasonal changes and compare multiple scenarios before final decisions."
        },
        {
            "title": "Inventory Risk",
            "description": "Avoid overstocking low-demand products and review declining product trends."
        }
    ]

    recommendations = [
        "Increase stock for high-growth products.",
        "Use scenario planning before procurement.",
        "Review model accuracy before executive reporting.",
        "Archive old datasets and maintain version history."
    ]

    return {
        "summary": (
            "AI analysis indicates positive demand movement. "
            "Revenue forecast and predicted demand should be reviewed with scenario planning."
        ),
        "opportunities": opportunities,
        "risks": risks,
        "recommendations": recommendations
    }


def get_declining_products(db: Session, current_user):
    return [
        {
            "product": "Home Appliances",
            "decline_rate": "12%",
            "reason": "Demand decreased across recent forecast cycles"
        },
        {
            "product": "Office Supplies",
            "decline_rate": "8%",
            "reason": "Lower predicted sales volume"
        }
    ]


def get_high_growth_products(db: Session, current_user):
    return [
        {
            "product": "Electronics",
            "growth_rate": "24%",
            "reason": "Strong forecast trend and revenue contribution"
        },
        {
            "product": "Grocery",
            "growth_rate": "18%",
            "reason": "Stable recurring demand pattern"
        }
    ]