import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = (props: { setValue: (arg0: string) => void }) => {
  const changeNav = () => {
    props.setValue('team')
  }

  return (
    <footer>
      <Button href='https://rs.school/js/' target='_blank' variant='text'>
        <img src='https://rs.school/images/rs_school_js.svg' alt='rs logo' />
      </Button>

      <h3>2022</h3>

      <div>
        <Link to='/team'>
          <Button variant='contained' color='secondary' onClick={changeNav}>
            Our Team
          </Button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
