'use client'

import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { User } from '@/lib/supabase'
import { mockWorkouts, mockMealPlans, motivationalQuotes, planFeatures } from '@/lib/data'
import { Play, Utensils, TrendingUp, Crown, Zap, Users, Gift, Settings, LogOut, Menu, X, Camera, Bell, Share2, Star, Calendar, Award, Target, Activity, Heart, Shield, Download, Upload } from 'lucide-react'
import Logo from '@/components/custom/Logo'

export default function FitMotivaPro() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dailyQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])

  useEffect(() => {
    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      // Modo demo - simular usuário logado
      setUser({
        id: 'demo-user',
        email: 'demo@fitmotiva.com',
        name: 'Usuário Demo',
        phone: '',
        plan: 'premium',
        subscription_status: 'trial',
        referral_code: 'FIT' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        referral_count: 2,
        points: 150,
        level: 'silver',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      setLoading(false)
      return
    }

    // Verificar se usuário está logado (apenas se Supabase configurado)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Simular dados do usuário para desenvolvimento
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || 'Usuário',
          phone: '',
          plan: 'premium',
          subscription_status: 'trial',
          referral_code: 'FIT' + Math.random().toString(36).substr(2, 5).toUpperCase(),
          referral_count: 2,
          points: 150,
          level: 'silver',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
      setLoading(false)
    }).catch(() => {
      // Em caso de erro, usar modo demo
      setUser({
        id: 'demo-user',
        email: 'demo@fitmotiva.com',
        name: 'Usuário Demo',
        phone: '',
        plan: 'premium',
        subscription_status: 'trial',
        referral_code: 'FIT' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        referral_count: 2,
        points: 150,
        level: 'silver',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      setLoading(false)
    })

    // Escutar mudanças de autenticação (apenas se Supabase configurado)
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    if (supabase && isSupabaseConfigured()) {
      await supabase.auth.signOut()
    }
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Carregando FitMotiva Pro...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  const navigation = [
    { id: 'dashboard', name: 'Início', icon: TrendingUp },
    { id: 'workouts', name: 'Treinos', icon: Play },
    { id: 'nutrition', name: 'Nutrição', icon: Utensils },
    { id: 'referrals', name: 'Indicações', icon: Gift },
    { id: 'plans', name: 'Planos', icon: Crown },
    { id: 'profile', name: 'Perfil', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Logo size="md" variant="full" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    Plano {user.plan} • {user.points} pts
                  </p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="hidden md:flex items-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </button>
                )
              })}
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sair
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard user={user} dailyQuote={dailyQuote} />}
        {activeTab === 'workouts' && <Workouts user={user} />}
        {activeTab === 'nutrition' && <Nutrition user={user} />}
        {activeTab === 'referrals' && <Referrals user={user} />}
        {activeTab === 'plans' && <Plans user={user} />}
        {activeTab === 'profile' && <Profile user={user} />}
      </main>
    </div>
  )
}

