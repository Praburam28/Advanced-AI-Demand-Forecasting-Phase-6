import { useEffect, useState } from "react";
import {
  Workflow,
  Plus,
  PlayCircle,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  getWorkflows,
  getWorkflowSummary,
  createWorkflow,
  executeWorkflow,
} from "../api/workflowApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function WorkflowAutomation() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;
  const createdBy = 1;

  const [workflows, setWorkflows] = useState([]);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    workflow_type: "forecast",
    trigger_event: "dataset_uploaded",
    action_type: "generate_forecast",
    configuration: "",
  });

  const fetchData = async () => {
    if (!organizationId) return;

    const workflowRes = await getWorkflows(organizationId);
    const summaryRes = await getWorkflowSummary(organizationId);

    setWorkflows(workflowRes.data);
    setSummary(summaryRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [organizationId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!organizationId) {
      alert("Please create or select an organization first");
      return;
    }

    await createWorkflow({
      organization_id: Number(organizationId),
      name: form.name,
      description: form.description || null,
      workflow_type: form.workflow_type || "forecast",
      trigger_event: form.trigger_event || "dataset_uploaded",
      action_type: form.action_type || "generate_forecast",
      configuration: form.configuration || null,
      created_by: Number(createdBy),
    });

    setForm({
      name: "",
      description: "",
      workflow_type: "forecast",
      trigger_event: "dataset_uploaded",
      action_type: "generate_forecast",
      configuration: "",
    });

    fetchData();
  };

  const handleExecute = async (id) => {
    await executeWorkflow(id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Workflow size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Workflow Automation</h1>
              <p className="text-white/60">
                Configure automated forecast, report, approval and notification workflows.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      {summary && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {[
            ["Workflows", summary.total_workflows],
            ["Active", summary.active_workflows],
            ["Inactive", summary.inactive_workflows],
            ["Executions", summary.total_executions],
            ["Success", summary.successful_executions],
            ["Failed", summary.failed_executions],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-xl backdrop-blur-xl"
            >
              <p className="text-3xl font-black">{value}</p>
              <p className="text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreate}
          className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create Workflow</h2>
              <p className="text-sm text-white/50">Configure automation rule</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Workflow Name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <select
              name="workflow_type"
              value={form.workflow_type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="forecast">Forecast</option>
              <option value="report">Report</option>
              <option value="notification">Notification</option>
              <option value="approval">Approval</option>
            </select>

            <select
              name="trigger_event"
              value={form.trigger_event}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="dataset_uploaded">Dataset Uploaded</option>
              <option value="forecast_completed">Forecast Completed</option>
              <option value="report_generated">Report Generated</option>
              <option value="approval_pending">Approval Pending</option>
            </select>

            <select
              name="action_type"
              value={form.action_type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="generate_forecast">Generate Forecast</option>
              <option value="generate_report">Generate Report</option>
              <option value="send_notification">Send Notification</option>
              <option value="request_approval">Request Approval</option>
            </select>

            <textarea
              name="configuration"
              value={form.configuration}
              onChange={handleChange}
              placeholder="Configuration JSON / Notes"
              rows="3"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 py-4 font-bold shadow-xl">
              <Plus size={18} />
              Create Workflow
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <Activity className="text-cyan-300" />
            <div>
              <h2 className="text-xl font-bold">Workflow Directory</h2>
              <p className="text-sm text-white/50">Automation rules and executions</p>
            </div>
          </div>

          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h3 className="text-lg font-black">{workflow.name}</h3>

                    <p className="mt-2 text-sm text-white/60">
                      {workflow.description || "No description"}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Type</p>
                        <p className="font-bold">{workflow.workflow_type}</p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Trigger</p>
                        <p className="font-bold">{workflow.trigger_event}</p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Action</p>
                        <p className="font-bold">{workflow.action_type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                        workflow.is_active
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-red-400/10 text-red-300"
                      }`}
                    >
                      {workflow.is_active ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {workflow.is_active ? "Active" : "Inactive"}
                    </span>

                    <button
                      onClick={() => handleExecute(workflow.id)}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-400"
                    >
                      <PlayCircle size={16} />
                      Execute
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {workflows.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
                <Workflow className="mx-auto mb-4 text-white/40" size={44} />
                <p className="font-bold">No workflows found</p>
                <p className="text-sm text-white/50">
                  Create workflow automation rules for forecasts and reports.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}