import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiNextdotjs, SiReact, SiTypescript, SiPrisma, SiTailwindcss, SiDocker } from 'react-icons/si';
import { FaDatabase, FaRocket, FaCode, FaCheck } from 'react-icons/fa';
import Link from "next/link";

const Home = () => {
  const technologies = [
    { name: 'Next.js 15', icon: <SiNextdotjs className="w-12 h-12" />, version: '15.3.3', color: 'text-black dark:text-white' },
    { name: 'React 19', icon: <SiReact className="w-12 h-12" />, version: '19.0.0', color: 'text-blue-500' },
    { name: 'TypeScript', icon: <SiTypescript className="w-12 h-12" />, version: '5+', color: 'text-blue-600' },
    { name: 'Prisma ORM', icon: <SiPrisma className="w-12 h-12" />, version: 'Latest', color: 'text-gray-700 dark:text-gray-300' },
    { name: 'TailwindCSS', icon: <SiTailwindcss className="w-12 h-12" />, version: '3.4.17', color: 'text-cyan-500' },
    { name: 'Docker', icon: <SiDocker className="w-12 h-12" />, version: 'Ready', color: 'text-blue-400' },
  ];

  const features = [
    'Full TypeScript support',
    'Prisma ORM with multi-database support',
    'Pre-configured API routes',
    'Zustand state management',
    'ShadCN/UI components',
    'Docker containerization',
    'React Icons library',
    'Form validation with Zod',
    'Dark mode support',
    'Production-ready',
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <FaRocket className="mr-2" /> Production Ready
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js Fullstack Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A modern, production-ready Next.js template with Prisma ORM, TypeScript, and all the tools you need to build amazing full-stack applications.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/docs">
                <FaCode className="mr-2" /> Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/Worketyamo-Students/NEXTJS-TEMPLATE-STARTER" target="_blank" rel="noopener noreferrer">
                <SiNextdotjs className="mr-2" /> View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Built With Modern Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech) => (
              <Card key={tech.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`flex flex-col items-center text-center ${tech.color}`}>
                    {tech.icon}
                    <h3 className="font-semibold mt-4 text-gray-900 dark:text-gray-100">{tech.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tech.version}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaDatabase className="mr-2 text-blue-500" />
                Database Integration
              </CardTitle>
              <CardDescription>
                Prisma ORM with multi-database support out of the box
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  PostgreSQL, MySQL, SQLite, MongoDB
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Type-safe database queries
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Auto-generated Prisma Client
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Database migrations included
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaCode className="mr-2 text-purple-500" />
                Developer Experience
              </CardTitle>
              <CardDescription>
                Everything configured for a smooth development workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Quick Start</CardTitle>
            <CardDescription>Get up and running in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="mb-2"># Clone the repository</div>
              <div className="text-blue-400">git clone https://github.com/Worketyamo-Students/NEXTJS-TEMPLATE-STARTER.git</div>
              <div className="mt-4 mb-2"># Install dependencies</div>
              <div className="text-green-400">npm install</div>
              <div className="mt-4 mb-2"># Set up environment variables</div>
              <div className="text-yellow-400">cp .env.template .env</div>
              <div className="mt-4 mb-2"># Generate Prisma Client & Run migrations</div>
              <div className="text-purple-400">npx prisma generate && npx prisma migrate dev</div>
              <div className="mt-4 mb-2"># Start development server</div>
              <div className="text-pink-400">npm run dev</div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Check out the <Link href="/docs" className="text-blue-500 hover:underline">documentation</Link> for detailed setup instructions
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Built with ❤️ by{' '}
            <a href="https://github.com/DimitriTedom" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              DimitriTedom (SnowDev)
            </a>
          </p>
          <p>
            For the amazing developers at{' '}
            <a href="https://github.com/Worketyamo-Students" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Worketyamo-Students
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
