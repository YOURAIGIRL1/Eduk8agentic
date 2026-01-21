import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Error Boundary
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Audit error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-purple-900 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl p-8 max-w-md text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-stone-600 mb-4">{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  PoundSterling,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Users,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  Search,
  MessageSquare,
  Database
} from 'lucide-react';

// Types
interface RoleData {
  title: string;
  avgSalary: number;
  tasks: TaskData[];
}

interface TaskData {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  avgHoursWeek: number;
  automationPotential: number; // 0-1
  complexity: 'low' | 'medium' | 'high';
  agentType: string;
}

interface AuditAnswers {
  role: string;
  companySize: string;
  selectedTasks: string[];
  taskHours: { [key: string]: number };
  currentTools: string[];
  urgency: string;
  email?: string;
}

// Role and task data
const roles: { [key: string]: RoleData } = {
  ceo: {
    title: 'CEO / Managing Director',
    avgSalary: 250000,
    tasks: [
      { id: 'email-triage', name: 'Email Triage & Response', icon: <Mail className="w-5 h-5" />, description: 'Sorting, prioritizing, and responding to emails', avgHoursWeek: 8, automationPotential: 0.7, complexity: 'medium', agentType: 'Email Management Agent' },
      { id: 'meeting-prep', name: 'Meeting Preparation', icon: <Calendar className="w-5 h-5" />, description: 'Gathering context, creating agendas, briefing docs', avgHoursWeek: 5, automationPotential: 0.8, complexity: 'medium', agentType: 'Meeting Prep Agent' },
      { id: 'research', name: 'Market & Competitor Research', icon: <Search className="w-5 h-5" />, description: 'Monitoring competitors, industry news, market trends', avgHoursWeek: 4, automationPotential: 0.85, complexity: 'low', agentType: 'Intelligence Agent' },
      { id: 'reporting', name: 'Report Review & Synthesis', icon: <FileText className="w-5 h-5" />, description: 'Reading and summarizing reports from teams', avgHoursWeek: 6, automationPotential: 0.75, complexity: 'medium', agentType: 'Report Synthesis Agent' },
      { id: 'scheduling', name: 'Calendar & Scheduling', icon: <Calendar className="w-5 h-5" />, description: 'Managing calendar, resolving conflicts, booking', avgHoursWeek: 3, automationPotential: 0.9, complexity: 'low', agentType: 'Scheduling Agent' },
      { id: 'comms-draft', name: 'Communications Drafting', icon: <MessageSquare className="w-5 h-5" />, description: 'Drafting announcements, updates, responses', avgHoursWeek: 4, automationPotential: 0.6, complexity: 'medium', agentType: 'Communications Agent' },
    ]
  },
  cfo: {
    title: 'CFO / Finance Director',
    avgSalary: 200000,
    tasks: [
      { id: 'report-gen', name: 'Financial Report Generation', icon: <BarChart3 className="w-5 h-5" />, description: 'Creating recurring financial reports and dashboards', avgHoursWeek: 8, automationPotential: 0.85, complexity: 'medium', agentType: 'Financial Reporting Agent' },
      { id: 'variance', name: 'Variance Analysis', icon: <TrendingUp className="w-5 h-5" />, description: 'Analyzing budget vs actual, identifying anomalies', avgHoursWeek: 5, automationPotential: 0.7, complexity: 'high', agentType: 'Variance Analysis Agent' },
      { id: 'invoice', name: 'Invoice Processing', icon: <FileText className="w-5 h-5" />, description: 'Reviewing, approving, and routing invoices', avgHoursWeek: 4, automationPotential: 0.9, complexity: 'low', agentType: 'Invoice Processing Agent' },
      { id: 'forecasting', name: 'Cash Flow Forecasting', icon: <Database className="w-5 h-5" />, description: 'Projecting cash positions and runway', avgHoursWeek: 4, automationPotential: 0.65, complexity: 'high', agentType: 'Forecasting Agent' },
      { id: 'compliance', name: 'Compliance Monitoring', icon: <CheckCircle className="w-5 h-5" />, description: 'Tracking regulatory requirements and deadlines', avgHoursWeek: 3, automationPotential: 0.8, complexity: 'medium', agentType: 'Compliance Agent' },
      { id: 'vendor', name: 'Vendor Management', icon: <Users className="w-5 h-5" />, description: 'Contract tracking, renewals, negotiations prep', avgHoursWeek: 3, automationPotential: 0.7, complexity: 'medium', agentType: 'Vendor Management Agent' },
    ]
  },
  coo: {
    title: 'COO / Operations Director',
    avgSalary: 180000,
    tasks: [
      { id: 'ops-reporting', name: 'Operations Reporting', icon: <BarChart3 className="w-5 h-5" />, description: 'Compiling KPIs, metrics, and status updates', avgHoursWeek: 7, automationPotential: 0.85, complexity: 'medium', agentType: 'Ops Reporting Agent' },
      { id: 'process-monitor', name: 'Process Monitoring', icon: <Target className="w-5 h-5" />, description: 'Tracking SLAs, bottlenecks, and exceptions', avgHoursWeek: 5, automationPotential: 0.8, complexity: 'medium', agentType: 'Process Monitor Agent' },
      { id: 'resource-alloc', name: 'Resource Allocation', icon: <Users className="w-5 h-5" />, description: 'Balancing workloads and capacity planning', avgHoursWeek: 4, automationPotential: 0.6, complexity: 'high', agentType: 'Resource Planning Agent' },
      { id: 'vendor-coord', name: 'Vendor Coordination', icon: <MessageSquare className="w-5 h-5" />, description: 'Managing supplier communications and orders', avgHoursWeek: 5, automationPotential: 0.75, complexity: 'medium', agentType: 'Vendor Coordination Agent' },
      { id: 'quality', name: 'Quality Assurance', icon: <CheckCircle className="w-5 h-5" />, description: 'Reviewing outputs, checking standards', avgHoursWeek: 4, automationPotential: 0.7, complexity: 'medium', agentType: 'QA Agent' },
      { id: 'incident', name: 'Incident Management', icon: <AlertTriangle className="w-5 h-5" />, description: 'Tracking and resolving operational issues', avgHoursWeek: 3, automationPotential: 0.65, complexity: 'high', agentType: 'Incident Agent' },
    ]
  },
  cmo: {
    title: 'CMO / Marketing Director',
    avgSalary: 170000,
    tasks: [
      { id: 'content-creation', name: 'Content Creation', icon: <FileText className="w-5 h-5" />, description: 'Writing posts, emails, copy, articles', avgHoursWeek: 8, automationPotential: 0.6, complexity: 'medium', agentType: 'Content Agent' },
      { id: 'social-monitor', name: 'Social Media Monitoring', icon: <MessageSquare className="w-5 h-5" />, description: 'Tracking mentions, sentiment, engagement', avgHoursWeek: 4, automationPotential: 0.9, complexity: 'low', agentType: 'Social Listening Agent' },
      { id: 'campaign-report', name: 'Campaign Reporting', icon: <BarChart3 className="w-5 h-5" />, description: 'Pulling metrics, analyzing performance', avgHoursWeek: 5, automationPotential: 0.85, complexity: 'medium', agentType: 'Campaign Analytics Agent' },
      { id: 'competitor-intel', name: 'Competitor Intelligence', icon: <Search className="w-5 h-5" />, description: 'Monitoring competitor activities and messaging', avgHoursWeek: 3, automationPotential: 0.85, complexity: 'low', agentType: 'Competitor Intel Agent' },
      { id: 'lead-qual', name: 'Lead Qualification', icon: <Target className="w-5 h-5" />, description: 'Scoring and routing inbound leads', avgHoursWeek: 4, automationPotential: 0.8, complexity: 'medium', agentType: 'Lead Scoring Agent' },
      { id: 'email-marketing', name: 'Email Campaign Management', icon: <Mail className="w-5 h-5" />, description: 'Segmentation, scheduling, A/B testing', avgHoursWeek: 4, automationPotential: 0.75, complexity: 'medium', agentType: 'Email Marketing Agent' },
    ]
  },
  sales: {
    title: 'Sales Director / VP Sales',
    avgSalary: 160000,
    tasks: [
      { id: 'lead-research', name: 'Lead Research', icon: <Search className="w-5 h-5" />, description: 'Researching prospects before outreach', avgHoursWeek: 6, automationPotential: 0.85, complexity: 'low', agentType: 'Lead Research Agent' },
      { id: 'follow-up', name: 'Follow-up Sequences', icon: <Mail className="w-5 h-5" />, description: 'Managing and personalizing follow-ups', avgHoursWeek: 5, automationPotential: 0.8, complexity: 'medium', agentType: 'Follow-up Agent' },
      { id: 'crm-update', name: 'CRM Updates', icon: <Database className="w-5 h-5" />, description: 'Logging activities, updating records', avgHoursWeek: 4, automationPotential: 0.9, complexity: 'low', agentType: 'CRM Agent' },
      { id: 'proposal-gen', name: 'Proposal Generation', icon: <FileText className="w-5 h-5" />, description: 'Creating and customizing proposals', avgHoursWeek: 5, automationPotential: 0.7, complexity: 'medium', agentType: 'Proposal Agent' },
      { id: 'pipeline-report', name: 'Pipeline Reporting', icon: <BarChart3 className="w-5 h-5" />, description: 'Creating forecasts and pipeline reports', avgHoursWeek: 4, automationPotential: 0.85, complexity: 'medium', agentType: 'Pipeline Agent' },
      { id: 'meeting-book', name: 'Meeting Booking', icon: <Calendar className="w-5 h-5" />, description: 'Scheduling demos and calls with prospects', avgHoursWeek: 3, automationPotential: 0.9, complexity: 'low', agentType: 'Booking Agent' },
    ]
  },
  founder: {
    title: 'Founder / Business Owner',
    avgSalary: 150000,
    tasks: [
      { id: 'admin', name: 'Administrative Tasks', icon: <FileText className="w-5 h-5" />, description: 'General admin, paperwork, coordination', avgHoursWeek: 8, automationPotential: 0.75, complexity: 'low', agentType: 'Admin Agent' },
      { id: 'email-all', name: 'Email Management', icon: <Mail className="w-5 h-5" />, description: 'Inbox management, responses, follow-ups', avgHoursWeek: 7, automationPotential: 0.7, complexity: 'medium', agentType: 'Email Agent' },
      { id: 'biz-research', name: 'Business Research', icon: <Search className="w-5 h-5" />, description: 'Market research, competitor analysis, trends', avgHoursWeek: 4, automationPotential: 0.85, complexity: 'low', agentType: 'Research Agent' },
      { id: 'bookkeeping', name: 'Basic Bookkeeping', icon: <PoundSterling className="w-5 h-5" />, description: 'Expense tracking, invoice chasing, reconciliation', avgHoursWeek: 4, automationPotential: 0.8, complexity: 'medium', agentType: 'Bookkeeping Agent' },
      { id: 'customer-support', name: 'Customer Support', icon: <MessageSquare className="w-5 h-5" />, description: 'Responding to customer queries and issues', avgHoursWeek: 5, automationPotential: 0.7, complexity: 'medium', agentType: 'Support Agent' },
      { id: 'social', name: 'Social Media', icon: <Users className="w-5 h-5" />, description: 'Posting, engagement, content scheduling', avgHoursWeek: 3, automationPotential: 0.75, complexity: 'low', agentType: 'Social Agent' },
    ]
  }
};

