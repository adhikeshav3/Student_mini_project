import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import GrievanceForm from './components/GrievanceForm';
import GrievanceTracker from './components/GrievanceTracker';
import ResolutionDocument from './components/ResolutionDocument';
import OfficerWorkbench from './components/OfficerWorkbench';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PolicyDirectory from './components/PolicyDirectory';
import AppealModal from './components/AppealModal';
import FeedbackModal from './components/FeedbackModal';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

import { 
  getStoredGrievances, 
  createNewGrievance, 
  updateGrievanceStatus, 
  issueResolutionOrder, 
  lodgeAppealToOmbudsperson, 
  closeGrievanceWithFeedback, 
  resetToDefaults 
} from './services/storageService';

import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [grievances, setGrievances] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDocketId, setSelectedDocketId] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals
  const [viewingOrderGrievance, setViewingOrderGrievance] = useState(null);
  const [appealGrievance, setAppealGrievance] = useState(null);
  const [feedbackGrievance, setFeedbackGrievance] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const list = getStoredGrievances();
    setGrievances(list);
    if (list.length > 0 && !selectedDocketId) {
      setSelectedDocketId(list[0].id);
    }
  }, []);

  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('apex_user', JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
    showToast(
      'Signed In Successfully',
      `Welcome, ${user.name} (${user.id}).`
    );
    if (user.role === 'officer') {
      setActiveTab('workbench');
    } else {
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('apex_user');
    } catch (err) {
      console.error(err);
    }
    setActiveTab('home');
    showToast('Signed Out', 'You have been safely signed out of the portal.');
  };

  const handleSearchDocket = (id) => {
    setSelectedDocketId(id);
    setActiveTab('track');
  };

  const handleCreateGrievance = (formData) => {
    const newDoc = createNewGrievance({
      ...formData,
      studentName: currentUser?.name || formData.studentName,
      rollNumber: currentUser?.id || formData.rollNumber
    });
    setGrievances(getStoredGrievances());
    setSelectedDocketId(newDoc.id);
    showToast(
      'Statutory Docket Registered',
      `Docket ${newDoc.id} generated with Priority ${newDoc.priority}. Routed to ${newDoc.committee.name}.`
    );
    return newDoc;
  };

  const handleUpdateStatus = (docketId, newStatus, officerName, note) => {
    updateGrievanceStatus(docketId, newStatus, officerName, note);
    setGrievances(getStoredGrievances());
    showToast(
      'Case Status Updated',
      `Docket ${docketId} transitioned to '${newStatus}'.`
    );
  };

  const handleIssueOrder = (docketId, orderDetails) => {
    issueResolutionOrder(docketId, orderDetails);
    setGrievances(getStoredGrievances());
    showToast(
      'Formal Resolution Order Enacted',
      `Decree issued by ${orderDetails.authorityName}. Directives enforced.`
    );
  };

  const handleSubmitAppeal = (docketId, reason, additionalEvidence) => {
    lodgeAppealToOmbudsperson(docketId, reason, additionalEvidence);
    setGrievances(getStoredGrievances());
    showToast(
      'Statutory First Appeal Registered',
      `Docket ${docketId} elevated to the University Ombudsperson Bench.`,
      'urgent'
    );
  };

  const handleSubmitFeedback = (docketId, rating, feedback) => {
    closeGrievanceWithFeedback(docketId, rating, feedback);
    setGrievances(getStoredGrievances());
    showToast(
      'Grievance Closed Successfully',
      `Docket ${docketId} marked as resolved. Rating: ${rating}/5 Stars.`
    );
  };

  const handleResetData = () => {
    if (window.confirm('Restore official sample university grievances database? This will refresh all demonstration dockets.')) {
      const fresh = resetToDefaults();
      setGrievances(fresh);
      setSelectedDocketId(fresh[0].id);
      showToast('Database Restored', 'Institutional demonstration seeds successfully reloaded.');
    }
  };

  // If user is not authenticated, display the Login Gateway!
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const pendingActionCount = grievances.filter(g => g.status !== 'Resolved').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#060A12] text-white font-sans selection:bg-crest-gold/20">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full bg-[#0E1524] text-white p-4 rounded-xl shadow-2xl border border-crest-gold/40 flex items-start gap-3 animate-slideIn">
          <div className="p-1 rounded-lg bg-crest-gold/20 text-crest-goldLight shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 text-crest-gold" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold font-serif text-white uppercase tracking-wider">
              {toastMessage.title}
            </h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
              {toastMessage.message}
            </p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white text-xs px-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={pendingActionCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Tab View Routing */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            <HeroBanner 
              onSearchDocket={handleSearchDocket} 
              onNavigate={(tab) => setActiveTab(tab)}
              grievances={grievances}
            />

            {/* Minimal Docket Stream */}
            <div className="max-w-7xl mx-auto px-6 py-12 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-poppins text-lg font-medium text-white tracking-tight">
                    Active Docket Pipeline
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Live summary of statutory matters currently under review
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('track')}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer font-mono"
                >
                  View All ({grievances.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {grievances.slice(0, 3).map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      setSelectedDocketId(g.id);
                      setActiveTab('track');
                    }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs text-neutral-400 group-hover:text-white transition-colors">
                          {g.id}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-white/10 text-neutral-300">
                          {g.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-medium text-white line-clamp-2 leading-relaxed mb-4">
                        {g.subject}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-white/[0.06] font-mono text-[11px]">
                      <span>{g.category}</span>
                      <span className="text-neutral-400">{g.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'submit' && (
          <GrievanceForm 
            onSubmitGrievance={handleCreateGrievance}
            onTrackGrievance={(id) => {
              setSelectedDocketId(id);
              setActiveTab('track');
            }}
          />
        )}

        {activeTab === 'track' && (
          <GrievanceTracker 
            grievances={grievances}
            selectedDocketId={selectedDocketId}
            onViewOrder={(g) => setViewingOrderGrievance(g)}
            onOpenFeedback={(g) => setFeedbackGrievance(g)}
            onOpenAppeal={(g) => setAppealGrievance(g)}
          />
        )}

        {activeTab === 'policies' && (
          <PolicyDirectory />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard grievances={grievances} />
        )}

        {activeTab === 'workbench' && (
          <OfficerWorkbench 
            grievances={grievances}
            onUpdateStatus={handleUpdateStatus}
            onIssueOrder={handleIssueOrder}
            onViewDocket={(id) => {
              setSelectedDocketId(id);
              setActiveTab('track');
            }}
          />
        )}
      </main>

      {/* Official Resolution Document Print/View Modal */}
      {viewingOrderGrievance && (
        <ResolutionDocument 
          grievance={viewingOrderGrievance} 
          onClose={() => setViewingOrderGrievance(null)} 
        />
      )}

      {/* Statutory Appeal Modal */}
      {appealGrievance && (
        <AppealModal 
          grievance={appealGrievance} 
          onClose={() => setAppealGrievance(null)}
          onSubmitAppeal={handleSubmitAppeal}
        />
      )}

      {/* Student Feedback & Closure Modal */}
      {feedbackGrievance && (
        <FeedbackModal 
          grievance={feedbackGrievance}
          onClose={() => setFeedbackGrievance(null)}
          onSubmitFeedback={handleSubmitFeedback}
        />
      )}

      {/* Institutional Footer */}
      <Footer onResetData={handleResetData} />

    </div>
  );
}
