import Spinner from './Spinner.gif'
import './loader.css'

export default function Loader() {
  return (
    <div className="loader">
      <img src={Spinner} alt="loader" />
    </div>
  )
}
