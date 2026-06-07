/**
 * Work experience data structure.
 * Each entry: company, role, dates, summary, impacts, techStack
 *
 * To add a new experience:
 * - Copy the structure below and fill in your data
 * - impacts: 3–5 results-oriented bullets (prefer measurable outcomes)
 * - techStack: array of tech/tool names for chips
 */
export const experienceSchema = {
    company: '', // string
    role: '', // string
    dates: '', // string, e.g. "2022 – Present"
    summary: '', // 1–2 sentences
    impacts: [], // array of strings (3–5 bullets)
    techStack: [], // array of strings (chips)
}

export const experiences = [
    {
        company: 'Hybrone',
        role: 'Senior Frontend Developer',
        dates: '2022 – Present',
        summary:
            'Leading frontend architecture and development for a B2B SaaS platform. Own the design system, component library, and performance optimization across the product.',
        impacts: [
            'Reduced initial bundle size by ~35% via code splitting and lazy loading',
            'Introduced a reusable design system used across 4 product teams',
            'Improved Core Web Vitals; LCP under 2.5s on 95% of page loads',
            'Mentored 2 junior developers on React patterns and testing',
        ],
        techStack: ['React', 'TypeScript', 'Chakra UI', 'GraphQL', 'Vite'],
    },
    {
        company: 'TechCorp',
        role: 'Frontend Engineer',
        dates: '2019 – 2022',
        summary:
            'Built customer-facing dashboards and internal tools for a fintech product. Focused on real-time data visualization and accessibility compliance.',
        impacts: [
            'Delivered 3 major dashboard features used by 50K+ monthly active users',
            'Achieved WCAG 2.1 AA compliance across core user flows',
            'Reduced dashboard load time by 40% through query optimization',
        ],
        techStack: ['React', 'Redux', 'D3.js', 'Node.js', 'PostgreSQL'],
    },
    {
        company: 'StartupXYZ',
        role: 'Frontend Developer',
        dates: '2017 – 2019',
        summary:
            'Full-stack leaning frontend role at an early-stage SaaS startup. Owned the entire user interface and contributed to backend APIs.',
        impacts: [
            'Shipped MVP in 8 weeks; product grew to 2,000+ users in first year',
            'Implemented real-time collaboration features using WebSockets',
            'Integrated third-party payment and analytics services',
        ],
        techStack: ['React', 'Next.js', 'Tailwind', 'Express', 'MongoDB'],
    },
]
