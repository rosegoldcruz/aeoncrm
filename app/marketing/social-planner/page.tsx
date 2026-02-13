import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Upload,
  RefreshCw,
  Calendar,
  Rss,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Info,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react"

export default function SocialPlannerPage() {
  const socialPlatforms = [
    { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "Threads", icon: MessageCircle },
    { name: "GBP", icon: Calendar },
    { name: "LinkedIn", icon: Linkedin },
    { name: "TikTok", icon: Youtube },
    { name: "Youtube", icon: Youtube },
    { name: "Pinterest", icon: Calendar },
    { name: "Community", icon: MessageCircle },
    { name: "Bluesky", icon: MessageCircle },
  ]

  const features = [
    {
      icon: Upload,
      title: "Bulk Scheduling with CSV",
      description: "Import and schedule multiple posts at once using CSV files for efficient content management",
      buttonText: "Upload A CSV",
      buttonVariant: "default" as const,
    },
    {
      icon: RefreshCw,
      title: "Evergreen Queue Post",
      description: "Create a library of timeless content that automatically recycles to keep your feed fresh",
      buttonText: "Create Evergreen Post",
      buttonVariant: "default" as const,
    },
    {
      icon: Calendar,
      title: "Recurring Post",
      description: "Set up posts that automatically repeat on a schedule to maintain consistent engagement",
      buttonText: "Create Recurring Post",
      buttonVariant: "default" as const,
    },
    {
      icon: Rss,
      title: "Generate Feed from RSS Post",
      description: "Automatically create and share posts from your favorite RSS feeds to stay current",
      buttonText: "Create RSS Post",
      buttonVariant: "default" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800">
        <div className="flex items-center gap-6 px-6 overflow-x-auto">
          <Link
            href="/marketing"
            className="py-4 border-b-2 border-orange-500 text-orange-500 font-medium whitespace-nowrap"
          >
            Marketing
          </Link>
          <Link
            href="/marketing/social-planner"
            className="py-4 border-b-2 border-orange-500 text-orange-500 font-medium whitespace-nowrap"
          >
            Social Planner
          </Link>
          <Link href="/marketing/emails" className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Emails
          </Link>
          <Link href="/marketing/snippets" className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Snippets
          </Link>
          <Link
            href="/marketing/countdown-timers"
            className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap"
          >
            Countdown Timers
          </Link>
          <Link
            href="/marketing/trigger-links"
            className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap"
          >
            Trigger Links
          </Link>
          <Link
            href="/marketing/affiliate-manager"
            className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap"
          >
            Affiliate Manager
          </Link>
          <Link
            href="/marketing/brand-boards"
            className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap"
          >
            Brand Boards
          </Link>
          <Link href="/marketing/ad-manager" className="py-4 text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Ad Manager
          </Link>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 p-3 sm:p-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-balance">Grow faster with a smarter social media calendar</h1>
            <p className="text-neutral-400 text-lg">
              Keep your social presence active by publishing posts across multiple social media networks at once!
            </p>
          </div>

          {/* Social Account Connections */}
          <div className="mb-8">
            <p className="text-sm text-neutral-400 mb-4">Select the social accounts you want to connect:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 mb-6">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <Button
                    key={platform.name}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:border-orange-500"
                  >
                    <Icon className="h-6 w-6 text-orange-500" />
                    <span className="text-xs">{platform.name}</span>
                  </Button>
                )
              })}
            </div>

            {/* Info Box */}
            <Card className="bg-orange-500/10 border-orange-500/20 p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Save time by scheduling posts</h3>
                  <p className="text-sm text-neutral-300 mb-2">Keep your social channels active by scheduling posts!</p>
                  <Link href="#" className="text-sm text-orange-500 hover:text-orange-400 font-medium">
                    Schedule Now →
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="font-semibold mb-2 text-balance">{feature.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4 text-pretty">{feature.description}</p>
                  </div>
                  <Button
                    variant={feature.buttonVariant}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {feature.buttonText}
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Right Sidebar Preview */}
        <div className="w-80 flex-shrink-0">
          <Card className="bg-neutral-900 border-neutral-800 p-6 sticky top-6">
            <h3 className="font-semibold mb-4">Social Scheduling Preview</h3>

            {/* Preview Mockup */}
            <div className="space-y-4">
              <div className="bg-neutral-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-orange-500">SA</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Spark Aesthetics</div>
                    <div className="text-xs text-neutral-400">2 hours ago</div>
                  </div>
                </div>

                <p className="text-sm mb-3">Check out our latest collection! 🎨✨</p>

                <div className="bg-neutral-700 rounded-lg h-32 mb-3 flex items-center justify-center">
                  <span className="text-xs text-neutral-500">Post Image</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>1,248</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>588</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>120</span>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <span className="text-neutral-400">Confused with content? Use content Planner AI</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <span className="text-neutral-400">Do not want to post today? Schedule a Post</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <span className="text-neutral-400">Posting on multiple platforms? Try bulk Posting</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
