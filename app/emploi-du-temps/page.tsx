"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, BookOpen, FileText, AlertCircle } from "lucide-react"
import { format, isBefore, isToday } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Types pour notre structure de données
type Professor = {
  id: string
  name: string
  title: string
}

type Course = {
  id: string
  name: string
  professor: string
  day: string
  startTime: string
  endTime: string
  room: string
  color: string
}

type Assignment = {
  id: string
  title: string
  courseId: string
  dueDate: string
  type: "devoir" | "examen" | "projet" | "présentation"
  description: string
  semester: "S1" | "S2"
}

type Specialization = {
  id: string
  name: string
  courses: Course[]
  assignments: Assignment[]
}

type Department = {
  id: string
  name: string
  specializations: Specialization[]
}

// Données simulées pour les départements, filières, cours et professeurs
// Modifier les références aux professeurs pour refléter des noms gabonais
const professors: Professor[] = [
  { id: "prof1", name: "Dr. Jean-Paul Ndong", title: "Professeur en Informatique" },
  { id: "prof2", name: "Dr. Marie Ogoula", title: "Maître de conférences en Développement Web" },
  { id: "prof3", name: "Dr. Pierre Mboumba", title: "Professeur en Intelligence Artificielle" },
  { id: "prof4", name: "Dr. Sylvie Nzengue", title: "Professeur en Bases de Données" },
  { id: "prof5", name: "Dr. François Ondo", title: "Professeur en Cybersécurité" },
  { id: "prof6", name: "Dr. Jeanne Moussavou", title: "Professeur en Management" },
  { id: "prof7", name: "Dr. Robert Nzamba", title: "Professeur en Finance" },
  { id: "prof8", name: "Dr. Carine Obame", title: "Maître de conférences en Marketing" },
  { id: "prof9", name: "Dr. Michel Oyono", title: "Professeur en Communication" },
  { id: "prof10", name: "Dr. Pauline Ndong", title: "Professeur en Design" },
]

// Fonction pour générer des dates d'échéance réalistes adaptées au fuseau horaire du Gabon (UTC+1)
const generateDueDate = (semester: "S1" | "S2", weekOffset: number): string => {
  const now = new Date()
  const year = now.getFullYear()

  // Au Gabon, l'année académique commence généralement en octobre et se termine en juillet
  // S1: Octobre à Février, S2: Mars à Juillet
  const baseMonth = semester === "S1" ? 9 : 2 // 9 = Octobre, 2 = Mars
  const baseDate = new Date(year, baseMonth, 1)

  // Ajouter des semaines pour répartir les devoirs
  baseDate.setDate(baseDate.getDate() + weekOffset * 7)

  return baseDate.toISOString().split("T")[0]
}

