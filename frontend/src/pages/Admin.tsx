import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    BarChart3,
    MessageSquare,
    Calendar,
    Plus,
    Pencil,
    Trash2,
    Image as ImageIcon,
    Save,
    X,
    Check,
    Radio,
    ExternalLink,
    Loader2,
    ChevronRight,
    TrendingUp,
    Mail,
    Settings
} from "lucide-react";

import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { inovxApi, IProject, IEvent, ITeamMember, IStatistic } from "@/lib/inovxApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Admin() {
    const { isAuthenticated, user } = useAuthStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth");
        } else if (user && !user.is_staff) {
            toast.error("Access Denied: Administrative privileges required.");
            navigate("/");
        }
    }, [isAuthenticated, user, navigate]);

    // Queries
    const { data: projects, isLoading: projectsLoading } = useQuery({ queryKey: ["projects"], queryFn: inovxApi.getProjects });
    const { data: events, isLoading: eventsLoading } = useQuery({ queryKey: ["events"], queryFn: inovxApi.getEvents });
    const { data: team, isLoading: teamLoading } = useQuery({ queryKey: ["team"], queryFn: inovxApi.getTeam });
    const { data: stats, isLoading: statsLoading } = useQuery({ queryKey: ["statistics"], queryFn: inovxApi.getStatistics });
    const { data: enquiries, isLoading: enquiriesLoading } = useQuery({ queryKey: ["enquiries"], queryFn: inovxApi.getEnquiries });
    const { data: gallery, isLoading: galleryLoading } = useQuery({ queryKey: ["gallery"], queryFn: inovxApi.getGallery });
    const { data: config, isLoading: configLoading } = useQuery({ queryKey: ["config"], queryFn: inovxApi.getConfig });

    // Edit states
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    // Delete Mutations
    const deleteProjectMutation = useMutation({
        mutationFn: inovxApi.deleteProject,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["projects"] }); toast.success("Project deleted"); }
    });

    const deleteEventMutation = useMutation({
        mutationFn: inovxApi.deleteEvent,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["events"] }); toast.success("Event deleted"); }
    });

    const deleteTeamMutation = useMutation({
        mutationFn: inovxApi.deleteTeamMember,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["team"] }); toast.success("Member removed"); }
    });

    const deleteStatMutation = useMutation({
        mutationFn: inovxApi.deleteStatistic,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["statistics"] }); toast.success("Stat deleted"); }
    });

    if (projectsLoading || eventsLoading || teamLoading || statsLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal once={true}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
                                ADMIN_<span className="text-primary italic">CORE</span>
                            </h1>
                            <p className="text-gray-500 mt-2 font-light">Central command for InovX digital ecosystem.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-white uppercase tracking-widest">{user?.username}</p>
                                <p className="text-[10px] text-primary font-mono tracking-tighter">SYSTEM_ADMINISTRATOR</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-12 bg-white/5 border border-white/10 p-1 h-auto rounded-2xl">
                        <TabsTrigger value="dashboard" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <LayoutDashboard className="w-4 h-4 mr-2 hidden lg:block" /> Dash
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <Briefcase className="w-4 h-4 mr-2 hidden lg:block" /> Projects
                        </TabsTrigger>
                        <TabsTrigger value="events" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <Calendar className="w-4 h-4 mr-2 hidden lg:block" /> Events
                        </TabsTrigger>
                        <TabsTrigger value="team" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <Users className="w-4 h-4 mr-2 hidden lg:block" /> Team
                        </TabsTrigger>
                        <TabsTrigger value="stats" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <BarChart3 className="w-4 h-4 mr-2 hidden lg:block" /> Stats
                        </TabsTrigger>
                        <TabsTrigger value="gallery" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <ImageIcon className="w-4 h-4 mr-2 hidden lg:block" /> Gallery
                        </TabsTrigger>
                        <TabsTrigger value="enquiries" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <MessageSquare className="w-4 h-4 mr-2 hidden lg:block" /> Inq
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                            <Settings className="w-4 h-4 mr-2 hidden lg:block" /> Settings
                        </TabsTrigger>
                    </TabsList>


                    <TabsContent value="dashboard">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <DashboardCard label="Active Projects" value={projects?.length || 0} icon={<Briefcase />} color="text-blue-500" />
                            <DashboardCard label="Total Events" value={events?.length || 0} icon={<Calendar />} color="text-purple-500" />
                            <DashboardCard label="Team Members" value={team?.length || 0} icon={<Users />} color="text-green-500" />
                            <DashboardCard label="New Enquiries" value={enquiries?.length || 0} icon={<Mail />} color="text-orange-500" />
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-2 bg-[#0a0a0a] border-white/5 shadow-2xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-primary" /> Recent System Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {enquiries?.slice(0, 5).map((enq: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                                    <Mail className="w-5 h-5 text-orange-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold">{enq.name} sent an inquiry</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{enq.subject}</p>
                                                </div>
                                                <p className="text-[10px] font-mono text-gray-600">NEW</p>
                                            </div>
                                        ))}
                                        {!enquiries?.length && <p className="text-center text-gray-500 py-8">No recent activity detected.</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#0a0a0a] border-white/5">
                                <CardHeader>
                                    <CardTitle>Quick Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <QuickLink label="View Live Site" href="/" external />
                                    <QuickLink label="Analytics Overview" href="#" disabled />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Manage Projects</h2>
                            <ProjectModal onSave={() => queryClient.invalidateQueries({ queryKey: ["projects"] })} />
                        </div>
                        <div className="grid gap-4">
                            {projects?.map((item: IProject) => (
                                <ResourceCard
                                    key={item._id}
                                    title={item.title}
                                    sub={item.category}
                                    img={item.image}
                                    onDelete={() => deleteProjectMutation.mutate(item._id)}
                                    onEdit={() => { }} // TODO: Impl edit
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="events">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Manage Events</h2>
                            <EventModal onSave={() => queryClient.invalidateQueries({ queryKey: ["events"] })} />
                        </div>
                        <div className="grid gap-4">
                            {events?.map((item: IEvent) => (
                                <ResourceCard
                                    key={item._id}
                                    title={item.title}
                                    sub={`${item.date} • ${item.location}`}
                                    img={item.image}
                                    isLive={item.isLive}
                                    onDelete={() => deleteEventMutation.mutate(item._id)}
                                    liveToggle={() => {
                                        inovxApi.updateEvent(item._id, { isLive: !item.isLive })
                                            .then(() => {
                                                queryClient.invalidateQueries({ queryKey: ["events"] });
                                                queryClient.invalidateQueries({ queryKey: ["liveEvent"] });
                                                toast.success(`Event is now ${!item.isLive ? 'LIVE' : 'off air'}`);
                                            });
                                    }}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="team">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Team Members</h2>
                            <TeamModal onSave={() => queryClient.invalidateQueries({ queryKey: ["team"] })} />
                        </div>
                        <div className="grid gap-4">
                            {team?.map((item: ITeamMember) => (
                                <ResourceCard
                                    key={item._id}
                                    title={item.name}
                                    sub={item.role}
                                    img={item.image}
                                    onDelete={() => deleteTeamMutation.mutate(item._id)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="stats">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Platform Stats</h2>
                            <StatModal onSave={() => queryClient.invalidateQueries({ queryKey: ["statistics"] })} />
                        </div>
                        <div className="grid gap-4">
                            {stats?.map((item: IStatistic) => (
                                <ResourceCard
                                    key={item._id}
                                    title={item.label}
                                    sub={`${item.value}${item.suffix}`}
                                    onDelete={() => deleteStatMutation.mutate(item._id)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="enquiries">
                        <Card className="bg-[#0a0a0a] border-white/5">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">Name</th>
                                                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">Email</th>
                                                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">Subject</th>
                                                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enquiries?.map((enq: any, i: number) => (
                                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="p-4 text-sm font-bold">{enq.name}</td>
                                                    <td className="p-4 text-sm text-gray-400">{enq.email}</td>
                                                    <td className="p-4 text-sm">{enq.subject}</td>
                                                    <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{enq.message}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!enquiries?.length && <div className="p-12 text-center text-gray-500">No inquiries found.</div>}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="gallery">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Gallery Management</h2>
                            <GalleryModal onSave={() => queryClient.invalidateQueries({ queryKey: ["gallery"] })} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gallery?.map((item: any) => (
                                <div key={item._id} className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                                    <img src={item.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.title} />
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                                        <p className="font-bold text-white">{item.title}</p>
                                        <p className="text-xs text-gray-400">{item.category}</p>
                                        <Button variant="ghost" size="sm" className="mt-4 w-full text-red-500 hover:bg-red-500/10" onClick={() => inovxApi.deleteGalleryItem(item._id).then(() => queryClient.invalidateQueries({ queryKey: ["gallery"] }))}>
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {!gallery?.length && <div className="col-span-full p-20 text-center border-2 border-dashed border-white/5 rounded-3xl text-gray-600 font-mono italic">NO_GALLERY_ITEMS_IN_DATABASE</div>}
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-[#0a0a0a] border-white/5">
                                <CardHeader>
                                    <CardTitle>Social Media Handles</CardTitle>
                                    <CardDescription>Configure global social links used in footer and sections.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ConfigInput label="LinkedIn URL" configKey="linkedin_url" value={config?.linkedin_url} onUpdate={(val) => inovxApi.updateConfig('linkedin_url', val)} />
                                    <ConfigInput label="GitHub URL" configKey="github_url" value={config?.github_url} onUpdate={(val) => inovxApi.updateConfig('github_url', val)} />
                                    <ConfigInput label="Instagram URL" configKey="instagram_url" value={config?.instagram_url} onUpdate={(val) => inovxApi.updateConfig('instagram_url', val)} />
                                    <ConfigInput label="Twitter URL" configKey="twitter_url" value={config?.twitter_url} onUpdate={(val) => inovxApi.updateConfig('twitter_url', val)} />
                                </CardContent>
                            </Card>

                            <Card className="bg-[#0a0a0a] border-white/5">
                                <CardHeader>
                                    <CardTitle>Philosophy Content</CardTitle>
                                    <CardDescription>Major site-wide text blocks.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ConfigInput area label="Main Philosophy Message" configKey="philosophy_msg" value={config?.philosophy_msg} onUpdate={(val) => inovxApi.updateConfig('philosophy_msg', val)} />
                                    <ConfigInput area label="Vision Statement" configKey="vision_statement" value={config?.vision_statement} onUpdate={(val) => inovxApi.updateConfig('vision_statement', val)} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );
}

// Helper Components
function DashboardCard({ label, value, icon, color }: any) {
    return (
        <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden group hover:border-primary/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-mono text-gray-500 uppercase tracking-widest">{label}</CardTitle>
                <div className={`${color} opacity-70`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold tracking-tighter">{value}</div>
                <div className="mt-2 text-[10px] font-mono text-gray-600">IDLE_SYSTEM_POLLING</div>
            </CardContent>
        </Card>
    );
}

function QuickLink({ label, href, external, disabled }: any) {
    if (disabled) return <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed"><span>{label}</span><ChevronRight className="w-4 h-4" /></div>;
    return (
        <a href={href} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all group">
            <span className="font-medium group-hover:text-primary transition-colors">{label}</span>
            {external ? <ExternalLink className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />}
        </a>
    );
}

function ResourceCard({ title, sub, img, isLive, onDelete, liveToggle }: any) {
    return (
        <div className="group flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all">
            {img ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    <img src={img} className="w-full h-full object-cover" alt={title} />
                </div>
            ) : (
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                    <ImageIcon className="w-6 h-6 text-gray-700" />
                </div>
            )}
            <div className="flex-1">
                <h4 className="font-bold text-lg">{title}</h4>
                <p className="text-xs text-gray-500 font-mono italic">{sub}</p>
            </div>
            <div className="flex items-center gap-2">
                {liveToggle && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={liveToggle}
                        className={isLive ? "text-red-500 hover:text-red-400" : "text-gray-500 hover:text-white"}
                    >
                        <Radio className={`w-4 h-4 ${isLive ? 'animate-pulse' : ''}`} />
                    </Button>
                )}
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500" onClick={onDelete}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

// Modals
function ProjectModal({ onSave }: any) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        try {
            await inovxApi.createProject(formData);
            toast.success("Project added");
            onSave();
        } catch (e) { toast.error("Failed to add project"); }
        finally { setLoading(false); }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> New Project</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription className="text-gray-500">Showcase your technical excellence.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" required className="bg-black/50 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input name="category" required className="bg-black/50 border-white/10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea name="description" required className="bg-black/50 border-white/10" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Github Link</Label>
                                <Input name="github" className="bg-black/50 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Demo Link</Label>
                                <Input name="demo" className="bg-black/50 border-white/10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Input type="file" name="image" className="bg-black/50 border-white/10" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-primary">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Project
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function EventModal({ onSave }: any) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        try {
            await inovxApi.createEvent(formData);
            toast.success("Event added");
            onSave();
        } catch (e) { toast.error("Failed to add event"); }
        finally { setLoading(false); }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> New Event</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Event</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" required className="bg-black/50 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Input name="date" placeholder="March 15, 2025" required className="bg-black/50 border-white/10" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input name="location" required className="bg-black/50 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input name="category" required className="bg-black/50 border-white/10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea name="description" required className="bg-black/50 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Input type="file" name="image" className="bg-black/50 border-white/10" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-primary">Create Event</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function TeamModal({ onSave }: any) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        try {
            await inovxApi.createTeamMember(formData);
            toast.success("Member added");
            onSave();
        } catch (e) { toast.error("Failed to add member"); }
        finally { setLoading(false); }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input name="name" required className="bg-black/50 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input name="role" required className="bg-black/50 border-white/10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea name="bio" className="bg-black/50 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Input type="file" name="image" className="bg-black/50 border-white/10" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-primary">Add Member</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function StatModal({ onSave }: any) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const data = Object.fromEntries(new FormData(e.target));
        try {
            await inovxApi.createStatistic({ ...data, value: Number(data.value) });
            toast.success("Stat added");
            onSave();
        } catch (e) { toast.error("Failed to add stat"); }
        finally { setLoading(false); }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> New Statistic</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Platform Metric</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input name="label" placeholder="Projects Completed" required className="bg-black/50 border-white/10" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Value</Label>
                                <Input type="number" name="value" required className="bg-black/50 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Suffix</Label>
                                <Input name="suffix" placeholder="+" defaultValue="+" className="bg-black/50 border-white/10" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-primary">Save Metric</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
function ConfigInput({ label, configKey, value, onUpdate, area }: any) {
    const [currentValue, setCurrentValue] = useState(value || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (value) setCurrentValue(value);
    }, [value]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await onUpdate(currentValue);
            toast.success(`${label} updated`);
        } catch (e) { toast.error("Update failed"); }
        finally { setLoading(false); }
    };

    return (
        <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-mono text-gray-500">{label}</Label>
            <div className="flex gap-2">
                {area ? (
                    <Textarea value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="bg-black/50 border-white/10" rows={4} />
                ) : (
                    <Input value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="bg-black/50 border-white/10" />
                )}
                <Button variant="ghost" size="icon" disabled={loading} onClick={handleSave} className="shrink-0 bg-white/5">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
}

function GalleryModal({ onSave }: any) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        try {
            await inovxApi.createGalleryItem(formData);
            toast.success("Image added to gallery");
            onSave();
        } catch (e) { toast.error("Failed to add image"); }
        finally { setLoading(false); }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Upload Image</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Gallery Upload</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input name="title" required className="bg-black/50 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Input name="category" placeholder="Events, Hackathon, etc." required className="bg-black/50 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Input type="file" name="image" required className="bg-black/50 border-white/10" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-primary">Upload to Cloud</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
