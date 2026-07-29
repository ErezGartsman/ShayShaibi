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
        body: 'The group agrees on a destination, the thread goes quiet, and the trip quietly never happens after that.',
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
          quote: 'I save so many TikToks before a trip, but when I actually get there I barely look at them. I usually remember one or two places and the rest just gets lost.',
          source: 'Interview 04 · trip organizer',
          insight: 'People collect travel inspiration faster than they can organize or retrieve it.',
          therefore: 'The product should turn saved content into usable places and recommendations, without asking users to manually extract information from each video.',
          image: '/portrait-1.png',
        },
        {
          quote: 'I usually end up being the one who has to figure everything out. I send the links, ask everyone what they want to do, and then somehow I am still the one making the plan.',
          source: 'Interview 09 · group organizer',
          insight: 'Group planning creates an invisible coordination burden for one person.',
          therefore: 'The product should reduce the organizer’s workload by helping the group turn individual preferences into a shared plan.',
          image: '/portrait-2.png',
        },
        {
          quote: 'If I have to sit down for an hour and plan the whole trip, I probably won’t do it. I would rather save a few places and figure things out when I get there.',
          source: 'Interview 12 · solo traveler',
          insight: 'For some travelers, extensive planning feels like work and competes with the appeal of spontaneity.',
          therefore: 'The planning experience needs to be fast and lightweight enough to support spontaneous travel rather than trying to eliminate it.',
          image: '/portrait-3.png',
        },
      ],
    },
    solution: [
    {
      headline: 'The Magic URL',
      body: 'Paste a Reel or TikTok link and Smartrip turns the places in the video into a usable itinerary. No screenshots, saving, or manual searching required.',
      media: '/smartrip-magic-url.mp4',
      ratio: 'aspect-[16/9]',
    },
    {
      headline: 'Routing that thinks like a local',
      body: 'Smartrip groups places by location and builds each day around where you already are, reducing unnecessary travel and backtracking.',
      media: '/smartrip-routing.png',
      ratio: 'aspect-[16/10]',
    },
    {
      headline: 'Schedule-Aware AI',
      body: 'Already have plans? Smartrip looks at your itinerary, location, and available time to suggest places that actually fit into your day.',
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
      body: "Managing over 75,000 members across multiple platforms made it increasingly difficult to keep track of conversations, leads, and follow-ups. Spreadsheets and fragmented tools couldn't keep up, turning community management into a reactive, manual process.",
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
        body: 'Most CRMs measure status, not context. They turn complex human tensions and goals into generic database rows, stripping away what the person is actually seeking.',
      },
      {
        icon: 'switch',
        title: 'Automating the human away',
        body: 'To survive the volume, most tools force you to automate the human away with robotic broadcasts. You choose between engaging like a robot or drowning in manual work.',
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
          quote: 'There are things I want the system to handle for me, like remembering what happened, prioritizing people and telling me who needs attention. But I do not want it deciding how I talk to someone. That part needs to stay with me.',
          source: 'Community Manager Interview',
          insight: 'The value of AI is in reducing cognitive load, not replacing the human relationship.',
          therefore: 'Nexus should handle memory, prioritization and timing, while leaving judgment and communication to the operator.',
          image: '/field-note-1.jpeg',
        },
        {
          quote: 'The problem was not that we had too many people. It was that we did not always know who needed us most. Someone could sit there for days because the system was showing me everything in the same way.',
          source: 'Community Operations Interview',
          insight: 'A traditional CRM shows status, but does not show who is actually waiting for a response.',
          therefore: 'The interface should prioritize people based on urgency, context and time waiting, rather than simply showing a static pipeline.',
          image: '/field-note-2.jpeg',
        },
        {
          quote: 'A lot of our day was spent figuring out what each message was about and where it belonged. By the time we finished sorting everything, we had less time to actually talk to people. That was the part we wanted to change.',
          source: 'Operations Interview',
          insight: 'Classification consumes attention that could otherwise be spent on actual conversations.',
          therefore: 'Nexus should absorb the repetitive work of sorting and organizing, giving the operator more time for the conversations that require human judgment.',
          image: '/portrait-4.jpeg',
        },
      ],
    },
    solution: [
      {
        headline: 'The Queue: Whose move is it?',
        body: 'Nexus doesn’t measure how long a card has sat in a column. It measures the only thing that matters, how long someone has been waiting on you. It remembers every interaction and quietly lifts the person who needs you next to the top.',
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
        body: 'The technology is just the vehicle. Here is the core belief behind Nexus.',
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
