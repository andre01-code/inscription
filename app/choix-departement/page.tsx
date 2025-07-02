"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2, GraduationCap, Users, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  department: z.string({
    required_error: "Veuillez sélectionner un département",
  }),
  specialization: z.string({
    required_error: "Veuillez sélectionner une filière",
  }),
  studentStatus: z.enum(["nouveau", "redoublant"], {
    required_error: "Veuillez indiquer votre statut",
  }),
  emergencyContactName: z.string().min(3, {
    message: "Le nom doit contenir au moins 3 caractères",
  }),
  emergencyContactPhone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide",
  }),
  emergencyContactRelation: z.string().min(2, {
    message: "Veuillez préciser la relation",
  }),
  fatherName: z.string().min(3, {
    message: "Le nom du père doit contenir au moins 3 caractères",
  }),
  motherName: z.string().min(3, {
    message: "Le nom de la mère doit contenir au moins 3 caractères",
  }),
})

// Structure des départements et filières
const departments = [
  {
    id: "info",
    name: "Informatique",
    specializations: [
      { id: "dev-web", name: "Développement Web" },
      { id: "ia-ml", name: "Intelligence Artificielle & Machine Learning" },
    ],
  },
  {
    id: "business",
    name: "Business & Management",
    specializations: [
      { id: "finance", name: "Finance d'Entreprise" },
      { id: "management", name: "Management des Organisations" },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    specializations: [{ id: "digital-com", name: "Communication Digitale" }],
  },
  {
    id: "design",
    name: "Design Graphique",
    specializations: [{ id: "ui-ux", name: "UI/UX Design" }],
  },
  {
    id: "marketing",
    name: "Marketing Digital",
    specializations: [{ id: "digital-marketing", name: "Marketing Digital" }],
  },
]

export default function ChoixDepartementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      fatherName: "",
      motherName: "",
    },
  })

  // Filtrer les filières en fonction du département sélectionné
  const availableSpecializations = selectedDepartment
    ? departments.find((dept) => dept.id === selectedDepartment)?.specializations || []
    : []

  // Mettre à jour les filières disponibles lorsque le département change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)
    form.setValue("specialization", "") // Réinitialiser la filière sélectionnée
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simuler une soumission de formulaire
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Informations académiques enregistrées",
        description: "Veuillez procéder au paiement pour finaliser votre inscription.",
      })
      setIsSubmitting(false)

      // Rediriger vers la page de paiement
      router.push("/paiement")
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button className="text-blue-300 hover:text-blue-100 hover:bg-blue-900/30 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'inscription
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Choix du Département et Filière</h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-blue-100">
              Veuillez sélectionner votre département et filière, et compléter les informations supplémentaires
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-900/50 text-white">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-blue-300 border-b border-blue-800 pb-2">
                      <GraduationCap className="h-5 w-5" />
                      <h2 className="text-xl font-semibold">Informations Académiques</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Département</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                                handleDepartmentChange(value)
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-blue-900/50 border-blue-700 text-white">
                                  <SelectValue placeholder="Sélectionner un département" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-blue-950 border-blue-800 text-white">
                                {departments.map((department) => (
                                  <SelectItem
                                    key={department.id}
                                    value={department.id}
                                    className="focus:bg-blue-800 focus:text-white"
                                  >
                                    {department.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Filière</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!selectedDepartment}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-blue-900/50 border-blue-700 text-white">
                                  <SelectValue placeholder="Sélectionner une filière" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-blue-950 border-blue-800 text-white">
                                {availableSpecializations.map((specialization) => (
                                  <SelectItem
                                    key={specialization.id}
                                    value={specialization.id}
                                    className="focus:bg-blue-800 focus:text-white"
                                  >
                                    {specialization.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-blue-300">
                              Choisissez la filière qui correspond à vos objectifs professionnels
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="studentStatus"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Statut de l'étudiant</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nouveau" id="nouveau" className="border-blue-400" />
                                <label
                                  htmlFor="nouveau"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Nouvel étudiant
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="redoublant" id="redoublant" className="border-blue-400" />
                                <label
                                  htmlFor="redoublant"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Redoublant
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-blue-300 border-b border-blue-800 pb-2">
                      <Phone className="h-5 w-5" />
                      <h2 className="text-xl font-semibold">Contact d'Urgence</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="emergencyContactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de la personne à contacter</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Marie Dupont"
                                {...field}
                                className="bg-blue-900/30 border-blue-700 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="emergencyContactRelation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relation</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Mère, Père, Tuteur..."
                                {...field}
                                className="bg-blue-900/30 border-blue-700 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="emergencyContactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de téléphone d'urgence</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="07 12 34 56 78"
                              {...field}
                              className="bg-blue-900/30 border-blue-700 text-white"
                            />
                          </FormControl>
                          <FormDescription className="text-blue-300">
                            Ce numéro sera utilisé uniquement en cas d'urgence
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-blue-300 border-b border-blue-800 pb-2">
                      <Users className="h-5 w-5" />
                      <h2 className="text-xl font-semibold">Informations Familiales</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fatherName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet du père</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jean Dupont"
                                {...field}
                                className="bg-blue-900/30 border-blue-700 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="motherName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet de la mère</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Marie Dupont"
                                {...field}
                                className="bg-blue-900/30 border-blue-700 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button type="submit" className="px-10 bg-blue-900 hover:bg-gray-800" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Traitement en cours...
                        </>
                      ) : (
                        "Suivant"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