const departments: Department[] = [
  {
    id: "info",
    name: "Informatique",
    specializations: [
      {
        id: "dev-web",
        name: "Développement Web",
        courses: [
          {
            id: "html-css",
            name: "HTML/CSS Avancé",
            professor: "prof2",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle A101",
            color: "bg-blue-500",
          },
          {
            id: "javascript",
            name: "JavaScript & Frameworks",
            professor: "prof2",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle A101",
            color: "bg-blue-600",
          },
          {
            id: "backend",
            name: "Développement Backend",
            professor: "prof4",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle A102",
            color: "bg-blue-700",
          },
          {
            id: "database",
            name: "Bases de Données",
            professor: "prof4",
            day: "Mardi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle A102",
            color: "bg-blue-800",
          },
          {
            id: "project-web",
            name: "Projet Web",
            professor: "prof1",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle A103",
            color: "bg-blue-500",
          },
          {
            id: "ux-ui",
            name: "UX/UI Design",
            professor: "prof10",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle A104",
            color: "bg-blue-600",
          },
          {
            id: "web-security",
            name: "Sécurité Web",
            professor: "prof5",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle A105",
            color: "bg-blue-700",
          },
        ],
        assignments: [
          {
            id: "assign1",
            title: "Portfolio personnel",
            courseId: "html-css",
            dueDate: generateDueDate("S1", 3),
            type: "projet",
            description:
              "Créer un portfolio personnel en utilisant HTML5, CSS3 et des techniques de responsive design.",
            semester: "S1",
          },
          {
            id: "assign2",
            title: "Application SPA",
            courseId: "javascript",
            dueDate: generateDueDate("S1", 5),
            type: "projet",
            description: "Développer une application Single Page avec React ou Vue.js qui consomme une API REST.",
            semester: "S1",
          },
          {
            id: "assign3",
            title: "Examen mi-semestre",
            courseId: "backend",
            dueDate: generateDueDate("S1", 7),
            type: "examen",
            description: "Examen sur les concepts fondamentaux du développement backend et les architectures serveur.",
            semester: "S1",
          },
          {
            id: "assign4",
            title: "Conception de base de données",
            courseId: "database",
            dueDate: generateDueDate("S1", 9),
            type: "devoir",
            description: "Concevoir un schéma de base de données relationnelle pour une application e-commerce.",
            semester: "S1",
          },
          {
            id: "assign5",
            title: "Projet final S1",
            courseId: "project-web",
            dueDate: generateDueDate("S1", 15),
            type: "projet",
            description: "Développer un site web complet avec frontend et backend pour un client fictif.",
            semester: "S1",
          },
          {
            id: "assign6",
            title: "Maquettes d'interface",
            courseId: "ux-ui",
            dueDate: generateDueDate("S2", 2),
            type: "devoir",
            description: "Créer des maquettes d'interface pour une application mobile en suivant les principes UX/UI.",
            semester: "S2",
          },
          {
            id: "assign7",
            title: "Audit de sécurité",
            courseId: "web-security",
            dueDate: generateDueDate("S2", 4),
            type: "devoir",
            description: "Réaliser un audit de sécurité sur une application web et proposer des améliorations.",
            semester: "S2",
          },
          {
            id: "assign8",
            title: "Présentation technique",
            courseId: "javascript",
            dueDate: generateDueDate("S2", 6),
            type: "présentation",
            description: "Présentation d'un framework JavaScript moderne ou d'une bibliothèque de votre choix.",
            semester: "S2",
          },
          {
            id: "assign9",
            title: "API RESTful",
            courseId: "backend",
            dueDate: generateDueDate("S2", 8),
            type: "projet",
            description: "Développer une API RESTful complète avec authentification et documentation.",
            semester: "S2",
          },
          {
            id: "assign10",
            title: "Projet final S2",
            courseId: "project-web",
            dueDate: generateDueDate("S2", 14),
            type: "projet",
            description: "Projet de fin d'année: application web complète avec déploiement en production.",
            semester: "S2",
          },
        ],
      },
      {
        id: "ia-ml",
        name: "Intelligence Artificielle & Machine Learning",
        courses: [
          {
            id: "intro-ia",
            name: "Introduction à l'IA",
            professor: "prof3",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 201",
            color: "bg-indigo-500",
          },
          {
            id: "ml-basics",
            name: "Fondamentaux du Machine Learning",
            professor: "prof3",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle 201",
            color: "bg-indigo-600",
          },
          {
            id: "deep-learning",
            name: "Deep Learning",
            professor: "prof3",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 202",
            color: "bg-indigo-700",
          },
          {
            id: "nlp",
            name: "Traitement du Langage Naturel",
            professor: "prof1",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 203",
            color: "bg-indigo-500",
          },
          {
            id: "computer-vision",
            name: "Vision par Ordinateur",
            professor: "prof1",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 204",
            color: "bg-indigo-600",
          },
          {
            id: "ia-ethics",
            name: "Éthique et IA",
            professor: "prof3",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 205",
            color: "bg-indigo-700",
          },
        ],
        assignments: [
          {
            id: "assign11",
            title: "Algorithmes de base",
            courseId: "intro-ia",
            dueDate: generateDueDate("S1", 2),
            type: "devoir",
            description: "Implémentation d'algorithmes de recherche et de résolution de problèmes.",
            semester: "S1",
          },
          {
            id: "assign12",
            title: "Classification supervisée",
            courseId: "ml-basics",
            dueDate: generateDueDate("S1", 4),
            type: "projet",
            description: "Développer et évaluer des modèles de classification sur un jeu de données réel.",
            semester: "S1",
          },
          {
            id: "assign13",
            title: "Réseaux de neurones",
            courseId: "deep-learning",
            dueDate: generateDueDate("S1", 8),
            type: "projet",
            description: "Implémenter un réseau de neurones profond pour la reconnaissance d'images.",
            semester: "S1",
          },
          {
            id: "assign14",
            title: "Examen théorique",
            courseId: "intro-ia",
            dueDate: generateDueDate("S1", 10),
            type: "examen",
            description: "Examen sur les fondements théoriques de l'intelligence artificielle.",
            semester: "S1",
          },
          {
            id: "assign15",
            title: "Projet NLP",
            courseId: "nlp",
            dueDate: generateDueDate("S1", 14),
            type: "projet",
            description: "Développer un système de traitement du langage naturel pour l'analyse de sentiment.",
            semester: "S1",
          },
          {
            id: "assign16",
            title: "Détection d'objets",
            courseId: "computer-vision",
            dueDate: generateDueDate("S2", 3),
            type: "projet",
            description: "Implémenter un système de détection d'objets en temps réel avec OpenCV.",
            semester: "S2",
          },
          {
            id: "assign17",
            title: "Débat éthique",
            courseId: "ia-ethics",
            dueDate: generateDueDate("S2", 5),
            type: "présentation",
            description: "Présentation et débat sur un dilemme éthique lié à l'intelligence artificielle.",
            semester: "S2",
          },
          {
            id: "assign18",
            title: "Apprentissage par renforcement",
            courseId: "ml-basics",
            dueDate: generateDueDate("S2", 7),
            type: "projet",
            description: "Développer un agent d'apprentissage par renforcement pour un environnement de jeu simple.",
            semester: "S2",
          },
          {
            id: "assign19",
            title: "Examen final",
            courseId: "deep-learning",
            dueDate: generateDueDate("S2", 12),
            type: "examen",
            description: "Examen final couvrant tous les aspects du deep learning et ses applications.",
            semester: "S2",
          },
          {
            id: "assign20",
            title: "Projet de recherche",
            courseId: "ia-ethics",
            dueDate: generateDueDate("S2", 15),
            type: "projet",
            description: "Projet de recherche sur un sujet avancé en IA avec publication d'un article.",
            semester: "S2",
          },
        ],
      },
    ],
  },
  {
    id: "business",
    name: "Business & Management",
    specializations: [
      {
        id: "finance",
        name: "Finance d'Entreprise",
        courses: [
          {
            id: "accounting",
            name: "Comptabilité Générale",
            professor: "prof7",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 301",
            color: "bg-green-500",
          },
          {
            id: "financial-analysis",
            name: "Analyse Financière",
            professor: "prof7",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle 301",
            color: "bg-green-600",
          },
          {
            id: "corporate-finance",
            name: "Finance d'Entreprise",
            professor: "prof7",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 302",
            color: "bg-green-700",
          },
          {
            id: "investment",
            name: "Gestion des Investissements",
            professor: "prof6",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 303",
            color: "bg-green-500",
          },
          {
            id: "risk-management",
            name: "Gestion des Risques",
            professor: "prof6",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 304",
            color: "bg-green-600",
          },
          {
            id: "tax-law",
            name: "Droit Fiscal",
            professor: "prof6",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 305",
            color: "bg-green-700",
          },
        ],
        assignments: [
          {
            id: "assign21",
            title: "Analyse de bilan",
            courseId: "accounting",
            dueDate: generateDueDate("S1", 3),
            type: "devoir",
            description: "Analyser le bilan comptable d'une entreprise réelle et identifier les points clés.",
            semester: "S1",
          },
          {
            id: "assign22",
            title: "Ratios financiers",
            courseId: "financial-analysis",
            dueDate: generateDueDate("S1", 5),
            type: "devoir",
            description: "Calculer et interpréter les principaux ratios financiers d'une entreprise cotée.",
            semester: "S1",
          },
          {
            id: "assign23",
            title: "Examen mi-semestre",
            courseId: "corporate-finance",
            dueDate: generateDueDate("S1", 8),
            type: "examen",
            description: "Examen sur les concepts fondamentaux de la finance d'entreprise.",
            semester: "S1",
          },
          {
            id: "assign24",
            title: "Étude de cas",
            courseId: "investment",
            dueDate: generateDueDate("S1", 11),
            type: "projet",
            description: "Étude de cas sur une décision d'investissement stratégique d'une multinationale.",
            semester: "S1",
          },
          {
            id: "assign25",
            title: "Simulation boursière",
            courseId: "risk-management",
            dueDate: generateDueDate("S1", 14),
            type: "projet",
            description: "Participer à une simulation boursière et documenter votre stratégie et résultats.",
            semester: "S1",
          },
          {
            id: "assign26",
            title: "Optimisation fiscale",
            courseId: "tax-law",
            dueDate: generateDueDate("S2", 2),
            type: "devoir",
            description: "Proposer une stratégie d'optimisation fiscale légale pour une PME.",
            semester: "S2",
          },
          {
            id: "assign27",
            title: "Présentation d'analyse",
            courseId: "financial-analysis",
            dueDate: generateDueDate("S2", 5),
            type: "présentation",
            description: "Présentation d'une analyse financière complète d'une entreprise du CAC 40.",
            semester: "S2",
          },
          {
            id: "assign28",
            title: "Plan d'investissement",
            courseId: "investment",
            dueDate: generateDueDate("S2", 8),
            type: "projet",
            description: "Élaborer un plan d'investissement diversifié pour un client fortuné.",
            semester: "S2",
          },
          {
            id: "assign29",
            title: "Examen final",
            courseId: "corporate-finance",
            dueDate: generateDueDate("S2", 12),
            type: "examen",
            description: "Examen final couvrant tous les aspects de la finance d'entreprise.",
            semester: "S2",
          },
          {
            id: "assign30",
            title: "Business plan",
            courseId: "accounting",
            dueDate: generateDueDate("S2", 15),
            type: "projet",
            description: "Élaborer un business plan complet pour une startup, incluant prévisions financières.",
            semester: "S2",
          },
        ],
      },
      {
        id: "management",
        name: "Management des Organisations",
        courses: [
          {
            id: "org-behavior",
            name: "Comportement Organisationnel",
            professor: "prof6",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 401",
            color: "bg-teal-500",
          },
          {
            id: "strategic-mgmt",
            name: "Management Stratégique",
            professor: "prof6",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle 401",
            color: "bg-teal-600",
          },
          {
            id: "hr-management",
            name: "Gestion des Ressources Humaines",
            professor: "prof6",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 402",
            color: "bg-teal-700",
          },
          {
            id: "project-mgmt",
            name: "Gestion de Projet",
            professor: "prof7",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 403",
            color: "bg-teal-500",
          },
          {
            id: "change-mgmt",
            name: "Gestion du Changement",
            professor: "prof6",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 404",
            color: "bg-teal-600",
          },
          {
            id: "business-ethics",
            name: "Éthique des Affaires",
            professor: "prof7",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 405",
            color: "bg-teal-700",
          },
        ],
        assignments: [
          {
            id: "assign31",
            title: "Étude de cas organisationnel",
            courseId: "org-behavior",
            dueDate: generateDueDate("S1", 2),
            type: "devoir",
            description: "Analyser la culture organisationnelle d'une entreprise et ses impacts sur la performance.",
            semester: "S1",
          },
          {
            id: "assign32",
            title: "Analyse SWOT",
            courseId: "strategic-mgmt",
            dueDate: generateDueDate("S1", 4),
            type: "devoir",
            description: "Réaliser une analyse SWOT détaillée d'une entreprise de votre choix.",
            semester: "S1",
          },
          {
            id: "assign33",
            title: "Plan de recrutement",
            courseId: "hr-management",
            dueDate: generateDueDate("S1", 7),
            type: "projet",
            description: "Élaborer un plan de recrutement et d'intégration pour une équipe de 10 personnes.",
            semester: "S1",
          },
          {
            id: "assign34",
            title: "Examen mi-semestre",
            courseId: "org-behavior",
            dueDate: generateDueDate("S1", 9),
            type: "examen",
            description: "Examen sur les théories du comportement organisationnel et leur application.",
            semester: "S1",
          },
          {
            id: "assign35",
            title: "Gestion de projet agile",
            courseId: "project-mgmt",
            dueDate: generateDueDate("S1", 13),
            type: "projet",
            description: "Planifier un projet en utilisant la méthodologie agile et les outils associés.",
            semester: "S1",
          },
          {
            id: "assign36",
            title: "Plan de gestion du changement",
            courseId: "change-mgmt",
            dueDate: generateDueDate("S2", 3),
            type: "projet",
            description: "Élaborer un plan de gestion du changement pour une transformation digitale.",
            semester: "S2",
          },
          {
            id: "assign37",
            title: "Débat éthique",
            courseId: "business-ethics",
            dueDate: generateDueDate("S2", 6),
            type: "présentation",
            description: "Présentation et débat sur un dilemme éthique dans le monde des affaires.",
            semester: "S2",
          },
          {
            id: "assign38",
            title: "Stratégie d'entreprise",
            courseId: "strategic-mgmt",
            dueDate: generateDueDate("S2", 9),
            type: "projet",
            description: "Développer une stratégie d'entreprise complète pour une PME en croissance.",
            semester: "S2",
          },
          {
            id: "assign39",
            title: "Examen final",
            courseId: "hr-management",
            dueDate: generateDueDate("S2", 12),
            type: "examen",
            description: "Examen final sur les pratiques modernes de gestion des ressources humaines.",
            semester: "S2",
          },
          {
            id: "assign40",
            title: "Projet de consulting",
            courseId: "project-mgmt",
            dueDate: generateDueDate("S2", 15),
            type: "projet",
            description: "Projet de consulting pour résoudre un problème réel d'une entreprise partenaire.",
            semester: "S2",
          },
        ],
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    specializations: [
      {
        id: "digital-com",
        name: "Communication Digitale",
        courses: [
          {
            id: "digital-strategy",
            name: "Stratégie Digitale",
            professor: "prof9",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 501",
            color: "bg-purple-500",
          },
          {
            id: "social-media",
            name: "Gestion des Réseaux Sociaux",
            professor: "prof9",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle 501",
            color: "bg-purple-600",
          },
          {
            id: "content-creation",
            name: "Création de Contenu",
            professor: "prof9",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 502",
            color: "bg-purple-700",
          },
          {
            id: "seo-sem",
            name: "SEO & SEM",
            professor: "prof8",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 503",
            color: "bg-purple-500",
          },
          {
            id: "analytics",
            name: "Analyse de Données Digitales",
            professor: "prof8",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 504",
            color: "bg-purple-600",
          },
          {
            id: "e-reputation",
            name: "E-réputation",
            professor: "prof9",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 505",
            color: "bg-purple-700",
          },
        ],
        assignments: [
          {
            id: "assign41",
            title: "Plan de communication digitale",
            courseId: "digital-strategy",
            dueDate: generateDueDate("S1", 3),
            type: "projet",
            description: "Élaborer un plan de communication digitale pour une marque de votre choix.",
            semester: "S1",
          },
          {
            id: "assign42",
            title: "Campagne réseaux sociaux",
            courseId: "social-media",
            dueDate: generateDueDate("S1", 5),
            type: "projet",
            description: "Concevoir une campagne sur les réseaux sociaux pour un lancement de produit.",
            semester: "S1",
          },
          {
            id: "assign43",
            title: "Production de contenu",
            courseId: "content-creation",
            dueDate: generateDueDate("S1", 8),
            type: "devoir",
            description: "Créer une série de contenus (articles, vidéos, infographies) sur une thématique.",
            semester: "S1",
          },
          {
            id: "assign44",
            title: "Examen mi-semestre",
            courseId: "digital-strategy",
            dueDate: generateDueDate("S1", 10),
            type: "examen",
            description: "Examen sur les fondamentaux de la stratégie digitale et son intégration.",
            semester: "S1",
          },
          {
            id: "assign45",
            title: "Audit SEO",
            courseId: "seo-sem",
            dueDate: generateDueDate("S1", 13),
            type: "projet",
            description: "Réaliser un audit SEO complet d'un site web et proposer des améliorations.",
            semester: "S1",
          },
          {
            id: "assign46",
            title: "Tableau de bord analytics",
            courseId: "analytics",
            dueDate: generateDueDate("S2", 2),
            type: "projet",
            description: "Créer un tableau de bord d'analyse de performance digitale avec Google Data Studio.",
            semester: "S2",
          },
          {
            id: "assign47",
            title: "Gestion de crise",
            courseId: "e-reputation",
            dueDate: generateDueDate("S2", 5),
            type: "présentation",
            description: "Présentation d'un plan de gestion de crise pour un scénario de bad buzz.",
            semester: "S2",
          },
          {
            id: "assign48",
            title: "Campagne Google Ads",
            courseId: "seo-sem",
            dueDate: generateDueDate("S2", 8),
            type: "projet",
            description: "Concevoir et simuler une campagne Google Ads optimisée pour un budget donné.",
            semester: "S2",
          },
          {
            id: "assign49",
            title: "Examen final",
            courseId: "digital-strategy",
            dueDate: generateDueDate("S2", 12),
            type: "examen",
            description: "Examen final sur l'ensemble des aspects de la communication digitale.",
            semester: "S2",
          },
          {
            id: "assign50",
            title: "Projet client réel",
            courseId: "content-creation",
            dueDate: generateDueDate("S2", 15),
            type: "projet",
            description: "Réaliser une stratégie de contenu complète pour un client réel.",
            semester: "S2",
          },
        ],
      },
    ],
  },
  {
    id: "design",
    name: "Design Graphique",
    specializations: [
      {
        id: "ui-ux",
        name: "UI/UX Design",
        courses: [
          {
            id: "ui-principles",
            name: "Principes de l'UI Design",
            professor: "prof10",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 601",
            color: "bg-pink-500",
          },
          {
            id: "ux-research",
            name: "Recherche UX",
            professor: "prof10",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle 601",
            color: "bg-pink-600",
          },
          {
            id: "prototyping",
            name: "Prototypage",
            professor: "prof10",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 602",
            color: "bg-pink-700",
          },
          {
            id: "interaction-design",
            name: "Design d'Interaction",
            professor: "prof10",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 603",
            color: "bg-pink-500",
          },
          {
            id: "design-systems",
            name: "Systèmes de Design",
            professor: "prof10",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 604",
            color: "bg-pink-600",
          },
          {
            id: "accessibility",
            name: "Accessibilité",
            professor: "prof10",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 605",
            color: "bg-pink-700",
          },
        ],
        assignments: [
          {
            id: "assign51",
            title: "Interface mobile",
            courseId: "ui-principles",
            dueDate: generateDueDate("S1", 2),
            type: "devoir",
            description: "Concevoir l'interface d'une application mobile en respectant les principes de l'UI.",
            semester: "S1",
          },
          {
            id: "assign52",
            title: "Étude utilisateur",
            courseId: "ux-research",
            dueDate: generateDueDate("S1", 4),
            type: "projet",
            description: "Mener une étude utilisateur complète (interviews, personas, parcours utilisateur).",
            semester: "S1",
          },
          {
            id: "assign53",
            title: "Prototype interactif",
            courseId: "prototyping",
            dueDate: generateDueDate("S1", 7),
            type: "projet",
            description: "Créer un prototype interactif haute-fidélité avec Figma ou Adobe XD.",
            semester: "S1",
          },
          {
            id: "assign54",
            title: "Examen mi-semestre",
            courseId: "ui-principles",
            dueDate: generateDueDate("S1", 9),
            type: "examen",
            description: "Examen sur les principes fondamentaux du design d'interface.",
            semester: "S1",
          },
          {
            id: "assign55",
            title: "Micro-interactions",
            courseId: "interaction-design",
            dueDate: generateDueDate("S1", 12),
            type: "devoir",
            description: "Concevoir une série de micro-interactions pour améliorer l'expérience utilisateur.",
            semester: "S1",
          },
          {
            id: "assign56",
            title: "Système de design",
            courseId: "design-systems",
            dueDate: generateDueDate("S2", 3),
            type: "projet",
            description: "Créer un système de design complet avec composants, tokens et documentation.",
            semester: "S2",
          },
          {
            id: "assign57",
            title: "Audit d'accessibilité",
            courseId: "accessibility",
            dueDate: generateDueDate("S2", 5),
            type: "devoir",
            description: "Réaliser un audit d'accessibilité d'un site web et proposer des améliorations.",
            semester: "S2",
          },
          {
            id: "assign58",
            title: "Présentation de recherche",
            courseId: "ux-research",
            dueDate: generateDueDate("S2", 8),
            type: "présentation",
            description: "Présentation des résultats d'une recherche utilisateur approfondie.",
            semester: "S2",
          },
          {
            id: "assign59",
            title: "Examen final",
            courseId: "interaction-design",
            dueDate: generateDueDate("S2", 12),
            type: "examen",
            description: "Examen final sur les principes avancés du design d'interaction.",
            semester: "S2",
          },
          {
            id: "assign60",
            title: "Projet portfolio",
            courseId: "prototyping",
            dueDate: generateDueDate("S2", 15),
            type: "projet",
            description: "Concevoir et prototyper un produit digital complet de A à Z pour votre portfolio.",
            semester: "S2",
          },
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing Digital",
    specializations: [
      {
        id: "digital-marketing",
        name: "Marketing Digital",
        courses: [
          {
            id: "digital-strategy-mkt",
            name: "Stratégie Marketing Digital",
            professor: "prof8",
            day: "Lundi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 701",
            color: "bg-orange-500",
          },
          {
            id: "content-marketing",
            name: "Marketing de Contenu",
            professor: "prof8",
            day: "Lundi",
            startTime: "14:00",
            endTime: "17:00",
            room: "Salle 701",
            color: "bg-orange-600",
          },
          {
            id: "email-marketing",
            name: "Email Marketing",
            professor: "prof8",
            day: "Mardi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 702",
            color: "bg-orange-700",
          },
          {
            id: "social-media-mkt",
            name: "Marketing des Réseaux Sociaux",
            professor: "prof9",
            day: "Mercredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 703",
            color: "bg-orange-500",
          },
          {
            id: "seo-marketing",
            name: "SEO & Marketing de Recherche",
            professor: "prof8",
            day: "Jeudi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 704",
            color: "bg-orange-600",
          },
          {
            id: "analytics-mkt",
            name: "Analyse de Données Marketing",
            professor: "prof8",
            day: "Vendredi",
            startTime: "09:00",
            endTime: "12:00",
            room: "Salle 705",
            color: "bg-orange-700",
          },
        ],
        assignments: [
          {
            id: "assign61",
            title: "Plan marketing digital",
            courseId: "digital-strategy-mkt",
            dueDate: generateDueDate("S1", 3),
            type: "projet",
            description: "Élaborer un plan marketing digital complet pour une entreprise de votre choix.",
            semester: "S1",
          },
          {
            id: "assign62",
            title: "Stratégie de contenu",
            courseId: "content-marketing",
            dueDate: generateDueDate("S1", 5),
            type: "devoir",
            description: "Développer une stratégie de contenu pour un blog d'entreprise sur 6 mois.",
            semester: "S1",
          },
          {
            id: "assign63",
            title: "Campagne d'emailing",
            courseId: "email-marketing",
            dueDate: generateDueDate("S1", 8),
            type: "projet",
            description: "Concevoir une séquence d'emails automatisés pour un tunnel de conversion.",
            semester: "S1",
          },
          {
            id: "assign64",
            title: "Examen mi-semestre",
            courseId: "digital-strategy-mkt",
            dueDate: generateDueDate("S1", 10),
            type: "examen",
            description: "Examen sur les fondamentaux du marketing digital et ses composantes.",
            semester: "S1",
          },
          {
            id: "assign65",
            title: "Stratégie réseaux sociaux",
            courseId: "social-media-mkt",
            dueDate: generateDueDate("S1", 13),
            type: "projet",
            description: "Élaborer une stratégie de présence sur les réseaux sociaux pour une marque.",
            semester: "S1",
          },
          {
            id: "assign66",
            title: "Audit SEO",
            courseId: "seo-marketing",
            dueDate: generateDueDate("S2", 2),
            type: "devoir",
            description: "Réaliser un audit SEO complet et proposer un plan d'action.",
            semester: "S2",
          },
          {
            id: "assign67",
            title: "Présentation analytics",
            courseId: "analytics-mkt",
            dueDate: generateDueDate("S2", 5),
            type: "présentation",
            description: "Présentation d'une analyse de données marketing avec recommandations.",
            semester: "S2",
          },
          {
            id: "assign68",
            title: "Campagne multicanal",
            courseId: "digital-strategy-mkt",
            dueDate: generateDueDate("S2", 8),
            type: "projet",
            description: "Concevoir une campagne marketing multicanal intégrée.",
            semester: "S2",
          },
          {
            id: "assign69",
            title: "Examen final",
            courseId: "content-marketing",
            dueDate: generateDueDate("S2", 12),
            type: "examen",
            description: "Examen final sur l'ensemble des aspects du marketing digital.",
            semester: "S2",
          },
          {
            id: "assign70",
            title: "Projet client réel",
            courseId: "analytics-mkt",
            dueDate: generateDueDate("S2", 15),
            type: "projet",
            description: "Développer et mettre en œuvre une stratégie marketing pour un client réel.",
            semester: "S2",
          },
        ],
      },
    ],
  },
]

// Jours de la semaine pour l'emploi du temps
const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

// Heures de la journée pour l'emploi du temps
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
]

// Fonction pour obtenir la couleur de badge selon le type de devoir
const getAssignmentBadgeColor = (type: string): string => {
  switch (type) {
    case "devoir":
      return "bg-blue-500 hover:bg-blue-600"
    case "examen":
      return "bg-red-500 hover:bg-red-600"
    case "projet":
      return "bg-green-500 hover:bg-green-600"
    case "présentation":
      return "bg-purple-500 hover:bg-purple-600"
    default:
      return "bg-gray-500 hover:bg-gray-600"
  }
}

// Fonction pour obtenir l'icône selon le type de devoir
const getAssignmentIcon = (type: string) => {
  switch (type) {
    case "devoir":
      return <FileText className="h-4 w-4" />
    case "examen":
      return <AlertCircle className="h-4 w-4" />
    case "projet":
      return <BookOpen className="h-4 w-4" />
    case "présentation":
      return <User className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function EmploiDuTempsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<"S1" | "S2">("S1")
  const [loading, setLoading] = useState<boolean>(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [availableSpecializations, setAvailableSpecializations] = useState<Specialization[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Effet pour mettre à jour les filières disponibles lorsque le département change
  useEffect(() => {
    if (selectedDepartment) {
      const department = departments.find((dept) => dept.id === selectedDepartment)
      if (department) {
        setAvailableSpecializations(department.specializations)
        setSelectedSpecialization("")
        setCourses([])
        setAssignments([])
      }
    } else {
      setAvailableSpecializations([])
      setSelectedSpecialization("")
      setCourses([])
      setAssignments([])
    }
  }, [selectedDepartment])

  // Effet pour charger les cours et devoirs lorsque la filière change
  useEffect(() => {
    if (selectedSpecialization) {
      setLoading(true)
      // Simuler un temps de chargement pour montrer le skeleton loader
      setTimeout(() => {
        const department = departments.find((dept) => dept.id === selectedDepartment)
        if (department) {
          const specialization = department.specializations.find((spec) => spec.id === selectedSpecialization)
          if (specialization) {
            setCourses(specialization.courses)
            setAssignments(specialization.assignments.filter((a) => a.semester === selectedSemester))
          }
        }
        setLoading(false)
      }, 800)
    }
  }, [selectedSpecialization, selectedDepartment, selectedSemester])

  // Fonction pour obtenir le professeur par ID
  const getProfessorById = (id: string): Professor | undefined => {
    return professors.find((prof) => prof.id === id)
  }

  // Fonction pour obtenir le cours par ID
  const getCourseById = (id: string): Course | undefined => {
    return courses.find((course) => course.id === id)
  }

  // Fonction pour vérifier si un cours est à un jour et une heure spécifiques
  const getCourseAtTimeSlot = (day: string, timeSlot: string): Course | undefined => {
    const [startHour] = timeSlot.split(" - ")
    return courses.find((course) => course.day === day && course.startTime <= startHour && course.endTime > startHour)
  }

  // Fonction pour calculer la durée d'un cours en nombre de créneaux horaires
  const getCourseDuration = (course: Course): number => {
    const startHour = Number.parseInt(course.startTime.split(":")[0])
    const endHour = Number.parseInt(course.endTime.split(":")[0])
    return endHour - startHour
  }

  // Fonction pour vérifier si un créneau horaire est le début d'un cours
  const isStartOfCourse = (day: string, timeSlot: string): boolean => {
    const [startHour] = timeSlot.split(" - ")
    return courses.some((course) => course.day === day && course.startTime === startHour)
  }

  // Fonction pour vérifier si une date a des devoirs
  const hasAssignmentsOnDate = (date: Date): boolean => {
    const dateString = format(date, "yyyy-MM-dd")
    return assignments.some((assignment) => assignment.dueDate === dateString)
  }

  // Fonction pour obtenir les devoirs pour une date spécifique
  const getAssignmentsForDate = (date: Date): Assignment[] => {
    const dateString = format(date, "yyyy-MM-dd")
    return assignments.filter((assignment) => assignment.dueDate === dateString)
  }

  // Fonction pour trier les devoirs par date
  const sortAssignmentsByDate = (a: Assignment, b: Assignment): number => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  }

  // Fonction pour vérifier si un devoir est à venir, passé ou aujourd'hui
  const getAssignmentStatus = (dueDate: string): "upcoming" | "past" | "today" => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const assignmentDate = new Date(dueDate)
    assignmentDate.setHours(0, 0, 0, 0)

    if (isToday(assignmentDate)) return "today"
    if (isBefore(assignmentDate, today)) return "past"
    return "upcoming"
  }

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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Emploi du Temps</h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              Sélectionnez votre département et votre filière pour consulter votre emploi du temps et vos devoirs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">Département</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-blue-900/50 border-blue-700 text-white">
                  <SelectValue placeholder="Sélectionnez un département" />
                </SelectTrigger>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">Filière</label>
              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
                disabled={!selectedDepartment || availableSpecializations.length === 0}
              >
                <SelectTrigger className="bg-blue-900/50 border-blue-700 text-white">
                  <SelectValue placeholder="Sélectionnez une filière" />
                </SelectTrigger>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">Semestre</label>
              <Select value={selectedSemester} onValueChange={(value) => setSelectedSemester(value as "S1" | "S2")}>
                <SelectTrigger className="bg-blue-900/50 border-blue-700 text-white">
                  <SelectValue placeholder="Sélectionnez un semestre" />
                </SelectTrigger>
                <SelectContent className="bg-blue-950 border-blue-800 text-white">
                  <SelectItem value="S1" className="focus:bg-blue-800 focus:text-white">
                    Semestre 1
                  </SelectItem>
                  <SelectItem value="S2" className="focus:bg-blue-800 focus:text-white">
                    Semestre 2
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedDepartment && selectedSpecialization ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                {departments.find((d) => d.id === selectedDepartment)?.name} -{" "}
                {availableSpecializations.find((s) => s.id === selectedSpecialization)?.name} - Semestre{" "}
                {selectedSemester === "S1" ? "1" : "2"}
              </h2>

              {loading ? (
                // Skeleton loader pendant le chargement
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-6 gap-2">
                      <Skeleton className="h-12 bg-blue-900/30" />
                      {Array.from({ length: 5 }).map((_, dayIndex) => (
                        <Skeleton key={dayIndex} className="h-12 bg-blue-900/30" />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Tabs defaultValue="schedule" className="w-full">
                    <TabsList className="bg-blue-900/50 mb-4">
                      <TabsTrigger value="schedule">Emploi du Temps</TabsTrigger>
                      <TabsTrigger value="list">Liste des Cours</TabsTrigger>
                      <TabsTrigger value="assignments">Calendrier des Devoirs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="schedule">
                      <div className="min-w-[800px]">
                        <div className="grid grid-cols-6 gap-2 mb-2">
                          <div className="font-semibold text-center py-2 bg-blue-900/50 rounded-md">Horaire</div>
                          {weekDays.map((day) => (
                            <div key={day} className="font-semibold text-center py-2 bg-blue-900/50 rounded-md">
                              {day}
                            </div>
                          ))}
                        </div>

                        {timeSlots.map((timeSlot) => (
                          <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
                            <div className="text-sm text-center py-3 bg-blue-900/20 rounded-md flex items-center justify-center">
                              {timeSlot}
                            </div>

                            {weekDays.map((day) => {
                              const course = getCourseAtTimeSlot(day, timeSlot)
                              const isStart = isStartOfCourse(day, timeSlot)

                              if (course && isStart) {
                                const duration = getCourseDuration(course)
                                const professor = getProfessorById(course.professor)

                                return (
                                  <div
                                    key={`${day}-${timeSlot}`}
                                    className={`rounded-md p-2 ${course.color} row-span-${duration} flex flex-col`}
                                    style={{ gridRow: `span ${duration}` }}
                                  >
                                    <div className="font-semibold text-sm">{course.name}</div>
                                    <div className="text-xs mt-1 flex items-center">
                                      <User className="h-3 w-3 mr-1" />
                                      {professor?.name}
                                    </div>
                                    <div className="text-xs mt-1 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {course.startTime} - {course.endTime}
                                    </div>
                                    <div className="text-xs mt-1">{course.room}</div>
                                  </div>
                                )
                              }

                              if (course && !isStart) {
                                // Cette cellule fait partie d'un cours qui a déjà commencé
                                return null
                              }

                              return <div key={`${day}-${timeSlot}`} className="bg-blue-900/10 rounded-md"></div>
                            })}
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="list">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courses.map((course) => {
                          const professor = getProfessorById(course.professor)
                          return (
                            <Card
                              key={course.id}
                              className={`${course.color} border-none text-white hover:shadow-lg transition-shadow`}
                            >
                              <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-2">{course.name}</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>{professor?.name}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{course.day}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>
                                      {course.startTime} - {course.endTime}
                                    </span>
                                  </div>
                                  <div className="text-sm opacity-90">{course.room}</div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </TabsContent>

                    <TabsContent value="assignments">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-blue-900/20 p-4 rounded-xl">
                          <h3 className="text-xl font-semibold mb-4">Calendrier des devoirs</h3>
                          <div className="bg-blue-900/30 rounded-lg p-4">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="border-blue-800"
                              modifiers={{
                                hasAssignment: (date) => hasAssignmentsOnDate(date),
                              }}
                              modifiersClassNames={{
                                hasAssignment: "bg-blue-700 text-white font-bold",
                              }}
                            />
                          </div>

                          {selectedDate && getAssignmentsForDate(selectedDate).length > 0 ? (
                            <div className="mt-4 space-y-3">
                              <h4 className="font-medium text-blue-300">
                                Devoirs pour le {format(selectedDate, "d MMMM yyyy", { locale: fr })}
                              </h4>
                              {getAssignmentsForDate(selectedDate).map((assignment) => {
                                const course = getCourseById(assignment.courseId)
                                return (
                                  <Card key={assignment.id} className="bg-blue-900/40 border-blue-800">
                                    <CardContent className="p-3">
                                      <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-full ${getAssignmentBadgeColor(assignment.type)}`}>
                                          {getAssignmentIcon(assignment.type)}
                                        </div>
                                        <div>
                                          <h5 className="font-semibold">{assignment.title}</h5>
                                          <p className="text-sm text-blue-200">{course?.name}</p>
                                          <p className="text-xs mt-1 text-blue-300">{assignment.description}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )
                              })}
                            </div>
                          ) : selectedDate ? (
                            <div className="mt-4 p-3 bg-blue-900/30 rounded-lg text-center">
                              <p className="text-blue-200">
                                Aucun devoir prévu pour le {format(selectedDate, "d MMMM yyyy", { locale: fr })}
                              </p>
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-4">Liste des devoirs du semestre</h3>
                          <div className="space-y-4">
                            {assignments.length > 0 ? (
                              <>
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                  <Badge className="bg-blue-500">Devoir</Badge>
                                  <Badge className="bg-red-500">Examen</Badge>
                                  <Badge className="bg-green-500">Projet</Badge>
                                </div>

                                {assignments.sort(sortAssignmentsByDate).map((assignment) => {
                                  const course = getCourseById(assignment.courseId)
                                  const status = getAssignmentStatus(assignment.dueDate)
                                  return (
                                    <Card
                                      key={assignment.id}
                                      className={`border-l-4 ${
                                        status === "past"
                                          ? "border-l-gray-500 bg-blue-900/20 opacity-70"
                                          : status === "today"
                                            ? "border-l-yellow-500 bg-blue-900/30"
                                            : "border-l-blue-500 bg-blue-900/30"
                                      }`}
                                    >
                                      <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h4 className="font-semibold text-lg flex items-center gap-2">
                                              {assignment.title}
                                              <Badge className={`ml-2 ${getAssignmentBadgeColor(assignment.type)}`}>
                                                {assignment.type}
                                              </Badge>
                                            </h4>
                                            <p className="text-sm text-blue-200 mt-1">{course?.name}</p>
                                            <p className="text-sm mt-2">{assignment.description}</p>
                                          </div>
                                          <div className="text-right">
                                            <div
                                              className={`text-sm font-medium ${
                                                status === "past"
                                                  ? "text-gray-400"
                                                  : status === "today"
                                                    ? "text-yellow-300"
                                                    : "text-blue-300"
                                              }`}
                                            >
                                              {format(new Date(assignment.dueDate), "d MMMM yyyy", { locale: fr })}
                                            </div>
                                            <div className="text-xs mt-1">
                                              {status === "past"
                                                ? "Terminé"
                                                : status === "today"
                                                  ? "Aujourd'hui"
                                                  : "À venir"}
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )
                                })}
                              </>
                            ) : (
                              <div className="p-6 bg-blue-900/20 rounded-lg text-center">
                                <FileText className="h-12 w-12 mx-auto mb-3 text-blue-400 opacity-70" />
                                <p className="text-blue-200">
                                  Aucun devoir trouvé pour ce semestre. Veuillez sélectionner un département et une
                                  filière.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Aucun emploi du temps à afficher</h3>
              <p className="text-blue-200">
                Veuillez sélectionner un département et une filière pour consulter votre emploi du temps et vos devoirs.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
