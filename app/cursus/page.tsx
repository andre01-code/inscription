import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Code,
  Lightbulb,
  Megaphone,
  Palette,
  Briefcase,
  GraduationCap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CursusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-blue-300 hover:text-blue-100 hover:bg-blue-900/30 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'inscription
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Notre Cursus Scolaire</h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Découvrez notre offre de formation complète pour préparer votre avenir professionnel au Gabon et à
              l'international
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">Présentation Générale</h2>
            <p className="mb-4">
              Notre école propose un cursus complet conçu pour former les professionnels de demain. Nos programmes sont
              élaborés en collaboration avec des experts du secteur pour garantir une formation pertinente et à jour
              avec les dernières tendances et technologies.
            </p>
            <p className="mb-4">
              Chaque programme est structuré pour offrir à la fois des connaissances théoriques solides et une
              expérience pratique approfondie. Nos étudiants bénéficient d'un accompagnement personnalisé tout au long
              de leur parcours académique.
            </p>
            <p>
              Nos formations sont disponibles en format présentiel et hybride, permettant aux étudiants de choisir la
              modalité qui convient le mieux à leur situation personnelle et professionnelle.
            </p>
          </div>

          <Tabs defaultValue="informatique" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-blue-900/50">
              <TabsTrigger value="informatique">Informatique</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>

            <TabsContent value="informatique" className="bg-white/5 rounded-b-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-800 p-3 rounded-full">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Informatique & Développement</h3>
                  <p className="mb-4">
                    Notre programme d'informatique forme les étudiants aux technologies les plus récentes et aux
                    méthodologies de développement modernes. Les étudiants acquièrent des compétences en programmation,
                    en développement web et mobile, en intelligence artificielle et en cybersécurité.
                  </p>
                  <h4 className="font-semibold mb-2">Ce programme comprend :</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Développement web frontend et backend</li>
                    <li>Programmation orientée objet et fonctionnelle</li>
                    <li>Bases de données et systèmes d'information</li>
                    <li>Intelligence artificielle et machine learning</li>
                    <li>Cybersécurité et protection des données</li>
                    <li>Projets pratiques et stages en entreprise</li>
                  </ul>
                  <p>
                    <strong>Durée :</strong> 3 ans (Licence) ou 5 ans (Master)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="bg-white/5 rounded-b-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-800 p-3 rounded-full">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Business & Management</h3>
                  <p className="mb-4">
                    Notre programme de Business & Management prépare les étudiants à devenir les leaders de demain. Ils
                    développent des compétences en gestion d'entreprise, en finance, en ressources humaines et en
                    stratégie commerciale.
                  </p>
                  <h4 className="font-semibold mb-2">Ce programme comprend :</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Gestion d'entreprise et leadership</li>
                    <li>Finance et comptabilité</li>
                    <li>Gestion des ressources humaines</li>
                    <li>Stratégie commerciale et développement</li>
                    <li>Droit des affaires et éthique professionnelle</li>
                    <li>Études de cas et projets d'entreprise</li>
                  </ul>
                  <p>
                    <strong>Durée :</strong> 3 ans (Licence) ou 5 ans (Master)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="communication" className="bg-white/5 rounded-b-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-800 p-3 rounded-full">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Communication</h3>
                  <p className="mb-4">
                    Notre programme de Communication forme des professionnels capables de concevoir et mettre en œuvre
                    des stratégies de communication efficaces. Les étudiants développent des compétences en relations
                    publiques, en communication digitale et en gestion de crise.
                  </p>
                  <h4 className="font-semibold mb-2">Ce programme comprend :</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Stratégies de communication</li>
                    <li>Relations publiques et médias</li>
                    <li>Communication digitale et réseaux sociaux</li>
                    <li>Gestion de crise et e-réputation</li>
                    <li>Communication interne et externe</li>
                    <li>Projets de communication et stages</li>
                  </ul>
                  <p>
                    <strong>Durée :</strong> 3 ans (Licence) ou 5 ans (Master)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="bg-white/5 rounded-b-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-800 p-3 rounded-full">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Design Graphique</h3>
                  <p className="mb-4">
                    Notre programme de Design Graphique forme des créatifs polyvalents maîtrisant les outils et
                    techniques de conception visuelle. Les étudiants développent des compétences en design d'interface,
                    en identité visuelle et en motion design.
                  </p>
                  <h4 className="font-semibold mb-2">Ce programme comprend :</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Principes fondamentaux du design</li>
                    <li>Design d'interface (UI/UX)</li>
                    <li>Identité visuelle et branding</li>
                    <li>Motion design et animation</li>
                    <li>Typographie et mise en page</li>
                    <li>Projets créatifs et book professionnel</li>
                  </ul>
                  <p>
                    <strong>Durée :</strong> 3 ans (Licence) ou 5 ans (Master)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="bg-white/5 rounded-b-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-800 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Marketing Digital</h3>
                  <p className="mb-4">
                    Notre programme de Marketing Digital forme des spécialistes capables d'élaborer et de mettre en
                    œuvre des stratégies marketing innovantes. Les étudiants développent des compétences en SEO/SEA, en
                    analytics et en stratégie de contenu.
                  </p>
                  <h4 className="font-semibold mb-2">Ce programme comprend :</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Stratégie marketing digitale</li>
                    <li>SEO, SEA et référencement</li>
                    <li>Analytics et mesure de performance</li>
                    <li>Marketing de contenu</li>
                    <li>E-commerce et conversion</li>
                    <li>Projets marketing et stages</li>
                  </ul>
                  <p>
                    <strong>Durée :</strong> 3 ans (Licence) ou 5 ans (Master)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-blue-900/30 border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Méthodes d'enseignement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Nos cours combinent théorie et pratique avec des projets réels, des études de cas, des ateliers et des
                  interventions de professionnels du secteur.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/30 border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Stages et alternance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Tous nos programmes incluent des périodes de stage obligatoires et la possibilité de suivre la
                  formation en alternance pour une meilleure insertion professionnelle.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/30 border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Diplômes et certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Nos formations sont reconnues par l'État et complétées par des certifications professionnelles
                  spécifiques à chaque domaine d'expertise.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Prêt à rejoindre notre école ?</h2>
            <Link href="/">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-600">
                S'inscrire maintenant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
