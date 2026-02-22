import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  BookOpen,
  Brain,
  GraduationCap,
  Heart,
  LayoutGrid,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Star,
  Wallet,
} from 'lucide-react'

const products = [
  { id: 1, title: 'دورة Python المتقدمة', category: 'الذكاء الاصطناعي', type: 'فيديو', rating: 4.9, price: 39 },
  { id: 2, title: 'كتاب هندسة البرمجيات', category: 'الدليل الجامعي', type: 'كتاب', rating: 4.6, price: 12 },
  { id: 3, title: 'مقرر تحليل الخوارزميات', category: 'جامعة', type: 'مقرر', rating: 4.8, price: 24 },
  { id: 4, title: 'دورة Prompt Engineering', category: 'الذكاء الاصطناعي', type: 'فيديو', rating: 4.7, price: 29 },
]

const quizAdvice = {
  high: 'أداء ممتاز! انتقل مباشرة إلى مشروع عملي متقدم.',
  mid: 'ننصحك بمراجعة درس الخوارزميات قبل الانتقال للتطبيقات.',
  low: 'ابدأ بمراجعة الأساسيات وحل تمارين إضافية قبل المتابعة.',
}

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('الكل')
  const [type, setType] = useState('الكل')
  const [maxPrice, setMaxPrice] = useState(50)
  const [wishlist, setWishlist] = useState([])
  const [notifications, setNotifications] = useState(3)
  const [quizScore, setQuizScore] = useState(70)

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications((prev) => (prev > 0 ? prev - 1 : 0))
    }, 15000)
    return () => clearInterval(timer)
  }, [])

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const searchMatch = product.title.toLowerCase().includes(search.toLowerCase())
        const categoryMatch = category === 'الكل' || product.category === category
        const typeMatch = type === 'الكل' || product.type === type
        const priceMatch = product.price <= maxPrice
        return searchMatch && categoryMatch && typeMatch && priceMatch
      }),
    [search, category, type, maxPrice],
  )

  const advice = quizScore >= 85 ? quizAdvice.high : quizScore >= 60 ? quizAdvice.mid : quizAdvice.low

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen pb-24">
      <section className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">
        <header className="glass rounded-glass p-5 sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-4xl">DIGIPLAT</h1>
              <p className="text-slate-300">منصة المنتجات الرقمية والدليل الجامعي</p>
            </div>
            <button className="relative rounded-2xl bg-slate-900/70 p-3">
              <Bell className="text-cyan-300" />
              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-electric px-2 text-xs">{notifications}</span>
              )}
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="glass flex items-center gap-2 rounded-3xl px-4 py-3">
              <Search size={18} className="text-cyan-300" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="ابحث عن دورة، كتاب، أو مقرر..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <div className="glass flex items-center gap-2 rounded-3xl px-4 py-3 text-sm text-slate-200">
              <SlidersHorizontal size={18} className="text-cyan-300" />
              فلاتر ذكية حسب التصنيف، النوع، التقييم، والسعر
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="glass rounded-glass p-4">
              <div className="mb-3 grid gap-2 sm:grid-cols-3">
                <select className="rounded-2xl bg-slate-900/80 p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>الكل</option>
                  <option>الذكاء الاصطناعي</option>
                  <option>الدليل الجامعي</option>
                  <option>جامعة</option>
                </select>
                <select className="rounded-2xl bg-slate-900/80 p-2" value={type} onChange={(e) => setType(e.target.value)}>
                  <option>الكل</option>
                  <option>فيديو</option>
                  <option>كتاب</option>
                  <option>مقرر</option>
                </select>
                <label className="rounded-2xl bg-slate-900/80 p-2 text-sm">
                  السعر حتى: ${maxPrice}
                  <input type="range" min="5" max="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="rounded-3xl border border-white/20 bg-slate-900/70 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="font-semibold">{product.title}</h3>
                      <button onClick={() => toggleWishlist(product.id)}>
                        <Heart className={wishlist.includes(product.id) ? 'fill-pink-500 text-pink-500' : 'text-slate-300'} size={18} />
                      </button>
                    </div>
                    <p className="mb-2 text-sm text-slate-300">{product.category} • {product.type}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400" /> {product.rating}</span>
                      <span className="font-bold text-cyan-300">${product.price}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="glass rounded-glass p-4">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold"><Brain size={20} className="text-cyan-300" /> Smart Quiz</h2>
              <p className="text-sm text-slate-300">قيّم فهمك في نهاية الكورس واحصل على توصية تعليمية مخصصة.</p>
              <input className="mt-3 w-full" type="range" min="0" max="100" value={quizScore} onChange={(e) => setQuizScore(Number(e.target.value))} />
              <p className="mt-2 text-sm">النتيجة: <span className="font-bold text-cyan-300">{quizScore}%</span></p>
              <p className="mt-2 rounded-2xl bg-cyan-400/10 p-3 text-sm text-cyan-100">{advice}</p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="glass rounded-glass p-4">
              <h2 className="mb-3 text-lg font-semibold">بوابة الطالب</h2>
              <ul className="space-y-2 text-sm text-slate-200">
                <li className="rounded-2xl bg-slate-900/70 p-3">هندسة البرمجيات: 18 ملخص جديد</li>
                <li className="rounded-2xl bg-slate-900/70 p-3">الطب: 11 كتاب متاح</li>
                <li className="rounded-2xl bg-slate-900/70 p-3">الأعمال: 7 مقررات محدثة</li>
              </ul>
            </div>

            <div className="glass rounded-glass p-4">
              <h2 className="mb-2 text-lg font-semibold">الحماية</h2>
              <p className="text-sm text-slate-300">تحميل مشفر وروابط مؤقتة لحماية المحتوى من التسريب.</p>
            </div>
          </aside>
        </section>
      </section>

      <nav className="glass fixed bottom-4 left-1/2 z-10 flex w-[94%] max-w-xl -translate-x-1/2 items-center justify-around rounded-3xl px-4 py-3 md:hidden">
        <button className="flex flex-col items-center text-xs text-cyan-300"><LayoutGrid size={18} /> المتجر</button>
        <button className="flex flex-col items-center text-xs"><PlayCircle size={18} /> الكورسات</button>
        <button className="flex flex-col items-center text-xs"><GraduationCap size={18} /> الجامعة</button>
        <button className="flex flex-col items-center text-xs"><BookOpen size={18} /> كورساتي</button>
        <button className="relative flex flex-col items-center text-xs"><Wallet size={18} /> الرغبات <span className="text-cyan-300">({wishlist.length})</span></button>
      </nav>
    </main>
  )
}
