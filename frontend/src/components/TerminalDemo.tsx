import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo() {
    return (
        <Terminal>
            <TypingAnimation>&gt; npx inovx-cli init --project=venture-lab</TypingAnimation>

            <AnimatedSpan className="text-green-500">
                ✔ Analyzing market opportunity.
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                ✔ Designing scalable technical architecture.
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                ✔ Integrating business logic with core APIs.
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                ✔ Validating financial models.
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                ✔ Generating pitch decks.
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                ✔ Deploying across cloud infrastructure.
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                ✔ Optimizing user acquisition funnel.
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-500">
                <span>ℹ Strategy verified:</span>
                <span className="pl-2">- tech-business-synergy.pdf</span>
            </AnimatedSpan>

            <TypingAnimation className="text-muted-foreground">
                Success! InovX project initialization completed.
            </TypingAnimation>

            <TypingAnimation className="text-muted-foreground">
                You are ready to disrupt the market.
            </TypingAnimation>
        </Terminal>
    )
}
