import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  Building2, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  RotateCcw, 
  Calendar, 
  Layers, 
  Inbox,
  Award
} from 'lucide-react';
import { CATEGORIES } from '../services/triageEngine';

export default function AnalyticsDashboard({ 
  grievances = [], 
  onTrackDocket,
  onNavigate 
}) {
  // State for interactive filtering & search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [activeTabMode, setActiveTabMode] = useState('disclosures'); // 'disclosures' | 'breakdown' | 'departments'
  const [inspectGrievance, setInspectGrievance] = useState(null);

  // Derive unique departments from grievances
  const departments = useMemo(() => {
    const set = new Set();
    grievances.forEach(g => {
      if (g.department) set.add(g.department);
    });
    return Array.from(set);
  }, [grievances]);

  // Dynamic KPI calculations
  const total = grievances.length;
  const resolvedList = grievances.filter(g => g.status === 'Resolved');
  const resolved = resolvedList.length;
  const active = total - resolved;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

  // Real Turnaround Calculation (average hours from submission to resolution)
  const avgTurnaroundHours = useMemo(() => {
    if (resolvedList.length === 0) return 36; // Default standard SLA reference
    let totalHours = 0;
    let count = 0;
    resolvedList.forEach(g => {
      const start = new Date(g.submittedAt).getTime();
      let end = null;
      if (g.resolutionOrder?.dateIssued) {
        end = new Date(g.resolutionOrder.dateIssued).getTime();
      }
      if (!end || isNaN(end)) {
        const resEvent = g.timeline?.find(t => 
          t.step.toLowerCase().includes('resolved') || 
          t.step.toLowerCase().includes('decree') || 
          t.step.toLowerCase().includes('order')
        );
        if (resEvent?.timestamp) {
          end = new Date(resEvent.timestamp).getTime();
        }
      }
      if (!end || isNaN(end)) {
        end = start + (g.slaHours || 48) * 0.7 * 3600 * 1000;
      }
      const diff = Math.max(1, (end - start) / (1000 * 60 * 60));
      totalHours += diff;
      count++;
    });
    return (totalHours / count).toFixed(1);
  }, [resolvedList]);

  // SLA Compliance %
  const slaComplianceRate = useMemo(() => {
    if (total === 0) return 100;
    const breached = grievances.filter(g => g.isBreached).length;
    return Math.round(((total - breached) / total) * 100);
  }, [grievances, total]);

  // Category counts (dynamic)
  const categoryCounts = useMemo(() => {
    const counts = {};
    Object.values(CATEGORIES).forEach(c => { counts[c] = 0; });
    grievances.forEach(g => {
      if (counts[g.category] !== undefined) {
        counts[g.category]++;
      } else if (g.category) {
        counts[g.category] = (counts[g.category] || 0) + 1;
      }
    });
    return counts;
  }, [grievances]);

  // Status counts (dynamic)
  const statusCounts = useMemo(() => {
    const statuses = ['Resolved', 'Under Review', 'Action Directed', 'Hearing Scheduled', 'Submitted'];
    return statuses.map(s => ({
      status: s,
      count: grievances.filter(g => g.status === s).length
    }));
  }, [grievances]);

  // Department distribution (dynamic)
  const departmentBreakdown = useMemo(() => {
    const map = {};
    grievances.forEach(g => {
      const dept = g.department || 'General Administration';
      if (!map[dept]) {
        map[dept] = { total: 0, resolved: 0, active: 0 };
      }
      map[dept].total++;
      if (g.status === 'Resolved') {
        map[dept].resolved++;
      } else {
        map[dept].active++;
      }
    });
    return Object.entries(map).map(([name, data]) => ({
      name,
      ...data,
      rate: data.total > 0 ? Math.round((data.resolved / data.total) * 100) : 0
    })).sort((a, b) => b.total - a.total);
  }, [grievances]);

  // Interactive filtering of grievances
  const filteredGrievances = useMemo(() => {
    return grievances.filter(g => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = g.id?.toLowerCase().includes(q);
        const matchSubject = g.subject?.toLowerCase().includes(q);
        const matchStatement = g.statement?.toLowerCase().includes(q);
        const matchDept = g.department?.toLowerCase().includes(q);
        const matchCat = g.category?.toLowerCase().includes(q);
        if (!matchId && !matchSubject && !matchStatement && !matchDept && !matchCat) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'ALL' && g.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL') {
        if (selectedStatus === 'Active' && g.status === 'Resolved') return false;
        if (selectedStatus !== 'Active' && g.status !== selectedStatus) return false;
      }

      // Department filter
      if (selectedDepartment !== 'ALL' && g.department !== selectedDepartment) {
        return false;
      }

      // Priority filter
      if (selectedPriority !== 'ALL' && !g.priority?.startsWith(selectedPriority)) {
        return false;
      }

      return true;
    });
  }, [grievances, searchQuery, selectedCategory, selectedStatus, selectedDepartment, selectedPriority]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || selectedDepartment !== 'ALL' || selectedPriority !== 'ALL';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedDepartment('ALL');
    setSelectedPriority('ALL');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Clock className="w-3 h-3" /> Under Review
          </span>
        );
      case 'Action Directed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" /> Action Directed
          </span>
        );
      case 'Hearing Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Calendar className="w-3 h-3" /> Hearing Scheduled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-neutral-300 border border-white/20">
            <Inbox className="w-3 h-3" /> {status || 'Submitted'}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority = '') => {
    if (priority.includes('P1') || priority.toLowerCase().includes('critical') || priority.toLowerCase().includes('urgent')) {
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">P1 Urgent</span>;
    }
    if (priority.includes('P2') || priority.toLowerCase().includes('high')) {
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">P2 High</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10">P3 Standard</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Statutory Registry
            </span>
            <span className="text-xs text-neutral-400 font-mono">UGC Regulations, 2023 Compliant</span>
          </div>
          <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Public Statistics & Grievance Disclosures
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-2xl">
            Interactive institutional registry. Every grievance filed dynamically updates this public transparency feed in real time.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {onNavigate && (
            <button
              onClick={() => onNavigate('submit')}
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>File Grievance</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive KPI 4-Card Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        {/* Total Filed */}
        <button
          onClick={() => { resetAllFilters(); setActiveTabMode('disclosures'); }}
          className={`text-left p-5 rounded-2xl bg-white/[0.02] border transition-all cursor-pointer ${
            !hasActiveFilters 
              ? 'border-white/30 shadow-md bg-white/[0.04]' 
              : 'border-white/[0.08] hover:border-white/20'
          }`}
          title="Click to view all filed complaints"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400">
              Total Filed
            </span>
            <Layers className="w-4 h-4 text-neutral-400" />
          </div>
          <span className="font-poppins text-3xl font-bold text-white block">
            {total}
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Click to view all dockets
          </span>
        </button>

        {/* Resolution Rate */}
        <button
          onClick={() => { setSelectedStatus('Resolved'); setActiveTabMode('disclosures'); }}
          className={`text-left p-5 rounded-2xl bg-white/[0.02] border transition-all cursor-pointer ${
            selectedStatus === 'Resolved' 
              ? 'border-emerald-500/40 shadow-md bg-emerald-500/[0.03]' 
              : 'border-white/[0.08] hover:border-emerald-500/20'
          }`}
          title="Click to filter resolved cases"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400">
              Resolution Rate
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-poppins text-3xl font-bold text-emerald-400">
              {resolutionRate}%
            </span>
            <span className="text-xs text-neutral-400 font-mono">({resolved}/{total})</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            UGC Benchmark: 90%
          </span>
        </button>

        {/* Avg Turnaround */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400">
              Avg Turnaround
            </span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <span className="font-poppins text-3xl font-bold text-white block">
            {avgTurnaroundHours}h
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Calculated across resolutions
          </span>
        </div>

        {/* Active In-Process */}
        <button
          onClick={() => { setSelectedStatus('Active'); setActiveTabMode('disclosures'); }}
          className={`text-left p-5 rounded-2xl bg-white/[0.02] border transition-all cursor-pointer ${
            selectedStatus === 'Active' 
              ? 'border-amber-500/40 shadow-md bg-amber-500/[0.03]' 
              : 'border-white/[0.08] hover:border-amber-500/20'
          }`}
          title="Click to view open active complaints"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400">
              Active Cases
            </span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-poppins text-3xl font-bold text-amber-400 block">
            {active}
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            In standing committee review
          </span>
        </button>

      </div>

      {/* Navigation View Modes */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] mb-8 pb-3">
        <div className="flex items-center gap-2 sm:gap-6 text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setActiveTabMode('disclosures')}
            className={`pb-2 transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTabMode === 'disclosures'
                ? 'text-white border-white font-semibold'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Grievance Transparency Disclosures ({filteredGrievances.length})</span>
          </button>

          <button
            onClick={() => setActiveTabMode('breakdown')}
            className={`pb-2 transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTabMode === 'breakdown'
                ? 'text-white border-white font-semibold'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Category & SLA Analytics</span>
          </button>

          <button
            onClick={() => setActiveTabMode('departments')}
            className={`pb-2 transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTabMode === 'departments'
                ? 'text-white border-white font-semibold'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Departmental Redressal Matrix</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Interactive Filter Suite */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-8 space-y-4">
        
        {/* Row 1: Search & Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Live Search Bar */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search docket, subject, keyword, department, roll number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by grievance status"
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-200 focus:outline-none focus:border-white/30 transition-all font-sans cursor-pointer"
            >
              <option value="ALL">All Statuses ({total})</option>
              <option value="Active">All Active Cases ({active})</option>
              <option value="Resolved">Resolved ({resolved})</option>
              <option value="Under Review">Under Review</option>
              <option value="Action Directed">Action Directed</option>
              <option value="Hearing Scheduled">Hearing Scheduled</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              aria-label="Filter by academic department"
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-200 focus:outline-none focus:border-white/30 transition-all font-sans cursor-pointer truncate"
            >
              <option value="ALL">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Row 2: Category Quick Filters (Scrollable / Wrap pills) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>

          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-white text-black font-semibold border-white shadow-sm'
                : 'text-neutral-400 border-white/10 hover:border-white/20 hover:text-white bg-white/[0.01]'
            }`}
          >
            All Categories ({total})
          </button>

          {Object.entries(categoryCounts).map(([cat, count]) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white text-black font-semibold border-white shadow-sm'
                    : 'text-neutral-400 border-white/10 hover:border-white/20 hover:text-white bg-white/[0.01]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* MAIN VIEW 1: Grievance Transparency Disclosures */}
      {activeTabMode === 'disclosures' && (
        <div className="space-y-4">
          
          {/* Header count & status */}
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredGrievances.length}</strong> of {total} public grievance disclosures
            </span>
            {hasActiveFilters && (
              <span className="text-amber-400/90 font-mono text-[11px]">
                Filtered view active
              </span>
            )}
          </div>

          {/* List of Grievance Disclosure Cards */}
          {filteredGrievances.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <Inbox className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-medium text-white mb-1">No matching grievances found</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mb-4">
                No filed complaints match your current search and filter selections.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredGrievances.map((g) => {
                const isResolved = g.status === 'Resolved';
                const filingDate = g.submittedAt ? new Date(g.submittedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }) : 'Official Record';

                return (
                  <div
                    key={g.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group"
                  >
                    
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold text-white bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/10">
                          {g.id}
                        </span>
                        {getPriorityBadge(g.priority)}
                        <span className="text-xs text-neutral-400 font-sans flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-400" /> Filed: {filingDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(g.status)}
                      </div>
                    </div>

                    {/* Department & Category */}
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                      <span className="text-neutral-400 font-sans">Category:</span>
                      <span className="px-2 py-0.5 rounded text-[11px] bg-white/[0.04] text-neutral-200 border border-white/[0.08]">
                        {g.category}
                      </span>
                      {g.department && (
                        <>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-400 font-sans flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-neutral-400" /> {g.department}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Subject */}
                    <h3 className="font-poppins text-base font-semibold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                      {g.subject}
                    </h3>

                    {/* Statement Preview */}
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4 line-clamp-2">
                      {g.statement}
                    </p>

                    {/* Bottom Action Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
                      
                      {/* Assigned Committee */}
                      <div className="text-[11px] text-neutral-400 font-sans flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>Assigned to: <strong className="text-neutral-300 font-normal">{g.committee?.name || 'Standing Redressal Desk'}</strong></span>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        
                        <button
                          onClick={() => setInspectGrievance(g)}
                          className="px-3 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
                        >
                          View Details
                        </button>

                        {onTrackDocket && (
                          <button
                            onClick={() => onTrackDocket(g.id)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <span>Track Docket</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* MAIN VIEW 2: Category & SLA Analytics */}
      {activeTabMode === 'breakdown' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category Breakdown */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-poppins text-base font-medium text-white">
                  Category Distribution
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">Click any category to filter the public disclosures</p>
              </div>
              <BarChart3 className="w-4 h-4 text-neutral-400" />
            </div>

            <div className="space-y-4">
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(isSelected ? 'ALL' : cat);
                      setActiveTabMode('disclosures');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer ${
                      isSelected ? 'bg-white/[0.06] border border-white/20' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-neutral-300 font-light truncate pr-2">{cat}</span>
                      <span className="text-neutral-400 font-mono shrink-0">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSelected ? 'bg-white' : 'bg-white/40'
                        }`}
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status & SLA Distribution */}
          <div className="space-y-6">
            
            {/* Status Breakdown */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <h2 className="font-poppins text-base font-medium text-white mb-6">
                Lifecycle Status Distribution
              </h2>
              <div className="space-y-4">
                {statusCounts.map((s) => {
                  const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
                  return (
                    <button
                      key={s.status}
                      onClick={() => {
                        setSelectedStatus(s.status);
                        setActiveTabMode('disclosures');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-white/[0.03] transition-all cursor-pointer"
                    >
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-neutral-300 font-light">{s.status}</span>
                        <span className="text-neutral-400 font-mono">{s.count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400/60 rounded-full transition-all duration-500" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SLA Benchmark Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-crest-gold" />
                <h3 className="text-sm font-semibold text-white">Statutory SLA Compliance</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Under UGC Student Grievance Redressal Regulations 2023, all cases must be triaged within 24 hours and addressed according to assigned priority limits.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">Adherence Rate</span>
                  <span className="text-xl font-bold text-emerald-400 font-poppins">{slaComplianceRate}%</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">Standard Turnaround</span>
                  <span className="text-xl font-bold text-white font-poppins">{avgTurnaroundHours}h</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* MAIN VIEW 3: Departmental Redressal Matrix */}
      {activeTabMode === 'departments' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <h2 className="font-poppins text-base font-semibold text-white mb-1">
              Departmental Grievance Matrix
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Real-time distribution of complaints across faculties, branches, and administrative wings. Click any department to inspect its specific filings.
            </p>

            <div className="space-y-4">
              {departmentBreakdown.map((dept) => {
                const isSelected = selectedDepartment === dept.name;
                return (
                  <div
                    key={dept.name}
                    className={`p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-white/[0.05] border-white/30' 
                        : 'bg-white/[0.01] border-white/[0.06] hover:border-white/15'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-medium text-white">
                          {dept.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-neutral-400">Total: <strong className="text-white">{dept.total}</strong></span>
                        <span className="text-emerald-400">Resolved: {dept.resolved}</span>
                        <span className="text-amber-400">Active: {dept.active}</span>
                        <button
                          onClick={() => {
                            setSelectedDepartment(isSelected ? 'ALL' : dept.name);
                            setActiveTabMode('disclosures');
                          }}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans transition-colors cursor-pointer ml-2"
                        >
                          View Disclosures
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ width: `${dept.rate}%` }} 
                        title={`Resolved: ${dept.rate}%`}
                      />
                      <div 
                        className="h-full bg-amber-500/80 transition-all duration-500" 
                        style={{ width: `${100 - dept.rate}%` }} 
                        title={`Active: ${100 - dept.rate}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Detail Inspection Modal */}
      {inspectGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0C121E] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            
            {/* Modal Close */}
            <button
              onClick={() => setInspectGrievance(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                  {inspectGrievance.id}
                </span>
                {getStatusBadge(inspectGrievance.status)}
                {getPriorityBadge(inspectGrievance.priority)}
              </div>
              <h2 className="font-poppins text-lg font-semibold text-white">
                {inspectGrievance.subject}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                  Department & Category
                </span>
                <p className="text-neutral-200">
                  {inspectGrievance.department || 'General Administration'} • {inspectGrievance.category}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                  Statement of Grievance
                </span>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-neutral-300 leading-relaxed font-light">
                  {inspectGrievance.statement}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                  Assigned Redressal Committee
                </span>
                <p className="text-neutral-200">
                  {inspectGrievance.committee?.name || 'Central Standing Committee'}
                </p>
                {inspectGrievance.committee?.officer && (
                  <p className="text-neutral-400 text-[11px] mt-0.5">
                    Nodal Officer: {inspectGrievance.committee.officer}
                  </p>
                )}
              </div>

              {/* Resolution Order if exists */}
              {inspectGrievance.resolutionOrder && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block mb-1">
                    Formal Resolution Order Enacted
                  </span>
                  <h4 className="text-xs font-semibold text-white mb-1">
                    {inspectGrievance.resolutionOrder.decreeTitle}
                  </h4>
                  <p className="text-[11px] text-neutral-300">
                    {inspectGrievance.resolutionOrder.summaryFindings}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setInspectGrievance(null)}
                className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
              {onTrackDocket && (
                <button
                  onClick={() => {
                    const id = inspectGrievance.id;
                    setInspectGrievance(null);
                    onTrackDocket(id);
                  }}
                  className="px-4 py-2 bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-200 transition-colors cursor-pointer shadow"
                >
                  <span>Open Full Tracker</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
