import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProblems, getAllTags } from '@/data/mockData';

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const allTags = useMemo(() => getAllTags(), []);

  const filteredProblems = useMemo(() => {
    return mockProblems.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
      const matchesTag = tagFilter === 'all' || problem.tags.includes(tagFilter);
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'solved' && problem.solved) || 
        (statusFilter === 'unsolved' && !problem.solved);
      
      return matchesSearch && matchesDifficulty && matchesTag && matchesStatus;
    });
  }, [searchQuery, difficultyFilter, tagFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: mockProblems.length,
    solved: mockProblems.filter(p => p.solved).length,
    easy: mockProblems.filter(p => p.difficulty === 'easy').length,
    medium: mockProblems.filter(p => p.difficulty === 'medium').length,
    hard: mockProblems.filter(p => p.difficulty === 'hard').length,
  }), []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-wider mb-2">
          PROBLEM_<span className="text-primary">DATABASE</span>
        </h1>
        <p className="text-muted-foreground">
          Master algorithms and data structures through practice
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card variant="glass" className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Total</div>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <div className="text-2xl font-bold text-success">{stats.solved}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Solved</div>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <div className="text-2xl font-bold text-easy">{stats.easy}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Easy</div>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <div className="text-2xl font-bold text-warning">{stats.medium}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Medium</div>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <div className="text-2xl font-bold text-destructive">{stats.hard}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Hard</div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Problem List */}
      <div className="space-y-3">
        {filteredProblems.map((problem, index) => (
          <Link key={problem.id} to={`/problem/${problem.slug}`}>
            <Card 
              variant="glass" 
              className="p-4 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  problem.solved 
                    ? 'bg-success/20 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {problem.solved ? <Check className="h-3 w-3" /> : <X className="h-3 w-3 opacity-50" />}
                </div>

                {/* Problem Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-muted-foreground text-sm font-mono">#{problem.id}</span>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {problem.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="tag" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {problem.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{problem.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Difficulty Badge */}
                <Badge variant={problem.difficulty} className="shrink-0">
                  {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </Badge>

                {/* Arrow */}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <Card variant="glass" className="p-12 text-center">
          <div className="text-muted-foreground">
            <p className="text-lg mb-2">No problems found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        </Card>
      )}
    </div>
  );
}
