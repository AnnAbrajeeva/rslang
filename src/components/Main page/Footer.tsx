import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import FooterLinks from './FooterLinks';
import './main.css';

const Footer = (props: { setValue: (arg0: string) => void }) => {
  const changeNav = () => {
    props.setValue('team');
  };

  return (
    <footer>
      <Button href="https://rs.school/js/" target="_blank" variant="text">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs logo" />
      </Button>

      <h3>2022</h3>

      <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
        <Button >
          <Link onClick={changeNav} to="/team">Our Team</Link>
        </Button>
        <Button>
          <FooterLinks />
        </Button>
      </ButtonGroup>
    </footer>
  );
};

export default Footer;
