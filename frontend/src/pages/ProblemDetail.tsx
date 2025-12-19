import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Send, 
  ChevronLeft, 
  ChevronDown,
  ChevronUp,
  Clock,
  HardDrive,
  Terminal,
  FileText,
  History,
  Check,
  X,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProblems, mockSubmissions } from '@/data/mockData';
import { Language, SUPPORTED_LANGUAGES, Submission } from '@/types';
import { cn } from '@/lib/utils';

type ExecutionStatus = 'idle' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error';

interface ExecutionResult {
  status: ExecutionStatus;
  output?: string;
  runtime?: number;
  memory?: number;
  error?: string;
  failedTestCase?: {
    input: string;
    expected: string;
    actual: string;
  };
}

export default function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const problem = mockProblems.find((p) => p.slug === slug);
  
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(problem?.starterCode[language] || '');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  const problemSubmissions = useMemo(() => {
    return mockSubmissions.filter((s) => s.problemId === problem?.id);
  }, [problem?.id]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(problem?.starterCode[newLanguage] || '');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setResult({ status: 'running' });
    
    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock result
    const mockResults: ExecutionResult[] = [
      { status: 'accepted', output: 'All test cases passed!', runtime: 56, memory: 42.1 },
      { status: 'wrong_answer', output: 'Test case 2 failed', failedTestCase: { input: '[3,2,4], 6', expected: '[1,2]', actual: '[0,1]' } },
    ];
    
    setResult(mockResults[Math.random() > 0.3 ? 0 : 1]);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult({ status: 'running' });
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockResults: ExecutionResult[] = [
      { status: 'accepted', output: 'Accepted! All test cases passed.', runtime: 52, memory: 41.8 },
      { status: 'wrong_answer', output: 'Wrong Answer on test case 15', failedTestCase: { input: '[1,2,3,4], 7', expected: '[2,3]', actual: '[1,3]' } },
      { status: 'time_limit_exceeded', output: 'Time Limit Exceeded on test case 20', error: 'Your solution exceeded the time limit' },
      { status: 'runtime_error', output: 'Runtime Error', error: 'TypeError: Cannot read property of undefined' },
    ];
    
    setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
    setIsSubmitting(false);
  };

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
        <Link to="/problems">
          <Button variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: ExecutionStatus) => {
    switch (status) {
      case 'accepted':
        return <Check className="h-5 w-5 text-success" />;
      case 'wrong_answer':
        return <X className="h-5 w-5 text-destructive" />;
      case 'time_limit_exceeded':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'runtime_error':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'running':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: ExecutionStatus) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'wrong_answer':
        return 'Wrong Answer';
      case 'time_limit_exceeded':
        return 'Time Limit Exceeded';
      case 'runtime_error':
        return 'Runtime Error';
      case 'running':
        return 'Running...';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-success';
      case 'wrong_answer':
      case 'runtime_error':
        return 'text-destructive';
      case 'time_limit_exceeded':
        return 'text-warning';
      case 'pending':
      case 'running':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Left Panel - Problem Description */}
      <div className="w-full lg:w-1/2 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/problems">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Problems
            </Button>
          </Link>
          <Badge variant={problem.difficulty}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4 justify-start bg-muted/50">
            <TabsTrigger value="description" className="gap-2">
              <FileText className="h-4 w-4" />
              Description
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2">
              <History className="h-4 w-4" />
              Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="flex-1 overflow-auto p-4 m-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2 font-display">{problem.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="tag">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-line text-foreground/90 leading-relaxed">
                  {problem.description}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Examples</h3>
                {problem.examples.map((example, i) => (
                  <Card key={i} variant="glass" className="p-4 space-y-2">
                    <div>
                      <span className="text-muted-foreground text-sm">Input:</span>
                      <code className="block mt-1 font-mono text-sm text-primary bg-muted/50 p-2 rounded">
                        {example.input}
                      </code>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Output:</span>
                      <code className="block mt-1 font-mono text-sm text-success bg-muted/50 p-2 rounded">
                        {example.output}
                      </code>
                    </div>
                    {example.explanation && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Explanation:</span> {example.explanation}
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Constraints</h3>
                <ul className="space-y-1">
                  {problem.constraints.map((constraint, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <code className="font-mono">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="flex-1 overflow-auto p-4 m-0">
            {problemSubmissions.length > 0 ? (
              <div className="space-y-3">
                {problemSubmissions.map((submission) => (
                  <SubmissionCard key={submission.id} submission={submission} />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No submissions yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="p-3 border-b border-border flex items-center justify-between bg-card/50">
          <Select value={language} onValueChange={(v) => handleLanguageChange(v as Language)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="ml-2">Run</span>
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="ml-2">Submit</span>
            </Button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 3,
              renderLineHighlight: 'line',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Console Output */}
        <div className={cn(
          "border-t border-border bg-card/80 transition-all duration-200",
          consoleOpen ? "h-48" : "h-10"
        )}>
          <div 
            className="flex items-center justify-between px-4 h-10 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setConsoleOpen(!consoleOpen)}
          >
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Console</span>
              {result && result.status !== 'idle' && result.status !== 'running' && (
                <div className="flex items-center gap-2 ml-4">
                  {getStatusIcon(result.status)}
                  <span className={cn("text-sm font-medium", getStatusColor(result.status))}>
                    {getStatusText(result.status)}
                  </span>
                </div>
              )}
            </div>
            {consoleOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </div>

          {consoleOpen && (
            <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto font-mono text-sm">
              {result ? (
                <div className="space-y-3">
                  {result.status === 'running' ? (
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Executing code...</span>
                    </div>
                  ) : (
                    <>
                      <div className={cn("flex items-center gap-2", getStatusColor(result.status))}>
                        {getStatusIcon(result.status)}
                        <span className="font-semibold">{getStatusText(result.status)}</span>
                      </div>
                      
                      {result.output && (
                        <div className="text-muted-foreground">{result.output}</div>
                      )}

                      {result.runtime && result.memory && (
                        <div className="flex gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{result.runtime}ms</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HardDrive className="h-3 w-3" />
                            <span>{result.memory}MB</span>
                          </div>
                        </div>
                      )}

                      {result.error && (
                        <div className="text-destructive bg-destructive/10 p-3 rounded">
                          {result.error}
                        </div>
                      )}

                      {result.failedTestCase && (
                        <div className="space-y-2 bg-muted/30 p-3 rounded">
                          <div>
                            <span className="text-muted-foreground">Input: </span>
                            <code className="text-foreground">{result.failedTestCase.input}</code>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expected: </span>
                            <code className="text-success">{result.failedTestCase.expected}</code>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Actual: </span>
                            <code className="text-destructive">{result.failedTestCase.actual}</code>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Click "Run" to execute against sample test cases or "Submit" to run all tests.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SubmissionCard({ submission }: { submission: Submission }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-success';
      case 'wrong_answer':
      case 'runtime_error':
        return 'text-destructive';
      case 'time_limit_exceeded':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Check className="h-4 w-4" />;
      case 'wrong_answer':
      case 'runtime_error':
        return <X className="h-4 w-4" />;
      case 'time_limit_exceeded':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card variant="glass" className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={cn("flex items-center gap-2 font-medium", getStatusColor(submission.status))}>
          {getStatusIcon(submission.status)}
          <span className="capitalize">{submission.status.replace('_', ' ')}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {new Date(submission.timestamp).toLocaleDateString()}
        </span>
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="capitalize">{submission.language}</span>
        {submission.runtime && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {submission.runtime}ms
          </span>
        )}
        {submission.memory && (
          <span className="flex items-center gap-1">
            <HardDrive className="h-3 w-3" />
            {submission.memory}MB
          </span>
        )}
      </div>
    </Card>
  );
}
