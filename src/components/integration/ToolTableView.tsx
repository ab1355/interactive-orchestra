
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';
import IntegrationDialog from './IntegrationDialog';

type ToolTableViewProps = {
  tools: Array<any>;
};

const ToolTableView: React.FC<ToolTableViewProps> = ({ tools }) => {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openIntegrationDialog = (tool: any) => {
    setSelectedTool(tool);
    setIsDialogOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead>Integration</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Documentation</TableHead>
            <TableHead>Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool, index) => (
            <TableRow key={index} className="border-white/10">
              <TableCell>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-md bg-${tool.color} flex items-center justify-center mr-2`}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-white font-medium">{tool.name}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < tool.rating ? 'text-yellow-500' : 'text-gray-600'}`} fill={i < tool.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{tool.downloads}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer" className="text-purple hover:text-purple-light text-sm">
                    API Docs
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="text-purple hover:text-purple-light text-sm" onClick={(e) => { e.preventDefault(); alert(`${tool.name} Integration Guide would open in a new tab`); }}>
                    Integration Guide
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-white/10 text-white hover:bg-purple/20 hover:text-purple-light"
                    onClick={() => openIntegrationDialog(tool)}
                  >
                    Add Integration
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-white/10 text-white hover:bg-purple/20 hover:text-purple-light"
                    onClick={() => alert(`A testing dialog for ${tool.name} would open here`)}
                  >
                    Test
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {selectedTool && (
        <IntegrationDialog 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          tool={selectedTool}
        />
      )}
    </div>
  );
};

export default ToolTableView;
