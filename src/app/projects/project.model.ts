export interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  languages: string[];
}

/** One chapter of a product page: a heading, a lead sentence, prose, and optional structured content. */
export interface Chapter {
  id: 'idea' | 'build' | 'next';
  /** Short heading, without the trailing period (the template adds a gold one). */
  heading: string;
  lead: string;
  body: string[];
  /** Spec rows for the build chapter: a label and its value. */
  facts?: { label: string; text: string }[];
  /** Roadmap entries for the next chapter. */
  items?: { title: string; text: string }[];
  image?: ProductImage;
}

/** A transparent cut-out that sits inside the chapter's text, on one side, with the prose wrapping around it. */
export interface ProductImage {
  src: string;
  alt: string;
  side: 'left' | 'right';
}

export interface ProductLink {
  label: string;
  url: string;
}

export interface SocialLink extends ProductLink {
  /** Font Awesome brand class, e.g. "fab fa-instagram". */
  icon: string;
}

export interface PersonalProject {
  id: string;
  title: string;
  /** One line under the name, in the product's own voice. */
  tagline: string;
  logo: string;
  /** The first link is the live product and gets the gold button. */
  links: ProductLink[];
  socials: SocialLink[];
  chapters: Chapter[];
}
