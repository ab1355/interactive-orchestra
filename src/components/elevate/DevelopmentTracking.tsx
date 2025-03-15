
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Milestone, 
  ListOrdered, 
  CheckSquare, 
  Calendar, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock development plan data
const developmentPlanSteps = [
  { id: 1, name: 'Technical Certification', status: 'completed', date: 'March 15, 2023' },
  { id: 2, name: 'Leadership Workshop', status: 'completed', date: 'May 20, 2023' },
  { id: 3, name: 'Project Management Training', status: 'in-progress', date: 'August 10, 2023' },
  { id: 4, name: 'Advanced Communication Course', status: 'planned', date: 'October 5, 2023' },
  { id: 5, name: 'Industry Conference', status: 'planned', date: 'November 15, 2023' },
];

// Mock milestone data
const developmentMilestones = [
  { 
    id: 1, 
    title: 'Junior to Mid-Level Transition', 
    progress: 100, 
    completedDate: 'January 2022',
    achievements: [
      'Completed required technical certifications',
      'Led small team project successfully',
      'Received positive peer reviews'
    ]
  },
  { 
    id: 2, 
    title: 'Mid-Level to Senior Transition', 
    progress: 65, 
    completedDate: null,
    achievements: [
      'Advanced problem-solving capabilities demonstrated',
      'Mentoring junior team members',
      'Taking ownership of project components'
    ]
  },
  { 
    id: 3, 
    title: 'Technical Leadership Path', 
    progress: 25, 
    completedDate: null,
    achievements: [
      'Beginning architecture responsibilities',
      'Participating in technical decision making',
      'Developing team technical standards'
    ]
  },
];

// Mock learning resources
const learningResources = [
  { id: 1, title: 'Advanced Team Leadership', type: 'Course', provider: 'LinkedIn Learning', duration: '4 hours', relevance: 'High' },
  { id: 2, title: 'Effective Communication Workshop', type: 'Workshop', provider: 'In-house', duration: '6 hours', relevance: 'High' },
  { id: 3, title: 'Technical Architecture Certification', type: 'Certification', provider: 'Industry Board', duration: '3 months', relevance: 'Medium' },
  { id: 4, title: 'Agile Project Management', type: 'Book', provider: 'Library', duration: 'Self-paced', relevance: 'High' },
];

const DevelopmentTracking = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-purple" />
              Development Plan Progress
            </CardTitle>
            <CardDescription>Track your professional development steps</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developmentPlanSteps.map((step) => (
                  <TableRow key={step.id}>
                    <TableCell className="font-medium">{step.name}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        step.status === 'completed' ? 'bg-green-900/30 text-green-400' : 
                        step.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' : 
                        'bg-gray-900/30 text-gray-400'
                      }`}>
                        {step.status}
                      </span>
                    </TableCell>
                    <TableCell>{step.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {step.status === 'completed' ? (
                          <Button size="sm" variant="ghost" className="text-green-400">
                            <CheckSquare className="w-4 h-4 mr-1" />
                            Completed
                          </Button>
                        ) : step.status === 'in-progress' ? (
                          <Button size="sm" className="bg-purple hover:bg-purple-dark">
                            Update Progress
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="border-white/10">
                            Start
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-white/10">Add Step</Button>
            <Button className="bg-purple hover:bg-purple-dark">Generate Plan</Button>
          </CardFooter>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple" />
              Skills Growth
            </CardTitle>
            <CardDescription>Skills developed over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Technical Expertise</span>
                <span className="text-xs text-gray-400">+18% growth</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="text-xs text-right text-gray-400">85%</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Leadership</span>
                <span className="text-xs text-gray-400">+23% growth</span>
              </div>
              <Progress value={68} className="h-2" />
              <div className="text-xs text-right text-gray-400">68%</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Problem Solving</span>
                <span className="text-xs text-gray-400">+15% growth</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="text-xs text-right text-gray-400">92%</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Communication</span>
                <span className="text-xs text-gray-400">+20% growth</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="text-xs text-right text-gray-400">78%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Milestone className="w-5 h-5 text-purple" />
              Career Milestones
            </CardTitle>
            <CardDescription>Track your career progression</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {developmentMilestones.map((milestone) => (
                <div key={milestone.id} className="border-l-2 border-purple pl-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{milestone.title}</h4>
                    {milestone.completedDate && (
                      <div className="flex items-center text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3 mr-1" />
                        {milestone.completedDate}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2 flex items-center gap-2">
                    <Progress value={milestone.progress} className="h-2 flex-1" />
                    <span className="text-xs text-gray-400">{milestone.progress}%</span>
                  </div>
                  
                  <div className="space-y-1 mt-3">
                    {milestone.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1 h-1 rounded-full bg-purple mt-1.5"></div>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple" />
              Learning Resources
            </CardTitle>
            <CardDescription>Recommended resources for development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningResources.map((resource) => (
                <div key={resource.id} className="bg-dark rounded-lg p-3 hover:bg-dark-600 transition-colors">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-white font-medium">{resource.title}</h4>
                    <div className="text-xs bg-purple/20 text-purple px-2 py-0.5 rounded">
                      {resource.type}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <GraduationCap className="w-3 h-3" />
                      <span>{resource.provider}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      Relevance: <span className="text-purple">{resource.relevance}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-white/10">
              Browse All Resources
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DevelopmentTracking;
