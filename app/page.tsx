import Link from "next/link"
import { SchoolRegistrationForm } from "@/components/school-registration-form"
import { SchoolLogo } from "@/components/school-logo"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-blue-900 text-white p-8 md:w-1/3 flex flex-col justify-center">
            <div className="mb-6">
              <SchoolLogo size="lg" variant="full" className="text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">École Supérieure du Gabon</h1>
            <p className="text-blue-100 mb-6">
              Inscrivez-vous pour l'année académique 2025-2026 et commencez votre parcours vers l'excellence au cœur de
              l'Afrique Centrale.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span>Programmes de qualité reconnus</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span>Professeurs expérimentés</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span>Opportunités de carrière locales et internationales</span>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <Link href="/cursus" className="text-blue-300 hover:text-blue-100 underline block">
                Découvrir notre cursus complet
              </Link>
              <Link href="/emploi-du-temps" className="text-blue-300 hover:text-blue-100 underline block">
                Consulter l'emploi du temps
              </Link>
            </div>
          </div>
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulaire d'Inscription</h2>
            <SchoolRegistrationForm />
          </div>
        </div>
      </div>
    </main>
  )
}
