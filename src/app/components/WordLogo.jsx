import Image from 'next/image'
import logo from '../../../public/ld-word-logo-1.png'
// import logo from '../../../public/ld-logo-all-white.png'

export default function WordLogo() {
	return (
		<Image src={logo} height={30} alt="Lemondrop Logo" />
		// <div className="flex flex-col">
		// 	<h2 className="font-logo m-0 p-0 font-bold text-3xl text-yellow" >lemondrop</h2>
		// 	<h2 className="m-0 p-0 text-xl " >SPORTSBOOK</h2>
		// </div>
	)
}