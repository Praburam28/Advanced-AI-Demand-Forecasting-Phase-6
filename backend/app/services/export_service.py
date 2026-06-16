import os
import pandas as pd
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

EXPORT_DIR = "app/exports"


def ensure_export_dir():
    os.makedirs(EXPORT_DIR, exist_ok=True)


def generate_forecast_pdf(report_title: str, forecast):
    ensure_export_dir()

    file_name = f"forecast_report_{forecast.id}.pdf"
    file_path = os.path.join(EXPORT_DIR, file_name)

    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    y = height - 50

    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, report_title)

    y -= 40
    c.setFont("Helvetica", 11)

    lines = [
        f"Forecast ID: {forecast.id}",
        f"Model Name: {forecast.model_name}",
        f"Forecast Period: {forecast.forecast_period} days",
        f"Predicted Demand: {forecast.predicted_demand}",
        f"Revenue Forecast: Rs. {forecast.revenue_forecast}",
        f"Cost Forecast: Rs. {forecast.cost_forecast}",
        f"Profit Forecast: Rs. {forecast.profit_forecast}",
        f"MAE: {forecast.mae}",
        f"MSE: {forecast.mse}",
        f"RMSE: {forecast.rmse}",
        f"MAPE: {forecast.mape}%",
        f"R2 Score: {forecast.r2_score}",
        f"AI Summary: {forecast.ai_summary}",
        f"Recommendation: {forecast.recommendation}",
    ]

    for line in lines:
        c.drawString(50, y, str(line))
        y -= 22

    c.save()

    return file_path


def generate_forecast_excel(report_title: str, forecast):
    ensure_export_dir()

    file_name = f"forecast_report_{forecast.id}.xlsx"
    file_path = os.path.join(EXPORT_DIR, file_name)

    data = {
        "Metric": [
            "Report Title",
            "Forecast ID",
            "Model Name",
            "Forecast Period",
            "Predicted Demand",
            "Revenue Forecast",
            "Cost Forecast",
            "Profit Forecast",
            "MAE",
            "MSE",
            "RMSE",
            "MAPE",
            "R2 Score",
            "AI Summary",
            "Recommendation",
        ],
        "Value": [
            report_title,
            forecast.id,
            forecast.model_name,
            forecast.forecast_period,
            forecast.predicted_demand,
            forecast.revenue_forecast,
            forecast.cost_forecast,
            forecast.profit_forecast,
            forecast.mae,
            forecast.mse,
            forecast.rmse,
            forecast.mape,
            forecast.r2_score,
            forecast.ai_summary,
            forecast.recommendation,
        ],
    }

    df = pd.DataFrame(data)
    df.to_excel(file_path, index=False)

    return file_path