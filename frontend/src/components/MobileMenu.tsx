import { Link } from "react-router-dom";

const MobileMenu = () => {
  return (
    <div className='mobile-links'>
        <Link to='/'>
            Home
        </Link>
        <Link to='/daily'>
            Daily
        </Link>
        <Link to='/hourly'>
            Hourly
        </Link>
        <Link to='/this-week'>
            This Week
        </Link>
    </div>
  )
}

export default MobileMenu;