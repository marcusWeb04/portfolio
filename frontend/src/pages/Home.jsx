import { useState, useEffect } from 'react';
import ProjectCard from '../components/project/ProjectCard.jsx';

function Home() {
    const [project, setProject] = useState([]);

    useEffect(() => {
        const handleRequest = async () => {
            const data = [
                { id: 1, title: "Portfolio", type: "Projets personnels" },
                { id: 2, title: "E-commerce", type: "Projets professionnels" },
                { id: 3, title: "Chat App", type: "POC" },
                { id: 4, title: "Chat App", type: "POC" },
                { id: 5, title: "Chat App", type: "POC" },
                { id: 6, title: "Chat App", type: "POC" },
                { id: 7, title: "Chat App", type: "POC" },
                { id: 8, title: "Chat App", type: "POC" },
                { id: 9, title: "Chat App", type: "POC" }
            ];
            setProject(data);
        };

        handleRequest();
    }, []);

    return (
        <>
            {/* Navigation */}
            <nav className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-2 sm:gap-4 p-4 bg-gray-100 shadow">
                <a href="#hero-section" className="border border-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-100 w-full sm:w-auto text-center">Accueil</a>
                <a href="#project" className="border border-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-100 w-full sm:w-auto text-center">Projet</a>
                <a href="#timeline" className="border border-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-100 w-full sm:w-auto text-center">Timeline</a>
                <a href="#about-me" className="border border-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-100 w-full sm:w-auto text-center">À propos</a>
                <a href="#contact-me" className="border border-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-100 w-full sm:w-auto text-center">Me contacter</a>
            </nav>

            {/* Hero Section */}
            <div id="hero-section" className="min-h-[90vh] flex flex-col items-center justify-center text-center p-6 sm:p-12 bg-white">
                <h1 className="text-3xl sm:text-5xl font-bold">Marcus Favernay</h1>
                <h2 className="text-xl sm:text-2xl mt-2">Développeur Full Stack</h2>
                <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
                    <a href="/cv-de-marcus-favernay.pdf" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">CV</a>
                    <a href="https://github.com/marcusWeb04" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">GitHub</a>
                    <a href="https://www.linkedin.com/in/marcus-favernay-55605b259" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">LinkedIn</a>
                </div>
            </div>

            {/* Projects Section */}
            <section id="project" className="min-h-screen px-4 sm:px-12 py-8 bg-gray-50">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Projets</h3>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                    {['Tout', 'Projets professionnels', 'Projets personnels', 'POC', 'Projets encadrés'].map(label => (
                        <button key={label} className="px-4 py-2 border border-indigo-600 rounded hover:bg-indigo-100 text-sm sm:text-base">
                            {label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(project) && project.length > 0 ? (
                        project.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))
                    ) : ( 
                    <div className="col-span-full text-center text-gray-500">
                         Aucun projet à afficher.
                    </div> 
                    )}
                </div>
            </section>

            {/* Timeline */}
            <section id="timeline" className="min-h-screen px-4 sm:px-12 py-8 bg-white">
                <h3 className="text-2xl sm:text-3xl font-semibold text-center">Timeline</h3>
            </section>

            {/* À propos */}
            <section id="about-me" className="min-h-screen px-4 sm:px-12 py-8 bg-gray-50">
                <h3 className="text-2xl sm:text-3xl font-semibold text-center">À propos de moi</h3>
            </section>

            {/* Contact */}
            <section id="contact-me" className="min-h-screen px-4 sm:px-12 py-8 bg-white">
                <h3 className="text-2xl sm:text-3xl font-semibold text-center">Contact</h3>
            </section>

            {/* Footer */}
            <footer className="p-4 text-center text-sm text-gray-500 bg-gray-100">
                © {new Date().getFullYear()} Marcus Favernay. Tous droits réservés.
            </footer>
        </>
    );
}

export default Home;
