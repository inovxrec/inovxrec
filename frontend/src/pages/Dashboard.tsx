import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Check,
  X,
  ChevronRight,
  Clock,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useProblemStats } from '@/hooks/useProblems';
import { useUserStats } from '@/hooks/useUserStats';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: problemStats, isLoading: statsLoading } = useProblemStats();
  const { data: userStatsData, isLoading: userStatsLoading } = useUserStats();

  const stats = useMemo(() => {
    if (!problemStats) return null;

    return {
      totalEasy: problemStats.easy,
      totalMedium: problemStats.medium,
      totalHard: problemStats.hard,
      easyProgress: problemStats.easy ? (problemStats.solved_easy / problemStats.easy) * 100 : 0,
      mediumProgress: problemStats.medium ? (problemStats.solved_medium / problemStats.medium) * 100 : 0,
      hardProgress: problemStats.hard ? (problemStats.solved_hard / problemStats.hard) * 100 : 0,
      totalProgress: problemStats.total ? (problemStats.solved / problemStats.total) * 100 : 0,
      solved: problemStats.solved,
      solvedEasy: problemStats.solved_easy,
      solvedMedium: problemStats.solved_medium,
      solvedHard: problemStats.solved_hard,
    };
  }, [problemStats]);

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
      default:
        return <X className="h-4 w-4" />;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Please login to view dashboard.
      </div>
    );
  }

  if (statsLoading || userStatsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-wider mb-2">
          USER_<span className="text-primary">DASHBOARD</span>
        </h1>
        <p className="text-muted-foreground">
          Welcome back, <span className="text-primary font-medium">{user.username}</span>
        </p>
      </div>

      {stats && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Streak */}
            <Card variant="neon" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                  <Flame className="h-4 w-4 text-accent" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-display text-accent">{userStatsData?.stats?.streak || 0}</span>
                  <span className="text-muted-foreground">days</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Solved */}
            <Card variant="neon" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-success/20 to-transparent" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-success" />
                  Problems Solved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-display text-success">{stats.solved}</span>
                  <span className="text-muted-foreground">/ {problemStats?.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Acceptance Rate */}
            <Card variant="neon" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Acceptance Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-display text-primary">
                    {userStatsData?.stats?.acceptance_rate ? parseFloat(userStatsData.stats.acceptance_rate).toFixed(1) : '0'}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Submissions */}
            <Card variant="neon" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-secondary/20 to-transparent" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  Total Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-display text-secondary">{userStatsData?.stats?.total_submissions || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress by Difficulty */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="font-display tracking-wider">PROGRESS_BY_DIFFICULTY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Easy */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="easy">Easy</Badge>
                      <span className="text-sm text-muted-foreground">
                        {stats.solvedEasy} / {stats.totalEasy}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-success">
                      {Math.round(stats.easyProgress)}%
                    </span>
                  </div>
                  <Progress value={stats.easyProgress} className="h-2 bg-muted" />
                </div>

                {/* Medium */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="medium">Medium</Badge>
                      <span className="text-sm text-muted-foreground">
                        {stats.solvedMedium} / {stats.totalMedium}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-warning">
                      {Math.round(stats.mediumProgress)}%
                    </span>
                  </div>
                  <Progress value={stats.mediumProgress} className="h-2 bg-muted" />
                </div>

                {/* Hard */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="hard">Hard</Badge>
                      <span className="text-sm text-muted-foreground">
                        {stats.solvedHard} / {stats.totalHard}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-destructive">
                      {Math.round(stats.hardProgress)}%
                    </span>
                  </div>
                  <Progress value={stats.hardProgress} className="h-2 bg-muted" />
                </div>

                {/* Overall */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(stats.totalProgress)}%
                    </span>
                  </div>
                  <Progress value={stats.totalProgress} className="h-3 bg-muted" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display tracking-wider">RECENT_SUBMISSIONS</CardTitle>
                <Link to="/problems">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userStatsData?.recent_submissions?.slice(0, 5).map((submission: any) => (
                    <Link
                      key={submission.id}
                      to={`/problem/${submission.problem_slug}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            submission.status === 'accepted' ? 'bg-success/20' : 'bg-destructive/20'
                          )}>
                            <span className={getStatusColor(submission.status)}>
                              {getStatusIcon(submission.status)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {submission.problem_title || 'Unknown Problem'}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <span className="capitalize">{submission.language}</span>
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>{new Date(submission.updated_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className={cn("text-sm font-medium capitalize", getStatusColor(submission.status))}>
                          {submission.status.replace('_', ' ')}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {(!userStatsData?.recent_submissions || userStatsData.recent_submissions.length === 0) && (
                    <div className="text-center text-muted-foreground py-4">No recent submissions</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
