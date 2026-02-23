"use client"
import { useState } from 'react'
import Link from 'next/link'
import { MessagesSquare, LogIn, Menu, X, BookOpen, Users, MessageCircle, Home } from 'lucide-react'
import { useAuth } from '@/context/AuthProvider'
import { usePathname } from 'next/navigation'

const mobileLinks = [
  {
    href: '/',
    label: 'Home',
    description: 'Who we are',
    icon: Home,
    color: 'from-violet-500/20 to-purple-600/10',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
  {
    href: '/about-us',
    label: 'About',
    description: 'Who we are',
    icon: Users,
    color: 'from-violet-500/20 to-purple-600/10',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
  {
    href: '/articles',
    label: 'Blogs',
    description: 'Latest articles',
    icon: BookOpen,
    color: 'from-indigo-500/20 to-purple-600/10',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
  },
  {
    href: '/chat',
    label: 'Chat',
    description: 'Start a conversation',
    icon: MessageCircle,
    color: 'from-purple-500/20 to-fuchsia-600/10',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const { accessToken } = useAuth()
  if (pathname?.startsWith('/chat')) {
    return null
  }
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="w-full font-veles text-md flex justify-between items-center text-white p-5 glass-navbar relative z-50">
        <ul className='hidden sm:flex justify-center items-center gap-10 h-full'>
          <li><Link href={'/'} className='font-metropolis text-2xl text-white hover:text-purple-500 transition-all duration-500'>O - Chat</Link></li>
          <li><Link href={'/articles'} className='hover:text-purple-500 transition-all duration-500'>Blogs</Link></li>
          <li><Link href={'/about-us'} className='hover:text-purple-500 transition-all duration-500'>About</Link></li>
          <li><Link href={'/chat'} className='hover:text-purple-500 transition-all duration-500'>Chat</Link></li>
        </ul>

        <div className='flex sm:hidden justify-between items-center w-full'>
          <Link href={'/'} className='font-metropolis text-2xl text-white hover:text-purple-500 transition-all duration-500'>
            O - Chat
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-white hover:text-purple-400 transition-all duration-300 p-1'
          >
            {menuOpen
              ? <X size={26} className="transition-transform duration-300 rotate-90" />
              : <Menu size={26} className="transition-transform duration-300" />
            }
          </button>
        </div>

        {/* Desktop right action */}
        <div className='hidden sm:flex'>
          {accessToken
            ? <Link className="cursor-pointer hover:text-purple-500 flex flex-row-reverse justify-center items-center gap-2" href='/chat'>
                chat <MessagesSquare size={30} />
              </Link>
            : <Link className="cursor-pointer hover:text-purple-500 flex flex-row-reverse gap-2" href='/login'>
                Login <LogIn />
              </Link>
          }
        </div>
      </nav>

      {menuOpen && (
        <div className="menu-overlay sm:hidden fixed inset-0 top-[72px] z-200  backdrop-blur-xl px-5 pt-6 pb-10 flex flex-col gap-3">

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-2" />

          {mobileLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`nav-item group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${link.color} border ${link.border} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-125 active:scale-95`}
              >
                <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${link.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-veles text-base leading-tight">{link.label}</span>
                  <span className="text-white/40 text-xs mt-0.5">{link.description}</span>
                </div>
                <div className="ml-auto text-white/20 group-hover:text-white/50 transition-colors duration-300 text-lg">›</div>
              </Link>
            )
          })}

          <div className="nav-item mt-2">
            {accessToken
              ? <Link
                  href='/chat'
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-purple-600/80 hover:bg-purple-500/90 border border-purple-400/40 text-white font-veles text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-900/30"
                >
                  <MessagesSquare size={20} />
                  Open Chat
                </Link>
              : <Link
                  href='/login'
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-purple-600/80 hover:bg-purple-500/90 border border-purple-400/40 text-white font-veles text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-900/30"
                >
                  <LogIn size={20} />
                  Login
                </Link>
            }
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        </div>
      )}
    </>
  )
}