const companySizes = [
  { id: 'solo', label: 'Solo / Freelancer', multiplier: 0.8 },
  { id: 'small', label: '2-10 employees', multiplier: 1.0 },
  { id: 'medium', label: '11-50 employees', multiplier: 1.2 },
  { id: 'large', label: '51-200 employees', multiplier: 1.4 },
  { id: 'enterprise', label: '200+ employees', multiplier: 1.6 },
];

// Calculate results
const calculateResults = (answers: AuditAnswers) => {
  const role = roles[answers.role];
  const sizeMultiplier = companySizes.find(s => s.id === answers.companySize)?.multiplier || 1;
  const hourlyRate = role.avgSalary / 2080; // 52 weeks * 40 hours

  let totalHoursWasted = 0;
  let totalRecoverable = 0;
  const taskBreakdown: { task: TaskData; hoursSpent: number; hoursRecoverable: number; annualCost: number }[] = [];

  answers.selectedTasks.forEach(taskId => {
    const task = role.tasks.find(t => t.id === taskId);
    if (task) {
      const hoursSpent = answers.taskHours[taskId] || task.avgHoursWeek;
      const hoursRecoverable = hoursSpent * task.automationPotential;
      const annualCost = hoursRecoverable * hourlyRate * 52 * sizeMultiplier;

      totalHoursWasted += hoursSpent;
      totalRecoverable += hoursRecoverable;
      taskBreakdown.push({ task, hoursSpent, hoursRecoverable, annualCost });
    }
  });

  // Sort by annual cost (highest first)
  taskBreakdown.sort((a, b) => b.annualCost - a.annualCost);

  const annualCostWasted = totalRecoverable * hourlyRate * 52 * sizeMultiplier;
  const competitorRisk = totalRecoverable > 15 ? 'high' : totalRecoverable > 8 ? 'medium' : 'low';

  return {
    totalHoursWasted,
    totalRecoverable,
    annualCostWasted,
    hourlyRate,
    taskBreakdown,
    competitorRisk,
    topThreeWorkflows: taskBreakdown.slice(0, 3),
  };
};

