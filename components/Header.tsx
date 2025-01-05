import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
    return (
        <header className="flex w-full bg-blue-500 text-white text-center h-full justify-center items-center p-4">
            <Link href="">
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
            </Link>
        </header>
    );
}