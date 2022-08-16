import { Button } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Button href="https://rs.school/js/" target="_blank" variant="text">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs logo" />
      </Button>

      <h3>2022</h3>

      <div>
        <Button href="/team" variant="contained" color="secondary">
          Our Team
        </Button>
        {/* <ButtonGroup
          size="small"
          aria-label="small button group"
          orientation="vertical"
        >
          <Button href="https://github.com/madinanishanbaeva" target="_blank">
            <GitHub /> Madina
          </Button>
          <Button href="https://github.com/AnnAbrajeeva" target="_blank">
            <GitHub /> Anna
          </Button>
          <Button href="https://github.com/shahzod222" target="_blank">
            <GitHub /> Shahzod
          </Button>
          <Button href="https://github.com/kirakle" target="_blank">
            <GitHub /> Viachaslau
          </Button>
        </ButtonGroup> */}
      </div>
    </footer>
  );
};

export default Footer;
