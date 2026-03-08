import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo() {
    return (
        <Terminal className="max-w-3xl">
            <TypingAnimation className="text-primary font-bold">&gt; npx inovx-cli init --elite --project=autonomous-venture</TypingAnimation>

            <AnimatedSpan className="text-white/60">
                <span className="text-primary mr-2">⯈</span> Initializing InovX Industrial Protocol...
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [MARKET_INTEL] Analyzing untapped global opportunities...
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [ARCH_DESIGN] Scaling technical infrastructure to 10M+ RPS...
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [LOGIC_INTEGRATION] Mapping business flows to microservices...
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [FINANCE_MODEL] Stress-testing ROI and burn-rate projections...
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [PITCH_GEN] Synthesizing elite-tier investor presentation...
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400/80 italic pl-6 border-l border-white/10">
                <span>↳ Strategy verified: </span>
                <span className="text-white font-mono">synergy_v4.2_final.cfg</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [CLOUD_DEPLOY] Orchestrating global edge clusters...
            </AnimatedSpan>

            <AnimatedSpan className="text-green-400">
                <span className="mr-2">✔</span> [ACQUISITION] Optimizing ultra-low CAC growth loops...
            </AnimatedSpan>

            <div className="h-2" />

            <TypingAnimation className="text-white font-bold bg-white/10 px-2 py-1 rounded inline-block">
                INOVX_SYSTEM_DEPLOYED: DISRUPTION_READY
            </TypingAnimation>

            <TypingAnimation className="text-white/40 italic">
                &gt; Listening on port 8080. The future is now accessible.
            </TypingAnimation>
        </Terminal>

    )
}
