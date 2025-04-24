export interface Service {
  id: string
  title: string
  description: string
  price: number
  image?: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  categoryId: string
  rating: number
  reviewCount: number
  featured: boolean
}

export interface Category {
  id: string
  name: string
  image?: string
  description?: string
}
