import { Container, Grid, Typography, Link as MUILink } from "@mui/material";
import { dateNow } from "../../utility/date";
import { FooterWrapper } from "./footer.style";
import Link from "next/link";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Grid container>
          <Grid item md={6}>
            <Typography variants="subtitle2">{dateNow}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variants="subtitle2">
              Developed by
              <Link passHref={true} href="https://porto-rifqi-f-v2.vercel.app/">
                <MUILink target="_blank"> Rifqi Finaldy</MUILink>
              </Link>
              &copy; 2022, All right reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
