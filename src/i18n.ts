import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
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
        books: "Books"
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
      footer: {
        connectSubtitle: "Let's Architect theNext Generation.",
        expertise: "Software Architect at Claranet Portugal with 15+ years of cross-industry experience. Specialized in .NET, Cloud Solutions, and AI Ontologies. Published author of over 30 technical books on Amazon and founder of \"Cantinho de .NET\".",
        readMore: "Read More",
        directMail: "Direct Mail",
        professional: "Professional",
        email: "EMAIL_ME",
        amazon: "AMAZON_STORE"
      }
    }
  },
  pt: {
    translation: {
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
        books: "Livros"
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
      footer: {
        connectSubtitle: "Vamos Arquitetar aPróxima Geração.",
        expertise: "Software Architect na Claranet Portugal com mais de 15 anos de experiência em diversos setores. Especializado em .NET, Soluções Cloud e Ontologias de IA. Autor de mais de 30 livros técnicos na Amazon e fundador do \"Cantinho de .NET\".",
        readMore: "Saber Mais",
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
