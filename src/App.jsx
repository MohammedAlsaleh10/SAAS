import { useMemo, useState } from 'react'
import {
  Bell,
  BookCopy,
  BookOpen,
  Bot,
  BrainCircuit,
  Download,
  FileLock2,
  Flame,
  GraduationCap,
  Heart,
  LayoutGrid,
  PlayCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
} from 'lucide-react'

const tabs = ['المتجر', 'الكورسات', 'الدليل الجامعي', 'كورساتي']

const products = [
  { id: 1, title: 'دورة Python المتقدمة', category: 'الذكاء الاصطناعي', type: 'فيديو', rating: 4.9, price: 39, students: 1490 },
  { id: 2, title: 'كتاب هندسة البرمجيات', category: 'كتب رقمية', type: 'كتاب', rating: 4.6, price: 12, students: 810 },
  { id: 3, title: 'مقرر تحليل الخوارزميات', category: 'مقررات جامعية', type: 'مقرر', rating: 4.8, price: 24, students: 950 },
  { id: 4, title: 'دورة Prompt Engineering', category: 'الذكاء الاصطناعي', type: 'فيديو', rating: 4.7, price: 29, students: 1022 },
  { id: 5, title: 'كتاب التشريح السريري', category: 'كتب رقمية', type: 'كتاب', rating: 4.5, price: 16, students: 633 },
  { id: 6, title: 'مقرر تصميم قواعد البيانات', category: 'مقررات جامعية', type: 'مقرر', rating: 4.9, price: 26, students: 1109 },
]

