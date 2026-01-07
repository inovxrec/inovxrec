
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import api from '@/lib/axios';

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    connections: string[];
}

interface RoadmapStats {
    [key: string]: {
        total: number;
        solved: number;
        slug: string;
    };
}

// Coordinate system: X range [-300, 300], Y range [0, 800]
// Center is 0, 0 at top. We will translate this to SVG coordinates.
const nodes: Node[] = [
    { id: 'arrays', label: 'Arrays & Hashing', x: 0, y: 0, connections: ['two-pointers', 'stack'] },

    { id: 'two-pointers', label: 'Two Pointers', x: -150, y: 120, connections: ['binary-search', 'sliding-window', 'linked-list'] },
    { id: 'stack', label: 'Stack', x: 150, y: 120, connections: [] },

    { id: 'binary-search', label: 'Binary Search', x: -280, y: 240, connections: ['trees'] },
    { id: 'sliding-window', label: 'Sliding Window', x: -80, y: 240, connections: ['trees'] },
    { id: 'linked-list', label: 'Linked List', x: 120, y: 240, connections: ['trees'] },

    { id: 'trees', label: 'Trees', x: -80, y: 360, connections: ['tries', 'heap', 'backtracking'] },

    { id: 'tries', label: 'Tries', x: -280, y: 480, connections: [] },
    { id: 'heap', label: 'Heap / Priority Queue', x: -80, y: 480, connections: ['intervals', 'greedy', 'advanced-graphs'] },
    { id: 'backtracking', label: 'Backtracking', x: 220, y: 480, connections: ['graphs', '1d-dp'] },

    { id: 'intervals', label: 'Intervals', x: -320, y: 600, connections: [] },
    { id: 'greedy', label: 'Greedy', x: -120, y: 600, connections: [] },
    { id: 'advanced-graphs', label: 'Advanced Graphs', x: 80, y: 600, connections: [] },

    { id: 'graphs', label: 'Graphs', x: 280, y: 600, connections: ['2d-dp'] },
    { id: '1d-dp', label: '1-D DP', x: 480, y: 600, connections: ['2d-dp', 'bit-manipulation'] },

    { id: '2d-dp', label: '2-D DP', x: 380, y: 720, connections: ['math'] },
    { id: 'bit-manipulation', label: 'Bit Manipulation', x: 580, y: 720, connections: ['math'] },

    { id: 'math', label: 'Math & Geometry', x: 480, y: 840, connections: [] },
];

const NODE_WIDTH = 180;
const NODE_HEIGHT = 50;

// Transform logic: Shift coordinates to be positive for SVG
const OFFSET_X = 500; // Center the 0 x-coord at 400px
const OFFSET_Y = 120;  // Padding top

const Roadmap = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<RoadmapStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/problems/meta/roadmap/');
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch roadmap stats", error);
            }
        };
        fetchStats();
    }, []);

    const getNodeStats = (label: string) => {
        // Basic mapping, might need more robust slug comparison
        // The backend uses tag name as key
        if (!stats) return { solved: 0, total: 0 };
        return stats[label] || { solved: 0, total: 10 }; // Default 10 if missing to avoid div/0 visual
    };

    const handleClick = (nodeId: string, label: string) => {
        navigate(`/problems?tag=${encodeURIComponent(label)}`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 flex justify-center overflow-x-auto">
            <div className="relative w-[800px] h-[1000px]"> {/* Fixed container for layout */}
                <h1 className="text-3xl font-bold text-center mb-8 absolute top-0 w-full">Learning Roadmap</h1>

                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    {nodes.map(node => (
                        node.connections.map(targetId => {
                            const target = nodes.find(n => n.id === targetId);
                            if (!target) return null;

                            // Calculate start and end points for lines
                            const x1 = node.x + OFFSET_X;
                            const y1 = node.y + OFFSET_Y + NODE_HEIGHT; // Start from bottom of source
                            const x2 = target.x + OFFSET_X;
                            const y2 = target.y + OFFSET_Y; // End at top of target

                            // Bezier curve for smoother lines
                            const midY = (y1 + y2) / 2;

                            return (
                                <motion.path
                                    key={`${node.id}-${targetId}`}
                                    d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-muted-foreground/30"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                />
                            );
                        })
                    ))}
                </svg>

                {nodes.map((node, index) => {
                    const { solved, total } = getNodeStats(node.label);
                    const percentage = total > 0 ? (solved / total) * 100 : 0;
                    const isCompleted = percentage === 100;

                    return (
                        <motion.div
                            key={node.id}
                            className="absolute z-10"
                            style={{
                                left: node.x + OFFSET_X - (NODE_WIDTH / 2),
                                top: node.y + OFFSET_Y,
                                width: NODE_WIDTH,
                                height: NODE_HEIGHT
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.05, type: "spring" }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card
                                        className={`
                      h-full flex flex-col justify-center px-4 cursor-pointer hover:border-primary transition-all hover:scale-105 active:scale-95
                      ${isCompleted ? 'border-green-500/50 bg-green-500/10' : 'bg-card'}
                    `}
                                        onClick={() => handleClick(node.id, node.label)}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold truncate">{node.label}</span>
                                            <span className="text-[10px] text-muted-foreground">{solved}/{total}</span>
                                        </div>
                                        <Progress value={percentage} className="h-1.5" />
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{node.label}: {solved} solved out of {total}</p>
                                </TooltipContent>
                            </Tooltip>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Roadmap;
