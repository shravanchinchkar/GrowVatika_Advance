import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export enum AccountType {
  "USER",
  "SELLER",
  "ADMIN",
}
type TResetPasswordMailTemplate = {
  email: string;
  accountType: AccountType;
  id: string;
};

const ResetPasswordMailTemplate = ({
  email,
  accountType,
  id,
}: TResetPasswordMailTemplate) => {
  // Access environment variable to determine environment
  const isProduction = process.env.NODE_ENV === "production";

  const baseUrl =
    isProduction === false
      ? process.env.RESET_PASSWORD_DEVELOPMENT_URL
      : process.env.RESET_PASSWORD_PRODUCTION_URL;

  // const resetUrl = `${baseUrl}/resetpassword?email=${encodeURIComponent(email)}`;
  const resetUrl = `${baseUrl}/resetpassword?id=${id}`;

  const brandTitle = {
    fontSize: "30px",
    fontFamily: "'Impact', 'Poppins', sans-serif",
    color: "#123524",
    lineHeight: "1.2",
  };

  const brandTagLine = {
    fontSize: "12px",
    color: "#123524",
    lineHeight: "1.2",
  };
  const mainColor = "#2e7d32"; // Forest green color
  const backgroundColor = "#f5f5f5";
  const textColor = "#333333";
  return (
    <Html>
      <Head />
      <Preview>GrowVatika Reset Password</Preview>
      <Body
        style={{
          backgroundColor,
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            maxWidth: "600px",
            margin: "40px auto",
          }}
        >
          {/* Header */}
          <Section
            style={{
              textAlign: "center",
              // marginBottom: "30px",
            }}
          >
            <Section
              style={{
                backgroundColor: "#FFF6F4",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={brandTitle}>GrowVatika</div>
              <div style={brandTagLine}>Nursery For EveryOne</div>
            </Section>
          </Section>

          {/* Main Section */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "30px",
            }}
          >
            <h1
              style={{
                color: "#2e7d32",
                fontSize: "24px",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              Password Reset Request
            </h1>

            <p
              style={{
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "25px",
              }}
            >
              Hello,
            </p>

            <p
              style={{
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "25px",
              }}
            >
              We received a request to reset the password for your Growvatika{" "}
              {accountType === AccountType.SELLER
                ? "Seller"
                : accountType === AccountType.ADMIN
                  ? "Admin"
                  : "User"}{" "}
              account associated with <strong>{email}</strong>. If you didn't
              make this request, you can safely ignore this email.
            </p>

            <p
              style={{
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "30px",
              }}
            >
              To reset your password, please click the button below:
            </p>

            <div
              style={{
                textAlign: "center",
                margin: "30px 0",
              }}
            >
              <a
                href={resetUrl}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  padding: "12px 30px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-block",
                  fontSize: "16px",
                }}
              >
                Reset Your Password
              </a>
            </div>

            <p
              style={{
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "25px",
              }}
            >
              If the button doesn't work, you can also paste this link into your
              browser:
            </p>

            <p
              style={{
                fontSize: "14px",
                wordBreak: "break-all",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "25px",
              }}
            >
              {resetUrl}
            </p>

            <p
              style={{
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "25px",
              }}
            >
              If you need any assistance, please contact our customer support
              team at growvatika@gmail.com.
            </p>

            <Hr style={{ borderColor: "#e0e0e0", margin: "30px 0" }} />

            <Text style={{ fontSize: "16px", color: textColor }}>
              Happy Gardening!
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: "bold", color: mainColor }}
            >
              The GrowVatika Team
            </Text>
          </Section>

          {/* Footer Section */}
          <Section
            style={{
              backgroundColor: "#f0f7f0",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Text
              style={{ fontSize: "14px", color: textColor, margin: "0 0 10px" }}
            >
              © {new Date().getFullYear()} growvatika.live | All Rights
              Reserved
            </Text>
            <Text
              style={{ fontSize: "12px", color: "#777777", marginTop: "15px" }}
            >
              Please do not reply to this email. This mailbox is not monitored.
            </Text>
          </Section>
        </div>
      </Body>
    </Html>
  );
};

export default ResetPasswordMailTemplate;
