export interface Lead {
  id?: string
  name: string
  email: string
  interest: string
  source?: string
  created_at?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stripe_price_id?: string
  active: boolean
  division: string
}

export interface Subscriber {
  id: string
  email: string
  plan: 'free' | 'playbook' | 'member'
  status: 'active' | 'cancelled' | 'past_due'
  created_at: string
}

export interface AdminStats {
  totalLeads: number
  totalSubscribers: number
  totalRevenue: number
  activeMembers: number
  leadsThisWeek: number
  revenueThisMonth: number
}
