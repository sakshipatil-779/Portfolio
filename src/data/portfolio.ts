export interface PersonalInfo {
  name: string;
  moniker: string;
  headline: string;
  subHeadline: string;
  tagline: string;
  aboutTitle: string;
  bioParagraphs: string[];
  facts: {
    label: string;
    value: string;
  }[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    heading: string;
    subheading: string;
  };
  navigation: {
    name: string;
    href: string;
  }[];
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "Sakshi Patil",
  moniker: "SP.",
  headline: "WELCOME TO",
  subHeadline: "SAKSHI'S WORLD.",
  tagline: "Computer Engineer | Full-Stack Developer | Technology Enthusiast",
  aboutTitle: "Building meaningful technology through engineering.",
  bioParagraphs: [
    "I am a Computer Science undergraduate (Class of 2028) with a strong foundation in Data Structures, Algorithms, and Object-Oriented Programming in Java.",
    "I enjoy building complex systems, privacy-focused applications, decentralized platforms, and full-stack engineering solutions.",
    "My work focuses on combining strong computer science fundamentals with practical engineering, security, and thoughtful product development.",
  ],
  facts: [
    { label: "Name", value: "Sakshi Patil" },
    { label: "Degree", value: "Computer Engineering" },
    { label: "Institute", value: "MET's Institute of Engineering, Nashik" },
    { label: "University", value: "Savitribai Phule Pune University" },
    { label: "Academic Duration", value: "2024–2028" },
    { label: "CGPA", value: "8.31" },
  ],
  contact: {
    email: "patiltanmay278@gmail.com",
    linkedin: "https://www.linkedin.com/in/sakshipatil779",
    github: "https://github.com/sakshipatil-779",
    heading: "LET'S BUILD SOMETHING MEANINGFUL.",
    subheading:
      "Have an interesting idea, a challenging problem, or an opportunity to collaborate? Let's connect.",
  },
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Achievements", href: "#achievements" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Extra-Curricular", href: "#extra-curricular" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ],
};
