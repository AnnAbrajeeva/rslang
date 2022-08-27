import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer>
      <Button href="https://rs.school/js/" target="_blank" variant="text">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs logo" />
      </Button>

      <h3>2022</h3>

      <div>
        <Link to="/team">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/team')}
          >
            Our Team
          </Button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
