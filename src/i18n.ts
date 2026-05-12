import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        backToTop: "Back to top",
        copied: "Copied",
        share: "Share",
        readMore: "Read More",
        liveFeed: "LIVE FEED",
        engagement: "Engagement",
        kindle: "KINDLE EDITION",
        literary: "LITERARY",
        profile: "Profile"
      },
      bio: {
        role: "Software Architect",
        tagline: "Designing high-performance systems at",
        scrollFeed: "Scroll Feed",
        architecture: "Architectural Integrity",
        milestones: {
          2010: {
            title: "Software Foundations",
            description: "Started at Exago Markets developing predictive market apps after graduating from ISMAI."
          },
          2012: {
            title: "Public Infrastructure",
            description: "Architected public transportation ticket systems at Novabase and news solutions for Público/ZON."
          },
          2015: {
            title: "Innovation & Community",
            description: "Founded 'Cantinho de .NET' while managing construction ERP solutions at Sparkle IT."
          },
          2017: {
            title: "Global Banking Scale",
            description: "Web Solution Architect at Natixis, maintaining high-availability CIB banking platforms."
          },
          2019: {
            title: "Master Architecture",
            description: "Software Architect at Claranet, leading complex .NET/Java transitions for Whitworths and GALP."
          },
          2024: {
            title: "Published Legacy",
            description: "Published over 30 technical books on Amazon, distilling 15+ years of architectural wisdom."
          }
        }
      },
      navbar: {
        bio: "Bio",
        connect: "Connect",
        portfolio: "Portfolio",
        books: "Books",
        blog: "Archive",
        feedSubtitle: "Portfolio Feed // 2026"
      },
      sidebar: {
        follow: "Follow Me",
        label: {
          connect: "Connect",
          repo: "Repo",
          kaggle: "Kaggle",
          videos: "Videos",
          social: "Social",
          tiktok: "TikTok",
          whatsapp: "WhatsApp"
        }
      },
      portfolio: {
        index: "Systems Index",
        title: "Strategic Architecture",
        status: "Active Status",
        projects: {
          whitworths: "Lead Architect / Claranet",
          natixis: "High-Availability Banking",
          zon: "Media & Consumption Systems",
          galp: "Power Platform & Dynamics"
        }
      },
      books: {
        publications: "Technical Publications",
        library: "The Library",
        viewShelf: "View Full Shelf",
        available: "{{count}} Titles Available"
      },
      blog: {
        empty: "No entries found in the archive yet.",
        initializing: "INITIALIZING_FEED...",
        readEntry: "Read Entry",
        close: "[Esc]_Close"
      },
      media: {
        shareTitle: "Check out {{title}} by Pedro Mourão Martins",
        channels: "Media Channels",
        presence: "Social Presence",
        platforms: {
          youtube: "YouTube",
          tiktok: "TikTok",
          facebook: "Facebook",
          reading: "Reading Feed"
        },
        feeds: {
          youtube: "UX/UI Design Architecture",
          tiktok: "Product & UX Interaction",
          facebook: "Community UX Lab",
          reading: "UX/UI Library & Insights"
        }
      },
      cv: {
        subtitle: "Software Architect // Portfolio V.2026",
        contact: "Contact",
        technologies: "Technologies",
        skills: {
          backend: "Back-end",
          frontend: "Front-end",
          cloud: "Cloud & DevOps",
          enterprise: "Enterprise"
        },
        professionalPath: "Professional Path",
        education: "Education",
        builtWith: "Built with React & Framer Motion // Systems Architect Profile",
        hireMe: "Hire Me",
        masters: "Masters, Systems Engineering and Informatics",
        university: "Universidade do Minho (UM), Campus de Gualtar, Braga",
        experience: {
          role1: "Software Architect",
          desc1: "Creating solutions and implementing various projects using Sharepoint Online, Power Platform, Java and .NET technologies. Mentoring the team as technical lead and solution architect.",
          role2: ".NET BackEnd Solution Architect",
          desc2: "Created various solutions for BackEnd Web APIs and Azure Cloud applications for Farfetch.",
          role3: ".NET Web Solution Architect",
          desc3: "Maintained high-availability CIB banking platforms. Designed technological solutions for new business requirements and migrated databases between Sybase and SQL Server."
        }
      },
      footer: {
        connectSubtitle: "Let's Architect the Next Generation.",
        expertise: "Software Architect at Claranet Portugal with 15+ years of cross-industry experience. Specialized in .NET, Cloud Solutions, and AI Ontologies. Published author of over 30 technical books on Amazon and founder of \"Cantinho de .NET\".",
        directMail: "Direct Mail",
        professional: "Professional",
        email: "EMAIL_ME",
        amazon: "AMAZON_STORE"
      }
    }
  },
  pt: {
    translation: {
      common: {
        backToTop: "Voltar ao topo",
        copied: "Copiado",
        share: "Partilhar",
        readMore: "Saber Mais",
        liveFeed: "FEED AO VIVO",
        engagement: "Engajamento",
        kindle: "EDIÇÃO KINDLE",
        literary: "LITERÁRIO",
        profile: "Perfil"
      },
      bio: {
        role: "Arquiteto de Software",
        tagline: "Projetando sistemas de alta performance na",
        scrollFeed: "Rolar Feed",
        architecture: "Integridade Arquitetural",
        milestones: {
          2010: {
            title: "Fundações de Software",
            description: "Iniciou na Exago Markets desenvolvendo apps de mercados preditivos após graduar-se no ISMAI."
          },
          2012: {
            title: "Infraestrutura Pública",
            description: "Arquitetou sistemas de bilhética de transporte público na Novabase e soluções de notícias para Público/ZON."
          },
          2015: {
            title: "Inovação & Comunidade",
            description: "Fundou o 'Cantinho de .NET' enquanto geria soluções de ERP de construção na Sparkle IT."
          },
          2017: {
            title: "Escala Bancária Global",
            description: "Web Solution Architect na Natixis, mantendo plataformas bancárias CIB de alta disponibilidade."
          },
          2019: {
            title: "Mestria em Arquitetura",
            description: "Software Architect na Claranet, liderando transições complexas .NET/Java para Whitworths e GALP."
          },
          2024: {
            title: "Legado Publicado",
            description: "Publicou mais de 30 livros técnicos na Amazon, destilando mais de 15 anos de sabedoria arquitetural."
          }
        }
      },
      navbar: {
        bio: "Bio",
        connect: "Conectar",
        portfolio: "Portfólio",
        books: "Livros",
        blog: "Arquivo",
        feedSubtitle: "Feed de Portfólio // 2026"
      },
      sidebar: {
        follow: "Seguir",
        label: {
          connect: "Conectar",
          repo: "Repo",
          kaggle: "Kaggle",
          videos: "Vídeos",
          social: "Social",
          tiktok: "TikTok",
          whatsapp: "WhatsApp"
        }
      },
      portfolio: {
        index: "Índice de Sistemas",
        title: "Arquitetura Estratégica",
        status: "Status Ativo",
        projects: {
          whitworths: "Arquiteto Líder / Claranet",
          natixis: "Banca de Alta Disponibilidade",
          zon: "Sistemas de Media & Consumo",
          galp: "Power Platform & Dynamics"
        }
      },
      books: {
        publications: "Publicações Técnicas",
        library: "A Biblioteca",
        viewShelf: "Ver Estante Completa",
        available: "{{count}} Títulos Disponíveis"
      },
      blog: {
        empty: "Nenhum registo encontrado no arquivo ainda.",
        initializing: "INICIALIZANDO_FEED...",
        readEntry: "Ler Entrada",
        close: "[Esc]_Fechar"
      },
      media: {
        shareTitle: "Descobre {{title}} por Pedro Mourão Martins",
        channels: "Canais Media",
        presence: "Presença Social",
        platforms: {
          youtube: "YouTube",
          tiktok: "TikTok",
          facebook: "Facebook",
          reading: "Feed de Leitura"
        },
        feeds: {
          youtube: "Arquitetura de Design UX/UI",
          tiktok: "Interação de Produto & UX",
          facebook: "Lab de UX Comunitário",
          reading: "Biblioteca & Insights de UX/UI"
        }
      },
      cv: {
        subtitle: "Arquiteto de Software // Portfólio V.2026",
        contact: "Contacto",
        technologies: "Tecnologias",
        skills: {
          backend: "Back-end",
          frontend: "Front-end",
          cloud: "Cloud & DevOps",
          enterprise: "Empresarial"
        },
        professionalPath: "Percurso Profissional",
        education: "Educação",
        builtWith: "Construído com React & Framer Motion // Perfil de Arquiteto de Sistemas",
        hireMe: "Contrata-me",
        masters: "Mestrado em Engenharia de Sistemas e Informática",
        university: "Universidade do Minho (UM), Campus de Gualtar, Braga",
        experience: {
          role1: "Arquiteto de Software",
          desc1: "Criando soluções e implementando vários projetos usando Sharepoint Online, Power Platform, Java e tecnologias .NET. Mentorando a equipa como líder técnico e arquiteto de soluções.",
          role2: "Arquiteto de Soluções BackEnd .NET",
          desc2: "Criou várias soluções para Web APIs de BackEnd e aplicações Azure Cloud para a Farfetch.",
          role3: "Arquiteto de Soluções Web .NET",
          desc3: "Manteve plataformas bancárias CIB de alta disponibilidade. Projetou soluções tecnológicas para novos requisitos de negócio e migrou bases de dados entre Sybase e SQL Server."
        }
      },
      footer: {
        connectSubtitle: "Vamos Arquitetar a Próxima Geração.",
        expertise: "Software Architect na Claranet Portugal com mais de 15 anos de experiência em diversos setores. Especializado em .NET, Soluções Cloud e Ontologias de IA. Autor de mais de 30 livros técnicos na Amazon e fundador do \"Cantinho de .NET\".",
        directMail: "Email Direto",
        professional: "Profissional",
        email: "ENVIAR_EMAIL",
        amazon: "LOJA_AMAZON"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
