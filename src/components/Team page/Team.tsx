import { GitHub } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useEffect } from 'react'
import './team.css'

const Member = (props: {
  num: number
  name: string
  github: string
  info: string
}) => {
  return (
    <div className="member">
      <Avatar sx={{ width: 150, height: 150 }}>
        <img alt="" className={`avatar av${props.num}`} />
      </Avatar>
      <div className="about-member">
        <h2>
          {props.name}
          <a
            href={`https://github.com/${props.github}`}
            target="_blank"
            rel="noreferrer"
          >
            <GitHub fontSize="large" />
          </a>
        </h2>
        <h3>{props.info}</h3>
      </div>
    </div>
  )
}

const Team = () => {
  return (
    <div className="team">
      <div className="members">
        <Member
          num={1}
          name="Shahzod"
          github="shahzod222"
          info="
Designed the application and created main page, team page and mini-games page. Also made a Sprint game."
        />
        <Member
          num={2}
          name="Anna"
          github="AnnAbrajeeva"
          info="
Team leader, developed the application architecture and led the team. Created the entire dictionary, dictionary cards and all the statistics logic.
        "
        />
        <Member
          num={3}
          name="Viachaslau"
          github="kirakle"
          info="
        
Configured authorization and registration. Extensively participated in the creation of statistics, and also made the Audio-Call game.
        "
        />
      </div>
      <img alt="" className="teams-bg" src={require('./images/team-bg.png')} />
    </div>
  )
}

export default Team
