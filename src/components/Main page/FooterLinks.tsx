import * as React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { ArrowDropUpTwoTone, GitHub } from '@mui/icons-material'

function FooterLink(props: { github: string; name: string }) {
  return (
    <Typography sx={{ p: 2 }}>
      <a
        style={{
          textDecoration: 'none',
          color: 'black',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        target="_blank"
        href={`https://github.com/${props.github}`}
        rel="noreferrer"
      >
        {props.name}
        &nbsp;
        <GitHub fontSize="small" />
      </a>
    </Typography>
  )
}

export default function FooterLinks() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            <ArrowDropUpTwoTone />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            className="github-links"
          >
            {[
              { git: 'shahzod222', name: 'Shahzod' },
              { git: 'AnnAbrajeeva', name: 'Anna' },
              { git: 'kirakle', name: 'Viachaslau' },
            ].map((el) => (
              <FooterLink github={el.git} name={el.name} />
            ))}
          </Popover>
        </div>
      )}
    </PopupState>
  )
}
