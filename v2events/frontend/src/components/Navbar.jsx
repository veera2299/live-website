
import v2_logo from '../../src/assets/v2_logo.png'

const menuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/#"
    },
    {
        id: 2,
        name: "Upcoming",
        link: "/upcoming"
    },
    {
        id: 3,
        name: "Completed",
        link: "/completed"
    },
    {
        id: 4,
        name: "FAQ",
        link: "/faq"
    },
]

// const dropdownLinks = [
//     {
//         id: 1,
//         name: "Trending Products",
//         link: '/#',
//     },
//     {
//         id: 2,
//         name: "Best Selling",
//         link: '/#',
//     },
//     {
//         id: 3,
//         name: "Top Rated",
//         link: '/#',
//     },
// ]


const Navbar = () => {
    return (
        <div className='bg-white'>
            <div className='py-4 px-15'>
                    {/* logo and links section */}
                    <div className='flex items-center justify-between'>
                        <a className='text-primary font-semibold tracking-widest flex gap-2 text-3xl sm:text-3xl' >
                            <img className='w-12' src={v2_logo} alt="" />
                            <p>V2 Events</p>
                        </a>
                        {/* Menu items */}
                        <div className='hidden lg:block'>
                            <ul className='flex items-center gap-4'>
                                {menuLinks.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            className='text-xl inline-block px-4 font-semibold text-gray-500 hover:text-black duration-200'
                                            href={item.link} >{item.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

    )
}

export default Navbar

