import { Project, PersonalProject } from './project.model';

export const PROJECTS: Project[] = [
    {
        title: 'Subspace Clustering in High Dimensional Data',
        description: 'Seminar presented about high dimensional challanges, advanced algorithms and PCA demonstration.',
        image: 'https://towardsdatascience.com/wp-content/uploads/2022/02/1QinDfRawRskupf4mU5bYSA.png',
        url: 'https://www.linkedin.com/posts/avihyb_subspace-clustering-of-high-dimensional-data-activity-7286773604476706817-drVh?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFRtMUBDLQSWGE8lekGoSxijuVHfGko5mk',
        languages: ['Python']
    },
    {
        title: 'Opearting Systems Final Project',
        description: 'MST in Graphs, Algorithms. Factory, Stratetgy, Pipeline (Active Object), Thread-Pool, Leader-Follower.',
        image: 'images/mst.png',
        url: 'https://github.com/avihyb/OS_Final_Project',
        languages: ['C++']
    },
    {
        title: 'Frontend Project',
        description: 'Angular project which demonstrates the use of Angular components, services, and routing. The project also includes a custom Angular service that fetches data from a JSON file and displays it on the page. The project also includes a custom Angular component that displays a list of items and allows the user to add new items to the list. The project also includes a custom Angular component that displays a list of items and allows the user to delete items from the list. The project also includes a custom Angular component that displays a list of items and allows the user to edit items in the list.',
        image: 'images/websiteintro.jpeg',
        url: 'https://github.com/avihyb/avihyb.github.io',
        languages: ['Angular', 'TypeScript', 'HTML', 'CSS']
    },
    {
        title: 'Communication Networks Final Project',
        description: 'QUIC Protocol: Python implemention of multiplexing.',
        image: 'images/network.jpeg',
        url: 'https://github.com/avihyb/final-project-network',
        languages: ['Python']
    },
    {
        title: 'Viking Chess',
        description: 'A digital version of the ancient game Hnefatafl, also known as Viking Chess. Graphic User Interface (GUI) implemented using JavaFX. The game is played on a 11x11 board with two players: the attackers and the defenders. The attackers win by capturing the king, while the defenders win by moving the king to one of the four corner squares. The game features a custom board design, piece movement, and game logic. The game also includes a custom AI that can play against the player. The AI uses a minimax algorithm with alpha-beta pruning to determine the best move. The game also includes a custom game mode that allows the player to play against another player on the same computer',
        image: 'images/viking.png',
        url: 'https://github.com/avihyb/VikingChess',
        languages: ['Java', 'JavaFX']
    },
    {
        title: 'Geometric Shapes',
        description: 'The GeoShapes Java Project is a comprehensive application that demonstrates object-oriented programming (OOP) principles, simple algorithms, and graphical user interface (GUI) implementation while focusing on geometric shapes and calculations.',
        image: 'images/geo.png',
        url: 'https://github.com/avihyb/GeoShapes-Java-Project',
        languages: ['Java']
    },
    {
        title: 'Trees',
        description: 'Tree data structures implemented in C++. GUI, Iterators.',
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
        liveDemoUrl: 'https://studiobambiapp.com'
    },
    {
        id: 'locked-1',
        title: 'Project Nebula',
        shortDescription: 'Stealth mode AI task engine. Details under NDA.',
        logo: 'images/lock.png',
        image: '',
        technologies: ['React', 'Python', 'LLM'],
        inspiration: '', goals: '', detailedDescription: '', architecture: '', sourceCodeUrl: '', liveDemoUrl: '',
        locked: true
    },
    {
        id: 'locked-2',
        title: 'Aurora OS',
        shortDescription: 'Experimental low-level distributed environment.',
        logo: 'images/lock.png',
        image: '',
        technologies: ['Rust', 'WebAssembly'],
        inspiration: '', goals: '', detailedDescription: '', architecture: '', sourceCodeUrl: '', liveDemoUrl: '',
        locked: true
    }
];