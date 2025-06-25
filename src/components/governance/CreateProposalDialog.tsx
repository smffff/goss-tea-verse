
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Vote } from 'lucide-react';
import { NewProposal, ProposalCategory } from '@/types/governance';

interface CreateProposalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newProposal: NewProposal;
  setNewProposal: (proposal: NewProposal) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CreateProposalDialog: React.FC<CreateProposalDialogProps> = ({
  isOpen,
  onClose,
  newProposal,
  setNewProposal,
  onSubmit,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-darker/95 border-ctea-teal/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Vote className="w-5 h-5 text-ctea-teal" />
            Create New Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Proposal Title</label>
            <Input
              value={newProposal.title}
              onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
              placeholder="Enter proposal title..."
              className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">Description</label>
            <Textarea
              value={newProposal.description}
              onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
              placeholder="Describe your proposal in detail..."
              className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Category</label>
              <select
                value={newProposal.category}
                onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value as ProposalCategory })}
                className="w-full bg-ctea-dark/50 border border-ctea-teal/30 text-white rounded-md p-2"
              >
                <option value="governance">Governance</option>
                <option value="feature">Feature</option>
                <option value="economic">Economic</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Duration (days)</label>
              <Input
                type="number"
                value={newProposal.duration}
                onChange={(e) => setNewProposal({ ...newProposal, duration: parseInt(e.target.value) })}
                className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
                min="1"
                max="30"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-blue text-white font-bold"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Vote className="w-4 h-4 mr-2" />
                  Create Proposal
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalDialog;
