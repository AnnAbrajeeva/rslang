import { GitHub } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useEffect } from 'react'
import './team.css'

const Member = (props: { num: number; name: string; github: string }) => {
  return (
    <div className='member'>
      <Avatar sx={{ width: 170, height: 170 }}>
        <img alt='' className={`avatar av${props.num}`} />
      </Avatar>
      <div className='about-member'>
        <h2>
          {props.name}
          <a href={`https://github.com/${props.github}`} target='_blank' rel='noreferrer'>
            <GitHub fontSize='large' />
          </a>
        </h2>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia sapiente fuga, obcaecati placeat, facilis,
          voluptate distinctio vitae delectus in similique facere possimus. Optio tenetur vero perspiciatis, fuga
          debitis doloremque maxime.
        </h3>
      </div>
    </div>
  )
}

const Team = (props: { setIsFooter: (arg0: boolean) => void }) => {
  useEffect(() => props.setIsFooter(true), [props])

  return (
    <div className='team'>
      <div className='members'>
        <Member num={1} name='Shahzod' github='shahzod222' />
        <Member num={2} name='Anna' github='AnnAbrajeeva' />
        <Member num={3} name='Viachaslau' github='kirakle' />
      </div>
      <img alt='' className='teams-bg' src={require('./images/team-bg.png')} />
    </div>
  )
}

export default Team
