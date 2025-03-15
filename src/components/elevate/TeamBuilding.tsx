
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Heart, 
  Puzzle, 
  Target, 
  Zap, 
  BarChart4, 
  Calendar 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock team data
const teamCulturalIndicators = [
  { name: 'Trust', score: 85, change: '+5%' },
  { name: 'Communication', score: 78, change: '+3%' },
  { name: 'Collaboration', score: 92, change: '+7%' },
  { name: 'Innovation', score: 73, change: '+2%' },
  { name: 'Accountability', score: 88, change: '+4%' },
];

// Mock team building activities
const teamActivities = [
  {
    id: 1,
    title: 'Problem-Solving Workshop',
    description: 'Interactive workshop focused on collaborative problem-solving techniques',
    date: 'May 15, 2023',
    participants: 12,
    impact: [
      { indicator: 'Collaboration', improvement: '+8%' },
      { indicator: 'Innovation', improvement: '+12%' }
    ]
  },
  {
    id: 2,
    title: 'Communication Retreat',
    description: 'Off-site retreat focused on improving team communication skills',
    date: 'July 8, 2023',
    participants: 15,
    impact: [
      { indicator: 'Communication', improvement: '+15%' },
      { indicator: 'Trust', improvement: '+10%' }
    ]
  },
  {
    id: 3,
    title: 'Agile Team Building',
    description: 'Training session on agile methodologies and team dynamics',
    date: 'September 22, 2023',
    participants: 18,
    impact: [
      { indicator: 'Accountability', improvement: '+9%' },
      { indicator: 'Collaboration', improvement: '+7%' }
    ]
  }
];

const TeamBuilding = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple" />
              Team Composition
            </CardTitle>
            <CardDescription>Current team structure and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-dark p-3 rounded-md">
                  <div className="text-gray-400 text-xs">Team Size</div>
                  <div className="text-2xl font-semibold text-white">18</div>
                </div>
                <div className="bg-dark p-3 rounded-md">
                  <div className="text-gray-400 text-xs">Departments</div>
                  <div className="text-2xl font-semibold text-white">4</div>
                </div>
                <div className="bg-dark p-3 rounded-md">
                  <div className="text-gray-400 text-xs">Average Tenure</div>
                  <div className="text-2xl font-semibold text-white">2.8y</div>
                </div>
                <div className="bg-dark p-3 rounded-md">
                  <div className="text-gray-400 text-xs">Roles</div>
                  <div className="text-2xl font-semibold text-white">7</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-white/10">View Team Details</Button>
          </CardFooter>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple" />
              Cultural Indicators
            </CardTitle>
            <CardDescription>Key team cultural measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamCulturalIndicators.map((indicator, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{indicator.name}</span>
                    <span className="text-xs font-medium text-green-400">{indicator.change}</span>
                  </div>
                  <Progress value={indicator.score} className="h-2" />
                  <div className="text-xs text-right text-gray-400">{indicator.score}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-purple" />
              Team Balance
            </CardTitle>
            <CardDescription>Skills and personality distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-dark p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Personality Types</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple"></div>
                    <span className="text-gray-400">Analytical (28%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400">Creative (22%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400">Supportive (32%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-400">Driver (18%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-dark p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Skill Coverage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Technical</span>
                    <span className="text-white">92%</span>
                  </div>
                  <Progress value={92} className="h-1.5" />
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Leadership</span>
                    <span className="text-white">78%</span>
                  </div>
                  <Progress value={78} className="h-1.5" />
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Creativity</span>
                    <span className="text-white">85%</span>
                  </div>
                  <Progress value={85} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">Team Building Activities</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamActivities.map((activity) => (
          <Card key={activity.id} className="bg-dark-accent border-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{activity.title}</CardTitle>
                <div className="flex items-center text-xs bg-dark px-2 py-1 rounded text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {activity.date}
                </div>
              </div>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-dark p-3 rounded-md mb-3">
                <div className="text-xs text-gray-400 mb-1">Participants</div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-purple" />
                  <span className="text-white font-medium">{activity.participants} team members</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mb-2">Impact on Indicators</div>
              {activity.impact.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between mb-1 text-sm">
                  <span className="text-gray-300">{item.indicator}</span>
                  <span className="text-green-400 font-medium">{item.improvement}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" className="text-gray-400">Details</Button>
              <Button size="sm" className="bg-purple hover:bg-purple-dark">Schedule</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamBuilding;
