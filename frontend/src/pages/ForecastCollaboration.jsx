import { useEffect, useState } from "react";
import API from "../api/api";
import {
  MessageSquare,
  Send,
  Share2,
  History,
  Users,
  Sparkles,
  Rocket,
  FileText,
  Clock,
  Brain,
  GitBranch,
  Eye,
} from "lucide-react";

import StatCard from "../components/StatCard";

const ForecastCollaboration = () => {
  const [forecasts, setForecasts] = useState([]);
  const [selectedForecastId, setSelectedForecastId] = useState("");
  const [comments, setComments] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [comment, setComment] = useState("");

  const fetchForecasts = async () => {
    const res = await API.get("/forecasts/");
    setForecasts(res.data);
  };

  const fetchComments = async (forecastId) => {
    const res = await API.get(`/collaboration/comments/${forecastId}`);
    setComments(res.data);
  };

  const fetchRevisions = async (forecastId) => {
    const res = await API.get(`/collaboration/revisions/${forecastId}`);
    setRevisions(res.data);
  };

  useEffect(() => {
    fetchForecasts();
  }, []);

  const handleForecastChange = async (id) => {
    setSelectedForecastId(id);

    if (id) {
      await fetchComments(id);
      await fetchRevisions(id);
    }
  };

  const sendComment = async () => {
    if (!selectedForecastId || !comment) {
      alert("Select forecast and enter comment");
      return;
    }

    await API.post("/collaboration/comments", {
      forecast_id: Number(selectedForecastId),
      comment,
    });

    setComment("");
    fetchComments(selectedForecastId);
  };

  const selectedForecast = forecasts.find(
    (forecast) => String(forecast.id) === String(selectedForecastId)
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-violet-700 to-fuchsia-600 p-8 text-white shadow-2xl shadow-violet-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Users size={16} />
              Forecast Collaboration Hub
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Collaborate on Forecast Decisions
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Add comments, review forecast revisions, track collaboration
              activity, and support team-based forecasting decisions.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Add Comment
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                Share Report
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Selected Forecast</p>
                  <h2 className="text-4xl font-black mt-2">
                    {selectedForecast ? `#${selectedForecast.id}` : "None"}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Forecasts</p>
                  <p className="font-black mt-1">{forecasts.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Comments</p>
                  <p className="font-black mt-1">{comments.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Revisions</p>
                  <p className="font-black mt-1">{revisions.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center">
            <Eye size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Select Forecast
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose a forecast to view comments and revision history.
            </p>
          </div>
        </div>

        <select
          value={selectedForecastId}
          onChange={(e) => handleForecastChange(e.target.value)}
          className="input"
        >
          <option value="">Select forecast</option>
          {forecasts.map((forecast) => (
            <option key={forecast.id} value={forecast.id}>
              #{forecast.id} - {forecast.model_name} - Demand{" "}
              {forecast.predicted_demand}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Forecasts"
          value={forecasts.length}
          subtitle="Available for collaboration"
          icon={Brain}
          gradient="from-blue-500 to-indigo-600"
        />

        <StatCard
          title="Comments"
          value={comments.length}
          subtitle="Team discussions"
          icon={MessageSquare}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Revisions"
          value={revisions.length}
          subtitle="Forecast history"
          icon={GitBranch}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Sharing"
          value="Ready"
          subtitle="Report sharing module"
          icon={Share2}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <MessageSquare size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Forecast Comments
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Team discussion and decision notes for selected forecast.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No comments yet for this forecast.
                </p>
              </div>
            ) : (
              comments.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5 hover:scale-[1.01] transition"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center">
                        <Users size={18} />
                      </div>

                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white">
                          User #{item.user_id}
                        </h4>
                        <p className="text-xs text-slate-400">Forecast collaborator</p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "Recently"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-6">
                    {item.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a forecast comment..."
              className="input flex-1"
            />

            <button
              onClick={sendComment}
              className="btn-primary flex items-center gap-2"
            >
              <Send size={18} />
              Send
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

            <Share2 size={32} />

            <h3 className="font-black text-xl mt-4">Report Sharing</h3>

            <p className="text-sm text-white/75 mt-2">
              Share forecast reports with team members and stakeholders.
            </p>

            <button className="w-full bg-white text-rose-600 py-3 rounded-2xl font-black mt-5 hover:scale-[1.02] transition">
              Share Report
            </button>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
                <History size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Revision History
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Forecast version timeline
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5 max-h-[400px] overflow-y-auto pr-2">
              {revisions.length === 0 ? (
                <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No revision history available.
                  </p>
                </div>
              ) : (
                revisions.map((revision) => (
                  <div key={revision.id} className="relative pl-6">
                    <div className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-cyan-400 to-violet-500" />
                    <div className="absolute left-[-7px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-4 ring-white dark:ring-slate-900" />

                    <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-cyan-500" />

                        <p className="text-sm font-black text-slate-800 dark:text-white">
                          Version {revision.version_number}
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {revision.changes}
                      </p>

                      <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-3">
                        {revision.created_at
                          ? new Date(revision.created_at).toLocaleString()
                          : "Recently"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
          <MessageSquare size={32} />
          <h3 className="font-black text-xl mt-4">Comment Threads</h3>
          <p className="text-sm text-white/75 mt-2">
            Discuss forecasts and capture team feedback.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <FileText size={32} />
          <h3 className="font-black text-xl mt-4">Report Collaboration</h3>
          <p className="text-sm text-white/75 mt-2">
            Link forecast discussions with executive reports.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <History size={32} />
          <h3 className="font-black text-xl mt-4">Revision History</h3>
          <p className="text-sm text-white/75 mt-2">
            Maintain version history for every forecast generated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForecastCollaboration;