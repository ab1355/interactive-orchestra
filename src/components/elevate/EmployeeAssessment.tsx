
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UserCheck, FileText, SliderHorizontal, Target } from 'lucide-react';

// Mock data for skills assessment
const skillsData = [
  { id: 1, skill: 'Communication', level: 4, target: 5 },
  { id: 2, skill: 'Technical Knowledge', level: 3, target: 4 },
  { id: 3, skill: 'Problem Solving', level: 5, target: 5 },
  { id: 4, skill: 'Leadership', level: 3, target: 4 },
  { id: 5, skill: 'Teamwork', level: 4, target: 5 },
];

// Mock performance data
const performanceMetrics = [
  { id: 1, metric: 'Project Completion Rate', value: '92%', trend: 'up' },
  { id: 2, metric: 'Quality Assessment', value: '87%', trend: 'up' },
  { id: 3, metric: 'Deadline Adherence', value: '95%', trend: 'stable' },
  { id: 4, metric: 'Peer Review Score', value: '4.2/5', trend: 'up' },
];

const SkillLevelIndicator = ({ level, max = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div 
          key={i} 
          className={`w-5 h-2 rounded-sm ${i < level ? 'bg-purple' : 'bg-gray-700'}`} 
        />
      ))}
      <span className="ml-2 text-xs text-gray-400">{level}/{max}</span>
    </div>
  );
};

const EmployeeAssessment = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SliderHorizontal className="w-5 h-5 text-purple" />
              Skill Matrix Assessment
            </CardTitle>
            <CardDescription>Evaluate employee skills and set target levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Current Level</TableHead>
                  <TableHead>Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skillsData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.skill}</TableCell>
                    <TableCell>
                      <SkillLevelIndicator level={item.level} />
                    </TableCell>
                    <TableCell>Level {item.target}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4 bg-purple hover:bg-purple-dark">Update Skills</Button>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators and targets</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceMetrics.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.metric}</TableCell>
                    <TableCell className="font-medium">{item.value}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        item.trend === 'up' ? 'bg-green-900/30 text-green-400' : 
                        item.trend === 'down' ? 'bg-red-900/30 text-red-400' : 
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {item.trend}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple" />
              Assessment Form
            </CardTitle>
            <CardDescription>Conduct employee assessment review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Strengths</label>
                <Textarea placeholder="Enter employee strengths..." className="bg-dark border-white/10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Areas for Improvement</label>
                <Textarea placeholder="Enter areas for improvement..." className="bg-dark border-white/10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Development Goals</label>
                <Textarea placeholder="Enter development goals..." className="bg-dark border-white/10" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-white/10">Save Draft</Button>
                <Button className="bg-purple hover:bg-purple-dark">Submit Assessment</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple" />
              Previous Assessments
            </CardTitle>
            <CardDescription>Review historical assessment data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: 'January 2023', type: 'Quarterly Review' },
                { date: 'April 2023', type: 'Performance Evaluation' },
                { date: 'July 2023', type: 'Mid-year Assessment' },
                { date: 'October 2023', type: 'Quarterly Review' }
              ].map((assessment, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-md bg-dark hover:bg-dark-600 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium text-white">{assessment.type}</h4>
                    <p className="text-xs text-gray-400">{assessment.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeAssessment;
