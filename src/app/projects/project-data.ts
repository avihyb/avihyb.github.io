import { Project, PersonalProject } from './project.model';

export const PROJECTS: Project[] = [
    {
        title: 'Radio Programming Final Project',
        description: 'A deep dive into the Meshtastic LoRa device and its routing algorithms, followed by a controlled range experiment.',
        image: 'images/lora.png',
        url: 'https://github.com/avihyb/meshstatic-project',
        languages: ['Research', 'Experiment']
    },
    {
        title: 'Subspace Clustering in High Dimensional Data',
        description: 'Seminar on the challenges of high-dimensional data, subspace clustering algorithms, and a PCA demonstration.',
        image: 'images/subspace-clustering.svg',
        url: 'https://www.linkedin.com/posts/avihyb_subspace-clustering-of-high-dimensional-data-activity-7286773604476706817-drVh?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFRtMUBDLQSWGE8lekGoSxijuVHfGko5mk',
        languages: ['Python', 'Research']
    },
    {
        title: 'Operating Systems Final Project',
        description: 'Minimum spanning tree algorithms served over a socket, built with the Factory, Strategy, Pipeline (Active Object), Thread Pool, and Leader-Follower patterns.',
        image: 'images/mst.png',
        url: 'https://github.com/avihyb/OS_Final_Project',
        languages: ['C++']
    },
    {
        title: 'Personal Website & Portfolio',
        description: 'This site. An Angular app with routed pages, data-driven project and timeline content, and a hand-built design system, deployed to GitHub Pages.',
        image: 'images/mu.jpg',
        url: 'https://github.com/avihyb/avihyb.github.io',
        languages: ['Angular', 'TypeScript', 'HTML', 'CSS']
    },
    {
        title: 'Communication Networks Final Project',
        description: 'A Python implementation of QUIC-style stream multiplexing over UDP.',
        image: 'images/network.jpeg',
        url: 'https://github.com/avihyb/final-project-network',
        languages: ['Python']
    },
    {
        title: 'Viking Chess Game',
        description: 'A digital version of the ancient game Hnefatafl, also known as Viking Chess. Graphic User Interface (GUI) implemented using JavaFX. The game is played on a 11x11 board with two players: the attackers and the defenders. The attackers win by capturing the king, while the defenders win by moving the king to one of the four corner squares. The game features a custom board design, piece movement, and game logic. The game also includes a custom AI that can play against the player. The AI uses a minimax algorithm with alpha-beta pruning to determine the best move. The game also includes a custom game mode that allows the player to play against another player on the same computer',
        image: 'images/viking.png',
        url: 'https://github.com/avihyb/VikingChess',
        languages: ['Java', 'JavaFX', 'Game']
    },
    {
        title: 'Geometric Shapes Simulator',
        description: 'The GeoShapes Java Project is a comprehensive application that demonstrates object-oriented programming (OOP) principles, simple algorithms, and graphical user interface (GUI) implementation while focusing on geometric shapes and calculations.',
        image: 'images/geo.png',
        url: 'https://github.com/avihyb/GeoShapes-Java-Project',
        languages: ['Java']
    },
    {
        title: 'Trees Simulator',
        description: 'Tree data structures in C++ with custom iterators and a graphical view.',
        image: 'images/trees.png',
        url: 'https://github.com/avihyb/CPP-EX4',
        languages: ['C++']
    }
];

