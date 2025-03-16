
import React, { useState } from 'react';
import { AgentBehaviorProfile } from '@/types/agentBehavior';
import { useAgentBehaviorContext } from '@/contexts/AgentBehaviorContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash, Check, Clock, Star } from 'lucide-react';

export const BehaviorProfileManager: React.FC = () => {
  const { 
    currentProfile, 
    availableProfiles, 
    loadProfile, 
    saveProfile, 
    createProfile, 
    deleteProfile 
  } = useAgentBehaviorContext();
  
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  
  // Format date to readable string
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
  };
  
  // Handle save dialog
  const handleSaveClick = () => {
    setProfileName(currentProfile.name);
    setProfileDescription(currentProfile.description);
    setSaveDialogOpen(true);
  };
  
  const handleSaveConfirm = async () => {
    await saveProfile(profileName, profileDescription);
    setSaveDialogOpen(false);
  };
  
  // Handle create dialog
  const handleCreateClick = () => {
    setProfileName('');
    setProfileDescription('');
    setCreateDialogOpen(true);
  };
  
  const handleCreateConfirm = async () => {
    await createProfile({
      name: profileName,
      description: profileDescription,
      parameters: currentProfile.parameters,
      isDefault: false
    });
    setCreateDialogOpen(false);
  };
  
  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Current Profile: {currentProfile.name}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveClick}>
              <Save className="w-4 h-4 mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleCreateClick}>
              <Plus className="w-4 h-4 mr-1" /> New
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-6">{currentProfile.description}</p>
      </div>
      
      <h3 className="text-md font-semibold text-white mb-3">Available Profiles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableProfiles.map(profile => (
          <Card 
            key={profile.id} 
            className={`cursor-pointer border transition-all ${
              currentProfile.id === profile.id ? 'border-purple bg-purple/10' : 'border-white/10 hover:border-white/20'
            }`}
            onClick={() => loadProfile(profile.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-md">{profile.name}</CardTitle>
                {profile.isDefault && <Star className="w-4 h-4 text-yellow-500" />}
              </div>
              <CardDescription className="text-xs truncate">{profile.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-xs pb-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-400">Decision:</span> {Math.round(profile.parameters.decisionThreshold * 100)}%
                </div>
                <div>
                  <span className="text-gray-400">Confidence:</span> {Math.round(profile.parameters.confidenceLevel * 100)}%
                </div>
                <div>
                  <span className="text-gray-400">Creativity:</span> {Math.round(profile.parameters.creativity * 100)}%
                </div>
                <div>
                  <span className="text-gray-400">Precision:</span> {Math.round(profile.parameters.precision * 100)}%
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 justify-between">
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(profile.updatedAt)}
              </div>
              {!profile.isDefault && currentProfile.id !== profile.id && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProfile(profile.id);
                  }}
                >
                  <Trash className="w-3 h-3" />
                </Button>
              )}
              {currentProfile.id === profile.id && (
                <Check className="w-4 h-4 text-purple" />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="bg-dark-accent border-white/10">
          <DialogHeader>
            <DialogTitle>Save Profile</DialogTitle>
            <DialogDescription>
              Save changes to the current behavior profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Profile Name</Label>
              <Input
                id="profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter profile name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-description">Description</Label>
              <Textarea
                id="profile-description"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                placeholder="Describe this profile's purpose or characteristics"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfirm} disabled={!profileName.trim()}>
              Save Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="bg-dark-accent border-white/10">
          <DialogHeader>
            <DialogTitle>Create New Profile</DialogTitle>
            <DialogDescription>
              Create a new behavior profile based on current settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-profile-name">Profile Name</Label>
              <Input
                id="new-profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter new profile name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-profile-description">Description</Label>
              <Textarea
                id="new-profile-description"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                placeholder="Describe this profile's purpose or characteristics"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateConfirm} disabled={!profileName.trim()}>
              Create Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
