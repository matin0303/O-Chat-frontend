"use client"
import { useAuth } from '@/context/AuthProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/chat')) {
    return null
  }
  return (
    <footer className="w-full z-150">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link href="/" className="flex justify-center lg:justify-start">
              <span className='font-metropolis text-5xl text-white'>O - Chat</span>
            </Link>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">Trusted in more than 100 countries & 5 million customers. Have any query ?</p>
            <a href="https://t.me/cwmtn" className="py-2.5 px-5 h-9 block w-fit bg-purple-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-purple-700 lg:mx-0">
              Contact us
            </a>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7">O-Chat</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6"><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li className="mb-6"><Link href="/about-us" className=" text-gray-300 hover:text-white">About</Link></li>
              <li className="mb-6"><Link href="/articles" className=" text-gray-300 hover:text-white">Articles</Link></li>
              <li><a href="/" className=" text-gray-300 hover:text-white">Features</a></li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7">Products</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6"><Link href="/" className="text-gray-300 hover:text-white">System</Link></li>
              <li className="mb-6"><Link href="/" className=" text-gray-300 hover:text-white"> Assets</Link></li>
              <li className="mb-6"><Link href="/" className=" text-gray-300 hover:text-white">Blocks</Link></li>
              <li><Link href="/" className=" text-gray-300 hover:text-white"> Library</Link></li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-white font-medium mb-7">Resources</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6"><Link href="/" className="text-gray-300 hover:text-white">FAQs</Link></li>
              <li className="mb-6"><Link href="/" className=" text-gray-300 hover:text-white">Quick Start</Link></li>
              <li className="mb-6"><Link href="/" className=" text-gray-300 hover:text-white">Documentation</Link></li>
              <li><Link href="/" className=" text-gray-300 hover:text-white">User Guide</Link></li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-white font-medium mb-7">Blogs</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6"><Link href="/articles" className="text-gray-300 hover:text-white">News</Link></li>
              <li className="mb-6"><Link href="/articles" className=" text-gray-300 hover:text-white">Tips & Tricks</Link></li>
              <li className="mb-6"><Link href="/articles" className=" text-gray-300 hover:text-white">New Updates</Link></li>
              <li><Link href="/articles" className=" text-gray-300 hover:text-white">Events</Link></li>
            </ul>
          </div>
        </div>
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">©<a href="https://pagedone.io/">O-Chat</a> 2026, All rights reserved.</span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a href="mailto:pirmohammadimatin@gmail.com" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-purple-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a href="https://instagram.com/cw.matin" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-purple-600">
                <svg className="w-[1.25rem] h-[1.125rem] text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.70975 7.93663C4.70975 6.65824 5.76102 5.62163 7.0582 5.62163C8.35537 5.62163 9.40721 6.65824 9.40721 7.93663C9.40721 9.21502 8.35537 10.2516 7.0582 10.2516C5.76102 10.2516 4.70975 9.21502 4.70975 7.93663ZM3.43991 7.93663C3.43991 9.90608 5.05982 11.5025 7.0582 11.5025C9.05658 11.5025 10.6765 9.90608 10.6765 7.93663C10.6765 5.96719 9.05658 4.37074 7.0582 4.37074C5.05982 4.37074 3.43991 5.96719 3.43991 7.93663ZM9.97414 4.22935C9.97408 4.39417 10.0236 4.55531 10.1165 4.69239C10.2093 4.82946 10.3413 4.93633 10.4958 4.99946C10.6503 5.06259 10.8203 5.07916 10.9844 5.04707C11.1484 5.01498 11.2991 4.93568 11.4174 4.81918C11.5357 4.70268 11.6163 4.55423 11.649 4.39259C11.6817 4.23095 11.665 4.06339 11.6011 3.91109C11.5371 3.7588 11.4288 3.6286 11.2898 3.53698C11.1508 3.44536 10.9873 3.39642 10.8201 3.39635H10.8197C10.5955 3.39646 10.3806 3.48424 10.222 3.64043C10.0635 3.79661 9.97434 4.00843 9.97414 4.22935ZM4.21142 13.5892C3.52442 13.5584 3.15101 13.4456 2.90286 13.3504C2.57387 13.2241 2.33914 13.0738 2.09235 12.8309C1.84555 12.588 1.69278 12.3569 1.56527 12.0327C1.46854 11.7882 1.3541 11.4201 1.32287 10.7431C1.28871 10.0111 1.28189 9.79119 1.28189 7.93669C1.28189 6.08219 1.28927 5.86291 1.32287 5.1303C1.35416 4.45324 1.46944 4.08585 1.56527 3.84069C1.69335 3.51647 1.84589 3.28513 2.09235 3.04191C2.3388 2.79869 2.57331 2.64813 2.90286 2.52247C3.1509 2.42713 3.52442 2.31435 4.21142 2.28358C4.95417 2.24991 5.17729 2.24319 7.0582 2.24319C8.9391 2.24319 9.16244 2.25047 9.90582 2.28358C10.5928 2.31441 10.9656 2.42802 11.2144 2.52247C11.5434 2.64813 11.7781 2.79902 12.0249 3.04191C12.2717 3.2848 12.4239 3.51647 12.552 3.84069C12.6487 4.08513 12.7631 4.45324 12.7944 5.1303C12.8285 5.86291 12.8354 6.08219 12.8354 7.93669C12.8354 9.79119 12.8285 10.0105 12.7944 10.7431C12.7631 11.4201 12.6481 11.7881 12.552 12.0327C12.4239 12.3569 12.2714 12.5882 12.0249 12.8309C11.7784 13.0736 11.5434 13.2241 11.2144 13.3504C10.9663 13.4457 10.5928 13.5585 9.90582 13.5892C9.16306 13.6229 8.93994 13.6296 7.0582 13.6296C5.17645 13.6296 4.95395 13.6229 4.21142 13.5892ZM4.15307 1.03424C3.40294 1.06791 2.89035 1.18513 2.4427 1.3568C1.9791 1.53408 1.58663 1.77191 1.19446 2.1578C0.802277 2.54369 0.56157 2.93108 0.381687 3.38797C0.207498 3.82941 0.0885535 4.3343 0.0543922 5.07358C0.0196672 5.81402 0.0117188 6.05074 0.0117188 7.93663C0.0117188 9.82252 0.0196672 10.0592 0.0543922 10.7997C0.0885535 11.539 0.207498 12.0439 0.381687 12.4853C0.56157 12.9419 0.802334 13.3297 1.19446 13.7155C1.58658 14.1012 1.9791 14.3387 2.4427 14.5165C2.89119 14.6881 3.40294 14.8054 4.15307 14.839C4.90479 14.8727 5.1446 14.8811 7.0582 14.8811C8.9718 14.8811 9.212 14.8732 9.96332 14.839C10.7135 14.8054 11.2258 14.6881 11.6737 14.5165C12.137 14.3387 12.5298 14.1014 12.9219 13.7155C13.3141 13.3296 13.5543 12.9419 13.7347 12.4853C13.9089 12.0439 14.0284 11.539 14.062 10.7997C14.0962 10.0587 14.1041 9.82252 14.1041 7.93663C14.1041 6.05074 14.0962 5.81402 14.062 5.07358C14.0278 4.33424 13.9089 3.82913 13.7347 3.38797C13.5543 2.93135 13.3135 2.5443 12.9219 2.1578C12.5304 1.7713 12.137 1.53408 11.6743 1.3568C11.2258 1.18513 10.7135 1.06735 9.96388 1.03424C9.21256 1.00058 8.97236 0.992188 7.05876 0.992188C5.14516 0.992188 4.90479 1.00002 4.15307 1.03424Z" fill="currentColor" />
                </svg>

              </a>
              <a href="https://t.me/cwmtn" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-purple-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                </svg>

              </a>
              <a href="https://github.com/matin0303/" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-purple-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
