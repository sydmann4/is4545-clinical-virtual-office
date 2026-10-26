import React, { useState, useRef } from 'react';
import { PatientRecord } from '../../types';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Download, 
  RefreshCw, 
  Eye, 
  Table, 
  Lock, 
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  DEFAULT_PATIENT_RECORDS, 
  parseCSVToPatientRecords, 
  exportDatasetToCSV 
} from '../../data/defaultPatientData';

interface DataHubViewProps {
  records: PatientRecord[];
  datasetName: string;
  onUpdateRecords: (records: PatientRecord[], name: string) => void;
  onProceedToAgents: () => void;
}

export const DataHubView: React.FC<DataHubViewProps> = ({
  records,
  datasetName,
  onUpdateRecords,
  onProceedToAgents,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [parseWarnings, setParseWarnings] = useState<string[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [selectedPreviewTab, setSelectedPreviewTab] = useState<'table' | 'schema' | 'privacy'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const { records: parsedRecords, warnings, errors } = parseCSVToPatientRecords(text);
        setParseWarnings(warnings);
        setParseErrors(errors);
        if (parsedRecords.length > 0) {
          onUpdateRecords(parsedRecords, file.name);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleRestoreDefault = () => {
    onUpdateRecords(DEFAULT_PATIENT_RECORDS, 'St. Jude & Memorial Health Q3 Patient & Billing Dataset (Synthetic)');
    setParseWarnings([]);
    setParseErrors([]);
  };

  const handleDownloadCSV = () => {
    const csv = exportDatasetToCSV(records);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${datasetName.replace(/[\s/]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter records
  const filteredRecords = records.filter(r => 
    r.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.serviceLine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.persona.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.patientComment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
              Secure Data Gateway
            </span>
            <span className="text-xs text-slate-400 font-mono">HIPAA Safe Harbor Compliant</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1.5">
            Clinical Dataset Ingestion & Validation
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Upload or inspect the primary clinical encounter and billing dataset. Validated records are made available simultaneously to all six virtual-office AI agents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRestoreDefault}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
            <span>Load St. Jude 24-Pt Benchmark</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={onProceedToAgents}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 hover:from-teal-300 hover:to-emerald-300 transition-all shadow-md"
          >
            <span>Configure AI Agents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Upload Dropzone & Privacy Safety Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-2 rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-teal-400 bg-teal-950/20 shadow-[0_0_25px_rgba(20,184,166,0.2)]'
              : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white">
            Drag & Drop Clinical CSV Dataset Here
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Supports patient narratives, experience ratings, follow-up flags, AI risk tags, and revenue cycle account ledger columns.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Browse Local Files (.csv)
            </span>
          </div>
        </div>

        {/* Responsible Use & De-identification Safeguards Panel */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4" />
              Patient Privacy & De-Identification Safeguards
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This clinical portal operates strictly on <strong className="text-white">de-identified, synthetic, or authorized institutional data</strong> under HIPAA Safe Harbor (§164.514). Direct identifiers (names, full SSNs, exact addresses) are automatically masked.
            </p>
            <div className="mt-3 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero real PHI transmission to third-party endpoints.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mathematical verification before financial dispute routing.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Human review required before acting on high-risk findings.</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Active Dataset: <strong className="text-white truncate">{datasetName}</strong></span>
          </div>
        </div>
      </div>

      {/* Parser Warnings or Errors */}
      {parseErrors.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 space-y-1">
          <div className="font-bold flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            Dataset Parsing Errors:
          </div>
          {parseErrors.map((err, i) => (
            <p key={i}>• {err}</p>
          ))}
        </div>
      )}

      {parseWarnings.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-300 space-y-1">
          <div className="font-bold flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            Dataset Validation Warnings:
          </div>
          {parseWarnings.map((warn, i) => (
            <p key={i}>• {warn}</p>
          ))}
        </div>
      )}

      {/* Dataset Preview & Inspector */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        {/* Tab Header & Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPreviewTab('table')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedPreviewTab === 'table'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Records Table ({records.length})</span>
            </button>
            <button
              onClick={() => setSelectedPreviewTab('schema')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedPreviewTab === 'schema'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Detected Schema (21 Columns)</span>
            </button>
            <button
              onClick={() => setSelectedPreviewTab('privacy')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedPreviewTab === 'privacy'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>De-identification Checklist</span>
            </button>
          </div>

          {selectedPreviewTab === 'table' && (
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search patient records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          )}
        </div>

        {/* Table View */}
        {selectedPreviewTab === 'table' && (
          <div className="overflow-x-auto max-h-[460px] text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Persona / Age</th>
                  <th className="p-3">Service Line</th>
                  <th className="p-3">Visit Type</th>
                  <th className="p-3 text-center">Satisfaction</th>
                  <th className="p-3">AI Risk Flag</th>
                  <th className="p-3">Patient Narrative / Comment</th>
                  <th className="p-3 text-right">Posted Charges</th>
                  <th className="p-3 text-right">Balance Due</th>
                  <th className="p-3">Billing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredRecords.map((r) => (
                  <tr key={r.patientId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-teal-400 whitespace-nowrap">
                      {r.patientId}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-medium text-white">{r.persona}</div>
                      <div className="text-[10px] text-slate-400">{r.ageGroup} yrs</div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-300">
                      {r.serviceLine}
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-400">
                      {r.visitType}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                        r.satisfaction >= 4
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : r.satisfaction === 3
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      }`}>
                        {r.satisfaction}/5
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {r.aiRiskFlag === 'Normal' ? (
                        <span className="text-[11px] text-slate-500">Normal</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          {r.aiRiskFlag}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-300 max-w-sm truncate" title={r.patientComment}>
                      {r.patientComment}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300">
                      ${r.totalPostedCharges.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono font-semibold text-white">
                      ${r.recordedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        r.paymentStatus === 'Paid in Full'
                          ? 'bg-emerald-950 text-emerald-300'
                          : r.paymentStatus === 'Discrepancy Flagged' || r.paymentStatus === 'Duplicate Transaction Flag'
                          ? 'bg-rose-950 text-rose-300 font-bold border border-rose-500/30'
                          : 'bg-amber-950 text-amber-300'
                      }`}>
                        {r.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Schema View */}
        {selectedPreviewTab === 'schema' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            {[
              { col: 'Patient_ID', type: 'String (Masked)', desc: 'De-identified surrogate identifier (PT-XXXX)' },
              { col: 'Account_Number', type: 'String (Masked)', desc: 'Masked institutional billing ledger key' },
              { col: 'Persona', type: 'Categorical', desc: 'Clinical demographic persona & medical situation' },
              { col: 'Age_Group', type: 'String (Binned)', desc: 'Age bracket (e.g. 0-17, 18-24, 75-84, 85+)' },
              { col: 'Visit_Type', type: 'Enum', desc: 'Emergency, Outpatient, Surgery, Telehealth, Urgent' },
              { col: 'Service_Line', type: 'Enum', desc: 'ED, Cardiology, Ortho, Pediatrics, Oncology, etc.' },
              { col: 'Satisfaction_1to5', type: 'Integer [1-5]', desc: 'CAHPS overall experience score' },
              { col: 'Communication_Rating_1to5', type: 'Integer [1-5]', desc: 'Clinician communication rating' },
              { col: 'Follow_Up_Compliance', type: 'Enum [Yes/No/Partial]', desc: 'Adherence to discharge instructions' },
              { col: 'Complaint_Severity', type: 'Enum [Routine/Mod/High/Critical]', desc: 'Pre-triaged patient grievance level' },
              { col: 'Portal_Usage', type: 'Enum', desc: 'Active, Inactive, Blocked/Issues, Never Enrolled' },
              { col: 'Readmission_Risk', type: 'Enum [Low/Med/High]', desc: '30-day readmission statistical projection' },
              { col: 'AI_Risk_Flag', type: 'Enum', desc: 'Hallucination Risk, Bias Review, Human Review' },
              { col: 'Patient_Comment', type: 'Text (Unstructured)', desc: 'Qualitative patient narrative verbatim' },
              { col: 'Total_Posted_Charges', type: 'Float ($)', desc: 'Gross institutional billed charges' },
              { col: 'Posted_Insurance_Payments', type: 'Float ($)', desc: 'Remitted primary & secondary insurer payments' },
              { col: 'Posted_Patient_Payments', type: 'Float ($)', desc: 'Patient copays and deductibles collected' },
              { col: 'Approved_Credits_Adjustments', type: 'Float ($)', desc: 'Contractual write-offs and approved credits' },
              { col: 'Recorded_Balance', type: 'Float ($)', desc: 'Balance currently posted on patient ledger' },
              { col: 'Payment_Status', type: 'Enum', desc: 'Paid in Full, Balance Due, Discrepancy Flag' },
              { col: 'Notes', type: 'Text', desc: 'Clinical notes, audit comments, or incident logs' },
            ].map((col, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-300">{col.col}</span>
                  <span className="text-[10px] text-slate-500">{col.type}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{col.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Privacy Safeguards View */}
        {selectedPreviewTab === 'privacy' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 text-teal-200">
              <ShieldAlert className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <h4 className="font-bold">De-Identification Verification Status: PASS</h4>
                <p className="text-xs text-teal-300/80 mt-0.5">
                  All 18 HIPAA Safe Harbor identifiers (§164.514(b)(2)) have been removed or masked prior to agent processing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">
                  Guaranteed Protections
                </h5>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    No patient names, full addresses, or contact information
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Ages binned into statistical demographic ranges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Account keys replaced with non-traceable tokens
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Isolated client-side memory storage
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">
                  Clinical AI Decision Boundaries
                </h5>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    Agents provide decision-support analysis, not autonomous diagnosis
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    No automated medication prescription or treatment alters
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    All high-risk findings routed through human review gates
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    Financial disputes flagged for manual billing review
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
