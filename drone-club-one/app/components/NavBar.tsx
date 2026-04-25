import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
    return <header className='h-16 bg-black text-white p-4 flex justify-between'>
        <div className='flex'>
            <Image
                src="/droneClubLogo.png"
                width="32"
                height="32"
                alt="Drone Club Logo"
                style={{ filter: "invert(74%) sepia(68%) saturate(2283%) hue-rotate(1deg) brightness(104%) contrast(98%)" }}
            />
            <h1 className='text-2xl'>DRONE CLUB ONE</h1>
        </div>

        <nav>
            <ul className='flex justify-between'>
                <li className='pr-8'>
                    <Link href='/' className='flex'>
                        <span className='text-[#fcba03] pr-1 font-bold'>{'>'}</span>
                        <p>HOME</p>
                    </Link>
                </li>
                <li className='pr-8'>
                    <Link href='/races' className='flex'>
                        <span className='text-[#fcba03] pr-1 font-bold'>{'>'}</span>
                        <p>RACES</p>
                    </Link>
                </li>
                <li className='pr-8'>
                    <Link href='/pilots' className='flex'>
                        <span className='text-[#fcba03] pr-1 font-bold'>{'>'}</span>
                        <p>PILOTS</p>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
}