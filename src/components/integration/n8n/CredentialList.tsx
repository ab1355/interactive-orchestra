
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { CredentialListProps } from './types';

const CredentialList: React.FC<CredentialListProps> = ({
  credentials,
  handleToastInfo
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((credential) => (
            <TableRow key={credential.id} className="border-white/10">
              <TableCell className="text-white">{credential.name}</TableCell>
              <TableCell className="text-gray-300">{credential.type}</TableCell>
              <TableCell className="text-gray-300">{credential.createdAt}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button className="text-purple hover:text-purple-light" onClick={() => handleToastInfo(`Edit ${credential.name}`)}>Edit</button>
                  <button className="text-red-400 hover:text-red-300" onClick={() => handleToastInfo(`Delete ${credential.name}`)}>Delete</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CredentialList;