export const PERSONAL_PROJECTS: PersonalProject[] = [
    {
        id: 'bambi-marketplace',
        title: 'Bambi',
        tagline: 'Book the right barber, anywhere.',
        logo: 'images/bambi.png',
        links: [{ label: 'studiobambiapp.com', url: 'https://studiobambiapp.com' }],
        socials: [
            { label: 'Instagram', url: 'https://www.instagram.com/studiobambi', icon: 'fab fa-instagram' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/company/bambi-studio/', icon: 'fab fa-linkedin-in' },
            { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61581589817963', icon: 'fab fa-facebook-f' }
        ],
        chapters: [
            {
                id: 'idea',
                heading: 'The idea',
                lead: 'Barbering is a loyal, appointment-driven trade that still runs on DMs and paper books. Bambi gives it one marketplace.',
                body: [
                    'Clients want a trusted barber nearby and a slot that fits. Barbers want a full chair without a suite of tools. Shop owners want to run their chairs like a business. Today that is stitched together from Instagram, WhatsApp, and a notebook.',
                    'Bambi puts all three roles in one app: clients discover and book, barbers manage availability, owners run a storefront with every chair inside. Revenue comes from payments through the platform, with Stripe payouts and dynamic pricing next. A pre-seed MVP, built by one founder.'
                ],
                image: { src: 'images/bambi-example-2.webp', alt: 'A barber chair beside a phone running Bambi', side: 'right' }
            },
            {
                id: 'build',
                heading: 'How it\'s built',
                lead: 'One Flutter codebase, three roles, and a database that refuses to let a booking land in the wrong state.',
                body: [
                    'Authorization lives entirely in Postgres row-level security. The client ships no access rules, and the privileged paths run server-side, so a compromised app build still cannot read another shop\'s chairs or move a booking it does not own.',
                    'The booking lifecycle is a state machine in SQL with idempotent transitions, so a retried or duplicated payment confirmation cannot double-book a chair or double-charge a client. Three roles share one account and one Flutter codebase; the role is a permission, not a separate app.'
                ],
                facts: [
                    { label: 'Stack', text: 'Flutter, Riverpod, Supabase' },
                    { label: 'Platforms', text: 'iOS, Android, and web from one codebase' },
                    { label: 'Status', text: 'Pre-seed MVP, in development' }
                ],
                image: { src: 'images/bambi-example.webp', alt: 'Clippers beside a phone running Bambi', side: 'left' }
            },
            {
                id: 'next',
                heading: 'What\'s next',
                lead: 'The booking loop works. The next releases turn it into a business.',
                body: [],
                items: [
                    { title: 'Stripe payouts', text: 'Paid through the platform, confirmed only against a verified payment.' },
                    { title: 'Dynamic pricing', text: 'Prices that follow demand and the calendar.' },
                    { title: 'Push notifications', text: 'Requests, confirmations, reminders.' },
                    { title: 'Reviews', text: 'After every completed booking.' },
                    { title: 'Analytics for owners', text: 'Chairs, bookings, and revenue in one view.' }
                ]
            }
        ]
    },
    {
        id: 'filmingitall',
        title: 'Filming It All',
        tagline: 'Turning daily life into pure cinematic moments.',
        logo: 'images/filmingitall.png',
        links: [{ label: 'filmingitall.com', url: 'https://www.filmingitall.com' }],
        socials: [
            { label: 'Instagram', url: 'https://instagram.com/imfilmingitall', icon: 'fab fa-instagram' },
            { label: 'YouTube', url: 'https://youtube.com/@filmingitall', icon: 'fab fa-youtube' },
            { label: 'TikTok', url: 'https://vt.tiktok.com/ZSC6ugxPs', icon: 'fab fa-tiktok' }
        ],
        chapters: [
            {
                id: 'idea',
                heading: 'The idea',
                lead: 'A production studio should feel like a film, not a brochure. Filming It All is a faceless cinematic brand with a storefront built to sell three things.',
                body: [
                    'Businesses buy production tiers: Essential, Production, Retainer. Individuals buy private cinematic sessions. A shop for prints and merch is the third line, with the cart already built.',
                    'The brand is the product: one black frame, a handwritten wordmark, a yellow asterisk, and a portfolio filtered by category. Every path ends in a booking or an order.'
                ]
            },
            {
                id: 'build',
                heading: 'How it\'s built',
                lead: 'One Next.js codebase carries the brand, the portfolio, the storefront, and the cart.',
                body: [
                    'The whole storefront is statically generated, so nothing sits between the visitor and the footage at request time. The only client state is the cart, held in a Zustand store outside the React tree so it survives route changes without a provider.',
                    'Framer Motion runs the route transitions on the app router, which is what lets the black frame hold between pages instead of flashing to a new document.'
                ],
                facts: [
                    { label: 'Stack', text: 'Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Zustand' },
                    { label: 'Status', text: 'Live at filmingitall.com' }
                ]
            },
            {
                id: 'next',
                heading: 'What\'s next',
                lead: 'The storefront is built. The next releases open the shop and let people book without sending a message.',
                body: [],
                items: [
                    { title: 'Prints and merch shop', text: 'The third revenue line, from the same storefront.' },
                    { title: 'Cart checkout', text: 'Payment on the cart that already holds the order.' },
                    { title: 'Video portfolio player', text: 'Reels playing inside the portfolio.' },
                    { title: 'Online booking', text: 'Sessions and tiers booked from the page.' }
                ]
            }
        ]
    },
    {
        id: 'climate-support',
        title: 'Climate Support',
        tagline: 'Measured proof of quality.',
        logo: 'images/climate-support.png',
        links: [
            { label: 'climate-support.org', url: 'https://climate-support.org' },
            { label: 'app.climate-support.org', url: 'https://app.climate-support.org' }
        ],
        socials: [
            { label: 'Instagram', url: 'https://www.instagram.com/climate.support/', icon: 'fab fa-instagram' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/company/climate-support/', icon: 'fab fa-linkedin-in' }
        ],
        chapters: [
            {
                id: 'idea',
                heading: 'The idea',
                lead: 'Food quality is claimed on the label and rarely proven. Climate Support makes it measurable, and turns the proof into a price.',
                body: [
                    'A harvest is sampled, a lab measures its nutrient density, and the result is sealed to a QR code on the package. Farmers earn a premium without organic certification. Shops source produce they can vouch for. Shoppers get proof instead of promises.',
                    'Two connected products, both live: the landing site tells the story and routes each visitor to their path; the partner platform is where farms, labs, packagers, and retailers run the chain.'
                ]
            },
            {
                id: 'build',
                heading: 'How it\'s built',
                lead: 'Two Next.js apps on one Supabase backend, with a role for every hand the produce passes through.',
                body: [
                    'A batch is one row that moves through four states, harvested, graded, sealed, on shelf, and each transition is written by a different role. Row-level security keyed on that role means farms, labs, packagers, and retailers query the same table and each sees only its own step.',
                    'The QR code resolves to the batch\'s verification record, so the proof is checked against the database, not printed on the label. The landing site is a separate Next.js app on the same Supabase project, so it deploys on its own without touching the platform.'
                ],
                facts: [
                    { label: 'Stack', text: 'Next.js, React, TypeScript, Supabase' },
                    { label: 'Roles', text: 'Farmer, lab, packager, retailer, admin' },
                    { label: 'Status', text: 'Both products live' }
                ]
            },
            {
                id: 'next',
                heading: 'What\'s next',
                lead: 'The chain is running. The next releases make it faster, wider, and visible.',
                body: [],
                items: [
                    { title: 'Automated grading', text: 'Results scored without a manual step.' },
                    { title: 'Retail marketplace', text: 'Verified batches listed for shops.' },
                    { title: 'Impact numbers', text: 'What the chain has verified, made public.' },
                    { title: 'Export batches', text: 'Verified batches prepared for export.' }
                ]
            }
        ]
    }
];
