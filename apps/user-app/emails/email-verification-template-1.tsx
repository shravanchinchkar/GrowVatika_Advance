import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface GrowVatikaVerifyEmailProp {
  name: string;
  verifyCode: string;
}

export default function GrowVatikaVerifyEmail({
  name,
  verifyCode,
}: GrowVatikaVerifyEmailProp) {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
        />
        <style>
          {`
          @media only screen and (max-width: 600px) {
              .column-1 {
                width: 30% !important;
              }
              .column-2 {
                width: 70% !important;
              }
            }
          `}
        </style>
      </Head>
      <Body style={main}>
        <Preview>GrowVatika Email Verification</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <table style={{ ...imageSection }}>
              <tr style={{ width: "100%" }}>
                <td
                  className="column-1"
                  style={{ width: "35%", textAlign: "right" }}
                >
                  <Img
                    src="https://growvatika.live/assets/images/HeaderImages/site-logo.png"
                    width="75"
                    height="45"
                    alt="GrowVatika Logo"
                    style={{ ...logoImage, display: "inline-block" }}
                  />
                </td>
                <td
                  className="column-2"
                  style={{ width: "50%", textAlign: "start" }}
                >
                  <div>
                    <div style={brandTitle}>GrowVatika</div>
                    <div style={brandTagLine}>Nursery For EveryOne</div>
                  </div>
                </td>
              </tr>
            </table>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={{ ...text, margin: "0px" }}>Hello {name}</Text>
              <Text style={{ ...mainText, textAlign: "justify" }}>
                Thank you for registering with GrowVatika. To complete your
                account setup, please verify your email address using the
                following One-Time Password (OTP):
              </Text>
              <Section style={{ ...verificationSection }}>
                <Text
                  style={{ ...verifyText, textAlign: "center", width: "100%" }}
                >
                  Verification code
                </Text>
                <Text style={{ ...codeText, width: "100%" }}>{verifyCode}</Text>
                <Text style={{ ...validityText }}>
                  (This code is valid for 2 minutes)
                </Text>
              </Section>
            </Section>
            <Hr style={hr} />
            <Section style={lowerSection}>
              <Text style={{ ...cautionText, textAlign: "justify" }}>
                GrowVatika will never email you and ask you to disclose or
                verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Section style={footerSection}>
            <Text style={footerText}>Best Regards,</Text>
            <Text style={{ ...footerText, marginTop: "5px" }}>
              GrowVatika Team
            </Text>
            <Text style={footerText}>
              (
              <Link href="https://growvatika.live/" style={link}>
                GrowVatika
              </Link>
              )
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const varFontFamily =
  "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

const main = {
  backgroundColor: "#fff",
  color: "#212121",
  margin: "0",
  padding: "0",
  width: "100%",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#123524",
  maxWidth: "600px", // Standard email width
  width: "100%",
  boxSizing: "border-box" as const,
};

const h1 = {
  color: "#123524",
  fontFamily: varFontFamily,
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
  lineHeight: "1.4",
};

const brandTitle = {
  fontSize: "30px",
  fontFamily: "'Impact', 'Poppins', sans-serif",
  color: "#123524",
  lineHeight: "1.2",
};

const brandTagLine = {
  fontSize: "12px",
  fontFamily: varFontFamily,
  color: "#123524",
  lineHeight: "1.2",
};

const link = {
  color: "white",
  fontFamily: varFontFamily,
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily: varFontFamily,
  fontSize: "14px",
  margin: "24px 0",
  lineHeight: "1.5",
};

const logoImage = {
  maxWidth: "75px", // Ensures logo scales down on small screens
  height: "auto",
};

const imageSection = {
  backgroundColor: "#FFF6F4",
  padding: "20px 0px",
  width: "100%",
};

const coverSection = {
  backgroundColor: "#fff",
  width: "100%",
};

const upperSection = {
  padding: "25px 15px", // Reduced horizontal padding for smaller screens
  width: "100%",
};

const lowerSection = {
  padding: "25px 15px",
  width: "100%",
};

const footerSection = {
  color: "white",
  paddingTop: "15px",
  paddingBottom: "15px",
  // textAlign: "center" as const,
  width: "100%",
};

const footerText = {
  color: "white",
  fontFamily: varFontFamily,
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.5",
};

const verifyText = {
  ...text,
  color: "#123524",
  margin: "0",
  fontWeight: "bold",
  // display:"inline-block",
  // textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
  wordBreak: "break-all" as const, // Prevents overflow on small screens
};

const validityText = {
  ...text,
  margin: "0",
  textAlign: "center" as const,
};

const verificationSection = {
  width: "100%",
  textAlign: "center" as const,
};

const mainText = {
  ...text,
  marginBottom: "14px",
};

const cautionText = {
  ...text,
  margin: "0",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};
