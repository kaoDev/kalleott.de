import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import type * as React from "react";

interface EmailTemplateProps {
	firstName: string;
	unsubscribeUrl: string;
}

export const WelcomeEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	unsubscribeUrl,
}) => (
	<Html>
		<Head />
		<Preview>Thanks for signing up!</Preview>
		<Body style={main}>
			<Container style={container}>
				<Text style={paragraph}>Hi {firstName},</Text>
				<Text style={paragraph}>
					Thanks for signing up to my newsletter! I’m excited to have you on
					board.
				</Text>
				<Text style={paragraph}>
					Best,
					<br />
					Kalle
				</Text>
				<Hr />
				<Section>
					<Text style={paragraph}>
						If this email was sent to you by mistake, you can unsubscribe again
					</Text>
					<Button href={unsubscribeUrl}>Unsubscribe</Button>
				</Section>
			</Container>
		</Body>
	</Html>
);

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
};