const branches = [
  { name: 'هندسة البرمجيات', summaries: 18, books: 44 },
  { name: 'الطب', summaries: 11, books: 31 },
  { name: 'إدارة الأعمال', summaries: 7, books: 20 },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('المتجر')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('الكل')
  const [type, setType] = useState('الكل')
  const [maxPrice, setMaxPrice] = useState(50)
  const [wishlist, setWishlist] = useState([])
  const [quizScore, setQuizScore] = useState(72)

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const bySearch = p.title.toLowerCase().includes(search.toLowerCase())
        const byCategory = category === 'الكل' || p.category === category
        const byType = type === 'الكل' || p.type === type
        const byPrice = p.price <= maxPrice
        return bySearch && byCategory && byType && byPrice
      }),
    [search, category, type, maxPrice],
  )

  const advice =
    quizScore >= 85
      ? 'ممتاز! جاهز للانتقال إلى مشروع عملي احترافي.'
      : quizScore >= 60
        ? 'ننصحك بمراجعة درس الخوارزميات قبل الانتقال للتطبيقات.'
        : 'ركّز على أساسيات المفاهيم وحلّ اختبار قصير إضافي قبل المتابعة.'

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,255,0.32),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(34,211,238,0.30),transparent_35%)]" />

      <section className="relative mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-10">
        <header className="glass rounded-glass p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                <Sparkles size={14} /> إصدار ويب تفاعلي
              </p>
              <h1 className="text-3xl font-bold sm:text-5xl">DIGIPLAT</h1>
              <p className="mt-2 text-slate-300">منصة المنتجات الرقمية + الدليل الجامعي الذكي</p>
            </div>

            <button className="relative rounded-2xl border border-white/20 bg-slate-900/70 p-3 transition hover:scale-105">
              <Bell className="text-cyan-300" />
              <span className="absolute -right-1 -top-1 rounded-full bg-electric px-2 text-xs">3</span>
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="glass flex items-center gap-2 rounded-3xl px-4 py-3">
              <Search size={18} className="text-cyan-300" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="ابحث عن كورس، كتاب، أو مقرر..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <div className="glass flex items-center justify-between rounded-3xl px-4 py-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-cyan-300" /> فلاتر ذكية لحظية
              </span>
              <span className="text-cyan-200">{filteredProducts.length} نتيجة</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl px-3 py-2 text-sm transition ${
                  activeTab === tab
                    ? 'bg-gradient-to-l from-electric to-cyan-500 text-white shadow-neon'
                    : 'border border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div className="space-y-6">
            <article className="glass rounded-glass p-5">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <LayoutGrid className="text-cyan-300" size={20} /> واجهة المتجر الرقمي
              </h2>

              <div className="mb-4 grid gap-3 md:grid-cols-3">
                <select className="rounded-2xl border border-white/15 bg-slate-900/80 p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>الكل</option>
                  <option>الذكاء الاصطناعي</option>
                  <option>كتب رقمية</option>
                  <option>مقررات جامعية</option>
                </select>
                <select className="rounded-2xl border border-white/15 bg-slate-900/80 p-2" value={type} onChange={(e) => setType(e.target.value)}>
                  <option>الكل</option>
                  <option>فيديو</option>
                  <option>كتاب</option>
                  <option>مقرر</option>
                </select>
                <label className="rounded-2xl border border-white/15 bg-slate-900/80 p-2 text-xs sm:text-sm">
                  السعر حتى ${maxPrice}
                  <input type="range" min="5" max="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-1 w-full" />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {filteredProducts.map((item) => (
                  <article key={item.id} className="group rounded-3xl border border-white/15 bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-4 transition hover:-translate-y-1 hover:border-cyan-300/40">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-xs text-slate-300">{item.category} • {item.type}</p>
                      </div>
                      <button onClick={() => toggleWishlist(item.id)} className="rounded-full p-1 hover:bg-white/10">
                        <Heart size={18} className={wishlist.includes(item.id) ? 'fill-pink-500 text-pink-500' : 'text-slate-300'} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1 text-yellow-300"><Star size={15} /> {item.rating}</span>
                      <span className="text-xs text-slate-400">{item.students}+ طالب</span>
                      <span className="font-bold text-cyan-300">${item.price}</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="glass rounded-glass p-5">
              <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold"><BrainCircuit className="text-cyan-300" size={20} /> Smart Quiz & AI Tips</h2>
              <p className="text-sm text-slate-300">اختبار مؤتمت بعد كل كورس + توصية فورية مخصصة حسب الأداء.</p>
              <input className="mt-4 w-full" type="range" min="0" max="100" value={quizScore} onChange={(e) => setQuizScore(Number(e.target.value))} />
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <p className="rounded-2xl border border-cyan-300/30 bg-cyan-400/10 p-3 text-sm">النتيجة الحالية: <strong className="text-cyan-200">{quizScore}%</strong></p>
                <p className="rounded-2xl border border-white/15 bg-slate-900/70 p-3 text-sm">{advice}</p>
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <article className="glass rounded-glass p-5">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><GraduationCap className="text-cyan-300" size={20} /> الدليل الجامعي</h2>
              <div className="space-y-2">
                {branches.map((branch) => (
                  <div key={branch.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm">
                    <p className="font-semibold">{branch.name}</p>
                    <p className="text-slate-300">{branch.summaries} ملخص جديد • {branch.books} كتاب متاح</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass rounded-glass p-5">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><ShieldCheck className="text-cyan-300" size={20} /> الحماية والمحتوى</h2>
              <ul className="space-y-2 text-sm text-slate-200">
                <li className="inline-flex w-full items-center gap-2 rounded-2xl bg-slate-900/70 p-3"><FileLock2 size={16} className="text-cyan-300" /> تحميل مشفّر للملفات</li>
                <li className="inline-flex w-full items-center gap-2 rounded-2xl bg-slate-900/70 p-3"><Download size={16} className="text-cyan-300" /> روابط مؤقتة للحماية من التسريب</li>
                <li className="inline-flex w-full items-center gap-2 rounded-2xl bg-slate-900/70 p-3"><Bot size={16} className="text-cyan-300" /> تتبع نشاط الحساب تلقائياً</li>
              </ul>
            </article>

            <article className="rounded-glass border border-orange-400/30 bg-orange-400/10 p-5">
              <p className="mb-1 inline-flex items-center gap-2 text-orange-200"><Flame size={16} /> عروض لحظية</p>
              <p className="text-sm">خصم 35% على حزمة الذكاء الاصطناعي حتى نهاية اليوم.</p>
            </article>
          </aside>
        </section>
      </section>

      <nav className="glass fixed bottom-4 left-1/2 z-20 flex w-[94%] max-w-xl -translate-x-1/2 items-center justify-around rounded-3xl px-4 py-3 md:hidden">
        <button className="flex flex-col items-center text-xs text-cyan-300"><LayoutGrid size={18} /> المتجر</button>
        <button className="flex flex-col items-center text-xs"><PlayCircle size={18} /> الكورسات</button>
        <button className="flex flex-col items-center text-xs"><BookOpen size={18} /> الجامعة</button>
        <button className="flex flex-col items-center text-xs"><BookCopy size={18} /> كورساتي</button>
        <button className="flex flex-col items-center text-xs"><Heart size={18} /> الرغبات ({wishlist.length})</button>
      </nav>
    </main>
  )
}
