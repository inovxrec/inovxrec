import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/card';

interface RuntimeDistributionProps {
    userRuntime: number;
    language: string;
}

export function RuntimeDistribution({ userRuntime, language }: RuntimeDistributionProps) {
    const data = useMemo(() => {
        // Generate mock normal distribution based on language typical speeds
        // JS/Python: slower (avg 60-80ms), C++/Java: faster (avg 0-10ms or 20-40ms)

        let center = 50;
        let spread = 20;

        if (language === 'cpp' || language === 'java') {
            center = 20;
            spread = 15;
        } else {
            center = 60;
            spread = 30;
        }

        const points = [];
        for (let i = 0; i <= 200; i += 5) {
            // Basic normal distribution formula
            const prob = Math.exp(-Math.pow(i - center, 2) / (2 * Math.pow(spread, 2)));
            points.push({
                runtime: i,
                percentage: prob * 100, // Scale up for visibility
                isUser: Math.abs(i - userRuntime) < 5 // Approximate bucket
            });
        }
        return points;
    }, [userRuntime, language]);

    // Calculate percentage of users beat
    const beatPercentage = useMemo(() => {
        // Simple mock calculation: assume user beat everyone strictly slower
        // In real world, this would be an integral/CDF
        const total = data.reduce((acc, curr) => acc + curr.percentage, 0);
        const slower = data.filter(d => d.runtime > userRuntime).reduce((acc, curr) => acc + curr.percentage, 0);
        return Math.min(99.9, Math.max(0, (slower / total) * 100)).toFixed(1);
    }, [data, userRuntime]);

    return (
        <Card className="p-6 mt-4 bg-black/40 border-white/10 backdrop-blur-sm">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Runtime Distribution</h3>
                <p className="text-gray-400">
                    You beat <span className="text-green-400 font-bold">{beatPercentage}%</span> of {language} users with <span className="text-white font-mono">{userRuntime}ms</span>
                </p>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap={1}>
                        <XAxis
                            dataKey="runtime"
                            stroke="#666"
                            tick={{ fill: '#666', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}ms`}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-black border border-white/20 p-2 rounded shadow-xl text-xs">
                                            <p className="text-white mb-1">Runtime: {payload[0].payload.runtime}ms</p>
                                            {payload[0].payload.isUser && <p className="text-green-400 font-bold">Your Runtime</p>}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="percentage" radius={[2, 2, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.isUser ? '#4ade80' : 'rgba(255,255,255,0.1)'}
                                />
                            ))}
                        </Bar>
                        <ReferenceLine x={userRuntime} stroke="#4ade80" strokeDasharray="3 3" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
