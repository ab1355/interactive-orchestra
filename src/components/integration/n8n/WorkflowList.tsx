
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { Play, Pause, Edit, Trash } from 'lucide-react';
import { WorkflowListProps } from './types';

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  toggleWorkflowActive,
  executeWorkflow,
  deleteWorkflow,
  handleToastInfo,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Nodes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows.map((workflow) => (
            <TableRow key={workflow.id} className="border-white/10">
              <TableCell className="text-white">{workflow.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${workflow.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {workflow.active ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className="text-gray-300">{workflow.createdAt}</TableCell>
              <TableCell className="text-gray-300">{workflow.updatedAt}</TableCell>
              <TableCell className="text-gray-300">{workflow.nodes} nodes / {workflow.connections} connections</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <EnhancedActionButton
                    variant="outline"
                    size="sm"
                    onClick={() => toggleWorkflowActive(workflow.id, workflow.active)}
                    tooltipText={workflow.active ? 'Deactivate workflow' : 'Activate workflow'}
                    hasRipple={true}
                    className="border-white/10 text-gray-300 hover:text-white p-1"
                  >
                    {workflow.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </EnhancedActionButton>
                  <EnhancedActionButton
                    variant="outline"
                    size="sm"
                    onClick={() => executeWorkflow(workflow.id)}
                    tooltipText="Execute workflow now"
                    hasRipple={true}
                    className="border-white/10 text-gray-300 hover:text-white p-1"
                  >
                    <Play className="w-4 h-4" />
                  </EnhancedActionButton>
                  <EnhancedActionButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleToastInfo('This would open the workflow editor')}
                    tooltipText="Edit workflow"
                    hasRipple={true}
                    className="border-white/10 text-gray-300 hover:text-white p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </EnhancedActionButton>
                  <EnhancedActionButton
                    variant="outline"
                    size="sm"
                    onClick={() => deleteWorkflow(workflow.id)}
                    tooltipText="Delete workflow"
                    hasRipple={true}
                    confirmationMessage="Are you sure you want to delete this workflow?"
                    className="border-white/10 text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash className="w-4 h-4" />
                  </EnhancedActionButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkflowList;
