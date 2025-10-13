import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThreadRow {
  id: string;
  label: string;
  options: string[];
}

interface ThreadSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, string[]>) => void;
}

const ThreadSelectionModal = ({ open, onClose, onConfirm }: ThreadSelectionModalProps) => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const threadRows: ThreadRow[] = [
    { id: '1', label: 'Primary Data Stream', options: ['Enable', 'Disable'] },
    { id: '2', label: 'Secondary Analytics', options: ['Enable', 'Disable'] },
    { id: '3', label: 'Real-time Processing', options: ['Enable', 'Disable'] },
    { id: '4', label: 'Data Aggregation', options: ['Enable', 'Disable'] },
    { id: '5', label: 'Alert Notifications', options: ['Enable', 'Disable'] },
  ];

  const toggleOption = (rowId: string, option: string) => {
    setSelections((prev) => {
      const current = prev[rowId] || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [rowId]: updated };
    });
  };

  const hasValidSelections = Object.keys(selections).length > 0;

  const handleConfirm = () => {
    if (hasValidSelections) {
      onConfirm(selections);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white p-8 rounded-3xl shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Configure Thread Settings</h2>
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={!hasValidSelections}
                className="p-3 rounded-lg bg-green-500 hover:bg-green-600 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Check className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all hover:scale-110"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {threadRows.map((row) => {
              const rowHasSelection = selections[row.id]?.length > 0;
              
              return (
                <div
                  key={row.id}
                  className={cn(
                    'flex items-center gap-4 rounded-2xl p-4 transition-all duration-200',
                    rowHasSelection
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-[1.01]'
                      : 'bg-slate-50 hover:bg-slate-100 hover:scale-[1.01]'
                  )}
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <span className={cn('font-semibold', rowHasSelection ? 'text-white' : 'text-slate-800')}>
                      {row.label}
                    </span>
                    <span className={cn('text-xs', rowHasSelection ? 'text-white/80' : 'text-slate-500')}>
                      Configure this thread setting
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {row.options.map((option) => {
                      const isChecked = selections[row.id]?.includes(option) || false;
                      
                      return (
                        <div
                          key={option}
                          onClick={() => toggleOption(row.id, option)}
                          className={cn(
                            'flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all',
                            isChecked
                              ? 'bg-white/30'
                              : rowHasSelection 
                                ? 'bg-white/10 hover:bg-white/20'
                                : 'bg-slate-200 hover:bg-slate-300'
                          )}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleOption(row.id, option)}
                            className={cn(isChecked && rowHasSelection && 'border-white')}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              disabled={!hasValidSelections}
              onClick={handleConfirm}
              className="rounded-2xl px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadSelectionModal;
