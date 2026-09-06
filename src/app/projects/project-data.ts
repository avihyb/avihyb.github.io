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
        image: 'https://towardsdatascience.com/wp-content/uploads/2022/02/1QinDfRawRskupf4mU5bYSA.png',
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
        shortDescription: 'B2B2C SaaS cross-platform marketplace and network that redefines that barbering world.',
        logo: 'images/bambi.png',
        image: 'images/bambimockup.svg',
        technologies: ['Flutter', 'Dart', 'Supabase', 'Stripe'],
        inspiration: 'The barbering industry lacks high-end, seamless software. By bringing a luxury SaaS aesthetic directly into a complex multi-sided booking market, Bambi eliminates friction for top-tier barbers and their clientele.',
        goals: 'Build a fully idempotent SQL booking state machine. Establish a robust 2-party handshake payment system integrating Stripe. Deliver a flawless, swipeable UX mimicking an ultra-premium brand.',
        detailedDescription: 'Bambi is not just a marketplace; it is an integrated SaaS that manages the lifecycle of appointments. I architected the backend to use complex state machines, ensuring every appointment transitions correctly between Pending, Accepted, Canceled, and Completed. The mobile UX features a bespoke dark theme and complex smooth routing logic passing state seamlessly across screens.',
        architecture: 'The system uses an Event-Driven architecture powered by a PostgreSQL state engine. Node.js manages webhooks and payment lifecycles through Stripe, ensuring 100% financial consistency with two-phase commits. The client app runs on Flutter with Riverpod for robust, reactive offline-first state management.',
        technicalDetails: `// Bambi Idempotent Payment Handshake
async function confirmBooking(intentId) {
  const tx = await db.transaction();
  try {
     const status = await stripe.verify(intentId);
     if(status === 'succeeded') {
        await tx.execute(
          'UPDATE bookings SET status = $1 WHERE intent_id = $2', 
          ['CONFIRMED', intentId]
        );
     }
     await tx.commit();
     return { success: true };
  } catch (err) {
     await tx.rollback();
     throw new PaymentDisputeError(err);
  }
}`,
        mockupType: 'mobile',
        sourceCodeUrl: '',
        liveDemoUrl: 'https://studiobambiapp.com',
        displayUrl: 'www.studiobambiapp.com',
        customLayout: true
    },
    {
        id: 'filmingitall',
        title: 'Filming It All',
        shortDescription: 'Cinematic production & photography studio. A faceless brand with a black-and-yellow storefront and a booking funnel.',
        logo: 'images/filmingitall.png',
        image: 'images/filmingitall-site.webp',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        inspiration: 'A production studio should feel like a film, not a brochure. The site opens on a single black frame with the handwritten wordmark and nothing else, then routes visitors to the work, the services, or a private session.',
        goals: 'Ship a brand and a storefront in one codebase: a category-filtered portfolio, business production tiers, private cinematic sessions, and a shop with a cart ready for prints and merch.',
        detailedDescription: 'Filming It All is the public face of a cinematic production and photography studio. The gateway page sets the tone; the portfolio filters work by category (reels, business, private, family, travel, vlog, documentary); the studio page sells three production tiers to businesses; the sessions page offers private bookings for couples, solo travelers, and individuals.',
        architecture: 'Next.js 16 app router with React 19 and Tailwind CSS 4. Framer Motion drives the hero and page transitions, Zustand holds the cart state behind a slide-in drawer, and media is served from S3. Static generation with sitemap and robots routes for SEO.',
        mockupType: 'desktop',
        sourceCodeUrl: '',
        liveDemoUrl: 'https://www.filmingitall.com',
        displayUrl: 'www.filmingitall.com',
        customLayout: true
    },
    {
        id: 'climate-support',
        title: 'Climate Support',
        shortDescription: 'Landing site and partner platform for a food-tech company that lab-verifies nutrient density and seals every batch with a QR code.',
        logo: 'images/climate-support.png',
        image: 'images/climate-support-site.webp',
        technologies: ['Next.js', 'React', 'Supabase', 'TypeScript'],
        inspiration: 'Food quality is claimed, rarely proven. Climate Support makes it measurable: a harvest is sampled, a lab measures its nutrient density, and the result travels with the produce as a QR code anyone can scan.',
        goals: 'Give shoppers proof they can check themselves, give farmers premium pricing without the cost of organic certification, and give farms, labs, packagers, and shops one shared chain to work in.',
        detailedDescription: 'Two connected products. The landing site at climate-support.org explains the idea and routes farmers, shops, shoppers, and investors to their own path. The partner platform at app.climate-support.org is where the work happens: farms apply and log harvests, labs test and grade, packagers seal batches to QR codes, and retailers source verified produce.',
        architecture: 'Both products are Next.js apps. The platform runs on Supabase with role-based access for farmers, labs, packagers, retailers, and admins.',
        mockupType: 'desktop',
        sourceCodeUrl: '',
        liveDemoUrl: 'https://climate-support.org',
        displayUrl: 'www.climate-support.org',
        customLayout: true
    }
];