// Components
const ProgressBar: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div className="mb-8">
    <div className="flex justify-between text-sm text-purple-200 mb-2">
      <span>Step {step} of {total}</span>
      <span>{Math.round((step / total) * 100)}%</span>
    </div>
    <div className="h-2 bg-purple-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(step / total) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </div>
);

export const AIAgentAudit: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AuditAnswers>({
    role: '',
    companySize: '',
    selectedTasks: [],
    taskHours: {},
    currentTools: [],
    urgency: '',
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 5;

  const handleRoleSelect = (roleId: string) => {
    setAnswers({ ...answers, role: roleId, selectedTasks: [], taskHours: {} });
  };

  const handleSizeSelect = (sizeId: string) => {
    setAnswers({ ...answers, companySize: sizeId });
  };

  const handleTaskToggle = (taskId: string) => {
    const current = answers.selectedTasks;
    if (current.includes(taskId)) {
      setAnswers({ ...answers, selectedTasks: current.filter(t => t !== taskId) });
    } else {
      setAnswers({ ...answers, selectedTasks: [...current, taskId] });
    }
  };

  const handleTaskHours = (taskId: string, hours: number) => {
    setAnswers({ ...answers, taskHours: { ...answers.taskHours, [taskId]: hours } });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return answers.role !== '';
      case 2: return answers.companySize !== '';
      case 3: return answers.selectedTasks.length > 0;
      case 4: return true; // Hours are optional (defaults used)
      case 5: return true; // Urgency optional
      default: return false;
    }
  };

  if (showResults) {
    const results = calculateResults(answers);
    const role = roles[answers.role];

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4" />
                Audit Complete
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                Your AI Agent Opportunity Report
              </h1>
              <p className="text-stone-600 text-lg">
                {role.title} | Based on your workflow analysis
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <PoundSterling className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-red-600 font-medium">Annual Cost</span>
                </div>
                <div className="text-4xl font-bold text-red-700 mb-1">
                  £{Math.round(results.annualCostWasted).toLocaleString()}
                </div>
                <p className="text-red-600 text-sm">Lost to manual processes you could automate</p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-amber-600 font-medium">Hours Recoverable</span>
                </div>
                <div className="text-4xl font-bold text-amber-700 mb-1">
                  {Math.round(results.totalRecoverable)}/week
                </div>
                <p className="text-amber-600 text-sm">{Math.round(results.totalRecoverable * 52)} hours/year back for strategic work</p>
              </div>

              <div className={`rounded-2xl p-6 border ${
                results.competitorRisk === 'high'
                  ? 'bg-red-50 border-red-100'
                  : results.competitorRisk === 'medium'
                  ? 'bg-amber-50 border-amber-100'
                  : 'bg-emerald-50 border-emerald-100'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    results.competitorRisk === 'high'
                      ? 'bg-red-100'
                      : results.competitorRisk === 'medium'
                      ? 'bg-amber-100'
                      : 'bg-emerald-100'
                  }`}>
                    <AlertTriangle className={`w-6 h-6 ${
                      results.competitorRisk === 'high'
                        ? 'text-red-600'
                        : results.competitorRisk === 'medium'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`} />
                  </div>
                  <span className={`font-medium ${
                    results.competitorRisk === 'high'
                      ? 'text-red-600'
                      : results.competitorRisk === 'medium'
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}>Competitive Risk</span>
                </div>
                <div className={`text-4xl font-bold mb-1 capitalize ${
                  results.competitorRisk === 'high'
                    ? 'text-red-700'
                    : results.competitorRisk === 'medium'
                    ? 'text-amber-700'
                    : 'text-emerald-700'
                }`}>
                  {results.competitorRisk}
                </div>
                <p className={`text-sm ${
                  results.competitorRisk === 'high'
                    ? 'text-red-600'
                    : results.competitorRisk === 'medium'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}>
                  {results.competitorRisk === 'high'
                    ? 'Competitors using AI agents are gaining ground'
                    : results.competitorRisk === 'medium'
                    ? 'Some efficiency gap vs AI-forward competitors'
                    : 'Relatively low automation gap'}
                </p>
              </div>
            </div>

            {/* Priority Workflows */}
            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Your Top 3 Automation Priorities
              </h2>
              <p className="text-stone-500 mb-6">Ranked by potential value recovery</p>

              <div className="space-y-4">
                {results.topThreeWorkflows.map((item, index) => (
                  <div
                    key={item.task.id}
                    className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-purple-600' : index === 1 ? 'bg-purple-500' : 'bg-purple-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.task.icon}
                        <span className="font-bold text-stone-900">{item.task.name}</span>
                      </div>
                      <p className="text-stone-500 text-sm">{item.task.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        £{Math.round(item.annualCost).toLocaleString()}/yr
                      </div>
                      <div className="text-sm text-stone-500">
                        {Math.round(item.hoursRecoverable)} hrs/wk recoverable
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Agents */}
            <div className="bg-purple-50 rounded-2xl p-8 mb-8">
              <h2 className="font-serif text-2xl font-bold text-purple-900 mb-2">
                AI Agents You Need
              </h2>
              <p className="text-purple-700 mb-6">Based on your workflow analysis</p>

              <div className="grid md:grid-cols-2 gap-4">
                {results.topThreeWorkflows.map((item) => (
                  <div
                    key={item.task.id}
                    className="bg-white rounded-xl p-4 border border-purple-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="font-bold text-purple-900">{item.task.agentType}</span>
                    </div>
                    <p className="text-stone-600 text-sm mb-3">
                      Automates: {item.task.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-500">
                        Complexity: <span className={`font-medium ${
                          item.task.complexity === 'low' ? 'text-emerald-600' :
                          item.task.complexity === 'medium' ? 'text-amber-600' : 'text-red-600'
                        }`}>{item.task.complexity}</span>
                      </span>
                      <span className="text-purple-600 font-medium">
                        {Math.round(item.task.automationPotential * 100)}% automatable
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                Full Task Breakdown
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Task</th>
                      <th className="text-right py-3 px-4 font-semibold text-stone-700">Hours/Week</th>
                      <th className="text-right py-3 px-4 font-semibold text-stone-700">Recoverable</th>
                      <th className="text-right py-3 px-4 font-semibold text-stone-700">Annual Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.taskBreakdown.map((item) => (
                      <tr key={item.task.id} className="border-b border-stone-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {item.task.icon}
                            <span className="text-stone-900">{item.task.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 text-stone-600">{item.hoursSpent}</td>
                        <td className="text-right py-3 px-4 text-amber-600 font-medium">
                          {Math.round(item.hoursRecoverable)}
                        </td>
                        <td className="text-right py-3 px-4 text-purple-600 font-bold">
                          £{Math.round(item.annualCost).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-stone-50">
                      <td className="py-3 px-4 font-bold text-stone-900">Total</td>
                      <td className="text-right py-3 px-4 font-bold text-stone-900">{results.totalHoursWasted}</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-600">{Math.round(results.totalRecoverable)}</td>
                      <td className="text-right py-3 px-4 font-bold text-purple-600">
                        £{Math.round(results.annualCostWasted).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl p-8 text-white text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">
                Ready to Recover £{Math.round(results.annualCostWasted).toLocaleString()}/Year?
              </h2>
              <p className="text-purple-200 text-lg mb-6 max-w-2xl mx-auto">
                Book a free strategy session to discuss your results and create a personalised AI agent implementation roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:learn@eduk8agentic.com?subject=AI Agent Audit Follow-up&body=I just completed the AI Agent Audit.%0A%0AMy Results:%0A- Role: ${role.title}%0A- Annual opportunity: £${Math.round(results.annualCostWasted).toLocaleString()}%0A- Hours recoverable: ${Math.round(results.totalRecoverable)}/week%0A- Top priorities: ${results.topThreeWorkflows.map(t => t.task.name).join(', ')}%0A%0AI'd like to discuss implementation options.`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-purple-100 transition-colors"
                >
                  Book Strategy Session
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setStep(1);
                    setAnswers({ role: '', companySize: '', selectedTasks: [], taskHours: {}, currentTools: [], urgency: '' });
                  }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
                >
                  Retake Audit
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 text-center">
              <p className="text-stone-500 text-sm mb-3">Share your results</p>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://eduk8agentic.com/audit')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0077B5] text-white rounded-lg text-sm font-medium hover:opacity-90"
                >
                  Share on LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just discovered I'm leaving £${Math.round(results.annualCostWasted).toLocaleString()}/year on the table by not using AI agents. Take the free audit:`)}&url=${encodeURIComponent('https://eduk8agentic.com/audit')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:opacity-90"
                >
                  Share on X
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            Executive AI Agent Audit
          </h1>
          <p className="text-purple-200">
            Discover what your manual processes are really costing you
          </p>
        </div>

        <ProgressBar step={step} total={totalSteps} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  What's your role?
                </h2>
                <p className="text-stone-500 mb-6">
                  We'll customize the audit based on your typical responsibilities
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(roles).map(([id, role]) => (
                    <button
                      key={id}
                      onClick={() => handleRoleSelect(id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        answers.role === id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      <span className="font-medium text-stone-900">{role.title}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Company Size */}
            {step === 2 && (
              <>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  What's your company size?
                </h2>
                <p className="text-stone-500 mb-6">
                  This helps us calculate the full impact across your organization
                </p>
                <div className="space-y-3">
                  {companySizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeSelect(size.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        answers.companySize === size.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      <span className="font-medium text-stone-900">{size.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 3: Task Selection */}
            {step === 3 && answers.role && (
              <>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  Which tasks consume your time?
                </h2>
                <p className="text-stone-500 mb-6">
                  Select all that apply to your typical week
                </p>
                <div className="space-y-3">
                  {roles[answers.role].tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleTaskToggle(task.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        answers.selectedTasks.includes(task.id)
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          answers.selectedTasks.includes(task.id) ? 'bg-purple-100' : 'bg-stone-100'
                        }`}>
                          {task.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-stone-900">{task.name}</div>
                          <div className="text-sm text-stone-500">{task.description}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers.selectedTasks.includes(task.id)
                            ? 'border-purple-600 bg-purple-600'
                            : 'border-stone-300'
                        }`}>
                          {answers.selectedTasks.includes(task.id) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 4: Hours per Task */}
            {step === 4 && answers.role && (
              <>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  How many hours per week on each?
                </h2>
                <p className="text-stone-500 mb-6">
                  Adjust the estimates to match your actual time spent
                </p>
                <div className="space-y-6">
                  {answers.selectedTasks.map((taskId) => {
                    const task = roles[answers.role].tasks.find(t => t.id === taskId);
                    if (!task) return null;
                    const hours = answers.taskHours[taskId] ?? task.avgHoursWeek;
                    return (
                      <div key={taskId}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {task.icon}
                            <span className="font-medium text-stone-900">{task.name}</span>
                          </div>
                          <span className="text-purple-600 font-bold">{hours} hrs/week</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={hours}
                          onChange={(e) => handleTaskHours(taskId, parseInt(e.target.value))}
                          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-stone-400 mt-1">
                          <span>1 hr</span>
                          <span>20 hrs</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Step 5: Urgency */}
            {step === 5 && (
              <>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  How urgent is solving this?
                </h2>
                <p className="text-stone-500 mb-6">
                  This helps us prioritize recommendations
                </p>
                <div className="space-y-3">
                  {[
                    { id: 'asap', label: 'ASAP - I need to free up time now', icon: <Zap className="w-5 h-5 text-red-500" /> },
                    { id: 'quarter', label: 'This quarter - Planning ahead', icon: <Calendar className="w-5 h-5 text-amber-500" /> },
                    { id: 'exploring', label: 'Exploring - Just want to understand the opportunity', icon: <Search className="w-5 h-5 text-blue-500" /> },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setAnswers({ ...answers, urgency: option.id })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                        answers.urgency === option.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      {option.icon}
                      <span className="font-medium text-stone-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-stone-200">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  step === 1
                    ? 'text-stone-300 cursor-not-allowed'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${
                  !canProceed()
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {step === totalSteps ? 'See My Results' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-purple-300 text-sm mt-6">
          Takes about 2 minutes. Your data is not stored.
        </p>
      </div>
    </div>
  );
};

// Wrapped export with error boundary
const AIAgentAuditWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <AIAgentAudit />
  </ErrorBoundary>
);

export default AIAgentAuditWithErrorBoundary;
