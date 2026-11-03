import React, { useState, useEffect } from 'react';
import { Inbox, Trash2, Mail, Phone, Building, Calendar, CheckCircle, Clock, Filter, MessageSquare } from 'lucide-react';
import { leadService } from '../../services/api';

export const ManageLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await leadService.getAll();
      if (res.data.success) {
        setLeads(res.data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await leadService.updateStatus(id, { status: newStatus });
      fetchLeads();
    } catch (err) {
      console.error('Update status failed:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      await leadService.updateStatus(selectedLead._id, { notes: noteInput });
      setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      console.error('Save notes failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead record permanently?')) return;
    try {
      await leadService.delete(id);
      fetchLeads();
    } catch (err) {
      console.error('Delete lead failed:', err);
    }
  };

  const filteredLeads = filter === 'All'
    ? leads
    : leads.filter(l => l.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-indigo-400" />
            <span>Inbound Leads CRM & Sales Pipeline</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time inquiries captured from "Get a Quote" and "Contact Us" forms.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {['All', 'New', 'Contacted', 'Converted'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Prospect</th>
                <th className="py-3.5 px-4">Service & Budget</th>
                <th className="py-3.5 px-4">Inquiry Message</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-white text-sm">{lead.name}</p>
                    <p className="text-indigo-400 text-[11px]">{lead.email}</p>
                    <p className="text-slate-400 text-[11px]">{lead.phone || 'No phone'} • {lead.company || 'Individual'}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-slate-200">{lead.serviceRequired}</p>
                    <p className="text-emerald-400 font-bold">{lead.budget}</p>
                    <p className="text-slate-500 text-[10px]">Timeline: {lead.timeline || 'Flexible'}</p>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className="text-slate-300 line-clamp-3 leading-relaxed">{lead.message}</p>
                    {lead.notes && (
                      <p className="mt-1 text-[11px] text-amber-300/90 italic bg-amber-500/10 p-1.5 rounded-md border border-amber-500/20">
                        Note: {lead.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                        lead.status === 'New'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : lead.status === 'Contacted'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : lead.status === 'Converted'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Converted">Converted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setNoteInput(lead.notes || '');
                      }}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Add Internal Note"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Internal Note for {selectedLead.name}</h3>
            <textarea
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="e.g. Called founder on Tuesday, demo scheduled for Friday 3pm..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLeads;

