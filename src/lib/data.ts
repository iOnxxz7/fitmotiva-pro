// Mock data for FitMotiva Pro

export const mockWorkouts = [
  {
    id: 1,
    title: "Treino HIIT Matinal",
    duration: 20,
    difficulty: "intermediate",
    category: "Cardio",
    calories_burned: 180,
    plan_required: "basic",
    description: "Treino intenso de alta intensidade para queimar calorias rapidamente",
    exercises: [
      "Burpees - 30s",
      "Mountain Climbers - 30s", 
      "Jump Squats - 30s",
      "High Knees - 30s"
    ]
  },
  {
    id: 2,
    title: "Força Upper Body",
    duration: 45,
    difficulty: "advanced",
    category: "Musculação",
    calories_burned: 320,
    plan_required: "premium",
    description: "Fortalecimento completo da parte superior do corpo",
    exercises: [
      "Flexões - 3x12",
      "Pull-ups - 3x8",
      "Dips - 3x10",
      "Pike Push-ups - 3x8"
    ]
  },
  {
    id: 3,
    title: "Yoga Flow Relaxante",
    duration: 30,
    difficulty: "beginner",
    category: "Flexibilidade",
    calories_burned: 120,
    plan_required: "basic",
    description: "Sequência suave de yoga para relaxamento e flexibilidade",
    exercises: [
      "Saudação ao Sol",
      "Warrior Pose",
      "Downward Dog",
      "Child's Pose"
    ]
  },
  {
    id: 4,
    title: "Core Power",
    duration: 25,
    difficulty: "intermediate",
    category: "Abdomen",
    calories_burned: 200,
    plan_required: "premium",
    description: "Fortalecimento intensivo do core e músculos abdominais",
    exercises: [
      "Prancha - 60s",
      "Russian Twists - 30 reps",
      "Leg Raises - 15 reps",
      "Dead Bug - 20 reps"
    ]
  }
];

export const mockMealPlans = [
  {
    id: 1,
    title: "Plano Diário Completo",
    description: "Plano alimentar balanceado para o dia todo",
    type: "balanced",
    plan_required: "basic",
    total_calories: 1900,
    meals: [
      {
        id: 1,
        name: "Café da Manhã Energético",
        type: "breakfast",
        calories: 450,
        protein: "25g",
        carbs: "45g",
        fat: "18g",
        ingredients: [
          "2 ovos mexidos",
          "1 fatia de pão integral",
          "1/2 abacate",
          "1 copo de leite desnatado"
        ],
        prep_time: "10 min"
      },
      {
        id: 2,
        name: "Almoço Balanceado",
        type: "lunch",
        calories: 650,
        protein: "40g",
        carbs: "55g",
        fat: "22g",
        ingredients: [
          "150g peito de frango grelhado",
          "1 xícara de arroz integral",
          "Salada verde mista",
          "1 colher de azeite"
        ],
        prep_time: "25 min"
      },
      {
        id: 3,
        name: "Lanche Pré-Treino",
        type: "snack",
        calories: 280,
        protein: "15g",
        carbs: "35g",
        fat: "8g",
        ingredients: [
          "1 banana",
          "2 colheres de pasta de amendoim",
          "1 copo de água de coco"
        ],
        prep_time: "5 min"
      },
      {
        id: 4,
        name: "Jantar Leve",
        type: "dinner",
        calories: 520,
        protein: "35g",
        carbs: "30g",
        fat: "25g",
        ingredients: [
          "150g salmão grelhado",
          "Legumes refogados",
          "Salada de quinoa",
          "Azeite extravirgem"
        ],
        prep_time: "30 min"
      }
    ]
  },
  {
    id: 2,
    title: "Plano Low Carb",
    description: "Plano alimentar com baixo teor de carboidratos",
    type: "low_carb",
    plan_required: "premium",
    total_calories: 1600,
    meals: [
      {
        id: 5,
        name: "Café Proteico",
        type: "breakfast",
        calories: 320,
        protein: "30g",
        carbs: "15g",
        fat: "20g",
        ingredients: [
          "Omelete com 3 ovos",
          "Queijo cottage",
          "Espinafre refogado",
          "Café com MCT oil"
        ],
        prep_time: "15 min"
      },
      {
        id: 6,
        name: "Almoço Keto",
        type: "lunch",
        calories: 580,
        protein: "45g",
        carbs: "10g",
        fat: "40g",
        ingredients: [
          "Salmão grelhado 200g",
          "Brócolis no vapor",
          "Abacate",
          "Azeite de oliva"
        ],
        prep_time: "20 min"
      },
      {
        id: 7,
        name: "Lanche da Tarde",
        type: "snack",
        calories: 250,
        protein: "20g",
        carbs: "8g",
        fat: "15g",
        ingredients: [
          "Iogurte grego natural",
          "Nozes",
          "Sementes de chia"
        ],
        prep_time: "5 min"
      },
      {
        id: 8,
        name: "Jantar Light",
        type: "dinner",
        calories: 450,
        protein: "40g",
        carbs: "12g",
        fat: "28g",
        ingredients: [
          "Frango grelhado 180g",
          "Salada de rúcula",
          "Tomate cereja",
          "Azeite extravirgem"
        ],
        prep_time: "25 min"
      }
    ]
  },
  {
    id: 3,
    title: "Plano Vegetariano",
    description: "Plano alimentar vegetariano balanceado",
    type: "vegetarian",
    plan_required: "premium",
    total_calories: 1800,
    meals: [
      {
        id: 9,
        name: "Café Vegano",
        type: "breakfast",
        calories: 380,
        protein: "18g",
        carbs: "50g",
        fat: "15g",
        ingredients: [
          "Smoothie de banana e aveia",
          "Leite de amêndoas",
          "Pasta de amendoim",
          "Sementes de linhaça"
        ],
        prep_time: "10 min"
      },
      {
        id: 10,
        name: "Almoço Verde",
        type: "lunch",
        calories: 620,
        protein: "25g",
        carbs: "65g",
        fat: "22g",
        ingredients: [
          "Quinoa com legumes",
          "Grão de bico refogado",
          "Salada colorida",
          "Tahine"
        ],
        prep_time: "30 min"
      },
      {
        id: 11,
        name: "Lanche Natural",
        type: "snack",
        calories: 280,
        protein: "12g",
        carbs: "35g",
        fat: "12g",
        ingredients: [
          "Mix de frutas vermelhas",
          "Granola caseira",
          "Iogurte de coco"
        ],
        prep_time: "5 min"
      },
      {
        id: 12,
        name: "Jantar Nutritivo",
        type: "dinner",
        calories: 520,
        protein: "22g",
        carbs: "45g",
        fat: "28g",
        ingredients: [
          "Tofu grelhado",
          "Batata doce assada",
          "Espinafre refogado",
          "Castanhas"
        ],
        prep_time: "35 min"
      }
    ]
  }
];

