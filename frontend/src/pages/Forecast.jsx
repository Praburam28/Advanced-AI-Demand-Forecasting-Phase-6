import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Brain,
  PlayCircle,
  TrendingUp,
  Database,
  FolderKanban,
  SlidersHorizontal,
  Sparkles,
  Rocket,
  Target,
  Wallet,
  BarChart3,
  Activity,
  Layers,
} from "lucide-react";

import StatCard from "../components/StatCard";

const models = [
  {
    name: "Linear Regression",
    description: "Fast baseline forecasting model",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Random Forest",
    description: "Strong ensemble model for demand forecasting",
    gradient: "from-violet-600 to-fuchsia-600",
  },
  {
    name: "Gradient Boosting",
    description: "Advanced boosting model for accuracy",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Moving Average",
    description: "Simple trend smoothing model",
    gradient: "from-orange-500 to-rose-500",
  },
  {
    name: "XGBoost",
    description: "High-performance ML forecasting model",
    gradient: "from-indigo-600 to-blue-600",
  },
];

const Forecast = () => {
  const [datasets, setDatasets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  const [form, setForm] = useState({
    dataset_id: "",
    project_id: "",
    scenario_id: "",
    model_name: "Random Forest",
    forecast_period: 30,
  });

  const fetchData = async () => {
    const datasetRes = await API.get("/datasets/");
    const projectRes = await API.get("/workspaces/");
    const scenarioRes = await API.get("/scenarios/");
    const forecastRes = await API.get("/forecasts/");

    setDatasets(datasetRes.data);
    setProjects(projectRes.data);
    setScenarios(scenarioRes.data);
    setForecasts(forecastRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateForecast = async (e) => {
    e.preventDefault();

    if (!form.dataset_id) {
      alert("Please select a dataset");
      return;
    }

    await API.post("/forecasts/generate", {
      dataset_id: Number(form.dataset_id),
      project_id: form.project_id ? Number(form.project_id) : null,
      scenario_id: form.scenario_id ? Number(form.scenario_id) : null,
      model_name: form.model_name,
      forecast_period: Number(form.forecast_period),
    });

    alert("Forecast generated successfully");
    fetchData();
  };

  const latestForecast = forecasts[0];

  const selectedModel =
    models.find((model) => model.name === form.model_name) || models[1];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan-600 via-blue-700 to-violet-700 p-8 text-white shadow-2xl shadow-blue-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Brain size={16} />
              Machine Learning Forecast Engine
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Generate Smart Demand Forecasts
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Select your dataset, project, scenario and ML model to generate
              demand, revenue, profit, cost and accuracy forecasts.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={generateForecast}
                className="bg-white text-blue-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                <PlayCircle size={18} />
                Generate Forecast
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View History
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Selected Model</p>
                  <h2 className="text-4xl font-black mt-2">
                    {form.model_name}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Datasets</p>
                  <p className="font-black mt-1">{datasets.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Forecasts</p>
                  <p className="font-black mt-1">{forecasts.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Period</p>
                  <p className="font-black mt-1">{form.forecast_period}d</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={generateForecast} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
            <Sparkles size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Forecast Configuration
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose data source, workspace, scenario and model to generate predictions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={form.dataset_id}
            onChange={(e) => setForm({ ...form, dataset_id: e.target.value })}
            className="input"
          >
            <option value="">Select Dataset</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>

          <select
            value={form.project_id}
            onChange={(e) => setForm({ ...form, project_id: e.target.value })}
            className="input"
          >
            <option value="">No Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={form.scenario_id}
            onChange={(e) => setForm({ ...form, scenario_id: e.target.value })}
            className="input"
          >
            <option value="">No Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={form.forecast_period}
            onChange={(e) =>
              setForm({ ...form, forecast_period: e.target.value })
            }
            placeholder="Forecast period"
            className="input"
          />

          <button className="btn-primary flex items-center justify-center gap-2">
            <PlayCircle size={18} />
            Generate
          </button>
        </div>
      </form>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selectedModel.gradient} text-white flex items-center justify-center`}>
            <Brain size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Choose Forecasting Model
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select the algorithm used for demand prediction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {models.map((model) => (
            <button
              type="button"
              key={model.name}
              onClick={() => setForm({ ...form, model_name: model.name })}
              className={`text-left rounded-3xl p-5 border transition-all ${
                form.model_name === model.name
                  ? `bg-gradient-to-br ${model.gradient} text-white border-transparent shadow-xl scale-[1.02]`
                  : "bg-white/70 dark:bg-slate-800/70 border-white dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:scale-[1.02]"
              }`}
            >
              <Brain size={26} />
              <h4 className="font-black mt-4">{model.name}</h4>
              <p
                className={`text-xs mt-2 ${
                  form.model_name === model.name
                    ? "text-white/75"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {model.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {latestForecast && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <StatCard
            title="Model"
            value={latestForecast.model_name}
            subtitle="Latest algorithm used"
            icon={Brain}
            gradient="from-violet-600 to-fuchsia-600"
          />

          <StatCard
            title="Predicted Demand"
            value={latestForecast.predicted_demand}
            subtitle="Forecasted demand volume"
            icon={TrendingUp}
            gradient="from-emerald-500 to-cyan-500"
          />

          <StatCard
            title="Revenue"
            value={`₹${latestForecast.revenue_forecast}`}
            subtitle="Forecasted revenue"
            icon={Wallet}
            gradient="from-orange-500 to-rose-500"
          />

          <StatCard
            title="Accuracy"
            value={`${Math.round(100 - latestForecast.mape)}%`}
            subtitle="Based on MAPE"
            icon={Target}
            gradient="from-blue-500 to-indigo-600"
          />
        </div>
      )}

      {latestForecast && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
            <TrendingUp size={32} />
            <h3 className="font-black text-xl mt-4">Profit Forecast</h3>
            <p className="text-3xl font-black mt-2">
              ₹{latestForecast.profit_forecast}
            </p>
            <p className="text-sm text-white/75 mt-2">
              Expected profit after estimated cost
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
            <Wallet size={32} />
            <h3 className="font-black text-xl mt-4">Cost Forecast</h3>
            <p className="text-3xl font-black mt-2">
              ₹{latestForecast.cost_forecast}
            </p>
            <p className="text-sm text-white/75 mt-2">
              Estimated operational cost
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
            <BarChart3 size={32} />
            <h3 className="font-black text-xl mt-4">Model Error</h3>
            <p className="text-3xl font-black mt-2">
              {latestForecast.mape}%
            </p>
            <p className="text-sm text-white/75 mt-2">
              MAPE score, lower is better
            </p>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Forecast History
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review generated forecasts, accuracy and financial projections.
            </p>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
            <Layers size={22} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="text-left p-4">Model</th>
                <th className="text-left p-4">Demand</th>
                <th className="text-left p-4">Revenue</th>
                <th className="text-left p-4">Profit</th>
                <th className="text-left p-4">MAPE</th>
                <th className="text-left p-4">R2</th>
              </tr>
            </thead>

            <tbody>
              {forecasts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-slate-500 dark:text-slate-400">
                    No forecasts generated yet.
                  </td>
                </tr>
              ) : (
                forecasts.map((forecast) => (
                  <tr
                    key={forecast.id}
                    className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
                          <Brain size={18} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {forecast.model_name}
                          </p>
                          <p className="text-xs text-slate-400">
                            Forecast #{forecast.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">
                      {forecast.predicted_demand}
                    </td>

                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-300">
                      ₹{forecast.revenue_forecast}
                    </td>

                    <td className="p-4 font-bold text-violet-600 dark:text-violet-300">
                      ₹{forecast.profit_forecast}
                    </td>

                    <td className="p-4">
                      <span className="badge bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                        {forecast.mape}%
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="badge bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
                        {forecast.r2_score}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white shadow-xl">
          <Database size={32} />
          <h3 className="font-black text-xl mt-4">Dataset Powered</h3>
          <p className="text-sm text-white/75 mt-2">
            Forecasts are generated directly from uploaded CSV/Excel datasets.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <FolderKanban size={32} />
          <h3 className="font-black text-xl mt-4">Workspace Linked</h3>
          <p className="text-sm text-white/75 mt-2">
            Forecasts can be attached to projects for tracking and reports.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <SlidersHorizontal size={32} />
          <h3 className="font-black text-xl mt-4">Scenario Ready</h3>
          <p className="text-sm text-white/75 mt-2">
            Apply what-if scenarios to compare different demand outcomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;