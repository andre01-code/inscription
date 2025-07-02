import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Star,
  GraduationCap,
  Globe,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SchoolLogo } from "@/components/school-logo"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <SchoolLogo size="md" variant="full" />
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#programmes" className="text-gray-700 hover:text-blue-900 transition-colors">
                Programmes
              </Link>
              <Link href="#avantages" className="text-gray-700 hover:text-blue-900 transition-colors">
                Avantages
              </Link>
              <Link href="#temoignages" className="text-gray-700 hover:text-blue-900 transition-colors">
                Témoignages
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors">
                Contact
              </Link>
              <Link href="/inscription">
                <Button className="bg-blue-900 hover:bg-blue-800">S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <SchoolLogo size="xl" variant="icon" className="mx-auto mb-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Votre Avenir Commence à l'
              <span className="text-orange-400">École Supérieure du Gabon</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Formez-vous aux métiers de demain avec des programmes d'excellence reconnus, au cœur de l'Afrique
              Centrale, pour une carrière internationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inscription">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  Commencer mon inscription
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cursus">
                <Button
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg bg-transparent"
                >
                  Découvrir nos programmes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">500+</div>
              <div className="text-gray-600">Étudiants diplômés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">95%</div>
              <div className="text-gray-600">Taux d'insertion professionnelle</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
              <div className="text-gray-600">Professeurs experts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">15</div>
              <div className="text-gray-600">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Programmes d'Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos formations conçues pour répondre aux besoins du marché du travail moderne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Informatique & Développement</CardTitle>
                <CardDescription>Développement web, IA, cybersécurité et technologies émergentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Développement Web Frontend/Backend</li>
                  <li>• Intelligence Artificielle & Machine Learning</li>
                  <li>• Cybersécurité et Protection des Données</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Business & Management</CardTitle>
                <CardDescription>Gestion d'entreprise, finance et leadership stratégique</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Finance d'Entreprise</li>
                  <li>• Management des Organisations</li>
                  <li>• Stratégie et Développement Commercial</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Communication & Marketing</CardTitle>
                <CardDescription>Communication digitale, marketing et design graphique</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Communication Digitale</li>
                  <li>• Marketing Digital & SEO</li>
                  <li>• Design Graphique & UI/UX</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/cursus">
              <Button className="bg-blue-900 hover:bg-blue-800">
                Voir tous nos programmes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi Choisir Notre École ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une formation d'excellence qui vous prépare aux défis professionnels de demain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Formation Pratique</h3>
              <p className="text-gray-600">
                70% de pratique avec des projets réels et des stages en entreprise pour une expérience concrète.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professeurs Experts</h3>
              <p className="text-gray-600">
                Une équipe pédagogique composée de professionnels en activité et d'experts reconnus dans leur domaine.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diplômes Reconnus</h3>
              <p className="text-gray-600">
                Formations certifiées par l'État gabonais et reconnues à l'international pour votre mobilité
                professionnelle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Réseau International</h3>
              <p className="text-gray-600">
                Partenariats avec des universités et entreprises internationales pour élargir vos opportunités.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Insertion Professionnelle</h3>
              <p className="text-gray-600">
                95% de nos diplômés trouvent un emploi dans les 6 mois suivant leur graduation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Campus Moderne</h3>
              <p className="text-gray-600">
                Équipements de pointe, laboratoires informatiques et espaces de coworking pour votre apprentissage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce Que Disent Nos Diplômés</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos anciens étudiants qui excellent dans leur carrière
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Grâce à la formation en développement web, j'ai pu créer ma propre startup tech. Les professeurs nous
                  ont vraiment préparés au monde professionnel."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">AM</span>
                  </div>
                  <div>
                    <div className="font-semibold">Alain Mboumba</div>
                    <div className="text-sm text-gray-500">CEO, TechGabon</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Le programme de management m'a donné toutes les clés pour diriger une équipe. Je suis maintenant
                  directrice commerciale dans une grande entreprise."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">SO</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sylvie Obame</div>
                    <div className="text-sm text-gray-500">Directrice Commerciale</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "La formation en communication digitale était exactement ce dont j'avais besoin. Je travaille
                  maintenant pour une agence internationale."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">PN</span>
                  </div>
                  <div>
                    <div className="font-semibold">Pierre Nzengue</div>
                    <div className="text-sm text-gray-500">Digital Marketing Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à Transformer Votre Avenir ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines d'étudiants qui ont choisi l'excellence. Les inscriptions pour l'année académique
            2025-2026 sont ouvertes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscription">
              <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg">
                S'inscrire maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/emploi-du-temps">
              <Button
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg bg-transparent"
              >
                Voir l'emploi du temps
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-Nous</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe est là pour répondre à toutes vos questions sur nos programmes et l'admission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                <p className="text-gray-600">
                  Boulevard Triomphal
                  <br />
                  Quartier Louis, Libreville
                  <br />
                  Gabon
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-600">
                  +241 01 23 45 67
                  <br />
                  +241 07 89 01 23
                  <br />
                  Lun-Ven: 8h-17h
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">
                  info@esg.ga
                  <br />
                  admissions@esg.ga
                  <br />
                  Réponse sous 24h
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <SchoolLogo size="md" variant="full" className="text-white mb-4" />
              <p className="text-gray-400 text-sm">
                Formant les leaders de demain depuis 2010, au cœur de l'Afrique Centrale.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Programmes</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/cursus" className="hover:text-white transition-colors">
                    Informatique
                  </Link>
                </li>
                <li>
                  <Link href="/cursus" className="hover:text-white transition-colors">
                    Business & Management
                  </Link>
                </li>
                <li>
                  <Link href="/cursus" className="hover:text-white transition-colors">
                    Communication
                  </Link>
                </li>
                <li>
                  <Link href="/cursus" className="hover:text-white transition-colors">
                    Design Graphique
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">École</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/cursus" className="hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/emploi-du-temps" className="hover:text-white transition-colors">
                    Emploi du temps
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/inscription" className="hover:text-white transition-colors">
                    Admission
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Boulevard Triomphal, Libreville</li>
                <li>+241 01 23 45 67</li>
                <li>info@esg.ga</li>
              </ul>
            </div>
          </div>

              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2025 École Supérieure du Gabon. Tous droits réservés.</p>
              </div>
            </div>
          </footer>
        </div>
      );
    }

