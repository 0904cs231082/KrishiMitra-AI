import { CloudSun, Droplets, TrendingUp, Sprout, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react"


function Dashboard(){
  return(
      <div className="p-4 sm:p-6 lg:p-8">

        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="mb-1 text-sm font-medium text-green-600">Welcome Back 👋</p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Good Morning, Farmer !</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Get smart insights about your crops, Weather and market prices. </p>
            </div>

            <div className="text-sm text-slate-400">Today</div>
          </div>
        </section>


        {/*  AI assistant Card */}

        <section className="mb-8">
          <div className="relative overflow-hidden rounded-3xl 
          bg-linear-to-br from-green-600 to-emerald-700 p-5 shadow-lg shadow-green-100 sm:p-7">

            {/* Decorative Card */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10"/>
            <div className="absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-white/5"/>

            <div className="relative">
              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl 
                bg-white/15 text-white backdrop-blur-sm">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">Ask KrishiMitra AI</h2>

                  <p className="text-xs text-gray-100">Your Smart Farming Assistant</p>
                </div>
              </div>

              {/* AI Input */}

              <div className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row">
                
                <input type="text" placeholder="Ask about your crop, disease, fertilizer...."
                className="min-w-0 flex-1 rounded-xl px-3 py-3 text-sm text-slate-700
                outline-none placeholder:text-slate-400"/>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 
                text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700
                hover:shadow-lg active:scale-95">Ask AI 
                <ArrowRight  size={17}/>
                </button>
              </div>

              {/* Quick Suggessitions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                className="rounded full border border-white/20 bg-white/10 px-3 py-1.5 
                text-xs text-white backdrop-blur-xs transition-all hover:bg-white/20"
                >
                 🌿 Crop Disease
                </button>

                <button
                className="rounded full border border-white/20 bg-white/10 px-3 py-1.5 
                text-xs text-white backdrop-blur-xs transition-all hover:bg-white/20"
                >
                 ☁ Weather
                </button>

                <button
                className="rounded full border border-white/20 bg-white/10 px-3 py-1.5 
                text-xs text-white backdrop-blur-xs transition-all hover:bg-white/20"
                >
                 💊 Fertilizers
                </button>
              </div>
            </div>
          </div>
        </section>


        {/*  Information Card */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Weather */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm 
          trnasition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between ">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <CloudSun size={23}/>
              </div>

              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-200
              hover:text-slate-700">
                <ArrowUpRight size={17} />
              </button>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">Today's Weather</p>

            <div className="mt-1 flex items-end gap-2">
              <h3 className="text-3xl font-bold text-slate-900">32°</h3>
              <span className="mb-1 text-sm text-slate-400">Clear</span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Droplets size={14}/> Rain Probability: 20%
            </div>
          </div>


          {/* Ccrops */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl 
              bg-green-50 text-green-600">
                <Sprout size={23}/>
              </div>

              <button className="rounded-lg p-2 text-slate-400 transition 
              hover:bg-slate-100 hover:text-slate-700">
                <ArrowRight  size={17}/>
              </button>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">My Crops</p>

            <h3 className="mt-1 text-3xl font-bold text-slate-900">04</h3>

            <p className="mt-3 text-xs text-green-600">3 Crops Looking Healthy</p>
          </div>

          {/* Mandi */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl 
              bg-green-50 text-green-600">
                <TrendingUp size={23}/>
              </div>

              <button className="rounded-lg p-2 text-slate-400 transition 
              hover:bg-slate-100 hover:text-slate-700">
                <ArrowRight  size={17}/>
              </button>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">Wheat  Mandi Rate</p>

            <h3 className="mt-1 text-3xl font-bold text-slate-900">₹2500</h3>

            <p className="mt-3 text-xs text-green-600">⬆ 4.2% from yesterday</p>
          </div>

          {/*  AI Suggestions */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl 
              bg-green-50 text-green-600">
                <Sparkles size={23}/>
              </div>

              <button className="rounded-lg p-2 text-slate-400 transition 
              hover:bg-slate-100 hover:text-slate-700">
                <ArrowUpRight  size={17}/>
              </button>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">AI Suggestion</p>

            <h3 className="mt-1 text-3xl font-bold text-slate-900">Irrigation</h3>

            <p className="mt-3 text-xs text-green-600">Consider irrigation tomorrow morning</p>
          </div>

          </section>


          {/* Quick Actions */}
      <section className="mt-8">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Frequently used farming tools
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm font-medium text-green-600 transition hover:text-green-700">
            View all
            <ArrowRight size={16} />
          </button>
        </div>


        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <button className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110">
              🍃
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Disease Identifier
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Check your crop
              </p>
            </div>

          </button>


          <button className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-transform duration-300 group-hover:scale-110">
              🌤️
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Weather Planner
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Plan your farming
              </p>
            </div>

          </button>


          <button className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-transform duration-300 group-hover:scale-110">
              📈
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Mandi Rates
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Check market prices
              </p>
            </div>

          </button>


          <button className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110">
              🧪
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Soil Calculator
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Get fertilizer advice
              </p>
            </div>

          </button>

        </div>

      </section>
      </div>
  )
}

export default Dashboard