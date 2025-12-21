import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, ThumbsUp, ThumbsDown, TrendingUp, Network } from "lucide-react"

export default function ReputationPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800 mb-6">
        <div className="flex gap-6">
          <button className="px-4 py-3 text-orange-500 border-b-2 border-orange-500 font-medium">Reputation</button>
          <button className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">Overview</button>
          <button className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">Requests</button>
          <button className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">Reviews</button>
          <button className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">Widgets</button>
          <button className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">Listings</button>
          <button className="px-4 py-3 text-neutral-400 hover:text-white transition-colors">Settings</button>
        </div>
      </div>

      {/* Sub-header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Overview</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">My Stats</button>
            <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">
              Competitor Analysis
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white">
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>Last Month</option>
            <option>Last Year</option>
          </select>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Send Review Request</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Invites Goal */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-400 mb-4">INVITES GOAL</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-neutral-800"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${0 * 3.51} 351.86`}
                      className="text-orange-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">0</span>
                    <span className="text-xs text-neutral-400">out of 20</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-neutral-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>0% out of 20</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>0% vs Previous 6 Months</span>
                </div>
              </div>
            </Card>

            {/* Reviews Received */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-400 mb-4">REVIEWS RECEIVED</h3>
              <div className="text-5xl font-bold mb-6">0</div>
              <div className="space-y-2 mb-4">
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: "0%" }} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <TrendingUp className="w-4 h-4" />
                <span>0% vs Previous 6 Months</span>
              </div>
            </Card>

            {/* Sentiment */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-400 mb-4">SENTIMENT</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mx-auto mb-2">
                    <ThumbsUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-neutral-400">0%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mx-auto mb-2">
                    <ThumbsDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-neutral-400">0%</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Average Rating Section */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-sm font-medium text-neutral-400 mb-4">AVERAGE RATING</h3>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-orange-500 fill-orange-500" />
              <span className="text-3xl font-bold">0</span>
              <TrendingUp className="w-5 h-5 text-neutral-400" />
              <span className="text-xl text-neutral-400">0</span>
            </div>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm text-neutral-400 w-16">{stars} Stars</span>
                  <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: "0%" }} />
                  </div>
                  <span className="text-sm text-neutral-400 w-8">0</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel - Call to Action */}
        <div className="lg:col-span-1">
          <Card className="bg-neutral-900 border-neutral-800 p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mx-auto mb-4">
              <Network className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Start Growing your Online Visibility Today!</h3>
            <p className="text-sm text-neutral-400 mb-6">Get listed across 95+ Digital services Globally</p>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Activate Listings</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