export const motivationalQuotes = [
  "Seu corpo pode fazer isso. É sua mente que você precisa convencer.",
  "A dor que você sente hoje será a força que você sentirá amanhã.",
  "Não pare quando estiver cansado. Pare quando terminar.",
  "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.",
  "Você está sempre a um treino de distância de um bom humor.",
  "A disciplina é escolher entre o que você quer agora e o que você quer mais.",
  "Seu único limite é você mesmo.",
  "Grandes coisas nunca vêm da zona de conforto.",
  "A consistência é a chave para o sucesso.",
  "Cada dia é uma nova oportunidade para ser melhor."
];

export const planFeatures = {
  basic: {
    name: "Básico",
    price: 0,
    features: [
      "3 treinos por semana",
      "Planos alimentares básicos",
      "Acompanhamento de progresso",
      "Comunidade de apoio"
    ]
  },
  premium: {
    name: "Premium",
    price: 29.90,
    pixPrice: 24.90,
    features: [
      "Treinos ilimitados",
      "Planos alimentares personalizados",
      "Acompanhamento detalhado",
      "Suporte prioritário",
      "Acesso a conteúdo exclusivo",
      "Consultas com nutricionista"
    ]
  },
  elite: {
    name: "Elite",
    price: 49.90,
    pixPrice: 39.90,
    features: [
      "Tudo do Premium",
      "Personal trainer virtual",
      "Análise corporal avançada",
      "Planos de suplementação",
      "Acesso antecipado a novidades",
      "Consultoria individual mensal"
    ]
  }
};

// Dados adicionais para o perfil
export const userAchievements = [
  {
    id: 1,
    title: "Primeira Semana",
    description: "Complete 7 dias consecutivos",
    icon: "Calendar",
    unlocked: true,
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Queimador de Calorias",
    description: "Queime 1000 calorias em treinos",
    icon: "Zap",
    unlocked: true,
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "Mestre da Consistência",
    description: "30 dias de treino consecutivos",
    icon: "Award",
    unlocked: false,
    progress: 75
  },
  {
    id: 4,
    title: "Nutrição Perfeita",
    description: "Siga o plano alimentar por 14 dias",
    icon: "Heart",
    unlocked: false,
    progress: 60
  }
];

export const activityHistory = [
  {
    id: 1,
    type: "workout",
    title: "Treino HIIT Matinal",
    date: "2024-01-22",
    duration: "20 min",
    calories: 180,
    status: "completed"
  },
  {
    id: 2,
    type: "meal",
    title: "Café da Manhã Energético",
    date: "2024-01-22",
    calories: 450,
    status: "completed"
  },
  {
    id: 3,
    type: "workout",
    title: "Yoga Flow Relaxante",
    date: "2024-01-21",
    duration: "30 min",
    calories: 120,
    status: "completed"
  },
  {
    id: 4,
    type: "goal",
    title: "Meta de Peso Alcançada",
    date: "2024-01-20",
    value: "75kg",
    status: "achieved"
  }
];