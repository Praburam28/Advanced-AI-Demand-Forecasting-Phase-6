import { useEffect, useState } from "react";
import API from "../api/api";
import {
  SlidersHorizontal,
  Save,
  GitCompare,
  TrendingUp,
  Sparkles,
  Rocket,
  Target,
  BarChart3,
  Zap,
  Layers,
} from "lucide-react";

import StatCard from "../components/StatCard";

const ScenarioAnalysis = () => {
  const [projects, setProjects] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [comparison, setComparison] = useState([]);

  const [form, setForm] = useState({
    name: "",
    project_id: "",
    sales_growth: 10,
    seasonality: 15,
    demand_factor: 8,
    notes: "",
  });

  const fetchProjects = async () => {
    const res = await API.get("/workspaces/");
    setProjects(res.data);
  };

  const fetchScenarios = async () => {
    const res = await API.get("/scenarios/");
    setScenarios(res.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchScenarios();
  }, []);

  const createScenario = async (e) => {
    e.preventDefault();

    if (!form.name || !form.project_id) {
      alert("Scenario name and project are required");
      return;
    }

    await API.post("/scenarios/", {
      ...form,
      project_id: Number(form.project_id),
      sales_growth: Number(form.sales_growth),
      seasonality: Number(form.seasonality),
      demand_factor: Number(form.demand_factor),
    });

    alert("Scenario saved successfully");

    setForm({
      name: "",
      project_id: "",
      sales_growth: 10,
      seasonality: 15,
      demand_factor: 8,
      notes: "",
    });

    fetchScenarios();
  };

  const compareScenarios = async () => {
    if (!form.project_id) {
      alert("Select project first");
      return;
    }

    const res = await API.get(`/scenarios/compare/${form.project_id}`);
    setComparison(res.data.data || res.data);
  };

  const SliderBlock = ({ label, value, field, gradient }) => (
    <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {label}
        </p>

        <span className={`badge bg-gradient-to-r ${gradient} text-white`}>
          {value}%
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        className="w-full mt-5 accent-violet-600"
      />

      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-600 p-8 text-white shadow-2xl shadow-violet-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <SlidersHorizontal size={16} />
              Advanced What-If Planning
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Scenario Planning Studio
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Simulate sales growth, seasonality, and demand factors to compare
              multiple business outcomes before making forecasting decisions.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Create Scenario
              </button>

              <button
                type="button"
                onClick={compareScenarios}
                className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition"
              >
                Compare Now
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Saved Scenarios</p>
                  <h2 className="text-5xl font-black mt-2">
                    {scenarios.length}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Growth</p>
                  <p className="font-black mt-1">{form.sales_growth}%</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Season</p>
                  <p className="font-black mt-1">{form.seasonality}%</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Demand</p>
                  <p className="font-black mt-1">{form.demand_factor}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={createScenario} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
            <Sparkles size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Create What-If Scenario
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Adjust business variables and save scenarios for future forecasting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Scenario name"
            className="input"
          />

          <select
            value={form.project_id}
            onChange={(e) => setForm({ ...form, project_id: e.target.value })}
            className="input"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <input
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Scenario notes"
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <SliderBlock
            label="Sales Growth"
            value={form.sales_growth}
            field="sales_growth"
            gradient="from-emerald-500 to-cyan-500"
          />

          <SliderBlock
            label="Seasonality"
            value={form.seasonality}
            field="seasonality"
            gradient="from-orange-500 to-rose-500"
          />

          <SliderBlock
            label="Demand Factor"
            value={form.demand_factor}
            field="demand_factor"
            gradient="from-violet-600 to-fuchsia-600"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button className="btn-primary flex items-center gap-2">
            <Save size={18} />
            Save Scenario
          </button>

          <button
            type="button"
            onClick={compareScenarios}
            className="btn-secondary flex items-center gap-2"
          >
            <GitCompare size={18} />
            Compare Scenarios
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Saved Scenarios"
          value={scenarios.length}
          subtitle="Reusable planning cases"
          icon={SlidersHorizontal}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Scenario Reuse"
          value="Active"
          subtitle="Use scenarios for future plans"
          icon={TrendingUp}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Comparisons"
          value={comparison.length}
          subtitle="Side-by-side outcomes"
          icon={GitCompare}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Saved Scenarios
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Scenarios saved for future forecasting simulations.
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <Layers size={22} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left p-4">Scenario</th>
                  <th className="text-left p-4">Growth</th>
                  <th className="text-left p-4">Seasonality</th>
                  <th className="text-left p-4">Demand</th>
                </tr>
              </thead>

              <tbody>
                {scenarios.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-slate-500 dark:text-slate-400">
                      No scenarios saved yet.
                    </td>
                  </tr>
                ) : (
                  scenarios.map((scenario) => (
                    <tr
                      key={scenario.id}
                      className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
                            <Zap size={18} />
                          </div>

                          <div>
                            <p className="font-black text-slate-900 dark:text-white">
                              {scenario.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              Scenario #{scenario.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {scenario.sales_growth}%
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="badge bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                          {scenario.seasonality}%
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                          {scenario.demand_factor}%
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Scenario Comparison
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Compare predicted demand, revenue and profit outcomes.
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
              <BarChart3 size={22} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left p-4">Scenario</th>
                  <th className="text-left p-4">Demand</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Profit</th>
                </tr>
              </thead>

              <tbody>
                {comparison.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-slate-500 dark:text-slate-400">
                      No comparison generated yet.
                    </td>
                  </tr>
                ) : (
                  comparison.map((item) => (
                    <tr
                      key={item.scenario_id}
                      className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                    >
                      <td className="p-4 font-black text-slate-900 dark:text-white">
                        {item.scenario_name}
                      </td>

                      <td className="p-4 text-slate-700 dark:text-slate-200">
                        {item.predicted_demand}
                      </td>

                      <td className="p-4 font-bold text-emerald-600 dark:text-emerald-300">
                        ₹{item.expected_revenue}
                      </td>

                      <td className="p-4 font-bold text-violet-600 dark:text-violet-300">
                        ₹{item.expected_profit}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {comparison.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {comparison.slice(0, 3).map((item) => (
            <div
              key={item.scenario_id}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

              <Target size={32} />

              <h3 className="font-black text-xl mt-4">
                {item.scenario_name}
              </h3>

              <p className="text-sm text-white/75 mt-2">
                Demand: {item.predicted_demand}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-white/15 rounded-2xl p-3">
                  <p className="text-xs text-white/60">Revenue</p>
                  <p className="font-black">₹{item.expected_revenue}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-3">
                  <p className="text-xs text-white/60">Profit</p>
                  <p className="font-black">₹{item.expected_profit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenarioAnalysis;