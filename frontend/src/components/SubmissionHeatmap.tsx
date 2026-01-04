import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming this exists

interface SubmissionHeatmapProps {
    data: Record<string, number>;
}

export function SubmissionHeatmap({ data }: SubmissionHeatmapProps) {
    const { dates, totalSubmissions, activeDays, maxStreak, weeks } = useMemo(() => {
        const today = new Date();
        const result = [];
        let total = 0;
        let active = 0;
        let currentStreak = 0;
        let maxStreak = 0;

        // Sort dates to ensure streak calculation is correct
        // We generate 365 days back
        for (let i = 364; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const count = data[dateStr] || 0;

            total += count;
            if (count > 0) {
                active++;
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }

            result.push({ date: d, count, dateStr });
        }

        // Group into weeks
        const weeksData: { date: Date; count: number; dateStr: string }[][] = [];
        let currentWeek: { date: Date; count: number; dateStr: string }[] = [];

        // Find the day of the week for the first date (0 = Sunday, 1 = Monday ...)
        const firstDayOfWeek = result[0].date.getDay();

        // Fill initial empty days if necessary to align to Sunday start
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push({ date: new Date(0), count: -1, dateStr: '' }); // Placeholder
        }

        result.forEach((day) => {
            currentWeek.push(day);
            if (currentWeek.length === 7) {
                weeksData.push(currentWeek);
                currentWeek = [];
            }
        });

        // Push remaining
        if (currentWeek.length > 0) {
            weeksData.push(currentWeek);
        }

        return {
            dates: result,
            totalSubmissions: total,
            activeDays: active,
            maxStreak,
            weeks: weeksData
        };
    }, [data]);

    // Generate Month Labels
    const monthLabels = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const labels: { label: string; index: number }[] = [];

        weeks.forEach((week, index) => {
            const firstDay = week.find(d => d.count !== -1);
            if (firstDay) {
                const date = firstDay.date;
                // If it's the first week of the month (roughly)
                if (date.getDate() <= 7) {
                    // Check if we already have a label for this month nearby to avoid clutter?
                    // Or just check if the month changed from previous week
                    // Simple logic: if week contains the 1st of a month, or closer logic
                    const prevWeek = weeks[index - 1];
                    const prevDate = prevWeek?.find(d => d.count !== -1)?.date;

                    if (!prevDate || prevDate.getMonth() !== date.getMonth()) {
                        labels.push({ label: months[date.getMonth()], index });
                    }
                }
            }
        });
        return labels;
    }, [weeks]);

    const getColor = (count: number) => {
        if (count === -1) return 'invisible'; // Spacer
        if (count === 0) return 'bg-[#2d2d2d] dark:bg-[#161b22] border-[#1b1f230f]'; // Dark gray for empty
        if (count <= 2) return 'bg-[#0e4429]'; // Dark Green
        if (count <= 5) return 'bg-[#006d32]'; // Medium Green
        if (count <= 10) return 'bg-[#26a641]'; // Light Green
        return 'bg-[#39d353]'; // Bright Green
    };

    return (
        <Card className="w-full bg-card/50 border-border/40 backdrop-blur-sm p-4">
            <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-foreground">
                        <span className="text-xl font-semibold">{totalSubmissions}</span>
                        <span className="text-muted-foreground">submissions in the past one year</span>
                        <Info className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div>
                            <span className="block text-xs">Total active days:</span>
                            <span className="font-semibold text-foreground">{activeDays}</span>
                        </div>
                        <div>
                            <span className="block text-xs">Max streak:</span>
                            <span className="font-semibold text-foreground">{maxStreak}</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent">
                            Current <ChevronDown className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="overflow-x-auto pb-2">
                    <div className="flex flex-col min-w-[700px]">
                        <div className="flex gap-1">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day, dayIndex) => (
                                        <TooltipProvider key={`${weekIndex}-${dayIndex}`}>
                                            <Tooltip delayDuration={0}>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className={cn(
                                                            "w-3 h-3 rounded-[2px]",
                                                            getColor(day.count)
                                                        )}
                                                    />
                                                </TooltipTrigger>
                                                {day.count !== -1 && (
                                                    <TooltipContent className="bg-popover text-popover-foreground text-xs p-2">
                                                        <p>
                                                            <span className="font-semibold">{day.count || 'No'} submissions</span> on {day.date.toLocaleDateString(undefined, {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Month Labels */}
                        <div className="relative h-6 mt-1">
                            {monthLabels.map((label, i) => (
                                <div
                                    key={i}
                                    className="absolute text-xs text-muted-foreground"
                                    style={{
                                        left: `${label.index * 16}px` // 12px width + 4px gap approx
                                    }}
                                >
                                    {label.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-end items-center gap-2 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-[2px] bg-[#161b22]" />
                        <div className="w-3 h-3 rounded-[2px] bg-[#0e4429]" />
                        <div className="w-3 h-3 rounded-[2px] bg-[#006d32]" />
                        <div className="w-3 h-3 rounded-[2px] bg-[#26a641]" />
                        <div className="w-3 h-3 rounded-[2px] bg-[#39d353]" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </Card>
    );
}

