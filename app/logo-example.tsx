import { SchoolLogo } from "@/components/school-logo"

export default function LogoExample() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Logo de l'École Supérieure du Gabon</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Logo Complet</h2>
            <SchoolLogo size="xl" variant="full" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Logo Icône</h2>
            <SchoolLogo size="xl" variant="icon" />
          </div>

          <div className="bg-blue-900 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-white">Sur fond foncé</h2>
            <SchoolLogo size="lg" variant="full" className="text-white" />
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Différentes tailles</h2>
            <div className="flex items-center space-x-4">
              <SchoolLogo size="sm" variant="icon" />
              <SchoolLogo size="md" variant="icon" />
              <SchoolLogo size="lg" variant="icon" />
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Utilisation du logo</h2>
          <p className="text-gray-700">
            Ce logo représente l'harmonie entre l'art et l'éducation, symbolisée par le violon et les effets de fumée
            artistiques. Il peut être utilisé sur tous les documents officiels, le site web, et les matériaux
            promotionnels de l'École Supérieure du Gabon.
          </p>
        </div>
      </div>
    </div>
  )
}