function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!isSupabaseConfigured() || !supabase) {
        // Modo demo - simular login bem-sucedido
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        return
      }

      if (isLogin) {
        await supabase.auth.signInWithPassword({ email, password })
      } else {
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              name
            }
          }
        })
      }
    } catch (error) {
      console.error('Erro de autenticação:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Logo size="lg" variant="full" className="justify-center mb-4" />
          {!isSupabaseConfigured() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                🚀 Modo demonstração ativo - clique em "Entrar" para testar
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Seu nome"
                required={isSupabaseConfigured()}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="seu@email.com"
              required={isSupabaseConfigured()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Sua senha"
              required={isSupabaseConfigured()}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
          </button>
        </div>

        {!isLogin && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium text-center">
              🎉 7 dias Premium GRÁTIS para novos usuários!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function Dashboard({ user, dailyQuote }: { user: User; dailyQuote: string }) {
  const todayWorkout = mockWorkouts?.[0]
  const todayMeal = mockMealPlans?.[0]?.meals?.[0]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Olá, {user.name}! 👋</h2>
            <p className="text-purple-100 text-lg mb-4">{dailyQuote}</p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-sm">Nível: {user.level}</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-sm">{user.points} pontos</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/20 p-4 rounded-xl text-center">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Sequência</p>
              <p className="text-2xl font-bold">7 dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Treino de Hoje</h3>
            <Play className="w-5 h-5 text-purple-600" />
          </div>
          {todayWorkout ? (
            <>
              <p className="text-sm text-gray-600 mb-3">{todayWorkout.title}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{todayWorkout.duration} min</span>
                <span className="text-purple-600 font-medium">{todayWorkout.calories_burned} cal</span>
              </div>
              <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Começar Treino
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-3">Carregando treino...</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">-- min</span>
                <span className="text-purple-600 font-medium">-- cal</span>
              </div>
              <button className="w-full mt-4 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed" disabled>
                Carregando...
              </button>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Refeição Sugerida</h3>
            <Utensils className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-3">{todayMeal?.name || 'Carregando...'}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{todayMeal?.type || 'N/A'}</span>
            <span className="text-green-600 font-medium">{todayMeal?.calories || 0} cal</span>
          </div>
          <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Ver Receita
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Progresso Semanal</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Treinos</span>
              <span className="font-medium">5/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>

      {/* Trial Banner */}
      {user.subscription_status === 'trial' && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🔥 Teste Premium Ativo!</h3>
              <p className="text-orange-100">Aproveite todos os recursos por mais 5 dias</p>
            </div>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
              Assinar Agora
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Workouts({ user }: { user: User }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  
  const filteredWorkouts = mockWorkouts.filter(workout => {
    if (selectedDifficulty !== 'all' && workout.difficulty !== selectedDifficulty) return false
    if (user.plan === 'basic' && workout.plan_required !== 'basic') return false
    if (user.plan === 'premium' && workout.plan_required === 'elite') return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Seus Treinos</h2>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">Todos os níveis</option>
          <option value="beginner">Iniciante</option>
          <option value="intermediate">Intermediário</option>
          <option value="advanced">Avançado</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {workout.difficulty === 'beginner' ? 'Iniciante' :
                   workout.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </span>
                {workout.plan_required !== 'basic' && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{workout.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{workout.duration} minutos</span>
                <span>{workout.calories_burned} calorias</span>
                <span>{workout.exercises.length} exercícios</span>
              </div>
              
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                Iniciar Treino
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum treino encontrado</h3>
          <p className="text-gray-600">Ajuste os filtros ou considere fazer upgrade do seu plano</p>
        </div>
      )}
    </div>
  )
}

function Nutrition({ user }: { user: User }) {
  const [selectedType, setSelectedType] = useState<string>('all')
  
  const filteredMealPlans = mockMealPlans.filter(plan => {
    if (selectedType !== 'all' && plan.type !== selectedType) return false
    if (user.plan === 'basic' && plan.plan_required !== 'basic') return false
    if (user.plan === 'premium' && plan.plan_required === 'elite') return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Planos Alimentares</h2>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">Todos os tipos</option>
          <option value="balanced">Equilibrada</option>
          <option value="low_carb">Low Carb</option>
          <option value="traditional">Tradicional</option>
          <option value="vegetarian">Vegetariana</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMealPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plan.type === 'balanced' ? 'bg-blue-100 text-blue-800' :
                  plan.type === 'low_carb' ? 'bg-purple-100 text-purple-800' :
                  plan.type === 'traditional' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {plan.type === 'balanced' ? 'Equilibrada' :
                   plan.type === 'low_carb' ? 'Low Carb' :
                   plan.type === 'traditional' ? 'Tradicional' : 'Vegetariana'}
                </span>
                {plan.plan_required !== 'basic' && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              
              <div className="space-y-3 mb-4">
                {plan.meals.slice(0, 2).map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{meal.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{meal.type}</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">{meal.calories} cal</span>
                  </div>
                ))}
                {plan.meals.length > 2 && (
                  <p className="text-xs text-gray-500 text-center">+{plan.meals.length - 2} refeições</p>
                )}
              </div>
              
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Utensils className="w-4 h-4 mr-2" />
                Ver Plano Completo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Referrals({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🎁 Indique & Ganhe</h2>
        <p className="text-green-100 mb-6">
          Compartilhe o FitMotiva Pro e ganhe benefícios incríveis para cada amigo que se cadastrar!
        </p>
        
        <div className="bg-white/20 rounded-lg p-4 mb-6">
          <p className="text-sm mb-2">Seu código de indicação:</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-wider">{user.referral_code}</span>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Copiar
            </button>
          </div>
        </div>
        
        <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          Compartilhar Código
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.referral_count}</h3>
          <p className="text-gray-600">Amigos indicados</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
          <Gift className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">R$ 10,00</h3>
          <p className="text-gray-600">Cashback acumulado</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
          <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">15</h3>
          <p className="text-gray-600">Dias Premium ganhos</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Como funciona?</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <div>
              <p className="font-medium">Compartilhe seu código</p>
              <p className="text-sm text-gray-600">Envie seu código único para amigos e familiares</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            <div>
              <p className="font-medium">Eles se cadastram</p>
              <p className="text-sm text-gray-600">Seu amigo ganha 3 dias Premium grátis</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            <div>
              <p className="font-medium">Você ganha benefícios</p>
              <p className="text-sm text-gray-600">5 dias Premium ou R$ 5 de cashback via Pix</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Plans({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Escolha seu Plano</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Desbloqueie todo o potencial do FitMotiva Pro com nossos planos premium
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {Object.entries(planFeatures).map(([planId, plan]) => (
          <div
            key={planId}
            className={`rounded-2xl p-8 border-2 transition-all ${
              planId === 'premium'
                ? 'border-purple-500 bg-purple-50 scale-105'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            {planId === 'premium' && (
              <div className="bg-purple-500 text-white text-center py-2 px-4 rounded-lg mb-6 font-semibold">
                🔥 Mais Popular
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              {planId === 'basic' ? (
                <div className="text-3xl font-bold text-gray-900">Grátis</div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                    <span className="text-lg font-normal text-gray-600">/mês</span>
                  </div>
                  {'pixPrice' in plan && (
                    <div className="text-sm text-green-600 font-medium">
                      R$ {plan.pixPrice.toFixed(2).replace('.', ',')} via Pix
                    </div>
                  )}
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    ✓
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                user.plan === planId
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : planId === 'basic'
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
              disabled={user.plan === planId}
            >
              {user.plan === planId ? 'Plano Atual' : 
               planId === 'basic' ? 'Plano Gratuito' : 
               'Começar Teste Grátis'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Garantia de Satisfação</h3>
        </div>
        <p className="text-center text-gray-600">
          Teste qualquer plano premium por 7 dias grátis. Cancele a qualquer momento sem compromisso.
        </p>
      </div>
    </div>
  )
}

function Profile({ user }: { user: User }) {
  const [activeProfileTab, setActiveProfileTab] = useState('personal')
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    nutritionTips: true,
    motivationalMessages: true,
    weeklyProgress: true,
    socialSharing: false
  })

  const profileTabs = [
    { id: 'personal', name: 'Dados Pessoais', icon: Settings },
    { id: 'preferences', name: 'Preferências', icon: Bell },
    { id: 'activity', name: 'Histórico', icon: Activity },
    { id: 'achievements', name: 'Conquistas', icon: Award },
    { id: 'privacy', name: 'Privacidade', icon: Shield },
  ]

  const mockActivities = [
    { id: 1, type: 'workout', title: 'Treino HIIT Intenso', date: '2024-01-15', calories: 320, duration: 30 },
    { id: 2, type: 'meal', title: 'Plano Low Carb - Dia 5', date: '2024-01-15', calories: 1450 },
    { id: 3, type: 'goal', title: 'Meta de peso atingida!', date: '2024-01-14', achievement: true },
    { id: 4, type: 'workout', title: 'Treino Funcional', date: '2024-01-14', calories: 280, duration: 25 },
    { id: 5, type: 'social', title: 'Compartilhou progresso', date: '2024-01-13', platform: 'Instagram' }
  ]

  const mockAchievements = [
    { id: 1, title: 'Primeira Semana', description: 'Complete 7 dias consecutivos', icon: '🔥', unlocked: true, date: '2024-01-10' },
    { id: 2, title: 'Queimador de Calorias', description: 'Queime 1000 calorias em treinos', icon: '⚡', unlocked: true, date: '2024-01-12' },
    { id: 3, title: 'Disciplina Total', description: 'Complete 30 dias consecutivos', icon: '💪', unlocked: false },
    { id: 4, title: 'Influenciador Fit', description: 'Indique 5 amigos', icon: '🌟', unlocked: false },
    { id: 5, title: 'Mestre da Nutrição', description: 'Complete 10 planos alimentares', icon: '🥗', unlocked: true, date: '2024-01-08' },
    { id: 6, title: 'Atleta Elite', description: 'Atinja nível Diamante', icon: '💎', unlocked: false }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white text-purple-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
            <p className="text-purple-100 mb-4">Membro desde {new Date(user.created_at).toLocaleDateString('pt-BR')}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">{user.plan}</span>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.points} pontos</span>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">{user.level}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {profileTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveProfileTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                    activeProfileTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Dados Pessoais */}
          {activeProfileTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de nascimento</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso atual (kg)</label>
                  <input
                    type="number"
                    placeholder="Ex: 70"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 175"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso meta (kg)</label>
                  <input
                    type="number"
                    placeholder="Ex: 65"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível de atividade</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="sedentary">Sedentário</option>
                    <option value="light">Levemente ativo</option>
                    <option value="moderate">Moderadamente ativo</option>
                    <option value="very">Muito ativo</option>
                    <option value="extra">Extremamente ativo</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objetivos e motivações</label>
                <textarea
                  rows={4}
                  placeholder="Conte-nos sobre seus objetivos, motivações e o que te inspira a manter uma vida saudável..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Salvar Alterações
              </button>
            </div>
          )}

          {/* Preferências */}
          {activeProfileTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferências e Notificações</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Lembretes de treino</h4>
                    <p className="text-sm text-gray-600">Receba notificações para não perder seus treinos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.workoutReminders}
                      onChange={(e) => setNotifications({...notifications, workoutReminders: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Dicas de nutrição</h4>
                    <p className="text-sm text-gray-600">Receba dicas diárias sobre alimentação saudável</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.nutritionTips}
                      onChange={(e) => setNotifications({...notifications, nutritionTips: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Mensagens motivacionais</h4>
                    <p className="text-sm text-gray-600">Receba frases inspiradoras para manter o foco</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.motivationalMessages}
                      onChange={(e) => setNotifications({...notifications, motivationalMessages: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Relatório semanal</h4>
                    <p className="text-sm text-gray-600">Receba um resumo do seu progresso toda semana</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyProgress}
                      onChange={(e) => setNotifications({...notifications, weeklyProgress: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Compartilhamento social</h4>
                    <p className="text-sm text-gray-600">Permitir compartilhamento automático de conquistas</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.socialSharing}
                      onChange={(e) => setNotifications({...notifications, socialSharing: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Horários preferenciais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Melhor horário para treinar</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="morning">Manhã (6h - 12h)</option>
                      <option value="afternoon">Tarde (12h - 18h)</option>
                      <option value="evening">Noite (18h - 22h)</option>
                      <option value="flexible">Flexível</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lembrete de hidratação</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="30">A cada 30 minutos</option>
                      <option value="60">A cada 1 hora</option>
                      <option value="120">A cada 2 horas</option>
                      <option value="disabled">Desativado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Histórico de Atividades */}
          {activeProfileTab === 'activity' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Histórico de Atividades</h3>
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Exportar</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'workout' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'meal' ? 'bg-green-100 text-green-600' :
                      activity.type === 'goal' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'workout' ? <Play className="w-5 h-5" /> :
                       activity.type === 'meal' ? <Utensils className="w-5 h-5" /> :
                       activity.type === 'goal' ? <Target className="w-5 h-5" /> :
                       <Share2 className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
                        {activity.calories && <span>{activity.calories} cal</span>}
                        {activity.duration && <span>{activity.duration} min</span>}
                        {activity.platform && <span>{activity.platform}</span>}
                      </div>
                    </div>
                    
                    {activity.achievement && (
                      <div className="text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Carregar mais atividades
                </button>
              </div>
            </div>
          )}

          {/* Conquistas */}
          {activeProfileTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Suas Conquistas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                      
                      {achievement.unlocked ? (
                        <div className="text-xs text-green-600 font-medium">
                          Desbloqueada em {new Date(achievement.date!).toLocaleDateString('pt-BR')}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">
                          Ainda não desbloqueada
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-6 border border-purple-200">
                <div className="text-center">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Continue conquistando!</h4>
                  <p className="text-gray-600 text-sm">
                    Você já desbloqueou {mockAchievements.filter(a => a.unlocked).length} de {mockAchievements.length} conquistas disponíveis.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Privacidade */}
          {activeProfileTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configurações de Privacidade</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Visibilidade do perfil</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="profile-visibility" className="text-purple-600" defaultChecked />
                      <span className="ml-2 text-sm">Público - Qualquer usuário pode ver meu perfil</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="profile-visibility" className="text-purple-600" />
                      <span className="ml-2 text-sm">Amigos - Apenas pessoas que eu sigo podem ver</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="profile-visibility" className="text-purple-600" />
                      <span className="ml-2 text-sm">Privado - Apenas eu posso ver meu perfil</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Compartilhamento de progresso</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-purple-600" defaultChecked />
                      <span className="ml-2 text-sm">Permitir que outros vejam meu progresso de peso</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-purple-600" defaultChecked />
                      <span className="ml-2 text-sm">Mostrar minhas conquistas no perfil</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-purple-600" />
                      <span className="ml-2 text-sm">Aparecer no ranking de usuários</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Dados e backup</h4>
                  <div className="space-y-3">
                    <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Baixar meus dados</span>
                    </button>
                    <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Importar dados de backup</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-2">Zona de perigo</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Essas ações são irreversíveis. Tenha certeza antes de prosseguir.
                  </p>
                  <div className="space-y-2">
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Limpar todo o histórico de atividades
                    </button>
                    <br />
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Excluir minha conta permanentemente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}