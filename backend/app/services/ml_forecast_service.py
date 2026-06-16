import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression


def train_forecast_model(file_path: str, model_name: str = "Random Forest"):
    if file_path.endswith(".xlsx"):
        df = pd.read_excel(file_path)
    else:
        df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip().str.lower()

    # Map enterprise dataset columns
    if "product_name" in df.columns and "product" not in df.columns:
        df["product"] = df["product_name"]

    if "product_category" in df.columns and "category" not in df.columns:
        df["category"] = df["product_category"]

    if "units_sold" not in df.columns and "demand" in df.columns:
        df["units_sold"] = df["demand"]

    if "unit_price" not in df.columns:
        if "revenue" in df.columns and "units_sold" in df.columns:
            df["unit_price"] = df["revenue"] / df["units_sold"].replace(0, 1)

    required_columns = [
        "date",
        "product",
        "category",
        "region",
        "units_sold",
        "unit_price",
        "revenue",
        "cost",
        "profit",
    ]

    missing = [col for col in required_columns if col not in df.columns]

    if missing:
        raise ValueError(f"Missing required columns: {', '.join(missing)}")

    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df = df.dropna(subset=["date"])

    if len(df) < 10:
        raise ValueError("Dataset must contain at least 10 valid rows")

    df["day"] = df["date"].dt.day
    df["month"] = df["date"].dt.month
    df["year"] = df["date"].dt.year

    target = "units_sold"

    categorical_cols = [
        col for col in [
            "organization",
            "product",
            "category",
            "region",
            "promotion",
            "holiday",
        ]
        if col in df.columns
    ]

    df = pd.get_dummies(
        df,
        columns=categorical_cols,
        drop_first=True
    )

    remove_cols = [
        "date",
        target,
        "product_name",
        "product_category",
    ]

    feature_cols = [
        col for col in df.columns
        if col not in remove_cols
    ]

    X = df[feature_cols]
    y = df[target]

    # Final safety: keep numeric columns only
    X = X.select_dtypes(include=[np.number, "bool"])
    X = X.fillna(0)
    y = y.fillna(0)

    if X.empty:
        raise ValueError("No valid numeric features available for training")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    if model_name == "Linear Regression":
        model = LinearRegression()
    elif model_name == "Gradient Boosting":
        model = GradientBoostingRegressor(random_state=42)
    else:
        model = RandomForestRegressor(
            n_estimators=100,
            random_state=42
        )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)

    mape = np.mean(
        np.abs(
            (y_test - predictions) /
            np.where(y_test == 0, 1, y_test)
        )
    ) * 100

    r2 = r2_score(y_test, predictions)

    predicted_demand = float(np.sum(predictions))

    avg_unit_price = float(df["unit_price"].mean())
    total_revenue = float(df["revenue"].sum())
    total_cost = float(df["cost"].sum())

    avg_cost_ratio = total_cost / total_revenue if total_revenue > 0 else 0.75

    revenue_forecast = predicted_demand * avg_unit_price
    cost_forecast = revenue_forecast * avg_cost_ratio
    profit_forecast = revenue_forecast - cost_forecast

    accuracy_score = max(0, 100 - mape)

    return {
        "predicted_demand": round(predicted_demand, 2),
        "revenue_forecast": round(revenue_forecast, 2),
        "cost_forecast": round(cost_forecast, 2),
        "profit_forecast": round(profit_forecast, 2),
        "mae": round(float(mae), 2),
        "mse": round(float(mse), 2),
        "rmse": round(float(rmse), 2),
        "mape": round(float(mape), 2),
        "r2_score": round(float(r2), 2),
        "accuracy_score": round(float(accuracy_score), 2),
    }