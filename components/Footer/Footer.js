import { Container, Grid, Typography } from "@mui/material";
import { dateNow } from "../../utility/date";
import { FooterWrapper } from "./footer.style";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Grid container>
          <Grid item md={6}>
            <Typography variants="subtitle2">{dateNow}</Typography>
          </Grid>
          <Grid item md={6}>
              <Typography variants="subtitle1">{" "}&copy; Developed by Rifqi Finaldy all right reserverd</Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
