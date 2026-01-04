import { useState, useEffect } from 'react';
import { useUserStats } from '@/hooks/useUserStats';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { SubmissionHeatmap } from '@/components/SubmissionHeatmap';

export default function ProfilePage() {
    const { user: authUser, isAuthenticated } = useAuthStore();
    const { data: userStats, isLoading, refetch } = useUserStats();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (authUser) {
            setFormData({
                username: authUser.username || '',
                email: authUser.email || ''
            });
        }
    }, [authUser]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await api.patch('/auth/profile/', formData);
            toast.success('Profile updated successfully');
            setIsEditing(false);

            // Update local storage/store via a refresh or manual update
            // Ideally update authStore too, but for now page refresh or refetch logic
            // We might need to reload or update the authStore user object.
            // Assuming simple refetch for now.
            refetch();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.username?.[0] || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
                Please login to view your profile.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const { user, stats, recent_submissions } = userStats || {};

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Profile Header */}
            <Card variant="glass" className="mb-8 overflow-hidden relative">
                <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-4 flex justify-between items-end">
                        <Avatar className="w-32 h-32 border-4 border-background bg-card">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} />
                            <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        {!isEditing ? (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {isEditing ? (
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Username</label>
                                    <Input
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-3xl font-bold font-display mb-1">{user?.username}</h1>
                                <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {user?.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Joined {new Date(user?.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card variant="glass" className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Total Solved</div>
                    <div className="text-4xl font-bold font-display text-primary">{stats?.total_solved || 0}</div>
                    <div className="text-xs text-muted-foreground mt-1">Problems</div>
                </Card>
                <Card variant="glass" className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Acceptance Rate</div>
                    <div className="text-4xl font-bold font-display text-secondary">
                        {stats?.acceptance_rate ? parseFloat(stats.acceptance_rate).toFixed(1) : 0}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Global average</div>
                </Card>
                <Card variant="glass" className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Current Streak</div>
                    <div className="text-4xl font-bold font-display text-accent">{stats?.streak || 0}</div>
                    <div className="text-xs text-muted-foreground mt-1">Days</div>
                </Card>
            </div>

            {/* Submission Heatmap */}
            {userStats?.submission_calendar && (
                <div className="mb-8 overflow-x-auto">
                    <div className="min-w-[800px]">
                        <SubmissionHeatmap data={userStats.submission_calendar} />
                    </div>
                </div>
            )}

            {/* Difficulty Breakdown */}
            <Card variant="glass" className="mb-8">
                <CardHeader>
                    <CardTitle>Solved Problems</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="easy">Easy</Badge>
                            </div>
                            <span className="font-mono text-lg">{stats?.easy_solved || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="medium">Medium</Badge>
                            </div>
                            <span className="font-mono text-lg">{stats?.medium_solved || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="hard">Hard</Badge>
                            </div>
                            <span className="font-mono text-lg">{stats?.hard_solved || 0}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recent_submissions?.map((sub: any) => (
                            <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${sub.status === 'accepted' ? 'bg-success' : 'bg-destructive'}`} />
                                    <div>
                                        <div className="font-medium text-sm">{sub.problem_title}</div>
                                        <div className="text-xs text-muted-foreground capitalize">{sub.language}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {new Date(sub.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                        {(!recent_submissions || recent_submissions.length === 0) && (
                            <div className="text-center text-muted-foreground text-sm py-4">
                                No recent activity
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
