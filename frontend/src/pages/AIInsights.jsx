import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  Sparkles,
  Bot,
  Rocket,
  AlertTriangle,
  ArrowUpRight,
  Zap,
} from "lucide-react";

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [decliningProducts, setDecliningProducts] = useState([]);
  const [growthProducts, setGrowthProducts] = useState([]);

  const fetchInsights = async () => {
    try {
      const insightRes = await API.get("/insights/");
      const decliningRes = await API.get("/insights/declining-products");
      const growthRes = await API.get("/insights/high-growth-products");

      setInsights(insightRes.data);
      setDecliningProducts(decliningRes.data);
      setGrowthProducts(growthRes.data);
    } catch (error) {
      console.error("Failed to fetch AI insights", error);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const opportunities = insights?.opportunities || [];
  const recommendations = insights?.recommendations || [];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-fuchsia-700 via-violet-700 to-cyan-500 p-8 text-white shadow-2xl shadow-fuchsia-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Sparkles size={16} />
              AI Insights Engine
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Automated Business Intelligence
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Discover demand opportunities, declining products, high-growth
              products, and AI-powered recommendations for smarter forecasting
              decisions.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Generate Insights
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View Recommendations
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">AI Confidence Score</p>
                  <h2 className="text-5xl font-black mt-2">94%</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Bot size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Opportunities</p>
                  <p className="font-black mt-1">{opportunities.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Growth Items</p>
                  <p className="font-black mt-1">{growthProducts.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Risks</p>
                  <p className="font-black mt-1">{decliningProducts.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
            <Brain size={32} />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              AI Forecasting Summary
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-6">
              {insights?.summary || "Generate forecasts to view AI insights."}
            </p>
          </div>

          <button className="btn-secondary hidden md:flex items-center gap-2">
            Open AI Report
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <TrendingUp size={32} />
          <p className="text-sm text-white/70 mt-4">Demand Opportunities</p>
          <h3 className="text-4xl font-black mt-1">{opportunities.length}</h3>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500 to-violet-600 p-6 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <Rocket size={32} />
          <p className="text-sm text-white/70 mt-4">High-Growth Products</p>
          <h3 className="text-4xl font-black mt-1">{growthProducts.length}</h3>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 p-6 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <TrendingDown size={32} />
          <p className="text-sm text-white/70 mt-4">Declining Products</p>
          <h3 className="text-4xl font-black mt-1">{decliningProducts.length}</h3>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <Lightbulb size={32} />
          <p className="text-sm text-white/70 mt-4">Recommendations</p>
          <h3 className="text-4xl font-black mt-1">{recommendations.length}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
              <TrendingUp size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Demand Opportunities
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                AI-detected demand growth possibilities
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {opportunities.length === 0 ? (
              <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No demand opportunities available yet.
                </p>
              </div>
            ) : (
              opportunities.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4 hover:scale-[1.01] transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                      <Zap size={18} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Declining Products
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Products requiring management attention
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {decliningProducts.length === 0 ? (
              <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No declining products detected.
                </p>
              </div>
            ) : (
              decliningProducts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {item.product}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {item.reason}
                      </p>
                    </div>

                    <span className="badge bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                      {item.decline_rate}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white flex items-center justify-center">
              <Target size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                High-Growth Products
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Products with strong future demand
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {growthProducts.length === 0 ? (
              <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No high-growth products available yet.
                </p>
              </div>
            ) : (
              growthProducts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {item.product}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {item.reason}
                      </p>
                    </div>

                    <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      {item.growth_rate}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center">
              <Lightbulb size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                AI Recommendations
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Suggested actions for better business planning
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {recommendations.length === 0 ? (
              <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No recommendations generated yet.
                </p>
              </div>
            ) : (
              recommendations.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300 flex items-center justify-center">
                      <Lightbulb size={17} />
                    </div>

                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;