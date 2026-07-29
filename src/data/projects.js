/*
 * Case study content, Process-Documentary template:
 * Hero (question + media) -> Meta strip -> / THE PROBLEM -> / THE CAUSES (3-col)
 * -> / THE CONSEQUENCES (3-col) -> / USER RESEARCH or / FIELD NOTES (quotes -> Therefore)
 * -> / THE SOLUTION (feature blocks). Media strings mark swap targets for real assets.
 */

const entries = [
  {
    slug: 'smartrip',
    n: '02',
    title: 'SMARTRIP',
    homeStatement: 'ACTIONABLE TRAVEL PLANS FROM SAVED VIDEOS',
    homeMedia: 'FULL-BLEED SHOWREEL — MAGIC URL SCREEN RECORDING',
    question: 'What if a saved video could plan the trip?',
    heroMedia: 'FULL-BLEED VIDEO — MAGIC URL: PASTE TO ITINERARY',
    meta: {
      challenge: 'Consumer Travel App',
      role: 'Product Lead',
      industry: 'Travel · AI',
    },
    link: 'https://smart-travel-1ee45729.base44.app/',
    linkLabel: 'View live prototype',
    problem: {
      headline: 'Trips are inspired on TikTok and planned in chaos',
      body: 'The places live in a saved folder. The plan lives in a group chat, two spreadsheets and someone\'s memory. Between inspiration and itinerary sit hours of manual work nobody volunteers for.',
      media: '/smartrip-problem.mp4',
    },
    causes: [
      {
        icon: 'blackhole',
        title: 'The TikTok black hole',
        body: 'Saved videos are bookmarks to nowhere. The places inside them are never extracted, never mapped, never scheduled. Inspiration goes in; nothing comes out.',
      },
      {
        icon: 'fragments',
        title: 'Tool fragmentation',
        body: 'The plan lives in five places at once: WhatsApp for debate, Docs for lists, Maps for pins. No tool owns the trip, so nobody trusts any of them.',
      },
      {
        icon: 'burden',
        title: 'The group planner penalty',
        body: 'One person always ends up carrying the mental load. They gather links, chase votes and build the route. Planning becomes their unpaid job.',
      },
    ],
    consequences: [
      {
        icon: 'flatline',
        title: 'Trips die in the chat',
        body: 'The group agrees on a destination, the thread goes quiet, and the trip quietly never happens.',
      },
      {
        icon: 'grind',
        title: 'Planning feels like work',
        body: 'What should be anticipation becomes admin. Hours of copying places between apps before anyone books anything.',
      },
      {
        icon: 'copies',
        title: 'Generic beats curated',
        body: 'Exhausted planners fall back on the top-ten list. Three hundred saved videos, and the group ends up at the same three bars.',
      },
    ],
    research: {
      label: 'User Research',
      headline: '14 in-depth interviews',
      breakdown: 'Young adults, 21–30 · group trip organizers · frequent solo travelers',
      quotes: [
        {
          quote: 'I have hundreds of saved TikToks. I never open the folder again. We just end up at the same three bars. All that inspiration, and none of it becomes a plan.',
          source: 'Interview 04 · trip organizer',
          insight: 'Saved content is inspiration without infrastructure. The gap is extraction, not discovery.',
          therefore: 'The Magic URL: paste the saved video, and a multimodal engine extracts every place automatically — no manual re-typing of what\'s already sitting in the footage.',
          image: '/portrait-1.png',
        },
        {
          quote: 'I send links in the chat. Nobody opens them. Somehow the route is still on me. I don\'t want to be the bottleneck anymore.',
          source: 'Interview 09 · group organizer',
          insight: 'The organizer is the bottleneck. Remove their manual work and the whole group unblocks.',
          therefore: 'Routing has to sequence itself. If the system clusters and orders the stops the way a local would, no single person has to carry the planning load for the group.',
          image: '/portrait-2.png',
        },
        {
          quote: 'If it takes more than five minutes, I skip it. I just wing it when I land. Spreadsheets become another chore. I want something faster than giving up.',
          source: 'Interview 12 · solo traveler',
          insight: 'The effort budget for planning is minutes, not hours. Anything slower loses to improvisation.',
          therefore: 'Speed has to beat improvisation, and the plan has to survive a day that doesn\'t go as scheduled — fast enough to win, adaptive enough to still hold up on day three.',
          image: '/portrait-3.png',
        },
      ],
    },
    solution: [
      {
        headline: 'The Magic URL',
        body: 'Paste a Reel or TikTok link. A multimodal engine watches the video, extracts every location, and returns a complete day-by-day itinerary in seconds.',
        media: '/smartrip-magic-url.mp4',
        ratio: 'aspect-[16/9]',
      },
      {
        headline: 'Routing that thinks like a local',
        body: 'Places are clustered by geography, days sequenced to kill backtracking, and nightlife slotted where it belongs: after dark, near where you already are.',
        media: '/smartrip-routing.png',
        ratio: 'aspect-[16/10]',
      },
      {
        headline: 'Schedule-Aware AI',
        body: 'Generic recommendations are useless if they don’t fit your day. Smartrip’s AI analyzes your existing itinerary—understanding the pace, location, and type of activities you already have planned—to suggest the perfect missing piece exactly when you need it.',
        media: '/smartrip-ai-suggest.png',
        ratio: 'aspect-[16/10]',
      },
    ],
  },
  {
    slug: 'nexus',
    n: '01',
    title: 'NEXUS',
    homeStatement: 'ACTIONABLE INSIGHTS AT COMMUNITY SCALE',
    homeMedia: 'FULL-BLEED STILL — NEXUS PUBLISH VERDICT SCREEN',
    question: 'WHAT HAPPENS WHEN REAL RELATIONSHIPS ARE REDUCED TO ROWS IN A SPREADSHEET?',
    heroMedia: 'FULL-BLEED IMAGE — NEXUS PUBLISH VERDICT SCREEN',
    meta: {
      challenge: 'Automation Platform',
      role: 'Product & Engineering',
      industry: 'B2B SaaS · CRM',
    },
    problem: {
      headline: 'THE CHAOS OF SCALING A DIGITAL COMMUNITY',
      body: "Managing over 75,000 members, daily DMs, and incoming leads across multiple platforms quickly became an administrative nightmare. Without a centralized system, valuable conversations slipped through the cracks, high-value leads were lost in the noise, and community management turned from a strategic growth engine into a reactive, exhausting process. Spreadsheets simply couldn't keep up.",
      media: '/nexus-problem.png',
    },
    causes: [
      {
        icon: 'fragments',
        title: 'The logistics bury you',
        body: 'Real relationships don’t fit inside a funnel. Tracking who reached out, when, what was said, and whose turn it is to reply becomes an impossible cognitive load at scale.',
      },
      {
        icon: 'blackhole',
        title: 'Spreadsheets aren\'t people',
        body: 'Most CRMs measure status, not context. They turn complex human tensions and goals into generic rows in a database, stripping away what the person is actually reaching for.',
      },
      {
        icon: 'switch',
        title: 'Automating the human away',
        body: 'To survive the volume, most tools force you to automate the human away with cold, robotic broadcasts. You choose between engaging like a robot or drowning in manual work.',
      },
    ],
    consequences: [
      {
        icon: 'flatline',
        title: 'Conversations fall through',
        body: 'Without a system that knows exactly who has been waiting on you the longest, high-value leads and delicate, important conversations simply slip through the cracks.',
      },
      {
        icon: 'grind',
        title: 'Context is forgotten',
        body: 'You forget who they are beneath the message. Every reply requires digging through chat histories and old notes just to remember the tension and the goal.',
      },
      {
        icon: 'alert',
        title: 'Exhaustive reactive work',
        body: 'What should be proactive relationship-building becomes an exhausting administrative chore. The warmth is lost because the operator is burned out.',
      },
    ],
    research: {
      label: 'The Philosophy',
      headline: 'The Machine organizes. The Human consults.',
      breakdown: 'Data belongs to the machine · Warmth stays with the person',
      quotes: [
        {
          quote: 'Everything cold — memory, ranking, timing, data — belongs to the machine. Everything warm — judgment, care, the actual conversation — stays with the person. Nexus is that line, drawn cleanly.',
          source: 'Core Product Principle',
          insight: 'Most tools automate the human away. Nexus does the opposite.',
          therefore: 'The system must reason over live data and organize the queue, but it stops there. The actual engagement must remain fundamentally human.',
          image: '/field-note-1.jpeg',
        },
        {
          quote: 'No one here is just a row in a spreadsheet. When you measure relationships by how long a card sits in a column, you lose the person. We needed to measure the only thing that actually matters: how long someone has been waiting on you.',
          source: 'Community Operations Insight',
          insight: 'CRMs track status, but community management requires tracking human context and timing.',
          therefore: 'The interface must shift from a traditional static board to a dynamic, time-aware queue that elevates the most urgent human needs to the top.',
          image: '/field-note-2.jpeg',
        },
        {
          quote: 'We were spending 80% of our time categorizing issues and 20% solving them. The system needed to flip that ratio. Let the AI do the sorting, so the humans can do the connecting.',
          source: 'Product Strategy Insight',
          insight: 'Time spent classifying is time not spent connecting — and classification is exactly what a machine is good at.',
          therefore: 'Nexus automates the sorting entirely, so the operator\'s attention goes to the 20% that actually needs a human: the conversation itself.',
          image: '/portrait-4.jpeg',
        },
      ],
    },
    solution: [
      /* Section hero: image only, no copy — headline/body are intentionally
         omitted so SolutionBlock renders just the dashboard directly under the
         / THE SOLUTION title. */
      {
        media: '/nexus-solution-dashboard.png',
        ratio: 'aspect-[16/10]',
      },
      {
        headline: 'The Queue: Whose move is it?',
        body: 'Nexus doesn’t measure how long a card has sat in a column. It measures the only thing that matters — how long someone has been waiting on you. It remembers every interaction and quietly lifts the person who needs you next to the top.',
        media: '/nexus-queue-interface.png',
        ratio: 'aspect-[16/10]',
      },
      {
        headline: 'The Guarantee: It drafts, you decide',
        body: 'Nexus writes the message in your voice, grounded in the real conversation, and then hands you the pen. Nothing is ever sent on your behalf. The machine remembers; the human shows up.',
        media: '/nexus-guarantee.png',
        ratio: 'aspect-[16/10]',
      },
      {
        headline: 'The Intelligence: See the forest and the trees',
        body: 'Nexus gives you a bird’s-eye view of your entire operation. From tracking a 75,000-strong community reach down to individual qualified leads in the CRM pipeline, it measures what actually moves the needle. Real-time data, zero guesswork.',
        media: '/nexus-analytics.png',
        ratio: 'aspect-[16/10]',
      },
      /* Bottom of the page: the marketing landing-page video, separated from the
         product UI above by its own Philosophy framing. */
      {
        headline: 'The Philosophy',
        body: 'The technology is just the vehicle. Here is the core belief behind Nexus and why it was built.',
        media: '/nexus-landing-page.mp4',
        ratio: 'aspect-[16/9]',
      },
    ],
  },
]

/* Homepage and navigation order: NEXUS first, Smartrip second */
export const projects = ['nexus', 'smartrip'].map((s) => entries.find((p) => p.slug === s))

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
