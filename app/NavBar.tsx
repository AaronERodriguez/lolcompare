import { ModeToggle } from '@/components/toggle-theme'
import React from 'react'

type Props = {}

function NavBar({}: Props) {
  return (
    <div className='w-full h-16 bg-primary flex items-center px-4 justify-between'>
        <h1 className='text-white text-2xl font-bold'>LoL Compare</h1>
        <div>
            {/* Future nav items go here */}
        </div>
        <ModeToggle />
    </div>
  )
}

export default NavBar