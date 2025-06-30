"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, CreditCard, Lock, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  cardType: z.string({
    required_error: "Veuillez sélectionner un type de carte",
  }),
  cardName: z.string().min(3, {
    message: "Le nom sur la carte doit contenir au moins 3 caractères",
  }),
  cardNumber: z
    .string()
    .min(16, {
      message: "Le numéro de carte doit contenir au moins 16 chiffres",
    })
    .max(19, {
      message: "Le numéro de carte ne peut pas dépasser 19 caractères",
    })
    .regex(/^[0-9\s-]+$/, {
      message: "Le numéro de carte doit contenir uniquement des chiffres, espaces ou tirets",
    }),
  expiryMonth: z.string({
    required_error: "Veuillez sélectionner un mois d'expiration",
  }),
  expiryYear: z.string({
    required_error: "Veuillez sélectionner une année d'expiration",
  }),
  cvv: z
    .string()
    .min(3, {
      message: "Le code CVV doit contenir au moins 3 chiffres",
    })
    .max(4, {
      message: "Le code CVV ne peut pas dépasser 4 chiffres",
    })
    .regex(/^[0-9]+$/, {
      message: "Le code CVV doit contenir uniquement des chiffres",
    }),
  paymentMethod: z.enum(["carte", "mobile", "virement"], {
    required_error: "Veuillez sélectionner une méthode de paiement",
  }),
})

export default function PaiementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cvv: "",
      paymentMethod: "carte",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simuler un traitement de paiement
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setPaymentSuccess(true)

      toast({
        title: "Paiement effectué avec succès",
        description: "Votre inscription est maintenant complète.",
      })

      // Rediriger vers la page d'emploi du temps après 2 secondes
      setTimeout(() => {
        router.push("/emploi-du-temps")
      }, 2000)
    }, 2000)
  }

  // Générer les options pour les mois d'expiration
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return {
      value: month.toString().padStart(2, "0"),
      label: month.toString().padStart(2, "0"),
    }
  })

  // Générer les options pour les années d'expiration
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i
    return {
      value: year.toString(),
      label: year.toString(),
    }
  })

  if (paymentSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600 flex items-center justify-center">
              <CheckCircle2 className="mr-2 h-6 w-6" />
              Paiement Réussi
            </CardTitle>
            <CardDescription>Votre inscription est maintenant complète</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              Nous vous remercions pour votre inscription à l'École Supérieure du Gabon. Vous allez être redirigé vers
              votre emploi du temps.
            </p>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/choix-departement">
            <Button variant="ghost" className="text-blue-300 hover:text-blue-100 hover:bg-blue-900/30 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au choix de département
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Paiement des Frais d'Inscription</h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-blue-100">
              Veuillez compléter le paiement pour finaliser votre inscription à l'École Supérieure du Gabon
            </p>
          </div>

          <Card className="bg-white text-gray-900 rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Informations de Paiement</CardTitle>
              <CardDescription>
                Les frais d'inscription s'élèvent à <span className="font-semibold">250 000 FCFA</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Méthode de paiement</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="carte" id="carte" />
                              <label htmlFor="carte" className="flex items-center cursor-pointer text-sm font-medium">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Carte bancaire
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mobile" id="mobile" />
                              <label htmlFor="mobile" className="flex items-center cursor-pointer text-sm font-medium">
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
                                  className="mr-2"
                                >
                                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                  <path d="M12 18h.01" />
                                </svg>
                                Mobile Money (Airtel, Moov)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="virement" id="virement" />
                              <label
                                htmlFor="virement"
                                className="flex items-center cursor-pointer text-sm font-medium"
                              >
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
                                  className="mr-2"
                                >
                                  <rect width="20" height="14" x="2" y="5" rx="2" />
                                  <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                                Virement bancaire
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("paymentMethod") === "carte" && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de carte</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un type de carte" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="visa">Visa</SelectItem>
                                  <SelectItem value="mastercard">Mastercard</SelectItem>
                                  <SelectItem value="amex">American Express</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom sur la carte</FormLabel>
                              <FormControl>
                                <Input placeholder="JEAN DUPONT" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Numéro de carte</FormLabel>
                              <FormControl>
                                <Input placeholder="4242 4242 4242 4242" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <FormField
                              control={form.control}
                              name="expiryMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Mois d'expiration</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {months.map((month) => (
                                        <SelectItem key={month.value} value={month.value}>
                                          {month.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div>
                            <FormField
                              control={form.control}
                              name="expiryYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Année d'expiration</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="AAAA" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {years.map((year) => (
                                        <SelectItem key={year.value} value={year.value}>
                                          {year.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code de sécurité (CVV)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="123" maxLength={4} {...field} />
                                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormDescription className="text-xs">
                                Le code à 3 ou 4 chiffres au dos de votre carte
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  {form.watch("paymentMethod") === "mobile" && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Instructions pour le paiement Mobile Money</h3>
                      <p className="text-sm">
                        1. Envoyez 250 000 FCFA au numéro <span className="font-bold">077 123 456</span>
                      </p>
                      <p className="text-sm">
                        2. Utilisez comme référence:{" "}
                        <span className="font-bold">ECOLE-{Date.now().toString().slice(-6)}</span>
                      </p>
                      <p className="text-sm">
                        3. Cliquez sur "Confirmer le paiement" après avoir effectué le transfert
                      </p>
                    </div>
                  )}

                  {form.watch("paymentMethod") === "virement" && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Coordonnées bancaires</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-semibold">Banque:</div>
                        <div>BGFI Bank Gabon</div>
                        <div className="font-semibold">Titulaire:</div>
                        <div>École Supérieure du Gabon</div>
                        <div className="font-semibold">IBAN:</div>
                        <div>GA21 4002 1000 0123 4567 8901 234</div>
                        <div className="font-semibold">Code SWIFT:</div>
                        <div>BGFIGALCXXX</div>
                        <div className="font-semibold">Référence:</div>
                        <div>INSCRIPTION-{Date.now().toString().slice(-6)}</div>
                      </div>
                      <p className="text-sm mt-2">
                        Veuillez envoyer une preuve de virement à <span className="font-bold">finance@esg.ga</span>{" "}
                        après avoir effectué le transfert.
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-blue-900 hover:bg-gray-800 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Traitement en cours...
                        </>
                      ) : (
                        "Confirmer le paiement"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Lock className="mr-1 h-3 w-3" />
                <span>Paiement sécurisé avec cryptage SSL 256 bits</span>
              </div>
              <p>
                En confirmant votre paiement, vous acceptez les conditions générales de l'École Supérieure du Gabon.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
