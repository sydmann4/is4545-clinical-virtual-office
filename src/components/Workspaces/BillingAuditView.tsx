import React, { useState } from 'react';
import { BillingDashboardResults, PatientRecord, BillingAccountItem } from '../../types';
import { 
  Calculator, 
  Search, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Receipt, 
  FileCheck, 
  CreditCard,
  Building,
  ShieldCheck,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';

interface BillingAuditViewProps {
  results: BillingDashboardResults;
  records: PatientRecord[];
}

export const BillingAuditView: React.FC<BillingAuditViewProps> = ({
  results,
  records,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuditFilter, setSelectedAuditFilter] = useState<string>('All');
  const [selectedAccount, setSelectedAccount] = useState<BillingAccountItem | null>(null);

  // Filter accounts
  const filteredAccounts = results.accounts.filter((acc) => {
    const matchesFilter = 
      selectedAuditFilter === 'All' ||
      (selectedAuditFilter === 'Discrepancies' && acc.accountAuditFlag !== 'Clean') ||
      acc.accountAuditFlag === selectedAuditFilter;

    const matchesSearch =
      acc.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-yellow-950/60 border border-amber-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-500/30">
                  AGENT 106 • REVENUE CYCLE & ACCOUNT AUDIT CHAMBER
                </span>
                <span className="text-xs text-slate-400 font-mono">Elena Rostova, CPA</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Patient Billing Reconciliation & Account Audit Dashboard
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Rigorous financial ledger verification applying the verified formula: <span className="font-mono text-amber-300">Outstanding = Charges − Ins. Paid − Pt. Paid − Adjustments</span>. Identifies unverified charges, duplicate transactions, and pending clearinghouse items.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 font-mono">Audit Queue Variances</div>
              <div className="text-xl font-bold text-rose-400 font-mono">
                {results.totals.totalDiscrepanciesCount} Discrepant Accounts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task 2 & 5: Financial Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400">Total Posted Charges</div>
          <div className="text-lg font-bold font-mono text-white">
            ${results.totals.totalCharges.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Gross billed volume</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400">Insurance Payments</div>
          <div className="text-lg font-bold font-mono text-emerald-400">
            ${results.totals.totalInsurancePayments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Posted remittances</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400">Patient Payments</div>
          <div className="text-lg font-bold font-mono text-cyan-400">
            ${results.totals.totalPatientPayments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Copays & deductibles</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400">Approved Adjustments</div>
          <div className="text-lg font-bold font-mono text-indigo-400">
            ${results.totals.totalAdjustments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Contractual write-offs</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400">Verified Outstanding</div>
          <div className="text-lg font-bold font-mono text-amber-400">
            ${results.totals.totalOutstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Mathematical balance</div>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
          <div className="text-[11px] text-rose-300 font-semibold">Ledger Variances</div>
          <div className="text-lg font-bold font-mono text-rose-400">
            ${results.totals.totalDiscrepantDollarAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-rose-400/80 font-mono">{results.totals.totalDiscrepanciesCount} accounts flagged</div>
        </div>
      </div>

      {/* Task 1 & 4: Patient Account Lookup & Account Review Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Ledger Filter:</span>
          {['All', 'Discrepancies', 'Duplicate Charge', 'Clean', 'Missing Insurance EOB'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedAuditFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedAuditFilter === f
                  ? 'bg-amber-600 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Lookup by Patient ID (PT-XXXX) or Account #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>
      </div>

      {/* Selected Account Deep-Dive Modal / Panel */}
      {selectedAccount && (
        <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500/50 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white font-mono">
                TASK 1-4 DETAILED AUDIT: {selectedAccount.patientId} • {selectedAccount.accountNumber}
              </h3>
            </div>
            <button
              onClick={() => setSelectedAccount(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Close Ledger Card
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Posted Charges</span>
              <div className="text-sm font-bold text-white">${selectedAccount.totalPostedCharges.toFixed(2)}</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Ins. Payments</span>
              <div className="text-sm font-bold text-emerald-400">-${selectedAccount.postedInsurancePayments.toFixed(2)}</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Pt. Payments</span>
              <div className="text-sm font-bold text-cyan-400">-${selectedAccount.postedPatientPayments.toFixed(2)}</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Approved Adjustments</span>
              <div className="text-sm font-bold text-indigo-400">-${selectedAccount.approvedCreditsAdjustments.toFixed(2)}</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-amber-500/40">
              <span className="text-[10px] text-amber-300 font-bold">= Calculated Balance</span>
              <div className="text-sm font-bold text-amber-300">${selectedAccount.calculatedBalance.toFixed(2)}</div>
            </div>
          </div>

          {selectedAccount.discrepancyExplanation && (
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 space-y-1">
              <div className="font-bold uppercase tracking-wider text-[11px] text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Ledger Variance Discrepancy Detected
              </div>
              <p>{selectedAccount.discrepancyExplanation}</p>
              <p className="text-amber-300 font-semibold pt-1 border-t border-rose-500/20">
                Audit Directive: {selectedAccount.auditActionRequired}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Task 5: Interactive Accounts Ledger Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            Verified Patient Account Ledger ({filteredAccounts.length} Accounts Displayed)
          </h4>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any row for complete formula breakdown
          </span>
        </div>

        <div className="overflow-x-auto text-xs font-sans">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Patient ID</th>
                <th className="p-3">Account #</th>
                <th className="p-3 text-right">Charges</th>
                <th className="p-3 text-right">Insurance Paid</th>
                <th className="p-3 text-right">Patient Paid</th>
                <th className="p-3 text-right">Adjustments</th>
                <th className="p-3 text-right">Calculated Bal.</th>
                <th className="p-3 text-right">Recorded Bal.</th>
                <th className="p-3 text-right">Variance</th>
                <th className="p-3">Audit Flag</th>
                <th className="p-3">Action Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAccounts.map((acc) => {
                const hasVariance = Math.abs(acc.discrepancyAmount) > 0.01;

                return (
                  <tr
                    key={acc.patientId}
                    onClick={() => setSelectedAccount(acc)}
                    className={`cursor-pointer transition-colors ${
                      hasVariance ? 'bg-rose-950/15 hover:bg-rose-950/30' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-3 font-mono font-bold text-amber-400">
                      {acc.patientId}
                    </td>
                    <td className="p-3 font-mono text-slate-300">
                      {acc.accountNumber}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300">
                      ${acc.totalPostedCharges.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-400">
                      ${acc.postedInsurancePayments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono text-cyan-400">
                      ${acc.postedPatientPayments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono text-indigo-400">
                      ${acc.approvedCreditsAdjustments.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-amber-300">
                      ${acc.calculatedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono font-semibold text-white">
                      ${acc.recordedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right font-mono font-bold">
                      {hasVariance ? (
                        <span className="text-rose-400">
                          +${acc.discrepancyAmount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-emerald-400">$0.00</span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        acc.accountAuditFlag === 'Clean'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : acc.accountAuditFlag === 'Duplicate Charge'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40 font-bold'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}>
                        {acc.accountAuditFlag}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300 text-[11px] max-w-xs truncate" title={acc.auditActionRequired}>
                      {acc.auditActionRequired}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
